import React from "react";
import biweekly from "../assets/images/biweekly.png";
import weekly from "../assets/images/weekly.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contests = () => {
  // Example data for contests
  const contests = [
    {
      id: 1,
      name: "CodeFest 2024",
      date: "Sunday 8:00 AM GMT+5:30",
      description:
        "Annual coding festival showcasing talent from around the world.",
    },
    {
      id: 2,
      name: "Algorithm Challenge",
      date: "Sunday 8:00 AM GMT+5:30",
      description:
        "Test your algorithmic skills in this intense coding competition.",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-neutral-800">
      <Navbar/>
      {/* Main content */}
      <main className="container flex pt-16 md:pt-24 md:px-40 mx-auto text-white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {contests.map((contest, index) => (
            <div
              key={contest.id}
              className="bg-neutral-900 rounded-lg shadow-lg overflow-hidden mb-4 min-w-96"
            >
              {/* Image Section */}
              <img
                src={index % 2 !== 0 ? weekly : biweekly}
                alt={contest.name}
                className="w-full h-48 object-cover object-center"
              />

              {/* Details Section */}
              <div className="px-6 py-2">
                <h2 className="text-xl font-bold text-white mb-1">
                  {contest.name}
                </h2>
                <p className="text-sm text-gray-300 mb-1">{contest.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Contests;
