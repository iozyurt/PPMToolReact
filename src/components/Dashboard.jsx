import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectItem from "./ProjectItem";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../store/projects";

function Dashboard() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.entities.projects.list);

  useEffect(() => {
    dispatch(loadProjects());
  }, []);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <Link to="/addProject" className="btn btn-lg btn-info">
              Create a Project
            </Link>

            <br />
            <hr />
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
