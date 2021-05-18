import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { selectAppTheme } from "./_state/appStateSlice";

import Header from "./header/Header";
import LiveScreen from "./live/LiveScreen";
import GraphEditor from "./editor/graphs/GraphEditor";
import PieceEditor from "./editor/pieces/PieceEditor";
import FormulaEditor from "./editor/formulas/FormulaEditor";

import "./App.scss";

function App() {
  const theme = useSelector(selectAppTheme);

  return (
    <Router>
      <div className={theme}>
        <Header />
      </div>

      <Switch>
        <Route path="/live">
          <LiveScreen />
        </Route>
        <Route path="/graphs">
          <GraphEditor />
        </Route>
        <Route path="/pieces">
          <PieceEditor />
        </Route>
        <Route path="/formulas">
          <FormulaEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
