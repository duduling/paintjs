const canvas = document.getElementById('jsCanvas')
const colors = document.getElementsByClassName('jsColor')
const ctx = canvas.getContext('2d')

ctx.strokeStyle = '#2c2c2c'
ctx.lineWidth = 2.5

let painting = false

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
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
}

Array.from(colors).forEach(color => {
    color.addEventListener('click', handleColorClick)
})