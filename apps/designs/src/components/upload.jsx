import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [transformedimage, settransformedimage] = useState([]);
  const [transformedimagetext, settransformedimagetext] = useState([]);

  const handleImageUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Debug state variables
    console.log("selectedThemes:", selectedThemes);
    console.log("selectedRoomType:", selectedRoomType);

    const formData = new FormData(); // Correct initialization
    const fileInput = e.target.elements.image; // Correct event usage

    if (fileInput && fileInput.files.length > 0) {
      // Check if files exist
      formData.append("image", fileInput.files[0]); // Append the file to FormData

      if (selectedThemes && selectedThemes.length > 0) {
        const query = `${selectedThemes.join(", ")} ${selectedRoomType}`;
        formData.append("query", query); // Add query to the form data
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set headers explicitly
            },
          }
        );
        console.log(response.data.imageUrl); // Log the uploaded image URL
        setImageUrl(response.data.imageUrl); // Set the uploaded image URL in state
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No file selected for upload");
    }
  };

  const handelImageText = async () => {
    try {
      const query = `${selectedThemes.join(", ")} ${selectedRoomType}`;
      const response = await axios.get(`http://localhost:3000/images`, {
        params: { query },
      });
      const transformedImageText = response.data.imageText; // Adjust key if needed
      settransformedimagetext(transformedImageText);
    } catch (error) {
      console.error("Error fetching generated image:", error);
    }
  };

  const handleGeneratedImage = async () => {
    try {
      const prompt = `${selectedThemes.join(", ")} ${selectedRoomType}`; // Construct the prompt
  
      // Send the POST request with the prompt in the request body
      const response = await axios.post("http://localhost:3000/transformed-Image", {
        prompt, // Pass the prompt in the body
      });
  
      // Handle the response
      const transformedImageUrl = response.data.imageUrl; // Get the base64 image URL
      console.log("Transformed Image URL:", transformedImageUrl);
  
      // Update the state with the generated image URL
      settransformedimage(transformedImageUrl);
    } catch (error) {
      console.error("Error fetching generated image:", error);
    }
  };
  
  const handleChangeTheme = (e) => {
    const options = e.target.options; // Get all options
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedThemes(selectedValues); // Update array state
  };

  const handleChangeRoom = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedRoomType(selectedValues);
  };
  return (
    <div className="min-h-screen bg-gradient mt-5 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Give your <span className="text-blue-500">space</span> a look in seconds
      </h1>
      <p className="mb-8 text-gray-300 text-center text-xl">
        Upload a room, specify the room type, and select your room theme to
        redesign.
      </p>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl items-start">
      {/* Left Section */}
        <div className="border-white p-6 rounded-lg shadow-2xl w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">
            Upload a photo of your room
          </h2>
          <div className="border border-dashed border-gray-500 rounded-lg flex justify-center items-center p-5 mb-7" onSubmit={handelImageText}>
            <form onSubmit={handleImageUpload} encType="multipart/form-data">
              <input type="file" name="image" />
              <button className="px-4 py-2 font-semibold rounded-lg">
                Upload an Image
              </button>
            </form>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-white font-bold">
              Select Room Type
            </label>
            <select
              value={selectedRoomType}
              onChange={handleChangeRoom}
              className="w-full bg-gray-400 font-semibold text-white p-3 rounded-lg"
            >
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bathroom">Bathroom</option>
            </select>
          </div>
          <div>
            <label className="mb-3 text-white font-semibold">
              Select Room Themes{" "}
            </label>
            <select
              value={selectedThemes}
              onChange={handleChangeTheme}
              className="w-full bg-gray-400 font-semibold text-white p-3 rounded-lg"
            >
              <option value="Minimalist">Minimalist</option>
              <option value="Modern">Modern</option>
              <option value="Aesthetic">Aesthetic</option>
              <option value="Vintage">Vintage</option>
              <option value="Professional">Professional</option>
            </select>

            <div className="m-3 shadow-lg p-4 flex justify-center items-center text-black">
              <div className=" border rounded-lg">
                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="p-2 rounded-xl shadow-2xl lg:w-1/2 flex justify-center items-center"> */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          {/* */}
          <div><div>
            {transformedimage ? (
              <img src={transformedimage} alt="Generated Image" />
            ) : (
              <p>{transformedimagetext}</p>
            )}
          </div></div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-10">
        <button
          className="px-6 py-3 border-solid shadow-xl rounded-lg text-white hover:bg-green-900"
          onClick={handleGeneratedImage}
        >
          Render designs
        </button>
      </div>
    </div>
  );
};

export default Upload;
