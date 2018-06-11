import React from 'react';
import TopicRow from "../components/TopicRow";
import TopicServiceClient from "../services/TopicServiceClient";
import { Route } from 'react-router-dom';
import TopicEditor from "./TopicEditor";

export default class TopicList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            topicTitle : 'default topic',
            selectedLessonId : '',
            topics: [],
            selectedTopic: '',
        };
        this.topicService = TopicServiceClient.instance;
        this.inputChanged = this.inputChanged.bind(this);
        this.addNewTopic = this.addNewTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
    }

    componentWillReceiveProps() {
        //     // console.log(newProps.selectedLessonId);
        //     this.setState({
        //         selectedLessonId : newProps.selectedLessonId
        //     });
        //     this.findAllTopics(newProps.selectedLessonId);
        this.findAllTopics();
    }

    componentDidMount() {

    }

    selectTopic(id) {
        this.setState({
            selectedTopic: id
        });
    }



    findAllTopics() {

        this.topicService
            .findAllTopicsForLesson(this.props.match.params.lessonId)
            .then((topics) => {
                this.setState({topics : topics})
            });
    }

    inputChanged(event) {
        this.setState({
            topicTitle : event.target.value
        });
    }

    addNewTopic() {
        let newTopic = {
            title: this.state.topicTitle
        };
        this.topicService
            .createTopic(this.props.match.params.lessonId, newTopic)
            .then(() => {
                this.findAllTopics(this.state.selectedLessonId);
            });
    }

    renderListOfTopics() {
        return this.state.topics.map(
            (topic) => {
                return <TopicRow
                    selectedCourse={this.props.match.params.courseId}
                    selectedModule={this.props.match.params.moduleId}
                    selectedLesson={this.props.match.params.lessonId}
                    selectedId={this.state.selectedTopic}
                    key={topic.id}
                    select = {this.selectTopic}
                    topic={topic}/>;
            }
        );
    }

    deleteTopic() {
        if(!window.confirm('Do you want to delete this topic?'))
            return;
        let id = this.state.selectedTopic;
        if(this.state.selectedTopic === '')
            return;
        this.topicService
            .deleteTopic(id)
            .then(() => {
                this.findAllTopics(this.state.selectedLessonId);
            });
    }

    render() {
        return (
            <div className="container">
                {/*<ul className="list-group"*/}
                {/*style={{'marginBottom' : '50px'}}>*/}
                {/*<div className="list-group" style={{'textAlign'  :'center'}}>*/}
                {/*<li className="list-group-item list-group-item-action"*/}
                {/*style={{'color' : 'white',*/}
                {/*'backgroundColor' : '#334d5c',*/}
                {/*'marginTop': '20px'}}>*/}
                {/*<strong>Topic List</strong>*/}
                {/*<button*/}
                {/*style={{'backgroundColor': '#334d5c', 'border' : 'none', 'color': '#334d5c'}}*/}
                {/*className="btn btn-primary float-right">*/}
                {/*delete</button>*/}
                {/*</li>*/}

                {/*{this.renderListOfTopics()}*/}
                {/*</div>*/}
                {/*</ul>*/}

                <div className="btn-group container" role="group" aria-label="Basic example"
                     style={{'marginTop' : '25px', 'marginBottom' : '20px' }}>
                    {this.renderListOfTopics()}
                </div>

                <button style={{'marginBottom' : '20px'}}
                        onClick={this.deleteTopic}
                        className="btn btn-danger float-right">
                    Delete Selected Topic
                </button>

                <div className="input-group"  style={{'marginBottom' : '10px', 'marginTop' : '25px'}}>
                    <input  className="form-control"
                            onChange={this.inputChanged}
                            placeholder="New Topic Title"/>
                    <div  className="input-group-append">
                        <button
                            type="button"
                            onClick={this.addNewTopic}
                            className="btn btn-outline-secondary">Add New Topic</button>
                    </div>
                </div>
                <hr/>


                <div>
                    <Route path='/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId'
                           component={TopicEditor}/>
                </div>


            </div>

        )
    }


}