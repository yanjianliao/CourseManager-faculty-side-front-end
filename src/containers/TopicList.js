import React from 'react';
import TopicRow from "../components/TopicRow";
import TopicServiceClient from "../services/TopicServiceClient";

export default class TopicList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            topicTitle : 'default topic',
            selectedLessonId : '',
            topics: []
        };


        this.topicService = TopicServiceClient.instance;
        this.inputChanged = this.inputChanged.bind(this);
        this.addNewTopic = this.addNewTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
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
        let topics = this.state.topics.map(
            (topic) => {
                return <TopicRow
                    key={topic.id}
                    delete = {this.deleteTopic}
                    topic={topic}/>;
            }
        );
        return topics;
    }

    deleteTopic(id) {
        if(!window.confirm('Do you want to delete this topic?'))
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
                <ul className="list-group"
                    style={{'marginBottom' : '50px'}}>
                    <div className="list-group" style={{'textAlign'  :'center'}}>
                        <li className="list-group-item list-group-item-action"
                            style={{'color' : 'white',
                                'backgroundColor' : '#334d5c',
                                'marginTop': '20px'}}>
                            <strong>Topic List</strong>
                            <button
                                style={{'backgroundColor': '#334d5c', 'border' : 'none', 'color': '#334d5c'}}
                                className="btn btn-primary float-right">
                                delete</button>
                        </li>

                        {this.renderListOfTopics()}
                    </div>
                </ul>

                <div className="input-group"  style={{'marginBottom' : '50px'}}>
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


            </div>

        )
    }


}