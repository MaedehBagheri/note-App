import NotesAPI from "./notesAPi.js";
import NotesView from "./notesView.js";


export default class App{
    constructor(root){
        this.notes=[];
        this.activNote =null;
this.view = new NotesView(root,this._handlers());
this._refreshNotes();
    }

    _refreshNotes(){
        const notes =NotesAPI.getAllNotes();
        this.notes =notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);

        this.activeNote =notes[0];
        this.view.updateActiveNote(notes[1]);
    }

    _handlers(){
        return{
           
    onNoteAdd:()=>{
        const newNote ={
            title :"new note",
            body :"take some note",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
    },
    onNoteEdit:(newTitle,newBody) =>{
       NotesAPI.saveNote({
           id:this.activeNote.id,
           title:newTitle,
           body:newBody,
       });
       this._refreshNotes();
    },
    onNoteSelect:(noteId) =>{
const selectedNote =this.notes.find((n) => n.id == noteId);
this.activeNote=selectedNote;
this.view.updateActiveNote(selectedNote);
    },


    onNoteDelete:(noteId)=>{
       NotesAPI.deleteNote(noteId);
       this._refreshNotes();
    }
}
        }
    }
