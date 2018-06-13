import * as constants from '../constants'


export const findAllWidgets = (dispatch, topicId)=> {
    fetch(`http://localhost:8080/api/topic/${topicId}/widget`)
        .then(
            response => (response.json())
        ).then(
        widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        })
    )
};


export const addWidget = dispatch => {
    dispatch({type: constants.ADD_WIDGET});
};

export const saveWidget = (dispatch, topicId) => {
    dispatch({type: constants.SAVE, topicId: topicId})
};

export const headingTextChanged = (dispatch, widgetId, newText) => {
  dispatch({type: constants.HEADING_TEXT_CHANGED, id: widgetId, text: newText})
};