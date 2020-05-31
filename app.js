const canvas = document.getElementById('jsCanvas')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const ctx = canvas.getContext('2d')

const INITIAL_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700

ctx.strokeStyle = INITIAL_COLOR
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE
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

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
}


if (range) {
    range.addEventListener('input', handleRangeChange)
}

if (mode) {
    mode.addEventListener('click', handleModeClick)
}


Array.from(colors).forEach(color => {
    color.addEventListener('click', handleColorClick)
})