var gPics = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy', 'mountain', 'blond'] },
    { id: 2, url: 'img/2.jpg', keywords: ['trump', 'politics', 'usa'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animals', 'dogs', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['baby', 'funny', 'succes'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'dogs', 'funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['animals', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy', 'hat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'baby'] },
    { id: 9, url: 'img/9.jpg', keywords: ['tv'] },
    { id: 10, url: 'img/10.jpg', keywords: ['tv'] },
    { id: 11, url: 'img/11.jpg', keywords: ['tv'] },
    { id: 12, url: 'img/12.jpg', keywords: ['movies'] },
    { id: 13, url: 'img/13.jpg', keywords: ['succes', 'funny', 'baby'] },
    // { id: 14, url: 'img/14.jpg', keywords: ['trump', 'politics', 'usa'] },
    // { id: 15, url: 'img/15.jpg', keywords: ['happy', 'baby'] },
    // { id: 16, url: 'img/16.jpg', keywords: ['funny', 'animals', 'dogs'] },
    // { id: 17, url: 'img/17.jpg', keywords: ['obama', 'politics', 'usa'] },
    // { id: 18, url: 'img/18.jpg', keywords: ['sport', 'kiss'] },
    // { id: 19, url: 'img/19.jpg', keywords: ['movies', 'wine'] },
    // { id: 20, url: 'img/20.jpg', keywords: ['matrix', 'movies'] },
    // { id: 21, url: 'img/21.jpg', keywords: ['tv'] },
    // { id: 22, url: 'img/22.jpg', keywords: ['tv', 'funny'] },
    // { id: 23, url: 'img/23.jpg', keywords: ['movies', 'xman'] },
    // { id: 24, url: 'img/24.jpg', keywords: ['politics', 'russia', 'putin'] },
    // { id: 25, url: 'img/25.jpg', keywords: ['movies', 'animation', 'toy story'] }
];

var gStickers =['🌈','👑','🎁','❤','🚩','💣','💋','✨','🐱‍👓','🤢','👏','🌹']
var gStartSticker =0
var gEndSticker =3

function craetTextObj(text, pos, size = 50, font = 'Arial') {
    gTexts.push({

        id: getRandomInt(1, 9999),
        text,
        pos,
        size,
        font,
        color: 'black'
    })
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
}
function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
    document.addEventListener('keydown', keyType, false)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function keyType(ev) {
    if (ev.key === 'Backspace') {
        gCurrText.text = gCurrText.text.substring(0, gCurrText.text.length - 1)
    }
    else { gCurrText.text += ev.key }
    renderCanvas()


}