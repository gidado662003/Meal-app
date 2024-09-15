import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SideBar from "./component/SideBar";
import Recipes from "./pages/Recipies";
import Header from "./component/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Instructions from "./pages/instructions";
import MealPlanner from "./pages/mealPlanner";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";
import { Toaster } from "./components/ui/toaster";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  function MainContent() {
    const location = useLocation();
    const loggedIn = localStorage.getItem("loggedIn");

    return (
      <>
        <Routes>
          <Route path="/recipies" element={<Recipes />} />
          <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/menu"
              element={
                loggedIn === "true" ? (
                  <Menu />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route path="/menu/instructions/:id" element={<Instructions />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div className="text-[4rem] text-center mt-[140px] ">
                {location.pathname} Page not found...
                <p>
                  GO <Link to="/">HOME</Link>
                </p>
              </div>
            }
          />
        </Routes>
      </>
    );
  }

  return (
    <Router>
      <MainContent />
      <Toaster />
    </Router>
  );
}

export default App;
