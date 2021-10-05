import { combineReducers } from "redux";

import { plot } from "./plot";
import { characters } from "./characters";

const rootReducer = combineReducers({
  plot,
  characters,
});

export default rootReducer;
