import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = `http://localhost:3000`;

const initialState = {
  games: [],
  loading: false,
  error: "",
  currentPage: 1,
  totalPages: 1,
  nextPage: null,
  prevPage: null,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.error = "";
    },
    fetchSuccess(state, action) {
      const { results, totalPages, nextPage, prevPage } = action.payload;
      state.loading = false;
      state.games = results;
      state.totalPages = totalPages;
      state.nextPage = nextPage;
      state.prevPage = prevPage;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const fetchGames =
  (page = 1, search = "") =>
  async dispatch => {
    try {
      dispatch(fetchPending());
      const { data } = await axios.get(`${url}/games?page=${page}&search=${search}`);

      const totalPages = Math.ceil(data.count / 20);

      dispatch(
        fetchSuccess({
          results: data.results,
          totalPages,
          nextPage: data.next,
          prevPage: data.previous,
        })
      );
    } catch (error) {
      dispatch(fetchReject(error.message));
    }
  };

export const { fetchPending, fetchSuccess, fetchReject, setPage, setSearch } = gamesSlice.actions;

export default gamesSlice.reducer;
