import { combineReducers } from "redux";
import graphListReducer from "./graphs/graphSlice";

export default combineReducers({ graphListReducer });

// import graphListReducer from "./graphs/graphListSlice";
// import selectedgraphReducer from "./graphs/selectedGraphSlice";

// export default combineReducers({ graphListReducer, selectedgraphReducer });
