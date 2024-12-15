import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
const app = express();

const GEMINI_API = process.env.GEMINI_API
const genAI = new GoogleGenerativeAI(GEMINI_API);
const DREAMSTUDIO_API = process.env.DREAMSTUDIO_API;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, "../../uploads"); 

app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); 
    }
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(6, (err, bytes) => {
      if (err) {
        return cb(err, "");
      }
      const uniqueName = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, uniqueName);
    });
  },
});

const upload = multer({ storage: storage }); 

// post the image and prompt
app.post("/upload", upload.single("image") , (req, res) => {
    try {
      const imagePath = req.file?.path;
      const mimeType = req.file?.mimetype;
      const prompt = req.body.query; 
      const name = req.file?.filename

      if (!imagePath || !mimeType || !prompt) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
      }
      console.log(req.file)
      console.log("prompt: ",prompt)

      const imageUrl = `http://localhost:3000/uploads/${name}`;
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        filePath: `/uploads/${name}`,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ success: false, message: "Failed to upload file" });
    }
});

// Route to get the latest uploaded image URL
app.get("/images", async (req, res) => {
  try {
    const prompt = req.query.query as string; 

    if (!prompt) {
      res.status(400).json({ message: "Query parameter 'query' is required" });
      return;
    }

    const files = fs.readdirSync(uploadDir); 

    if (files.length === 0) {
      res.status(404).json({ message: "No images found" });
      return;
    }

    const latestFile = files[files.length - 1];
    const fullPath = path.join(uploadDir, latestFile);

    // Function to convert file to generative path with inlineData
    function fileToGenerativePath(fullPath: string, mimeType: string) {
      return {
        inlineData: {
          data: fs.readFileSync(fullPath).toString("base64"),
          mimeType,
        },
      };
    }
    const imagePart = fileToGenerativePath(fullPath, "image/png");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const Imageprompt = prompt ? `modify image into ${prompt}` : "room game";
    
    console.log(Imageprompt);

    const result = await model.generateContent([Imageprompt, imagePart]);

    if (!result || !result.response) {
      throw new Error("Invalid response from Generative AI API");
    }

    const textresponse = result.response.text();
    console.log(textresponse);

    res.status(200).json({ imageText: textresponse });

  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// Route to get the generated image URL
app.post("/transformed-Image", async (req, res) => {
  const { prompt } = req.body; 

  if (!prompt) {
    res.status(400).json({ success: false, message: "Prompt is required." });
    return;
  }

  const Imageprompt = `modify image into ${prompt}`;

  console.log("Generated Prompt:", Imageprompt);

  try {
    const payload = {
      prompt: Imageprompt,
      output_format: "webp",
    };

    const response = await axios.postForm(
      "https://api.stability.ai/v2beta/stable-image/generate/ultra",
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined, 
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer sk-${DREAMSTUDIO_API}`,
          Accept: "image/*", 
        },
      }
    );

    if (response.status === 200) {
      const filePath = "./uploads/generated-image.webp";
      fs.writeFileSync(filePath, Buffer.from(response.data));

      const imageBase64 = Buffer.from(response.data).toString("base64");
      const imageDataUrl = `data:image/webp;base64,${imageBase64}`;

      res.status(200).json({
        success: true,
        imageUrl: imageDataUrl, 
      });
    } else {
      throw new Error(`Error ${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      success: false,
      message: "Image generation failed.",
      error: error,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


