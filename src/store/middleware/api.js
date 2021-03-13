import axios from "axios";
import { baseURL } from "../../config.json";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action); //gelen action apiCallBegan değilse çalışır

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL,
      url,
      method,
      data,
    });
    //General success action
    dispatch(actions.apiCallSuccess(response.data));
    //Specific success action
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    //General error action
    dispatch(actions.apiCallFailed(error.message));
    //Specific error action
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
