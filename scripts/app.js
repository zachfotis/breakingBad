
// Get all Characters
const getCharacters = async () => {
    const data = await axios.get('https://www.breakingbadapi.com/api/characters');
    clearCards();
    createCards(data.data);
}

const createCards = (data) => {
    console.log(data);
    
    let cardContainer = document.querySelector('.card-container');
    for (const character of data) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        let name = document.createElement('h2');
        let nickname = document.createElement('h2');

        img.src = character.img;
        img.alt = `Image of ${character.name}`
        name.innerHTML = character.name;
        name.classList.add('name')
        nickname.innerHTML = character.nickname;
        nickname.classList.add('nickname')
        div.classList.add('zero-opacity');
        div.classList.add('card');
        

        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(nickname)
        cardContainer.appendChild(div)
        setTimeout(() => {
            div.classList.remove('zero-opacity');
        },500)   
    }
    
    loadingCursor("end"); 
}

// Get all button
document.querySelector('#button-all').addEventListener('click', (e) => {
    e.preventDefault();
    loadingCursor("start");
    getCharacters();
})



// Get single Character

let searchButton = document.querySelector('#submit').addEventListener('click', async (e) => {
    e.preventDefault();
    loadingCursor("start");
    let query = document.querySelector('#query').value;
    if (query && query === "chris23"){
        const secretCard = [{
            img: "https://yt3.ggpht.com/ytc/AAUvwngPPrs2094ydpSLOi13qRFLlYc7GM8B_6sbEi9j=s900-c-k-c0x00ffffff-no-rj",
            name: "♥ Christina Moschidou",
            nickname: "The Scientist"
        }];
        clearCards();
        createCards(secretCard);
    }else{
        const data = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${query}`);
        clearCards();
        createCards(data.data);
    }

})

// Utilities

function loadingCursor(mode){
    if (mode === "start") {
        document.querySelector('body').classList.add('cursor-loading');
    }else if (mode === "end"){
        document.querySelector('body').classList.remove('cursor-loading');
    }
}

function clearCards(){
    let cards = document.querySelectorAll('.card');
    for (const card of cards) {
        card.remove();
    }
}