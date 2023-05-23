// variables
const noteList = document.querySelector("#note-list");


// eventlisteners
eventlisteners();
function eventlisteners() {
  // form submission
  document.querySelector("#submit").addEventListener("click", newNote);

  // remove note
  document.querySelector("#note-list").addEventListener("click", removeNote);

  // get data from localstorage on loaded
  document.addEventListener("DOMContentLoaded", localStorageOnload);
}

// functions

// Adding new note to the list
function newNote(e) {
  e.preventDefault();
    const note = document.querySelector("#note").value;

  // access to the value
    if(note === ""){
        alert("Please Write Your Note❤❤")
    }else{   
    // create remove element
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "❌";
    removeBtn.classList = "remove-note";

    // create <li> tag
    const li = document.createElement("li");
    li.classList = "li";
    li.appendChild(document.createTextNode(note));

    // adding remove btn to the li
    li.appendChild(removeBtn);

    // adding li to the note-list
    noteList.appendChild(li);
    noteList.classList = "fahter";

    addNoteToLocalStorage(note);
  
    }
}

// remove Note from list
function removeNote(e) {
  if (e.target.classList.contains("remove-note")) {
    e.target.parentElement.remove();
  }

  // aslo remote the note from the Local Storage
  removeNoteLocalStorage(e.target.parentElement.textContent);
}

// adding note to the local storage
function addNoteToLocalStorage(note) {
  // get the notes from localStorage
  const notes = getNotesFromLocalStorage();

  // add new note to the notes array
  notes.push(note);

  // add new notes Array to the localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// get notes from localStorage
function getNotesFromLocalStorage() {
  let notes;

  // get previous notes from localStorage
  let getFromLS = localStorage.getItem("notes");
  if (getFromLS === null) {
    // if not exist create empty array
    notes = [];
  } else {
    // if exist convert to the array
    notes = JSON.parse(getFromLS);
  }

  return notes;
}

// get data from local storage on load
function localStorageOnload() {
  const notes = getNotesFromLocalStorage();

  // print each item of array
  notes.forEach(function (note) {
    // create remove element
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "❌";
    removeBtn.classList = "remove-note";

    // create <li> tag
    const li = document.createElement("li");
    li.classList = "li";
    li.appendChild(document.createTextNode(note));

    // adding remove btn to the li
    li.appendChild(removeBtn);
    noteList.classList = "fahter";


    // adding li to the note-list
    noteList.appendChild(li);
  });
}

// also Remove note from localStorage
function removeNoteLocalStorage(noteContent) {
  // delete X from the contetn
  const noteDelete = noteContent.substring(0, noteContent.length - 1);

  // get notes from localstorage
  const notesFromLS = getNotesFromLocalStorage();

  notesFromLS.forEach(function (note, index) {
    if (note === noteDelete) {
      notesFromLS.splice(index, 1);
    }
  });

  // set new array of notes to the local storage
  localStorage.setItem("notes", JSON.stringify(notesFromLS));
}
