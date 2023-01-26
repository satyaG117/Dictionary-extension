const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

async function mainHandler(e) {
    const text = window.getSelection().toString().trim();
    // if we have a valid word
    if (text.length > 0 && text.match(/^[a-zA-Z]+$/g)) {
        makeRequest(text);
    }
}


// make request to api
async function makeRequest(text) {
    try {
        const response = await fetch(DICTIONARY_API_URL + text);
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        if (data[0].word) {
            // called appendElement here because didn't want to handle another promise :(
            appendElement(data[0].word, data[0].meanings[0].definitions[0].definition);
        }
    } catch (err) {
        appendElement("Oops", err.message);
    }
}

// append element and add event listener
function appendElement(word, meaning) {
    const card = document.querySelector('.dcard');
    //if card exists then remove it from dom
    if (card) {
        card.remove();
    }
    document.body.innerHTML += `
    <div class="dcard">
        <div class="dhead">
            <span class="dtitle">${word}</span>
            <button class="close-btn">x</button>
        </div>
        <hr>
        <p class="body">${meaning}</p>
    </div>
    `
    //add event listener to close button
    const closeBtn = document.querySelector('.close-btn')

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Clicked');
            document.querySelector('.dcard').remove();
        });
    }
}



window.addEventListener('mouseup', mainHandler);