var gPics = []
_FillgPics()
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function _FillgPics() {
    gPics = [
        { id: 1, url: 'img/1.jpg', keyword: 'happy' },
        { id: 2, url: 'img/2.jpg', keyword: 'tv' },
        { id: 3, url: 'img/3.jpg', keyword: 'tv' },
        { id: 4, url: 'img/4.jpg', keyword: 'funny' },
        { id: 5, url: 'img/5.jpg', keyword: 'funny' },
        { id: 6, url: 'img/6.jpg', keyword: 'funny' },
        { id: 7, url: 'img/7.jpg', keyword: 'happy' },
        { id: 8, url: 'img/8.jpg', keyword: 'funny' },
        { id: 9, url: 'img/9.jpg', keyword: 'tv' },
        { id: 10, url: 'img/10.jpg', keyword: 'tv' },
        { id: 11, url: 'img/11.jpg', keyword: 'tv' },
        { id: 12, url: 'img/12.jpg', keyword: 'happy' },
        { id: 13, url: 'img/13.jpg', keyword: 'happy' },
        { id: 14, url: 'img/14.jpg', keywords: 'happy' },
        { id: 15, url: 'img/15.jpg', keywords: 'happy' },
        { id: 16, url: 'img/16.jpg', keywords: 'happy' },
        { id: 17, url: 'img/17.jpg', keywords: 'happy' },
        { id: 18, url: 'img/18.jpg', keywords: 'happy' },
        // { id: 19, url: 'img/19.jpg', keywords: ['movies', 'wine'] },
        // { id: 20, url: 'img/20.jpg', keywords: ['matrix', 'movies'] },
        // { id: 21, url: 'img/21.jpg', keywords: ['tv'] },
        // { id: 22, url: 'img/22.jpg', keywords: ['tv', 'funny'] },
        // { id: 23, url: 'img/23.jpg', keywords: ['movies', 'xman'] },
        // { id: 24, url: 'img/24.jpg', keywords: ['politics', 'russia', 'putin'] },
        // { id: 25, url: 'img/25.jpg', keywords: ['movies', 'animation', 'toy story'] }
    ];
}
var gStickers = ['🌈', '👑', '🎁', '❤', '🚩', '💣', '💋', '✨', '🐱‍👓', '🤢', '👏', '🌹']
var gStartSticker = 0
var gEndSticker = 3

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
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
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
    console.log(ev.key);
    switch (ev.key) {
        case 'Backspace':
            gCurrText.text = gCurrText.text.substring(0, gCurrText.text.length - 1)
            break;
        case 'ArrowRight':
            gCurrText.pos.x++
            break;
        case 'ArrowLeft':
            gCurrText.pos.x--
            break;
        case 'ArrowUp':
            gCurrText.pos.y--
            break;
        case 'ArrowDown':
            gCurrText.pos.y++
            break;
        case 'Delete':
            onDeleteText()
            break;
        default:
            gCurrText.text += ev.key
    }

    renderCanvas()


}
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}