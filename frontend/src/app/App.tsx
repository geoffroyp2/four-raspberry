import "./App.scss";
import { BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAppTheme } from "./_state/appStateSlice";

import AppRouter from "./AppRouter";

function App() {
  const theme = useSelector(selectAppTheme);

  return (
    <BrowserRouter>
      <div className={theme}>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
