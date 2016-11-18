//areaid_   需要对应地址id
//arealever_   需要对应地址级别
function loadArea(){
	var v = $("#areaid_").val();
	if(v!=null && v!=""){	
		$.ajax({
			url:'areatree/getTreepath.html?areaId='+v,
			success:function(msg){
				setArea($("#areaid_"), v, msg);
			},
			fail:function(){
				alert("area error");
			}
		});
	
	}else{	
		setArea($("#areaid_"), "", "");
	}
}
function setArea($areaId, area, treePath) {
	$areaId.attr("value",area);
	$areaId.attr("treePath", treePath);
	$areaId.lSelect({
		url: "areatree/area.json",
		level:$("#arealever_").val()
	});
}