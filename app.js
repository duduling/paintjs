const canvas = document.getElementById('jsCanvas')

let painting = false

const stopPainting = () => {
    painting = false
}

const onMouseMove = e => {
    const { offsetX: x, offsetY: y } = e
}

const onMouseDown = () => {
    painting = true
}

const onMouseUp = () => {
    stopPainting()
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseleave', stopPainting)
}


