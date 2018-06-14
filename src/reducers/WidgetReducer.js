import * as constants from '../constants/'

let increment = 1;

export const WidgetReducer = (state={widgets: [], preview: false},action) => {
    let newState;
    switch (action.type) {
        case constants.FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets,
                preview: state.preview
            };
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        widgetType: 'Heading',
                        size: '1',
                        text: '',
                        name: '',
                        id: ++increment
                    }
                ],
                preview: state.preview
            };
        case constants.SAVE:
            fetch(`http://localhost:8080/api/topic/${action.topicId}/widget`, {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(
                () => {
                    alert('Saved!!!')
                }
            );
            return state;
        case constants.TEXT_CHANGED:
            newState = {
                widgets: state.widgets.map(
                    widget => {
                        if(widget.id === action.id) {
                            widget.text = action.text;
                            return Object.assign({}, widget);
                        }
                        return widget;
                    }
                ),
                preview: state.preview
            };
            return newState;
        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(
                    widget => {

                        if(widget.id === action.id) {
                            widget.size = action.size;
                            return Object.assign({}, widget);
                        }
                        return widget;
                    }
                ),
                preview: state.preview
            };
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(
                    widget => {
                        return widget.id !== action.id;
                    }
                ),
                preview: state.preview
            };

        case constants.SELECT_WIDGET_TYPE:
            return {
                widgets: state.widgets.map(
                    widget => {
                        if(widget.id === action.id) {
                            widget.widgetType = action.newType;
                            return Object.assign({}, widget);
                        }
                        return widget;
                    }
                ),
                preview: state.preview
            };
        case constants.NAME_CHANGED:
            return {
                widgets: state.widgets.map(
                    widget => {

                        if(widget.id === action.id) {
                            widget.name = action.name;
                            return Object.assign({}, widget);
                        }
                        return widget;
                    }
                ),
                preview: state.preview
            };
        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            }
    }
    return state;
};