import { useEffect, useState } from "react";
import cardData from "../component/cardData";
import SideBar from "../component/SideBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Recipes() {
  const navigate = useNavigate();
  const cardDetail = cardData;
  const [cardFilter, setCardFilter] = useState(cardDetail.slice(0, 6));
  const [loading, setLoading] = useState(true); // Start with loading set to true
  const [LoadingMore, setShowMoreLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const [menuList, setmenuList] = useState(false);

  function toggleList() {
    setmenuList(!menuList);
    console.log(menuList);
  }

  function showMore() {
    setShowMoreLoading(true);
    setTimeout(() => {
      setCardFilter((prevState) =>
        prevState.length === cardDetail.length
          ? cardDetail
          : prevState.concat(
              window.innerWidth < 668
                ? cardDetail.slice(prevState.length, prevState.length + 2)
                : cardDetail.slice(prevState.length, prevState.length + 3)
            )
      );
      setShowMoreLoading(false);
    }, 2000);
  }
  const [loggedIn, setLoggedIn] = useState("false");

  useEffect(() => {
    let temp = localStorage.getItem("loggedIn");

    if (temp === "true") {
      setLoggedIn("true");
    } else {
      setLoggedIn("false");
    }
  }, []);

  function logOut() {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn("false");
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="border-b font-bold border-gray-100 hover:text-gray-900 p-4 text-4xl text-gray-500">
            <a href="/" className="hover:text-gray-300">
              Gi<span className="text-primary font-serif">dad</span>o Food
            </a>
          </h1>

          <div className="block md:hidden">
            <i className="bi bi-list text-3xl" onClick={toggleList}></i>
          </div>
        </div>

        <div
          className={`relative flex justify-center duration-300 ease-in-out mb-1 ${
            menuList ? "h-8" : "h-0"
          }`}
        >
          <ul className={`flex justify-center md:hidden overflow-hidden`}>
            <li className="nav-list">
              <Link to="/" className="border-r-4 border-white pr-3">
                <span className="">Home </span>
                <i className="bi bi-house"></i>
              </Link>
            </li>
            <li className="nav-list">
              <Link to="/menu" className="border-r-4 border-white pr-3">
                <span> Menu </span>
                <i className="bi bi-question-circle"></i>
              </Link>
            </li>
            <li className="nav-list">
              <Link to="/recipies" className=" pr-3">
                <span className="border-b-4 border-primary"> Recipies </span>
                <i className="bi bi-cookie "></i>
              </Link>
            </li>
            <li className="nav-list">
              <Link to="/meal-planner" className="border-b-4 border-white pr-3">
                <span> Meal Planner </span>
                <i className="bi bi-cookie"></i>
              </Link>
            </li>
            <li className="nav-list">
              <a href="#" className="border-r-4 border-white pr-3">
                <span> Contact </span>
                <i className="bi bi-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-gray-600 grid grid-cols-3">
        <div className="md:col-span-1 md:flex md:justify-end">
          <SideBar />
        </div>
        <main className="bg-gray-50 p-6 col-span-3 md:col-span-2">
          <div className="flex justify-center items-center gap-7 sm:justify-end transition-all">
            {loggedIn === "true" ? (
              <div className="flex items-center jus space-x-2 z-50">
                <i className="bi bi-person-circle text-2xl text-red-600"></i>
                <DropdownMenu className="z-[9999]">
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-primary">
                      <span className="mr-2">Settings</span>
                      <IoSettingsOutline />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 z-[9999]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4 z-[9999]" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="flex justify-between items-center ml-3">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to Logout?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <div className="flex justify-between w-full">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-primary hover:bg-tertiary"
                              onClick={logOut}
                            >
                              Logout
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-7 sm:justify-end transition-all">
                <span
                  onClick={() => navigate("/login")}
                  className="btn text-primary hover:bg-primary hover:text-white border-primary border-2 rounded-lg hover:transition-all"
                >
                  <span className="p-4">Log in</span>
                </span>
                <span className="btn text-primary hover:bg-primary hover:text-white border-primary rounded-lg border-2">
                  <span className="p-4">Sign up</span>
                </span>
              </div>
            )}
          </div>

          <header>
            <h2 className="text-gray-700 text-6xl font-semibold mb-4">
              Recipes
            </h2>
            <h3 className="text-2xl uppercase font-semibold">For Rich men</h3>
          </header>

          <div className="my-3">
            <h4 className="text-xl font-bold pb-3">Latest Recipes</h4>

            {/* content */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2 mb-7">
              {loading
                ? [...Array(6)].map((_, index) => (
                    <div key={index} className="card">
                      <div className="card-inner">
                        <div className="card-face front">
                          <Skeleton className="w-full h-32 sm:h-48 object-cover" />
                        </div>
                        <div className="m-4">
                          <span className="font-bold">
                            <Skeleton width={150} />
                          </span>
                          <span className="block text-gray-500 text-sm">
                            <Skeleton width={100} />
                          </span>
                        </div>
                        <div>
                          <span className="timer">
                            <i className="bi bi-clock"></i>
                            <Skeleton className="h-full" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                : cardFilter.map((items, idx) => (
                    <div key={idx} className="card">
                      <div className="card-inner">
                        <div className="card-face front">
                          <img
                            src={items.img}
                            alt=""
                            className="w-full h-32 sm:h-48 object-cover"
                          />
                          <div className="m-4">
                            <span className="font-bold">{items.detail}</span>
                            <span className="block text-gray-500 text-sm">
                              {items.author}
                            </span>
                          </div>
                          <div>
                            <span className="timer">
                              <i className="bi bi-clock"></i> {items.time}
                            </span>
                          </div>
                        </div>
                        <div className="card-face back">
                          <div className="m-4 text-xs">
                            <div>
                              <span className="font-bold">
                                <i className="bi bi-plate"></i> Description:{" "}
                              </span>{" "}
                              {items.description}
                            </div>
                            <div className="mt-6">
                              <span className="font-bold">Ingredients: </span>
                              {items.ingredients}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              {LoadingMore &&
                [...Array(window.innerWidth < 668 ? 2 : 3)].map((_, index) => (
                  <div key={index} className="card">
                    <div className="card-inner">
                      <div className="card-face front">
                        <Skeleton className="w-full h-32 sm:h-48 object-cover" />
                      </div>
                      <div className="m-4">
                        <span className="font-bold">
                          <Skeleton width={150} />
                        </span>
                        <span className="block text-gray-500 text-sm">
                          <Skeleton width={100} />
                        </span>
                      </div>
                      <div>
                        <span className="timer">
                          <i className="bi bi-clock"></i>
                          <Skeleton className="h-full" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <h4 className="font-bold">Most Popular</h4>

            <div></div>
          </div>

          <div className="flex justify-center">
            <div
              className="btn bg-secondary-100 text-secondary-200 py-2 px-5 cursor-pointer hover:scale-150"
              onClick={showMore}
            >
              Load more
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
