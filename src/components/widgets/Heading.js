import { connect } from 'react-redux'
import React from 'react'
import * as actions from '../../actions'

const Heading = ({widget, headingTextChanged, headingSizeChanged}) => {
    let selectedElement;
    let inputElement;
    return (
        <div>
            <div className="row">
                <div  className="col-8 float-left">
                    <h3>Heading Widget</h3>
                </div>
                <div  className="col-4">
                     <button className="btn btn-danger float-right">delete</button>
                </div>
            </div>
            <div className="row">
                <form className="col-12">
                    <div className="form-group">
                        <input className="form-control"
                               placeholder="Heading text"
                               value={widget.text}
                               ref={node => inputElement=node}
                               onChange={
                                   () => {
                                       headingTextChanged(widget.id, inputElement.value)
                                   }
                               }
                        />
                    </div>
                    <div className="form-group">
                        <select className="form-control"
                                ref={node => selectedElement=node}
                                onChange={
                                    () => {
                                        headingSizeChanged(widget.id, selectedElement.value)
                                    }
                                }
                        >
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control"
                               placeholder="Heading name"
                               value={widget.name}
                        />
                    </div>
                </form>
            </div>

            <h3>preview</h3>
            {widget.size == '1' && <h1>{widget.text}</h1>}
            {widget.size == '2' && <h2>{widget.text}</h2>}
            {widget.size == '3' && <h3>{widget.text}</h3>}
        </div>
    )
};

const dispatchToPropertiesMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => {
        actions.headingSizeChanged(dispatch, widgetId, newSize)
    }
});


export const HeadingContainer = connect(null, dispatchToPropertiesMapper)(Heading);