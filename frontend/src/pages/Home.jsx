import React , { useContext , useState } from "react";
import headerImg from "../assets/images/header.png";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../components/Register";
import { UserContext } from "../contexts/UserContext";
import heroBanner1 from '../assets/images/hb1.png'
import heroBanner3 from '../assets/images/hb2.png'
import heroBanner4 from '../assets/images/hb3.png'
import heroBanner5 from '../assets/images/hb4.png'
import heroBanner6 from '../assets/images/coding.png'

const Home = () => {
  const { accessToken } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div
      className="leading-normal tracking-normal h-screen text-indigo-400 bg-cover bg-fixed"
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className="h-full">
        <Navbar />
        {/* Main */}
        <div className="container pt-16 md:pt-24 md:px-40 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {/* Left Col */}
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                Level Up{" "}
              </span>{" "}
              Your Coding Skills with XCoders
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
              Challenge yourself with real-time coding contests and master data
              structures & algorithms effortlessly.
            </p>
          </div>

          {/* Right Col */}
          <div className="w-full xl:w-3/5 p-8 overflow-hidden grid place-content-center">
          {accessToken ? (
            <>
              <img src={heroBanner6} className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"/>
            </>
          ) : (
            <>
            <Login showLogin={showLogin} setShowLogin={setShowLogin}/>
            <Register showLogin={showLogin} setShowLogin={setShowLogin}/>
            </>
          )}
            
          </div>
        </div>

        <Footer/>
      </div>
    </div>
  );
};

export default Home;
