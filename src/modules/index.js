import { combineReducers } from "redux";

import { plot } from "./plot";
import { characters } from "./characters";
import { project } from "./project";

const rootReducer = combineReducers({
  plot,
  characters,
  project,
});

export default rootReducer;
