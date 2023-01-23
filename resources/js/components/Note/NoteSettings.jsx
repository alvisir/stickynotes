import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const NoteSettings = props => {

    const confirmDeleteNote = () => {
        if (confirm('Are you sure you wish to delete this note?')) {
            props.onDeleteNote(props.noteId);
        }
    }

    const changeColorHandler = colorId => {
        props.onChangeColor('color', colorId);
    }

    return (
        <div className="note__settings px-4 py-2">
            <ul className="list-unstyled m-0">
            {Object.entries(window.noteColors).map(([index, color]) => (
                <li key={index} onClick={() => {changeColorHandler(index)}} className="list-inline-item">
                    <span className={"note__settings-color " + color} ></span>
                </li>
            ))}
            </ul>
            <button className="btn delete-note ms-auto" onClick={confirmDeleteNote}><FontAwesomeIcon icon={faTrashAlt} /></button>
        </div>
    );
}

export default NoteSettings;