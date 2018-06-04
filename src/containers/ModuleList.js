import React from 'react';
import ModuleServiceClient from "../services/ModuleServiceClient";
import ModuleListItem from "../components/ModuleListItem";
import ModuleEditor from "./ModuleEditor";
import CourseServiceClient from "../services/CourseServiceClient";
import {Link} from 'react-router-dom'
import { Route } from 'react-router-dom';

export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
            courseTitle: 'Loading...',
            modules: [],
            module: {title: 'default module', id: ''},
            selectedModule: ''
        };

        this.moduleService = ModuleServiceClient.instance;
        this.courseService = CourseServiceClient.instance;
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.setModules = this.setModules.bind(this);
        this.moduleTitleOnchange = this.moduleTitleOnchange.bind(this);
        this.addNewModule = this.addNewModule.bind(this);
        this.renderListOfModules = this.renderListOfModules.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.updateModuleList = this.updateModuleList.bind(this);
        this.getCourseTitle = this.getCourseTitle.bind(this);
        this.onModuleNameClicked = this.onModuleNameClicked.bind(this);

    }

    //
    componentDidMount() {
        console.log(this.props);
        this.setState({
            courseId: this.props.courseId
        });
        this.getCourseTitle(this.props.courseId);
        this.findAllModulesForCourse(this.props.courseId);
    }

    //
    componentWillReceiveProps(newProps) {

        this.setState({
            courseId: newProps.courseId
        });
        this.getCourseTitle(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }


    getCourseTitle(courseId) {
        this.courseService
            .findCourseById(courseId)
            .then((course) => {
                this.setState({courseTitle: course.title})
            })
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then(
                (modules) => {
                    this.setModules(modules);

                }
            )
    }

    setModules(modules) {
        this.setState({
            modules : modules
        });
    }

    renderListOfModules() {
        let modules = this.state.modules.map(
            (module) => {
            return <ModuleListItem
                        select={this.state.selectedModule}
                        onModuleNameClicked={this.onModuleNameClicked}
                        delete={this.deleteModule}
                        key={module.id}
                        module={module}
                        courseId={this.state.courseId}/>
        });
        return modules;
    }

    onModuleNameClicked(id) {
        // console.log('click ' + id);
        this.setState({
            selectedModule: id
        });
    }




    moduleTitleOnchange(event) {
        this.setState({
            module : {title : event.target.value}
        });
    }

    addNewModule() {
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(this.updateModuleList);
    }

    deleteModule(id) {
        if(!window.confirm('Are you sure that you want to delete this module?'))
            return;

        this.moduleService
            .deleteModuleById(id)
            .then(this.updateModuleList);



    }

    updateModuleList() {
        this.findAllModulesForCourse(this.state.courseId);
    }

    render() {
        return (

            <div id="moduleList" className="container" style={{'padding' : '10px'}}>
                <div className="row">
                    <div id="moduleList-left" className="col-4">
                        <div className="row" style={{'padding' : '10px'}}>
                            <div className="col-1 float-right" >
                                <Link to='/'><i className="fa-2x fa fa-times" style={{'color' : 'white'}}></i></Link>
                            </div>
                            <div className="col-11">

                                <h3 style={{'color': 'white', 'textAlign' : 'center'}}>{this.state.courseTitle}</h3>
                            </div>
                        </div>

                        <div className="row">
                            <ul className="list-group col-12">
                                {this.renderListOfModules()}
                                <li className="list-group-item" id="add-new-module">
                                    <div className="input-group">
                                        <input  className="form-control"
                                                onChange={this.moduleTitleOnchange}
                                                placeholder="New Module Title"/>
                                        <div  className="input-group-append">
                                            <button type="button" onClick={this.addNewModule} className="btn btn-outline-secondary"><i className="fa fa-plus"></i></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-8 float-right">
                        <Route path='/course/:courseId/module/:moduleId' component={ModuleEditor}/>
                    </div>
                </div>

            </div>


        )
    }
}