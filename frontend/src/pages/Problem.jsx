import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import axios from "axios";
import api from "../services/apis";

const Problem = () => {
  const codeTemplate = `#include <bits/stdc++.h>
using namespace std;

int main() {
    // your code here

    return 0;
}`;
  const [code, setCode] = useState(codeTemplate);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { id } = useParams(); // Accessing the "id" parameter from the URL
  const [problem, setProblem] = useState(null); // State to hold the fetched problem data
  const [language, setLanguage] = useState('c++');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/apis/problem/${id}`); // Adjust API endpoint as per your backend
        setProblem(response.data); // Assuming response.data contains the problem details
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
  
    fetchProblem();
  }, [id]); // Fetch data whenever "id" changes
  const handleCodeSubmit = async (code, language) => {
    try {
      const response = await api.post('/apis/problem/submissions/1/', { code, language });
      // console.log('Code submission successful:', response.data);
      // Process the response data (e.g., show success message, handle result)
    } catch (error) {
      console.error('Error submitting code:', error);
      // Handle the error (e.g., show error message to the user)
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await handleCodeSubmit(code, language);
  };

  if (!problem) {
    return <div>Loading...</div>; // Handle loading state while fetching data
  }

  return (
    <div className="h-screen bg-neutral-800">
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-5/6">
        {/* Problem description section */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto text-white">
          <h1 className="text-2xl font-bold mb-4">{problem.name}</h1>
          {/* Add the problem description content here */}
          <div dangerouslySetInnerHTML={{ __html: problem.description }} />
        </div>

        {/* Editor section */}
        <div className="w-full md:w-1/2 p-1 h-full flex flex-col">
          <Editor
            defaultLanguage="cpp"
            defaultValue={codeTemplate}
            value={code}
            onChange={handleCodeChange}
            theme="vs-dark"
            className="border border-neutral-700 flex-grow"
          />
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-700"
          >
            Submit
          </button>
          <div className="h-1/3 bg-neutral-700 text-white flex flex-row">
            <div className="w-1/2 border border-neutral-600 max-h-36 overflow-y-hidden">
              <textarea
                value={input}
                onChange={handleInputChange}
                className="w-full h-36 p-2 bg-neutral-700  text-gray-300 outline-none focus:bg-neutral-600"
                placeholder="Enter input for your code here..."
              ></textarea>
            </div>
            <div className="w-1/2 border border-neutral-600 p-2 max-h-36 overflow-y-auto text-gray-300">
              <h2 className="font-bold">Output:</h2>
              <p>{output}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
