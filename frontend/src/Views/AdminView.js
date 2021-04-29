import axios from "axios";
import React, { Component } from "react";
import "../App.css"

class AdminView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            issue_area: {
                title: "",
                num_practices: 1,
                intro_text: "",
                conclusion_text: "",
                practice_1: "",
                practice_1_question: "",
                practice_1_description: "",
                practice_1_example: "",
                practice_1_link: "",
                num_subpractices_1: 0,
                subpractices_1_names: ",,",
                practice_2: "",
                practice_2_question: "",
                practice_2_description: "",
                practice_2_example: "",
                practice_2_link: "",
                num_subpractices_2: 0,
                subpractices_2_names: ",,",
                practice_3: "",
                practice_3_question: "",
                practice_3_description: "",
                practice_3_example: "",
                practice_3_link: "",
                num_subpractices_3: 0,
                subpractices_3_names: ",,",
                practice_4: "",
                practice_4_question: "",
                practice_4_description: "",
                practice_4_example: "",
                practice_4_link: "",
                num_subpractices_4: 0,
                subpractices_4_names: ",,",
                practice_5: "",
                practice_5_question: "",
                practice_5_description: "",
                practice_5_example: "",
                practice_5_link: "",
                num_subpractices_5: 0,
                subpractices_5_names: ",,",
                practice_6: "",
                practice_6_question: "",
                practice_6_description: "",
                practice_6_example: "",
                practice_6_link: "",
                num_subpractices_6: 0,
                subpractices_6_names: ",,",
                practice_7: "",
                practice_7_question: "",
                practice_7_description: "",
                practice_7_example: "",
                practice_7_link: "",
                num_subpractices_7: 0,
                subpractices_7_names: ",,",
            },
            states_data: [{
                id: 0,
                abbreviation: "",
                electronic_request: false,
                name: "",
                no_fee: false,
                no_contact: false,
                no_notary_required: false,
                no_witness_required: false,
                county_administered: false,
                population: 0,
            }],
            submitted: false,
            initialized: false,
            bad_input: false,
        }
    }

    componentDidMount() {
        axios
            .get("https://marina-t4sg.herokuapp.com/api/states/")
            .then(res => this.getStatesData(res.data))
            .catch(err => console.log(err));
    }

    getStatesData(data) {
        let tempData = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            tempData.push(
                {
                    id: i,
                    name: item["name"],
                    abbreviation: item["abbreviation"],
                    county_administered: item["county_administered"],
                    population: item["population"],
                })
        }

        this.setState({ states_data: tempData });
    }

    submitNewPractice = (item) => {
        if(this.state.issue_area.title==="" || this.state.issue_area.intro_text==="" ||
        this.state.issue_area.conclusion_text===""){
            const tempState = this.state;
            tempState.bad_input = true;
            this.setState({ tempState });
            return;
        }
        else{
            const tempState = this.state;
            tempState.bad_input = false;
            this.setState({ tempState });
        }
        axios
            .post('https://marina-t4sg.herokuapp.com/api/issue-areas/', item)
            .catch(err => console.log(err));
        const tempState = this.state;
        tempState.submitted = true;
        this.setState({ tempState });
    }

    initializeImplementations = (item) => {
        
        for (var i = 0; i < this.state.states_data.length; i++) {
            axios.post('https://marina-t4sg.herokuapp.com/api/implementations/', {
                state: this.state.states_data[i].name,
                issue_area: item.title,

                practice_1: null,
                subpractice_1_1: null,
                subpractice_1_2: null,
                subpractice_1_3: null,

                practice_2: null,
                subpractice_2_1: null,
                subpractice_2_2: null,
                subpractice_2_3: null,

                practice_3: null,
                subpractice_3_1: null,
                subpractice_3_2: null,
                subpractice_3_3: null,

                practice_4: null,
                subpractice_4_1: null,
                subpractice_4_2: null,
                subpractice_4_3: null,

                practice_5: null,
                subpractice_5_1: null,
                subpractice_5_2: null,
                subpractice_5_3: null,

                practice_6: null,
                subpractice_6_1: null,
                subpractice_6_2: null,
                subpractice_6_3: null,

                practice_7: null,
                subpractice_7_1: null,
                subpractice_7_2: null,
                subpractice_7_3: null,
            })
                .catch(err => console.log(err));
        }
        const tempState = this.state;
        tempState.initialized = true;
        this.setState({ tempState });
    }

    handleChange = e => {
        let { name, value } = e.target;
        const issue_area = { ...this.state.issue_area, [name]: value };
        this.setState({ issue_area });
    };

    getSubpractice = (p_num, subp_num) =>{
        const field_str_1 = "subpractices_";
        const field_str_2 = "_names";
        var field_name = field_str_1.concat(String(p_num).concat(field_str_2));
        var subpractice = this.state.issue_area[field_name];

        const searchterm = ",";
        var comma_1_indx = subpractice.indexOf(searchterm);
        var comma_2_indx = subpractice.indexOf(searchterm,comma_1_indx+1);
        if(subp_num==1){return subpractice.substring(0,comma_1_indx); }
        else if(subp_num==2) {return subpractice.substring(comma_1_indx+1,comma_2_indx); }
        else if(subp_num==3) {return subpractice.substring(comma_2_indx+1); }
        else { return "";  }
    }

    updateSubpractice = e => {
        let { name, value } = e.target;
        var practice_id = name.charAt(0);
        var field_str_1 = "subpractices_";
        var field_str_2 = "_names";
        var field_name = field_str_1.concat(practice_id.concat(field_str_2));
        var subpractice = this.state.issue_area[field_name];

        const searchterm = ",";
        var comma_1_indx = subpractice.indexOf(searchterm);
        var name_1 = subpractice.substring(0,comma_1_indx);
        var comma_2_indx = subpractice.indexOf(searchterm,comma_1_indx+1);
        var name_2 = subpractice.substring(comma_1_indx+1,comma_2_indx);
        var name_3 = subpractice.substring(comma_2_indx+1);
        
        const subpractice_id = parseInt(name.charAt(1));
        if(subpractice_id == 1){
            subpractice = value.concat(searchterm.concat(name_2.concat(searchterm.concat(name_3))));
        }
        else if(subpractice_id==2){
            subpractice = name_1.concat(searchterm.concat(value.concat(searchterm.concat(name_3))));
        }
        else if(subpractice_id==3){
            subpractice = name_1.concat(searchterm.concat(name_2.concat(searchterm.concat(value))));
        }

        const issue_area = { ...this.state.issue_area, [field_name]: subpractice };
        this.setState({ issue_area });
    }

    updateImplementation  = e => {
        let { name, id, value} = e.target;
    }

    increment = e => {
        let {name, value} = e.target;
        value = parseInt(value);
        var max = 0;
        if(name.includes("num_practices")){ max = 7;}
        else if(name.includes("num_subpractices")) {max = 3;}
        if (value < max) {
            const issue_area = {
                ...this.state.issue_area,
                [name]: value + 1
            };
            this.setState({ issue_area });
        }
    }

    decrement = e => {
        let {name, value} = e.target;
        value = parseInt(value);
        if (value > 0) {
            const issue_area = {
                ...this.state.issue_area,
                [name]: value - 1
            };
            this.setState({ issue_area });
        }
    }

    render() {

        var practice_fields = [];
        const title_str = "Practice #"
        const name_str = "practice_"
        const question_str = "_question"
        const description_str = "_description"
        const example_str = "_example"
        const link_str = "_link"
        const num_subpractices_str = "num_subpractices_"
        const subpractice_str = "subpractice_"
        const underscore = "_"
        for (var i = 1; i <= this.state.issue_area.num_practices; i++) {
            const num_str = String(i)

            var subpractice_fields = [];
            for (var j = 1; j<= this.state.issue_area[num_subpractices_str.concat(num_str)]; j++){
                subpractice_fields.push(
                    {id_pair: num_str.concat(String(j)),
                        id: j,
                        name: subpractice_str.concat(
                            underscore.concat(num_str.concat(underscore.concat(String(j)))))})
            }
            
            practice_fields.push({
                id: i,
                title: title_str.concat(num_str),
                name: name_str.concat(num_str),
                question: name_str.concat(num_str.concat(question_str)),
                description: name_str.concat(num_str.concat(description_str)),
                example: example_str.concat(num_str.concat(example_str)),
                link: name_str.concat(num_str.concat(link_str)),
                num_subpractices: num_subpractices_str.concat(num_str),
                subpractice_names: subpractice_fields,
            })
        }

        var new_states_data = [];
        if(this.state.states_data){
            new_states_data = this.state.states_data;
        }

        if(!this.state.submitted){
            return (
                <div className="admin-space">
                    
                    <h2>Create a New Issue Area</h2>

                    <div className="admin-input-area">
                        <div>Issue Area:<font color="#FF0000">*</font></div>
                        <input
                            type="text"
                            className="admin-input-line"
                            name="title"
                            onChange={this.handleChange}
                        ></input>
                    </div>

                    <div className="admin-input-area">
                        <div>Number of Practices:</div>
                        <div className='admin-counter'>
                            <div >{this.state.issue_area.num_practices}</div>
                            <button name="num_practices" value = {this.state.issue_area.num_practices}
                                onClick={this.increment}> + </button>
                            <button name="num_practices" value = {this.state.issue_area.num_practices}
                                onClick={this.decrement}> - </button>
                        </div>
                    </div>

                    <div className="admin-input-area">
                        <div>Intro Text:<font color="#FF0000">*</font> </div>
                        <textarea
                            type="text"
                            className="admin-input-text"
                            rows="5"
                            cols="50"
                            name="intro_text"
                            onChange={this.handleChange}
                        ></textarea>
                    </div>

                    <div className="admin-input-area">
                        <div>Conclusion Text:<font color="#FF0000">*</font> </div>
                        <textarea
                            type="text"
                            className="admin-input-text"
                            rows="5"
                            cols="50"
                            name="conclusion_text"
                            onChange={this.handleChange}
                        ></textarea>
                    </div>

                    {practice_fields.map(practice =>

                        <div className="admin-practice-area">
                            <h4>{practice.title}</h4>
                            <div className="admin-input-area">
                                <div>Name:</div>
                                <input
                                    type="text"
                                    className="admin-input-line"
                                    name={practice.name}
                                    onChange={this.handleChange}
                                ></input>
                            </div>

                            <div className="admin-input-area">
                                <div>Question:</div>
                                <input
                                    type="text"
                                    className="admin-input-line"
                                    name={practice.question}
                                    onChange={this.handleChange}
                                ></input>
                            </div>

                            <div className="admin-input-area">
                                <div>Description: </div>
                                <textarea
                                    type="text"
                                    className="admin-input-text"
                                    rows="5"
                                    cols="50"
                                    name={practice.description}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>

                            <div className="admin-input-area">
                                <div>Example: </div>
                                <textarea
                                    type="text"
                                    className="admin-input-text"
                                    rows="5"
                                    cols="50"
                                    name={practice.example}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>

                            <div className="admin-input-area">
                                <div>Link:</div>
                                <input
                                    type="text"
                                    className="admin-input-line"
                                    name={practice.link}
                                    onChange={this.handleChange}
                                ></input>
                            </div>

                            <div className="admin-input-area">
                                <div>Number of Subpractices:</div>
                                <div className='admin-counter'>
                                    <div >{this.state.issue_area[practice.num_subpractices]}</div>
                                    <button name={practice.num_subpractices} value = {this.state.issue_area[practice.num_subpractices]}
                                        onClick={this.increment}> + </button>
                                    <button name={practice.num_subpractices} value = {this.state.issue_area[practice.num_subpractices]}
                                        onClick={this.decrement}> - </button>
                                </div>
                            </div>

                            {practice.subpractice_names.map(subpractice =>

                                <div className="admin-input-area">
                                <div>Subpractice Name:</div>
                                <input
                                    type="text"
                                    className="admin-input-line"
                                    name={subpractice.id_pair}
                                    onChange={this.updateSubpractice}
                                ></input>
                                </div>

                            )}

                        </div>
                    )}





                    <button
                        className="admin-submit-button"
                        onClick={() => this.submitNewPractice(this.state.issue_area)}>
                        Create New Issue Area!
                    </button>
                    <h4>
                        <b><font color="#FF0000">{this.state.bad_input ? '* Fill in Required Fields' : ''}</font></b>
                    </h4>

                </div>

            );
        }
        else if(!this.state.initialized){
            return (
                <div className="admin-space">
                    <div className="admin-space">
                    <h2>Initialize Data</h2>

                    {new_states_data.map(state =>
                        <div className="admin-checkbox-area">
                        <h4>{state.name} </h4>
                        {practice_fields.map(practice =>
                            <div>   
                            <input
                                type="checkbox"
                                name={practice.name}
                                id = {state.id}
                                value = {this.state.states_data[state.id][practice.name]}
                                onChange={this.updateImplementation}
                            ></input>
                            <label>{this.state.issue_area[practice.name]}</label>
                            
                            
                            {practice.subpractice_names.map(subpractice =>

                                <div className="admin-subpractice-checkbox">
                                <input
                                    type="checkbox"
                                    name={subpractice.id_pair}
                                    id = {state.id}
                                    value = {this.state.states_data[state.id][subpractice.name]}
                                    onChange={this.updateImplementation}
                                ></input>
                                <label>{this.getSubpractice(practice.id, subpractice.id)}</label>
                                </div>

                            )}
                            </div>
                        )}
                    </div>
                    )}
                    </div>

                    <button
                        className="admin-submit-button"
                        onClick={() => this.initializeImplementations(this.state.issue_area)}>
                        Initialize Data!
                    </button>
                </div>
            )
        }
        else{
            return (
                <div className="admin-space">
                    <h2>Form Submitted</h2>
                    <h4>Refresh to submit a new form</h4>
                </div>
            )
        }
    }
}
export default AdminView