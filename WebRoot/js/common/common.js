function myformatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
	if (!s) return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	}else{
		return new Date();
	}
}

function compareNow(beginDate) {
	beginDate = beginDate.replace(/\-/gi,"/");
	var now = myformatter(new Date()).replace(/\-/gi,"/");
	var time1 = new Date(beginDate).getTime();
	var time2 = new Date(now).getTime();
	if(time1 >= time2){
		return true;
	}
	return false;
}



function formattime(date){  
     var y = date.getFullYear();  
     var m = date.getMonth()+1;  
     var d = date.getDate();  
     var h = date.getHours();  
     var min = date.getMinutes();  
     var sec = date.getSeconds();  
     var str = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+' '+(h<10?('0'+h):h)+':'+(min<10?('0'+min):min)+':'+(sec<10?('0'+sec):sec);  
     return str;  
}  


function timeparser(s){  
     if (!s) return new Date();  
     var y = s.substring(0,4);  
     var m =s.substring(5,7);  
     var d = s.substring(8,10);  
    //var h = s.substring(11,14);  
    //var min = s.substring(15,17);  
    //var sec = s.substring(18,20);  
   var h = s.substring(10,13);  
   var min = s.substring(14,16);  
   var sec = s.substring(17,19);
     if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(min) && !isNaN(sec)){  
         return new Date(y,m-1,d,h,min,sec);  
        } else {  
           return new Date();  
     }  
} 

/** date类型转换成字符串显示 */
function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    return datetime;
}
