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
	$.messager.alert(titleInfo,'Upload picture failed！');
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
			title:'Picture upload。',
			msg:'Uploading，One moment please。。。',
			interval: 0
		});
		intevalid = setInterval('changeprocessvalue()',500);
		jQuery().picUploadLR(file.id,callback,false);
	} else {
		$.messager.alert("Prompt", "Can only upload pictures！", "warning");
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
		$.messager.alert("Prompt", "Can only upload pictures！", "warning");
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
	       var _this = $(this);//Will presentpimgElement as_thisAfferent function
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
	                    size: results.base64.length // Check use，Prevent incomplete reception
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
	                		if(xhr.responseText && xhr.responseText.length<=128){//Response text is too long may be web data
	                			callback(xhr.responseText,id);
	                		}else{
	                			$.messager.alert("Prompt", "Error uploading image!", "warning");
	                		}
	             		}
	                };
	                xhr.send(JSON.stringify(data)); // Sendbase64
	            }, 100);
	            }
	        });
	    
	}
	})(jQuery);
	

/***Browse pictures**/

function imglookinit(lookdivid){
	var html = '<div id="outerlookdiv" style="position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);'
	     + 'z-index:999;width:100%;height:100%;display:none;">'
	     + '<div id="innerlookdiv" style="position:absolute;"><img id="biglookimg" style="border:5px solid #fff;" src="" /></div></div>';			
	 $("#"+lookdivid).html(html);
}


function imgShow(outerdiv, innerdiv, bigimg, _this){
    var src = _this.attr("src");//Gets the current ClickpimgElement insrcattribute
    $(bigimg).attr("src", src);//Config#bigimgElementsrcattribute
     /*Gets the actual size of the current picture.，And display the pop-up layer and large*/
    $("<img/>").attr("src", src).load(function(){
        var windowW = $(window).width();//Gets the current window width
        var windowH = $(window).height();//Gets the current window height
        var realWidth = this.width;//Get the true width of the picture
        var realHeight = this.height;//Obtain the true height of the picture
        var imgWidth, imgHeight;
        var scale = 0.8;//Zoom size，Zoom when the true width and height of the picture are larger than the width of the window.
        if(realHeight>windowH*scale) {//Picture height
            imgHeight = windowH*scale;//Such as greater than the height of the window，Image height zoom
            imgWidth = imgHeight/realHeight*realWidth;//Equal scaling width
            if(imgWidth>windowW*scale) {//If the width is larger than the width of the window
                imgWidth = windowW*scale;//Zoom in width
            }
        } else if(realWidth>windowW*scale) {//If the picture is highly appropriate，Judge picture width
            imgWidth = windowW*scale;//Such as greater than the width of the window，Image width zoom
                        imgHeight = imgWidth/realWidth*realHeight;//Equal scaled height
        } else {//If the true height and width of the picture are in line with the requirements，High width invariant
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
         $(bigimg).css("width",imgWidth);//Zoom in the picture with the final width
        var w = (windowW-imgWidth)/2;//Calculate the picture and the left side of the window
        var h = (windowH-imgHeight)/2;//The picture and window margin calculation
        $(innerdiv).css({"top":h, "left":w});//Config#innerdivThetopandleftattribute
        $(outerdiv).fadeIn("fast");//Fade display#outerdivand.pimg
    });
    $(outerdiv).click(function(){//Click fade out again.
        $(this).fadeOut("fast");
    });
}