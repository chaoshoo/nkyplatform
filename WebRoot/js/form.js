$(function() { 
	/**
	 * @author shiwc
	 * 
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
   $(".dateInput").datebox();
});

function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + /*((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))*/
            ((date.getMonth() + 1) < 10 ?('0'+(date.getMonth() + 1)):(date.getMonth() + 1))
            + "-"// "月"
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