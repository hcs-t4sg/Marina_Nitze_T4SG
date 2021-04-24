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
            resourceLinks.push(
                <div>
                    <a href={this.props.issueArea[`practice_${i}_link`]} target="blank">
                        Link
                    </a>
                </div>
            )
        }

        if (this.state.expanded && this.props.hasSubmetrics) {
            var submetric_names = []

            for (var i = 1; i <= this.props.total; i++) {
                if (this.props.issueArea[`subpractices_${i}_names`]) {
                    submetric_names.push(this.props.issueArea[`subpractices_${i}_names`].slice(1, this.props.issueArea[`subpractices_${i}_names`].length - 1).split(","))
                }
                for (var j = 0; j < submetric_names[i-1].length; j++) {
                    submetric_names[i-1][j] = submetric_names[i-1][j].trim()
                    submetric_names[i-1][j] = submetric_names[i-1][j].slice(1, submetric_names[i-1][j].length - 1)
                }

            }

            var submetric_scores = [];

            for (var i = 1; i <= this.props.total; i++) {
                if (this.props.issueArea[`num_subpractices_${i}`]) {
                    var submetrics = []
                    for (var j = 1; j <= this.props.issueArea[`num_subpractices_${i}`]; j++) {
                        submetrics.push(
                            <div className="submetric-info">
                                <div className="column-left-middle">
                                    <p>{submetric_names[i - 1][j - 1]}</p>
                                </div>
                                <div className="column-right">
                                    <ImplementedIndicator
                                        implemented={i_data[`subpractice_${i}_${j}`]}
                                        key={s_data['name'] + "_" + i_data['issue_area'] + "_" + submetric_names[i-1][j-1]}
                                    />
                                </div>
                            </div>
                        )
                    }

                    submetric_scores.push(
                        <div className="submetric-div">
                            <div className="submetric-title">
                                <div className="column-left-middle">
                                    <h4><font color="#0E7088">{this.props.practices[i - 1]}</font></h4>
                                </div>
                                <div className="column-right">
                                    <a href={this.props.issueArea[`practice_${i}_link`]}> Resource Link </a>
                                </div>
                            </div>
                            <div>
                                {submetrics}
                            </div>
                        </div>
                    )
                }
                else {
                    submetric_scores.push(
                        <div className="submetric-div">
                            <div className="column-left-middle">
                                <h4><font color="#0E7088">{this.props.practices[i - 1]}</font></h4>
                            </div>

                            <div className="column-right">
                                <ImplementedIndicator
                                    implemented={i_data[`practice_${i}`]}
                                    key={s_data['name'] + "_" + i_data['issue_area'] + "_" + i}
                                />
                            </div>
                            )
                        </div>
                    )
                }
            }

            
            return (
                <div className="state-scorecard">
                    <div className="top-info">
                        <div className="title-area">
                            <h1> {s_data["name"]} </h1>
                            <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#0E7088"> See Less </font> </h4>
                        </div>
                        <ProgressBar completed={this.props.completed} total={this.props.total} />
                        <p className="score-percentage"> {implemented_string} </p>
                    </div>

                    <div className="demographics-div">
                        <h4> <font color="#0E7088">Demographics </font></h4>
                        <PopulationIndicator population={s_data["population"]} />
                        <SCIndicator county={s_data
                        ["county_administered"]} />
                    </div>
                    <div className="expanded-info">
                        <div className="submetric-scores">
                            {submetric_scores}
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.expanded) {
            var implementedIndicators = [];
            for (var i = 1; i <= this.props.total; i++) {
                implementedIndicators.push(
                    <ImplementedIndicator
                        implemented={i_data[`practice_${i}`]}
                        key={s_data['name'] + "_" + i_data['issue_area'] + "_" + i}
                         />)
            }

            return (
                <div className="state-scorecard">
                    <div className="top-info">
                        <div className="title-area">
                            <h1> {s_data["name"]} </h1>
                            <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#0E7088"> See Less </font> </h4>
                        </div>
                        <ProgressBar completed={this.props.completed} total={this.props.total} />
                        <p className="score-percentage"> {implemented_string} </p>
                    </div>
                    
                    <div className="demographics-div">
                        <h4> <font color="#0E7088">Demographics </font></h4>
                        <PopulationIndicator population={s_data["population"]} />
                        <SCIndicator county={s_data
                        ["county_administered"]} />
                    </div>
                    <div className="expanded-info">
                        <div className="column-left">
                            <h4><font color="#0E7088">Promising Practice</font></h4>
                            {this.props.practices.map(
                                practice => <div>{practice}</div>)
                            }
                        </div>
                        <div className="column-center">
                            <h4><font color="#0E7088">Implemented?</font></h4>
                            {implementedIndicators}
                        </div>
                        <div className="column-right">
                            <h4><font color="#0E7088">Resource Guide</font></h4>
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
                        <h4 onClick={() => this.setState({ expanded: !this.state.expanded })}> <font color="#0E7088"> View Details </font> </h4>
                    </div>
                    <ProgressBar completed={this.props.completed} total={this.props.total} />
                    <p className="score-percentage"> {implemented_string} </p>
                </div>
            </div>
        )
    }
}