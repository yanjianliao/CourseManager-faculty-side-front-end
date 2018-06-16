import { connect } from 'react-redux'
import React from 'react'
import * as actions from '../../actions'

const Heading = ({widget, textChanged, headingSizeChanged, nameChanged, preview}) => {
    let selectedElement;
    let inputElement;
    let nameInputElement;
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
                <form className="col-12">
                    <div className="form-group">
                        <input className="form-control"
                               placeholder="Heading text"
                               value={widget.text}
                               ref={node => inputElement=node}
                               onChange={
                                   () => {
                                       textChanged(widget.id, inputElement.value)
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
                               ref={node => nameInputElement=node}
                               onChange={() => nameChanged(widget.id, nameInputElement.value)}
                        />
                    </div>
                </form>
                <h3>preview</h3>
            </div>
            {widget.size == '1' && <h1>{widget.text}</h1>}
            {widget.size == '2' && <h2>{widget.text}</h2>}
            {widget.size == '3' && <h3>{widget.text}</h3>}
        </div>
    )
};


const stateToPropertiesMapper = state => ({
    preview: state.preview
});

const dispatchToPropertiesMapper = dispatch => ({
    textChanged: (widgetId, newText) => actions.textChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    nameChanged: (widgetId, newName) => actions.nameChanged(dispatch, widgetId, newName)
});


export const HeadingContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(Heading);