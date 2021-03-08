// JavaScript source code
import "./Header.css"
export default function Header(props) {

	return (
		<div>
			<div className="header">
				<a className="header-btn" onClick={props.onClick}><span></span></a>
			</div>
			<div className="header-teal-section"></div>
		</div>

	)
}