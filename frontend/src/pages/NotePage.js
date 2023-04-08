import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {

    const navigate = useNavigate();

    let match = useMatch(
      "note/:id"
    );
    let noteId = match.params.id;

    let[note, setNote] = useState(null)

    useEffect(() => {
      getNote()
      // eslint-disable-next-line
    }, [noteId])

    let getNote = async ()=> {
      if (noteId === 'new') return
      let response = await fetch('/api/notes/'+noteId)
      let data = await response.json()
      setNote(data)
    }

    let updateNote = async () => {
      fetch('/api/notes/'+noteId+'/',{
        method:'PUT',
          headers: {
        'Content-Type': 'application/json'
        },
      body:JSON.stringify(note)
    })
    }

    let createNote = async () => {
      fetch('/api/notes/',{
        method:'POST',
          headers: {
        'Content-Type': 'application/json'
        },
      body:JSON.stringify(note)
    })
    }

    let deleteNote = async () => {
      fetch('/api/notes/'+noteId+'/',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
      })
      navigate('/', {replace: true})
      window.location.reload();
    }

    let handleSubmit = ()=>{
      if(noteId !== 'new' && note.body === ''){
        console.log('DELETED');
        deleteNote()
      }else if(noteId !== 'new'){
        console.log('UPDATED');
        updateNote()
        
      }else if(noteId === 'new' && note !== null){
        createNote()
        
      }  
      navigate('/', {replace: true})
      window.location.reload();
    }

  
  return (
    <div className='note'>
      <div className='note-header'>
      <h3>

        <ArrowLeft onClick={handleSubmit} />
        
        </h3>
        {noteId !== 'new' ? (
        <button onClick={deleteNote}>DELETE</button>
        ): (
        <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage;
