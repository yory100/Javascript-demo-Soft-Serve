
const contentToReplace = document.getElementById( 'content' );
const homeA            = document.querySelector( '[href = home]' );
const aboutA           = document.querySelector( '[href = about]' );
const someShit         = document.querySelector( '[href = some-shit]' );

loadEventListeners();

function loadEventListeners() {

    homeA.addEventListener( 'click', injectHtml)
    aboutA.addEventListener( 'click', injectHtml)
    someShit.addEventListener( 'click', injectHtml)

}

function injectHtml(e) {

    const text = '/home.txt'
    contentToReplace.innerHTML = fileUrl;

    e.preventDefault();
}