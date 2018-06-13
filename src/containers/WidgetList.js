import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {WidgetContainer} from "../components/Widget";

class WidgetList extends React.Component{
    constructor(props) {
        super(props);
        this.props.findAllWidgets(this.props.topicId);
        this.renderWidgetList = this.renderWidgetList.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.topicId === newProps.topicId)
            return;
        this.props.findAllWidgets(newProps.topicId);
    }

    renderWidgetList() {
        return this.props.widgets.map(
            (widget) => {
                return <WidgetContainer widget={widget} key={widget.id}/>
            }
        )
    }

    render() {
        return (
            <div>
                <button className="btn btn-success float-right" onClick={
                    () => {
                        this.props.saveWidget(this.props.topicId)
                    }
                }>
                    save
                </button>
                {/*<h1>*/}
                {/*{this.props.courseId}*/}
                {/*{this.props.moduleId}*/}
                {/*{this.props.lessonId}*/}
                {/*{this.props.topicId}*/}
                {/*</h1>*/}
                <ul>
                    {this.renderWidgetList()}
                </ul>
                <button className="btn btn-danger float-right" onClick={() => {
                    this.props.addWidget();
                }}>
                    add
                </button>

            </div>
        )
    }
}

const stateToPropertiesMapper = state => ({
    widgets: state.widgets
});

const dispatchToPropertiesMapper = dispatch => ({
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch, topicId),
    addWidget: () => actions.addWidget(dispatch),
    saveWidget: (topicId) => actions.saveWidget(dispatch, topicId)
});


export const WidgetListContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(WidgetList);