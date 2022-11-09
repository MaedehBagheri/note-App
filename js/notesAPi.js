const notes =[
    
    {
    id:1,
    title:"first note",
    body:"some dummy text first",
    updated:"2021-10-31T15:02:00.411Z",
}
,    {
    id:2,
    title:"second note",
    body:"some dummy text first",
    updated:"2021-10-31T15:03:23.556Z",
},
{
    id:3,
    title:"third note",
    body:"some dummy text first",
    updated:"2021-11-31T15:03:23.556Z",  
},

];

export default class NotesAPI{
    static getAllNotes(){
        const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        return savedNotes.sort((a,b) => {
           return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
       }
       static saveNote(noteTosave){
        const notes =NotesAPI.getAllNotes();
        const existedNotes =notes.find((n) => n.id == noteTosave.id);
        
        if (existedNotes){
        existedNotes.title =noteTosave.title;
        existedNotes.body =noteTosave.body;
        existedNotes.updated = new Date().toISOString();
        
        }
        else {
            noteTosave.id =new Date().getTime();
            noteTosave.updated = new Date().toISOString();
            notes.push(noteTosave);
        }
        localStorage.setItem("notes-app",JSON.stringify(notes));
    }
        static deleteNote(id){
            const notes =NotesAPI.getAllNotes();
            const filteredNotes =notes.filter((n) => n.id != id);
            localStorage.setItem("notes-app" , JSON.stringify(filteredNotes));
    
    
};
}
      