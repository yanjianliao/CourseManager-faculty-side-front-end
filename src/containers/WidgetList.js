import React from 'react';
import {connect} from 'react-redux'


class WidgetList extends React.Component{
    constructor(props) {
        super(props);
        // this.props.findAllWidgets();
    }



    render() {

        return (
            <h1>
                {this.props.courseId}
                {this.props.moduleId}
                {this.props.lessonId}
                {this.props.topicId}
            </h1>

        )



    }


}

const stateToPropertiesMapper = state => (
    {

    }
);

const dispatchToPropertiesMapper = dispatch => ({}
    // {
    //     findAllWidgets: () => actions.findAllWidgets(dispatch)
    // }
);



export const WidgetListContainer = connect(stateToPropertiesMapper, dispatchToPropertiesMapper)(WidgetList);