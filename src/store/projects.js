import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "./api";
import { projectsURL, apiCallDelay } from "../config.json";

const slice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    projectsRequested: (projects, action) => {
      projects.loading = true;
    },
    projectsReceived: (projects, action) => {
      projects.loading = false;
      projects.list = action.payload;
      projects.lastFetch = Date.now();
    },
    projectsRequestFailed: (projects, action) => {
      projects.loading = false;
    },
    projectAdded: (projects, action) => {
      projects.list.push(action.payload);
    },
  },
});

const {
  projectsRequested,
  projectsReceived,
  projectsRequestFailed,
  projectAdded,
} = slice.actions;

export default slice.reducer;

export const loadProjects = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.projects;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < apiCallDelay) return;
  dispatch(
    apiCallBegan({
      url: projectsURL,
      onStart: projectsRequested.type,
      onSuccess: projectsReceived.type,
      onError: projectsRequestFailed.type,
    })
  );
};

export const addProject = (project) => (dispatch, getState) => {
  if (project.id) {
    dispatch(
      apiCallBegan({
        url: `${projectsURL}/${project.id}`,
        method: "put",
        data: project,
        // onSuccess: projectAdded.type,
      })
    );
  } else
    dispatch(
      apiCallBegan({
        url: projectsURL,
        method: "post",
        data: project,
        onSuccess: projectAdded.type,
      })
    );
};
