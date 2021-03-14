import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../../components/utilities/Notification";
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
    if (method === "put")
      successNotification(
        response.status,
        `Project ID: ${response.data.projectIdentifier} successfully updated.`
      );
    if (method === "post")
      successNotification(
        response.status,
        `Project ID: ${response.data.projectIdentifier} successfully created.`
      );
    if (method === "delete")
      successNotification(
        response.status,
        `Project ID: ${response.data.projectIdentifier} successfully deleted.`
      );
    //Specific success action
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    //General error action
    dispatch(actions.apiCallFailed(error.response.data));

    //Specific error action
    if (onError) dispatch({ type: onError, payload: error.response.data });
    const projectName = error.response.data.projectName
      ? error.response.data.projectName
      : "";
    const projectIdentifier = error.response.data.projectIdentifier
      ? error.response.data.projectIdentifier
      : "";
    const description = error.response.data.description
      ? error.response.data.description
      : "";
    errorNotification(
      error.response.data.status + " " + error.response.data.httpStatus,
      projectName + " " + projectIdentifier + " " + description
    );
  }
};

export default api;
