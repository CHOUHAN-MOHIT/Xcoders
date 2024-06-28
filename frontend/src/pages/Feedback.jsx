import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import feedbackImg from "../assets/images/feedback.png"; // Adjust the path as necessary
import pointingManImg from "../assets/images/point.png"; // Adjust the path as necessary

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    if (anonymous) {
      // Handle anonymous feedback submission logic
    } else {
      // Handle regular feedback submission logic
    }
    setMessage("Thank you for your feedback!");
  };

  return (
    <div className="leading-normal tracking-normal h-screen bg-cover bg-fixed bg-neutral-800">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center pt-16 md:pt-24 md:px-40 mx-auto text-white">
        <div className="w-full flex justify-center items-center">
          <img
            src={pointingManImg}
            alt="Pointing Man"
            className="max-h-80 z-10 -mr-3"
          />
          <div className="w-full max-w-xl backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg py-5 px-10 -ml-10 bg-gray-900 text-white h-96">
            <h2 className="text-2xl font-bold pb-5">Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="feedback"
                  className="block mb-2 text-sm font-medium"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full h-48 outline-none py-2.5 px-4"
                  placeholder="Share your thoughts"
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="mb-4 flex flex-row-reverse items-center ">
                  <label
                    htmlFor="anonymous"
                    className="pl-2 text-sm font-medium"
                  >
                    Send as anonymous
                  </label>
                  <input
                    id="anonymous"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                  />
                </div>
              </div>

              {message && <div className="mb-4 text-green-500">{message}</div>}
              <div className="flex items-center">
                <button
                  type="submit"
                  className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-8 w-full sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
