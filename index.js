import { utils } from './utils.js'

const changeBtn = utils.get('changeShape')
const state = utils.get('state')
const clearBtn = utils.get('clear')
const colBtn = utils.get('collapse')
const settingsCog = utils.get('settingscog')
const settings = utils.get('settings')
const applySettingsBtn = utils.get('applySettings')
let isState = "Off"
let down, shape, collapse, settingsUp = false

let paintOnColor = "green"
let paintDownColor = "red"
let brushFill
let brushStroke

//actual tools, brushes
let brushFillColor = utils.get('brushFillColor')
let brushStrokeColor = utils.get('brushStrokeColor')

function handleNewSettings(){
	localStorage.setItem('canvasColor', canvasColor.value)
	utils.get('canvas').style.backgroundColor = canvasColor.value
	localStorage.setItem('brushFillColor', brushFillColor.value)
	brushFill = brushFillColor.value
	localStorage.setItem('brushStrokeColor', brushStrokeColor.value)
	brushStroke = brushStrokeColor.value
}


function handleInputDraw(handleE){
	if(settingsUp){
		return
	}else{
	if(down) {
		let ControlPanelx = colBtn.getBoundingClientRect().x
		let ControlPanely = colBtn.getBoundingClientRect().y
		let Settingsx = settingsCog.getBoundingClientRect().x
		let Settingsy = settingsCog.getBoundingClientRect().y
		// //scans for if clicking in a 25x25 space (collapse button) so it doenst register as drawing
		if(ControlPanelx < handleE.clientX && handleE.clientX < ControlPanelx + 25 && ControlPanely < handleE.clientY && handleE.clientY < ControlPanely + 200){
			console.log('clicking collapse button!')
		}else if(Settingsx < handleE.clientX && handleE.clientX < Settingsx + 45 && Settingsy < handleE.clientY && handleE.clientY < Settingsy + 45){
			console.log('clicking settings cog!')
		}else{
			if(shape){
				utils.drawCustomArc(handleE.clientX, handleE.clientY, ...Array(4), brushFill, brushStroke, true, true)
			}else{
				utils.drawCustomRect(handleE.clientX, handleE.clientY, ...Array(2), brushFill, brushStroke, true, true)
			}
		}
	}
  }
}

//on initial page load will use localstorage later
function initialActions(){
utils.resize()
brushStroke = "#FFFFFF"
if(localStorage.getItem('canvasColor')){
	utils.get('canvas').style.backgroundColor = localStorage.getItem('canvasColor')
	canvasColor.value = localStorage.getItem('canvasColor')
}else{
	utils.get('canvasColor').style.backgroundColor = "black"
	canvasColor.value = "black"
}
if(localStorage.getItem('brushFillColor')){
	brushFill = localStorage.getItem('brushFillColor')
	brushFillColor.value = localStorage.getItem('brushFillColor')
}else{
	brushFillColor.value = "#FFFFFF"
	brushFill = "#FFFFFF"
}
if(localStorage.getItem('brushStrokeColor')){
	brushStroke = localStorage.getItem('brushStrokeColor')
	brushStrokeColor.value = localStorage.getItem('brushStrokeColor')
}else{
	brushStrokeColor.value = "#FFFFFF"
	brushStroke = "#FFFFFF"
}
brushStrokeColor.value = "#FFFFFF"
//not using window.onload because it wont load with the page, but after, therefore slower
}

initialActions()

window.onresize = () => {
	utils.resize()
}

//paint is ON
window.onmousedown = ((e) => {
	if(settingsUp){
		isState = "Off"
	}else{
		isState = "On"
		state.style.backgroundColor = paintOnColor
	}
	down = true
	state.innerText = isState
	handleInputDraw(e)
})

//paint is OFF
window.onmouseup = (() => {
	down = false
	isState = "Off"
	state.innerText = isState
	state.style.backgroundColor = paintDownColor
})

window.onmousemove = ((e) => {
	if(!settingsUp){
		handleInputDraw(e)
	}
})

changeBtn.addEventListener('click', () => shape = !shape)

clearBtn.addEventListener('click', () => utils.clear())

settingscog.addEventListener('click', () => {
	isState = "Off"
 	settingsUp = !settingsUp
 	if(settingsUp){
		settings.classList.add('settingsStyle')
		//closing setting cog doesn't apply settings, just hides it
 	}else{
 		settings.classList.remove('settingsStyle')
 	}
})

applySettingsBtn.addEventListener('click', () => {
	settingsUp = !settingsUp
	handleNewSettings()
	if(settingsUp){
		settings.classList.add('settingsStyle')
 	}else{
 		settings.classList.remove('settingsStyle')
 	}
})

colBtn.addEventListener('click', () => {
	collapse = !collapse
	if(collapse){
		utils.get('control-panel').style.transform = 'translateX(-250px)'
		colBtn.innerText = '►'
		colBtn.style.transform = 'translateX(-200px)'
	}else{
		utils.get('control-panel').style.transform = 'translateX(0px)'
		colBtn.innerText = '◄'
		colBtn.style.transform = 'translateX(0px)'
	}
})

