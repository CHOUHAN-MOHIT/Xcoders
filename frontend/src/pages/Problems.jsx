import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import headerImg from "../assets/images/header.png";
import { fetchProblems } from "../services/apiFuntions";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Example data for problems
const getDifficultyTextColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};
const Problems = () => {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const getProblems = async () => {
      try {
        const problemsData = await fetchProblems();
        setProblems(problemsData); // Assuming problemsData is an array of problems
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    getProblems();
  }, []);

  return (
    <div
      className="leading-normal tracking-normal h-screen bg-cover bg-fixed bg-neutral-800"
      //   style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className="h-full">
        <Navbar/>

        {/* Main */}
        <div className="container flex pt-16 md:pt-24 md:px-40 mx-auto text-white">
          <div className="w-2/3">
            <div className="overflow-x-auto">
              <table className="min-w-full border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <thead className="text-gray-400 bg-gray-800">
                  <tr>
                    <th className="text-left py-2 px-3 border-b-2 border-gray-300">
                      Title
                    </th>
                    <th className="text-left py-2 px-3 border-b-2 border-gray-300">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={problem.id}
                      className={`${index % 2 !== 0 ? "bg-neutral-900" : ""}`}
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                      <Link to={`/problem/${problem.id}`} className="cursor-pointer">
        {problem.id}. {problem.name}
      </Link>
                      </td>
                      <td
                        className={`px-3 py-2 whitespace-nowrap capitalize ${getDifficultyTextColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Problems;
