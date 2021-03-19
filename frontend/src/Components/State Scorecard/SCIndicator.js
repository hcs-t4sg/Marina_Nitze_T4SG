// JavaScript source code
import "./StateCard.css"

export default function SCIndicator(props) {
    return (
        <div className="sc=indicator">
            <div> {props.county ? "County Administered" : "State Administered"} </div>
        </div>
    )
}