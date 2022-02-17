var gCanvas;
var gCtx;
var gTexts = []
var gCurrText;
var isDrag = false
var gStartPos;
var gCurrImg
var isNabOpen = false



function init() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners()
    craetTextObj('press to edit text!', { x: 60, y: 50 })
    craetTextObj('press to edit text!', { x: 60, y: 480 })
    _firstRender()
    renderPics()
    renderStickers()
}

function _firstRender() {
    gTexts.forEach(text => { drawText(text.text, text.pos, text.size, text.font) });
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
function renderStickers() {
    var elStickers = document.querySelector('.stickers')
    var strHtml = '<button onclick="onNextStickerClick(this)"> < </button>'
    for (var i = gStartSticker; i <= gEndSticker; i++) {
        strHtml += `<div class="sticker" onclick="onStickerClicked(this)">${gStickers[i]}</div>`
    }
    strHtml += '<button onclick="onNextStickerClick(this)"> > </button>'
    elStickers.innerHTML = strHtml
}

function renderCanvas() {
    gCtx.save()
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);
    gTexts.forEach(text => { drawText(text.text, text.pos, text.size, text.font, text.color) });
    gCtx.restore()
    drawRect()
}

function drawText(text, pos, size, font, color) {
    var strFont = size + 'px' + ' ' + font
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = '#FFF';
    gCtx.font = strFont;
    gCtx.fillText(text, pos.x, pos.y);
    gCtx.strokeText(text, pos.x, pos.y);
}

function onNextStickerClick(elNext) {
    if (elNext.innerText == '>') {
        gStartSticker++
        gEndSticker++
        if (!gStickers[gEndSticker]) {
            gStartSticker--
            gEndSticker--
        }

    } else {
        gStartSticker--
        gEndSticker--
        if (!gStickers[gStartSticker]) {
            gStartSticker++
            gEndSticker++
        }


    }
    renderStickers()


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
    gCtx.fillStyle = '#ff80000e';
    gCtx.fillRect(gCurrText.pos.x, gCurrText.pos.y - gCurrText.size, textLengh, gCurrText.size);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onUp(ev) {
    isDrag = false
    document.body.style.cursor = 'grab'

}

function incFontSize() {
    gCurrText.size++
    renderCanvas()
}
function decFontSize() {
    gCurrText.size--
    renderCanvas()
}
function InputColorChange(val) {
    gCurrText.color = val;
    renderCanvas()
}
function onSelectFont(elVal) {
    gCurrText.font = elVal
    renderCanvas()
}
function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'kaparaaaa'
}

function onaddText() {
    craetTextObj('press to edit text!', { x: 80, y: getRandomInt(30, 350) })
    renderCanvas()
}
function onChangeText() {
    var currIdx = gTexts.findIndex(text => text.id == gCurrText.id)
    gCurrText = gTexts[currIdx + 1]
    if (!gCurrText) gCurrText = gTexts[0]
    renderCanvas()

}
function onDeleteText() {
    var currIdx = gTexts.findIndex(text => text.id == gCurrText.id)
    gTexts.splice(currIdx, 1)
    renderCanvas()
}
function onStickerClicked(elSticker) {

    craetTextObj(elSticker.innerText, { x: 80, y: getRandomInt(30, 350) })
    renderCanvas()
}


// do upload
function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`,
            '_blank' // <- This is what makes it open in a new window.
        );

    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(img) {
    gCurrImg = img
    gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);

}

// end uplosf

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
    document.querySelector('.meme-generator').style.display = "flex";

}
function openMenu(hamburger) {
    var elNav = document.querySelector('.nav-bar')
    if (!isNabOpen) {
        elNav.style.display = "flex";

        hamburger.innerText = 'X'
    }
    else {
        elNav.style.display = "none";
        hamburger.innerText = '☰'
    }
    isNabOpen = !isNabOpen

}