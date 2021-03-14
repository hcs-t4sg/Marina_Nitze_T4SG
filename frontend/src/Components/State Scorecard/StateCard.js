import { Component } from "react";
import Diamond from "./Diamond"

// JavaScript source code
export default class StateCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            state: props.state,
            state_data: props.state_data,
            expanded: false,
            test: true
        };
    }

    render() {
        var data = this.state.state_data;
        if (this.state.expanded) {
            return (
                <div className="state-scorecard">
                    <div className="top-info">
                        <div className="title-area">
                            <h1> {this.state.state} </h1>
                            <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>  See Less </h4>
                        </div>
                        <div className="diamond-area" >
                            <Diamond implemented={data.electronic_request} />

                            <Diamond implemented={data.no_contact} />
                            <Diamond implemented={data.no_fee} />
                            <Diamond implemented={data.no_notary_required} />
                            <Diamond implemented={data.no_witness_required} />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="state-scorecard">
                <div className="top-info">
                    <div className="title-area">
                        <h1> {this.state.state} </h1>
                        <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}>  See More </h4>
                    </div>
                    <div className="diamond-area" >
                        <Diamond implemented={data.electronic_request} />

                        <Diamond implemented={data.no_contact} />
                        <Diamond implemented={data.no_fee} />
                        <Diamond implemented={data.no_notary_required} />
                        <Diamond implemented={data.no_witness_required} />
                    </div>
                </div>
            </div>
        )
    }
}