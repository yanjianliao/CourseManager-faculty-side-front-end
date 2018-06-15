import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";


const List = ({widget, textChanged, nameChanged, preview, listWidgetTypeChanged}) => {

    let textAreaElement;
    let nameInput;
    let selectedElement;
    return (
        <div>
            <div hidden={preview}>
                <textarea className="form-control"
                          placeholder="List text"
                          value={widget.text}
                          rows="3"
                          onChange={ () => textChanged(widget.id, textAreaElement.value)}
                          ref={node => textAreaElement=node}
                />
            </div>
            <div hidden={preview}>
                <select style={{"marginTop" :"20px"}}
                        className="custom-select"
                        onChange={ () => listWidgetTypeChanged(widget.id, selectedElement.value)}
                        ref={node => selectedElement=node}
                        value={widget.listType}
                >
                    <option value={'unordered'}>Unordered list</option>
                    <option value={'ordered'}>Ordered list</option>
                </select>
            </div>
            <div hidden={preview} style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                <input className="form-control"
                       placeholder="Paragraph name"
                       ref={node=> nameInput=node}
                       onChange={ () => nameChanged(widget.id, nameInput.value)}
                       value={widget.name}
                />
            </div>
            <div>
               <h3>Preview</h3>
                <div className="container">
                    { (widget.listType === 'ordered') &&
                    <div>
                        <ol>
                            {widget.text.split('\n').map(
                                (element, index)=> ( <li key={index}>{element}</li>)
                            )}
                        </ol>
                    </div>
                    }

                    {  (widget.listType === 'unordered') &&
                    <div>
                        <ul>
                            {widget.text.split('\n').map(
                                (element, index) => (<li key={index}>{element}</li>)
                            )}
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>

    )


};

const stateToPropertiesMapper = state => ({
    preview: state.preview
});


const dispatchToPropertiesMapper = dispatch => ({
    textChanged: (widgetId, newText) => actions.textChanged(dispatch, widgetId, newText),
    nameChanged: (widgetId, newName) => actions.nameChanged(dispatch, widgetId, newName),
    listWidgetTypeChanged: (widgetId, listType) => actions.listWidgetTypeChanged(dispatch, widgetId, listType)
});

export const ListContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(List);