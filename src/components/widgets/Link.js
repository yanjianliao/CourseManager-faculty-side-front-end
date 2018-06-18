import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";

const Link = ({textChanged, nameChanged, preview, widget, linkHrefChanged}) => {

    let inputElement;
    let nameInputElement;
    let linkInputElement;
    let linkInputId = widget.id + 'linkInput';
    let textInputId = widget.id + 'textInput';
    let nameInputId = widget.id + 'nameInput';
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
                <div className="row" style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <label className="col-sm-1 col-form-label" htmlFor={linkInputId}>
                        <h5>link: </h5>
                    </label>
                    <div className="col-sm-11">
                        <input className="form-control"
                               id={linkInputId}
                               placeholder="Link URL"
                               value={widget.href ? widget.href : ''}
                               ref={node => linkInputElement=node}
                               onChange={() => {linkHrefChanged(widget.id, linkInputElement.value)}}
                        />
                    </div>
                </div>
                <div className='row' style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <label className="col-sm-1 col-form-label" htmlFor={textInputId}>
                        <h5>text: </h5>
                    </label>
                    <div className="col-sm-11">
                        <input className="form-control"
                               id={textInputId}
                               placeholder="text"
                               value={widget.text}
                               ref={node => inputElement=node}
                               onChange={() => {textChanged(widget.id, inputElement.value)}}
                        />
                    </div>
                </div>

                <div className="row" style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                    <label className="col-sm-1 col-form-label" htmlFor={nameInputId}>
                        <h5>name: </h5>
                    </label>
                    <div className="col-sm-11">
                        <input className="form-control"
                               id={nameInputId}
                               placeholder="Widget name"
                               value={widget.name}
                               ref={node => nameInputElement=node}
                               onChange={() => nameChanged(widget.id, nameInputElement.value)}
                        />
                    </div>
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
