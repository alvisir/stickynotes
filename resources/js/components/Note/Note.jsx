import { useState, useEffect, forwardRef } from "react";
import Draggable from "react-draggable";
import NoteSettings from "./NoteSettings";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const Note = forwardRef((props, ref) => {

    const [settings, setSettings] = useState();
    const [noteData, setNoteData] = useState(props.data);
    const [contentEditable, setContentEditable] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [openLightbox, setOpenLightbox] = useState(false);
    const isNoteImage = noteData.hasOwnProperty('image');

    const changeNoteDataHandler = (propName, propValue) => {
        if (propName === 'color') {
            propValue = parseInt(propValue);
        }
        setNoteData(prevNoteData => {
            return {...prevNoteData, [propName]: propValue}
        });
        setUpdating(true);
    }

    const clickOnHandler = (event) => {
        if (event.target.classList.contains('note__drag-handler')) {
            return false;
        }

        props.onSetSelectedNote(noteData.uuid);
        setSettings(
            <NoteSettings
            noteId={noteData.id}
            onChangeColor={changeNoteDataHandler}
            onDeleteNote={props.onDeleteNote}
            />
        );
    }

    const stopDragHandler = (event, dragEl) => {
        changeNoteDataHandler('coordinates', {
            x: parseFloat(100 * (dragEl.x / window.innerWidth)).toFixed(2),
            y: parseFloat(100 * (dragEl.y / window.innerHeight)).toFixed(2),
        });
        setContentEditable(true);
    };

    useEffect(() => {
        if (updating) {
            props.onUpdateNote(noteData);
            setUpdating(false);
        }
    }, [updating]);
    
    let classesArray = ['note', window.noteColors[noteData.color]];
    if (props.isSelected) {
        classesArray = [...classesArray, 'selected'];
    }
    if (isNoteImage) {
        classesArray = [...classesArray, 'image-note'];
    }

    return (
        <>
        <Draggable 
        bounds="parent"
        handle=".note__drag-handler"
        onStop={stopDragHandler}
        onDrag={() => {setContentEditable(false)}}
        defaultPosition={{
            x: parseInt((noteData.coordinates.x / 100) * window.innerWidth),
            y: parseInt((noteData.coordinates.y / 100) * window.innerHeight)
        }}
        >
            <div
                ref={ref}
                id={'note_'+noteData.uuid}
                className={classesArray.join(' ')}
            >
                <div className="note__drag-handler"></div>
                <div className="note__body p-4"
                    contentEditable={isNoteImage ? false : contentEditable}
                    suppressContentEditableWarning
                    onClick={clickOnHandler}
                    onBlur={e => {changeNoteDataHandler('content', e.currentTarget.textContent)}}
                >
                {isNoteImage ? 
                    <img className="img-fluid" src={noteData.image} draggable={false} />
                : noteData.content}
                </div>
                {props.isSelected ? settings : ''}
                {isNoteImage && <span className="open-lightbox" onClick={() => {setOpenLightbox(true)}}><FontAwesomeIcon icon={faCirclePlus} /></span>}
            </div>
        </Draggable>
        {(isNoteImage && openLightbox) && <Lightbox mainSrc={noteData.image} onCloseRequest={() => {setOpenLightbox(false)}} />}
        </>
    );
});

export default Note;
