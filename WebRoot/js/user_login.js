$(function() {
	$("#submit_login").click(function(){
		login();
	});
	$("#reset_login").click(function(){
		resetBtn();
	});
	
	$("#userMail").blur(function(){
		
		if($("#userMail").val()==null||$("#userMail").val()==""){
			$("#userMail").addClass("warm");
		}else{
			$("#userMail").removeClass("warm");
		}
	});
	$("#userPwd").blur(function(){
		//if(partnerFlag)return;
		if($("#userPwd").val()==null||$("#userPwd").val()==""){
			$("#userPwd").addClass("warm");
		}else{
			$("#userPwd").removeClass("warm");
		}
	});
	if (typeof(kaptcha)!='undefined') {
		$("#kaptcha").blur(function(){
			//if(partnerFlag)return;
			if($("#kaptcha").val()==null||$("#kaptcha").val()==""){
				$("#kaptcha").addClass("warm");
			}else{
				$("#kaptcha").removeClass("warm");
			}
		});
	}
	//$('input :eq(0)').focus();
	
	$("#userMail").change(function(){
		removeErrorInfo();
	});
	$("#userPwd").change(function(){
		removeErrorInfo();
	});
	if (typeof(kaptcha)!='undefined') {
		$("#kaptcha").change(function(){
			removeErrorInfo();
		});
	}
});

document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e.keyCode == 13) {
		login();
		return false;
	}
};

function login() {
	var flag = true;
	//.trim()
	var userMail = $("#userMail").val();
	var userPwd = $("#userPwd").val();
	var kaptcha = $("#kaptcha").val();
	if(userMail==""||userMail==null){
		//$("#userMail").addClass("warm");
		$("#userMail").focus();
		flag=false;
		return;
	}
	
	if(userPwd==""||userPwd==null){
		//$('#userPwd').addClass("warm");
		$('#userPwd').focus();
		flag=false;
		return;
	}

	if(flag){
		$("#loginForm").submit();
	}
}

function resetBtn(){
	$("input").val("");
}
function removeErrorInfo(){
	$("#loginerrorinfo").html("");
}
