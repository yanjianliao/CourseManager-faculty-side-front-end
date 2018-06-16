import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";

const Link = ({textChanged, nameChanged, preview, widget, linkHrefChanged}) => {

    let inputElement;
    let nameInputElement;
    let linkInputElement;
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
                <div  style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <input className="form-control"
                           placeholder="Link URL"
                           value={widget.href ? widget.href : ''}
                           ref={node => linkInputElement=node}
                           onChange={() => {linkHrefChanged(widget.id, linkInputElement.value)}}
                    />
                </div>
                <div  style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <input className="form-control"
                           placeholder="text"
                           value={widget.text}
                           ref={node => inputElement=node}
                           onChange={() => {textChanged(widget.id, inputElement.value)}}
                    />
                </div>
                <div  style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <input className="form-control"
                           placeholder="Widget name"
                           value={widget.name}
                           ref={node => nameInputElement=node}
                           onChange={() => nameChanged(widget.id, nameInputElement.value)}
                    />
                </div>

                <h3>Preview</h3>
            </div>

            <div>

                <a href={widget.href}>{widget.text}</a>
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
    linkHrefChanged: (widgetId, href) => actions.linkHrefChanged(dispatch, widgetId, href)
});


export const LinkContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(Link);
