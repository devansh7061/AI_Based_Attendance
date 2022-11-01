import * as api from "../api/viewRecord";

// Action Creators
export const getRecords = () => async (dispatch) => {
  try {
    const { data } = await api.getRecords();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addRecord = (record) => async (dispatch) => {
  try {
    const data = await api.addRecord(record);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
