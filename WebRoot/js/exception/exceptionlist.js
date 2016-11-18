var parameter = {};

$(function() {
	//初始化弹出框
	$('#user_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				dealResult();
			}
		},{
			text:'取消',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	});
	
//	//初始化弹出框
//	$('#deal_resut').dialog({
//		buttons:[{
//			text:'确 定',
//			handler:function(){
//				dealResult();
//			}
//		},{
//			text:'取消',
//			handler:function(){
//				$('#deal_resut').dialog('close');
//			}
//		}]
//	});
	//初始化表格
	initDataGrid();
	
	//条件查询
	$("#diagnose_search").click(function(){
		parameter['FIT-real_name'] =$("#real_name").val();
		parameter['FIT-inspect_code'] = $('#inspect_code').val();
		parameter['FIT-card_code'] =$("#card_code").val();
		initDataGrid();
		parameter = {};		
	});
		
});

//初始化table
function initDataGrid(){
	$('#diagnose_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'exception/getExceptionList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'real_name',title:'检查人',width:100},
				{field:'inspect_time',title:'检查时间',width:100},
				{field:'inspect_code',title:'检查指标',width:50,
					formatter:function(value){
						return util.getValueBykeyDic('inspect_code',value);
					 }
				},
				{field:'deal_result',title:'处理意见',width:100},
				{field:'deal_state',title:'处理状态',width:100,
					formatter:function(value){
						if(1==value){
							return '未处理';
						}else if(0==value){
							return '已处理';
						}
					 }},	
				{field:'deal_time',title:'处理时间',width:100},	
				{field:'id',title:'操作',width:85,
						formatter:function(value,row){
//							return '<a href="javascript:openedit('+value+',0)">详情处理</a> &nbsp;<a onclick="javascript:openedit(\''+value+'\',1)" ><font color="red">处理</font></a>';
							return '<a href="javascript:openedit('+value+',0)">详情及处理</a>';
						},
				}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
	
}
function removetds(value,id){
	if(""!=value){
		$('#'+id).val(value);
		$("#"+id+"td").show();
		$("#"+id+"input").show();
	}else{
		$("#"+id+"td").hide();
		$("#"+id+"input").hide();
	}
}
function openedit(id,flag){
//	if("0"==falg){$("#dealResultButtons").hide();}
//	else{$("#dealResultButtons").show();}
//	$("#dealResultButtons").show();
	$('#diagnose_table').datagrid('selectRecord',id);
	var rowInfo =  $('#diagnose_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息 
//		$('#pr').val(rowInfo.pr);
		removetds(rowInfo.pr,'pr');
//		$('#sys').val(rowInfo.sys);
		removetds(rowInfo.sys,'sys');
//		$('#dia').val(rowInfo.dia);
		removetds(rowInfo.dia,'dia');
//		$('#glu0').val(rowInfo.glu0);
		removetds(rowInfo.glu0,'glu0');
//		$('#glu1').val(rowInfo.glu1);
		removetds(rowInfo.glu1,'glu1');
//		$('#glu2').val(rowInfo.glu2);
		removetds(rowInfo.glu2,'glu2');
//		$('#height').val(rowInfo.height);
		removetds(rowInfo.height,'height');
//		$('#weight').val(rowInfo.weight);
		removetds(rowInfo.weight,'weight');
		removetds(rowInfo.temp,'temp');
//		$('#bmi').val(rowInfo.bmi);
		removetds(rowInfo.bmi,'bmi');
//		$('#ubg').val(rowInfo.ubg);
		removetds(rowInfo.ubg,'ubg');
//		$('#spo2').val(rowInfo.spo2);
		removetds(rowInfo.spo2,'spo2');
//		$('#pr2').val(rowInfo.pr2);
		removetds(rowInfo.pr2,'pr2');
//		$('#leu').val(rowInfo.leu);
		removetds(rowInfo.leu,'leu');
//		$('#nit').val(rowInfo.nit);
		removetds(rowInfo.nit,'nit');
//		$('#ubg').val(rowInfo.ubg);
		removetds(rowInfo.ubg,'ubg');
//		$('#ph').val(rowInfo.ph);
		removetds(rowInfo.ph,'ph');
//		$('#bld').val(rowInfo.bld);
		removetds(rowInfo.bld,'bld');
//		$('#glu').val(rowInfo.glu);
		removetds(rowInfo.glu,'glu');
//		$('#ket').val(rowInfo.ket);
		removetds(rowInfo.ket,'ket');
//		$('#pro').val(rowInfo.pro);
		removetds(rowInfo.pro,'pro');
//		$('#bil').val(rowInfo.bil);
		removetds(rowInfo.bil,'bil');
//		$('#vc').val(rowInfo.vc);
		removetds(rowInfo.vc,'vc');
//		$('#sg').val(rowInfo.sg);
		removetds(rowInfo.sg,'sg');
		$('#dealResultShow').val(rowInfo.deal_result);
		$('#inspectdataid').val(id);
		$('#dataid').val(rowInfo.data_id);
		$('#user_detail_dialog').dialog('open');
}
}


function doctordeal(id){
//	$("#dealResultButtons").hide();
	$('#diagnose_table').datagrid('selectRecord',id);
	var rowInfo =  $('#diagnose_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息 
		$('#dealResult').val(rowInfo.deal_result);
		$('#inspectdataid').val(id);
		$('#dataid').val(rowInfo.data_id);
		$('#deal_resut').dialog('open');
}
}

function dealResult(){
	//获取处理意见
	var dealResult = $("#dealResultShow").val();
	if(dealResult==null || dealResult==""){
		$.messager.alert(titleInfo,'请输入处理意见!');
		return;
	}
	var id = $("#inspectdataid").val();
	var dataid = $("#dataid").val();
		$.post("exception/update.json?id="+id+"&dealResult="+encodeURI(encodeURI(dealResult))+"&dataid="+dataid,function(data){
			if(data.code==0){
				$('#user_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'处理成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog').dialog('close')
		},"json");
	
}

function dataGridload(param){
	$('#diagnose_table').datagrid('reload');
}








