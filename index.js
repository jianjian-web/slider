var imgData = '[' +
	'{"i":0,"img":"./images/1.jpg"},' +
	'{"i":1,"img":"./images/2.jpg"},' +
	'{"i":2,"img":"./images/3.jpg"},' +
	'{"i":3,"img":"./images/4.jpg"},' +
	'{"i":4,"img":"./images/5.jpg"}' +
	']';
var imgs = JSON.parse(imgData);
window.$ = HTMLElement.prototype.$ = function (selector) {
	return (this == window ? document : this).querySelectorAll(selector);
}
var silde = {
	ulImgs: null, //轮播的ul元素
	ulIndexes: null, //轮播的下标元素
	length: null, //图片的总个数
	WAIT: 3000, //自动轮播的等待时间
	timer: null, //当前定时器序号
	nowIndex: 0, //当前序号
	init: function () {
		this.length = imgs.length;
		this.ulImgs = $("#imgs")[0];
		this.ulIndexes = $("#sildeIndex")[0];
		this.initImages();
		this.initIndexes();
		this.arrowsClick();
	},
	initImages: function () { //渲染图片dom
		for (var i = 0; i < this.length; i++) {
			imgs[i] = ` <li data-index=${imgs[i].i}><a href="#"><img src=${imgs[i].img}></a></li>`
		}
		this.ulImgs.innerHTML = imgs.join("");
		this.ulImgs.$("li")[0].className = "show"; //默认显示第一张
		this.ulImgs.onmouseenter = function () { //当鼠标移入时清除定时器
			this.cleanTimer();
		}.bind(this);
		this.ulImgs.onmouseleave = function () { //当鼠标移开时重新计时
			this.autoMove();
		}.bind(this);
	},
	initIndexes: function () { //渲染下标
		for (var i = 0, indexes = []; i < this.length; i++) {
			indexes[i] = `<span data-index=${i}></span>`;
		}
		this.ulIndexes.innerHTML = indexes.join("");
		this.ulIndexes.$("span")[0].className = "index_hover";
		this.ulIndexes.onmouseover = function () {//鼠标移入下标时切换图片
			var e = window.event || arguments[0];
			silde.move(e);
		}.bind(this)
	},
	move: function (e) {
		e = e.target;
		var index = parseInt(e.getAttribute("data-index"));
		if (e.nodeName == "SPAN") {
			this.toggle(index);
			this.nowIndex = index;
		}
	},
	toggle: function (index) {
		this.restartTimer();
		this.ulIndexes.$("[class='index_hover']")[0].className = '';
		this.ulIndexes.$("span")[index].className = "index_hover";
		this.ulImgs.$("li[class='show']")[0].className = '';
		this.ulImgs.$("li")[index].className = "show";
	},
	autoMove: function () {
		this.timer = setInterval(function () {
			this.nowIndex++;
			if (this.nowIndex >= this.length) {
				this.nowIndex = 0
			}
			this.toggle(this.nowIndex);
		}.bind(this), this.WAIT);
	},
	cleanTimer: function () {
		clearInterval(this.timer);
	},
	restartTimer: function () {//重新计时
		this.cleanTimer();
		this.autoMove();
	},
	arrowsClick: function () { //左右箭头切换
		var _this = this;
		$("#silde")[0].onclick = function () {
			var e = window.event || arguments[0];
			if (e.target.nodeName === "A") {
				var index = parseInt(e.target.getAttribute("data-index"));
				_this.nowIndex += index;
				if (_this.nowIndex >= _this.length) {
					_this.nowIndex = 0
				} else if (_this.nowIndex < 0) {
					// console.log(_this.length)
					_this.nowIndex = _this.length - 1;
				}
				_this.toggle(_this.nowIndex);
			}
		}
	}

}

window.onload = function () {
	silde.init();
	silde.autoMove();
}


