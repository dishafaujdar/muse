// import { OrbitSpinner } from 'react-spinners-kit';
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Upload = () => {
  const [selectedRoomType, setSelectedRoomType] = useState("Living Room");
  const [selectedThemes, setSelectedThemes] = useState([]);

  const themes = [
    "Modern",
    "Professional",
    "Vintage",
  ];

  const handleThemeSelect = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    } else if (selectedThemes.length < 4) {
      setSelectedThemes([...selectedThemes, theme]);
    }
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
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl">
        {/* Left Section */}
        <div className="border-white p-6 rounded-lg shadow-2xl w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Upload a photo of your room</h2>
          <div className="border border-dashed border-gray-500 rounded-lg p-10 flex justify-center items-center mb-6">
            <button className="bg-black px-4 py-2 font-semibold rounded-lg hover:bg-green-900">
              Upload an Image
            </button>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-white font-bold">Select Room Type</label>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="w-full bg-gray-400 font-semibold text-white p-3 rounded-lg"
            >
              <option>Living Room</option>
              <option>Bedroom</option>
              <option>Kitchen</option>
              <option>Bathroom</option>
            </select>
          </div>
          <div>
            <h3 className="mb-3 text-white font-semibold">Select Room Themes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme}
                  className={`p-3 rounded-lg font-semibold ${
                    selectedThemes.includes(theme)
                      ? "bg-green-900 text-white"
                      : "bg-gray-400 text-white"
                  } hover:bg-green-900`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="from-primary p-6 rounded-xl shadow-2xl w-full lg:w-1/2 flex justify-center items-center">
            <div className="flex items-center justify-center">
              <ClipLoader color="#36d7b7" size={50} />
            </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-10">
        <button className="px-6 py-3 border-solid shadow-xl rounded-lg text-white hover:bg-green-900">
          Render designs
        </button>
      </div>
    </div>
  );
};

export default Upload;
