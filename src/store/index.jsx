import reducer from "./reducers/taskReducer";
import { createStore } from "@/libs/redux.jsx";

const store = createStore(reducer);
window.store = store;

export default store;
