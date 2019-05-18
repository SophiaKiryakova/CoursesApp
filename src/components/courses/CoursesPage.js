import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import Proptypes from "prop-types";
import { bindActionCreators } from "redux";
import CoursesList from "./CoursesList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors } = this.props;

    if (courses.length === 0) {
      this.props.courseActions.loadCourses();
    }
    if (authors.length === 0) {
      this.props.authorActions.loadAuthors();
    }
  }
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     course: {
  //       title: ""
  //     }
  //   };

  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);

  // handleChange(event) {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({
  //     course
  //   });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.courseActions.createCourse(this.state.course);
  // }

  render() {
    return <CoursesList courses={this.props.courses} />;
    // <form onSubmit={this.handleSubmit}>
    //   <h2>Courses</h2>
    //   <h3>Add course</h3>
    //   <input
    //     type="text"
    //     onChange={this.handleChange}
    //     value={this.state.course.title}
    //   />
    //   <input type="submit" value="Save" />
    //   {this.props.courses.map(course => (
    //     <div key={course.title}>{course.title}</div>
    //   ))}
    // </form>
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
