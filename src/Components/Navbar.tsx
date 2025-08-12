import  { useEffect, useState } from "react";
import { Sun, Moon, AlignJustify, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Appdispatch, rootState } from "../redux/Store";
import { useDispatch } from "react-redux";
import { ToggleModal } from "../redux/ModalSlice";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const userState = useSelector((state: rootState) => state.userReducer);
  const dispatch: Appdispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const Navlinks = [
    { Name: "Home", route: "/" },
    { Name: "Books", route: "/books" },
    { Name: "About", route: "/about" },
  ];

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-500 "
      : "text-gray-600 hover:text-blue-500 dark:text-gray-400";

  return (
    <nav className="mx-5 md:mx-10 my-3 flex justify-between items-center">
      <h1 className="font-pop text-3xl font-bold text-black dark:text-white">
        BookHive!
      </h1>

      <div className="hidden md:flex gap-x-6 font-open text-md">
        {Navlinks.map(({ Name, route }) => (
          <NavLink key={route} to={route} className={navLinkStyle}>
            {Name}
          </NavLink>
        ))}
      </div>

      <div className="flex gap-x-3 items-center">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded-full cursor-pointer"
        >
          {darkMode ? <Moon size={20} color="blue" /> : <Sun size={20} />}
        </button>

        {userState.userObj ? (
          <p
            className="hidden md:block  dark:text-white font-pop text-sm font-bold cursor-pointer text-black"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              dispatch(ToggleModal());
            }}
          >
            {userState.Name}
            {"👋 "}
          </p>
        ) : (
          <div
            className="hidden md:block px-5 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-500 rounded-lg text-white cursor-pointer"
            onClick={() => dispatch(ToggleModal())}
          >
            Sign In
          </div>
        )}

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg"
        >
          {menuOpen ? (
            <X size={24} className="dark:text-white" />
          ) : (
            <AlignJustify size={24} className="dark:text-white" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-[#0D0D0D] shadow-md p-4 flex flex-col gap-4 md:hidden z-50">
          {Navlinks.map(({ Name, route }) => (
            <NavLink
              key={route}
              to={route}
              className={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              {Name}
            </NavLink>
          ))}

          {userState.userObj ? (
            <p
              className="dark:text-white text-center mb-6  font-pop text-lg font-bold cursor-pointer text-black"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                dispatch(ToggleModal());
              }}
            >
              {" "}
              {userState.Name} {"👋 "}{" "}
            </p>
          ) : (
            <div
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 rounded-lg text-white text-center cursor-pointer"
              onClick={() => {
                dispatch(ToggleModal());
                setMenuOpen(false);
              }}
            >
              Sign In
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
