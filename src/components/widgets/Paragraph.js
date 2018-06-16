import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";


const Paragraph = ({widget, textChanged, nameChanged, preview}) => {

    let nameInputElement;
    let textAreaElement;
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
                <textarea className="form-control"
                          placeholder="Paragraph text"
                          value={widget.text}
                          onChange={ () => textChanged(widget.id, textAreaElement.value)}
                          rows="3"
                          ref={n => textAreaElement=n}
                />

                <div style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <input className="form-control"
                           placeholder="Paragraph name"
                           value={widget.name}
                           ref={node => nameInputElement=node}
                           onChange={() => nameChanged(widget.id, nameInputElement.value)}
                />
                </div>
                <h3>preview</h3>
            </div>

            {widget.text}
        </div>
    )




};



const stateToPropertiesMapper = state => ({
    preview: state.preview
});

const dispatchToPropertiesMapper = dispatch => ({
    textChanged: (widgetId, newText) => actions.textChanged(dispatch, widgetId, newText),
    nameChanged: (widgetId, newName) => actions.nameChanged(dispatch, widgetId, newName)

});

export const ParagraphContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(Paragraph);