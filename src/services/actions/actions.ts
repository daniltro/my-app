import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, postData, postUpdateData } from "../../api/api";
import { removeDataFromPage } from "../slices/dataSlice";
import { handleError } from "../../utils/utils";
import {
  IAddedDocument,
  IDeleteParams,
  IDocument,
  IPostDataResponse,
} from "../../types/types";

export const removeDataItem = createAsyncThunk(
  "data/deleteDataItem",
  async function (params: IDeleteParams, { rejectWithValue, dispatch }) {
    try {
      const response = await deleteData(params.id, params.token);
      dispatch(removeDataFromPage({ id: params.id }));
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getData(token);
      return response;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const addDataItem = createAsyncThunk<
  IPostDataResponse,
  { newItem: IAddedDocument; token: string }
>("data/addDataItem", async ({ newItem, token }, { rejectWithValue }) => {
  try {
    const response = await postData(newItem, token);
    return response;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const updateDataItem = createAsyncThunk<
  IPostDataResponse,
  { id: string; editItem: IDocument; token: string }
>(
  "data/updateDataItem",
  async ({ id, editItem, token }, { rejectWithValue }) => {
    try {
      const response = await postUpdateData(editItem, id, token);
      return response;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
