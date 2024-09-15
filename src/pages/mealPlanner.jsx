import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MealPlanner() {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    search: "",
  });
  const [loading, setLoading] = useState(false);
  // Hover data
  const [hoverData, setHoverData] = useState([]);
  const [filteredHoverData, setFilteredHoverData] = useState();
  const [test, setTest] = useState([]);
  //
  //
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedIndex, setselectIndex] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState([{}]);

  // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData.search}`;
  const url = ` https://api.spoonacular.com/food/search?query=${inputData.search}&apiKey=25e43c1938a54dd4a6013c68ec20b6b3`;
  const hoverurl = `https://api.spoonacular.com/food/ingredients/9266/information?amount=1&apiKey=25e43c1938a54dd4a6013c68ec20b6b3`;
  useEffect(() => {
    fetch(hoverurl)
      .then((response) => response.json())
      .then((data) => setHoverData(data.nutrition.nutrients));
  }, []);
  useEffect(() => {
    if (hoverData.length > 0) {
      setFilteredHoverData(hoverData.slice(0, 3));
      setTest(hoverData.slice(0, 3));
    }
  }, [hoverData]);

  function showNext() {
    setFilteredHoverData((prevData) => {
      if (test.length >= hoverData.length) {
        return hoverData.slice(0, 3);
      } else {
        console.log(test);
        setTest(hoverData.slice(0, test.length + 3));
        return hoverData.slice(test.length, test.length + 3);
      }
    });
  }
  function showPrev() {
    setFilteredHoverData(() => {
      if (test.length - 3 > 0) {
        setTest(hoverData.slice(0, 3));
        return hoverData.slice(0, 3);
      } else {
        setTest(hoverData.slice(0, test.length - 3));
        return hoverData.slice(test.length - 3, test.length);
      }
    });
  }

  useEffect(() => {
    {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.searchResults);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [inputData]);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleInputChange = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const selectFoodFunc = (food) => {
    setSelectedMeals((prev) => {
      let tempValue = prev;
      tempValue[selectedIndex] = {
        ...tempValue[selectedIndex],
        [selectedMealType]: food?.name,
        [`${selectedMealType}Image`]: food?.image,
      };

      return tempValue;
    });
  };

  return (
    <>
      <Dialog
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setInputData({ search: "" });
            setData([]);
          }
        }}
      >
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead>Day</TableHead>
              <TableHead>Breakfast</TableHead>
              <TableHead>Lunch</TableHead>
              <TableHead>Dinner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {daysOfWeek.map((items, index) => (
              <TableRow key={items}>
                <TableCell className="font-medium text-transform: uppercase">
                  {items}
                </TableCell>
                <TableCell>
                  {selectedMeals?.[index]?.["breakfast"] ? (
                    <>
                      <HoverCard>
                        <HoverCardTrigger>
                          <img
                            src={selectedMeals?.[index]?.["breakfastImage"]}
                            alt=""
                            className="w-[100px] h-[100px] object-cover cursor-pointer"
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-white/90 shadow-xl max-h-[420px] overflow-y-auto p-6 rounded-xl w-[380px] text-gray-800 max-w-lg">
                          <div className="flex items-center mb-4">
                            <h2 className="text-lg font-semibold text-blue-600">
                              Nutritional Details
                            </h2>
                          </div>
                          <div className="space-y-4">
                            {filteredHoverData.map((items, idx) => (
                              <div
                                key={idx}
                                className="text-sm font-medium grid grid-cols-3 items-baseline gap-4 border-b pb-2 border-gray-200"
                              >
                                <div> {items.name}</div>
                                <div>
                                  Amount: {items.amount} ({items.unit})
                                </div>
                                <div>
                                  Daily Need: {items.percentOfDailyNeeds}%
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-6">
                            <button
                              onClick={showPrev}
                              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                            >
                              <span className="bi bi-arrow-left"></span> Prev
                            </button>
                            <button
                              onClick={showNext}
                              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                            >
                              Next <span className="bi bi-arrow-right"></span>
                            </button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      {selectedMeals?.[index]?.["breakfast"]}
                    </>
                  ) : (
                    <DialogTrigger
                      onClick={() => {
                        setSelectedMealType("breakfast");
                        setselectIndex(index);
                      }}
                      className="bg-[#FF6363] text-white px-[20px] py-[10px] rounded-lg hover:bg-[#ff4d4d] "
                    >
                      {" "}
                      "NO Meal (Select)"
                    </DialogTrigger>
                  )}
                </TableCell>
                <TableCell>
                  {selectedMeals?.[index]?.["lunch"] ? (
                    <>
                      <HoverCard>
                        <HoverCardTrigger>
                          <img
                            src={selectedMeals?.[index]?.["lunchImage"]}
                            alt=""
                            className="w-[100px] h-[100px] object-cover cursor-pointer"
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-white/90 shadow-xl p-6 rounded-xl w-[380px] text-gray-800 max-w-lg">
                          <div className="flex items-center mb-4">
                            <h2 className="text-lg font-semibold text-blue-600">
                              Nutritional Details
                            </h2>
                          </div>
                          <div className="space-y-4">
                            {filteredHoverData.map((items, idx) => (
                              <div
                                key={idx}
                                className="text-sm font-medium grid grid-cols-3 items-baseline gap-4 border-b pb-2 border-gray-200"
                              >
                                <div> {items.name}</div>
                                <div>
                                  Amount: {items.amount} ({items.unit})
                                </div>
                                <div>
                                  Daily Need: {items.percentOfDailyNeeds}%
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-6">
                            <button
                              onClick={showPrev}
                              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                            >
                              Prev
                            </button>
                            <button
                              onClick={showNext}
                              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                            >
                              Next
                            </button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      {selectedMeals?.[index]?.["lunch"]}
                    </>
                  ) : (
                    <DialogTrigger
                      onClick={() => {
                        setSelectedMealType("lunch");
                        setselectIndex(index);
                      }}
                      className="bg-[#FF6363] text-white px-[20px] py-[10px] rounded-lg hover:bg-[#ff4d4d] "
                    >
                      {" "}
                      "NO Meal (Select)"
                    </DialogTrigger>
                  )}
                </TableCell>
                <TableCell>
                  {selectedMeals?.[index]?.["dinner"] ? (
                    <>
                      <HoverCard>
                        <HoverCardTrigger>
                          <img
                            src={selectedMeals?.[index]?.["dinnerImage"]}
                            alt=""
                            className="w-[100px] h-[100px] object-cover cursor-pointer"
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-white/90 shadow-xl p-6 rounded-xl w-[380px] text-gray-800 max-w-lg">
                          <div className="flex items-center mb-4">
                            <h2 className="text-lg font-semibold text-blue-600">
                              Nutritional Details
                            </h2>
                          </div>
                          <div className="space-y-4">
                            {filteredHoverData.map((items, idx) => (
                              <div
                                key={idx}
                                className="text-sm font-medium grid grid-cols-3 items-baseline gap-4 border-b pb-2 border-gray-200"
                              >
                                <div> {items.name}</div>
                                <div>
                                  Amount: {items.amount} ({items.unit})
                                </div>
                                <div>
                                  Daily Need: {items.percentOfDailyNeeds}%
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-6">
                            <button
                              onClick={showMore}
                              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                            >
                              Learn More
                            </button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      {selectedMeals?.[index]?.["dinner"]}
                    </>
                  ) : (
                    <DialogTrigger
                      onClick={() => {
                        setSelectedMealType("dinner");
                        setselectIndex(index);
                      }}
                      className="bg-[#FF6363] text-white px-[20px] py-[10px] rounded-lg hover:bg-[#ff4d4d] "
                    >
                      {" "}
                      "NO Meal (Select)"
                    </DialogTrigger>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DialogContent className="max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Select a Meal</DialogTitle>
            <center>
              <input
                type="text"
                className="w-[200px] my-4 border-2 p-2"
                name="search"
                onChange={handleInputChange}
              />
            </center>
            <DialogDescription>
              {inputData.search === "" ? (
                <h1 className="text-center">No Recipe Entered</h1>
              ) : loading ? (
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
                    {[...Array(6)].map((_, index) => (
                      <div key={index}>
                        <Skeleton />
                        <Skeleton height={100} width={100} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 cursor-pointer">
                    {data ? (
                      data[0].results?.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-center items-center flex-col overflow-hidden"
                          onClick={() => selectFoodFunc(item)}
                        >
                          <img
                            src={item.image}
                            alt={item.strMeal}
                            className="w-[100px] h-[100px] object-cover hover:scale-[1.06] rounded-lg"
                          />
                          <h1>{item.name}</h1>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="text-red-500 flex justify-center h-full w-full">
                          No Data Fetched
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <Carousel className="w-[200px] ml-[90px]">
        <CarouselContent>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </>
  );
}
