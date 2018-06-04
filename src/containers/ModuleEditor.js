import React from 'react';
import LessonTabs from "./LessonTabs";
import TopicList from "./TopicList";
import { Route } from 'react-router-dom';

export default class ModuleEditor extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedModule: '',
            message: 'Please select a lesson to view topics',
            selectedLesson: ''
        };

        this.updateSelectedLesson = this.updateSelectedLesson.bind(this);
    }

    // componentDidMount() {
        // console.log(this.props.match.params.courseId);
       // this.setState({
       //     selectedModule: this.props.match.params.moduleId
       // });
       //  console.log(this.props.match.params.moduleId);
    // }

    // componentWillReceiveProps(newProps) {
    //
    //     this.setState({
    //         selectedModule : this.props.match.params.moduleId,
    //         selectedLesson : '',
    //         message: 'Please select a lesson to view topics'
    //     });
    // }

    updateSelectedLesson(lesson) {
        console.log(lesson);
        this.setState ({
            selectedLesson : lesson,
            message: 'Topic List'
        });
    }


    render() {
        return (
            <div>

                <div className="row">
                    <LessonTabs
                        selectedCourse={this.props.match.params.courseId}
                        updateSelectedLesson={this.updateSelectedLesson}
                        selectedModule={this.props.match.params.moduleId}/>
                </div>
                <div className="row" style={{'backgroundColor' : 'white'}}>
                    <Route path='/course/:courseId/module/:moduleId/lesson/:lessonId'
                            component={TopicList}/>
                    {/*<TopicList*/}
                        {/*message={this.state.message}*/}
                        {/*selectedLessonId={this.state.selectedLesson}/>*/}
                </div>
            </div>
        )
    }

}