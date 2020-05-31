const canvas = document.getElementById('jsCanvas')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
const ctx = canvas.getContext('2d')

const INITIAL_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700

// Set the size of canvas
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

// Set the canvas backgroud, stroke color and stroke width
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR
ctx.lineWidth = 2.5

let painting = false
let filling = false

const stopPainting = () => {
    painting = false
}

const onMouseMove = e => {
    const { offsetX: x, offsetY: y } = e

    if (!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}

const startPainting = () => {
    painting = true
}

const onMouseUp = () => {
    stopPainting()
}

const handleColorClick = e => {
    const { target: { style: { backgroundColor: color } } } = e

    ctx.strokeStyle = color
    ctx.fillStyle = color
}

const handleRangeChange = e => {
    const { target: { value: size } } = e

    ctx.lineWidth = size
}

const handleCanvasClick = () => {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

const handleModeClick = () => {
    filling = !filling
    mode.innerText = filling ? 'Paint' : 'Fill'
}

const handleCM = e => {
    e.preventDefault()
}

const handleSaveClick = () => {
    const image = canvas.toDataURL()
    const link = document.createElement('a')

    link.href = image
    link.download = 'PaintJS[🖼]'
    link.click()
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM)
}


if (range) {
    range.addEventListener('input', handleRangeChange)
}

if (mode) {
    mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}

Array.from(colors).forEach(color => {
    color.addEventListener('click', handleColorClick)
})