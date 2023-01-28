const canvas = document.getElementById('canvas')
const paint = canvas.getContext('2d')

const utils = {
	get: (x) => {return document.getElementById(x)},
	degToRad: (deg) => {return deg *Math.PI / 180},
	resize: (w=window.innerWidth, h=window.innerHeight) => {canvas.width = w; canvas.height=h},
	drawCustomRect: (x, y, w=20, h=20, fillColor="white", strokeColor="white", strokeW=1, fill=true, stroke=false) => {
		paint.beginPath()
		paint.fillStyle = fillColor
		paint.strokeStyle = strokeColor
		paint.lineWidth = strokeW
		if(fill){
		paint.fillRect(x, y, w, h)
		if(stroke){
			paint.stroke()
		}
		}
		paint.strokeRect(x, y, w, h)
    },
    drawCustomArc: (x, y, distFromRadius=50, start=0, end=360, counterclock=false, fillColor="white", strokeColor="white", strokeW, fill=false, stroke=true) => {
		paint.beginPath()
		paint.fillStyle = fillColor
		paint.strokeStyle = strokeColor
		paint.lineWidth = strokeW
		//arc takes in start and end angle in Radians not degrees
		let degToRad = utils.degToRad.bind(utils)
		paint.arc(x, y, distFromRadius, start, degToRad(end), counterclock)
		if(fill){
			paint.fill()
			if(stroke){
				paint.stroke()
			}
		}
		paint.stroke()
	},
	clear: (x=0, y=0, w=window.innerWidth, h=window.innerHeight) => {
	paint.clearRect(x, y, w, h)},}

export { utils }