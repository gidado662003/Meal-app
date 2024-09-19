import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Instructions() {
  const [data, setdData] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [Ingredients, setIngredients] = useState(true);
  const [Instructions, setInstructions] = useState(false);
  const [favourites, setFavourites] = useState([
    {
      id: "",
      name: "",
      image: "",
    },
  ]);

  const { id } = useParams();
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  function toggleIngredients() {
    setIngredients(true);
    setInstructions(false);
  }

  function toggleInstructions() {
    setIngredients(false);
    setInstructions(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setdData(data);
        setLoading(false); // Set loading to false once data is fetched

        let tempFav = localStorage.getItem("favorites");
        if (tempFav) {
          setFavourites(JSON.parse(tempFav));
        }
      } catch (error) {
        console.log("response error", error);
        setLoading(false); // Also stop loading if an error occurs
      }
    }
    fetchData();
  }, []);

  function handleFavorite(meal) {
    const newFavourites = [...favourites];
    const foundIndex = newFavourites.findIndex(
      (index) => index.id === meal.idMeal
    );

    if (foundIndex >= 0) {
      newFavourites.splice(foundIndex, 1);
    } else {
      newFavourites.push({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
      });
    }
    setFavourites(newFavourites);
    localStorage.setItem("favorites", JSON.stringify(newFavourites));
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-primary border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : data !== null ? (
        data?.meals?.map((items, index) => (
          <div
            key={items.idMeal}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6"
          >
            {/* Meal Title and Image */}
            <div className="col-span-2">
              <h1 className="text-4xl font-bold mb-4">{items.strMeal}</h1>
              <img
                src={items.strMealThumb}
                alt={items.strMeal}
                className="rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Ingredients and Instructions Section */}
            <div className="col-span-3 p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between text-center mb-6">
                {/* Ingredients Button */}
                <p
                  className={`border-2 text-lg font-medium rounded-lg transition-colors duration-300 ${
                    Ingredients
                      ? "border-primary bg-[#ff6f61] text-white shadow-md"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } w-full p-3 cursor-pointer`}
                  onClick={toggleIngredients}
                >
                  Ingredients
                </p>
                {/* Instructions Button */}
                <p
                  className={`border-2 text-lg font-medium rounded-lg transition-colors duration-300 ${
                    Instructions
                      ? "border-primary bg-[#ff6f61] text-white shadow-md"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } w-full p-3 ml-4 cursor-pointer`}
                  onClick={toggleInstructions}
                >
                  Instructions
                </p>
              </div>

              {/* Add to Favorite Button */}
              <button
                onClick={() => handleFavorite(items)}
                className="flex items-center mb-6 bg-gray-100 text-gray-600 py-2 px-4 rounded-md hover:bg-yellow-50 transition-colors duration-300"
              >
                {favourites.filter((data) => data.id == id)?.length > 0 ? (
                  <i className="bi bi-star-fill text-yellow-500 mr-2"></i>
                ) : (
                  <i className="bi bi-star text-gray-400 mr-2"></i>
                )}
                Favorite
              </button>

              {/* Display Ingredients */}
              {Ingredients && (
                <div className="font-serif text-lg text-gray-700 leading-7">
                  <h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
                  <ul className="list-disc list-inside">
                    {[...Array(30)].map((_, index) => {
                      const ingredient = items[`strIngredient${index + 1}`];
                      const measurement = items[`strMeasure${index + 1}`];
                      return (
                        ingredient && (
                          <li key={index} className="mb-2">
                            <span className="font-medium">{ingredient}:</span>{" "}
                            {measurement}
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Display Instructions */}
              {Instructions && (
                <div className="font-serif text-lg text-gray-700 leading-7">
                  <h2 className="text-2xl font-semibold mb-4">Instructions:</h2>
                  <p>
                    {items.strInstructions
                      .split(".")
                      .filter((step) => step.trim() !== "")
                      .map((step, index) => {
                        return (
                          <p key={step} className="mb-4">
                            step {index + 1}: {step}
                          </p>
                        );
                      })}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-7">
          <p className="text-gray-600">No data available</p>
          <Link to="/menu" className="text-blue-500 hover:underline">
            Go back to Menu Search
          </Link>
        </div>
      )}
    </>
  );
}
