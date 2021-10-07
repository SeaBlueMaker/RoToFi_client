import { combineReducers } from "redux";

import { plots } from "./plots";
import { characters } from "./characters";
import { project } from "./project";

const rootReducer = combineReducers({
  plots,
  characters,
  project,
});

export default rootReducer;
