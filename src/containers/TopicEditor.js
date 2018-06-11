import React from 'react'
import {WidgetListContainer} from "./WidgetList";


export default class TopicEditor extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        // let store = createStore(WidgetReducer);
        return (
            <WidgetListContainer
                topicId={this.props.match.params.topicId}
                courseId={this.props.match.params.courseId}
                moduleId={this.props.match.params.moduleId}
                lessonId={this.props.match.params.lessonId}
            />


        )


    }


}