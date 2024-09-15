import { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LogOut, User, Heart } from "lucide-react";

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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Header() {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState("false");
  const ref = useRef(null);

  function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  }

  useEffect(() => {
    if (toggle) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [toggle]);

  useEffect(() => {
    let temp = localStorage.getItem("loggedIn");
    if (temp) {
      setLoggedIn(temp);
    } else {
      setLoggedIn("false");
    }
  }, []);

  function logOut() {
    localStorage.removeItem("loggedIn");
    setLoggedIn("false");
  }

  console.log(toggle);

  return (
    <>
      <div>
        <nav className="flex justify-between items-center p-4 rounded-md ">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Gidado Foody</h1>
          </div>
          <div className="hidden md:block space-x-8 z-10">
            <Link to="/" className="text-gray-700 hover:text-red-600">
              Home
            </Link>

            <Link to="/about" className="text-gray-700 hover:text-red-600">
              About Us
            </Link>
            <Link
              to="meal-planner"
              className="text-gray-700 hover:text-red-600"
            >
              Menu Planner
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600">
              Contact
            </Link>
          </div>
          {loggedIn === "true" && (
            <div className="flex items-center space-x-2 z-50">
              <i className="bi bi-person-circle text-2xl text-red-600"></i>
              <DropdownMenu className="z-[9999] cursor-pointer">
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
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4 z-[9999] " />
                      <Link to="/favorite">
                        <span>Favorite</span>
                      </Link>

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
          )}
          {loggedIn === "false" && (
            <div className="hidden md:block z-10">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
                <Link to="/login">Sign In</Link>
              </button>

              <button className="bg-red-600 text-white px-4 py-2 rounded-full ml-4">
                Sign Up
              </button>
            </div>
          )}
          <div onClick={() => setToggle(!toggle)} className="block md:hidden">
            <i className=" cursor-pointer bi bi-list text-[2rem]"></i>
          </div>
        </nav>
      </div>

      <div
        ref={ref}
        className={`fixed w-[250px]  bg-gradient-to-b from-[#af1e1ef6] to-[#9b1010] top-0 bottom-0  z-[1000] shadow-xl duration-300 transform ${
          toggle ? `translate-x-0 block md:hidden` : " -translate-x-full"
        } p-4`}
      >
        <h1 className="border-b font-bold border-gray-100 hover:text-gray-900 p-4 text-2xl text-gray-500 mb-4">
          <a href="/" className="hover:text-gray-300">
            Gi<span className="text-primary font-serif">dad</span>o Food
          </a>
        </h1>
        <ul className="flex flex-col gap-6">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-semibold hover:text-red-300 transition-all duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="text-white text-lg font-semibold hover:text-red-300 transition-all duration-300"
              onClick={() => setToggle(true)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="meal-planner"
              className="text-white text-lg font-semibold hover:text-red-300 transition-all duration-300"
              onClick={() => setToggle(true)}
            >
              Menu Planner
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white text-lg font-semibold hover:text-red-300 transition-all duration-300"
              onClick={() => setToggle(true)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
