import React, {useCallback, useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const DropZoneContainer = props => {

  const [newNote, setNewNote] = useState(false);
  
  const onDrop = useCallback((acceptedFiles, fileRejections, event) => {
    acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    if (acceptedFiles[0]) {
      const newNoteData = {
        uuid: uuid(),
        content: "",
        color: Object.keys(window.noteColors)[0],
        coordinates: {
          x: parseFloat(100 * (event.clientX / window.innerWidth)).toFixed(2),
          y: parseFloat(100 * (event.clientY / window.innerHeight)).toFixed(2),
        },
        image: acceptedFiles[0]
      };

      setNewNote(newNoteData);
    }

  }, [])

  useEffect(() => {
    if (newNote) {
      props.onAddNewNote(newNote);
    }
  }, [newNote]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
        'image/jpeg': [],
        'image/png': [],
    },
    onDrop: onDrop,
    multiple: false,
    maxSize: 1048576
  });

  const classes = [['dropzone'], props.show ? ['dropping'] : null];

  return (
      <section id="dropzone-container" {...getRootProps({className: classes.join(' ')})}>
        <input {...getInputProps()} />
        <div className="drag-here">
          <FontAwesomeIcon icon={faCirclePlus} />
          <div className="info-drag-here">
            Allowed formats: <strong>JPG</strong>, <strong>PNG</strong>.<br />
            Max size: <strong>1MB</strong>.
          </div>
        </div>
        </section>
  );
}

export default DropZoneContainer;
