import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAppTheme } from "./_state/appStateSlice";

import AppRouter from "./AppRouter";
import "./App.scss";

const App: FC = () => {
  const theme = useSelector(selectAppTheme);

  return (
    <BrowserRouter>
      <div className={theme}>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
