//1 "赋值canvas元素的HTML宽度和高度以设备宽度和设备高度"
let canvEle = document.querySelector("#canvas");
let eraserBtn = document.querySelector(".btns .eraser");
let clearBtn = document.querySelector(".btns .clear")
canvEle.width = document.documentElement.clientWidth;
canvEle.height = document.documentElement.clientHeight;
//1 刷新页面看效果，符合预期，继续往下

//1 "实现在canvas画布元素上画线"
//1 先获取到画布的2D渲染上下文，再设置好线的颜色和粗度
let ctx = canvEle.getContext("2d");
ctx.lineWidth = 3;
ctx.strokeStyle = "green";
//1 绑定事件处理函数，当什么时候，执行画线怎么画
//1 当鼠标点击画布上然后按着鼠标在画布上移动时开始画线，当鼠标抬起时停止绘画
let oldPosition = {"x":undefined,"y":undefined};//2
let newPosition = {"x":undefined,"y":undefined};//2
let isDown = false; //3
let isPainting; //4
let isEraser = false;
canvEle.onmousedown = function(e){
	setCoordinate(oldPosition,e)//2
    isDown = true; //3
    isPainting = true;
	// console.log("oldPosition:",oldPosition);//2 刷新页面，确认代码效果:oldPosition: {x: 82, y: 90}符合预期，继续走
}
//2 我获得了第一个moveTo的坐标，然后需要第一个lineTo的坐标、在鼠标按下后鼠标移动时获取
//3
canvEle.onmousemove = function(e){//3
	if(isDown){//3
		if(isPainting){//4
			if(isEraser){
				ctx.clearRect(e.clientX-5,e.clientY-5,10,10);
			}else{
				setCoordinate(newPosition,e);//3
				// console.log("newPosition:",newPosition);
				//3获得了(第一个)起点和终点，开始画线，调用画线函数	
				drawLine(newPosition.x,newPosition.y,oldPosition.x,oldPosition.y); //3 注意每次鼠标轻微移动都会进入此事件处理函数
				setCoordinate(oldPosition,e);
				//3 刷新页面，效果有bug：松开不按下鼠标着移动鼠标也在画线、画线无法停止。
				//我们需要加上mouseup事件处理函数
			}
			
		}
	}	
}
//4
canvEle.onmouseup = function(e){
	isPainting = false; //4 刷新页面
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

//1 怎么画线？用moveTo和lineTo方法。怎么确定moveTo的点坐标和lineTo的点坐标？鼠标按下事件触发时记录此时坐标为
//1 moveTo第一个坐标,鼠标移动事件触发时记录此时坐标为lineTo第一个坐标，画这两个坐标连线，画好之后把前面的
//1 终点坐标作为下一条线的起点坐标，下一条线的终点坐标等于mousemove事件再次触发时记录的坐标。那么画线函数需要
//1 四个数，它们分别是：x1,y1,x0,y0
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

