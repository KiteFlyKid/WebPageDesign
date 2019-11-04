window.onload=function(){
    var btn  =document.getElementById("btn");
    var reset=document.getElementById("reset");
    var top  =document.getElementById("talk");
    var close=document.getElementById("close");
    var btn2 =document.getElementById("btn2");
    var btn3 =document.getElementById("btn3");
    var userName =document.getElementById("username");
    var conTent =document.getElementById("content");
    
    btn.onclick=function(){
        reset.style.display = "block";
    };
   
	//关闭弹出页
    close.onclick = function(){
        reset.style.display="none";
    };
	// 取消发布
	btn3.onclick = function(){
		reset.style.display = "none";
	};
    //发布           
    btn2.onclick = function() {   	
		var _username = username.value;
		var _content  = content.value;
		
		if (_username == '') {
			alert('请输入您的姓名');
			return;
		}
		if (_content == '') {
			alert('请输入您的留言');
			return;
		}
		var sensitiveWords = ['你好', '好不好', '不好'];
		sensitiveWords.forEach(function (v) {
				while(_content.indexOf(v) !== -1) {
					_content = _content.replace(v, '***');
				}
			});
		//限制字数为150
		function LimitNumber(txt) {
		    var str = txt;
		    str = str.substr(0,150);
		    _content.innerText=str;
		}
		if (_content.length>150){
			alert("您输入超出限制");	
			LimitNumber();
		}
		var uls   = document.getElementById('uls');
		var newLi = document.createElement('li');
		newLi.innerHTML = '<div class="username">' + _username + '</div><a href="javascript:;" class="delet">X</a><p>' + _content + '</p>';
		uls.appendChild(newLi);
		userName.value = '';
		conTent.value = '';
	    reset.style.display="none";
	};
	// 拖拽
	top.onmousedown = function (ev) {
		var maxLeft = document.documentElement.clientWidth - reset.offsetWidth;
		var maxTop  = document.documentElement.clientHeight - reset.offsetHeight;
		var e = ev || window.event;
		var X = e.clientX - reset.offsetLeft;
		var Y = e.clientY - reset.offsetTop;
		
		//只针对IE浏览器
		if(reset.setCapture) {
			reset.setCapture();
		}
		document.onmousemove = function (ev) {
			var e = ev || window.event;
			
			var left = e.clientX - X;
			var top = e.clientY - Y;
			
			//限定范围
			if(left < 0){
				left = 0;
			}
			if(top < 0){
				top = 0;
			}
			if(top> maxTop ){
				top = maxTop;
			}
			if(left > maxLeft ){
				left = maxLeft;
			}
			reset.style.left = left + 'px';
			reset.style.top = top + 'px';
		};
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
			//取消捕获事件
			if(reset.releaseCapture){
				reset.releaseCapture();
			}
		};
	};
};
var uls = document.getElementById('uls');

uls.onclick = function (ev) {
	var e = ev || window.event;
	var o = e.srcElement || e.target;
	if(o.nodeName === "A") {
		uls.removeChild( o.parentNode );
	}
};







//锁定滚动条
ontext = canvas.getContext('2d');
function unScroll() {
	var top = $(document).scrollTop();
	$(document).on('scroll.unable', function (e) {
		$(document).scrollTop(top);
	})
};
//打开滚动条
function removeUnScroll() {
	$(document).unbind("scroll.unable");
};

$('btn').onclick = function () {
	unScroll();
};
$('close').onclick = function () {
	removeUnScroll();
	Popup.show();
};
$('btn3').onclick = function () {
	removeUnScroll();
	Popup.show();
};



const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8,
	STAR_SIZE = 3,
	STAR_MIN_SCALE = 0.2,
	OVERFLOW_THRESHOLD = 50;

const canvas = document.querySelector('canvas'),
	c
let scale = 1, // device pixel ratio
	width,
	height;

let stars = [];

let pointerX,
	pointerY;

let velocity = {
	x: 0,
	y: 0,
	tx: 0,
	ty: 0,
	z: 0.0005
};

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {

	for (let i = 0; i < STAR_COUNT; i++) {
		stars.push({
			x: 0,
			y: 0,
			z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
		});
	}

}

function placeStar(star) {

	star.x = Math.random() * width;
	star.y = Math.random() * height;

}

function recycleStar(star) {

	let direction = 'z';

	let vx = Math.abs(velocity.x),
		vy = Math.abs(velocity.y);

	if (vx > 1 || vy > 1) {
		let axis;

		if (vx > vy) {
			axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
		} else {
			axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
		}

		if (axis === 'h') {
			direction = velocity.x > 0 ? 'l' : 'r';
		} else {
			direction = velocity.y > 0 ? 't' : 'b';
		}
	}

	star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

	if (direction === 'z') {
		star.z = 0.1;
		star.x = Math.random() * width;
		star.y = Math.random() * height;
	} else if (direction === 'l') {
		star.x = -OVERFLOW_THRESHOLD;
		star.y = height * Math.random();
	} else if (direction === 'r') {
		star.x = width + OVERFLOW_THRESHOLD;
		star.y = height * Math.random();
	} else if (direction === 't') {
		star.x = width * Math.random();
		star.y = -OVERFLOW_THRESHOLD;
	} else if (direction === 'b') {
		star.x = width * Math.random();
		star.y = height + OVERFLOW_THRESHOLD;
	}

}

function resize() {

	scale = window.devicePixelRatio || 1;

	width = window.innerWidth * scale;
	height = window.innerHeight * scale;

	canvas.width = width;
	canvas.height = height;

	stars.forEach(placeStar);

}

function step() {

	context.clearRect(0, 0, width, height);

	update();
	render();

	requestAnimationFrame(step);

}

function update() {

	velocity.tx *= 0.96;
	velocity.ty *= 0.96;

	velocity.x += (velocity.tx - velocity.x) * 0.8;
	velocity.y += (velocity.ty - velocity.y) * 0.8;

	stars.forEach((star) => {

		star.x += velocity.x * star.z;
		star.y += velocity.y * star.z;

		star.x += (star.x - width / 2) * velocity.z * star.z;
		star.y += (star.y - height / 2) * velocity.z * star.z;
		star.z += velocity.z;

		// recycle when out of bounds
		if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -
			OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
			recycleStar(star);
		}

	});

}

function render() {

	stars.forEach((star) => {

		context.beginPath();
		context.lineCap = 'round';
		context.lineWidth = STAR_SIZE * star.z * scale;
		context.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.5 * Math.random()) + ')';

		context.beginPath();
		context.moveTo(star.x, star.y);

		var tailX = velocity.x * 2,
			tailY = velocity.y * 2;

		// stroke() wont work on an invisible line
		if (Math.abs(tailX) < 0.1) tailX = 0.5;
		if (Math.abs(tailY) < 0.1) tailY = 0.5;

		context.lineTo(star.x + tailX, star.y + tailY);

		context.stroke();

	});

}

function movePointer(x, y) {

	if (typeof pointerX === 'number' && typeof pointerY === 'number') {

		let ox = x - pointerX,
			oy = y - pointerY;

		velocity.tx = velocity.tx + (ox / 8 * scale) * (touchInput ? 1 : -1);
		velocity.ty = velocity.ty + (oy / 8 * scale) * (touchInput ? 1 : -1);

	}

	pointerX = x;
	pointerY = y;

}

function onMouseMove(event) {

	touchInput = false;

	movePointer(event.clientX, event.clientY);

}

function onTouchMove(event) {

	touchInput = true;

	movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

	event.preventDefault();

}

function onMouseLeave() {

	pointerX = null;
	pointerY = null;

}
$('button').click(function(){
$('button').toggleClass('active');
$('.title').toggleClass('active');
$('nav').toggleClass('active');
});


	