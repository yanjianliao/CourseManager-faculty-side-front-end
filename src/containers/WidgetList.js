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
                <div className="row" style={{'marginBottom': '20px'}}>
                    <div className="col-12">
                        <button className=" btn btn-success float-right" onClick={
                            () => {
                                this.props.saveWidget(this.props.topicId)
                            }
                        }>
                            save
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <ul className="col-12">
                        {this.renderWidgetList()}
                    </ul>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-danger float-right" onClick={() => {
                            this.props.addWidget();
                        }}>
                            add
                        </button>
                    </div>

                </div>


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