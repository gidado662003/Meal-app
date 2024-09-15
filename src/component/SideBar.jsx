import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  return (
    <nav className="text-right">
      <ul className=" text-right text-[1.3rem] hidden md:block">
        <li className=" nav-list">
          <Link
            to="/"
            className={`border-r-4 ${(location.pathname = "/"
              ? "border-white"
              : "border-primary")} pr-3 `}
          >
            <span className=""> Home </span>
            <i className="bi bi-house "></i>
          </Link>
        </li>
        <li className=" nav-list">
          <Link
            to="/menu"
            className={`border-r-4 ${(location.pathname = ""
              ? "border-white"
              : "border-primary")} pr-3 `}
          >
            <span> Menu </span>
            <i className="bi bi-question-circle"></i>
          </Link>
        </li>
        <li className="nav-list">
          <Link
            to="/recipies"
            className={`border-r-4 ${(location.pathname = "/menu"
              ? "border-white"
              : "border-primary")} pr-3 `}
          >
            <span> Recipies </span>
            <i className="bi bi-cookie"></i>
          </Link>
        </li>
        <li className="nav-list">
          <Link
            to="meal-planner"
            className={`border-r-4 ${(location.pathname = "/menu"
              ? "border-white"
              : "border-primary")} pr-3 `}
          >
            <span> Meal Planner </span>
            <i className="bi bi-cookie"></i>
          </Link>
        </li>
        <li className="nav-list">
          <a
            href="#"
            className={`border-r-4 ${(location.pathname = "/recipies"
              ? "border-white"
              : "border-primary")} pr-3 `}
          >
            <span> Contact </span>
            <i className="bi bi-envelope"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
