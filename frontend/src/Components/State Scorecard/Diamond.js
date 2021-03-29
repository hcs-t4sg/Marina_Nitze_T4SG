// JavaScript source code
import "./StateCard.css"

export default function Diamond(props) {
    return (
        <div className={props.implemented ? "diamond-filled" : "diamond-empty"}>
            <div> {props.symbol} </div>
        </div>
    )
}