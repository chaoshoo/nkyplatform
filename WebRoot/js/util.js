function checkPartnerLoginName(val) {
	var regex = /^[0-9a-zA-Z_]{1,}$/;
	return regex.test(val);
}

function checkUser(val) {
	var regex = /^[a-zA-z]\w{3,15}$/;
	return regex.test(val);
}

function checkMobile(val) {
	var regex = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|177)\d{8}$/;
	return regex.test(val);
}

function checkPhone(val) {
   var regex = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
   return regex.test(val);
}

function isQQ(val) {
	var regex = /^[1-9][0-9]{4,9}$/;
    return regex.test(val);
}  

function checkEmail(val) {
	var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	return regex.test(val);
}

function checkUrl(url) {// 验证url
	var regex = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	+ "|" // 允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // 端口- :80
	+ "((/?)|" // a slash isn't required if there is no file name
	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var regExp = new RegExp(regex);
	return regExp.test(url);
}

function checkPos(val) {
	var regExp = new RegExp("^[A-Za-z0-9]+$");
	return regExp.test(val);
}

//身份证校验,成功返回true
function validateIdCard(obj) {
	var aCity = {11 : "北京", 12 : "天津", 13 : "河北", 14 : "山西", 15 : "内蒙古", 21 : "辽宁", 22 : "吉林", 23 : "黑龙江", 31 : "上海", 32 : "江苏", 33 : "浙江", 34 : "安徽", 35 : "福建", 36 : "江西", 37 : "山东", 41 : "河南", 42 : "湖北", 43 : "湖南", 44 : "广东", 45 : "广西", 46 : "海南", 50 : "重庆", 51 : "四川", 52 : "贵州", 53 : "云南", 54 : "西藏", 61 : "陕西", 62 : "甘肃", 63 : "青海", 64 : "宁夏", 65 : "新疆", 71 : "台湾", 81 : "香港", 82 : "澳门", 91 : "国外" };
	var iSum = 0;
	var strIDno = obj;
	var idCardLength = strIDno.length;
	if (!/^\d{17}(\d|x)$/i.test(strIDno) && !/^\d{15}$/i.test(strIDno))
		return false; // 非法身份证号
	if (aCity[parseInt(strIDno.substr(0, 2))] == null)
		return false;// 非法地区
	// 15位身份证转换为18位
	if (idCardLength == 15) {
		sBirthday = "19" + strIDno.substr(6, 2) + "-" + Number(strIDno.substr(8, 2)) + "-" + Number(strIDno.substr(10, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"))
		var dd = d.getFullYear().toString() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		if (sBirthday != dd)
			return false; // 非法生日
		strIDno = strIDno.substring(0, 6) + "19" + strIDno.substring(6, 15);
		strIDno = strIDno + GetVerifyBit(strIDno);
	}
	// 判断是否大于2078年，小于1900年
	var year = strIDno.substring(6, 10);
	if (year < 1900 || year > 2078)
		return false;// 非法生日
	// 18位身份证处理
	// 在后面的运算中x相当于数字10,所以转换成a
	strIDno = strIDno.replace(/x$/i, "a");
	sBirthday = strIDno.substr(6, 4) + "-" + Number(strIDno.substr(10, 2))
			+ "-" + Number(strIDno.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"))
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate()))
		return false; // 非法生日
	// 身份证编码规范验证
	for ( var i = 17; i >= 0; i--)
		iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
	if (iSum % 11 != 1)
		return false;// 非法身份证号
	// 判断是否屏蔽身份证
	var words = new Array();
	words = new Array("11111119111111111", "12121219121212121");
	for ( var k = 0; k < words.length; k++) {
		if (strIDno.indexOf(words[k]) != -1) {
			return false;
		}
	}
	return true;
}

// 银行卡号校验
// Description: 银行卡号Luhm校验
// Luhm校验规则：16位银行卡号（19位通用）:
// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。
function luhmCheck(bankno){
	if (bankno.length < 16 || bankno.length > 19) {
		// $("#banknoInfo").html("银行卡号长度必须在16到19之间");
		return false;
	}
	var num = /^\d*$/;  // 全数字
	if (!num.exec(bankno)) {
		// $("#banknoInfo").html("银行卡号必须全为数字");
		return false;
	}
	// 开头6位
	var strBin = "10, 18, 30, 35, 37, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 62, 65, 68, 69, 84, 87, 88, 94, 95, 98, 99";    
	if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
		// $("#banknoInfo").html("银行卡号开头6位不符合规范");
		return false;
	}
    var lastNum = bankno.substr(bankno.length - 1, 1);// 取出最后一位（与luhm进行比较）
    var first15Num = bankno.substr(0,bankno.length - 1);// 前15或18位
    var newArr = new Array();
    for(var i = first15Num.length - 1; i > -1; i--) {    // 前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  // 奇数位*2的积 <9
    var arrJiShu2 = new Array(); // 奇数位*2的积 >9
    var arrOuShu = new Array();  // 偶数位数组
    for(var j = 0; j < newArr.length; j++) {
        if((j + 1) % 2 == 1) {// 奇数位
            if(parseInt(newArr[j]) * 2 < 9)
            arrJiShu.push(parseInt(newArr[j]) * 2);
            else
            arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else // 偶数位
        arrOuShu.push(newArr[j]);
    }
    var jishu_child1 = new Array();// 奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();// 奇数位*2 >9 的分割之后的数组十位数
    for(var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }        
    var sumJiShu = 0; // 奇数位*2 < 9 的数组之和
    var sumOuShu = 0; // 偶数位数组之和
    var sumJiShuChild1 = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for(var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }
    for(var n = 0; n < arrOuShu.length; n++){
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }
    for(var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }      
    // 计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    // 计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;        
    var luhm = 10-k;
    if(lastNum == luhm) {
    	$("#banknoInfo").html("Luhm验证通过");
    	return true;
    } else {
    	$("#banknoInfo").html("银行卡号必须符合Luhm校验");
    	return false;
    }   
}

String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
}

String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
}

String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
}

Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+" : this.getMonth() + 1, //月份 
		"d+" : this.getDate(), //日 
		"h+" : this.getHours(), //小时 
		"m+" : this.getMinutes(), //分 
		"s+" : this.getSeconds(), //秒 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
		"S" : this.getMilliseconds()
	//毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};