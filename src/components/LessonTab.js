import React from 'react';
import {Link} from 'react-router-dom'


export default class LessonTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classNameForA : "nav-link"
        }
    }


    componentWillReceiveProps(newProps) {
        if(newProps.selectedLesson === this.props.lesson.id) {
            this.setState({
                classNameForA : "nav-link active"
            });
        } else {
            this.setState({
                classNameForA : "nav-link"
            });
        }
    }


    render() {
        return (
            <li className="nav-item">
                <Link  onClick={
                    () => {
                        this.props.click(this.props.lesson.id);
                    }
                }      className={this.state.classNameForA}
                       to={`/course/${this.props.selectedCourse}/module/${this.props.selectedModule}/lesson/${this.props.lesson.id}/edit`}>
                {this.props.lesson.title}
                </Link>
            </li>
        )
    }

}