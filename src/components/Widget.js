import React from 'react'
import {connect} from 'react-redux'
import {HeadingContainer} from "./widgets/Heading";

class Widget extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div>
                    <HeadingContainer widget={this.props.widget}/>
                </div>

                <hr/>
            </div>


        )
    }

}

const stateToPropertiesMapper = state => {

};

const dispatchToPropertiesMapper = dispatch => {

};

export const WidgetContainer = connect()(Widget);