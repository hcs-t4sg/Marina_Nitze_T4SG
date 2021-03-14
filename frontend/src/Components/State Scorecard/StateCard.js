import { Component } from "react";

// JavaScript source code
export default class StateCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            state: props.state,
            data: props.data,
            expanded: false,
            test: true
        };
    }



    render() {
        if (this.state.expanded) {
            return (
                <div className="state-scorecard">
                    <h1> {this.state.state} </h1>
                    <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>  See Less </h4>
                </div>
            )
        }
        return (
            <div className="state-scorecard">
                <div className="default-view">

                    <h1> {this.state.state} </h1>
                    <h4 onClick={() => this.setState({expanded: !this.state.expanded})}>  See More </h4>
                </div>
            </div>
        )
    }
}