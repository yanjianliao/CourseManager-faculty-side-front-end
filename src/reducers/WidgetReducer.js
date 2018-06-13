import * as constants from '../constants/'

let increment = 1;

export const WidgetReducer = (state={widgets: []},action) => {
    switch (action.type) {
        case constants.FIND_ALL_WIDGETS:
            console.log(action.widgets);
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
            console.log(state.widgets);
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
    }
    return state;
};