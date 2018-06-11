import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import CourseManager from "./containers/CourseManager";
import './index.css';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {WidgetReducer} from "./reducers/WidgetReducer";


let store = createStore(WidgetReducer);
ReactDOM.render(
    <Provider store={store}>
        <CourseManager/>
    </Provider>,
    document.getElementById('root')
);