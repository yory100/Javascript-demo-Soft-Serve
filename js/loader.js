
const contentToReplace = document.getElementById('content');
const homeA = document.getElementById('home');
const searchA = document.getElementById('search');
const searchinPut = document.getElementById('inputsearch');
const addNote = document.getElementById('add-note');
let url = 'http://localhost:3000/posts';


loadEventListeners();

// Load all event listeners

function loadEventListeners() {

    homeA.addEventListener('click', injectHtml)
    searchA.addEventListener('click', toogleClass)
    addNote.addEventListener('click', injectHtml)
    window.onkeyup = filterInput;
}

// Function injects different html depending of user request

function injectHtml(e) {

    e.preventDefault();

    const clickTarget = e.target.parentElement.id; 

    switch (clickTarget) {
        case 'home':
            fetchTextNotes();
            break;
        case 'add-note':
            addFormInput();
            break;
        default:
            fetchTextNotes();
            break;
    }

}

// Fetch and display Notes

function fetchTextNotes() {

    contentToReplace.innerHTML = '';

    getData(url)
        .then(data => {
            textNotes = data;
            for (const note of textNotes) {
                let title = note.title;
                let id = note.id;
                contentToReplace.innerHTML += `<div class="card" onclick="readTextNode('${id}')">
                                                <h4>${title}</h4>
                                                <a href="#" onclick="deleteTextNotes('${id}')" class="delete">
                                                    <svg id="i-close" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <path d="M2 30 L30 2 M30 30 L2 2" />
                                                    </svg> 
                                                </a>
                                            </div> `
            }

        })
        .catch(error => console.error(error));

}

// Display individual Notes

function readTextNode(id) {

    contentToReplace.innerHTML = '';

    getData(url)
        .then(data => {
            textNotes = data;
            for (const note of textNotes) {
                if (note.id == id) {
                    let title = note.title;
                    let message = note.message;
                    contentToReplace.innerHTML = `<div class="read-message">
                                                    <h4>${title}</h4>
                                                    <p>${message}</p>
                                                    <div class="lines"></div>
                                                 </div> `
                }

            }
        }).catch(error => console.error(error));
}


// Delete individual Notes

function deleteTextNotes(id) {

    let deleteUrl = url + '/' + id;
    for (const note of textNotes) {
        if (note.id == id) deleteData(deleteUrl)
                            .then(data => console.log(JSON.stringify(data)))
                            .then( () => fetchTextNotes() )
                            .catch(error => console.error(error));

    }

}

// Add new Notes

function saveTextNote(e) {

    e.preventDefault();

    let textTitle = document.getElementById('titleInput').value;
    let textMessage = document.getElementById('messageInput').value;

    let text = {
        title: textTitle,
        message: textMessage,
    }

    postData(url, text) 
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error(error));

}

// Replaces lens with search input

function toogleClass(e) {

    searchA.classList.toggle('invisible');
    searchinPut.classList.toggle('invisible');
    searchinPut.focus();

    //console.log( document.activeElement, searchinPut );

    if( document.activeElement !== searchinPut ) {
        searchinPut.value = '';
    }

}

// Search Notes

function filterInput(e) {

    e.preventDefault();

    let inputValue = e.target.value.toLowerCase();
    const elements = document.querySelectorAll('.card h4')

    Array.from(elements).forEach(elem => {
        const text = elem.textContent;

        if (text.toLowerCase().indexOf(inputValue) != -1) {
            elem.parentElement.style.display = 'block';
        } else {
            elem.parentElement.style.display = 'none';
        }
    })

}

// Add template form to the content id

function addFormInput() {

    contentToReplace.innerHTML = '';

    var tmpl = document.getElementById('input-form');
    contentToReplace.appendChild(tmpl.content.cloneNode(true));

}

// Get, POST and DELETE fetch methods

function postData(url = ``, data = {}) {

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

function getData(url = ``) {

    return fetch(url)
        .then(response => response.json());

}

function deleteData(url = ``) {

    return fetch(url, {
        method: "DELETE",
    })
    .then(response => response.json());

}

function putData(url = ``, data = {}) {

    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}
