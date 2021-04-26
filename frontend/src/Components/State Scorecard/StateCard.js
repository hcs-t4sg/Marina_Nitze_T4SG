import { Component } from "react";
import Diamond from "./Diamond"
import ImplementedIndicator from "./ImplementedIndicator"
import PopulationIndicator from "./PopulationIndicator"
import SCIndicator from "./SCIndicator"
import ProgressBar from "./ProgressBar"

// JavaScript source code
export default class StateCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            state: props.state,
            state_data: props.state_data,
            implementation_data: props.implementation_data,
            expanded: false,
            test: true,
            total: props.total,
            completed: props.completed,
            issue: props.issueArea
        };
    }

    render() {
        var s_data = this.props.state_data;
        var i_data = this.props.implementation_data;

        const implemented_string = this.props.completed + "/" + this.props.total;

        var resourceLinks = []
        for (var i = 1; i <= this.props.total; i++) {
            console.log();
            resourceLinks.push(
                <div>
                    <a href={this.props.issueArea[`practice_${i}_link`]} target="blank">
                        Link
                    </a>
                </div>
            )
        }

        if (this.state.expanded) {
            return (
                <div className="state-scorecard">
                    <div className="top-info">
                        <div className="title-area">
                            <h1> {s_data["name"]} </h1>
                            <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#4B73DB"> See Less </font> </h4>
                        </div>
                        <ProgressBar completed={this.props.completed} total={this.props.total} />
                        <p className="score-percentage"> {implemented_string} </p>
                    </div>

                    <div className="demographics-div">
                        <h4> <font color="#4B73DB">Demographics </font></h4>
                        <PopulationIndicator population={s_data["population"]} />
                        <SCIndicator county={s_data
                        ["county_administered"]} />
                    </div>
                    <div className="expanded-info">
                        <div className="column-left">
                            <h4><font color="#4B73DB">Promising Practice</font></h4>
                            {this.props.practices.map(
                                practice => <div>{practice}</div>)
                            }
                        </div>
                        <div className="column-center">
                            <h4><font color="#4B73DB">Implemented?</font></h4>
                            <div><ImplementedIndicator implemented={i_data.practice_1} /></div>
                            <div><ImplementedIndicator implemented={i_data.practice_2} /></div>
                            <div><ImplementedIndicator implemented={i_data.practice_3} /></div>
                            <div><ImplementedIndicator implemented={i_data.practice_4} /></div>
                            <div><ImplementedIndicator implemented={i_data.practice_5} /></div>
                        </div>
                        <div className="column-right">
                            <h4><font color="#4B73DB">Resource Guide</font></h4>
                            {resourceLinks}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="state-scorecard">
                <div className="top-info">
                    <div className="title-area">
                        <h1> {s_data["name"]} </h1>
                        <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#3A62B0"> View Details </font> </h4>
                    </div>
                    <ProgressBar completed={this.props.completed} total={this.props.total} />
                    <p className="score-percentage"> {implemented_string} </p>
                </div>
            </div>
        )
    }
}