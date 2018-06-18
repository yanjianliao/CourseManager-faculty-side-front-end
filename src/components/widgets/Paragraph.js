import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";


const Paragraph = ({widget, textChanged, nameChanged, preview}) => {

    let nameInputElement;
    let textAreaElement;
    let textAreaId = widget.id + 'textArea';
    let nameInputId = widget.id + 'nameInput';
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
                <div className="row">
                    <label className="col-sm-1 col-form-label" htmlFor={textAreaId}>
                        <h5>text: </h5>
                    </label>
                    <div className="col-sm-11">
                        <textarea
                                    className="form-control"
                                    id={textAreaId}
                                    placeholder="Paragraph text"
                                    value={widget.text}
                                    onChange={ () => textChanged(widget.id, textAreaElement.value)}
                                    rows="3"
                                    ref={n => textAreaElement=n}
                        />
                    </div>
                </div>

                <div className="row" style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <label className="col-sm-1 col-form-label" htmlFor={nameInputId}>
                        <h5>name: </h5>
                    </label>
                    <div className="col-sm-11">
                        <input
                                className="form-control"
                                id={nameInputId}
                                placeholder="Paragraph name"
                                value={widget.name}
                                ref={node => nameInputElement=node}
                                onChange={() => nameChanged(widget.id, nameInputElement.value)}
                        />
                    </div>
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