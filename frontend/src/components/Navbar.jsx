import { useState,useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleDarkMode = () => {
      setDarkMode(!darkMode);
  }

  return (
    <div className="flex justify-between items-center p-3 bg-stone-100 dark:bg-gray-800 border-b border-black/10 dark:border-white/10">
      <div className="text-3xl font-bold text-center text-black dark:text-white  ml-30">
        <Link to={"/"}>Product Store</Link>
      </div>
      <div className="flex mr-30">
        <Link to={"/create"}>
          <button className="p-2 m-1 bg-white flex items-center cursor-pointer rounded">
            <FaPlus className="mx-1"/>
            Create            
          </button>
        </Link>
        <button className="p-2 cursor-pointer" onClick={handleDarkMode}>
          {darkMode ?
            <MdOutlineLightMode className="size-5 text-white" /> :
            <MdOutlineDarkMode className="size-5" /> 
          }
        </button>
      </div>
    </div>
  );
};

export default Navbar;