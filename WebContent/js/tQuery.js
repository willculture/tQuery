/**
 * tQuery是参照jQuery的写法编写的<br>
 * 之所以要编写这个框架，主要是在实际项目中遇到了jquery处理起来不方便的功能； <br>
 * 如果扩展jQuery的方法的话，容易忘掉。
 */
(function(win, doc) {

	var tQuery = function(selector) {
		return new tQuery.fn.init(selector);
	}

	tQuery.fn = tQuery.prototype = {
		length : 0,
		constructor : tQuery,
		/**
		 * 初始化，主要是选择器判断 <br />
		 * 1. # 代表属性id<br />
		 * 2. . 代表属性class<br />
		 * 3. tag 代表标签
		 */
		init : function(selector) {

			if (selector == undefined) {
				return;
			}

			//
			if (selector.constructor == tQuery) {// 如果是tQuery
				return selector;
			} else if (tQuery.utils.startWith(selector, "#")) { // 如果是id
				var ele = tQuery.utils.removeStart(selector, "#");
				this.length = 1;
				var node = document.getElementById(ele);
				this[0] = node;

			} else if (tQuery.utils.startWith(selector, ".")) {// 如果是class
				var elelist = document.getElementsByTagName("*");
				var rootname = tQuery.utils.removeStart(selector, ".");
				this.length = 0;
				for (var i = 0; i < elelist.length; i++) {
					var classname = elelist[i].getAttribute("class");
					if (classname && classname.indexOf(rootname) >= 0) {
						this[this.length] = elelist[i];
						this.length++;
					}
				}

			} else {// 如果是标签名
				var elelist = document.getElementsByTagName(selector);
				this.length = 0;
				for (var i = 0; i < elelist.length; i++) {
					this[this.length] = elelist[i];
					this.length++;
				}

			}
			return this;
		},
		size : function() {
			return this.length;
		},
		html : function() {
			return this[0].innerHTML;
		},
		outHtml : function() {
			return this[0].outerHTML;
		}

	}
	/**
	 * 工具方法
	 */
	tQuery.utils = {
		/**
		 * 判断起始位置
		 */
		startWith : function(source, param) {
			var len = param.length;
			var b = true;
			for (var i = 0; i < len; i++) {

				if (param.charCodeAt(i) != source.charCodeAt(i)) {
					b = false;
					break;
				}
			}
			return b;
		},
		/**
		 * 删除开头的元素
		 */
		removeStart : function(source, param) {
			return source.substr(param.length);
		}
	}

	/**
	 * 扩展方法
	 */
	tQuery.extend = tQuery.fn.extend = function(obj) {
		for ( var k in obj) {
			this[k] = obj[k];
		}
	}

	/**
	 * 扩展选择器 <br />
	 * eq:从列表中选择 <br />
	 * find:从所有子类中选择 <br />
	 * parent:从当前父类中选择 <br />
	 * next :下一个节点 <br />
	 * prev : 上一个节点
	 */
	tQuery.fn.extend({
		eq : function(index) {
			var t = this.constructor();
			t[0] = this[index];
			return t;
		},
		find : function(elem) {
			var t = this.constructor(elem);
			return t;
		},
		parent : function() {
			var t = this.constructor();
			t[0] = this[0].parentNode;
			t.length = 1;
			return t;
		},
		next : function() {
			var t = this.constructor();
			var node = this[0].nextElementSibling || this[0].nextSibling; 
			t[0] = node;
			t.length = 1;
			return t;

		},
		prev : function() {
			var t = this.constructor();
			var node = this[0].previousElementSibling || this[0].previousSibling;
			t[0] = node;
			t.length = 1;
			return t;
		}
	});

	tQuery.fn.init.prototype = tQuery.fn;
	win.tQuery = tQuery;
})(window, document);