import React from 'react';
import ModuleList from "./ModuleList";


export default class CourseEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId : ''
        }

    }


    componentDidMount() {
        this.setState({
            courseId : this.props.match.params.courseId
        });
    }


    render() {
        return (
            <ModuleList courseId={this.props.match.params.courseId}/>
        )
    }
}