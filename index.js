const {
    createCanvas
} = require('canvas');
const fs = require('fs');
const settings = require('./cnfg.json')
const canvas = createCanvas(settings.dimensions.width, settings.dimensions.height)
let ctx = canvas.getContext('2d')
const hexRgb = require('hex-rgb');
let dots = [];

//generates the dot map
const xDensity = Math.ceil(settings.dimensions.width / settings.density)
const yDensity = Math.ceil(settings.dimensions.height / settings.density)
for (let x = 0; x < xDensity + 4; x++) {
    dots[x] = [];
    for (let y = 0; y < yDensity + 4; y++) {
        dots[x][y] = [Math.random() * settings.density * 0.9 + (x - 2) * settings.density, Math.random() * settings.density * 0.9 + (y - 2) * settings.density]
    }
}
//displays the dots
for (x in dots) {
    for (y in dots) {
        ctx.fillStyle = hexRgb(settings.colors[Math.round(Math.min((parseInt(x) + parseInt(y)) / (xDensity + yDensity) + Math.random() * settings.blend, 1) * (settings.colors.length - 1))], { format: 'css' });
        ctx.strokeStyle = ctx.fillStyle
        if (dots[parseInt(x)][parseInt(y) + 1] != undefined && dots[parseInt(x) + 1] != undefined) {
            ctx.beginPath();
            ctx.moveTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y) + 1][0], dots[parseInt(x)][parseInt(y) + 1][1]);
            ctx.lineTo(dots[parseInt(x) + 1][parseInt(y)][0], dots[parseInt(x) + 1][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.fill();
            //repeat for border
            ctx.beginPath();
            ctx.moveTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y) + 1][0], dots[parseInt(x)][parseInt(y) + 1][1]);
            ctx.lineTo(dots[parseInt(x) + 1][parseInt(y)][0], dots[parseInt(x) + 1][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.stroke();
        }
        if (dots[parseInt(x)][parseInt(y) - 1] != undefined && dots[parseInt(x) - 1] != undefined) {
            ctx.beginPath();
            ctx.moveTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y) - 1][0], dots[parseInt(x)][parseInt(y) - 1][1]);
            ctx.lineTo(dots[parseInt(x) - 1][parseInt(y)][0], dots[parseInt(x) - 1][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.fill();
            //repeat for border
            ctx.beginPath();
            ctx.moveTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y) - 1][0], dots[parseInt(x)][parseInt(y) - 1][1]);
            ctx.lineTo(dots[parseInt(x) - 1][parseInt(y)][0], dots[parseInt(x) - 1][parseInt(y)][1]);
            ctx.lineTo(dots[parseInt(x)][parseInt(y)][0], dots[parseInt(x)][parseInt(y)][1]);
            ctx.stroke();
        }
    }
}
//save image
const out = fs.createWriteStream(__dirname + `/out.png`)
const stream = canvas.createPNGStream()
stream.pipe(out)