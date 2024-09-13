import { createSlice } from "@reduxjs/toolkit";
import { IDocumentState } from "../../types/types";
import { RootState } from "../store";
import {
  addDataItem,
  fetchData,
  removeDataItem,
  updateDataItem,
} from "../actions/actions";

const initialState: IDocumentState = {
  data: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    removeDataFromPage(state, action) {
      state.data = state.data.filter((el) => el.id !== action.payload.id);
    },
    addDataAtPage(state, action) {
      state.data.push(action.payload);
    },
    updateDataInPage(state, action) {
      state.data = state.data.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeDataItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addDataItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDataItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
      })
      .addCase(addDataItem.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateDataItem.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
      });
  },
});

export const { removeDataFromPage } = dataSlice.actions;
export const { addDataAtPage } = dataSlice.actions;
export default dataSlice.reducer;

export const selectAllDocuments = (state: RootState) => state.data.data;
export const selectDocumentsLoading = (state: RootState) => state.data.loading;
export const selectDocumentsError = (state: RootState) => state.data.error;
