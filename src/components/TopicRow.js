import React from 'react'
import { Link } from 'react-router-dom';

export default class TopicRow extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            buttonClassName: "btn btn-secondary"
        }
    }


    componentWillReceiveProps(newProps) {
        // console.log(newProps.selectedId, this.props.topic.id);
        if(newProps.selectedId === this.props.topic.id) {
            this.setState({
                buttonClassName: "btn btn-secondary active-button"
            })
        } else {
            this.setState({
                buttonClassName: "btn btn-secondary"
            })
        }
    }



    render() {
        return (

            <Link to={`/course/${this.props.selectedCourse}/module/${this.props.selectedModule}/lesson/${this.props.selectedLesson}/topic/${this.props.topic.id}/edit`}><button
                onClick={() => {
                    this.props.select(this.props.topic.id);
                }}
                style={{'marginLeft': '5px'}}
                type="button"
                className={this.state.buttonClassName}>
                {this.props.topic.title}
            </button></Link>



        )
    }



}