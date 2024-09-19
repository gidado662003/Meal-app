import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
export default function Menu() {
  const [data, setData] = useState([]);
  const [searchTerm, setsearchTerm] = useState();
  const [inputData, setinputData] = useState({
    food: "",
  });
  const [loading, setLoading] = useState(false);
  function getInputData(e) {
    const { name, value } = e.target;
    setinputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function displayFoodData() {
    if (inputData.food === "") {
      alert("Please enter a food name");
      return;
    } else {
      setsearchTerm(inputData.food);
    }
  }
  function keyEnter(e) {
    if (e.key === "Enter") {
      displayFoodData();
    }
  }
  console.log(inputData);
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [searchTerm]);
  console.log(data);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 px-3 flex font-serif flex-col min-h-[100vh]">
        <div className="flex flex-col pt-[40px] text-center">
          <h1 className="text-center mb-3 text-5xl">Search Your Food Recipe</h1>
          <div>
            <input
              type="text"
              name="food"
              placeholder="Search Your Food Recipe"
              className=" w-[320px] rounded-[8px] p-2 border-[3px] indent-2 mb-2"
              onChange={getInputData}
              onKeyUp={keyEnter}
            />
            <button
              className="bg-slate-300 p-3 ml-1 px-[20px] rounded-xl cursor-pointer"
              onClick={displayFoodData}
            >
              {" "}
              Search
            </button>
          </div>
        </div>
        <div className="flex justify-center  w-full text-center">
          <div className="mt-[30px] grid md:grid-cols-3 sm:grid-cols-2 justify-center items-center gap-20">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="group text-center w-[270px] mb-8 cursor-pointer"
                >
                  <Skeleton height={100} />
                  <p className="font-foodlocation text-2xl">
                    <Skeleton height={100} />
                  </p>
                  <Skeleton />
                </div>
              ))
            ) : data?.meals ? (
              data.meals.map((items) => (
                <div
                  key={items.id}
                  className="group text-center w-[270px] mb-8 cursor-pointer overflow-hidden"
                >
                  <img
                    className="rounded-[10px]  duration-[0.6s] group-hover:scale-[1.1]"
                    src={items.strMealThumb}
                    alt=""
                  />
                  <p className="font-foodlocation text-2xl mt-4">
                    {items.strMeal}
                  </p>
                  <p>{items.strArea}</p>

                  <button
                    onClick={() => {
                      navigate(`/menu/instructions/${items.idMeal}`);
                      console.log(items.meals);
                    }}
                    className="bg-[#d62c2c] text-white px-4 py-2 rounded-[5px]"
                  >
                    Click for Instruction
                  </button>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
