import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";


const List = ({widget, listItemsChanged, nameChanged, preview, listWidgetTypeChanged}) => {

    let textAreaElement;
    let nameInput;
    let selectedElement;
    let listItemId = widget.id + 'listItems';
    let selectId = widget.id + 'select';
    let nameInputId = widget.id + 'nameInput';
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
                <div className="row">
                    <label className="col-sm-1 col-form-label" htmlFor={listItemId}>
                        <h5>items: </h5>
                    </label>
                    <div className="col-sm-11">
                        <textarea className="form-control"
                                  id={listItemId}
                                  placeholder="List item"
                                  value={widget.listItem}
                                  rows="3"
                                  onChange={ () => listItemsChanged(widget.id, textAreaElement.value)}
                                  ref={node => textAreaElement=node}
                        />
                    </div>
                </div>
                <div style={{"marginTop" :"20px"}} className="row form-group">
                    <label className="col-sm-1 col-form-label" htmlFor={selectId}>
                        <h5>type: </h5>
                    </label>
                    <div className="col-sm-11">
                        <select
                                id={selectId}
                                className="form-control"
                                onChange={ () => listWidgetTypeChanged(widget.id, selectedElement.value)}
                                ref={node => selectedElement=node}
                                value={widget.listType}
                        >
                            <option value={'unordered'}>Unordered list</option>
                            <option value={'ordered'}>Ordered list</option>
                        </select>
                    </div>
                </div>
            <div className="row" style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                <label className="col-sm-1  col-form-label" htmlFor={nameInputId}>
                    <h5>name: </h5>
                </label>
                <div className="col-sm-11">
                    <input className="form-control"
                           id={nameInputId}
                           placeholder="Paragraph name"
                           ref={node=> nameInput=node}
                           onChange={ () => nameChanged(widget.id, nameInput.value) }
                           value={widget.name}
                    />
                </div>
            </div>
            <h3>Preview</h3>
            </div>
            <div>

                <div className="container">
                    { (widget.listType === 'ordered') &&
                    <div>
                        <ol>
                            {!widget.listItem ? '' : widget.listItem.split('\n').map(
                                (element, index)=> ( <li key={index}>{element}</li>)
                            )}
                        </ol>
                    </div>
                    }

                    {  (widget.listType === 'unordered') &&
                    <div>
                        <ul>
                            {!widget.listItem ? '' : widget.listItem.split('\n').map(
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
    listItemsChanged: (widgetId, newListItem) => actions.listItemsChanged(dispatch, widgetId, newListItem),
    nameChanged: (widgetId, newName) => actions.nameChanged(dispatch, widgetId, newName),
    listWidgetTypeChanged: (widgetId, listType) => actions.listWidgetTypeChanged(dispatch, widgetId, listType)
});

export const ListContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(List);