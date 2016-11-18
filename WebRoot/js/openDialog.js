  
   /**
    * @author shiwc
    * 
    * @requires jQuery,EasyUI
    * 
    * 创建一个模式化的dialog
    * 
    * @returns $.modalDialog.handler 这个handler代表弹出的dialog句柄
    * 
    * @returns $.modalDialog.xxx 这个xxx是可以自己定义名称，主要用在弹窗关闭时，刷新某些对象的操作，可以将xxx这个对象预定义好
    */
   $.modalDialog = function(options) {
   	if ($.modalDialog.handler == undefined) {// 避免重复弹出
   		var opts = $.extend({
   			title : '',
   			width : 840,
   			height : 500,
   			modal : true,
   			onClose : function() {
   				$.modalDialog.handler = undefined;
   				$(this).dialog('destroy');
   			},
   			onOpen : function() {
   				/*
   				$.messager.progress({
   					title : '提示',
   					text : '数据处理中，请稍后....'
   				}); */
   			}
   		}, options);
   		opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
   		return $.modalDialog.handler = $('<div/>').dialog(opts);
   	}
   };
   
   function openDialog(title,url,width1,height1){
	   $.modalDialog({
			title : title,
			width : width1,
			height : height1,
			href : url,
			closable : true
		}); 
		//定义模式化窗口的回调函数，用户在本页面设置相关业务值。
		$.modalDialog.callBack = function (data){
				$('#base_table').datagrid('reload');
		}
		//2秒后关闭进度条
		setTimeout(function(){
			//关闭进度条
			$.messager.progress('close');
		},500);
	}
   
   function dialogClose(){
		$.modalDialog.callBack= undefined;
		$.modalDialog.handler.window("close");
	}
   
   //注意页面要加一个div  id为 editfrom_dialog
   function openDialog2(title,url,width1,height1){
		$("#editfrom_dialogtemp").dialog('destroy');
		$('#editfrom_dialog').empty();
		$('.window-editfrom_dialog').remove();
		$('#editfrom_dialog').append("<div id='editfrom_dialogtemp' style='height:500'></div>")
		$('#editfrom_dialogtemp').dialog({
		    title: title,
		    width: width1,
		    height: height1,
		    closed: false,
		    cache: false,
		    href: url,
		    modal: true
		});
	}
   
   function dialogClose2(){
	   $("#editfrom_dialogtemp").dialog('close');
	}
   
 
   