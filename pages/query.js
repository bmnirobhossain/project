import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QueryPage() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [prediction, setPrediction] = useState("");

  // Predefined questions
  const questions = [
    "What is the price of a house with 3 bedrooms and 2 bathrooms?",
    "Will a student pass with 80% attendance and 70% test score?",
    "Is a person likely to have diabetes with BMI 28 and age 45?",
  ];

  // Handle prediction request
  const handleQuery = async () => {
    if (!selectedQuestion) {
      toast.error("Please select a question!");
      return;
    }
  
    const requestUrl = `http://127.0.0.1:8000/ask?q=${encodeURIComponent(selectedQuestion)}`;
    console.log("Sending request to:", requestUrl);  // Log the URL to check
  
    try {
      const response = await axios.get(requestUrl);
      setPrediction(response.data.prediction);
      toast.success(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      toast.error("Error fetching prediction! Check console for details.");
    }
  };
  
  

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Ask a Question</h2>
      <select
        value={selectedQuestion}
        onChange={(e) => setSelectedQuestion(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
      >
        <option value="">Select a question</option>
        {questions.map((q, index) => (
          <option key={index} value={q}>
            {q}
          </option>
        ))}
      </select>
      <br />
      <button
        onClick={handleQuery}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px", cursor: "pointer" }}
      >
        Ask
      </button>
      {prediction && <p style={{ marginTop: "20px", fontSize: "18px" }}>Prediction: {prediction}</p>}
      <ToastContainer />
    </div>
  );
}
