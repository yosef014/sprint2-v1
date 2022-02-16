var gCanvas;
var gCtx;
var gTexts = []
var gCurrText;
var isDrag = false
var gStartPos;
var gCurrImg


function init() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners()
    craetTextObj('press to edit text!', { x: 80, y: 50 })
    craetTextObj('press to edit text!', { x: 80, y: 350 })
    gTexts.forEach(text => { drawText(text.text, text.pos, text.size, text.font) });
    renderPics()
}




function craetTextObj(text, pos, size = 30, font = 'Arial') {
    gTexts.push({

        id: getRandomInt(1, 9999),
        text,
        pos,
        size,
        font
    })
}

function renderPics() {
    var elPicsArea = document.querySelector('.pics')
    var strHtml = ''
    var counter = 0
    gPics.forEach(pic => {
        strHtml += `<div class="pic pic${++counter}" onclick="drawImg(this)"><img src="${pic.url}"></div>`
    });
    elPicsArea.innerHTML = strHtml
}

function renderCanvas() {
    gCtx.save()
    // gCtx.fillStvyle = "aqua"
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);
    gTexts.forEach(text => { drawText(text.text, text.pos, text.size, text.font) });
    gCtx.restore()
    drawRect()

}


function drawText(text, pos, size, font) {
    var strFont = size + 'px' + ' ' + font
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = '#FFF';
    gCtx.font = strFont;
    gCtx.fillText(text, pos.x, pos.y);
    gCtx.strokeText(text, pos.x, pos.y);
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

function onMove(ev) {
    if (isDrag) {
        var evpPos = { x: ev.offsetX, y: ev.offsetY }
        const dx = evpPos.x - gStartPos.x
        const dy = evpPos.y - gStartPos.y
        gCurrText.pos.x += dx
        gCurrText.pos.y += dy
        gStartPos = evpPos
        renderCanvas()
    }
}

function onDown(ev) {

    var evpPos = { x: ev.offsetX, y: ev.offsetY } //get pos from ev clicked
    var idxClikedText = gTexts.findIndex(text =>
        evpPos.x >= text.pos.x && evpPos.x <= text.pos.x + gCtx.measureText(text.text).width &&
        evpPos.y + text.size >= text.pos.y && evpPos.y <= text.pos.y)
    gCurrText = gTexts[idxClikedText]
    renderCanvas()
    var textLengh = gCtx.measureText(gCurrText.text).width
    if (evpPos.x >= gCurrText.pos.x && evpPos.x <= gCurrText.pos.x + textLengh &&
        evpPos.y + gCurrText.size >= gCurrText.pos.y && evpPos.y <= gCurrText.pos.y) {
        isDrag = true
        gStartPos = evpPos
        document.body.style.cursor = 'grabbing'
    }


}
function drawRect() {
    var textLengh = gCtx.measureText(gCurrText.text).width
    gCtx.beginPath();
    gCtx.rect(gCurrText.pos.x, gCurrText.pos.y - gCurrText.size, textLengh, gCurrText.size);
    gCtx.fillStyle = '#ff80004d';
    gCtx.fillRect(gCurrText.pos.x, gCurrText.pos.y - gCurrText.size, textLengh, gCurrText.size);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onUp(ev) {
    isDrag = false
    document.body.style.cursor = 'grab'

}

function keyType(ev) {
    console.log(ev.key)
    if (ev.key === 'Backspace') {
        gCurrText.text = gCurrText.text.substring(0, gCurrText.text.length - 1)
        console.log(gCurrText.text.length)

    }
    else { gCurrText.text += ev.key }

    renderCanvas()


}

function incFontSize() {
    gCurrText.size++
    renderCanvas()
}
function decFontSize() {
    gCurrText.size--
    renderCanvas()
}

function onaddText() {
    craetTextObj('press to edit text!', { x: 80, y: getRandomInt(30, 350) })
    renderCanvas()


}

function drawImg(elImg) {
    elImg.querySelector('img').src
    var img = new Image();
    img.src = elImg.querySelector('img').src;
    gCurrImg = img
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        renderCanvas()
    };
    document.querySelector('.main-container').style.display = "none";
    document.querySelector('.canva-container').style.display = "block";

}

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