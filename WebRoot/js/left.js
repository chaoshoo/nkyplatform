//无实质作用变量
var rightTargetID = "rightDiv";
var task_interval = -1;//timer
//全局作用的变量
var menuID = null;
var auth_id;

$(function(){
	loadLeftData();
});

/**
 * Load left area data
 */
function loadLeftData(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "sysAuth/getLeftAuth.json",
        async: false,
        data:{"pid":0},
        success: function(data){
    		$("#leftContainer").html("");
    		menuID = $.getUrlVar("ID");
    		if(null!=data){
    			var list = data.rows;
    			for(var listIndex=0;listIndex<list.length;listIndex++){//External loop to get all the first level menu
    				auth_id = list[listIndex].authId;
    				if(list[listIndex].pid==0){//First level menu
    					$("#leftContainer").append('<li class="leftDivLi">'+list[listIndex].authName+'</li><li id=li_'+listIndex+' class="leftDivLi_"></li>');
    					var $li = $("#leftContainer li").last();
        				$li.append("<ul></ul>");
        				var $lili = $li.children("ul");//PreviousliShow a menu name，After oneliTheulList shows all of its two menu
        				
        				for(var i=0;i<list.length;i++){//Internal loop to obtain the corresponding two menu
        					if(auth_id==list[i].pid&&list[i].pid!=0){//Two level menu
        						if(null==menuID){//After initialization
        							menuID=list[i].authId;
        						}else{//After clicking on a menu
        							menuID=parseInt(menuID);
        						}
        						if(menuID==list[i].authId){
        							$lili.append('<li class="leftDivLiLi active_click" page_id="'+list[i].authId+'" onclick=gotoJSP("'+list[i].authAction+'!ID='+list[i].authId+'")>'+list[i].authName+'</li>');
        							$("#li_"+listIndex).show();//Expand the two level menu under this level
        							$("#li_"+listIndex).prev("li").addClass("active_click");//Highlight the name of this level menu
        						}else{
        							$lili.append('<li class="leftDivLiLi" page_id="'+list[i].authId+'" onclick=gotoJSP("'+list[i].authAction+'!ID='+list[i].authId+'")>'+list[i].authName+'</li>');
        						}
        					}
        				}
    				}
    			}
    		}
    		//为一级菜单、二级菜单添加鼠标移动和点击事件
    		leftClickNavLi();
    		leftClickNavLiLi();
        }});
    
}

//一级菜单
function leftClickNavLi(){
	$('.leftDivLi').each(function(index){
		$(this).mouseover(function(){
			$(this).addClass('active');
		}).mouseout(function(){
			$(this).removeClass('active');
		});
	});
	
	$('.leftDivLi').each(function(index){
		$(this).click(function(){
			$(".leftDivLi_").slideUp("200");
			//收缩控制
			if("none"==$(this).next("li").css("display")){
				$(this).next("li").slideToggle("200");
			}
			//当前样式控制
			$('li').removeClass('active_click');
			$(this).addClass("active_click");
			if($(this).hasClass('active')){
				//$(this).css('width',defaultActiveLiWidth);
			}else{
				//$(this).css('width',defaultLiWidth);
			}
		});
	});

}

//二级菜单
function leftClickNavLiLi(){
	$('.leftDivLiLi').each(function(index){
		$(this).mouseover(function(){
			//$('li').removeClass('active');
			//$(this).attr("page_id");
			$(this).addClass('active');
		}).mouseout(function(){
			$(this).removeClass('active');
			//$(this).css('width',($(this).width()+3));
			//$(this).addClass('active');
		});;
	});
	
	$('.leftDivLiLi').each(function(index){
		$(this).click(function(){
			window.clearInterval(task_interval);
			$('.leftDivLiLi').removeClass('active_click');
			$(this).addClass("active_click");//.css('width',defaultActiveLiWidth);
		});
	});
}

/**
 * Intermediate zoneiframeJump to the specified page（IDWill be added to the request parameter.）
 * @param jspHref
 */
function gotoJSP(jspHref){
	$('#'+rightTargetID).html('<div style="margin-top:100px;text-align:center;"><img src="images/common/loading.gif"></div>');
	if(jspHref.lastIndexOf("?")==-1){
		jspHref=jspHref.replace("!","?");
		//window.location.href=getAppBasePath()+jspHref;
		document.getElementById("mainframe").src = getAppBasePath()+jspHref;
		return;
	}else if(jspHref.lastIndexOf("!")!=-1){
		jspHref=jspHref.replace("!","&");
		//window.location.href=getAppBasePath()+jspHref;
		document.getElementById("mainframe").src = getAppBasePath()+jspHref;
	}
}