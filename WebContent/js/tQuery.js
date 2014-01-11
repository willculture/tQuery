/**
 * tQuery是参照jQuery的写法编写的<br>
 * 之所以要编写这个框架，主要是在实际项目中遇到了jquery处理起来不方便的功能；
 * 如果扩展jQuery的方法的话，容易忘掉。
 */
(function(win,doc){
	
	var tQuery = function(params){
		return new tQuery.fn.init(params);
	}
	
	tQuery.fn = tQuery.prototype = {
			length:0,
			init:function(params){             
                if(tQuery.utils.startWith(params,"#")){
                	
                	 var ele = tQuery.utils.removeStart(params,"#");  
                	 this.length = 1;
                	 var node = document.getElementById(ele);
                	 this[0] = node;
                	 
                } 	
                return this;
			},
			html:function(){						 
				return this[0].innerHTML;
			},
			outHtml:function(){
				return this[0].outerHTML;
			},
			text:function(){			 
				if(this[0].innerText){ 
					return this[0].innerText ;
				}
				return this[0].textContent;
			}
	}
	/**
	 * 
	 */
	tQuery.utils = {
		  /**
		   * 判断起始位置
		   */
		  startWith:function(source,param){
			  var len = param.length;
			  var b = true;
			  for(var i=0;i<len;i++){
				  if(param[i]!=source[i]){
					  b = false;
					  break;
				  }
			  }
			  return b;
		  },
		  /**
		   * 删除开头的元素
		   */
		  removeStart:function(source,param){
			  return source.substr(param.length);
		  }
	}
	
	/**
	 * 扩展方法
	 */
	tQuery.extend = function(){
		
	}	
	 tQuery.fn.init.prototype  = tQuery.fn;
	win.tQuery = tQuery;
	
})(window,document);