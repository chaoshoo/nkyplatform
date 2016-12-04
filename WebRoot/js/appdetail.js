$(function() {
	djl();//Click volume
	$("#help_sy").hover(function(){
		$(this).next(".help_tip").toggle();
	});
});


function changeName() {
	/*var appId = $("#app_name").val();
	location.reload() ;
	$("#app_name").val(appId);*/
	djl();//Click volume

}
function getAppTableDataInit() {
	var appId = $("#app_name").val();
	var end = $(".end").text();
	var start = $(".start").text();
	
	$.ajax({
		type : "get",
		async:false,
		url : "../stat/detail.html?trCode=rpt_appbasedata_detail&qtype=tab&appid="
				+ appId + "&startday=" + start + "&endday="
				+ end + "&initq=true&r="+Math.random(),
		dataType : "text",
		success : function(msg) {
			$("#datadetail").html(msg);
		}
	});
}
function clickGetAppDataLine(type) {
	var end = $(".end").text();
	var start = $(".start").text();
	
	var appid = $("#app_name").val();
	$.ajax({
		type : "post",
		async:false,
		url : "XAndYline.json",
		data : "&app_id=" + appid + "&column=" + type
				+ "&endday=" + end + "&startday=" + start,
		success : function(msg) {
			var j = 1;
			var count = msg.length;
			if(count>=0&&count<9){
				j=1;
			}else if(count>=9&&count<18){
				j=2;
			}else if(count>=18&&count<27){
				j=3;
			}else if(count>=27&&count<36){
				j=4;
			}else{
				j=10;
			}
			var appeventtime = new Array(msg.length);
			var appdata = new Array(msg.length);
			for (var i = 0; i < msg.length; i++) {
				var app = msg[i];
				appeventtime[i] = app["appeventtime"];
				appdata[i] = app["appdata"];
			}
			$("#chartsTJ").highcharts({
				chart : {
					type : 'area'
				},
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					tickInterval : j,

					categories : appeventtime,
					labels : {

					}
				},
				yAxis : {
					title : {
						text : ''
					},
					labels : {
						formatter : function() {
							return this.value;
						}
					}
				},
				tooltip : {
					pointFormat : '<b>{point.y:,.0f}</b><br/>'
				},

				series : [ {
					name :  start+'---'+end,
					data : appdata
				} ]
			});
			getAppTableDataInit() ;
		}
	});
}

// APP点击量
function djl() {
	var type = "DjlPv";
	clickGetAppDataLine(type);
	$("#selectId").addClass("selected")
				  .siblings().removeClass("selected");
}
// APP安装量
function azl() {
	var type = "AzlPv";
	clickGetAppDataLine(type);
}
// APP启动量
function qdl() {
	var type = "QdlPv";
	clickGetAppDataLine(type);
}
// APP卸载量
function xzl() {
	var type = "XzlPv";
	clickGetAppDataLine(type);
}
// 付费用户数
function payUv() {
	var type = "PayUser";
	clickGetAppDataLine(type);
}