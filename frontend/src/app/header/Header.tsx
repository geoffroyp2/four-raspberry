import { FC, useMemo } from "react";
import { useLocation } from "react-router";

import { useSelector } from "react-redux";
import { selectGraphRoute } from "@graphs/_state/graphDisplaySlice";

import FlameIcon from "@components/svg/FlameIcon";
import NavButton from "./NavButton";

const Header: FC = () => {
  const { pathname } = useLocation();
  const graphRoute = useSelector(selectGraphRoute);

  const color = useMemo(() => {
    const [, path1, path2] = pathname.split("/");

    switch (path1) {
      case "graphs":
        if (path2 === "records") return "records-800";
        if (path2 === "targets") return "targets-900";
        break;
      case "live":
        return "live-800";
      case "pieces":
        return "pieces-900";
      case "formulas":
        return "formulas-800";
    }
    return "records-800";
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 text-gray-300 bg-${color} body-font shadow-md mb-2`}>
      <div className="p-5 flex flex-col md:flex-row items-center md:ml-6">
        <div className="flex title-font font-medium text-white mb-4 md:mb-0">
          <FlameIcon />
          <span className="ml-3 text-xl">Four-Raspberry</span>
        </div>
        <nav className="md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
          <NavButton text="Direct" link="/live" />
          <NavButton text="Courbes" link={`/graphs/${graphRoute}`} />
          <NavButton text="Poteries" link="/pieces/banner" />
          <NavButton text="Émaux" link="/formulas" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
