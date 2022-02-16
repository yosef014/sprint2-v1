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

function renderCanvas() {
    gCtx.save()
    gCtx.fillStvyle = "aqua"
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gTexts.forEach(text => { drawText(text.text, text.pos, text.size, text.font) });
    gCtx.restore()
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
    var textLengh = gCtx.measureText(gTexts[0].text).width
    var idxClikedText = gTexts.findIndex(text =>
        evpPos.x >= text.pos.x && evpPos.x <= text.pos.x + textLengh &&
        evpPos.y + text.size >= text.pos.y && evpPos.y <= text.pos.y)
    gCurrText = gTexts[idxClikedText]

    if (evpPos.x >= gCurrText.pos.x && evpPos.x <= gCurrText.pos.x + textLengh &&
        evpPos.y + gCurrText.size >= gCurrText.pos.y && evpPos.y <= gCurrText.pos.y) {
        isDrag = true
        gStartPos = evpPos
        document.body.style.cursor = 'grabbing'
    }


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
