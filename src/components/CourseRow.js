import React from 'react'
import {Link} from 'react-router-dom'
export default class CourseRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            time: ''
        };

    }

    componentDidMount()  {
        let time = 'This course wasn\'t modified yet';

        if(this.props.course.modified !== null) {
            time = (this.props.course.modified).split('.')[0];
        }

        this.setState({
            title: this.props.course.title,
            time: time
        });
    }

    componentWillReceiveProps(newProps)  {
        let time = 'This course wasn\'t modified yet';

        if(newProps.course.modified !== null) {
            time = (newProps.course.modified).split('.')[0];
        }

        this.setState({
            title: newProps.course.title,
            time: time
        });
    }
    render() {
        return (
            <tr>

                <td><Link to={`/course/${this.props.course.id}/edit`}>
                    {this.state.title}
                </Link></td>
                <td>me</td>
                <td>{this.state.time}</td>
                <td><i onClick={
                    () => {this.props.delete(this.props.course.id)
                    }} className="fa-2x fa fa-times"></i></td>
            </tr>
        )
    }
}