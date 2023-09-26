const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clearButton");
const colorSwatches = document.querySelectorAll(".color-swatch");
const brushSizeSelect = document.getElementById("brushSize");
const pencilToolButton = document.getElementById("pencilTool");
const brushToolButton = document.getElementById("brushTool");
const eraserToolButton = document.getElementById("eraserTool");
const colorPicker = document.getElementById("colorPicker");
const saveButton = document.getElementById('saveButton');
let isDrawing = false;
let selectedTool = "pencil";

function startDrawing(event) {
 isDrawing = true;
 draw(event);
}

function draw(event) {
 if (!isDrawing) return;
 const x = event.clientX - canvas.offsetLeft;
 const y = event.clientY - canvas.offsetTop;
 ctx.lineTo(x, y);
 ctx.stroke();
}

function stopDrawing() {
 isDrawing = false;
 ctx.beginPath();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

clearButton.addEventListener("click", () => {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorSwatches.forEach((swatch) => {
 swatch.addEventListener("click", () => {
  const color = this.style.backgroundColor;
  ctx.strokeStyle = color;
 });
});

brushSizeSelect.addEventListener("change", () => {
 const brushSize = this.value;
 ctx.lineWidth = brushSize;
});


pencilToolButton.addEventListener("mousedown", () => {
 selectedTool = "pencil";
 ctx.globalCompositeOperation = "source-over";
});


brushToolButton.addEventListener("mousedown", () => {
 selectedTool = "brush";
 ctx.globalCompositeOperation = "multiply";
});

eraserToolButton.addEventListener("mousedown", () => {
 selectedTool = "eraser";
 ctx.globalCompositeOperation = "destination-out";
});

colorPicker.addEventListener("input", () => {
 const color = this.value;
 ctx.strokeStyle = color;
});

const link = document.createElement('a');
function saveCanvasAsImage() {
 const dataURL = canvas.toDataURL('image/png');
 link.href = dataURL;
 link.download = 'drawing.png';
 link.click();
}

saveButton.addEventListener("click", () => {
    saveCanvasAsImage();
});
