import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

export default function Header(){
    return(
        <div className="header"> 
            <h1>TODO List </h1>
            <FontAwesomeIcon className='icon' icon={faClipboardList} />

        </div>
    )
}