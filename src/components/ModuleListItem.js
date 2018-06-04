import React from 'react';
import { Link } from 'react-router-dom';


export default class ModuleListItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            liClassName: "list-group-item module-list"
        };
    }


    componentWillReceiveProps(newProps) {
        if(this.props.module.id === newProps.select) {
            this.setState({
                liClassName:"list-group-item module-list active-module"
            })
        } else {
            this.setState({
                liClassName: "list-group-item module-list"
            })
        }
    }


    render() {
        return (
            <li
                className={this.state.liClassName}
                >
                <Link onClick={() =>{
                    this.props.onModuleNameClicked(this.props.module.id);
                }} to={`/course/${this.props.courseId}/module/${this.props.module.id}/edit`}>{this.props.module.title}</Link>

                <span className="float-right">
                    <i style={{'color': 'black'}} onClick={() => {
                        this.props.delete(this.props.module.id)
                    }} className="fa fa-times"></i>
                </span>
            </li>
        )
    }



}