import { configureStore } from "@reduxjs/toolkit";
import games from "../features/games";

export default configureStore({
  reducer: {
    games,
  },
});
