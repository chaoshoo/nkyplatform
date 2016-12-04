  
   /**
    * @author shiwc
    * 
    * @requires jQuery,EasyUI
    * 
    * Create a patterndialog
    * 
    * @returns $.modalDialog.handler thishandlerOn behalf of the popdialoghandle
    * 
    * @returns $.modalDialog.xxx thisxxxYou can define your own name，Mainly used in pop off，To refresh the operation of some objects，Can bexxxThis object is predefined.
    */
   $.modalDialog = function(options) {
   	if ($.modalDialog.handler == undefined) {// Avoid duplicate pop up
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
   					title : 'Prompt',
   					text : 'Data processing，Please wait....'
   				}); */
   			}
   		}, options);
   		opts.modal = true;// Force thisdialogAs a model，Oblivious transfermodalparameter
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
   
 
   