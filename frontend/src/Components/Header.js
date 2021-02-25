// JavaScript source code
import "./Header.css"
export default function Header(props) {
	return (
		<div className="header">
			<button className="header-btn" onClick={props.onClick}> Toggle </button>
		</div>

	)
}