const textArea=document.querySelector("#t1");
const container=document.querySelector(".d1");


function autoResize(){
    textArea.style.height="auto";
    textArea.style.height=textArea.scrollHeight+"px";
}
textArea.addEventListener("focus",()=>{
    textArea.style.padding="20px";
})
textArea.addEventListener("blur",()=>{
    textArea.style.padding="8px";
})
textArea.addEventListener("input",autoResize);
textArea.addEventListener("keydown",event=>{if (event.key==="Enter") {
    event.preventDefault();
    addNote();
    textArea.value='';
    autoResize();
}});
const notesContainer=document.querySelector(".container")
function addNote(){
    const note=textArea.value.trim();
    if(note){
    const noteBoxes=document.createElement("div");
    noteBoxes.textContent=note;
    noteBoxes.classList.add("d2");
    notesContainer.appendChild(noteBoxes);
    storeNotes(note);
    }
}
function storeNotes(note){
    if(note){
    let notes =JSON.parse(localStorage.getItem('notes'))||[];
    notes.push(note);
    localStorage.setItem('notes',JSON.stringify(notes));
    notes=JSON.parse(localStorage.getItem('notes'));
    }
}
window.addEventListener('load',()=>{
    const storedNotes=JSON.parse(localStorage.getItem('notes'))||[];
    storedNotes.forEach(note => {
        if (note) {
            const noteBoxes=document.createElement('div');
            noteBoxes.classList.add("d2");
            noteBoxes.textContent=note;
            notesContainer.appendChild(noteBoxes);
            clickEvent(noteBoxes);
        }
        
    });
})
function clickEvent(div){
    div.addEventListener("click",()=>{
        let tick = div.querySelector(".tick");
        if(!tick){
        tick = document.createElement("div");
        tick.classList.add("tick");
        tick.textContent="✓";
        div.appendChild(tick);
        addDelete();
        }
        if (tick.style.display === "none" || !tick.style.display) {
            tick.style.display = "block";
            div.style.border="3px solid white";
        } else {
            tick.style.display = "none";
            div.style.border="1px solid white";
        }
    })
};
const deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path></svg>';

const allNotes=document.querySelectorAll(".d2");
allNotes.forEach(div=>clickEvent(div));
function addDelete(div) {
    // Convert the SVG string to an element
    const deleteIconContainer = document.createElement('div');
    deleteIconContainer.innerHTML = deleteIcon;
    const deleteIconElement = deleteIconContainer.firstChild;

    // Append the SVG element to the div
    div.appendChild(deleteIconElement);
    
    // Toggle the display and border
    if (deleteIconElement.style.display === "none" || !deleteIconElement.style.display) {
        deleteIconElement.style.display = "block";
        div.style.border = "3px solid white";
    } else {
        deleteIconElement.style.display = "none";
        div.style.border = "1px solid white";
    }
}
