
var is_store = null;

var is_partner = null;

var is_franchisee = null;

$(function() {
	
	$('#add_parent_image').click(function() {
		$("#partner_images").click();
	});
	
	$('#add_frinech_image').click(function() {
		$("#friench_images").click();
	});
	
	$.ajax({
        type : "get",
        url : "pubData/getDicList.json?dicType=license_name" ,
        async : false,
         cache: false,
         dataType: "json",
         success : function(data){
              var text = "";
              $.each( data, function(index, content){
                   text+='<option  value='+this.dicName+'>'+this.dicValue+'</option>';
                    });
              $("#partner_license_name").html(text);
         }
  });
	
	
	if ($('#isStore').val() == 'Y') {
		is_store = 'Y';
		$('#apply_jms_li').hide();
		$('#apply_hzs_a').text('合作商(门店)申请');
	}
	
	if ($('#isPartner').val() == 'Y') {
		is_partner = 'Y';
		$('#apply_jms_li').hide();
	}
	
	if ($('#isFranchisee').val() == 'Y') {
		is_franchisee = 'Y';
		$('#apply_hzs_li').hide();
		$(".nav-tabs li").removeClass("active");
		$(this).addClass("active");
		$(".contents").hide();
		$(".contents").eq($(this).index()).fadeIn(500);
	}
	
	$.ajax({
        type : "get",
        url : "pubData/getDicList.json?dicType=partner_service_type" ,
        async : false,
         cache: false,
         dataType: "json",
         success : function(data){
              var text = "";
              $.each( data, function(index, content){
                   text+='<input type= "checkbox" name ="partner_service_type" value='+this.dicName+":"+this.dicValue+'>&nbsp;'+this.dicValue+'&nbsp;&nbsp;';
                   
              
              
              });
              $( "#partner_service_types").html(text);
         }
  });
//	//服务时间
//	$('#partner_service_time').datebox({
//		panelWidth : 200,
//		editable : false,
//		formatter : function(date) {
//			sign_time_sel = date;
//			return date.getFullYear() + '-' + (date.getMonth() + 1) +  '-' + date.getDate();
//		}
//	});
//	
	//营业执照到期时间
	$('#partner_license_exp_date').datebox({
		panelWidth : 200,
		editable : false,
		formatter : function(date) {
			sign_time_sel = date;
			return date.getFullYear() + '-' + (date.getMonth() + 1) +  '-' + date.getDate();
		}
	});
	
	
	var map = new BMap.Map("container");
	map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用。
	var lon = $("#lon").val();
	var lat = $("#lat").val();
	if(lon == null || lon == "" || lon == undefined
			|| lat == null || lat == "" || lat == undefined) {
		lon = 114.250259;
		lat = 30.632318;
	}
	//创建点坐标
	var point = new BMap.Point(lon, lat);
	//初始化地图，设置中心点坐标和地图级别
	map.centerAndZoom(point, 13); 
	var gc = new BMap.Geocoder();
	/**地图API中提供的控件有：
	Control：控件的抽象基类，所有控件均继承此类的方法、属性。通过此类您可实现自定义控件。
	NavigationControl：地图平移缩放控件，默认位于地图左上方，它包含控制地图的平移和缩放的功能。
	OverviewMapControl：缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
	ScaleControl：比例尺控件，默认位于地图左下方，显示地图的比例关系。
	MapTypeControl：地图类型控件，默认位于地图右上方。
	CopyrightControl：版权控件，默认位于地图左下方。
	**/
	//NavigationControl 地图平移缩放控件，默认位于地图左上方 它包含控制地图的平移和缩放的功能。
	map.addControl(new BMap.NavigationControl()); 
	//OverviewMapControl 缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图
	map.addControl(new BMap.OverviewMapControl());
	//ScaleControl：比例尺控件，默认位于地图左下方，显示地图的比例关系。
	map.addControl(new BMap.ScaleControl());
	//MapTypeControl：地图类型控件，默认位于地图右上方。
	map.addControl(new BMap.MapTypeControl());
	//CopyrightControl：版权控件，默认位于地图左下方
	map.addControl(new BMap.CopyrightControl());
	/**地图API提供了如下几种覆盖物：
	Overlay：覆盖物的抽象基类，所有的覆盖物均继承此类的方法。
	Marker：标注表示地图上的点，可自定义标注的图标。
	Label：表示地图上的文本标注，您可以自定义标注的文本内容。
	Polyline：表示地图上的折线。
	Polygon：表示地图上的多边形。多边形类似于闭合的折线，另外您也可以为其添加填充颜色。
	Circle: 表示地图上的圆。
	InfoWindow：信息窗口也是一种特殊的覆盖物，它可以展示更为丰富的文字和多媒体信息。注意：同一时刻只能有一个信息窗口在地图上打开。
	可以使用map.addOverlay方法向地图添加覆盖物，使用map.removeOverlay方法移除覆盖物，注意此方法不适用于InfoWindow。
	**/
	// 创建标注  
	var marker = new BMap.Marker(point);   
	// 将标注添加到地图中
	map.addOverlay(marker);
	//监听标注事件
	//点击事件
	marker.addEventListener("click", function(e) {  
		$("#lon").val(e.point.lng);
		$("#lat").val(e.point.lat);
	});

	marker.enableDragging();
	// 监听标注的dragend事件来捕获拖拽后标注的最新位置
	marker.addEventListener("click", function(e) {  
		gc.getLocation(e.point, function(rs) {
			showLocationInfo(e.point, rs);
		});
	});
	// 显示地址信息窗口
	function showLocationInfo(pt, rs) {
		var opts = {
			width : 250, // 信息窗口宽度
			height : 150, // 信息窗口高度
			title : "当前位置" // 信息窗口标题
		}
		var addComp = rs.addressComponents;
		var addr = "当前位置：" + addComp.province + ", " + addComp.city + ", "
				+ addComp.district + ", " + addComp.street + ", "
				+ addComp.streetNumber + "<br/>";
		addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;
		var infoWindow = new BMap.InfoWindow(addr, opts); // 创建信息窗口对象
		marker.openInfoWindow(infoWindow);
	} 
	
	map.addEventListener("click", function(e) {//地图单击事件
		map.clearOverlays();
		var market = new BMap.Marker(e.point);
		map.addOverlay(market);
		market.setAnimation(BMAP_ANIMATION_BOUNCE);
		map.panTo(e.point);
		$("#lon").val(e.point.lng);
		$("#lat").val(e.point.lat);
	});
	
	// 创建交通流量图层实例
	//var traffic = new BMap.TrafficLayer();     
	// 将图层添加到地图上  
	//map.addTileLayer(traffic);   
	function iploac(result) {// 根据IP设置地图中心
		var cityName = result.name;
		map.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(iploac);
	function sear(result) {// 地图搜索
		var local = new BMap.LocalSearch(map, {
			renderOptions : {
				map : map
			}
		});
		local.search(result);
	}
	
	
	
});



function save() {
	//新增合作商校验
	    if(!checkParam()){
	    	return;
	    }
	    $('.weui_btn weui_btn_primary').removeAttr('onclick');//去掉a标签中的onclick事件
//		var is_qc_flag = "N";
//		var is_refund_flag = $('input:radio[name="is_refund_flag"]:checked').val();
//		var is_exchange_flag = $('input:radio[name="is_exchange_flag"]:checked').val();
//		if("Y" == is_refund_flag || "Y" == is_exchange_flag) {
//			is_qc_flag = "Y";
//		}
	    $.messager.progress({title : "数据提交", msg : "数据提交中，请稍等……"});
		var object = $.serializeObject($("#addPartnerForm"));
//		object.login_name = $("#partner_login_name").val();
//		object.is_qc_flag = is_qc_flag;
		var option = "新增";
//		var optionType = $("#optionType").val();
		var login = $("#login").val();
		var pwd=$("#pwd").val();
		var url = "partnerNew/addNewPartner.json?is_store=" + is_store+"&login="+login+"&pwd="+escape(pwd);
		var obj = JSON.stringify(object);
		obj = encodeURI(obj);
		$.ajax({
			dataType: 'json',
			url: url,
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			data: "param=" + obj,
			async: true,
			success:function(data) {
				$.messager.progress('close');
				if (data.code == 0) {
					$.messager.alert('提示', option + "数据提交成功，请等待审核！", "info", function() {
						if (is_store == 'Y' || is_partner == 'Y') {
							window.close();
						} else {
							window.location.href="login.html";
						}
					});
				} else {
					$.messager.alert('提示', data.msg);
				}
			},
			fail:function() {
				$.messager.progress('close');
				$.messager.alert('提示', "调用接口失败！");
			}
		});
};


function saveFranchisee() {
	//新增加盟商校验
    	if(!checkFranchiseeParam()){
    	return;
    	}
    	$('.weui_btn weui_btn_primary').removeAttr('onclick');//去掉a标签中的onclick事件
    	$.messager.progress({title : "数据提交", msg : "数据提交中，请稍等……"});
		var object = $.serializeObject($("#addFranchiseeForm"));
		var franchisee_pwd =$("#franchisee_pwd").val();
		
		var option = "新增";
		var optionType = $("#optionType").val();
		var url = "franchisee/addFranchisee.json?franchisee_pwd="+escape(franchisee_pwd);
		var obj = JSON.stringify(object);
		obj = encodeURI(obj);
		obj= obj;
	$.ajax({
		dataType: 'json',
		url: url,
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		data: "param=" + obj,
		async: true,
		success:function(data) {
			$.messager.progress('close');
			if (data.code == 0) {
				$.messager.alert('提示', option + "数据提交成功，请等待审核！", "info", function() { 
					if (is_franchisee == 'Y') {
						window.close();
					} else {
						window.location.href="login.html";
					}
				});
			} else {
				$.messager.alert('提示', data.msg);
			}
		},
		fail:function() {
			$.messager.progress('close');
			$.messager.alert('提示', "调用接口失败！");
		}
	});
};

function checkFranchiseeParam(){
	
	
	var franchisee_login =$("#franchisee_login").val();
	if(franchisee_login == null || franchisee_login == "" || franchisee_login == undefined) {
		$.messager.alert('提示', "请输入加盟商登录用户名");
		return false;
	}
	

	if(!checkSpecial(franchisee_login,"加盟商登录用户名")){
			return false;
		}
	if(!checkLength(franchisee_login,32,"请输入加盟商登录用户名")){
			return false;
	}
	
	var franchisee_pwd =$("#franchisee_pwd").val();
	if(franchisee_pwd == null || franchisee_pwd == "" || franchisee_pwd == undefined) {
		$.messager.alert('提示', "请输入加盟商登录密码");
		return false;
	}
	if(!isChn(franchisee_pwd)){
		return false;
	}
	
//	if(!isChn(franchisee_pwd)){
//		return false;
//	}

	var franchisee_name =$("#franchisee_name").val();
	if(franchisee_name == null || franchisee_name == "" || franchisee_name == undefined) {
		$.messager.alert('提示', "请输入商户名称");
		return false;
	}
	
	if(!checkSpecial(franchisee_name,"商户名称")){
		return false;
	}
	if(!checkLength(franchisee_name,32,"商户名称")){
		return false;
	}
	
	
	var area_id = $("#area_id").val();
	if(area_id == null || area_id == "" || area_id == undefined) {
		$.messager.alert('提示', "请选择加盟商所在地！");
		return false;
	}
	
	var addr_detail = $("#addr_detail").val();
	if(addr_detail == null || addr_detail == "" || addr_detail == undefined) {
		$.messager.alert('提示', "请输入加盟商的详细地址！");
		return false;
	}
	
	if(!checkSpecial(addr_detail,"加盟商的详细地址")){
		return false;
	}
	if(!checkLength(addr_detail,128,"加盟商的详细地址")){
		return false;
	}
	
	var franchisee_lagal_name = $("#franchisee_lagal_name").val();
	if(franchisee_lagal_name == null || franchisee_lagal_name == "" || franchisee_lagal_name == undefined) {
		$.messager.alert('提示', "请输入加盟商的法人姓名！");
		return false;
	}
	
	if(!checkSpecial(franchisee_lagal_name,"加盟商的法人姓名")){
		return false;
	}
	if(!checkLength(franchisee_lagal_name,32,"加盟商的法人姓名")){
		return false;
	}
	
	var  fmobile = $("#fmobile").val();
	if(fmobile == null || fmobile == "" || fmobile == undefined ) {
		$.messager.alert('提示', "请输入加盟商联系方式！");
		return false;
	}else {
		if(!checkMobile(fmobile)){
			$.messager.alert('提示', "请输入正确格式的联系方式！");
			return  false;
		}
		
	}
	
	
	var  content = $("#content").val();
	if(!checkSpecial(content,"加盟商申请说明")){
		return false;
	}
	return true;
	
}






function checkParam() {
	
	
	var logins=$("#login").val();
	if(logins == null || logins == "" || logins == undefined) {
		$.messager.alert('提示', "请输入合作商登录用户名");
		return false;
	}
//	 if (!/^(\d|[a-zA-Z])+$/.test(clipboard)){
//		 $.messager.alert('提示', "用户名只允许输入数字和英文");
//		 return false;
//	 }
	
	if(!checkSpecial(logins,"合作商登录用户名")){
		return false;
	}
	if(!checkLength(logins,32,"合作商登录用户名")){
		return false;
	}
	
	var pwds=$("#pwd").val();
	if(pwds == null || pwds == "" || pwds == undefined) {
		$.messager.alert('提示', "请输入登录密码");
		return false;
	}
	if(!isChn(pwds)){
		return false;
	}
	
	var is_direct =$("#is_direct").val();
	if(is_direct == null || is_direct == "" || is_direct == undefined) {
		$.messager.alert('提示', "请选择是否官方直营");
		return false;
	}
	
	var partner_service_type = $("input[name=partner_service_type]:checked").val();
	if(partner_service_type == null || partner_service_type == "" || partner_service_type == undefined){
		$.messager.alert('提示', "请选择服务类型");
        return false;
    }
	
	
	var partner_service_time =$("#partner_service_time").val();
	if(partner_service_time == null || partner_service_time == "" || partner_service_time == undefined) {
		$.messager.alert('提示', "请输入服务时间");
		return false;
	}
	
	if(!checkLength(partner_service_time,32,"服务时间")){
		return false;
	}
	
	
	var partner_name = $("#partner_name").val();
	if(partner_name == null || partner_name == "" || partner_name == undefined) {
		$.messager.alert('提示', "请输入合作商户称！");
		return false;
	}
	
	if(!checkSpecial(partner_name,"合作商户称")){
		return false;
	}
	if(!checkLength(partner_name,32,"合作商户称")){
		return false;
	}
	
//	var email = $("#email").val();
//	if(email == null || email == "" || email == undefined) {
//		$.messager.alert('提示', "请输入合作商的电子邮箱！");
//		return false;
//	} else {
//		if(!checkEmail(email)) {
//			$.messager.alert('提示', "电子邮箱格式不正确！");
//			return false;
//		}
//	}
	
	var  service_phone = $("#service_phone").val();
	
	if(service_phone == null || service_phone == "" || service_phone == undefined ) {
		$.messager.alert('提示', "请输入服务电话！");
		return false;
	}
//	else {
//		if(!checkPhone(service_phone) && !checkMobile(service_phone) && !checkPhone2(service_phone) ){
//			$.messager.alert('提示', "请输入正确格式的服务电话！");
//			return  false;
//		}
//		
//	}
	
	var phone = $("#phone").val();
	var mobile = $("#mobile").val();
	if((mobile == null || mobile == "" || mobile == undefined) 
			&& (phone == null || phone == "" || phone == undefined)) {
		$.messager.alert('提示', "请输入合作商的手机号码或座机号码，这两项必须填写一项！");
		return false;
	} else {
		if(mobile != null && mobile != "" && mobile != undefined && !checkMobile(mobile)) {
			$.messager.alert('提示', "手机号码格式不正确！");
			return false;
		}
		if(phone != null && phone != "" && phone != undefined && !checkPhone(phone)) {
			$.messager.alert('提示', "座机号码格式不正确！");
			return false;
		}
	}
	
	var cert_type = $("#cert_type").val();
	if(cert_type != null && cert_type != "" && cert_type != undefined) {
		var paper_number = $("#paper_number").val();
		if(paper_number == null || paper_number == "" || paper_number == undefined) {
			$.messager.alert('提示', "请输入合作商的证件号码！");
			return false;
		} else {
			if("2BA" == cert_type && !validateIdCard(paper_number)) {
				$.messager.alert('提示', "身份证格式不正确！");
				return false;
			}
		}
	}
	
//	var partner_bill_flag = $("#partner_bill_flag").val();
//	if(partner_bill_flag == null || partner_bill_flag == "" || partner_bill_flag == undefined) {
//		$.messager.alert('提示', "请选择合作商是否支持发票！");
//		return false;
//	}
	
	

//	var cash = $("#cash").val();
//	if(cash == null || cash == "" || cash == undefined) {
//		$.messager.alert('提示', "请输入合作商的保证金额！");
//		return false;
//	}
	

	var areaId = $("#areaId").val();
	if(areaId == null || areaId == "" || areaId == undefined) {
		$.messager.alert('提示', "请选择合作商省市县！");
		return false;
	}
	
	var address = $("#address").val();
	if(address == null || address == "" || address == undefined) {
		$.messager.alert('提示', "请输入合作商的详细地址！");
		return false;
	}
	
	if(!checkSpecial(address,"合作商的详细地址")){
		return false;
	}
	if(!checkLength(address,128,"合作商的详细地址")){
		return false;
	}

	
	var account = $("#account").val();
	if(account == null || account == "" || account == undefined) {
		$.messager.alert('提示', "请输入收款银行账号！");
		return false;
	} else {
		if(account.length < 12 || account.length > 19) {
			$.messager.alert('提示', "银行卡号长度必须在12到19之间！");
			return false;
		} else {
			var num = /^\d*$/;  // 全数字
			if (!num.exec(account)) {
				$.messager.alert('提示', "银行卡号必须全为数字！");
				return false;
			} else {
				// 开头6位
				var strBin = "10, 18, 30, 35, 37, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 62, 65, 68, 69, 84, 87, 88, 94, 95, 98, 99";    
				if (strBin.indexOf(account.substring(0, 2)) == -1) {
					$.messager.alert('提示', "银行卡号开头6位不符合规范！");
					return false;
				}
			}
		}
	}
	
	
	
	
	
	var account_name = $("#account_name").val();
	if(account_name == null || account_name == "" || account_name == undefined) {
		$.messager.alert('提示', "请输入合作商的收款人名称！");
		return false;
	}
	
	
//	var home_url = $("#home_url").val();
//	if( home_url!="" && !checkUrl(home_url)){
//			$.messager.alert('提示', "合作商的企业网址不正确！");
//			return false;
//		}
	
	var partner_legal = $("#partner_legal").val();
	if(partner_legal == null || partner_legal == "" || partner_legal == undefined) {
		$.messager.alert('提示', "请填写法人!");
		return false;
	}
	if(!checkSpecial(partner_legal,"法人")){
		return false;
	}
	if(!checkLength(partner_legal,32,"法人")){
		return false;
	}
	
//	var partner_level = $("#partner_level").val();
//	if(partner_level == null || partner_level == "" || partner_level == undefined) {
//		$.messager.alert('提示', "请选择商户级别!");
//		return false;
//	}
	

	var partner_license_name = $("#partner_license_name").val();
	if(partner_license_name == null || partner_license_name == "" || partner_license_name == undefined) {
		$.messager.alert('提示', "请输入营业执照名称!");
		return false;
	}
	if(!checkSpecial(partner_license_name,"营业执照名称")){
		return false;
	}
	if(!checkLength(partner_license_name,64,"营业执照名称")){
		return false;
	}
	
	var partner_license_nbr = $("#partner_license_nbr").val();
	if(partner_license_nbr == null || partner_license_nbr == "" || partner_license_nbr == undefined) {
		$.messager.alert('提示', "请输入营业执照号码!");
		return false;
	}
	if(!checkSpecial(partner_license_nbr,"营业执照号码")){
		return false;
	}
	if(!checkLength(partner_license_nbr,64,"营业执照号码")){
		return false;
	}
	
	var partner_license_exp_date =$("#partner_license_exp_date").datebox("getValue");
	if(partner_license_exp_date == null || partner_license_exp_date == "" || partner_license_exp_date == undefined) {
		$.messager.alert('提示', "请选择营业执照到期时间");
		return false;
	}
	
	var partner_desc = $("#partner_desc").val();
	if(!checkSpecial(partner_desc,"合作商描述")){
		return false;
	}
	var remark = $("#remark").val();
	if(!checkSpecial(remark,"备注")){
		return false;
	}
	
//	var staff_no = $("#staff_no").val();
//	if(staff_no == null || staff_no == "" || staff_no == undefined) {
//		$.messager.alert('提示', "请选择合作商的员工数量！");
//		return false;
//	}
	
	
	return true;
}

function imgCallback(name){
	if(name != null){
		name=name.replace(/"/g, "");
		$("#partner_image").val(name);
		$("#image_url").html('<img src="'+name+'" height="50" width="200" />');
	}else{
		$.messager.alert(titleInfo,'上传图片失败！');
	}
}
function imgCallback2(name){
	if(name != null){
		name=name.replace(/"/g, "");
		$("#pic").val(name);
		$("#image_urlw").html('<img src="'+name+'" height="50" width="200" />');
	}else{
		$.messager.alert(titleInfo,'上传图片失败！');
	}
}

function checkSpecial(value,message){
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); 
     if(pattern.test(value)){
    	 $.messager.alert('提示', "您输入的"+message+"包含特殊字符");
         return false;
     }else {
    	 return true;
     }
    
}


function checkLength(value,length,message){
	if(value.length>length){
		$.messager.alert('提示', "您输入的"+message+"超过最大长度"+length);
		return false;
	}else {
		 return true;
	}
}

function isChn(str){
    var reg =/^[\u4e00-\u9fa5]{0,}$/;
    if(reg.test(str)){
    $.messager.alert('提示', "您输入的密码不能包含中文");
     return false;
    }
    return true;
}






/**
* @requires jQuery
* 
* 将form表单元素的值序列化成对象
* 
* @returns object
*/
$.serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};
	

