var parameter =new Array();
var text="";

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
	
	//初始化弹出框
	$('#deal_resut').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				dealResult();
			}
		},{
			text:'取消',
			handler:function(){
				$('#deal_resut').dialog('close');
			}
		}]
	});
	//初始化表格
	initDataGrid();
	
	//条件查询
	$("#diagnose_search").click(function(){
//		$("tr td input[type='checkbox']").removeAttr("checked");
		var geqAge =$("#FIT-GEQ-age").val();
		if(geqAge != null && geqAge != "" ){
			if((!isPInt(geqAge))){
				$.messager.alert(titleInfo,"请输入合法的年龄");
				return ;
			}else if(geqAge < 1 || geqAge>100){
				$.messager.alert(titleInfo,"请输入合法的年龄段");
				return ;
			}
		}
		var leqAge =$("#FIT-LEQ-age").val();
		if(leqAge != null && leqAge != ""){
			if((!isPInt(leqAge))){
				$.messager.alert(titleInfo,"请输入合法的年龄");
				return ;
			}else if(leqAge < 1 || leqAge>100){
				$.messager.alert(titleInfo,"请输入合法的年龄段");
				return ;
			}
		}
		var illtypeStr="";
//		$("input[name='illtypebox'][checked]").each(function(i){
//	          if(i==0){
//	        	  illtypeStr= "'"+$(this).attr('value')+"'";
//	          }else{
//	        	  illtypeStr=illtypeStr+",'"+$(this).attr('value')+"'";
//	          }
//		});
		 $("input[name='illtypebox']").each(function(i){
	          if (this.checked ==true) {
	        	  if(illtypeStr==''){
		        	  illtypeStr= "'"+this.value+"'";
		          }else{
		        	  illtypeStr=illtypeStr+",'"+this.value+"'";
		          }
	           }
	     });
		parameter = $.serializeObject($("#ques_qry_form"));
		parameter['FIT-chronic_type'] =illtypeStr;
		if(text != '' ){
			parameter['FIT-text'] =text; 
		 }
//		 if(text1 !=''){
//			 parameter['FIT-text1'] =text1;
//		 }
//		 if(text2 !=''){
//			 parameter['FIT-text2'] =text2;
//		 }
//		 if(text3 !=''){
//			 parameter['FIT-text3'] =text3;
//		 }
//		 if(text4 !=''){
//			 parameter['FIT-text4'] =text4;
//		 }
//		 if(text5 !=''){
//			 parameter['FIT-text5'] =text5;
//		 }
		initDataGrid();
		parameter = {};
//		$("tr td input[type='checkbox']").removeAttr("checked");
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
		url:'chronic/getChronicList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'real_name',title:'客户名称',width:100},
				{field:'card_code',title:'卡号',width:100},
				{field:'mobile',title:'电话',width:100},
				{field:'ischronic',title:'是否慢性病',width:100,
					formatter:function(value){
						if(value==null||""==value){return "否";}
						return util.getValueBykeyDic('ischronic',value);
					 }
				},
				{field:'ill_type',title:'疾病类型',width:100,
					formatter:function(value){
						if(value==null||""==value){return "";}
						var valuest=value.split(",");
						var values="";
						for(var i = 0;i < valuest.length; i++) {
							if(""==values){
								values=util.getValueBykeyDic('ill_type',valuest[i]);
							}else{
								values=values+","+util.getValueBykeyDic('ill_type',valuest[i]);
							}
						}
						return values;
					 }
				},
				{field:'chronic_type',title:'慢性病类型',width:150,
					formatter:function(value){
						if(value==null||""==value){return "";}
						var valuest=value.split(",");
						var values="";
						for(var i = 0;i < valuest.length; i++) {
							if(""==values){
								values=util.getValueBykeyDic('mbtype',valuest[i]);
							}else{
								values=values+","+util.getValueBykeyDic('mbtype',valuest[i]);
							}
						}
						return values;
					}
				},
				{field:'exam_date',title:'最近体检时间',width:250},
				{field:'id',title:'操作',width:85,
					formatter:function(value){  
//						var hm = '<a href="javascript:openedit('+value+')">详情</a>&nbsp;<a href="javascript:openmedirec('+value+')">电子病历</a>&nbsp;';
						var hm = '<a href="javascript:openmedirec('+value+')">电子病历</a>&nbsp;';
						return hm;
					}
				}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

function openedit(id){
	$('#diagnose_table').datagrid('selectRecord',id);
	var rowInfo =  $('#diagnose_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息 
		$('#pr').val(rowInfo.pr);
		$('#sys').val(rowInfo.sys);
		$('#dia').val(rowInfo.dia);
		$('#glu0').val(rowInfo.glu0);
		$('#glu1').val(rowInfo.glu1);
		$('#glu2').val(rowInfo.glu2);
		$('#height').val(rowInfo.height);
		$('#weight').val(rowInfo.weight);
		$('#bmi').val(rowInfo.bmi);
		$('#ubg').val(rowInfo.ubg);
		$('#spo2').val(rowInfo.spo2);
		$('#pr2').val(rowInfo.pr2);
		$('#leu').val(rowInfo.leu);
		$('#nit').val(rowInfo.nit);
		$('#ubg').val(rowInfo.ubg);
		$('#ph').val(rowInfo.ph);
		$('#bld').val(rowInfo.bld);
		$('#glu').val(rowInfo.glu);
		$('#ket').val(rowInfo.ket);
		$('#pro').val(rowInfo.pro);
		$('#bil').val(rowInfo.bil);
		$('#vc').val(rowInfo.vc);
		$('#sg').val(rowInfo.sg);
		$('#user_detail_dialog').dialog('open');
}
}


function doctordeal(id){
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

function dealResult(){//text
	
//	for ( var i = 0; i < 6; i++) {
//		   var text0i="";
//			 var texti = $("input:checkbox[name='chronic_type"+i+"']:checked").map(function(index,elem) {
//		       return $(elem).val();
//		      }).get().join(',');
//			 if(texti != '' ){
//				 text0i = $("input:checkbox[name='inspect"+i+"']:checked").map(function(index,elem) {
//			      return $(elem).val();
//			      }).get().join(',');
//			 }	
//			 texti=texti+"*"+text0i;
//			 parameter.push(parameter['FIT-texti'] =texti);
//	}
	text="";
	$("input[name='chronic_type']").each(function(){
		if (this.checked ==true) {
			var texttem=this.value;
			var checkChildId=this.id.replace('id', '')
			checkChildId=checkChildId.replace('M', '')
			$("input[name='inspectname"+checkChildId+"']").each(function(){
				if (this.checked ==true) {
					texttem=texttem+"|"+this.value;
				}
			});
			if(text==""){
				text=texttem;
			}else{
				text=text+"$"+texttem;
			}
			
		}
	});
//	var text01="";
//	 text0 = $("input:checkbox[name='chronic_type0']:checked").map(function(index,elem) {
//     return $(elem).val();
//    }).get().join(',');
//	 if(text0 != ''  ){
//		 text01 = $("input:checkbox[name='inspect0']:checked").map(function(index,elem) {
//	      return $(elem).val();
//	      }).get().join(',');
//		 text0=text0+","+text01;
//		 if(text01==""){
//			 text0="";
//		 }
//		
//	 }
//	 
//	 
//	var text11="";
//	text1 = $("input:checkbox[name='chronic_type1']:checked").map(function(index,elem) {
//      return $(elem).val();
//     }).get().join(',');
//	 if(text1 != ''  ){
//		 text11 = $("input:checkbox[name='inspect1']:checked").map(function(index,elem) {
//	      return $(elem).val();
//	      }).get().join(',');
//		 text1=text1+","+text11;
//		 if(text11==""){
//			 text1="";
//		 }
//		
//	 }
//	 
//	 
//	   var text21="";
//		 text2 = $("input:checkbox[name='chronic_type2']:checked").map(function(index,elem) {
//	       return $(elem).val();
//	      }).get().join(',');
//		 if(text2 !='' ){
//			 text21= $("input:checkbox[name='inspect2']:checked").map(function(index,elem) {
//		      return $(elem).val();
//		      }).get().join(',');
//			 text2=text2+","+text21;
//			 if(text21==""){
//				 text2="";
//			 }
//			
//		 }
//		
//		 
//		 
//		 
//		 
//		 
//			var text31="";
//			 text3 = $("input:checkbox[name='chronic_type3']:checked").map(function(index,elem) {
//		     return $(elem).val();
//		    }).get().join(',');
//			 if(text3 != ''  ){
//				 text31 = $("input:checkbox[name='inspect3']:checked").map(function(index,elem) {
//			      return $(elem).val();
//			      }).get().join(',');
//				 text3=text3+","+text31;
//				 if(text31==""){
//					 text3="";
//				 }
//				 
//			 }
//			 
//			text41="";
//			 var text4 = $("input:checkbox[name='chronic_type4']:checked").map(function(index,elem) {
//		      return $(elem).val();
//		     }).get().join(',');
//			 if(text4 != ''  ){
//				 text11 = $("input:checkbox[name='inspect4']:checked").map(function(index,elem) {
//			      return $(elem).val();
//			      }).get().join(',');
//				 text4=text4+","+text41;
//				 if(text41==""){
//					 text4="";
//				 }
//				 
//			 }
//			
//			   var text51="";
//				 text5 = $("input:checkbox[name='chronic_type5']:checked").map(function(index,elem) {
//			       return $(elem).val();
//			      }).get().join(',');
//				 if(text5 !='' ){
//					 text51= $("input:checkbox[name='inspect5']:checked").map(function(index,elem) {
//				      return $(elem).val();
//				      }).get().join(',');
//					 text5=text5+","+text51;
//					 if(text51==""){
//						 text5="";
//					 }
//					
//				 }
	
			
			$('#user_detail_dialog').dialog('close');
}

function openGroupPush(param){
	$('#user_detail_dialog').dialog('open');
}
function autoselect(index){
	
}

function openmedirec(id)
{
	$('#diagnose_table').datagrid('selectRecord',id);
	var rowInfo =  $('#diagnose_table').datagrid('getSelected');
	if(rowInfo != null && rowInfo.vip_code != null)
	{
		window.open('medirec/show.html?vipCode='+rowInfo.vip_code);
	}
}

function isPInt(str) {
	var g = /^[1-9]*[1-9][0-9]*$/;
	return g.test(str);
}

function mbselect(type,ins){
	if("-1"==ins){
		 $("input[id='id"+type+"M']").each(function(){
	         if (this.checked ==true) {
	        	 $("#id"+type+"0").prop("checked",true);
	        	 $("#id"+type+"1").prop("checked",true);
	         }else{
	        	 $("#id"+type+"0").prop("checked",false);
	        	 $("#id"+type+"1").prop("checked",false);
	         }
	    });
	}else{
		$("input[id='id"+type+"0']").each(function(){
	         if (this.checked ==true) {
	        	 $("#id"+type+"M").prop("checked",true);
	        	 return false;
	         }else{
	        	 $("input[id='id"+type+"1']").each(function(){
	     			if (this.checked !=true) {
	     				$("#id"+type+"M").prop("checked",false);
	     				return false;
	     			}else{
	     				$("#id"+type+"M").prop("checked",true);
	     				return false;
	     			}
	     		});
	         }
	    });
		$("input[id='id"+type+"1']").each(function(){
			if (this.checked ==true) {
				$("#id"+type+"M").prop("checked",true);
				return false;
			}else{
	        	 $("input[id='id"+type+"0']").each(function(){
		     			if (this.checked !=true) {
		     				$("#id"+type+"M").prop("checked",false);
		     				return false;
		     			}else{
		     				$("#id"+type+"M").prop("checked",true);
		     				return false;
		     			}
		     		});
		         }
		});
	}
	
}






