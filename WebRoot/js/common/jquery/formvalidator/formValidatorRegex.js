var regexEnum = {
	intege : "^-?[1-9]\\d*$", // integer
	intege1 : "^[1-9]\\d*$", // positive integer
	intege2 : "^-[1-9]\\d*$", // Negtive integer
	num : "^([+-]?)\\d*\\.?\\d+$", // number
	num1 : "^[1-9]\\d*|0$", // Positive（positive integer + 0）
	num2 : "^-[1-9]\\d*|0$", // negative（Negtive integer + 0）
	decmal : "^([+-]?)\\d*\\.\\d+$", // Floating point
	decmal1 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", // Positive floating point
	decmal2 : "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", // Negative float
	decmal3 : "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", // Floating point
	decmal4 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", // Non negative floating point（Positive floating point + 0）
	decmal5 : "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", // Non positive floating point（Negative float +
																// 0）
	email : "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", // mail
	color : "^[a-fA-F0-9]{6}$", // colour
	url : "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", // url
	chinese : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", // Only Chinese
	ascii : "^[\\x00-\\xFF]+$", // onlyACSIIcharacter
	zipcode : "^\\d{6}$", // Zip code
	mobile : "^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$", // Mobile phone
	ip4 : "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", // ipaddress
	notempty : "^\\S+$", // Non empty
	picture : "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", // picture
	rar : "(.*)\\.(rar|zip|7zip|tgz)$", // Compressed file
	date : "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", // Date,
	qq : "^[1-9]*[1-9][0-9]*$", // QQnumber
	tel : "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$", // Telephone number function(Including domestic verification code,global roaming,Extension number)
	username : "^\\w+$", // For user registration。Match by digit、26A string consisting of an English alphabet or an underscore.
	letter : "^[A-Za-z]+$", // Letter
	letter_u : "^[A-Z]+$", // Capital
	letter_l : "^[a-z]+$", // Lowercase letters
	idcard : "^[1-9]([0-9]{14}|[0-9]{17})$" // ID
}

var aCity = {
	11 : "Beijing",
	12 : "Tianjin",
	13 : "Hebei",
	14 : "Shanxi",
	15 : "Inner Mongolia",
	21 : "Liaoning",
	22 : "Jilin",
	23 : "Heilongjiang",
	31 : "Shanghai",
	32 : "Jiangsu",
	33 : "Zhejiang",
	34 : "Anhui",
	35 : "Fujian",
	36 : "Jiangxi",
	37 : "Shandong",
	41 : "Henan",
	42 : "Hubei",
	43 : "Hunan",
	44 : "Guangdong",
	45 : "Guangxi",
	46 : "Hainan",
	50 : "Chongqing",
	51 : "Sichuan",
	52 : "Guizhou",
	53 : "Yunnan",
	54 : "Tibet",
	61 : "Shaanxi",
	62 : "Gansu",
	63 : "Qinghai",
	64 : "Ningxia",
	65 : "Xinjiang",
	71 : "Taiwan",
	81 : "Hong Kong",
	82 : "Macao",
	91 : "abroad"
}

function isCardID(sId) {
	var iSum = 0;
	var info = "";
	if (!/^\d{17}(\d|x)$/i.test(sId))
		return "The length or format of your ID is wrong.";
	sId = sId.replace(/x$/i, "a");
	if (aCity[parseInt(sId.substr(0, 2))] == null)
		return "Your ID area is invalid";
	sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"
			+ Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate()))
		return "Birth date on ID card is invalid";
	for (var i = 17; i >= 0; i--)
		iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	if (iSum % 11 != 1)
		return "The ID number you entered is invalid";
	return true;// aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"male":"female")
}

// 短时间，形如 (13:04:06)
function isTime(str) {
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {
		return false
	}
	if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
		return false;
	}
	return true;
}

// 短日期，形如 (2003-12-05)
function isDate(str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null)
		return false;
	var d = new Date(r[1], r[3] - 1, r[4]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d
			.getDate() == r[4]);
}

// 长时间，形如 (2003-12-05 13:04:06)
function isDateTime(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	var r = str.match(reg);
	if (r == null)
		return false;
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3]
			&& d.getDate() == r[4] && d.getHours() == r[5]
			&& d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

function validates(c,jsonData){
  try{
    if(!c){
      return true;
    }
    jsonData=jsonData||{};
    for(var i=0;i<c.length;i++){
      var f=c[i][2]||notEmputy;
      if(!f(jsonData[c[i][0]])){
        throw c[i][1];
      }
    }
  }catch(e){
    $.messager.alert(titleInfo,e);
    return false;
  }
  return true;
}
function notEmputy(str){
  return str!=null && str!="";
}
function isMoney(str){
  return !isNaN(str*1) && str*1>0;
}