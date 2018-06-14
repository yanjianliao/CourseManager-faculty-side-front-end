import * as constants from '../constants/'

let increment = 1;
let position = 0;

export const WidgetReducer = (state={widgets: [], preview: false},action) => {
    let newState;
    let temp;
    console.log(state.widgets);
    switch (action.type) {
        case constants.FIND_ALL_WIDGETS:
            position = 0;
            newState = {
                widgets: action.widgets,
                preview: state.preview
            };
            state.widgets = action.widgets;
            newState.widgets.sort((a, b) => a.position - b.position);
            return newState;
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        widgetType: 'Heading',
                        size: '1',
                        text: '',
                        name: '',
                        id: ++increment,
                        position: state.widgets.length
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
            position = 0;
            return {
                widgets: state.widgets.filter(
                    widget => {
                        if(widget.id !== action.id)
                            widget.position = position++;
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
            };

        case constants.POSITION_UP_BUTTON:
            newState = {
                widgets: state.widgets.map(
                    (widget, index) => {
                        if(widget.id === action.id) {
                            temp = widget.position;
                            state.widgets[index].position = state.widgets[index - 1].position;
                            state.widgets[index - 1].position = temp;
                        }
                        return state.widgets[index];
                    }
                ),
                preview: state.preview
            };
            newState.widgets.sort((a, b) => a.position - b.position);
            return newState;
        case constants.POSITION_DOWN_BUTTON:
            newState = {
                widgets: state.widgets.map(
                    (widget, index) => {
                        if(widget.id === action.id) {
                            temp = widget.position;
                            state.widgets[index].position = state.widgets[index + 1].position;
                            state.widgets[index + 1].position = temp;
                        }
                        return state.widgets[index];
                    }
                ),
                preview: state.preview
            };
            newState.widgets.sort((a, b) => a.position - b.position);
            return newState;
    }
    return state;
};