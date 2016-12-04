$(function() { 
	/**
	 * @author shiwc
	 * 
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
   $(".dateInput").datebox();
});

function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "year"
            + /*((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))*/
            ((date.getMonth() + 1) < 10 ?('0'+(date.getMonth() + 1)):(date.getMonth() + 1))
            + "-"// "month"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}

function DateTimeRender(value){
	var date = new Date(value);
	//return util.getValueBykeyDic('status',value);
	return formatterDateTime(date);
}


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

$.fn.datebox.defaults.formatter = function(date){
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  return y+'-'+m+'-'+d;
};
function getCommonCode(t,tp){
  if(t.value!="" || t.getting){
    return;
  }
  t.getting=true;
  $.post("stock/code.json",{"tp":tp},function(data){
    t.value=data;
    t.getting=false;
  },"html");
}

function openall(data,id){
  if(data instanceof Array){
    return;
  }
  this.changeNode=function(value){
    var v = {id: value[options.idField], text: value[options.textField],children:[]};
    var c=value.children;
    $(c).each(function(index,vIn){
      v.children.push(changeNode(vIn));
    });
    return v;
  };
  var options = $('#'+id).combotree('options');
  
  data=data[options.dataName]||data;
  var dataTmp={0:{children:[]}};
  var dts=[];
  $(data).each(function(index,value){
    value.children=[];
    dataTmp[value[options.idField]]=value;
  });
  $(data).each(function(index,value){
    dataTmp[value[options.pIdField]].children.push(value);
  });
  $(data).each(function(index,value){
    if(value.pId==0){
      dts.push(changeNode(value));
    }
  });
  $('#'+id).combotree('loadData', dts);
}