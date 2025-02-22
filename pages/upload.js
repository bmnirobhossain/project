import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/learn", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Model trained successfully!");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      toast.error("Error training model! Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Upload a CSV File to Train the Model</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} style={{ marginTop: "10px" }}>
        Upload
      </button>
      <ToastContainer />
    </div>
  );
}
