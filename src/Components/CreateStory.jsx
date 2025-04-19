import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const CreateStory = () => {
  const [mystory, setMystory] = useState([]);
  const fileInput = useRef();

  const HandleClick = () => {
    fileInput.current.click();
  };

  const HandleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.vite.VITE_BACKEND_API_URL}/create-story`,
        form, // Send the correct form data
        { withCredentials: true }
      );

      console.log("Server response:", res.data.story);

      // Ensure the latest stories are updated correctly
      setMystory((prevStories) => [...prevStories, ...[].concat(res.data.story)]);
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  // Debugging with useEffect
  useEffect(() => {
    console.log("Updated Stories State:", mystory);
  }, [mystory]); // This will log the latest state every time it updates

  return (
    <div>
      <div
        onClick={HandleClick}
        className="mystory-circle rounded-full text-sm text-center h-16 w-16 border flex-col flex items-center justify-center border-[rgba(255,255,255,0.5)] cursor-pointer bg-[rgba(255,255,255,.301)]"
      >
        <i className="ri-add-line text-4xl font-light"></i>
        <input
          onChange={HandleFileChange}
          ref={fileInput}
          type="file"
          name="story"
          hidden
          id=""
        />
      </div>
      <div>
      </div>
    </div>
  );
};

export default CreateStory;
