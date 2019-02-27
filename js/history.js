
const contentToReplace = document.getElementById( 'content' );
const homeA            = document.getElementById( 'home' );
const searchA          = document.getElementById( 'search' );
const searchinPut      = document.getElementById( 'inputsearch' );
const addNote          = document.getElementById( 'add-note' );

loadEventListeners();

function loadEventListeners() {

    homeA.addEventListener( 'click', injectHtml)
    searchA.addEventListener( 'click', toogleClass)
    addNote.addEventListener( 'click', injectHtml)
    window.onkeyup = filterInput;
}

function injectHtml(e) {

    const clickTarget = e.target.parentElement.id;

    switch (clickTarget) {
        case 'home':
            fetchTextNotes();
            break;
        case 'add-note':
            contentToReplace.innerHTML = addButton;
            break;
        default:
            fetchTextNotes();
            break;
    }

    e.preventDefault();
}

function fetchTextNotes() {

    let textNotes     = JSON.parse( localStorage.getItem( 'textNotes' ) );
    const contentToReplace = document.getElementById( 'content' );

    contentToReplace.innerHTML = '';

    for (const note of textNotes) {

        let title  = note.title;
        let id     = note.id;

        contentToReplace.innerHTML += `<div class="card" onclick="readTextNode('${id}')">
                                            <h4>${title}</h4>
                                            <a href="#" onclick="deleteTextNotes('${id}')" class="delete">
                                                <svg id="i-close" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M2 30 L30 2 M30 30 L2 2" />
                                                </svg> 
                                            </a>
                                        </div> `
    }
        
}

function readTextNode( id ) {

    let textNotes     = JSON.parse( localStorage.getItem( 'textNotes' ) );

    for (const note of textNotes) {

        let index = textNotes.indexOf(note);
        if ( note.id == id ) {

            let title  = note.title;
            let message     = note.message;

            contentToReplace.innerHTML = `<div class="read-message">
                                            <h4>${title}</h4>
                                            <p>${message}</p>
                                         </div> `
        }

    }
}

function deleteTextNotes( id ) {

    let textNotes     = JSON.parse( localStorage.getItem( 'textNotes' ) );

    for (const note of textNotes) {

        let index = textNotes.indexOf(note);
        if ( note.id == id ) textNotes.splice(index, 1);

    }

    localStorage.setItem( 'textNotes', JSON.stringify( textNotes ) );

    fetchTextNotes();

}


document.getElementById( 'inpuText' ),addEventListener( 'submit', saveTextNote )

function saveTextNote( e ) {

    let textTitle   = document.getElementById( 'titleInput' ).value;
    let textMessage = document.getElementById( 'messageInput' ).value;
    let issueId     = chance.guid(); //chance.js plugin

    let text = {
        id: issueId,
        title: textTitle,
        message: textMessage,
    }


    if ( localStorage.getItem( 'textNotes' ) == null ) {

        let textNotes = [];
        textNotes.push( text );
        localStorage.setItem( 'textNotes', JSON.stringify( textNotes ) )
        
    }else {

        let textNotes = JSON.parse( localStorage.getItem( 'textNotes' ) );
        textNotes.push( text );
        localStorage.setItem( 'textNotes', JSON.stringify( textNotes ) )

    }

    fetchTextNotes();

    e.preventDefault();

}

function toogleClass() {

    searchA.classList.toggle( 'invisible' );
    searchinPut.classList.toggle( 'invisible' );
    
}

function filterInput(e) {

    let inputValue = e.target.value.toLowerCase();
    const elements = document.querySelectorAll('.card h4')

    Array.from( elements ).forEach( elem => {
        const text = elem.textContent;

        if ( text.toLowerCase().indexOf(inputValue) != -1 ) {
            elem.parentElement.style.display = 'block';
        }else {
            elem.parentElement.style.display = 'none';
        }
    } )

    // if()
    

    e.preventDefault();

}


let addButton = ` <form id="inpuText">
                        <input type="text" id="titleInput" class="u-full-width">
                        <textarea name="message" id="messageInput" class="u-full-width"></textarea>
                        <button type="submit">
                            <svg id="i-folder" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M2 26 L30 26 30 7 14 7 10 4 2 4 Z M30 12 L2 12" />
                            </svg>
                        </button>
                   </form>`