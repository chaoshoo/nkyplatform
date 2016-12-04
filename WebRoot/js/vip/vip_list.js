var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	//初始化弹出框
	$('#vip_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#vip_dialog').dialog('close');
			}
		}]
	});
	//初始化弹出框
	$('#advance_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_advance_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#advance_dialog').dialog('close');
			}
		}]
	});
	//初始化表格
	initDataGrid();
	//添加用户
	$('#vip_add').click(function(){
		$('#vip_form')[0].reset();
		$('#id').val('');
		$('#vip_dialog').dialog('open');
		loadArea("");
	});
	//条件查询
	$("#vip_search").click(function(){
		if($("#login_account1").val()!=''){
			parameter['login_account'] =$("#login_account1").val();
		}
		if($("#type1").val()!=''){
			parameter['type'] =$("#type1").val();
		}
		if($("#real_name1").val()!=''){
			parameter['real_name'] =$("#real_name1").val();
		}
		initDataGrid();
		parameter = {};
		
	});
	//重置
	$("#vip_reset").click(function(){
		$("#login_account1").val("");
		$("#type1").val("");
		$("#real_name1").val("");
	});
	
});

//修改
function vipEdit(id){
	$('#vip_table').datagrid('selectRecord',id);
	var rowInfo =  $('#vip_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#vip_dialog').dialog('open');
	}
}

//保存
function submit_model_window(){
	var id = $("#id").val();
	var sex = $("input[name=sex]:checked").val();
	var login_account = $("#login_account").val();
	var mobile = $("#mobile").val();
	if (login_account == null || login_account == "") {
		$.messager.alert(titleInfo,'Please enter user name！');
		return;
	}
	var account_mail = $("#account_mail").val();
	if(account_mail == null || account_mail == ""){
		$.messager.alert(titleInfo,'Please enter your email address！');
		return;
	}else if (!checkEmail(account_mail)) {
		$.messager.alert(titleInfo,'Mailbox format error！');
		return;
	}
	if (mobile == null || mobile == "") {
		$.messager.alert(titleInfo,'Please enter your mobile phone！');
		return;
	}else if(!checkMobile(mobile)){
		$.messager.alert(titleInfo,'Cell phone number is wrong！');
		return;
	}
	var vip = {
			"login_account":login_account,
			"mobile":mobile,
			"sex":sex,
			"area_id":$("#area_id").val(),
			"account_mail":account_mail,
			"menber_promoter_num":$("#menber_promoter_num").val(),
			"type":$("#type").val(),
			"real_name":$("#real_name").val(),
			"address":$("#address").val(),
			"is_valid":$("#is_valid").val(),
			"vip_desc":$("#vip_desc").val()
	};
	if(id!=null&&id!=""){
		vip['id']=id;
		$.post("vip/updateVip.json",vip,function(data){
			if(data.code==1){
				$('#vip_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#vip_table').datagrid('load',parameter);
			}else{
				$.messager.alert(titleInfo,'Change failed！');
			}
		},"json");
	}else{
		$.post("vip/addVip.json",vip,function(data){
			if(data.code==1){
				$('#vip_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$('#vip_table').datagrid('load',parameter);
			}else {
				$.messager.alert(titleInfo,'Add failed！');
			}
		},"json");
	}
}

//预付款
function submit_advance_window(){
	var id = $("#aid").val();
	var balance = $("#balance").val();
	var advance_pay = $("#advance_pay").val();
	if(isNaN(balance)) {
		$.messager.alert(titleInfo,'Please enter the correct amount！');
		return;
	}
	$.ajax({
        url:'vip/advanceBalance.html?id='+id+'&money='+balance+'&advance_pay='+advance_pay,    
        success:function(msg){
        	if(msg=='success') {
        		alert("Pre-payment success");
        		window.location.href=window.location.href;
        	}
        	else 
        		alert("Sorry, your balance is running low");
        } ,
        fail:function(){
        	alert(1);
        }
    });
}

//初始化table
function initDataGrid(){
	$('#vip_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vip/getVipList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'login_account',title:'User name',width:70},
			{field:'type_name',title:'Member group',width:70},
			{field:'real_name',title:'Name',width:40},
			{field:'sex',title:'Gender',width:40,
				formatter:function(value){
					if(value==1) {
						return 'female';
					}else {
						return 'male';
					}
				}
			},
			{field:'balance',title:'balance',width:40},
			{field:'return_money',title:'Cash back',width:40},
			{field:'integral',title:'credits',width:40},
			{field:'num',title:'Place an order/Invitation',width:70,
				formatter: function(value, row) {
					return row.order_num + '/' + row.invite_num;
				}
			},
			{field:'is_valid',title:'state',width:70,
				formatter:function(value){
					if(value==0) {
						return 'normal';
					}else {
						return 'locked';
					}
				}
			},
			{field:'create_time',title:'Registration date',width:100},
			{field:'mobile',title:'Mobile phone',width:70},
			{field:'id',title:'Operation',width:150,
				formatter:function(value){
					return '<a href="javascript:initPassWord('+value+')">Initialization code</a> <a   onclick="advance('+value+')" ><font color="red">Pre-payment management</font></a> <a href="javascript:vipEdit('+value+')">modify</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
function del(id){  //Delete operation  
    $.messager.confirm('confirm','confirm deletion?',function(row){  
        if(row){  
            $.ajax({
                url:'vip/delVip.html?id='+id,    
                success:function(msg){
                	if(msg=='success') 
                		alert("Deleted");
                	else 
                		alert("Delete failed");
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    });
}

//初始化密码
function initPassWord(id) {
	$.messager.confirm('confirm','Confirm initialization password?',function(row){  
        if(row){  
            $.ajax({  
                url:'vip/initPwd.html?id='+id,    
                success:function(msg){
                	if(msg=='success') 
                		alert("Password initialization done");
                	else 
                		alert("Password initialization failed");
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    });
}

//设置弹出框信息 
function generateDialog(rowInfo){
	$('#id').val(rowInfo.id);
	$('#login_account').val(rowInfo.login_account);
	$('#account_mail').val(rowInfo.account_mail);
	$('#mobile').val(rowInfo.mobile);
	$('#menber_promoter_num').val(rowInfo.menber_promoter_num);
	$('#type').val(rowInfo.type);
	$('#real_name').val(rowInfo.real_name);
	var $sex = $('input[name=sex]');
	for ( var i = 0; i < $sex.length; i++) {
		if($sex[i].value==rowInfo.sex) {
			$sex[i].checked = true;
		}
	}
	$('#address').val(rowInfo.address);
	$('#is_valid').val(rowInfo.is_valid);
	$('#vip_desc').val(rowInfo.vip_desc);
	loadArea(rowInfo.area_id);
}

//预付款管理
function advance(id){
	//设置弹出框信息
	$('#aid').val(id);
	$('#advance_dialog').dialog('open');
	
}