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
		init : function(selector) {

			if (selector.constructor == tQuery) {
				return selector;
			} else if (tQuery.utils.startWith(selector, "#")) {

				var ele = tQuery.utils.removeStart(selector, "#");
				this.length = 1;
				var node = document.getElementById(ele);
				this[0] = node;

			} else if (tQuery.utils.startWith(selector, ".")) {

				var elelist = document.getElementsByTagName("*");
				var rootname = tQuery.utils.removeStart(selector, ".");
				this.length = 0;
				for ( var i = 0; i < elelist.length; i++) {
					var classname = elelist[i].getAttribute("class");
					if (classname && classname.indexOf(rootname) >= 0) {
						this[this.length] = elelist[i];
						this.length++;
					}
				}

			} else {

			}
			return this;
		},
		size : function() {
			return this.length;
		},

		html : function() {
			return this[0].innerHTML;
		}

	}
	/**
	 * 
	 */
	tQuery.utils = {
		/**
		 * 判断起始位置
		 */
		startWith : function(source, param) {
			var len = param.length;
			var b = true;
			for ( var i = 0; i < len; i++) {
				if (param[i] != source[i]) {
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

		},
		prev : function() {

		}
	});

	tQuery.fn.init.prototype = tQuery.fn;
	win.tQuery = tQuery;
})(window, document);