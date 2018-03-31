let canv = document.getElementById("canvas");
let clearBtn = document.getElementsByClassName("clear");
let eraserBtn = document.getElementsByClassName("eraser");
let ctx = canv.getContext("2d");
let isPainting = false;
let isEraser = false;
let lastPosition = {"x":undefined,"y":undefined};
canv.width = document.documentElement.clientWidth;
canv.height = document.documentElement.clientHeight;
canv.addEventListener("mousedown",function(e){	
	lastPosition = {"x":e.clientX,"y":e.clientY};
	if(isEraser){
		clearLine(lastPosition.x,lastPosition.y);
	}
	else{
		isPainting = true;
	}
},false)
canv.addEventListener("mousemove",function(e){
	let nowPoition = {"x":e.clientX,"y":e.clientY};
	if(isPainting){
		console.log("painting");
		drawLine(nowPoition.x,nowPoition.y,lastPosition.x,lastPosition.y);
	}else if(isEraser){
		console.log("eraser!")
		clearLine(nowPoition.x,nowPoition.y);
	}
	lastPosition = nowPoition;
},false)
canv.addEventListener("mouseup",function(e){
	isPainting = false;
	lastPosition.x = undefined;
	lastPosition.y = undefined;
},false)
eraserBtn.onclick = function(e){
	isEraser = true;
	e.target.classList.toggle("active");
}
clearBtn.onclick = function(e){
	ctx.clearRect(0,0,canv.width,canv.height);	
	e.target.classList.toggle("active");
}
// clearBtn.addEventListener("click",function(e){
// 	console.log(0);
// },false);
function drawLine(x1,y1,x0,y0){
	ctx.lineWidth = 3;
	ctx.strokeStyle = "green";
	ctx.beginPath();	
	ctx.moveTo(x0,y0);
	ctx.lineTo(x1,y1);
	ctx.closePath();
	ctx.stroke();
}
function clearLine(x,y){
    ctx.clearRect(x,y,10,10);
}
