import courseReducer from "./courseReducers";
import * as actions from "../actions/courseActions";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "First title"
    },
    {
      title: "Second title"
    }
  ];

  const newCourse = {
    title: "Thrid title"
  };

  const action = actions.createCourseSuccess(newCourse);

  // act
  const newState = courseReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("First title");
  expect(newState[1].title).toEqual("Second title");
  expect(newState[2].title).toEqual("Thrid title");
});

it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "First title" },
    { id: 2, title: "Second title" },
    { id: 3, title: "Thrid title" }
  ];

  const course = { id: 2, title: "New Title" };
  const action = actions.updateCourseSuccess(course);

  // act
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find(a => a.id == course.id);
  const untouchedCourse = newState.find(a => a.id == 1);

  // assert
  expect(updatedCourse.title).toEqual("New Title");
  expect(untouchedCourse.title).toEqual("First title");
  expect(newState.length).toEqual(3);
});
