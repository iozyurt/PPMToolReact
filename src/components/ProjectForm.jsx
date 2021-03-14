import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import { addProject, loadProjects } from "../store/projects";
import Form from "./common/form";

class ProjectForm extends Form {
  state = {
    data: {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    projectName: Joi.any().label("Project Name"),
    projectIdentifier: Joi.any().label("Project Identifier"),
    description: Joi.any().label("Description"),
    start_date: Joi.any().label("Start Date"),
    end_date: Joi.any().label("Estimated End Date"),
  };

  populateProject = () => {
    try {
      const projectId = this.props.match.params.id;
      if (projectId === "new") return;

      const index = this.props.projects.findIndex(
        (p) => p.id === parseInt(projectId)
      );
      const item = this.props.projects[index];
      const data = this.mapToViewModel(item);

      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  };

  componentDidMount() {
    this.props.loadProjects();
    this.populateProject();
  }

  mapToViewModel(project) {
    return {
      id: project.id,
      projectName: project.projectName,
      projectIdentifier: project.projectIdentifier,
      description: project.description,
      start_date: project.start_date ? project.start_date : "",
      end_date: project.end_date ? project.end_date : "",
    };
  }

  doSubmit = () => {
    this.props.addProject(this.state.data);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("projectName", "Project Name")}
                {this.renderInput("projectIdentifier", "Unique Project Id")}
                {this.renderInput(
                  "description",
                  "Project Description",
                  "textarea"
                )}
                {this.renderDate("start_date", "Start Date", "date")}
                {this.renderDate("end_date", "Estimated End Date", "date")}
                {this.renderButton("Save")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.entities.projects.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadProjects: () => dispatch(loadProjects()),
  addProject: (projectId) => dispatch(addProject(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
