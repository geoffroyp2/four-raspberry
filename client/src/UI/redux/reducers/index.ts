import { combineReducers } from "redux";
import graphListReducer from "./graphSlice";
import UIControlsReducer from "./UIControlsSlice";

export default combineReducers({ graphListReducer, UIControlsReducer });

// import graphListReducer from "./graphs/graphListSlice";
// import selectedgraphReducer from "./graphs/selectedGraphSlice";

// export default combineReducers({ graphListReducer, selectedgraphReducer });
