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
			$(this).addClass("selected")            //current<li>Element highlight
				   .siblings().removeClass("selected");  //Get rid of other peers<li>Highlight elements
            var index =  $div_li.index(this);  // Gets the current Click<li>element stay AllliIndex in an element。
			$divchild   	//Select child node。If you don't select a child node，Can cause errors。If there isdiv 
					.eq(index).show()   //display <li>Element correspondence<div>element
					.siblings().hide(); //Hide other peers<div>element
		}).hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		})
});