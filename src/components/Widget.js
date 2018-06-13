import React from 'react'
import {connect} from 'react-redux'

class Widget extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>

                {this.props.widget.text}
                <hr/>

            </div>


        )
    }

}

const stateToPropertiesMapper = state => {

};

const dispatchToPropertiesMapper = dispatch => {
    return dispatch
};

export const WidgetContainer = connect()(Widget);