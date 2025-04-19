import { useRef, useState } from "react";
import axios from 'axios'

const CreatePost = () => {
  const [fileSelected, setFileSelected] = useState("not selected")
  const [postCreateErr, setPostCreateErr] = useState("")
  const [postsMsgSuccess, setPostsMsgSuccess] = useState("")
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    picture: ""
  });
  const fileInput = useRef(null);
  function handleFileClick() {
    console.log(postData);
    fileInput.current.click();
  }

  async function handleSubmit() {
    const postFormData = new FormData();
    console.log("post Data", postData);
    postFormData.append("title", postData.title);
    postFormData.append("description", postData.description);
    postFormData.append("picture", postData.picture);

    try {
        setPostData({
          title: "",
          description: "",
          picture: ""
        })
        setFileSelected("not selected")
        setPostCreateErr("")
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/create-post`, postFormData, {
          headers: {'Content-Type': 'multipart/form-data'},
          withCredentials: true,
        });
        setPostsMsgSuccess(response.data.msg);
        console.log(postsMsgSuccess)
        console.log("response", response.data);
    } catch (error) {
        setPostCreateErr(error.response.data.message)
        console.error("Error submitting form:", error.response.data.message);
    }
}

  return (
    <div className="w-full min-h-[100vh] flex flex-col relative justify-center items-start gap-10">
      <div className="w-full h-full bg-black flex justify-betwwen items-center flex-col gap-8">
        { postCreateErr ? <p className="Err text-red-600 font-medium">{postCreateErr}</p> : "" }
        { postsMsgSuccess ? <p className="Success-msg text-green-600 font-medium">{postsMsgSuccess}</p> : "" }
      <div className="w-2/3 bg-black flex h-fit justify-center items-center">

        <div
          onClick={handleFileClick}
          className="left w-1/2 h-full flex items-center justify-center"
        >
          <div className="con h-67 w-2/3 bg-[#000] text-white rounded border border-[rgba(255,255,255,0.33)] relative flex items-center justify-center flex-col gap-5 cursor-pointer">
            <span className="text-center text-nowrap text-lg">
              Click to select file.
            </span>
            <span className="flex flex-col items-center">
              <i className="ri-download-line text-3xl"></i>
              <input
                name="file"
                onChange={(e)=>{
                  setPostData({...postData, picture: e.target.files[0]})
                  if (fileInput.current.value) {
                    setFileSelected("selected")
                  }
                }}
                ref={fileInput}
                accept=".jpg,.jpeg,.png"
                type="file"
                hidden
                id=""
              />
              <span className="text-sm">( file is <span>{fileSelected}</span> )</span>
            </span>
          </div>
        </div>
        <div className="right w-1/2 h-full gap-4  bg-transparent px-7 flex flex-col justify-between">
          <div className="section flex flex-col gap-4">
            <div className="title">
              <input
                value={postData.title}
                onChange={(e)=>{
                  setPostData({...postData, title: e.target.value})
                }}
                type="text"
                placeholder="Title..."
                className="px-2 py-2 w-full outline-none border border-[#ffffff6e] rounded text-gray-300  "
              />
            </div>
            <div className="Desc">
              <textarea
                value={postData.description}
                onChange={(e)=>{
                  setPostData({...postData, description: e.target.value})
                }}
                type="text"
                rows="5"
                placeholder="Description..."
                className="resize-none px-2 py-2 w-full outline-none border border-[#ffffff5d] rounded text-gray-300  "
              ></textarea>
            </div>
          </div>
          <div className="button">
            <button onClick={handleSubmit} className="text-white px-5 py-3 border border-[#ffffff6e] cursor-pointer rounded-xl hover:bg-[#fff] hover:text-black transition font-medium">
              Upload
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreatePost;
