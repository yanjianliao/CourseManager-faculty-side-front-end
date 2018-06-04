import React from 'react';
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseEditor from "./CourseEditor";

export default class CourseManager extends React.Component {

    // constructor(props) {
    //     //     super(props);
    //     //
    //     //     this.onChanged = this.onChanged.bind(this);
    //     //     this.state = {
    //     //         change : 'aaa'
    //     //     }
    //     // }
    //
    // onChanged(event) {
    //     this.setState({
    //         change : event.target.value
    //     });
    // }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/"
                           component={CourseList}/>

                    <Route path="/course/:courseId/"
                           component={CourseEditor}/>
                </div>

            </Router>

        )
    }


}
