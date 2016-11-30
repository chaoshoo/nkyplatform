function addhospital(){
	
	   $.modalDialog({
			title : 'Select hospital',
			width : 850,
			height : 520,
			href : 'hospital/select.html',
			closable : true
		}); 
		//定义模式化窗口的回调函数，用户在本页面设置相关业务值。
		$.modalDialog.callBack = function (data){
			$('#hospital_code').val(data.CODE);
			$('#hospitalname').val(data.NAME);
		}
		//2秒后关闭进度条
		setTimeout(function(){
			//关闭进度条
			$.messager.progress('close');
		},300);
}