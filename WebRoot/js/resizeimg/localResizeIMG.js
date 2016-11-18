//var pic_upload_http="http://114.55.228.245:85/nkyfileserver/picUploadServlet?";
var pic_upload_http="http://file.nbrobo.com/picUploadServlet?";
//页面初始化  divid建议与对象实体图片字段一致可以自动封装到实体类
function imginit(divid,buttonname,imgurl){
	var html = '<input type="hidden" id="'+divid+'_url" name="'+divid+'">'
			+'<div id="'+divid+'_div"></div>'
			+'<input type="file" name="'+divid+'_image" id="'+divid+'_image" style="display: none;" onchange="imgUpload(this,imgCallback);" />'
			+'<a id="add_image" onclick="addimage(\''+divid+'\')" class="btn btn-success btn-success-small">'+buttonname+'</a>';
	 $("#"+divid).html(html);
	 if(imgurl != null && imgurl != ''){
		 setImgurl(divid,imgurl);
	 }
}

function getImgurl(divid){
	return $("#"+divid+"_url").val();
}

function setImgurl(divid,url){
	$("#"+divid+"_url").val(url);
	$("#"+divid+"_div").html('<img  onclick="imgclick(this)" src="'+url+'" height="50" width="50" />');
}

var imageuploadid = '';
function addimage(imageid){
	imageuploadid = imageid;
	$("#"+imageid+'_image').click();
}

//
function imgCallback(name){
//	$(".datagrid-mask").remove(); 
//	$(".datagrid-mask-msg").remove(); 
	clearInterval(intevalid);
	$.messager.progress('close');
if(name != null){
	name=name.replace(/"/g, "");
	$("#"+imageuploadid+"_url").val(name);
	$("#"+imageuploadid+"_div").html('<img onclick="imgclick(this)" src="'+name+'" height="50" width="50" />');
}else{
	$.messager.alert(titleInfo,'上传图片失败！');
}
}

//upload  pic
var intevalid = 0;
function imgUpload(file,callback) {
	var filePath = $(file).val();
	var file_type = filePath.substring(filePath.lastIndexOf('.'),filePath.length);
	var fileName = filePath.substring(filePath.lastIndexOf('\\') + 1,filePath.length);
	
	if (file_type == '.gif' || file_type == '.jpg' || file_type == '.jpeg'|| file_type == '.bmp' || file_type == '.png') {
//		$("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo(".window");
//		$("<div class=\"datagrid-mask-msg\" style=\"z-index:10000;line-height:15px;\"></div>").html("正在努力上传，请稍等。。。").appendTo(".window").css({display:"block",left:"190px",top:""});		
		var win = $.messager.progress({
			title:'图片上传。',
			msg:'正在努力上传，请稍等。。。',
			interval: 0
		});
		intevalid = setInterval('changeprocessvalue()',500);
		jQuery().picUploadLR(file.id,callback,false);
	} else {
		$.messager.alert("提示", "只能上传图片！", "warning");
		$(file).val("");
	}
}

function changeprocessvalue(){
	var progressBar =  $.messager.progress('bar');
	var value = progressBar.progressbar('getValue');
	if (value < 100){
	    value += Math.floor(Math.random() * 10);
	    if(value > 95 ){
	    	value = 99
	    }
	    progressBar.progressbar('setValue', value);
	}else{
		progressBar.progressbar('setValue', 99);
	}
}

//public no user
function imgUpload4pub(file,callback) {
	var filePath = $(file).val();
	var file_type = filePath.substring(filePath.lastIndexOf('.'),filePath.length);
	var fileName = filePath.substring(filePath.lastIndexOf('\\') + 1,filePath.length);
	
	if (file_type == '.gif' || file_type == '.jpg' || file_type == '.jpeg'|| file_type == '.bmp' || file_type == '.png') {
		jQuery().picUploadLR(file.id,callback,true);
	} else {
		$.messager.alert("提示", "只能上传图片！", "warning");
		$(file).val("");
	}
}
function  imgclick(obj){
	var _this = $(obj);
	imgShow("#outerlookdiv", "#innerlookdiv", "#biglookimg", _this);
}

(function($) {
		$(".pimg").click(function(){
//			alert('222222222');
	       var _this = $(this);//将当前的pimg元素作为_this传入函数
	       imgShow("#outerlookdiv", "#innerlookdiv", "#biglookimg", _this);
		});
	
		$.fn.picUploadLR = function (id,callback,isPub) {
			var input = document.querySelector('#'+id);
	        lrz(input.files[0], {
	        	
	        	width:1600, 
	        	
	        	quality:0.6,
	            
	        	before: function() {
	        		//console.log('压缩开始');
	            },
	            fail: function(err) {
	                //console.error(err);
	            },
	            always: function() {
	                //console.log('压缩结束');
	            },
	            done: function (results) {
	            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
	            //console.log(results);

	            setTimeout(function () {

	                // 发送到后端
	                var xhr = new XMLHttpRequest();
	                var data = {
	                    base64: results.base64,
	                    size: results.base64.length // 校验用，防止未完整接收
	                };
	                if(isPub){//pub
	                	xhr.open('POST', pic_upload_http,true);
	                }else{
	                	xhr.open('POST', pic_upload_http,true);
	                }
	                
	                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

	                xhr.onreadystatechange = function () {
	                	if (xhr.readyState==4 && xhr.status ==200) {
//	                		alert(xhr.responseText);
	                		if(xhr.responseText && xhr.responseText.length<=128){//响应文本太长可能是网页数据
	                			callback(xhr.responseText,id);
	                		}else{
	                			$.messager.alert("提示", "上传图片出错!", "warning");
	                		}
	             		}
	                };
	                xhr.send(JSON.stringify(data)); // 发送base64
	            }, 100);
	            }
	        });
	    
	}
	})(jQuery);
	

/***浏览图片**/

function imglookinit(lookdivid){
	var html = '<div id="outerlookdiv" style="position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);'
	     + 'z-index:999;width:100%;height:100%;display:none;">'
	     + '<div id="innerlookdiv" style="position:absolute;"><img id="biglookimg" style="border:5px solid #fff;" src="" /></div></div>';			
	 $("#"+lookdivid).html(html);
}


function imgShow(outerdiv, innerdiv, bigimg, _this){
    var src = _this.attr("src");//获取当前点击的pimg元素中的src属性
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性
     /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("<img/>").attr("src", src).load(function(){
        var windowW = $(window).width();//获取当前窗口宽度
        var windowH = $(window).height();//获取当前窗口高度
        var realWidth = this.width;//获取图片真实宽度
        var realHeight = this.height;//获取图片真实高度
        var imgWidth, imgHeight;
        var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
        if(realHeight>windowH*scale) {//判断图片高度
            imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放
            imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度
            if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度
                imgWidth = windowW*scale;//再对宽度进行缩放
            }
        } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度
            imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放
                        imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度
        } else {//如果图片真实高度和宽度都符合要求，高宽不变
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
         $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放
        var w = (windowW-imgWidth)/2;//计算图片与窗口左边距
        var h = (windowH-imgHeight)/2;//计算图片与窗口上边距
        $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
    });
    $(outerdiv).click(function(){//再次点击淡出消失弹出层
        $(this).fadeOut("fast");
    });
}
