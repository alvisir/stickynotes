import React, { useState, useEffect } from "react";
import AddNoteButton from "./Note/AddNoteButton";
import Note from "./Note/Note";
import { v4 as uuid } from 'uuid';
import useOutsideClick from "../hooks/useOutSideClick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faArrowRightToBracket, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import LoginForm from "./Forms/LoginForm";
import SignInForm from "./Forms/SignInForm";
import { isJson } from "../helpers/helpers";
import DropZoneContainer from "./DropZoneContainer";

const App = () => {

  const apiUrl = (endpoint) => import.meta.env.VITE_API_URL_ENDPOINT + '/' + endpoint; 
  const bearerToken = localStorage.getItem('bearerToken');
  const [userLogged, setUserLogged] = useState((bearerToken !== null && typeof bearerToken !== 'undefined'));
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showDropzoneArea, setShowDropzoneArea] = useState(false);

  // get user notes
  const fetchNotes = () => {
    fetch(apiUrl('notes'), {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ bearerToken,
        },
      })
      .then(response => response.json())
      .then(data => {
        setNotes(data.data.map(item => {          
          return {...item, uuid: uuid()};
        }));
      })
  }

  // fetch notes if user logged in
  useEffect(() => {
    if (userLogged) {
      fetchNotes();
    }
  }, [userLogged]);

  // reset form errors
  useEffect(() => {
    if (!showLogin || !showSignIn) {
      setFormError('');
    }  
  }, [showLogin, showSignIn]);

  // add new note
  const addNewNoteHandler = async note => {

    // check if there is at least one note in x:0 y:0 position (image notes excluded)
    if (
        !note.hasOwnProperty('image') &&
        !notes.every(note => parseInt(note.coordinates.x) !== 0 && parseInt(note.coordinates.y) !== 0)
    ) {
      if (!confirm('There is a note in the upper left of board that may be hidden by the new note. Can you proceed anyway?')) {
        return false;
      }
    }
    
    if (userLogged) {

      try {
        const formData = new FormData();
        formData.append('text', note.content);
        formData.append('color_id', note.color);
        formData.append('position_x', note.coordinates.x);
        formData.append('position_y', note.coordinates.y);
        if (note.image) {
          formData.append('image', note.image);
        }

        const response = await fetch(apiUrl('notes'), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + bearerToken
            },
            body: formData
        });
        
        const data = await response.json();

        if (!response.ok) {
          if (data.hasOwnProperty('message')) {
            alert('Error :' + data.message);
          }
          throw new Error('Error ' + response.status);
        }

        note = data.data;

      } catch (error) {
        console.error(error);
      }
    } else {
      if (note.hasOwnProperty('image')) {
        note.image = note.image.preview;
      }
    }
    
    setNotes(prevNotes => {
      return [...prevNotes, {...note, uuid: uuid()}];
    });
  }

  // update note
  const updateNoteHandler = async noteData => {
    
    if (userLogged) {
      try {
        const response = await fetch(apiUrl('notes/'+ noteData.id), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ bearerToken,
            },
            body: JSON.stringify({
              text: noteData.content,
              color_id: noteData.color,
              position_x: noteData.coordinates.x,
              position_y: noteData.coordinates.y
            })
        });

        if (!response.ok) {
          const data = await response.json();
          if (data.hasOwnProperty('message')) {
            alert('Error :' + data.message);
          }
          throw new Error('Error ' + response.status);
        }

      } catch (error) {
        console.error(error);
      }
    }

    setNotes(prevNotes => {
      return prevNotes.map(note => {
        return (note.uuid === noteData.uuid) ? {...note, ...noteData} : note;
      })
    });
  }

  // delete note
  const deleteNoteHandler = async id => {
    
    if (userLogged) {
      try {
        const response = await fetch(apiUrl('notes/' + id), {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer '+ bearerToken,
            }
          });

        if (!response.ok) {
          const data = await response.json();
          if (data.hasOwnProperty('message')) {
            alert('Error :' + data.message);
          }
          throw new Error('Error ' + response.status);
        }

      } catch (error) {
        console.error(error);
      }
    }

    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    });
  }

  // open login form
  const openLoginHandler = event => {
    event.preventDefault();
    setShowLogin(true);
  }

  // open signin form
  const openSignInHandler = event => {
    event.preventDefault();
    setShowSignIn(true);
  }

  // close login form
  const closeLoginHandler = () => setShowLogin(false);
  // close signin form
  const closeSignInHandler = () => setShowSignIn(false);

  // function to handle user registration and login
  const authHandler = async (event, url, signIn = false) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.target);
    const body = {
        username: formData.get('username'),
        password: formData.get('password'),
    };
    
    if (signIn) {
        if (formData.get('password') !== formData.get('password_confirmation')) {
            setFormError('Error: Passwords don\'t match!');
            return false;
        }
        body.password_confirmation = formData.get('password_confirmation');
    }

    await fetch(url,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
      setSubmitting(false);
      if (isJson(response)) {
        return response.json();
      } else {
        throw new Error('Error ' + response.text());
      }
    })
    .then(data => {
        if (!data.hasOwnProperty('errors')) {
          localStorage.setItem('bearerToken', data.data.token);
          localStorage.setItem('stickynotes_user', data.data.user);
          setUserLogged(true);
          if (signIn) {
            setShowSignIn(false);
          } else {
            setShowLogin(false);
          }
          setFormError('');
        } else {
          setFormError(data.message);
        }
    })
    .catch(error => {
      console.log(error);
    });
  }

  // submit data for login
  const submitLoginHandler = async event => {
    authHandler(event, apiUrl('auth/login'));
  }

  // submit data for signin
  const submitSignInHandler = async event => {
    authHandler(event, apiUrl('auth/register'), true);
  }

  // user logout
  const logoutHandler = async event  => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl('auth/logout'), {
          method: 'POST',
          headers: {'Authorization': 'Bearer '+ bearerToken},
        });

      if (!response.ok) {
        throw new Error('Error ' + response.status);
      }

      localStorage.removeItem('bearerToken');
      localStorage.removeItem('stickynotes_user');
      setUserLogged(false);
      setNotes([]);

    } catch (error) {
      console.error(error);
    }
  }

  // select note
  const selectedNoteHandler = uuid => setSelectedNote(uuid);

  // deselect note if click outside
  const ref = useOutsideClick(() => setSelectedNote(0));

  // show dropzone area
  const showDropzoneAre = () => setShowDropzoneArea(true);

  // hide dropzone area
  const hideDropzoneAre = () => setShowDropzoneArea(false);

  return (
    <div id="app-wrapper">
      <header className="px-3 bg-dark">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><FontAwesomeIcon className="me-2" icon={faNoteSticky}/>StickyNotes</a>
            <span className="badge rounded-pill bg-light text-dark">v1.0</span>
            <AddNoteButton onAddNewNote={addNewNoteHandler} />
            {notes.length ? <small className="navbar-text"><span className="me-1">{notes.length}</span> notes found</small> : ''}
            <div id="auth-actions" className="ms-auto">
              <ul className="navbar-nav">
                    {userLogged ?
                    <>
                      <li className="navbar-text text-capitalize text-white me-4">
                      <FontAwesomeIcon className="me-2" icon={faUser} /> {localStorage.getItem('stickynotes_user')}
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link" onClick={logoutHandler}>
                          <FontAwesomeIcon className="me-1" icon={faArrowRightFromBracket} /> Logout
                        </a>
                      </li>
                    </>
                    :
                    <>
                      <li className="nav-item">
                        <a href="#" className="nav-link" onClick={openLoginHandler}>
                        <FontAwesomeIcon className="me-1" icon={faArrowRightToBracket} /> Login
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link" onClick={openSignInHandler}>
                          Register
                        </a>
                      </li>
                    </>
                    }
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main id="notes" onDragOver={showDropzoneAre} onDragLeave={hideDropzoneAre} onDrop={hideDropzoneAre}>
        <DropZoneContainer show={showDropzoneArea} onAddNewNote={addNewNoteHandler} />
        {notes.map((note, index) => (
          <Note
          ref={(element) => ref.current[index] = element}
          key={note.uuid}
          data={note}
          onSetSelectedNote={selectedNoteHandler}
          onDeleteNote={deleteNoteHandler}
          onUpdateNote={updateNoteHandler}
          isSelected={selectedNote === note.uuid}
          />
        ))}
      </main>
      <LoginForm show={showLogin} close={closeLoginHandler} error={formError} submit={submitLoginHandler} submitting={submitting} />
      <SignInForm show={showSignIn} close={closeSignInHandler} error={formError} submit={submitSignInHandler} submitting={submitting} />
    </div>
    )
}

export default App;