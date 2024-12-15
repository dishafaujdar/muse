import axios from 'axios';
import { useState } from 'react';

export default function Multer() {
    const [imageUrl, setImageUrl] = useState("");
  
    const handleImageUpload = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      const fileInput = event.target.elements.image;
      if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
        try {
          const response = await axios.post(
            "http://localhost:3000/upload",
            formData
          );
          console.log(response.data.imageUrl); // Log the URL to verify
          setImageUrl(response.data.imageUrl); // Set the URL for rendering
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  
    return (
      <div>
        <form onSubmit={handleImageUpload} encType="multipart/form-data">
          <input type="file" name="image" />
          <button type="submit">Upload</button>
        </form>
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
          </div>
        )}
      </div>
    );
  }
  