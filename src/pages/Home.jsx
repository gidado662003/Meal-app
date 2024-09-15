import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cardData from "../component/cardData";
import Header from "../component/Header";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [filteredCard, setFilteredCard] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const filtered = cardData.filter((data) => data.viewHome === true);
      setFilteredCard(filtered);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    // <div className="p-7 bg-gray-300 font-serif"></div>
    <div className="bg-gray-100 min-h-screen px-4 rounded-[21px]">
      {/* <Header /> */}

      <div className="w-full flex flex-col md:flex-row items-center justify-between xl:-mt-[250px]">
        <div className="w-full md:w-1/2 ">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            It’s not just Food, It’s an Experience.
          </h1>
          <div className="mt-8 flex max-[510px]:flex-col gap-y-[16px] whitespace-nowrap cursor-pointer">
            <Link
              to="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 mr-4"
            >
              Nutrition details
            </Link>
            <Link
              to="/recipies"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-lg font-semibold cursor-pointer hover:bg-gray-300"
            >
              View Recipies
            </Link>
          </div>
          <button
            onClick={() => {
              document
                .getElementById("specials")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gray-600 cursor-pointer hover:bg-gray-800 mt-[20px] text-white px-6 py-3 rounded-full text-lg font-semibold  mr-4"
          >
            View Our Special
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0">
          <img
            src="./food23.png"
            alt="Delicious food"
            className="object-cover w-[90%] md:w-auto z-0"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2
          className="text-3xl font-bold text-gray-800 text-center"
          id="specials"
        >
          Our Specials
        </h2>
        <div className="grid sm:grid-cols-4 grid-cols-1 mt-[80px] gap-[80px] sm:gap-[20px]">
          {loading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-col justify-center items-center p-4 rounded-t-[150px] relative shadow-md"
                >
                  <div className="-mt-20 z-10">
                    <Skeleton circle height={192} width={192} />
                  </div>
                  <div className="p-4 text-center mt-8">
                    <Skeleton width={150} height={20} />
                    <Skeleton width={100} height={15} className="mt-2" />
                    <Skeleton width={80} height={25} className="mt-2" />
                  </div>
                </div>
              ))
            : filteredCard.map((items) => (
                <div
                  key={items.detail}
                  className="group bg-white flex flex-col justify-center items-center p-4 rounded-t-[150px] relative shadow-md over"
                >
                  <div></div>
                  <img
                    src={items.img}
                    alt={items.detail}
                    className=" w-48 h-48 object-cover rounded-full -mt-20 z-10 shadow-lg group-hover:scale-[1.1] duration-[0.3s]"
                  />
                  <div className="p-4 text-center mt-8">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {items.detail}
                    </h3>
                    <p className="text-gray-500">With Vegetables</p>
                    <p className="text-lg font-bold text-gray-700 mt-2">
                      $25.00
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
