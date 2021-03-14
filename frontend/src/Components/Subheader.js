// JavaScript source code
import "./Subheader.css"

export default function Subheader(props) {
    return (
        < div
            className="subheader"
        >
            <h3 className="subtitle">
                {props.title}
            </h3>
        </div >

    )
}
