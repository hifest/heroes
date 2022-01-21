import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdaptor = createEntityAdapter();

const initialState = filterAdaptor.getInitialState({

  filterState: "idle",
  filterActive: "all",

});
export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    FilterActive: (state, action) => {
      state.filterActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filterState = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filterState = "loaded";
        filterAdaptor.setAll(state,action.payload)
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filterState = "filterError";
      });
  },
});

const { actions, reducer } = filterSlice;
export const {selectAll} = filterAdaptor.getSelectors(state => state.filters)
export default reducer;

export const { FilterLoad, FilterLoaded, FilterActive, FilterError } = actions;
