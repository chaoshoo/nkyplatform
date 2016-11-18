//登录输入提示
$(function() {
    $(".dlC2 .inputC").val('');
    $(".dlC2 .inputC").focus(function() {
        var $len = $(this).length;
		 var value = $(this).val();
        if ($len > 0) {
            $(this).next(".label").css("display", "none");
        } else {
            $(this).next(".label").css("display", "block");
        }

    });
    $(".dlC2 .inputC").blur(function() {
        var value = $(this).val();
        if (value.length == 0) {
            $(this).next(".label").css("display", "block");
        }
    });
    $(".dlC2 .label").click(function() {
        $(this).prev(".dlC2 .inputC").focus();
    });
    
	window.setInterval(clearLable, 100);
});

function clearLable(){
	var value = $(".inputC2").val();
	if(value&&value.length > 0){
		  $(".label2").css("display", "none");
	}
}
  
  
//左侧菜单
$(function(){
	
	$(".s_nav").click(function(){
		 $(this).addClass("s_nav2").siblings().removeClass("s_nav2");
	});
	

});

/*help*/
/*$(function(){
	$(".help .i_help").hover(function(){
		$(this).next(".help_tip").toggle();
	});
});*/

//tab切换效果
$(function(){
	    var $div_li =$("div.tab_t ul li");
		var $divchild = $("div.tab_c > div");
	    $div_li.click(function(){
			$(this).addClass("selected")            //当前<li>元素高亮
				   .siblings().removeClass("selected");  //去掉其他同辈<li>元素的高亮
            var index =  $div_li.index(this);  // 获取当前点击的<li>元素 在 全部li元素中的索引。
			$divchild   	//选取子节点。不选取子节点的话，会引起错误。如果里面还有div 
					.eq(index).show()   //显示 <li>元素对应的<div>元素
					.siblings().hide(); //隐藏其他几个同辈的<div>元素
		}).hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		})
});
