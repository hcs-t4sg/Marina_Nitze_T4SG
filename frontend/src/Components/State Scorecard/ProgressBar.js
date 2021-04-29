// JavaScript source code
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

export default function ProgressBar(props) {
    const completed = props.completed;
    const total = props.total;
    const percentage = completed * 100 / total;

    const containerStyles = {
        height: 20,
        width: '50%',
        backgroundColor: "var(--lightest-blue)",
        marginTop: "4%",
    }

    const fillerStyles = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: "var(--blue-3)",
        borderRadius: 'inherit',
        textAlign: 'right'
    }


    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
        )
}