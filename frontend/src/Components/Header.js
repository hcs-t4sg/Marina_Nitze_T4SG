// JavaScript source code
import "./Header.css"
export default function Header(props) {


	// var toggle = document.createElement('a', { is : 'toggle' });
	var toggle = document.createElement('a');
	toggle.innerHTML = '<span></span>';
	toggle.className = 'toggle';
	toggle.onClick = props.onClick;

	function hasClass(elem, className) {
	  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}
	function addClass(elem, className) {
	    if (!hasClass(elem, className)) {
	      elem.className += ' ' + className;
	    }
	}
	function removeClass(elem, className) {
	  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	  if (hasClass(elem, className)) {
	        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
	            newClass = newClass.replace(' ' + className + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	}
	function toggleClass(elem, className) {
	  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
	    if (hasClass(elem, className)) {
	        while (newClass.indexOf(" " + className + " ") >= 0 ) {
	            newClass = newClass.replace( " " + className + " " , " " );
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    } else {
	        elem.className += ' ' + className;
	    }
	}

	toggle.onclick = function() {
	   toggleClass(this, 'on');
	   return false;
	}

	return (
		<div>
			<div className="header">
				<a id="toggle" onClick={props.onClick}><span></span></a>
			</div>
			<div className="header-teal-section"></div>
		</div>
	)
}