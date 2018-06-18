import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";

const Image = ({preview, nameChanged, widget, srcChanged}) => {
    let nameInput;
    let imageInput;
    let imageSrcId = widget.id + 'imageSrc';
    let nameInputId = widget.id + 'nameInputId';
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
            <div  className="row" style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                <label className="col-sm-2 col-form-label" htmlFor={imageSrcId}>
                    <h5>image src: </h5>
                </label>
                <div className="col-sm-10">
                    <input  id={imageSrcId}
                            className="form-control"
                            placeholder="Image src"
                            ref={node=> imageInput=node}
                            onChange={() => srcChanged(widget.id, imageInput.value) }
                            value={widget.src ? widget.src : ''}
                    />
                </div>
            </div>
            <div className="row" style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                <label className="col-sm-2 col-form-label" htmlFor={nameInputId}>
                    <h5>name: </h5>
                </label>
                <div className="col-sm-10">
                    <input className="form-control"
                           placeholder="Paragraph name"
                           id={nameInputId}
                           ref={node=> nameInput=node}
                           onChange={ () => nameChanged(widget.id, nameInput.value)}
                           value={widget.name}
                    />
                </div>
            </div>
                <h3>Preview</h3>
            </div>

            <div>
                <img src={widget.src}/>
            </div>

        </div>


    )
};

const stateToPropertiesMapper = state => ({
    preview: state.preview
});

const dispatchToPropertiesMapper = dispatch => ({
    nameChanged: (widgetId, newName) => actions.nameChanged(dispatch, widgetId, newName),
    srcChanged: (widgetId, src) => actions.srcChanged(dispatch, widgetId, src)
});



export const ImageContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(Image);