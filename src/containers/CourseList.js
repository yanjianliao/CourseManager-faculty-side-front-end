import React from 'react';
import CourseServiceClient from "../services/CourseServiceClient";
import CourseRow from "../components/CourseRow";

export default class CourseList extends React.Component {

    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {
            course: {title : 'default course'},
            courses: []
        };

        this.findAllCourses = this.findAllCourses.bind(this);
        this.renderCourseRows = this.renderCourseRows.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                    this.setState({courses: courses});
                });

    }

    deleteCourse(id) {
        if(!window.confirm('Are you Sure you want to delete this course?'))
            return;

        // this.moduleService.deleteAllModulesForCourse(id);

        this.courseService
            .deleteCourseById(id)
            .then(this.findAllCourses);
    }


    // Unlike a regular function, an arrow function does not bind this.
    // Instead, this is bound lexically (i.e. this keeps its meaning from its original context).
    renderCourseRows() {
        let courses = this.state.courses.map(
            (course) => {
                return (<CourseRow  key={course.id} course={course} delete={this.deleteCourse}/>)
            }
        );

        return courses;
    }

    titleChanged(event) {
        this.setState({
            course: {title: event.target.value}
        });
    }


    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(this.findAllCourses);
    }




    render() {
        return(
            <div className="CourseList">
                <h1>{this.props.test}</h1>
                <nav className="navbar navbar-expand  navbar-light bg-primary sticky-top">

                        <a id="courseManager" className="navbar-brand">Course Manager</a>
                        <input  onChange={this.titleChanged}
                                className="form-control"
                                id="newCourse"
                                placeholder="Course Title"/>
                        <button onClick={this.createCourse}
                                className="btn btn-primary topOfCourseList"
                                type="button" >
                            <i className="fa fas fa-plus"></i>
                        </button>

                </nav>
                <div className="container">

                <table className="table table-fixed">
                    <thead >
                    <tr>
                        <th>Title</th>
                        <th>Owned By <i className="fa fas fa-caret-down"></i></th>
                        <th>Last modified by me</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>

                </div>
                </div>



        )
    }

}