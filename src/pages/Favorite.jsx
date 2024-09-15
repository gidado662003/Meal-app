import { useEffect, useState } from "react";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteData = localStorage.getItem("favorites");

    if (favoriteData) {
      setFavorites(JSON.parse(favoriteData));
    }
  }, []);

  function handleRemove(id) {
    const updatedFavorites = favorites.filter((item) => {
      return item.id !== id;
    });
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Meals</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(
            (item) =>
              item.id !== "" && (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold mb-3">{item.name}</h2>
                    <div
                      className="cursor-pointer bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-200 ease-in-out"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove from Favorites
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">No favorites yet!</p>
      )}
    </div>
  );
}
