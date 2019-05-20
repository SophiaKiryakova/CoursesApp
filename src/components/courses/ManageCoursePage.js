import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import Proptypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage(props) {
  const { courses, authors, courseActions, authorActions, history } = props;
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setError] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      authorActions.loadAuthors();
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    courseActions.saveCourse(course).then(() => history.push("/courses"));
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: Proptypes.object.isRequired,
  courses: Proptypes.array.isRequired,
  courseActions: Proptypes.object.isRequired,
  authors: Proptypes.array.isRequired,
  authorActions: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, props) {
  const slug = props.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
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
)(ManageCoursePage);
