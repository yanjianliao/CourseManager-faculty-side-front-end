import React from 'react'
import LessonTab from "../components/LessonTab";
import LessonServiceClient from "../services/LessonServiceClient";


export default class LessonTabs extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedModule: '',
            lessons: [{
                title: 'Loading',
                id: ''
            }],
            newLesson: {
                title: 'default lesson',
                id: ''
            },
            selectedLesson: '',
            selectedCourse: ''
        };

        this.lessonService = LessonServiceClient.instance;
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.addNewLesson = this.addNewLesson.bind(this);
        this.updateLessonTabs = this.updateLessonTabs.bind(this);
        this.lessonClicked = this.lessonClicked.bind(this);
        this.deleteLessonById = this.deleteLessonById.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedCourse: this.props.selectedCourse,
            selectedModule : this.props.selectedModule
        });
        this.findAllLessonsForModule(this.props.selectedModule);
    }

    componentWillReceiveProps(newProps) {
        // when the selectedModule doesn't changed, we don't need to find the lessons again
        if(newProps.selectedModule === this.props.selectedModule)
            return;
        this.setState({
            selectedCourse: newProps.selectedCourse,
            selectedModule : newProps.selectedModule
        });
        this.findAllLessonsForModule(newProps.selectedModule);

    }

    findAllLessonsForModule(moduleId) {
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then((lesson) => {
                this.setLessons(lesson);
            });
    }


    setLessons(lessons) {
        this.setState({
            lessons: lessons
        });
    }

    renderLessons() {
        let lessons = this.state.lessons.map(
            (lesson) => {
               return  <LessonTab
                            selectedModule={this.state.selectedModule}
                            selectedCourse={this.state.selectedCourse}
                            click={this.lessonClicked}
                            key={lesson.id}
                            lesson={lesson}
                            selectedLesson={this.state.selectedLesson}/>

            });

        return lessons;
    }

    deleteLessonById() {
        if(!window.confirm('Are you sure that you want to delete this module?'))
            return;
        this.lessonService
            .deleteLesson(this.state.selectedLesson)
            .then(this.updateLessonTabs);
    }


    lessonClicked(id) {
        this.setState({
            selectedLesson : id
        });
        this.props.updateSelectedLesson(id);
    }


    inputChange(event) {
        this.setState({
            newLesson : {
                title: event.target.value
            }
        });
    }

    addNewLesson() {
        this.lessonService
            .createLesson(this.state.selectedModule, this.state.newLesson)
            .then(this.updateLessonTabs);
    }

    updateLessonTabs() {
        this.findAllLessonsForModule(this.state.selectedModule);
    }



    render() {

        return(

            <div className="container" style={{'marginLeft' : '20px'}}>


                <div className="input-group">
                    <input
                            className="form-control"
                            onChange={this.inputChange}
                            placeholder="New Lesson Title"/>
                    <div  className="input-group-append">
                        <button type="button" onClick={this.addNewLesson} className="btn btn-outline-secondary">
                            Add New Lesson
                        </button>
                    </div>
                </div>

                <hr/>

                <ul className="nav nav-tabs">
                    {this.renderLessons()}


                <li>
                    <button style={{'marginLeft' : '20px'}} onClick={this.deleteLessonById} className="btn btn-danger float-right">Delete Selected Lesson</button>
                </li>
                </ul>


            </div>



        )


    }



}