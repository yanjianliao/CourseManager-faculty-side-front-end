import React from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions";

const Image = ({preview, nameChanged, widget, srcChanged}) => {
    let nameInput;
    let imageInput;
    return (
        <div>
            <div hidden={widget.editMode ? false : preview}>
            <div  style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                <input className="form-control"
                       placeholder="Image src"
                       ref={node=> imageInput=node}
                       onChange={() => srcChanged(widget.id, imageInput.value) }
                       value={widget.src ? widget.src : ''}
                />
            </div>
            <div  style={{"marginTop" :"20px", "marginBottom" :"20px"}}>
                <input className="form-control"
                       placeholder="Paragraph name"
                       ref={node=> nameInput=node}
                       onChange={ () => nameChanged(widget.id, nameInput.value)}
                       value={widget.name}
                />
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