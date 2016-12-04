var examVipCode = null;
var type = "D";
var parameter = {};

$(function() {
	
	examVipCode = $("#examVipCode").val();
	parameter = {"vip_code": examVipCode};
	
	type = $("#type").val();
	
	if(type == "H" || type == "S")
	{
		$('#mr_add').hide();
	}
	
	initMediRecDialog();
	
	initExamNormDataGrid();
	
	initExamImageDataGrid();
	
	initMedirecDataGrid();
	
	
	$('#mr_add').click(function() {
		
		$("#examId").val('0');
		getExamNorms();
		getExamPics();
		$("#exam_hos").val('');
	    $("#exam_date").datebox('setValue','');
		$("#exam_desc").val('');
		$("#sum_up").val('');
		$("#examId").val('');
		
		$("#submit_exam").show();
	    $("#add_exam_data").show();
	    $("#submit_sumup").hide();
	    $("#add_exam_image").show();
	    $("#exam_norm_table").datagrid('showColumn', 'id');
		$("#exam_image_table").datagrid('showColumn', 'id');
		  
		$('#medirec_list_dialog').dialog('open');
	});
	
	$('#mr_back').click(function() {
		window.close();
	});
	
	$('#submit_exam').click(function() {
		saveExamInfo();
	});
	$('#submit_sumup').click(function() {
		saveExamInfo();
	});
	
	//上传图片
	$('#add_exam_image').click(function() {
		$("#exam_img").click();
	});
	
	$('#add_exam_data').click(function() {
		addExamNormData();
	});
	
});


function saveExamInfo(){
	
	var examId = $("#examId").val();
	var exam_hos = $("#exam_hos").val();
	var exam_date = $("#exam_date").datebox('getValue');
	var exam_desc = $("#exam_desc").val();
	if(exam_hos==null||exam_hos==''){
		$.messager.alert(titleInfo,'Please input the medical hospital!');
		return;
	}
	if(exam_date==null||exam_date==''){
		$.messager.alert(titleInfo,'Please input physical examination time!');
		return;
	}
	var sum_up = $("#sum_up").val();
	
	var examInfo = {
			"exam_hos":exam_hos,
			"exam_date":exam_date,
			"vip_code": examVipCode,
			"exam_sumup": sum_up,
			"exam_desc":exam_desc
	};
	
	if(examId!=null&&examId!=""){
		examInfo['id']=examId;
		$.post("medirec/updateVipExam.json",examInfo,function(data){
			if(data.code==1){
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#medirec_list_table').datagrid('load',parameter);
			}else{
				$.messager.alert(titleInfo,'Change failed:'+data.msg);
			}
		},"json");
	}else{
		$.post("medirec/addVipExam.json",examInfo,function(data){
			if(data.code==1){
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$("#examId").val(data.msg);
				$('#medirec_list_table').datagrid('load',parameter);
			}else{
				$.messager.alert(titleInfo,'Add failed:'+data.msg);
			}
		},"json");
	}
	
}


function initMedirecDataGrid()
{
	$('#medirec_list_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'medirec/getExamList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'exam_hos',title:'physical examination Hospital',width:100},
				{field:'exam_desc',title:'Physical examination description',width:100},
				{field:'exam_sumup',title:'Physical examination summary',hidden:true},
				{field:'exam_date',title:'Physical examination time',width:100},				
				{field:'id',title:'Operation',width:85,
						formatter:function(value){
							var operInfo = '<a href="javascript:viewexam('+value+')">See</a> ';
							
							if(type == "D"){
								operInfo += '&nbsp;&nbsp; <a href="javascript:editexam('+value+')">edit</a>'
									+'&nbsp;&nbsp; <a href="javascript:delexam('+value+')">delete</a>';
							}
							return operInfo ;
						}
				}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
	
}

function initMediRecDialog() {
	
	$('#medirec_list_dialog').dialog({
		title : 'Physical examination information',
		iconCls : 'icon-save',
		closed : true,
		width : 800,
		height : 500,
		buttons : [{
			text : 'Indeed set',
			handler : function() {
				$('#medirec_list_dialog').dialog('close');
			}
		}]
	});
}

function showNorm()
{
	$("#normscope").html("");
	var exam_norm = $("#exam_norm").val();
	if(exam_norm=="") reutrn;
	var lowValue = $("#exam_norm").find("option:selected").attr("lowVal");
    var highValue = $("#exam_norm").find("option:selected").attr("highVal");
    if(lowValue!=null && lowValue!="" && highValue!=null && highValue!=""){
    	var normUint = $("#exam_norm").find("option:selected").attr("normUint");	
        $("#normscope").html(lowValue+" ~ "+highValue +"    "+normUint);
    }
}


function updateNormStatus()
{
	var exam_value = $("#exam_value").val();
    if(exam_value==null||exam_value==''||isNaN(exam_value)) return ;
    
    var lowValue = $("#exam_norm").find("option:selected").attr("lowVal");
    var highValue = $("#exam_norm").find("option:selected").attr("highVal");
    
	var exam_status = '0';
	if(lowValue!=null&&lowValue!="" && !isNaN(lowValue)){
		if(parseFloat(lowValue)>parseFloat(exam_value)) exam_status = '-1';
	}
	if(highValue!=null&&highValue!="" && !isNaN(highValue)){
		if(parseFloat(highValue)<parseFloat(exam_value)) exam_status = '1';
	}
    
	$("#exam_status").val(exam_status);

}

function addExamNormData() {
	
	var examId = $("#examId").val();
	if(examId==null||examId==''){
		$.messager.alert(titleInfo,'Please save the basic information!');
		return;
	}
	var exam_norm = $("#exam_norm").val();
	
	
	var item = $('#exam_norm_table').datagrid('getRows');
    if (item) {
        for (var i = item.length - 1; i >= 0; i--) {
            var row = $('#exam_norm_table').datagrid('getData').rows[i];
            if(exam_norm==row.exam_norm)
        	{
            	$.messager.alert(titleInfo,'Index has been entered!');
        		return;
        	}
        }
    }
	
    var exam_status = $("#exam_status").val();
    var exam_value = $("#exam_value").val();
    if(exam_value==null||exam_value==''){
		$.messager.alert(titleInfo,'Please input index value!');
		return;
	}
    
    
    var lowValue = $("#exam_norm").find("option:selected").attr("lowVal");
    var highValue = $("#exam_norm").find("option:selected").attr("highVal");
    if(exam_status==""&&!isNaN(exam_value))
	{
      exam_status = '0';
	  if(lowValue!=null&&lowValue!="" && !isNaN(lowValue)){
		  if(parseFloat(lowValue)>parseFloat(exam_value)) exam_status = '-1';
	  }
	  if(highValue!=null&&highValue!="" && !isNaN(highValue)){
		  if(parseFloat(highValue)<parseFloat(exam_value)) exam_status = '1';
	  }
	}
	
	var row = {
			"exam_id":examId,
			"exam_norm":exam_norm,
			"exam_status": exam_status,
			"exam_value": exam_value
	};
	
	$.post("medirec/addExamNormData.json",row,function(data){
		if(data.code==1){
			$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});	
			row['id']=data.msg;
			$('#exam_norm_table').datagrid('insertRow',{"index":0,"row":row});
		}else{
			$.messager.alert(titleInfo,'Add failed:'+data.msg);
		}
	},"json");
	
}

function deleteParam(index,normid) {
	$.post("medirec/delVipExamNorm.json",{"id": normid},function(data){
		if(data.code==1){
			$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
			$('#exam_norm_table').datagrid('deleteRow',index);
		}else{
			$.messager.alert(titleInfo,'Delete failed:'+data.msg);
		}
	},"json");
	
}
function deleteImage(index,picId) {
	
	$.post("medirec/delVipExamPic.json",{"id": picId},function(data){
		if(data.code==1){
			$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
			$('#exam_image_table').datagrid('deleteRow',index);
		}else{
			$.messager.alert(titleInfo,'Delete failed:'+data.msg);
		}
	},"json");
}

function getExamPics()
{
	var examId = $("#examId").val();
	if(examId==null || examId =="") return ;
	$.post('medirec/getimages.json',{"examId": examId},function(data) {
		$('#exam_image_table').datagrid('loadData',{total:0,rows:data});
	},'json');
}


function getExamNorms()
{
	var examId = $("#examId").val();
	if(examId==null || examId =="") return ;
	$.post('medirec/getExamNorms.json',{"examId": examId},function(data) {
		$('#exam_norm_table').datagrid('loadData',{total:0,rows:data});
	},'json');
}

function editexam(exId)
{
	  $("#submit_exam").show();
	  $("#add_exam_data").show();
	  $("#submit_sumup").hide();
	  $("#add_exam_image").show();
	  $("#exam_norm_table").datagrid('showColumn', 'id');
	  $("#exam_image_table").datagrid('showColumn', 'id');
	  
	$('#medirec_list_table').datagrid('selectRecord',exId);
	var rowInfo =  $('#medirec_list_table').datagrid('getSelected');
	if(rowInfo){
		$("#examId").val(exId);
		
		$("#exam_hos").val(rowInfo.exam_hos);
		$("#exam_date").datebox('setValue',rowInfo.exam_date);
		$("#exam_desc").val(rowInfo.exam_desc);
		$("#sum_up").val(rowInfo.exam_sumup);
		
		getExamNorms();
		getExamPics();
		$('#medirec_list_dialog').dialog('open');
	}
}

function delexam(exId)
{
	 $.messager.confirm('confirm','Delete this record?？',function(del){  
		 if(!del) reutrn;
		 $.post("medirec/delexam.json",{"id": exId},function(data){
			if(data.code==1){
				$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
				$('#medirec_list_table').datagrid('load',parameter);
			}else{
				$.messager.alert(titleInfo,'Delete failed:'+data.msg);
			}
		},"json");
	 })  
}

function viewexam(exId)
{
	
	  $("#submit_exam").hide();
	  $("#add_exam_data").hide();
	  $("#submit_sumup").hide();
	  $("#add_exam_image").hide();
	  
	$('#medirec_list_table').datagrid('selectRecord',exId);
	var rowInfo =  $('#medirec_list_table').datagrid('getSelected');
	if(rowInfo){
		$("#examId").val(exId);
		
		$("#exam_hos").val(rowInfo.exam_hos);
		$("#exam_date").datebox('setValue',rowInfo.exam_date);
		$("#exam_desc").val(rowInfo.exam_desc);
		$("#sum_up").val(rowInfo.exam_sumup);
		
		getExamNorms();
		getExamPics();
		
		$("#exam_norm_table").datagrid('hideColumn', 'id');
		$("#exam_image_table").datagrid('hideColumn', 'id');
		
		$('#medirec_list_dialog').dialog('open');
	}
}


function initExamNormDataGrid() {
	//规格展示列表
	$('#exam_norm_table').datagrid({
		rownumbers:true,
		columns : [[{
			field : 'exam_norm',
			title : 'Physical examination index',
			width : 160,
			formatter : function (value) {
				return getNormName(value);
			}
		},{
			field : 'exam_value',
			title : 'Index result',
			width : 155
		},
		{
			field : 'exam_status',
			title : 'Index analysis',
			width : 80,
			formatter : function (value) {
				return getNormStatus(value);
			}
		},{
			field : 'exam_unit',
			title : 'Index unit',
			width : 60,
			formatter : function (value,row) {
				return getNormUnit(row.exam_norm);
			}
		},{
			field : 'exam_scope',
			title : 'Index interval',
			width : 100,
			formatter : function (value,row) {
				return getNormScope(row.exam_norm);
			}
		},{
			field : 'id',
			title : 'Operation',
			width : 50,
			formatter : function (value,row,index) {
				return '<button class="l-btn" onclick = "deleteParam(' + index + ','+value+')">delete</button>';
			}
		}]]
	});
}


//初始化产品规格数据列表
function initExamImageDataGrid() {
	//规格展示列表
	$('#exam_image_table').datagrid({
		rownumbers:true,
		columns : [[{
			field : 'exam_pic_name',
			title : 'Picture name',
			width : 300
		},{
			field : 'exam_pic_url',
			title : 'View picture',
			width : 150,
			formatter : function (value,row,index) {
				return ' <img src="'+value+'" width=40 height=40 onclick = "lookexampic(\'' + value + '\')">&nbsp;&nbsp;&nbsp;&nbsp;<button onclick = "lookexampic(\'' + value + '\')" ><i class="icon-search"></i>&nbsp;See</button>';
			}
		},{
			field : 'id',
			title : 'Operation',
			width : 50,
			formatter : function (value,row,index) {
				return '<button class="l-btn" onclick = "deleteImage(' + index + ','+value+')"><i class="icon-remove"></i>&nbsp;delete</button>';
			}
		}
		]]
	});
}
function getNormStatus(normStatus)
{
	var typename = normStatus;
	$("#exam_status option").each(function(){ 
	        var txt = $(this).text();
	        var val = $(this).val();
	        if(val == normStatus){
	        	typename = txt;
	        }
	});
	return typename;

}



function getNormName(norms)
{
	var typename = norms;
	$("#exam_norm option").each(function(){ 
	        var txt = $(this).text(); //ObtainoptionContent
	        var val = $(this).val();
	        if(val == norms){
	        	typename = txt;
	        }
	});
	return typename;
}


function getNormScope(norms){
	
	var typename = '';
	$("#exam_norm option").each(function(){ 
	        var txt = $(this).text(); 
	        var val = $(this).val();
	        if(val == norms){
	        	typename = $(this).attr("lowVal")+"~"+$(this).attr("highVal");
	        }
	});
	return typename;
}


function getNormUnit(norms){
	var typename = '';
	$("#exam_norm option").each(function(){ 
	        var txt = $(this).text(); 
	        var val = $(this).val();
	        if(val == norms){
	        	typename = $(this).attr("normUint");
	        }
	});
	return typename;
}




function imgCallback(name){
//	$(".datagrid-mask").remove(); 
//	$(".datagrid-mask-msg").remove(); 
	$.messager.progress('close');
	if(name != null){
		name=name.replace(/"/g, "");
		var examId = $("#examId").val();
		if(examId==null||examId==''){
			$.messager.alert(titleInfo,'Please save the basic information!');
			return;
		}
		var picName = $("#exam_pic_name").val();
		var row = {"exam_pic_name" : picName,"exam_pic_url" : name,"exam_id" : examId};
		$("#exam_img").val("");
		$("#exam_pic_name").val("");
		$.post("medirec/addVipExamPic.json",row,function(data){
			if(data.code==1){
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				row['id']=data.msg;
				$('#exam_image_table').datagrid('insertRow',{"index":0,"row":row});
			}else{
				$.messager.alert(titleInfo,'Add failed:'+data.msg);
			}
		},"json");
	}else{
		$.messager.alert(titleInfo,'Upload picture failed！');
	}
}

function lookexampic(picpath){

	if(picpath != ""){
		var url= picpath;
		$(".img-con").css({
        "left":"20px",
        "top" :"5px",
        "max-width":"1200px",
		});
		
	$(".cover").fadeIn(500);
		$(".img-con img").attr("src",url);
		$(".img-con").show();
	}else{
		$.messager.alert(titleInfo,'No pictures address！');
	}
}

function closepic(){
  $(".cover").hide();
  $(".img-con").hide();
}