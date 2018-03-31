let canvEle = document.querySelector("#canvas");
let eraserBtn = document.querySelector(".btns .eraser");
let clearBtn = document.querySelector(".btns .clear");
let ctx = canvEle.getContext("2d");
canvEle.width = document.documentElement.clientWidth;
canvEle.height = document.documentElement.clientHeight;
ctx.lineWidth = 3;
ctx.strokeStyle = "green";
let oldPosition = {"x":undefined,"y":undefined};
let newPosition = {"x":undefined,"y":undefined};
let isDown = false; 
let isPainting; 
let isEraser = false;
canvEle.onmousedown = function(e){
	setCoordinate(oldPosition,e)
    isDown = true; 
    isPainting = true;	
}
canvEle.onmousemove = function(e){
	if(isDown){
		if(isPainting){
			if(isEraser){
				ctx.clearRect(e.clientX-5,e.clientY-5,10,10);
			}else{
				setCoordinate(newPosition,e);
				drawLine(newPosition.x,newPosition.y,oldPosition.x,oldPosition.y); 
				setCoordinate(oldPosition,e);
			}
			
		}
	}	
}
canvEle.onmouseup = function(e){
	isPainting = false; 
	isEraser = false;
	oldPosition.x = undefined;
	oldPosition.y = undefined;
}

clearBtn.onclick = function(){
	ctx.clearRect(0,0,canvEle.width,canvEle.height);	
}

eraserBtn.onclick = function(){
	isEraser = !isEraser;
}
function drawLine(x1,y1,x0,y0){
	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x1,y1);
	ctx.closePath();
	ctx.stroke();
}
function setCoordinate(obj,event){
	obj.x = event.clientX;
	obj.y = event.clientY;
}






















// let canv = document.getElementById("canvas");
// let clearBtn = document.getElementsByClassName("clear")[0];
// let eraserBtn = document.getElementsByClassName("eraser")[0];
// let ctx = canv.getContext("2d");
// let isPainting = false;
// let isEraser = false;
// let isClear = false;
// let lastPosition = {"x":undefined,"y":undefined};
// canv.width = document.documentElement.clientWidth;
// canv.height = document.documentElement.clientHeight;
// canv.onmousedown = function(e){
// 	clearBtn.classList.remove("active");
// 	lastPosition = {"x":e.clientX,"y":e.clientY};
// 	if(isEraser){
// 		clearLine(lastPosition.x,lastPosition.y);
// 	}
// 	else{
// 		isPainting = true;
// 	}
// 	canv.onmousemove = function(e){
// 		let nowPoition = {"x":e.clientX,"y":e.clientY};
// 		if(isPainting){
// 			drawLine(nowPoition.x,nowPoition.y,lastPosition.x,lastPosition.y);
// 		}else if(isEraser){
// 			clearLine(nowPoition.x,nowPoition.y);
// 		}
// 		lastPosition = nowPoition;
// 	}
// }
// canv.onmouseup = function(){
// 	isPainting = false;
// 	lastPosition.x = undefined;
// 	lastPosition.y = undefined;
// }
// eraserBtn.onclick = function(e){
// 	clearBtn.classList.remove("active");
// 	if(!isEraser){
// 		e.currentTarget.classList.add("active");
// 	}
// 	else{
// 		e.currentTarget.classList.remove("active");
// 	}	
// 	isEraser = !isEraser;	
// }
// clearBtn.onclick = function(e){
// 	eraserBtn.classList.remove("active");
// 	isEraser = false;
// 	isClear = !isClear;	
// 	if(isClear){			
// 	    e.currentTarget.classList.add("active");
// 		ctx.clearRect(0,0,canv.width,canv.height);
// 	}
// 	isClear = !isClear;	
// }
// // clearBtn.addEventListener("click",function(e){
// // 	console.log(0);
// // },false);
// function drawLine(x1,y1,x0,y0){
// 	ctx.lineWidth = 3;
// 	ctx.strokeStyle = "green";
// 	ctx.beginPath();	
// 	ctx.moveTo(x0,y0);
// 	ctx.lineTo(x1,y1);
// 	ctx.closePath();
// 	ctx.stroke();
// }
// function clearLine(x,y){
//     ctx.clearRect(x,y,10,10);
// }

