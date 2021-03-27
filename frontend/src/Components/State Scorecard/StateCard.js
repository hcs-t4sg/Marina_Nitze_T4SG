import { Component } from "react";
import Diamond from "./Diamond"
import ImplementedIndicator from "./ImplementedIndicator"
import PopulationIndicator from "./PopulationIndicator"
import SCIndicator from "./SCIndicator"

// JavaScript source code
export default class StateCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            state: props.state_data["name"],
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
                            <h1> {this.state.state_data["name"]} </h1>
                            <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#0E7088"> Hide Details </font></h4>
                        </div>
                        <div className="diamond-area" >
                            <Diamond implemented={data.no_fee} symbol={"F"}/>
                            <Diamond implemented={data.no_notary_required} symbol={"N"}/>
                            <Diamond implemented={data.electronic_request} symbol={"E"}/>
                            <Diamond implemented={data.no_contact} symbol={"C"}/>
                            <Diamond implemented={data.no_witness_required} symbol={"W"}/>
                        </div>
                    </div>

                    <div className="demographics-div">
                        <h4> <font color="#0E7088">Demographics </font></h4>
                        <PopulationIndicator population={this.state.state_data["population"]} />
                        <SCIndicator county={this.state.state_data["county_administered"]} />
                    </div>
                    <div className="expanded-info">
                        <div className="column-left">
                            <h4><font color="#0E7088">Promising Practice</font></h4>
                            <div>Does not charge a fee</div>
                            <div>Does not require a notary</div>
                            <div>Accepts electronic requests</div>
                            <div>Does not list an individual contact</div>
                            <div>Does not require a witness</div>
                        </div>
                        <div className="column-center">
                            <h4><font color="#0E7088">Implemented?</font></h4>
                            <div><ImplementedIndicator implemented={data.no_fee} /></div>
                            <div><ImplementedIndicator implemented={data.no_notary_required} /></div>
                            <div><ImplementedIndicator implemented={data.electronic_request} /></div>
                            <div><ImplementedIndicator implemented={data.no_contact} /></div>
                            <div><ImplementedIndicator implemented={data.no_witness_required} /></div>
                        </div>
                        <div className="column-right">
                            <h4><font color="#0E7088">Resource Guide</font></h4>
                            <div>Link</div>
                            <div>Link</div>
                            <div>Link</div>
                            <div>Link</div>
                            <div>Link</div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="state-scorecard">
                <div className="top-info">
                    <div className="title-area">
                        <h1> {this.state.state_data["name"]} </h1>
                        <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#0E7088"> View Details </font> </h4>
                    </div>
                    <div className="diamond-area" >
                            <Diamond implemented={data.no_fee} symbol={"F"}/>
                            <Diamond implemented={data.no_notary_required} symbol={"N"}/>
                            <Diamond implemented={data.electronic_request} symbol={"E"}/>
                            <Diamond implemented={data.no_contact} symbol={"C"}/>
                            <Diamond implemented={data.no_witness_required} symbol={"W"}/>
                    </div>
                </div>
            </div>
        )
    }
}