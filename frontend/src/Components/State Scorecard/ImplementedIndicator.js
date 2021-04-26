// JavaScript source code
import "./StateCard.css"

export default function ImplementedIndicator(props) {
    return (
        <div className={props.implemented ? "implemented-yes" : "implemented-no"}>
            <div className="implemented-text"> {props.implemented ? "Yes" : "No" } </div>
        </div>
    )
}