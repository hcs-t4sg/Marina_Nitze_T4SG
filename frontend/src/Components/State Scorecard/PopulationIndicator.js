// JavaScript source code
import "./StateCard.css"

const lowP = 2500000;
const highP = 7500000;

export default function PopulationIndicator(props) {
    var output = "Population: Medium (2.5M to 7.5M)"
    if (props.population < lowP)
        output = "Population: Small (under 2.5M)"
    else if (props.population > highP)
        output = "Population: Large (over 7.5M)"

    return (
        <div className="population-indicator">
            {output}
        </div>
    )
}// JavaScript source code
