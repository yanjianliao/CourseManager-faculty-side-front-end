import * as constants from '../constants/'

let increment = 1;

export const WidgetReducer = (state={widgets: []},action) => {
    let newState;
    switch (action.type) {
        case constants.FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            };
        case 'test':
            alert('test');
            return state;
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        widgetType: 'Heading',
                        size: '1',
                        text: 'New Widget',
                        id: ++increment
                    }
                ]
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
        case constants.HEADING_TEXT_CHANGED:
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
                )
            }
    }
    return state;
};