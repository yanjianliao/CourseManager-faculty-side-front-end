import React from 'react'


export default class TopicRow extends React.Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (

            <li className="list-group-item list-group-item-action">
                {this.props.topic.title}
                <button
                    onClick={
                        () => {
                            this.props.delete(this.props.topic.id);
                        }
                    }
                    className="btn btn-danger float-right">delete</button>
            </li>
        )
    }



}