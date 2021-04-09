// JavaScript source code
import "./Header.css"
export default function Header(props) {
	return (
		<div>
			<div className="header">
				<a className="menu-btn" id={props.toggle ? "toggle-on" : "toggle"} onClick={props.onClick}><span></span></a>
				<div className="t4sg-logo"></div>
			</div>
		</div>
	)
}