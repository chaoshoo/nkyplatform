
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
		$('#apply_hzs_a').text('Cooperative business(store)Apply');
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
	map.enableScrollWheelZoom();//Enable roller zoom，Default disable。
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
	/**MapAPIControl provided in the：
	Control：Abstract base class for a control，All controls inherit this kind of method.、attribute。Through this class you can implement a custom control。
	NavigationControl：Map translation zoom control，Default is located on the top left of the map，It contains the function of controlling the translation and scaling of the map.。
	OverviewMapControl：Thumbnail map，The default is located in the lower right of the map，Is a foldable thumbnail map。
	ScaleControl：Scale bar control，Default is located on the bottom left of the map，Show the scale of the map。
	MapTypeControl：Map type control，The default is located on the top right of the map。
	CopyrightControl：Copyright control，Default is located on the bottom left of the map。
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
	/**MapAPIThe following cover is provided：
	Overlay：An abstract base class for an overlay，All of the methods are inherited by the cover.。
	Marker：A point on a map.，Icon can be customized。
	Label：Text annotation on a map，You can customize the text content。
	Polyline：Represents a line on a map。
	Polygon：Represents a polygon on a map。Polygonal similar to a closed line，In addition, you can add color to fill。
	Circle: Represents a circle on a map。
	InfoWindow：Information window is a special kind of covering.，It can show more rich text and multimedia information.。Be careful：At the same time, there is only one message window open on the map.。
	have access tomap.addOverlayMethod to add coverage to the map，Usemap.removeOverlayMethod remove cover，Note that this method does not apply toInfoWindow。
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
			width : 250, // Information window width
			height : 150, // Information window height
			title : "current page" // Information window title
		}
		var addComp = rs.addressComponents;
		var addr = "current page：" + addComp.province + ", " + addComp.city + ", "
				+ addComp.district + ", " + addComp.street + ", "
				+ addComp.streetNumber + "<br/>";
		addr += "latitude: " + pt.lat + ", " + "longitude：" + pt.lng;
		var infoWindow = new BMap.InfoWindow(addr, opts); // Create an information window object
		marker.openInfoWindow(infoWindow);
	} 
	
	map.addEventListener("click", function(e) {//Map click event
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
	function iploac(result) {// according toIPSet map Center
		var cityName = result.name;
		map.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(iploac);
	function sear(result) {// Map search
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
	    $('.weui_btn weui_btn_primary').removeAttr('onclick');//Get rid ofaTag inonclickEvent
//		var is_qc_flag = "N";
//		var is_refund_flag = $('input:radio[name="is_refund_flag"]:checked').val();
//		var is_exchange_flag = $('input:radio[name="is_exchange_flag"]:checked').val();
//		if("Y" == is_refund_flag || "Y" == is_exchange_flag) {
//			is_qc_flag = "Y";
//		}
	    $.messager.progress({title : "Data submission", msg : "Data submission，One moment please……"});
		var object = $.serializeObject($("#addPartnerForm"));
//		object.login_name = $("#partner_login_name").val();
//		object.is_qc_flag = is_qc_flag;
		var option = "Newly added";
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
					$.messager.alert('Prompt', option + "Data submitted，Please wait for auditing！", "info", function() {
						if (is_store == 'Y' || is_partner == 'Y') {
							window.close();
						} else {
							window.location.href="login.html";
						}
					});
				} else {
					$.messager.alert('Prompt', data.msg);
				}
			},
			fail:function() {
				$.messager.progress('close');
				$.messager.alert('Prompt', "Failed to call interface！");
			}
		});
};


function saveFranchisee() {
	//新增加盟商校验
    	if(!checkFranchiseeParam()){
    	return;
    	}
    	$('.weui_btn weui_btn_primary').removeAttr('onclick');//Get rid ofaTag inonclickEvent
    	$.messager.progress({title : "Data submission", msg : "Data submission，One moment please……"});
		var object = $.serializeObject($("#addFranchiseeForm"));
		var franchisee_pwd =$("#franchisee_pwd").val();
		
		var option = "Newly added";
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
				$.messager.alert('Prompt', option + "Data submitted，Please wait for auditing！", "info", function() { 
					if (is_franchisee == 'Y') {
						window.close();
					} else {
						window.location.href="login.html";
					}
				});
			} else {
				$.messager.alert('Prompt', data.msg);
			}
		},
		fail:function() {
			$.messager.progress('close');
			$.messager.alert('Prompt', "Failed to call interface！");
		}
	});
};

function checkFranchiseeParam(){
	
	
	var franchisee_login =$("#franchisee_login").val();
	if(franchisee_login == null || franchisee_login == "" || franchisee_login == undefined) {
		$.messager.alert('Prompt', "Please enter a user name");
		return false;
	}
	

	if(!checkSpecial(franchisee_login,"Join in business user name")){
			return false;
		}
	if(!checkLength(franchisee_login,32,"Please enter a user name")){
			return false;
	}
	
	var franchisee_pwd =$("#franchisee_pwd").val();
	if(franchisee_pwd == null || franchisee_pwd == "" || franchisee_pwd == undefined) {
		$.messager.alert('Prompt', "Please enter the joining trader login password");
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
		$.messager.alert('Prompt', "Please enter the name of the merchant");
		return false;
	}
	
	if(!checkSpecial(franchisee_name,"Merchant name")){
		return false;
	}
	if(!checkLength(franchisee_name,32,"Merchant name")){
		return false;
	}
	
	
	var area_id = $("#area_id").val();
	if(area_id == null || area_id == "" || area_id == undefined) {
		$.messager.alert('Prompt', "Please select the location of the franchisee！");
		return false;
	}
	
	var addr_detail = $("#addr_detail").val();
	if(addr_detail == null || addr_detail == "" || addr_detail == undefined) {
		$.messager.alert('Prompt', "Please enter the details of the franchisee.！");
		return false;
	}
	
	if(!checkSpecial(addr_detail,"Join in business address")){
		return false;
	}
	if(!checkLength(addr_detail,128,"Join in business address")){
		return false;
	}
	
	var franchisee_lagal_name = $("#franchisee_lagal_name").val();
	if(franchisee_lagal_name == null || franchisee_lagal_name == "" || franchisee_lagal_name == undefined) {
		$.messager.alert('Prompt', "Please enter the name of the corporation`s legal person！");
		return false;
	}
	
	if(!checkSpecial(franchisee_lagal_name,"Corporate name of the franchisee")){
		return false;
	}
	if(!checkLength(franchisee_lagal_name,32,"Corporate name of the franchisee")){
		return false;
	}
	
	var  fmobile = $("#fmobile").val();
	if(fmobile == null || fmobile == "" || fmobile == undefined ) {
		$.messager.alert('Prompt', "Please enter the franchisee contact！");
		return false;
	}else {
		if(!checkMobile(fmobile)){
			$.messager.alert('Prompt', "Please enter the correct connection mode！");
			return  false;
		}
		
	}
	
	
	var  content = $("#content").val();
	if(!checkSpecial(content,"Franchisee application instructions")){
		return false;
	}
	return true;
	
}






function checkParam() {
	
	
	var logins=$("#login").val();
	if(logins == null || logins == "" || logins == undefined) {
		$.messager.alert('Prompt', "Please enter a user login user name");
		return false;
	}
//	 if (!/^(\d|[a-zA-Z])+$/.test(clipboard)){
//		 $.messager.alert('提示', "用户名只允许输入数字和英文");
//		 return false;
//	 }
	
	if(!checkSpecial(logins,"Partner login user name")){
		return false;
	}
	if(!checkLength(logins,32,"Partner login user name")){
		return false;
	}
	
	var pwds=$("#pwd").val();
	if(pwds == null || pwds == "" || pwds == undefined) {
		$.messager.alert('Prompt', "Please enter the login password");
		return false;
	}
	if(!isChn(pwds)){
		return false;
	}
	
	var is_direct =$("#is_direct").val();
	if(is_direct == null || is_direct == "" || is_direct == undefined) {
		$.messager.alert('Prompt', "Please choose whether or not the official direct");
		return false;
	}
	
	var partner_service_type = $("input[name=partner_service_type]:checked").val();
	if(partner_service_type == null || partner_service_type == "" || partner_service_type == undefined){
		$.messager.alert('Prompt', "Please select the type of service");
        return false;
    }
	
	
	var partner_service_time =$("#partner_service_time").val();
	if(partner_service_time == null || partner_service_time == "" || partner_service_time == undefined) {
		$.messager.alert('Prompt', "Please enter service time");
		return false;
	}
	
	if(!checkLength(partner_service_time,32,"service time")){
		return false;
	}
	
	
	var partner_name = $("#partner_name").val();
	if(partner_name == null || partner_name == "" || partner_name == undefined) {
		$.messager.alert('Prompt', "Please enter a cooperative merchant said！");
		return false;
	}
	
	if(!checkSpecial(partner_name,"Cooperative businesses said")){
		return false;
	}
	if(!checkLength(partner_name,32,"Cooperative businesses said")){
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
		$.messager.alert('Prompt', "Please enter a service call！");
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
		$.messager.alert('Prompt', "Please enter the partners of the mobile phone number or telephone number，These two items must be filled in！");
		return false;
	} else {
		if(mobile != null && mobile != "" && mobile != undefined && !checkMobile(mobile)) {
			$.messager.alert('Prompt', "Phone number format is not correct！");
			return false;
		}
		if(phone != null && phone != "" && phone != undefined && !checkPhone(phone)) {
			$.messager.alert('Prompt', "Landline number is not correct！");
			return false;
		}
	}
	
	var cert_type = $("#cert_type").val();
	if(cert_type != null && cert_type != "" && cert_type != undefined) {
		var paper_number = $("#paper_number").val();
		if(paper_number == null || paper_number == "" || paper_number == undefined) {
			$.messager.alert('Prompt', "Enter your partner`s certificate number！");
			return false;
		} else {
			if("2BA" == cert_type && !validateIdCard(paper_number)) {
				$.messager.alert('Prompt', "ID card format is not correct！");
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
		$.messager.alert('Prompt', "Please select the partner provinces cities and counties！");
		return false;
	}
	
	var address = $("#address").val();
	if(address == null || address == "" || address == undefined) {
		$.messager.alert('Prompt', "Please enter the details of the partner.！");
		return false;
	}
	
	if(!checkSpecial(address,"Cooperative business address")){
		return false;
	}
	if(!checkLength(address,128,"Cooperative business address")){
		return false;
	}

	
	var account = $("#account").val();
	if(account == null || account == "" || account == undefined) {
		$.messager.alert('Prompt', "Please enter the bank account number！");
		return false;
	} else {
		if(account.length < 12 || account.length > 19) {
			$.messager.alert('Prompt', "The length of the bank card number must be12reach19Between！");
			return false;
		} else {
			var num = /^\d*$/;  // all-digital
			if (!num.exec(account)) {
				$.messager.alert('Prompt', "Bank card number must be digits！");
				return false;
			} else {
				// 开头6位
				var strBin = "10, 18, 30, 35, 37, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 62, 65, 68, 69, 84, 87, 88, 94, 95, 98, 99";    
				if (strBin.indexOf(account.substring(0, 2)) == -1) {
					$.messager.alert('Prompt', "Start of bank card number6Bit does not conform to the specification！");
					return false;
				}
			}
		}
	}
	
	
	
	
	
	var account_name = $("#account_name").val();
	if(account_name == null || account_name == "" || account_name == undefined) {
		$.messager.alert('Prompt', "Please enter the name of the recipient of the partner.！");
		return false;
	}
	
	
//	var home_url = $("#home_url").val();
//	if( home_url!="" && !checkUrl(home_url)){
//			$.messager.alert('提示', "合作商的企业网址不正确！");
//			return false;
//		}
	
	var partner_legal = $("#partner_legal").val();
	if(partner_legal == null || partner_legal == "" || partner_legal == undefined) {
		$.messager.alert('Prompt', "Please input artificial person!");
		return false;
	}
	if(!checkSpecial(partner_legal,"Artificial person")){
		return false;
	}
	if(!checkLength(partner_legal,32,"Artificial person")){
		return false;
	}
	
//	var partner_level = $("#partner_level").val();
//	if(partner_level == null || partner_level == "" || partner_level == undefined) {
//		$.messager.alert('提示', "请选择商户级别!");
//		return false;
//	}
	

	var partner_license_name = $("#partner_license_name").val();
	if(partner_license_name == null || partner_license_name == "" || partner_license_name == undefined) {
		$.messager.alert('Prompt', "Please enter the name on business license!");
		return false;
	}
	if(!checkSpecial(partner_license_name,"Name on business license")){
		return false;
	}
	if(!checkLength(partner_license_name,64,"Name on business license")){
		return false;
	}
	
	var partner_license_nbr = $("#partner_license_nbr").val();
	if(partner_license_nbr == null || partner_license_nbr == "" || partner_license_nbr == undefined) {
		$.messager.alert('Prompt', "Please enter the business license number!");
		return false;
	}
	if(!checkSpecial(partner_license_nbr,"Business license number")){
		return false;
	}
	if(!checkLength(partner_license_nbr,64,"Business license number")){
		return false;
	}
	
	var partner_license_exp_date =$("#partner_license_exp_date").datebox("getValue");
	if(partner_license_exp_date == null || partner_license_exp_date == "" || partner_license_exp_date == undefined) {
		$.messager.alert('Prompt', "Please select a business license expiration date");
		return false;
	}
	
	var partner_desc = $("#partner_desc").val();
	if(!checkSpecial(partner_desc,"Partner description")){
		return false;
	}
	var remark = $("#remark").val();
	if(!checkSpecial(remark,"Remarks")){
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
		$.messager.alert(titleInfo,'Upload picture failed！');
	}
}
function imgCallback2(name){
	if(name != null){
		name=name.replace(/"/g, "");
		$("#pic").val(name);
		$("#image_urlw").html('<img src="'+name+'" height="50" width="200" />');
	}else{
		$.messager.alert(titleInfo,'Upload picture failed！');
	}
}

function checkSpecial(value,message){
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); 
     if(pattern.test(value)){
    	 $.messager.alert('Prompt', "You entered"+message+"Contains special characters");
         return false;
     }else {
    	 return true;
     }
    
}


function checkLength(value,length,message){
	if(value.length>length){
		$.messager.alert('Prompt', "You entered"+message+"Exceed the max length"+length);
		return false;
	}else {
		 return true;
	}
}

function isChn(str){
    var reg =/^[\u4e00-\u9fa5]{0,}$/;
    if(reg.test(str)){
    $.messager.alert('Prompt', "The password you entered can not contain Chinese");
     return false;
    }
    return true;
}






/**
* @requires jQuery
* 
* takeformValue sequence of form elements to object
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
	
