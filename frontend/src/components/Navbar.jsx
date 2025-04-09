import { FaPlus } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-3 bg-cyan-400 border-b-1 border-gray-500">
      <div className="text-3xl font-bold text-center">
        <Link to={"/"}>Product Store</Link>
      </div>
      <div className="flex">
        <Link to={"/create"}>
          <button className="p-2 m-1 bg-white flex items-center cursor-pointer rounded">
            <FaPlus className="mx-1"/>
            Create            
          </button>
        </Link>
        <button className="p-2 cursor-pointer">
          <MdOutlineLightMode className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

// 118000982815017
