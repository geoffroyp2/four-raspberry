import { Link } from "react-router-dom";

import FlameIcon from "@svg/FlameIcon";

const Header = () => {
  return (
    <header className="text-gray-600 dark:text-gray-400 dark:bg-gray-900 body-font">
      <div className="p-5 flex flex-col md:flex-row items-center md:ml-8">
        <div className="flex title-font font-medium text-white mb-4 md:mb-0">
          <FlameIcon />
          <span className="ml-3 text-xl">Four-Raspberry</span>
        </div>
        <nav className="md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
          <span className="mr-5 hover:text-white">
            <Link to="/live">Direct</Link>
          </span>
          <span className="mr-5 hover:text-white">
            <Link to="/graphs">Courbes</Link>
          </span>
          <span className="mr-5 hover:text-white">
            <Link to="/pieces">Poteries</Link>
          </span>
          <span className="mr-5 hover:text-white">
            <Link to="/formulas">Émaux</Link>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
