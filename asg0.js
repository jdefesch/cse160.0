var canvas = document.getElementById("example");
var ctx = canvas.getContext("2d");
if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
}

const drawVector = (v, color) => {
    ctx.beginPath();
    ctx.moveTo(200, 200); // Starting point
    ctx.lineTo(200 + (v.elements[0] * 20) , 200 - (v.elements[1] * 20)); // Ending point
    ctx.strokeStyle = color;
    ctx.lineWidth = 2; // Set the line width
    ctx.stroke();
}

const angleBetween = (v1, v2) => {
    let dot = Vector3.dot(v1, v2)
    console.log('Angle:', dot)
}

const areaTriangle = (v1, v2) => {
    let crossProduct = Vector3.cross(v1, v2);
    let area = 0.5 * crossProduct.magnitude(); // Half the magnitude of the cross product.
    console.log("Area of the triangle: " + area);
    return area;
}

const handleDrawEvent = () => {
    resetCanvas()
    let x1 = Number(document.getElementById('v1x').value)
    let y1 = Number(document.getElementById('v1y').value)
    let v1 = new Vector3([x1, y1, 0])

    let x2 = Number(document.getElementById('v2x').value)
    let y2 = Number(document.getElementById('v2y').value)
    let v2 = new Vector3([x2, y2, 0])

    drawVector(v1, 'red')
    drawVector(v2, 'blue')  
}

const handleDrawOperationEvent = () => {
    resetCanvas()
    let x1 = Number(document.getElementById('v1x').value)
    let y1 = Number(document.getElementById('v1y').value)
    let v1 = new Vector3([x1, y1, 0])

    let x2 = Number(document.getElementById('v2x').value)
    let y2 = Number(document.getElementById('v2y').value)
    let v2 = new Vector3([x2, y2, 0])

    drawVector(v1, 'red')
    drawVector(v2, 'blue') 

    let operation = document.getElementById("operation").value
    let scalar = Number(document.getElementById('scalar').value)
    let v3, v4 = null
    switch(operation){
        case 'add':
            v3 = new Vector3([x1, y1, 0]).add(v2)
            break
        case 'sub':
            v3 = new Vector3([x1, y1, 0]).sub(v2)
            break
        case 'multiply':
            v3 = new Vector3([x1, y1, 0]).mul(scalar)
            v4 = new Vector3([x2, y2, 0]).mul(scalar)
            break;
        case 'divide':
            v3 = new Vector3([x1, y1, 0]).div(scalar)
            v4 = new Vector3([x2, y2, 0]).div(scalar)
            break
        case 'magnitude':
            console.log('V1:', v1.magnitude())
            console.log('V2:', v2.magnitude())
            break
        case 'normalize':
            v1.normalize()
            v2.normalize()
            drawVector(v1, 'green')
            drawVector(v2, 'green')
            break
        case 'angle':
            angleBetween(v1, v2)
            break
        case 'area':
            areaTriangle(v1, v2)
            break
    }

    if (v3)
        drawVector(v3, 'green')
    if (v4)
        drawVector(v4, 'green')
}

const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1.0)"; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
}

function main() {
    resetCanvas()

    document.getElementById('draw')
        .addEventListener('click', handleDrawEvent)
    document.getElementById('draw-operation')
        .addEventListener('click', handleDrawOperationEvent)
        

}
