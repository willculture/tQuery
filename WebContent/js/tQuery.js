/**
 * tQuery是参照jQuery的写法编写的<br>
 * 之所以要编写这个框架，主要是在实际项目中遇到了jquery处理起来不方便的功能；
 * 如果扩展jQuery的方法的话，容易忘掉。
 */
$(function(win,doc){
	
	var tQuery = function(){
		return new tQuery.fn.init();
	}
	
	tQuery.fn = {
			init:function(){
				
			}
	}
	
	/**
	 * 扩展方法
	 */
	tQuery.extend = function(){
		
	}	
	
	
	
})(window,document);