import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid';

const AddNoteButton = props => {

    const clickHandler = () => {
        
        const emptyNote = {
            uuid: uuid(),
            content: "",
            color: Object.keys(window.noteColors)[0],
            coordinates: {
                x: 0,
                y: 0,
            },
        };

        props.onAddNewNote(emptyNote);
    }

    return (
        <button id="add-note-btn" className="btn btn-success mx-4" onClick={clickHandler}>
            <FontAwesomeIcon className="me-2" icon={faPlus}/>Add New Note
        </button>
    );
}

export default AddNoteButton;
