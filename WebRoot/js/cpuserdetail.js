$(function() {
	lll();// 独立用户数
});

function getCpDataInit(){
	var end = $(".end").text();
	var start = $(".start").text();
	$.ajax({
		type : "get",
		url : "../stat/detail.html?trCode=rpt_cpbasedata_detail&qtype=tab&startday="
			+ start + "&endday="+ end + "&initq=true&r="+Math.random(),
		dataType : "text",
		success : function(msg) {
			$("#datadetail").html(msg);
		}
	});
} 

function clickGetDataLine(type) {
	var bluecp = $("#cpid").val();
	// 改select添加的代码块
	var end = $(".end").text();
	var start = $(".start").text();
	$
			.ajax({
				type : "post",
				url : "../data/XAndYline.json",
				data : "&column=" + type + "&bluecp=" + bluecp
						+ "&endday=" + end + "&startday=" + start,
				async:false,
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
					var cpeventtime = new Array(msg.length);
					var cpdata = new Array(msg.length);
					for (var i = 0; i < msg.length; i++) {
						var cp = msg[i];
						cpeventtime[i] = cp["cpeventtime"];
						cpdata[i] = cp["cpdata"];
					}
									$("#chartsTJ")
											.highcharts(
													{
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
															categories : cpeventtime,
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
															name : start+'---'+end,
															data : cpdata
														} ]
													});
								}
							});
	getCpDataInit();
			
}
function dlUser() {
	var type = "BlueCpViewUv";
	clickGetDataLine(type);
}
function lll() {
	var type = "BlueCpViewPv";
	clickGetDataLine(type);
	$("#selectIdCp").addClass("selected")
	  .siblings().removeClass("selected");

}
function yearUser() {
	var type = "PayYearUser";
	clickGetDataLine(type);
}
function halfYearUser() {
	var type = "PayHalfYearUser";
	clickGetDataLine(type);
}
function monthUser() {
	var type = "PayMonthUser";
	clickGetDataLine(type);
}