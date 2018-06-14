import React from 'react'
import {connect} from 'react-redux'
import {HeadingContainer} from "./widgets/Heading";
import {ParagraphContainer} from "./widgets/Paragraph";
import * as actions from "../actions";

class Widget extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        let selectedElement;
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h3>{this.props.widget.widgetType} Widget</h3>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <button style={{"marginRight": "5px"}} className="btn btn-warning col-sm-2">
                                <i className="fa fas fa-arrow-up"></i>
                            </button>
                            <button style={{"marginRight": "5px"}} className="btn btn-warning col-sm-2">
                                <i className="fa fas fa-arrow-down"></i>
                            </button>


                            <select style={{"marginRight": "5px"}} className="custom-select col-sm-4"
                                    onChange={
                                () => this.props.changeWidgetType(this.props.widget.id, selectedElement.value)
                            }
                                    ref={node => selectedElement=node}
                                    value={this.props.widget.widgetType}
                            >
                                <option>Heading</option>
                                <option>Paragraph</option>
                                <option>List</option>
                                <option>Image</option>
                            </select>

                              <button
                                  onClick={ () => this.props.deleteWidget(this.props.widget.id)}
                                  className="btn btn-danger col-sm-2">
                                  <i className="fa fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {this.props.widget.widgetType === 'Heading' && <HeadingContainer widget={this.props.widget}/>}
                    {this.props.widget.widgetType === 'Paragraph' && <ParagraphContainer widget={this.props.widget}/>}
                </div>

                <hr/>
            </div>


        )
    }

}

const stateToPropertiesMapper = state => {

};

const dispatchToPropertiesMapper = dispatch => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    changeWidgetType: (widgetId, newType) => actions.changeWidgetType(dispatch, widgetId, newType)
});

export const WidgetContainer = connect(null, dispatchToPropertiesMapper)(Widget);