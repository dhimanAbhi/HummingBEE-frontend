import { combineReducers } from "redux";
import users from "./users";
import flash from "./flash";
import tasks from "./tasks";
export default combineReducers({ users, flash, tasks})