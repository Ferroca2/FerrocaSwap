import './SimpleSider.css';
import { useParams } from 'react-router-dom';

function SimpleSider() {

    const params = useParams();
    return (
        <div id="simpleSider">
            {/* <h1>{params}</h1> */}
        </div>
    )
}

export default SimpleSider;