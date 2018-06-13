import { connect } from 'react-redux'
import React from 'react'
import * as actions from '../../actions'

const Heading = ({widget, headingTextChanged}) => {
    let selectedElement;
    let inputElement;
    return (
        <div>
            <div className="row">
                <h3>Heading Widget</h3>
            </div>
            <form>
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
            <h3>preview</h3>
            {widget.size == '1' && <h1>{widget.text}</h1>}
            {widget.size == '2' && <h2>{widget.text}</h2>}
            {widget.size == '3' && <h3>{widget.text}</h3>}
        </div>
    )
};

const dispatchToPropertiesMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch, widgetId, newText)
});

export const HeadingContainer = connect(null, dispatchToPropertiesMapper)(Heading);