import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import Proptypes from "prop-types";
import { bindActionCreators } from "redux";
import CoursesList from "./CoursesList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = { redirectToAddPage: false };

  componentDidMount() {
    const { courses, authors } = this.props;

    if (courses.length === 0) {
      this.props.courseActions.loadCourses();
    }
    if (authors.length === 0) {
      this.props.authorActions.loadAuthors();
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddPage && <Redirect to="/course" />}
        <button
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddPage: true })}
        >
          Add course
        </button>
        <CoursesList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: Proptypes.array.isRequired,
  courseActions: Proptypes.object.isRequired,
  authors: Proptypes.array.isRequired,
  authorActions: Proptypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    courses:
      state.authors.length > 0
        ? state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          })
        : [],
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
