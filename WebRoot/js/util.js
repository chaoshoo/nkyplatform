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

function checkUrl(url) {// Verificationurl
	var regex = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftpTheuser@
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IPFormURL- 199.194.52.184
	+ "|" // allowIPandDOMAIN（domain name）
	+ "([0-9a-z_!~*'()-]+\.)*" // domain name- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // Two level domain name
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // port- :80
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
	var aCity = {11 : "Beijing", 12 : "Tianjin", 13 : "Hebei", 14 : "Shanxi", 15 : "Inner Mongolia", 21 : "Liaoning", 22 : "Jilin", 23 : "Heilongjiang", 31 : "Shanghai", 32 : "Jiangsu", 33 : "Zhejiang", 34 : "Anhui", 35 : "Fujian", 36 : "Jiangxi", 37 : "Shandong", 41 : "Henan", 42 : "Hubei", 43 : "Hunan", 44 : "Guangdong", 45 : "Guangxi", 46 : "Hainan", 50 : "Chongqing", 51 : "Sichuan", 52 : "Guizhou", 53 : "Yunnan", 54 : "Tibet", 61 : "Shaanxi", 62 : "Gansu", 63 : "Qinghai", 64 : "Ningxia", 65 : "Xinjiang", 71 : "Taiwan", 81 : "Hong Kong", 82 : "Macao", 91 : "abroad" };
	var iSum = 0;
	var strIDno = obj;
	var idCardLength = strIDno.length;
	if (!/^\d{17}(\d|x)$/i.test(strIDno) && !/^\d{15}$/i.test(strIDno))
		return false; // Illegal ID card number
	if (aCity[parseInt(strIDno.substr(0, 2))] == null)
		return false;// Illegal area
	// 15位身份证转换为18位
	if (idCardLength == 15) {
		sBirthday = "19" + strIDno.substr(6, 2) + "-" + Number(strIDno.substr(8, 2)) + "-" + Number(strIDno.substr(10, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"))
		var dd = d.getFullYear().toString() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		if (sBirthday != dd)
			return false; // Illegal birthday
		strIDno = strIDno.substring(0, 6) + "19" + strIDno.substring(6, 15);
		strIDno = strIDno + GetVerifyBit(strIDno);
	}
	// 判断是否大于2078年，小于1900年
	var year = strIDno.substring(6, 10);
	if (year < 1900 || year > 2078)
		return false;// Illegal birthday
	// 18位身份证处理
	// 在后面的运算中x相当于数字10,所以转换成a
	strIDno = strIDno.replace(/x$/i, "a");
	sBirthday = strIDno.substr(6, 4) + "-" + Number(strIDno.substr(10, 2))
			+ "-" + Number(strIDno.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"))
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate()))
		return false; // Illegal birthday
	// 身份证编码规范验证
	for ( var i = 17; i >= 0; i--)
		iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
	if (iSum % 11 != 1)
		return false;// Illegal ID card number
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
	var num = /^\d*$/;  // all-digital
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
    var lastNum = bankno.substr(bankno.length - 1, 1);// Take out the last one（andluhmCompare）
    var first15Num = bankno.substr(0,bankno.length - 1);// ago15or18position
    var newArr = new Array();
    for(var i = first15Num.length - 1; i > -1; i--) {    // ago15or18Bit reverse into array
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  // Odd digit*2The product <9
    var arrJiShu2 = new Array(); // Odd digit*2The product >9
    var arrOuShu = new Array();  // Even number group
    for(var j = 0; j < newArr.length; j++) {
        if((j + 1) % 2 == 1) {// Odd digit
            if(parseInt(newArr[j]) * 2 < 9)
            arrJiShu.push(parseInt(newArr[j]) * 2);
            else
            arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else // Even bit
        arrOuShu.push(newArr[j]);
    }
    var jishu_child1 = new Array();// Odd digit*2 >9 After the split of the number of arrays
    var jishu_child2 = new Array();// Odd digit*2 >9 Ten digits of the array after the split
    for(var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }        
    var sumJiShu = 0; // Odd digit*2 < 9 Sum of arrays
    var sumOuShu = 0; // Sum of even number groups
    var sumJiShuChild1 = 0; // Odd digit*2 >9 After the segmentation of the sum of the number of arrays
    var sumJiShuChild2 = 0; // Odd digit*2 >9 The sum of the ten digits of the array after the segmentation.
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
    	$("#banknoInfo").html("LuhmVerified");
    	return true;
    } else {
    	$("#banknoInfo").html("Bank card number must be in line withLuhmcheck");
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
		"M+" : this.getMonth() + 1, //Month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //branch 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter 
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
 ** Additive function，Used to get accurate results.
 ** Explain：javascriptThe result of the addition will be error，It will be more obvious when the two floating point numbers are added together.。This function returns a more accurate addition result.。
 ** call：accAdd(arg1,arg2)
 ** Return value：arg1Addarg2Exact result
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
 ** Subtraction function，Used to obtain accurate results.
 ** Explain：javascriptThe subtraction results will be error，When two floating-point subtraction will be more pronounced.。This function returns the exact subtraction result。
 ** call：accSub(arg1,arg2)
 ** Return value：arg1Addarg2Exact result
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
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //Dynamic control precision length
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};

/**
 ** Multiplication function，Used to obtain accurate multiplication results
 ** Explain：javascriptThe multiplication result will have error，It is more obvious when the two floating point numbers are multiplied.。This function returns a more accurate result of the multiplication.。
 ** call：accMul(arg1,arg2)
 ** Return value：arg1Multiply arg2Exact result
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
 ** Division function，Used to obtain accurate division results.
 ** Explain：javascriptThe division result will be error.，When the two floating point division will be more obvious。This function returns the result of a more accurate division.。
 ** call：accDiv(arg1,arg2)
 ** Return value：arg1Dividearg2Exact result
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