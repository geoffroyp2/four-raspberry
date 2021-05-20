import FlameIcon from "@svg/FlameIcon";
import NavButton from "./NavButton";
import { useLocation } from "react-router";
import { selectGraphRoute } from "@graphs/_state/graphDisplaySlice";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const graphRoute = useSelector(selectGraphRoute);

  return (
    <header className={`sticky top-0 z-50 text-gray-300 bg-${pathname.split("/")[1]} body-font shadow-md mb-2`}>
      <div className="p-5 flex flex-col md:flex-row items-center md:ml-6">
        <div className="flex title-font font-medium text-white mb-4 md:mb-0">
          <FlameIcon />
          <span className="ml-3 text-xl">Four-Raspberry</span>
        </div>
        <nav className="md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
          <NavButton text="Direct" link="/live" />
          <NavButton text="Courbes" link={`/graphs/${graphRoute}`} />
          <NavButton text="Poteries" link="/pieces" />
          <NavButton text="Émaux" link="/formulas" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
