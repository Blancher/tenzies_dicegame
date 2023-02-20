export default function Die(props) {
    return (
        <div className='dies' style={{backgroundColor: props.bool ? '#59E391' : 'rgb(198, 198, 198)'}} onClick={props.onClick}>
            <h1>{props.val}</h1>
        </div>
    );
}