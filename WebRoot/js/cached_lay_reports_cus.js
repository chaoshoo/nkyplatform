/*
 Highcharts JS v4.0.4 (2014-09-02)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/



jQuery(function ($) {
    var csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content');

    $.fn.extend({
        /**
         * Triggers a custom event on an element and returns the event result
         * this is used to get around not being able to ensure callbacks are placed
         * at the end of the chain.
         *
         * TODO: deprecate with jQuery 1.4.2 release, in favor of subscribing to our
         *       own events and placing ourselves at the end of the chain.
         */
        triggerAndReturn: function (name, data) {
            var event = new $.Event(name);
            this.trigger(event, data);

            return event.result !== false;
        },

        /**
         * Handles execution of remote calls firing overridable events along the way
         */
        callRemote: function () {
            var el      = this,
                method  = el.attr('method') || el.attr('data-method') || 'GET',
                url     = el.attr('action') || el.attr('href'),
                dataType  = el.attr('data-type')  || 'script';

            if (url === undefined) {
              throw "No URL specified for remote call (action or href must be present).";
            } else {
                if (el.triggerAndReturn('ajax:before')) {
                    var data = el.is('form') ? el.serializeArray() : [];
                    $.ajax({
                        url: url,
                        data: data,
                        dataType: dataType,
                        type: method.toUpperCase(),
                        beforeSend: function (xhr) {
                            el.trigger('ajax:loading', xhr);
                        },
                        success: function (data, status, xhr) {
                            el.trigger('ajax:success', [data, status, xhr]);
                        },
                        complete: function (xhr) {
                            el.trigger('ajax:complete', xhr);
                        },
                        error: function (xhr, status, error) {
                            el.trigger('ajax:failure', [xhr, status, error]);
                        }
                    });
                }

                el.trigger('ajax:after');
            }
        }
    });

    /**
     *  confirmation handler
     */
    var jqueryVersion = $().jquery;

    if ( (jqueryVersion === '1.4') || (jqueryVersion === '1.4.1') || (jqueryVersion === '1.4.2')){
      $('a[data-confirm],input[data-confirm]').live('click', function () {
          var el = $(this);
          if (el.triggerAndReturn('confirm')) {
              if (!confirm(el.attr('data-confirm'))) {
                  return false;
              }
          }
      });
    } else {
      $('body').delegate('a[data-confirm],input[data-confirm]', 'click', function () {
          var el = $(this);
          if (el.triggerAndReturn('confirm')) {
              if (!confirm(el.attr('data-confirm'))) {
                  return false;
              }
          }
      });
    }
    


    /**
     * remote handlers
     */
    $('form[data-remote]').live('submit', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    $('a[data-remote],input[data-remote]').live('click', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    $('a[data-method]:not([data-remote])').live('click', function (e){
        var link = $(this),
            href = link.attr('href'),
            method = link.attr('data-method'),
            form = $('<form method="post" action="'+href+'"></form>'),
            metadata_input = '<input name="_method" value="'+method+'" type="hidden" />';

        if (csrf_param != null && csrf_token != null) {
          metadata_input += '<input name="'+csrf_param+'" value="'+csrf_token+'" type="hidden" />';
        }

        form.hide()
            .append(metadata_input)
            .appendTo('body');

        e.preventDefault();
        form.submit();
    });

    /**
     * disable-with handlers
     */
    var disable_with_input_selector           = 'input[data-disable-with]';
    var disable_with_form_remote_selector     = 'form[data-remote]:has('       + disable_with_input_selector + ')';
    var disable_with_form_not_remote_selector = 'form:not([data-remote]):has(' + disable_with_input_selector + ')';

    var disable_with_input_function = function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.data('enable-with', input.val())
                .attr('value', input.attr('data-disable-with'))
                .attr('disabled', 'disabled');
        });
    };

    $(disable_with_form_remote_selector).live('ajax:before', disable_with_input_function);
    $(disable_with_form_not_remote_selector).live('submit', disable_with_input_function);

    $(disable_with_form_remote_selector).live('ajax:complete', function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.removeAttr('disabled')
                 .val(input.data('enable-with'));
        });
    });

});

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
};

//observer
(function ($) {
    var o = $({});
    $.subscribe = function () {
        o.on.apply(o, arguments);
    };
    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };
    $.publish = function () {
        o.trigger.apply(o, arguments);
    };
    $.notice = function(){
        console.log(o)
    }
} (jQuery));

;(function($){
    $.extend($,{
        /*
        *GetDate or Days
        *version 1.1
        * fix ie bug ===> - to /
        *author linan
        *@params  null number example : GetDate() return today
        *@params number example : GetDate('-3') return array [3daysbefore,today]
        *@params stringdate example : GetDate('2012-12-23') or getDate('2012.12.23') return number, days from arg0 to today
        *@params two stringdate example : GetDate('2012-12-1','2012-12-23') return number, days from arg0 to arg1
        *@params two example : $.GetDate('2012-02-23',-30) return string "2012-01-25"
        *@params two example : $.GetDate(1, true)  today is 2014-04-15 return string "2014-04-16"
        */
        GetDate : function(d1,d2){
            var len = arguments.length;
            var reg = /\d{4}([-./])\d{1,2}\1\d{1,2}/;
            var dates = [];
            var day,number;
            var today = getToday();
            switch(len){
            case 0 :
                return getToday();
                break;
            case 1:
                if(reg.test(arguments[0])){
                    return getDays(arguments[0],getToday());
                }else{
                    day = buildDate(arguments[0],today);
                    dates.push(day);
                    dates.push(getToday());
                    return dates.sort();
                }
                break;
            case 2 :
                // add by chenjincai
                // 用户群，观察时间用于获取今天之后的时间使用
                if (arguments[1] === false) {
                  return arguments.callee(arguments[0]);
                } else if (arguments[1] === true) {
                  dates.push(today);
                  dates.push(buildDateExactly(arguments[0],today));
                  return dates;
                }


                if(reg.test(arguments[0]) && reg.test(arguments[1])){
                    number = getDays(arguments[0].replace(/-/g,'/'),arguments[1].replace(/-/g,'/'));
                    return number;
                }else{
                    day = buildDate(arguments[1],arguments[0]);
                    return day;
                }
                break;

            }
            function getDays(arg,day){
                var value = new Date(day) - new Date(arg.replace(/\b(\w)\b/g, '0$1'));
                if(value<0){
                    return "Wrong Date";
                }else{
                    return parseInt(value/(1000*3600*24)+1,10);
                }
            };
            function getToday(){
                var date = new Date();
                this.Day = date.getDate();
                this.Month = date.getMonth()+1;
                this.Year = date.getFullYear();
                return (this.Year.toString()+'-'+this.Month.toString()+'-'+this.Day.toString()).replace(/\b(\w)\b/g, '0$1');;
            };
            function buildDate(num,day){
                var n = num;
                if(typeof(n) == String){
                    n = parseInt(n,10);
                }
                if(n >= 0){
                    return getToday();
                }else if (n < 0) {
                    var someDay = new Date(new Date(day.replace(/\-/g,'/'))-0+(n+1)*86400000);

                    someDay = someDay.getFullYear() + "-" + (someDay.getMonth()+1) + "-" + someDay.getDate();
                    return someDay.replace(/\b(\w)\b/g, '0$1');

                }
            }
            // 允许num大于0，num 为 0 是当天，1是明天，-1是昨天
            function buildDateExactly(num, day) {
              var n = num;
              if(typeof(n) == String){
                  n = parseInt(n,10);
              }

              var someDay = new Date(new Date(day.replace(/\-/g,'/')) - 0 + n * 86400000);

              someDay = someDay.getFullYear() + "-" + (someDay.getMonth()+1) + "-" + someDay.getDate();
              return someDay.replace(/\b(\w)\b/g, '0$1');


            }
        },
        /*
        *replace Date '-' to '.'
        *@param date example :$.replaceDate('2012-01-01')
        *return 2012.01.01
        */
        replaceDate : function(mydate){
            return mydate.replace(/-/g,'.');
        }
    })
})(jQuery);

/*
* init global variable
*/
var UMENG = {};
UMENG.prototype = window.UMENG;
UMENG.Storage = {};
UMENG.Storage.charts = [];
UMENG.Storage.compareChart = {};
window.UMENG.plugin = {};
window.global = {} || "";
window.global.pickedStartDay = $('.dateselect .start').text().replace(/\./g,'-');
window.global.pickedEndDay = $('.dateselect .end').text().replace(/\./g,'-');
window.global.pickedDays = $.GetDate(global.pickedStartDay,global.pickedEndDay);
window.global.filter = {};
window.global.filter.version = '';
window.global.filter.channel = '';
window.global.filter.segment ='',
window.global.action_stats = UMENG.actionStats = UMENG.ACTIONSTATS = $('#action_stats').val();
UMENG.PAGELIST = $('#priority_action_stats').val() || $('#action_stats').val();
window.global.time_unit = '';
if($('#app_id').length>0){
    window.global.appid = UMENG.APPKEY = $('#app_id').attr('attr-id');
    UMENG.APPPLATFORM = $('#app_platform').attr('attr-id');
}
// for components registration, { 'group_id:component_id' : component_refer}
window.global.components = {}

/*
 * local auto save users date select;
 * expend: $.GetDate method
 * 2013-06-05 add page route list
 * add expired time
 * 2013-07-26 Add on/off
 */
;(function($,win,doc,UMENG,undefined){
    var BLACKLIST = ['index', 'duration','frequency','depth','interval','devices_devices','devices_resolutions','devices_versions','network_access','network_carriers','location_cities','location_countries', 'statschannel', 'channel_retention', 'funnels', 'stage_stats', 'payment_trend', 'consume_stats', 'ltv', 'ltv_ltv', 'channels_custom','channel_realtime', 'currency', 'realtime', 'silent_users', 'group_trend','payment_conversion', 'custom_paysource','payment_distance', 'event_details', 'operation_log'];
    UMENG = win.UMENG || {};
    var expire = new Date().getDate();
    var val = UMENG.ACTIONSTATS;
    UMENG.plugin.userCustomDate = {
        localCache : 'true',//localStorage.setItem('localCache',''),
        setDate: function(array,scope){
            // if page in blacklist do not cache
            var date = {};
            var flag = $.inArray(val,BLACKLIST);
            if(flag == -1 && array.constructor === Array && array.length == 2){
                array.sort();
                localStorage.setItem(scope,JSON.stringify(array));
                localStorage.setItem('localCacheDateExpireTime_'+scope,new Date().getDate());
            }
        },
        //param dateTyte is required
        getDate: function(n,dateType){
            var days = n || -7;
            if(dateType == undefined){
                return $.GetDate(days);
            };
            if(localStorage.getItem(dateType) != undefined){
                var array = new Array(localStorage[dateType]);
                return JSON.parse(array);
            }else{
                return $.GetDate(days);
            }
        }
    };
    function _setDate(dateType){
        var date = UMENG.plugin.userCustomDate.getDate(undefined,dateType);
        var st = $('.datepickerPanel').find('.start');
        var end = $('.datepickerPanel').find('.end');
        st.text($.replaceDate(date[0]));
        end.text($.replaceDate(date[1]));

        //reset global date
        win.global.pickedStartDay = date[0];
        win.global.pickedEndDay = date[1];
        win.global.pickedDays = $.GetDate(date[0],date[1]);
    };

    function defaultLocalDate(){
        var flag = $.inArray(val,BLACKLIST);
        if(flag == -1 && expire == localStorage['localCacheDateExpireTime_localCacheDate'] && UMENG.plugin.userCustomDate.localCache){
            _setDate('localCacheDate');
        }
    };

    function natureLocalDate(){
        var NATURELIST = ['funnels'];
        var flag = $.inArray(val,NATURELIST);
        if(flag > -1 && expire == localStorage['localCacheDateExpireTime_natureCacheDate'] && UMENG.plugin.userCustomDate.localCache){
            if(localStorage['natureCacheDate']){
                _setDate('natureCacheDate');
                var timeUnit = {
                    1: 'daily',
                    7: 'weekly',
                    28: 'monthly',
                    29: 'monthly',
                    30: 'monthly',
                    31: 'monthly'
                };
                $('.select_value').attr('timeunit',timeUnit[UMENG.Agent.getDate().counts || win.global.pickedDays]);
            }
        }
    };

    defaultLocalDate();
    natureLocalDate();
})(jQuery,window,document,UMENG);

/*
* column
*/
;$(document).ready(function(){
    //fix sidebar style
    $('#siderNav .nav-items>li:last').addClass('item-bottom');

    window.fixColumn = function(){
        if($('.fix-column')){
            var $this = $('.fix-column'),len,panelWidth,m;
            var scrollbar = 0;
            if (document.documentElement.clientHeight < document.documentElement.offsetHeight){
                scrollbar = 1;
            }
            $this.each(function(){
                len = $(this).children('.col').length;
                m = $(this).attr("m");
                if(len>1){
                    panelWidth = $(this).width()-m*(len-1) -len;
                    $(this).children('.col').width(parseInt(panelWidth/len),10).css("margin-right",m+"px");
                    $(this).children('.col:last').css("margin-right","0px");
                }
            })
        }
    }
    fixColumn();
    $(window).resize(function(){
        fixColumn();
    });
});

/*
menu
*/
;(function($){
    $('#siderNav .nav-item').bind('click',function(e){
        var $this = $(this);
        var ul = $this.find('.sub-list');
        if(!$this.hasClass('on')){
            if(ul.length > 0){
                ul.slideDown('fast',function(){
                    $this.addClass('on');
                });
            }else{
                $this.addClass('on');
            }
            if($this.siblings('.on').find('.sub-list').length > 0){
                $this.siblings('.on').find('.sub-list').slideUp('fast',function(){
                    $this.siblings('.on').removeClass('on');
                });
            }else{
                $this.siblings('.on').removeClass('on');
            }
        }
        e.stopPropagation();
    })
})(jQuery);

/*
*@Char Filter 1.0
*@author luxueyan
*/
;(function($){
    //for ie8
    if (!Array.prototype.indexOf){
        Array.prototype.indexOf = function(elt /*, from*/){
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)? Math.ceil(from) : Math.floor(from);
            if (from < 0){
                from += len;
            }
            for (; from < len; from++){
                if(from in this && this[from] === elt){
                    return from;
                }
            }
            return -1;
        }
    };
    //数据筛选
    $.extend({
        dataFilter : function(data,keyWord){
            if(typeof data == 'object' && keyWord != ''){
                return $.map(data,function(val,index){
                    var toLower = val.name;
                    if(!!~toLower.toLowerCase().indexOf(keyWord.toLowerCase())){
                        return val;
                    }
                });
            }else{
                return '';
            }
        }
    });
})(jQuery);

/*
*set datepicker default settings
*/
;(function($){
    $.datepicker.regional['zh-CN'] = {
      closeText: I18n.t('components.buttons.close'),
      //prevText: '&#x3c;',
      //nextText: '&#x3e;',
      prevText: '',
      nextText: '',
      currentText: '',
      monthNames: ['1','2','3','4','5','6',
      '7','8','9','10','11','12'],
      monthNamesShort: I18n.t('constant.date.months').split(','),
      dayNames: I18n.t('constant.date.weeks').split(','),
      dayNamesShort: I18n.t('constant.date.weeks_short').split(','),
      dayNamesMin: I18n.t('constant.date.weeks_min').split(','),
      dateFormat: 'yy-mm-dd',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: ' .'};
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
})(jQuery);

/**
*Tips
*/
;(function($){
    $.fn.Tips = function(options){
        return this.each(function(){
            var inst = $(this);
            var defaults = {
                modal : !1
            };
            var settings = $.extend({},defaults,options);
            if(typeof(options) == "string"){
                inst.dialog(options);
            }else{
                inst.dialog(settings);
            }
        })
    }
})(jQuery);

/*
*hidePopFrame
*/
window.hidePopFrame= function(inst){
    $('.app-container').hide();
    if(arguments.length>0){
        $('.select-body').not(arguments[0]).hide();
    }else{
        $('.select-body').hide();
    }
    $('.filterpanel').hide();
    $('#proTemp').hide();
    $('#proTemp2').hide();
    $('.singledate').hide();
    $('#dateSelPanel').hide();
    $('.pop_body').hide();
    $('.hideWhenClickBody').hide();
    $('.panelExportCustom').remove();
};
$(document).on('click',function(){
  window.hidePopFrame();
});
/*
* stopBubble
*/
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if( e && e.stopPropagation ){
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    }else{
        //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
};

/**
*it can be get the height of a DOM when the DOM is hide;
*/
var getDimensions = function(element) {
    element = $(element);
    var display = $(element).css('display');
    if (display != 'none' && display != null) // Safari bug
    return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var originalVisibility = element.css('visibility');
    var originalPosition = element.css('position');
    var originalDisplay = element.css('display');
    element.css('visibility','hidden');
    element.css('position','absolute');
    element.css('display','block');
    var originalWidth = element.width();
    var originalHeight = element.height();
    element.css('visibility',originalVisibility);
    element.css('position',originalPosition);
    element.css('display',originalDisplay);
    return {width: originalWidth, height: originalHeight};
};

/**
*it can be used to replace the windows.confirm
*/
function confirm_msg(title,str,callback,inst){
    $('<div>'+str+'</div>').dialog({title:title, buttons: [
        {
            text: I18n.t('components.buttons.confirm'),
            click: function() { $(this).dialog("close"); callback(inst); }
        },
        {
            text: I18n.t('components.buttons.cancel'),
            click: function() { $(this).dialog("close");}
        }
        ]}
    );
};
/**
*it can be used to replace the windows.alert
*/
window.alert = $.alert = function(msg,time){

    if(arguments.length<=0 || msg == undefined){
        msg = "";
    }
    var randomnum = parseInt(Math.random()*1000000000);
    if(time>0){
        $('<div id="temp_alert_box'+randomnum+'">'+msg+'</div>').Tips({title:I18n.t('components.labels.alert'),width:300});
        setTimeout(function(){
            $('#temp_alert_box'+randomnum).Tips("close");
            $('#temp_alert_box'+randomnum).parent(".ui-dialog").remove();
            $('#temp_alert_box'+randomnum).remove();
        },time);
    }else{
        $('<div id="temp_alert_box">'+msg+'</div>').dialog({title:I18n.t('components.labels.alert'),width:397,modal:true, buttons: [
        {
            text: I18n.t('components.buttons.confirm'),
            click: function() { $(this).dialog("close");}
        }]});
    }
};

$(document).ready(function(){
    /*
    *Show feedback tip
    */
    $('.feedback_tip').hover(
        function(){
            $(this).addClass('hover');
        },
        function(){
            if(localStorage.getItem($('#userEmail').text() + '#closeFeeback')){
                $(this).removeClass('hover');
                $(this).hide();
            }
        }
    )
    $('.showIssues').hover(
        function(){
            $('.feedback_tip').show();
            $('.feedback_tip').addClass('hover');
        },
        function(){
            var userName = $('#userEmail').text();
            if($('.feedback_tip').hasClass('hover')){
                $('.feedback_tip').show();
            }else{
                if(localStorage.getItem(userName + '#closeFeeback')){
                    $('.feedback_tip').hide();
                }
            }
            setTimeout(function(){
                if(localStorage.getItem(userName + '#closeFeeback')){
                    $('.feedback_tip').hide();
                }
            },4000);
        }
    )

    if($('.feedback_tip').length > 0){
        var userName = $('#userEmail').text();
        $('.feedback_tip').each(function(){
            if(localStorage.getItem(userName + '#feeback_tip') == null){
                $(this).show();
            }else if($('.showIssues .notif').text() > parseInt(localStorage.getItem(userName + '#feeback_tip'))){
                $(this).show();
            }else{
                $(this).hide();
            }
        })
    }else{
        var userName = $('#userEmail').text();
        localStorage.removeItem(userName + '#feeback_tip');
    }

    $('.feedback_tip .content .close').on('click',function(){
        var userName = $('#userEmail').text();
        $('.feedback_tip').hide();
        localStorage.setItem(userName + '#feeback_tip',$('.showIssues .notif').text());
        localStorage.setItem(userName + '#closeFeeback','true');
    })


    /*
     * show help and feedback link
    */
    $('.feedback_help a').hover(
        function(){
            $(this).parent().css('right','0');
            $(this).parent().siblings('div').css('right',-37);
            $('.cssline').css('right',0);
        },
        function(){
            $('.feedback_help .relative div').css('right',-37);
        }
    )
})
/*
*ShowSummary
*/
window.showSummary = function(mod,data){
    if(arguments.length>1){
        var parent = mod.parent();
        parent.css('position','relative');
        parent.find('.chart-summary').remove();
        parent.append('<div class="chart-summary chart-hide"><div  class="pop-summary"><a href="#"></a></div><p style="padding-top:30px;">'+data.name+': </p><p class="skimnum" style="padding-top:10px;">'+ data.value +'</p></div>');
    }
    $('.chartpanel').delegate('.chart-hide','click',function(){
        $(this).animate(
            {
                'right' : '-25px'
            },
            'fast',
            function(){
                $(this).removeClass('chart-hide').addClass('chart-show');
            }
        );
        return false;
    })
    $('.chartpanel').delegate('.chart-show','click',function(){
        $(this).animate(
            {
                'right' : '-228px'
            },
            'fast',
            function(){
                $(this).removeClass('chart-show').addClass('chart-hide');
            }
        );
        return false;
    })

};
$('.expandCollapse').bind('click',function(){
    var id = $(this).attr('expand-id');
    var obj =$('#'+id);
    if(obj.is(":visible")){
        obj.addClass('hidden');
        $(this).parent().css('border-top','0px');
        $(this).text(I18n.t('components.links.data_detail'));
    }else{
        obj.removeClass('hidden');
        if(obj.find('.pagination').html() !=''){
            $(this).parent().css('border-top','1px solid #B4B4B4');
            obj.find('.pagination').removeClass('hidden');
        }else{
            obj.find('.pagination').addClass('hidden');
            $(this).parent().css('border-top','0px');
        };
        $(this).text(I18n.t('components.links.shrink'));
    }
    return false;
});

//cookie
function cookie_get(k) {
    var h = document.cookie.split("; ");
    g = h.length;
    f = [];
    for (var j = 0; j < g; j++) {
        f = h[j].split("=");
        if (k === f[0]) {
            return unescape(f[1]);
        }
    }
    return null;
}
function cookie_set(f, g, del, expire) {
    var h = new Date();
    if(!expire){
      expire = 365;
    }
    if(!del){
        h.setDate(h.getDate() + expire);
    }else{
        h.setDate(h.getDate() - 10);
    }
    document.cookie = f + "=" + escape(g) + "; expires=" + h.toGMTString()+"; path=/";
}

//Tooltip
;(function($){
    $('body').delegate('a[action-frame]','mouseover',function(){
      var self = this;
      var tip = $('#'+$(this).attr('action-frame'));
      var animate = $(this).attr('animate');
      if (animate && animate.toLowerCase() === 'false') {
        tip.show();
      } else {
        tip.fadeIn();
      }
      tip.position({
        my: "left+10 top-21",
        at: "right center",
        of: $(this),
        collision: 'flip',
        using: function(pos, feedback){
          $('#'+$(self).attr('action-frame')).css(pos);
          if (feedback.horizontal === 'right') {
            feedback.element.element.find('.corner').addClass('corner2');
          } else if (feedback.horizontal === 'left') {
            feedback.element.element.find('.corner').removeClass('corner2');
          }
        }
      });
    });
    $('body').delegate('a[action-frame]','mouseout',function(){
        var tip = $('#'+$(this).attr('action-frame'));
        var animate = $(this).attr('animate');
        if (animate && animate.toLowerCase() === 'false') {
          tip.hide();
        } else {
          tip.fadeOut();
        }
    });

    //notice event
    $('#website-tip').click(function(){
        var tip_id = $(this).attr('id');
        var userName = $('#userEmail').text();
        var md5_string = $(this).attr('notice_id');
        if($(this).hasClass('notice')){
            $(this).removeClass('notice');
            $('.website-tip-content').hide();
            localStorage.setItem('notice#'+ userName + '#' + tip_id, 'hide_' + md5_string);
        }else{
            $(this).addClass('notice');
            $('.website-tip-content').show();
            localStorage.setItem('notice#'+ userName + '#' + tip_id, 'show_' + md5_string);
        }
        return false;
    });
    $('.cookie_notice').each(function(){
        var tip_id = $(this).attr('id');
        if($('#website-tip').siblings('a').length == 1){
            $(this).next('.website-tip-content').find('.corner').css('left','200px')
        }
        //check notice
        if( $(this).length>0){
            var md5_string = $('#website-tip').attr('notice_id');
            var cur_string = localStorage.getItem('notice#' + $('#userEmail').text() + '#' + tip_id) == null ? 0 : localStorage.getItem('notice#' + $('#userEmail').text() + '#' + tip_id).split('_')[1];
            if(md5_string == cur_string){
                if(localStorage.getItem('notice#' + $('#userEmail').text() + '#' + tip_id).split('_')[0] == 'hide'){
                    $(this).removeClass('notice');
                    $('.website-tip-content').hide();
                }else{
                    $(this).addClass('notice');
                    $('.website-tip-content').show();
                }
            }else{
                $(this).addClass('notice');
                $('.website-tip-content').show();
                 localStorage.setItem('notice#'+ $('#userEmail').text() + '#' + tip_id, 'show_' + md5_string);
            }
        }
    });
})(jQuery);
function _track_userEvent(categories,actions,value){
    try{
        _gaq.push(['_trackEvent', categories, actions, value]);
    }catch(e){
        console.log(e.message)
    }
};
function _track_components_usage(){
    try{
        var filter_label = (global.filter.version === '' ? '' : '版本 ') + (global.filter.channel === '' ? '' : '渠道 ') + (global.filter.segment === '' ? '' : '用户群');
        var date_length = $.GetDate(global.pickedStartDay, global.pickedEndDay);
        if( window._gat != undefined){
            if( filter_label != '' ){
                _gaq.push(['_trackEvent','组件', '过滤器', filter_label] );
            }
            _gaq.push(['_trackEvent','组件', '时间选择', '天数', date_length] );
        }

    }catch(e){}
};
function _track_nav_bar(category, label){
    try{
        _gaq.push(['_trackEvent','导航', category, label]);
    }catch(e){}
};
function _track_tab(category, label){
    try{
        _gaq.push(['_trackEvent','导航', category, label]);
    }catch(e){}
};

// send login log to op
function loginlog(user_id){
    try{
        var login_date = cookie_get('um_login_date_' + user_id);
        var today_date = new Date().toDateString();
        if(today_date != login_date)
        {
            cookie_set('um_login_date_' + user_id, today_date, 0, 1);
            $.getJSON("http://op.umeng.us/loginlogs/add?userid="+user_id+"&callback=?",function(d){});
        }
    }catch(e){}
}
function parseScientific(dest, length, digit){
    if(typeof(length) == 'undefined'){
        length = 5;
    }
    if(typeof(digit) == 'undefined'){
        digit = 2;
    }
    if(dest.toString().length < length){
        return dest;
    }
    return parseFloat(dest).toExponential(digit);
};

//reverse string
function reverse(s){
    return s.split("").reverse().join("");
};

//get url params
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

//get week index
function getHoliday(date,options){
    var tooltip = '';
    var map = {
        zh: {
            0: '星期日',
            1: '星期一',
            2: '星期二',
            3: '星期三',
            4: '星期四',
            5: '星期五',
            6: '星期六'
        },
        en: {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        }
    };

    //set weeekend
    var index = new Date(date).getDay(),
        locale = I18n.locale || 'zh',
        reg = /^(\d{4})-(\d{2})-(\d{2})$/;
    if(options._colorIndex != undefined && options._colorIndex == 0){
        if(reg.test(date)){
            if (index == 0 || index == 6){
                tooltip = ' ' + map[locale][index];
            }else{
                tooltip = '';
            }
        }
    }

    //set holiday
    if(options.holidays){
        $.each(options.holidays,function(i,holiday){
            if(holiday.date == date){
                tooltip = ' ' + holiday.holiday;
            }
        });
    }

    //set work weekend
    if(options.workWeekend && options.workWeekend.indexOf(date) > -1){
        tooltip = '';
    }
    return tooltip;
};

//require sdk version
$(document).ready(function(){
  if($('#siderDownLoad').length > 0){
    var platform = $('#sdkPlatform').val();
    var reports = $('#sdkReports').val();
    var settings = $('#sdkSettings').val();
    var sdk_type = 'analytics';
    if( platform === 'iphone' || platform === 'ipad' )
      platform = 'ios';

    var v, d;
    if( reports === 'true' )
    {
      $.ajax({
        url: $('#sdkDLUrl').val(),
        data: {
          platform: platform,
          sdk_type: sdk_type
        },
        type: 'get',
        dataType: 'jsonp',
        success: function(res){
          v = res[0];
          d = res[1];
          $('#siderDownLoad .sdk_version').text(v);
          $('#siderDownLoad .sdk_update_date').text(d);
        }
      });
    }
  }
});


function abbrNum(number, decPlaces) {     // 2 decimal places => 100, 3 => 1000, etc     
    decPlaces = Math.pow(10,decPlaces);     // Enumerate number abbreviations     
    var abbrev = [ "K", "M", "B", "T" ];     // Go through the array backwards, so we do the largest first     
    for (var i=abbrev.length-1; i>=0; i--) {         // Convert array index to "1000", "1000000", etc         
        var size = Math.pow(10,(i+1)*3);         // If the number is bigger or equal do the abbreviation         
        if(size <= number) {              // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number*decPlaces/size)/decPlaces;
            // Handle special case where we round up to the next abbreviation
            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }
            // Add the letter for the abbreviation
            number += abbrev[i];              // We are done... stop
            break;
        }
    }
    return number;
}


//user for constast channel ;filter channel ,version ,seq.
var Filter = function(){
	var that = this;
	this.version = '1.1';
	this._show = function(inst,settings){
		settings.panel.bind('click',function(e){
			if(e.target != e.currentTarget){
				stopBubble(e);
			}
		})
		settings.input = settings.panel.find('input.input');
		settings.input.val('');
		if(inst.data('checked') == undefined || inst.data('checked').check == false){
			//showDefault
			that.templ(settings,settings.templDefault,inst.data('datas'));
		}else if(inst.data('checked').check == true){
			//showSelect
			that.templ(settings,settings.templchecked,inst.data('datas'));
		}else{
			//showDefault
			that.templ(settings,settings.templDefault,inst.data('datas'));
		}
		that.search(inst,settings);
		that.checkItem(inst,settings);
	};
	this.templ = function(settings,temp,datasource){
		var container = $(settings.panel).find('.filterlist');
		container.html('<span></span>');
		if(datasource != ""){
			$.template("temp",temp);
			$.tmpl("temp",datasource).appendTo(container);
		}
		return container;
	};
	this.checkItem = function(inst,settings){
		var id = "";
		var datas = inst.data('datas');
		inst.next().find('.filterlist input').unbind('click');
		inst.next().find('.filterlist input').bind('click',function(e){
			if(this.checked){
				id = $(this).attr('id');
				for(i in datas){
					if(datas[i].id == id){
						datas[i].check = this.checked;
						inst.data('checked',datas[i]);
					}else{
						datas[i].check = false;
					}
				}
				if(inst.data('checked')){
					$(this).parent().siblings().find('input').each(function(){
						this.checked = false;
					})
				}
			}else{
				id = $(this).attr('id');
				for(i in datas){
					if(datas[i].id == id){
						datas[i].check = this.checked;
					}
				}
				that.getDataSet(inst,settings,that._show);
			}
			e.stopPropagation();
		})
	};
	this.submits = function(inst,settings){
		settings.panel.delegate('a.submit','click',function(){
			if(inst.data('checked') != undefined){
				settings.panel.hide();
				if(inst.data('checked').check){
				  inst.text(inst.data('checked').name).parent().addClass('on');
				}else{
				  inst.text(settings.text);
				  inst.parent().removeClass('on');
				}
				settings.callback(inst,inst.data('checked'));
			}
			return false;
		})
	};
	this.search = function(inst,settings){
		settings.panel.delegate('input.input','keyup',function(){
			var v = $(this).val();
			if(v !=''){
				var data = $.dataFilter(inst.data('datas'),v);
				that.templ(settings,settings.templSearch,data);
			}else{
				inst.data('checked')== undefined ?
					that.templ(settings,settings.templDefault,inst.data('datas')) :
					that.templ(settings,settings.templDefault,inst.data('datas'));
			}
			that.checkItem(inst,settings);
		})
		$('.input').on('click',function(e){
			e.stopPropagation();
		})
	};
    this.getDataSet = function(inst,settings,callback){
        if(!inst.data('datas')){
            $.ajax({
                url : settings.url,
                type : 'get',
                success : function(data){
                    if(data.result == 'success'){
                        inst.data('datas',data.datas);//inst.data('datas',JSON.parse(decodeURIComponent(JSON.stringify(data.datas))));
                        settings.panel.find('.load').remove();
                        var filter = UMENG.Agent.getFilters()[inst.attr('id').split('-')[1]+'s'];
                        if(filter != '' || undefined){
                            for(i in inst.data('datas')){
                                if(inst.data('datas')[i].id == filter){
                                    var checkedItem = inst.data('datas')[i];
                                    checkedItem.check = true;
                                    inst.data('checked',checkedItem);
                                }
                            }
                        };
                        callback(inst,settings);
                    }else if(data.result == 'failed'){
                        settings.panel.find('.load').html(data.msg);

                    }
                }
            })
        }else{
            callback(inst,settings);
        }
	};
	this.getjQdom = function(id){
		return $('#'+id);
	};
	return {
		data : that.dataSet,
		init : function(target,options){
			var inst = $(target);
			var defaults = {
				panelid : 'filter',
				panel : '',
				text : '',
				templDefault : '{{if is_shown}}<li><input type="checkbox" id="${id}" {{if check}}checked=${check}{{/if}}/>${name}</li>{{/if}}',
				templSearch : '<li><input type="checkbox" id="${id}" {{if check}}checked=${check}{{/if}}/>${name}</li></li>',
				templchecked :  '{{if check}}<li><input type="checkbox" id="${id}" checked="${check}"/>${name}</li>{{/if}}',
				panelTempl : '<div class="filterpanel" style="display:none;"><input type="text" class="input" placeholder="'+I18n.t('components.search.name')+'"/><ul class="filterlist"></ul><div class="load" style="margin:10px auto;text-align:center;display:block;"><img src="/images/pic/ajax-loader.gif"/></div><div class="submitpanel"><a href="#" class="submit">'+I18n.t('components.buttons.confirm')+'</a></div></div>'
			};
			var settings = $.extend({},defaults,options);
			settings.panelTempl = settings.panelTempl.replace('placeholder="'+I18n.t('components.search.name')+'"','placeholder="'+I18n.t('components.search.name')+' '+settings.text+'"');
			inst.after(settings.panelTempl);
			inst.next()[0].id = settings.panelid;
			settings.panel = that.getjQdom(settings.panelid);
            inst.attr('enabled','true');
            inst.on('click',function(){
                if(inst.attr('enabled') == 'false'){
                    return false;
                }else{
                    var particle =  $('#period').renderTab('get_status');
                    if(particle == 'hourly'){
                        alert('no data');
                        return false;
                    }
                    if(settings.panel.is(':hidden')){
                        window.hidePopFrame();
                        settings.panel.show();
                        that.getDataSet($(this),settings,that._show);
                    }else{
                        settings.panel.hide();
                    }
                    return false;
                }
            });
			that.submits(inst,settings);
		},
		Set : function(inst,id,value){
			var datas = inst.data('datas');
			var checked = inst.data('checked');
			if(datas == undefined){
				return 'datas can not defined';
			}
			if(checked == undefined){
				if(arguments.length >2){
					for(i in datas){
						if(id == datas[i].id){
							inst.data('checked',datas[i]);
						}
					}
				}else{
					inst.data('checked','');
					inst.text(arguments[1]);
				}
			}else{
				if(arguments.length >2){
					for(i in datas){
						if(value){
							if(datas[i].cid==id){
								datas[i].check = value;
							}else{
								datas[i].check = !value;
							}
						}else{
							if(datas[i].cid==id){
								datas[i].check = value;
							}
							inst.data('checked','');
						}
						return datas;
					}
				}else{
					inst.removeData('checked');
					inst.text(arguments[1]);
					inst.parent().removeClass('on');
					for(i in datas){
						datas[i].check = false;
					}
				}
			}

		},
		Get : function(inst){
			var text = inst.text();
			var data = inst.data('datas');
			for(i in data){
				if(data[i].name == text){
					return data[i];
				}else{

				}
			}
		},
        disable: function(inst,initText){
            UMENG.plugin.Filter.Set(inst,initText);
            inst.attr('enabled','false').addClass('disabled');
            return inst;
        },
        enable: function(inst){
            inst.attr('enabled','true').removeClass('disabled');
        }
	}
}
UMENG.plugin.Filter = new Filter();
$.fn.Filter = function(options){
	if(typeof(options) == 'object'){
		return this.each(function(){
			UMENG.plugin.Filter.init(this,options);
		})
	}else{
		return this;
	}
};


/*
 * ProSelect 1.0
 * Author: linan
 * Depends: jQuery, modules
 *
 * Modify:
 *   2014.xx.xx:
 *     Support minDate & maxDate - Chenjincai
 *       - Add minDate/maxDate
 */

;(function($) {

  var datePickerArray = { startDay: '', endDay: '' },
      date = new Date();

  window.thisYear = date.getFullYear();

  $.fn.ProSelect = function(options) {
    if (this.length > 0) {
      var $this = this;

      datePickerArray.startDay = $('.start', $this).text().replace(/\./g, '-');
      datePickerArray.endDay = $('.end', $this).text().replace(/\./g, '-');

      var defaults = {
        show: false,
        x: $this,
        targettext: $this.text(),
        muti: false,
        temp: '<div id ="proTemp">test</div>',
        tempid: 'proTemp',
        inputname: [I18n.t('components.filters.time_unit.last_60_day'), I18n.t('components.filters.time_unit.last_30_day'), I18n.t('components.filters.time_unit.last_7_day')],
        inputval: ['-60','-30','-7'],
        custom: true,
        callback: '',
        minDate: null, // add by chenjincai 我的产品-->应用趋势选择控件有用，禁止选择8.1, 之前的日期，传递的是Date Object, 然后传给datepicker使用
        maxDate: +0 // add by chenjincai 仅支持数字，用于设置最大可以选择的日期
      };

      if (options) {
        var set = $.extend(false, {}, defaults, options);
      }

      $this.set = set;

      init($this, set);

      $.extend($.fn.ProSelect.prototype, {
        alert: function(){ console.log(set) },
        buildmodule: function() {
          if (set.temp) {
            if (set.inputname.length == set.inputval.length) {
              var _temp = '<div id ="' + set.tempid + '"><ul>';

              for (i = 0; i < set.inputname.length; i++) {
                var val  = set.inputval[i] == '' ? 'custom' :  set.inputval[i];
                _temp += '<li set-value="'+ val +'">' + set.inputname[i] + '</li>'
              }

              _temp += '</ul></div>';
            }
          }
          return _temp;
        },
        bindclick: function($this) {
          var $t = $this;

          $('#' + set.tempid).find('li').each(function() {
            $(this).live('click', function() {

              if ($(this).attr('set-value')!='') {
                var n = $(this).attr('set-value');

                if ($t.set.maxDate !== 0) {
                  n = parseInt(n) + $t.set.maxDate;
                }

                var days = [];

                if ($t.set.minDate !== null && $t.set.minDate > new Date($.GetDate(parseInt(n))[0])) {
                  days.push(($t.set.minDate.getFullYear() + '-' + ($t.set.minDate.getMonth()+1) + '-' + $t.set.minDate.getDate()).replace(/\b(\w)\b/g, '0$1'))
                } else {
                  days.push($.GetDate(parseInt(n))[0]);
                }

                days.push($.GetDate(parseInt($t.set.maxDate), true)[1]);

                //var days = $.GetDate(parseInt(n));
                $t.html('<span class="start">' + $.replaceDate(days[0]) + '</span>' + ' - ' + '<span class="end">' + $.replaceDate(days[1]) + '</span><b class="icon pulldown"></b>');

                $('#' + set.tempid).hide();

                window.global.pickedStartDay = days[0];
                window.global.pickedEndDay = days[1];
                window.global.pickedDays = Math.abs(n);

                var label = window.global.pickedDays + '天';
                $t.set.callback(days,window.global.pickedDays);

                _track_userEvent('新功能监测_时间选择控件', '点击', label);
                var pd = $("#pd").val();
                if(pd==1){
                	djl();
                }else{
                	lll();
                }
              } else {
                $('#datepickerStart').show();
              }

              return false;
            });
          });
        },
        datepickerInit: function() {

          $("#datepickerStart").datepicker({
            dateFormat: "yy-mm-dd",
            inline: true,
            defaultDate: datePickerArray.startDay,
            minDate: $this.set.minDate,
            maxDate: $this.set.maxDate,
            yearRange: '2000:' + window.thisYear,
            onSelect: function(dateText, inst, e) {
              $("#datepickerEnd").datepicker('option', 'minDate', dateText);
              datePickerArray.startDay = dateText;
              return false;
            }
          });

          $("#datepickerEnd").datepicker({
            dateFormat: "yy-mm-dd",
            inline: true,
            defaultDate: datePickerArray.endDay,
            minDate: $this.set.minDate,
            maxDate: $this.set.maxDate,
            yearRange: '2000:' + window.thisYear,
            onSelect: function(dateText, inst, e) {
              $("#datepickerStart").datepicker('option', 'maxDate', dateText);
              datePickerArray.endDay = dateText;
              return false;
            }
          });
        }
      });

      _setDefault(set);

      return $this;
    }
  };

  var init = function($this,op) {
    $this.bind('click', function() {
      if (!$('#' + op.tempid).is(':visible')) {
        window.hidePopFrame();

        if (!$this.next().is('#' + op.tempid)) {
          $this.after($this.ProSelect.prototype.buildmodule);
          _custom($this,op);
          $this.ProSelect.prototype.bindclick($this);
        } else {
          $('#'+op.tempid).show();
        }
      } else {
        $('#'+op.tempid).hide();
      }

      op.show = true;

      $('.ui-datepicker-calendar').live('click', function(e) {
        e.stopPropagation();
      });

      $('.ui-datepicker-header').live('click', function(e) {
        e.stopPropagation();
      });

      return false;
    });
  };

  function _custom($this, op) {
    if (op.custom) {
      var tmp = '<a class="customhref" href="#">' + I18n.t('components.filters.time_unit.custom') + '</a><div id="datePickerPanel" style="display:none;"><div id="datepickerStart"></div><div id="datepickerEnd"></div><input type="button" value="' + I18n.t('components.buttons.confirm') + '" class="custombtn" style="clear:both;display:block"/></div>';
      $('#' + op.tempid).append(tmp);

      $('.customhref').bind('click', function() {
        $(this).next().show();
        $this.ProSelect.prototype.datepickerInit();
        return false;
      });

      $('.custombtn').bind('click', function() {
        $('#' + op.tempid).hide();
        $('#datePickerPanel').hide();
        op.show = false;

        window.global.pickedStartDay = datePickerArray.startDay;
        window.global.pickedEndDay = datePickerArray.endDay;
        window.global.pickedDays = $.GetDate(window.global.pickedStartDay,window.global.pickedEndDay);

        var label = window.global.pickedDays + '天';

        $this.find('.start').html( $.replaceDate(datePickerArray.startDay) );
        $this.find('.end').html( $.replaceDate(datePickerArray.endDay) );

        op.callback([datePickerArray.startDay, datePickerArray.endDay], window.global.pickedDays);

        _track_userEvent('新功能监测_时间选择控件','点击',label);
        var pd = $("#pd").val();
        //周恩至根据需要添加代码起
        if(pd==1){
        	djl();
        }else{
        	lll();
        }
        //****************末
        return false;
      });
    }
  };

  //fix ui click bubbling page
  var _setDefault = function(op) {
    $(document).bind('click', function(e) {
      if ($(e.target).parents('table.ui-datepicker-calendar').length > 0 || $(e.target).parents('#datePickerPanel').length > 0 || $(e.target).parents('.ui-datepicker-header').length > 0) {
        return false;
      } else {
        $('#' + op.tempid).hide();
        $('#datePickerPanel').hide();
        op.show = false;
      }
    });
  };

})(jQuery);



;(function($){
	var moudle_func = {
		init : function(options) {
			var settings = $.extend({
				data: "",
				default_type: "",
				disable_type: "",
				default_class: "on",
				disable_class: "off",
				callback: "",
				template: "<li particle=${particle} flag=${flag} class={{if flag=='false'}}off{{/if}}>${name}</li>"
			}, options);
			$.template( "period", settings.template );
			$.tmpl( "period",settings.data ).appendTo( this );
			var $this = this;
						$this.undelegate();
            $this.delegate( $(this).children(), 'click', function(e) {
                if( $(e.target).attr("flag") == "true" ) {
                    $this.children().removeClass( settings.default_class );
                    $(e.target).addClass("on");
                    if( typeof(settings.callback) == "function" ) {
                        settings.callback( $(e.target), $(e.target).attr("particle"), $(e.target).index(), $(e.target).text() );
                    }
                }
            });
			//默认type绑定class.each函数中的$(this)指的是调用init的对象，if内部的$(this)指的是$(this).children()列表中的项
			$.each( $(this).children(), function(){
				if( settings.default_type == $(this).attr("particle") ) {
					$(this).addClass( settings.default_class );
				}
				if( settings.disable_type == $(this).attr("particle") ) {
					$(this).addClass( settings.disable_class );
					$(this).attr( "flag", "false");
				}
			})
		},
		get_status: function(){
			var el = this.children(".on");
			return el.attr('particle');
		},
		set_status: function( options ) {
			var settings = $.extend({
				'disable_class': 'off',
				'default_class': 'on',
				'disable_arr'  : '',
				'able_arr'     : '',
				'current_item' : '',
				'target_obj'   : this.children(),
				'current_obj'  : {}
			}, options);
				$.each( settings.target_obj, function(i) {
					settings.current_obj[i] = $( this ).attr("particle");
				})
				$.each( settings.disable_arr,function(i,value) {
					for( var m in settings.current_obj ) {
						if( value == settings.current_obj[m] ) {
							$( settings.target_obj[m] ).removeClass(settings.default_class);
							$( settings.target_obj[m] ).addClass( settings.disable_class );
							$( settings.target_obj[m] ).click(function(){
								$(this).attr( "flag", "false");
							})
						}
					}
				})
				$.each(settings.able_arr, function(i,value) {
					for( var m in settings.current_obj ) {
						if( value == settings.current_obj[m] ) {
							$( settings.target_obj[m] ).removeClass( settings.disable_class );
							$( settings.target_obj[m] ).click(function(){
								$(this).attr( "flag", "true");
							})
						}
					}
				})
				$.each( settings.current_obj, function(i, value) {
						if( settings.current_item != "" && settings.current_item == value ) {
							$( settings.target_obj[i] ).addClass( settings.default_class );
							$( settings.target_obj[i] ).siblings().removeClass( settings.default_class );
						}
					})

		}
	}
	$.fn.extend({
		"renderTab" : function(method){
		if( moudle_func[method] ) {
			return moudle_func[method].apply( this, Array.prototype.slice.call( arguments, 1 ) )
		}else if( typeof method === 'object' || !method ) {
			return moudle_func.init.apply( this, arguments );
		}else{
			return false;
		}
	}
	})
})(jQuery);


var Contrast = function(){
    var _this = this;
    this.PluginName = "Contrast";
    this.Version = '1.0';
    global.contrast = [];
    this.getStartDay = function(settings){
        if(settings.originSDay == ''){
            return UMENG.Agent.getDate().start_date;
        }else{
            return settings.originSDay;
        }
    };
    this.getEndDay = function(settings){
        if(settings.originEDay == ''){
            return UMENG.Agent.getDate().end_date;
        }else{
            return settings.originEDay;
        }
    };
    this.getDays = function(settings){
        if(settings.originDays == ''){
            return UMENG.Agent.getDate().counts;
        }else{
            return settings.originDays;
        }
    };
    this.tab = function(n,settings){
        var tar = settings.panel;
        if(n<=7){
            tar.find('.tabs li').removeClass('showoff');
            tar.find('.lastmonth').addClass('on').siblings().removeClass('on');
        }else if(n>7 && n<=30){
            tar.find('.showoff').removeClass('showoff');
            tar.find('.lastmonth').addClass('on');
            tar.find('.lastweek').addClass('showoff');
        }else{
            tar.find('.tabs li').addClass('showoff');
        }
    };
    this.getId = function(panelId){
        var target = $('#'+ panelId);
        return target;
    }
    this.showDatePicker = function(settings){
        var defaultDate = $.GetDate(window.global.pickedEndDay,-31);
        settings.panel.find('.myEndDate').datepicker({
            dateFormat: "yy-mm-dd",
            inline: true,
        defaultDate:defaultDate,
        maxDate : +0,
        setDate : '',
        yearRange: '2000:'+window.thisYear,
        onSelect : function(dateText, inst){
                var selected = dateText;
                var days = _this.getDays(settings);
                var sday = $.GetDate(selected,0-days);
                global.contrast = [sday,selected];
                settings.panel.find('.startday').text($.replaceDate(sday));
                settings.panel.find('.endday').text($.replaceDate(selected));
                return false;
            }
        })
        settings.panel.find('.myEndDate').datepicker('setDate',defaultDate);
    };
    this.initPanel = function(settings){
        var days = _this.getDays(settings);
        var sday = _this.getStartDay(settings);
        var eday = _this.getEndDay(settings);
        var domdays = settings.panel.find('.days');
        var domsday = settings.panel.find('.startday');
        var domeday = settings.panel.find('.endday');
        var newsday = $.GetDate(sday,-31);
        var neweday = $.GetDate(eday,-31);
        global.contrast = [newsday,neweday];
        domdays.text(days);
        domsday.text($.replaceDate(newsday));
        domeday.text($.replaceDate(neweday));
        _this.tab(days,settings);
        _this.showDatePicker(settings);
        _this.bindEvent(settings,days,eday,domdays,domsday,domeday);
        _this.bindSubmit(settings);
        return false;
    };
    this.bindEvent = function(settings,days,eday,domdays,domsday,domeday){
        var setdate = "";
        var dom = settings.panel;
        settings.panel.find('.tabs li.lastmonth a').bind('click',function(e){
            setdate = $.GetDate(eday,-31);
            newsday = $.GetDate(setdate,0-days);
            domsday.text($.replaceDate(newsday));
            domeday.text($.replaceDate(setdate));
            dom.find('.myEndDate').datepicker('setDate',0).datepicker('setDate',-30);
            global.contrast = [newsday,setdate];
            $(this).parent().addClass('on').siblings().removeClass('on');
            return false;
        });
        settings.panel.find('.tabs li.lastweek a').bind('click',function(e){
            setdate = $.GetDate(eday,-8);
            newsday = $.GetDate(setdate,-days);
            domsday.text($.replaceDate(newsday));
            domeday.text($.replaceDate(setdate));
            dom.find('.myEndDate').datepicker('setDate',0).datepicker('setDate',-7);
            global.contrast = [newsday,setdate];
            $(this).parent().addClass('on').siblings().removeClass('on');
            return false;
        })
        settings.panel.bind('click',function(e){
            e.stopPropagation();
        })
    };
    this.bindSubmit = function(settings){
        settings.panel.find('.submit').unbind('click').bind('click',function(){
            //add GA track
            if(global.pickedEndDay != ''){
                var num = ($.GetDate(global.contrast[1],global.pickedEndDay)-1).toString();
                _track_userEvent('新功能监测_时段对比', num + '天', num);
            }

            // Hacks for chartcontainer id switch
            var compareChartID = settings.panel.prev().attr('switch-id');
            if (typeof compareChartID !== 'undefined') {
                $.extend(settings, {contrastTo: compareChartID});
            }

            //$('#'+settings.contrastTo).after('<div class="loadingChart"><img src="/images/pic/ajax-loader.gif" /></div>');
            if(settings.contrastTo in UMENG.Storage.compareChart){
                UMENG.Storage.compareChart[settings.contrastTo].push(global.contrast);
            }else{
                UMENG.Storage.compareChart[settings.contrastTo] = [];
                UMENG.Storage.compareChart[settings.contrastTo].push(global.contrast);
            }
            settings.panel.hide();
            settings.callback();
        })
    };
    this.popFrame = function(dom,settings){
        if(settings.panel.is(':hidden')){
            settings.panel.show();
            _this.initPanel(settings);
        }else{
            settings.panel.hide();
        }
	
    };
    return {
        PluginName : _this.PluginName,
        Version : _this.Version,
        init : function(target,options){
            var dom = $(target);
            var defaults = {
                originDays: '',
                originSDay: '',
                originEDay: '',
                panelid : 'ContrastPanel',
                contrastTo:'chartcontainer',
                templ : UMENG.Tmpl.getTemplate('plugin.compareChart')
            }
            var settings = $.extend({},defaults,options);

            $.template("temp",settings.templ);
            dom.after($.tmpl("temp",settings));
            settings.panel = _this.getId(settings.panelid);
            dom.bind('click',function(){
                window.hidePopFrame();
                _this.popFrame(dom,settings);
                return false;
            })
        }
    }
};
UMENG.plugin.Contrast = new Contrast();
$.fn.Contrast = function(options){
	return this.each(function(){
		UMENG.plugin.Contrast.init(this,options);
	})
};



/*
*  TableRender Plugin
*
*/
;(function($){
    $.fn.renderTable = function(options){
        return this.each(function(){
            var inst = $(this);
            var tempname = new Date().getTime().toString();
            var table = inst.find('tbody');
            var loading_icon = inst.find('.wait-load');
            var pagination_nav = inst.find(".pagination");
            var buildTemp = function(tmpl,name,data,table){
                if(typeof tmpl == "string"){
                    $.template(name,tmpl);
                    return $.tmpl(name,data).appendTo(table);
                }else{
                    return $('#'+tmpl.id).tmpl(data).appendTo(table);
                }
            }
            var defaults = {
                url : '/apps/' + UMENG.APPKEY + '/reports/load_table_data',
                data : '',
                params : {
                    page: 1,
                    per_page: pagination_nav.data('perPage') || 30
                },
                showCustomPage:true,
                array_name: '',
                tmpl : '<tr><td>${date}</td><td>${data}</td><td>${rate}</td></tr>',
                callback : function(){
                    return false;
                    //animatable();
                }
            };
            var settings = $.extend(true,{},defaults,options);

            // set template of table
            if(typeof settings.tmpl == "string"){
                $.template(tempname,settings.tmpl);
            }

            if( settings.data == '' ){
                loading_icon.html('<img src="/images/pic/ajax-loader.gif" />').show();
                $.ajax({
                    url:settings.url,
                    data:settings.params,
                    dataType : 'json',
                    success:function(data){
                        var history = table.children();
                        if(data.result == 'success'){
                            loading_icon.hide();
                            settings.data = data.stats || data[settings.array_name];
                            history.remove();
                            if (settings.data && $.isArray(settings.data) && settings.data.length > 0) {

                              buildTemp(settings.tmpl,tempname,settings.data,table);
                            } else {
                              console.log(settings.nostats)
                              table.html(settings.nostats);
                            }
                            fixColumn();


                            //pagination
                            inst.find('.mod-bottom').hide();
                            if(data.total > settings.params.per_page){
                                inst.find('.mod-bottom').show();
                                pagination_nav.pagination(data.total,{
                                    items_per_page: pagination_nav.data('perPage') || 30,
                                    showCustomPage: settings.showCustomPage,
                                    current_page: parseInt(settings.params['page']) - 1,
                                    callback: function( current_page, dom ){
                                        $('table').trigger('update');
                                        $('table').trigger('destroy');
                                        inst.renderTable(
                                            $.extend(true, {}, options, {
                                                params : {
                                                    page : current_page + 1,
                                                    per_page: pagination_nav.data('perPage') || 30
                                                },
                                                callback:function(){
                                                    inst.find('.tableSorter').tablesorter();
                                                    $.publish('tableRenderPaginationCallback', [inst, settings.data]);
                                                    if(UMENG.ACTIONSTATS == 'apps'){
                                                        getSdkVersion();
                                                    }
                                                }
                                            })
                                        );
                                        return false;
                                    }
                                });
                            }else{
                                inst.find(".pagination").html('');
                                inst.find('.mod-bottom').hide();
                            }

                            settings.callback(inst, data);
                        }else{
                            table.html('');
                            inst.find(".pagination").empty();
                            inst.find('.wait-load').html('<div class="tip-noResult">'+data.msg+'</div>');
                        }
                    } // end success
                });
            }else{  // else of if( settings.data == '' )
            // using data in setting options to render table
            table.empty();
            buildTemp(settings.tmpl,tempname,settings.data,table);
            fixColumn();
            settings.callback(inst, settings.data);
        }
    });
}
/*
*	$('parentPage').animatable({
*		switch_to: $('detailPage'),
*		callback:function(){}
*	})
*/
$.fn.animatable = function(options){
    return this.each(function(){
        var origin = $(this);
        var defaults = {
            switch_to : $('#child-table'),
            callback : ''
        };
        var settings = $.extend({},defaults,options);
        var w1 = origin.width();
        origin.addClass('fl').width(w1);
        origin.wrap("<div class='pannelshow'></div>");
        origin.wrap("<div class='pannel clearfix'></div>");
        var pannel = origin.parent();
        settings.switch_to.appendTo(pannel);
        pannel.width('5000px');
        var targetHeight = getDimensions(settings.switch_to).height+$('body').height()-origin.height();
        if(targetHeight > document.documentElement.clientHeight && document.documentElement.clientHeight >= document.body.clientHeight){
            settings.switch_to.addClass('fl').width(w1-20);
        }else if(targetHeight <= document.documentElement.clientHeight && document.documentElement.clientHeight <= document.body.clientHeight){
            settings.switch_to.addClass('fl').width(w1);
        }else{
            settings.switch_to.addClass('fl').width(w1);
        }

        settings.switch_to.show();
        pannel.parent().css('overflow','hidden');
        pannel.parent().css('width',"100%");
        origin.animate(
            {
                marginLeft:'-'+w1
            },
            'slow',
            function(){
                settings.switch_to.show().removeClass('fl').width('');
                origin.hide();
                pannel.width("100%");
                settings.switch_to.find('.back').unbind('click').bind('click',function(){
                    $(this).trigger('customEvent');
                    settings.switch_to.addClass('fl').width(w1);
                    origin.show();
                    pannel.width("5000px");
                    origin.animate({
                        marginLeft:0
                    },'slow',function(){
                        settings.switch_to.hide();
                        pannel.parent().children().unwrap();
                        pannel.children().unwrap();

                    });
                    return false;
                });
                if( typeof settings.callback === 'function'){
                    settings.callback();
                }
            });
        });
    }
})(jQuery);


/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:4,
		current_page:0,
		num_edge_entries:3,
		link_to:"###",
		prev_text:I18n.t('components.pager.prev'),
		next_text:I18n.t('components.pager.next'),
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
        showCustomPage: true,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}
		
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * This function inserts the pagination links into the container element
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
				}
				else
				{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
						
						
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			}
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			// Generate interval links
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
            //custom set perpage count
            if(opts.showCustomPage){
                if(panel.data('perPage') == undefined){
                    panel.data('perPage',30);
                }
                var perPage = panel.data('perPage');
                panel.prepend('<div class="fl" style="margin-left: 5px;margin-top: 10px;">'+I18n.t("components.pager.perpage")+'\
                ：<div class="per-page js-select"><div class="selected" val="'+ perPage +'">'+ perPage +'<b class="select-corner"></b></div>\
                <ul class="options hideWhenClickBody">\
                <li>7</li><li>30</li><li>60</li><li>90</li><li>120</li>\
                </ul></div></div>');
                
                var selectPanel = panel.find('.js-select');
                selectPanel.on('click','.selected',function(){
                    selectPanel.find('.options').toggle();
                    return false;
                });
                selectPanel.find('.options li').on('click',function(e){
     				if (e.stopPropagation) {
     					e.stopPropagation();
     				}
     				else {
     					e.cancelBubble = true;
     				}
                    selectPanel.find('.options').toggle();
                    var num = $(this).text();
                    selectPanel.find('.selected').html(num + '<b class="select-corner"></b>').attr('val',num);
                    panel.data('perPage',num);
                    return opts.callback(0, panel);
                 });
                 //fix select style
                 var _selfTop = selectPanel.offset().top;
                 var _copyTop = $('.copyright').offset().top;
                 if(_copyTop - _selfTop > 200){
                     selectPanel.addClass('select-down');
                 }
                 
            }else{
                
            }
            
		}
		
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
	});
};




/*plugin DownList
*@params{
*		is_ajax,default false;
*		callback require : class 'event' , callback param : elem.event by clicked;
*             }
* inst.DownList('get')
*/
$.fn.DownList = function(options){
    var defaults = {
        is_ajax: false,
        url: '',
        params: '',
        search: 'off',
        clearFilter: false,
        shiftName:'',
        arrayName: '',
        searchTemp: '<li><a class="event" data-id="${id}" title="${name}" href="?version=${encodeID}">${name}</a></li>',
        listmodel :'.select-body',
        temp: '<li><a class="event" href="${id}" data-id="${id}" id="${id}" title="${name}">${name}</a></li>',
        callback:function(elem){}
    }
    var inst = $(this);
    var realHeight = 0;
    if(typeof(options)==='string' && options=='get'){
        return inst.find('.selected');
    }else if(typeof(options)==='string' && options=='set'){
        var select = Array.prototype.slice.call(arguments, 1);
        var selected = inst.find('.selected');
        selected.attr('data-id', select[0]);
        selected.text(select[1]);
        return inst;
    }
    var settings = $.extend({},defaults,options);
    var list_panel = inst.find(settings.listmodel);
    var list = list_panel.find('.select-list');
    if(settings.is_ajax){
        inst.data('data','');
        inst.unbind('click').bind('click',function(e){
            if(settings.search == 'on'){
                var search = '<div class="list_search"><input type="text" class="input" placeholder="'+I18n.t('components.search.name')+'"></div>';
                inst.find('.select-head').append(search);
                var input = inst.find('.list_search input');
                input.focus();
                input.bind('click',function(){
                    return false;
                })
            };
            window.hidePopFrame(list_panel);
            if(list_panel.is(':visible')){
                list_panel.hide();
                if(realHeight != 0){
                    inst.parents('.mod').height(realHeight);
                }
            }else{
                list_panel.show();
                if(inst.data('data')==''){
                    inst.find('.load').show();
                    ///Fix select overflow
                    fixHeight();
                    $.ajax({
                        url:settings.url,
                        data:settings.params,
                        success:function(data){
                            data.datas = data.datas || data[settings.arrayName];
                            if(data.result == 'success'){
                                if(settings.clearFilter){
                                    data.datas.unshift({
                                        id: "",
                                        is_shown: "true",
                                        name: settings.shiftName
                                    })
                                };
                                inst.find('.load').hide();
                                $.template('ddltemp',settings.temp);
                                //encode id
                                $.each(data.datas,function(i,o){
                                    o.encodeID = encodeURIComponent(o.id);
                                });
                                $.tmpl('ddltemp',data.datas).appendTo(list);
                                if(data.datas.length>0){
                                    inst.data('data',data.datas);
                                }else{
                                    inst.data('data','');
                                }
                                fixHeight();
                                bindCallback();
                            }else{
                                list_panel.html('<div style="text-align:center;">'+data.msg+'</div>');
                                fixHeight();
                                bindCallback();
                            }
                        }
                    })
                }else{
                    fixHeight();
                }
            };
            if(e.target != e.currentTarget){
                stopBubble(e);
            }
        });
    }else{
        inst.unbind('click').bind('click',function(e){
            if(settings.search == 'on'){
                var search = '<div class="list_search"><input type="text" class="input" placeholder="'+I18n.t('components.search.name')+'"></div>';
                inst.find('.select-head').append(search);
                var input = inst.find('.list_search input');
                input.focus();
                input.bind('click',function(){
                    return false;
                })
            };
            ///Fix select overflow
            fixHeight();
            window.hidePopFrame(list_panel);
            if(list_panel.is(':visible')){
                list_panel.hide();
            }else{
                list_panel.show();
                bindCallback();
            };
            if(e.target != e.currentTarget){
                stopBubble(e);
            }
        })
    };
    inst.delegate('.list_search input','keyup',function(e){
        var that = $(this);
        var txt = that.val();

        if(inst.data('data') != ''){
            var list = inst.find('.select-list');
            if(txt != ''){
                var res = $.dataFilter(inst.data('data'),txt);
                $.template('ddltemp',settings.searchTemp);
                list.html('');
                $.tmpl('ddltemp',res).appendTo(list);
                bindCallback()
            }else{
                $.template('ddltemp',settings.searchTemp);
                list.html('');
                $.tmpl('ddltemp',inst.data('data')).appendTo(list);
                bindCallback();
            }
        }
    });
    //input获取焦点时，展示所有数据
    inst.delegate('.list_search input', 'focus', function(e){

        if(inst.data('data') != ''){
            $.template('ddltemp',settings.searchTemp);
            list.html('');
            $.tmpl('ddltemp',inst.data('data')).appendTo(list);
            bindCallback();
        }

    });


    if(settings.search == 'on'){
        $(document).bind('click',function(){
            inst.find('.list_search').remove();
        });
    };
    var fixHeight = function(){
        var height = inst.find('.select-body').height();
        var maxHeight = inst.find('.select-body').css('max-height').split('px')[0] || "";
        var mod = inst.parents('.mod');
        var h = mod.find('.mod-body').height();
        if(maxHeight != "" && height > h){
            realHeight = h;
            if(mod.height()<maxHeight){
                mod.css('min-height',height+35);
            }
        }
    };
    var bindCallback = function(){
        list.find('.event').unbind('click').bind('click',function(e){
            inst.find('.selected').text($(this).text()).attr({'id': $(this).attr('id'),'data-id': $(this).attr('data-id')});
            list_panel.hide();
            inst.find('.list_search').remove();
            settings.callback($(this));
            stopBubble(e);
        });
    }
};


/**
 * Guide tips
 * wangfang@umeng.com
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "guideTip",
        defaults = {
            top: 0,
            left: '-31px',
            border: false,
            corner: 'bottom',
            text: '',
            // width: 285,
            close: function() {}
        };

    function Plugin ( element, options ) {
        this.el = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var _ = this,
                $el = $(_.el),
                originBorderStyle = $el.css('border'),
                $guide = $('<div class="arrow-box arrow-box-' + _.settings.corner + '"><p>' + _.settings.text + '</p><span class="arrow-box-close">x</span></div>');

            if (_.settings.border) { $el.css('border', '1px solid #00CFD0'); }

            $el.append( $guide );

            $guide
                .css({'left': _.settings.left, 'top': _.settings.top})
                .find('.arrow-box-close').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $el.css('border', originBorderStyle);
                    $guide.remove();

                    _.settings.close();
                });
        }
    };


    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        return this;
    };

})( jQuery, window, document );


;(function(){
  // app_search display logic
  //
  // for reports and tools layouts:
  // load @apps to display partial apps, search for the entire apps.
  //
  // display:
  // == 1  app,  no listing, no search
  // <= 10 apps, listing, no search
  //  > 10 apps, listing and search

  var all_apps = $(".js-select-list li");

  $(".js-app-select").click(function(e){
    e.stopPropagation();
    $(".js-select-list").css("display","block");
    if( all_apps.size() > 10 ) {
      $( this ).css("display","none");
      $(".js-search-Apps").css("display","block");
      $(".js-search-Apps").focus();
    }
  });
  $('.js-select-list').delegate('li', 'click', function(){
    $(".js-search-Apps").val( $(this).text() );
    showSelect( $(this).attr( "key" ), $(this).attr( "app_id" ) );
  });
  $(document).click(function(){
    $(".js-search-Apps").css("display","none");
    $(".js-app-select").css("display","block");
    $(".js-select-list").css("display","none");
  })
  $(".js-search-Apps").bind('click', function(){
    return false;
  }).bind('keyup', function(){
    send_ajax();
  });
  var flag;
  function send_ajax(response){
    clearTimeout(flag);
    flag = setTimeout(function(){
      var query = $("#search_apps").val();
      var post_url = "/apps/search_apps.json";
      var current_item = $('.topNav .currentItem').index();
      $.ajax({
        type: 'post',
        data: {'query': query, 'current_item': current_item},
        url: post_url,
        success: function(res){
          window.s = res;
          if( res == "" ) {
            if( query == "" ) {
              $(".js-select-list li").remove();
              $(".js-select-list").append(all_apps);
              if( all_apps.size() > 10 ) {
                $(".js-select-list").css("overflow-y","scroll");
              }
            }else{
              $(".js-select-list li").remove();
              $(".js-select-list").removeAttr("style");
              $(".js-select-list").html('<li class="result_empty">'+I18n.t('components.search.result_nil')+'</li>');
              $(".js-select-list .result_empty").click(function(){
                return false;
              })
            }
          }else {
            var obj = {};
            var arr = [];
            for(i in s){
              name = s[i][0];
              key = s[i][1];
              appid = s[i][2];
              platform = s[i][3];
              if(platform == 'iphone'){
                platform_name = 'iPhone';
                platform_pic_name = 'ios';
              }
              else if(platform == 'ipad'){
                platform_name = 'iPad';
                platform_pic_name = 'ipad';
              }
              else if(platform == 'wphone'){
                platform_name = 'Windows Phone';
                platform_pic_name = 'window-phone';
              }
              else if(platform == 'wphone8'){
                platform_name = 'Windows RT';
                platform_pic_name = 'window-phone8';
              }
              else{
                platform_name = 'Android';
                platform_pic_name = 'android';
              }

              obj = {'key':key,'appid':appid,'name':name,'platform_name':platform_name, 'platform_pic_name':platform_pic_name};
              arr.push(obj);
              obj = {};
            }
            $.template("respTemplate","<li key=${key} app_id=${appid}><img alt=${platform_name} title=${platform_name} width='20' src='/images/icons/${platform_pic_name}.png' />${name}</li>");
            $(".js-select-list li").remove();
            $.tmpl("respTemplate",arr).appendTo(".js-select-list");

            if( res.length <=10 ) {
              //remove scroll
              $(".js-select-list").removeAttr("style");
            }

          }

        },
        error: function(res){
         }
      });
    }, 800)

  }
})();

// app_title: 'all_apps' or nil
function showSelect(app_title, app_id) {
  var page_type = '';

  if(location.pathname.indexOf("feedbacks") > 0 || location.pathname.indexOf("socials") > 0 || location.pathname.indexOf("online_config") > 0 || location.pathname.indexOf("upload") > 0 || location.pathname.indexOf("sns") > 0 || location.pathname.indexOf("messages") > 0) {
    page_type = 'component';
  }

  if(app_title == "all_apps"){
      // component pages
      if(page_type == 'component'){
        redirect_url = "/apps/feedbacks";
      } else{
        redirect_url = "/apps/";
      }
  } else{
    var redirect_url = '/apps/' + app_id + '/link_with_permission?location=' + encodeURIComponent(location.pathname);
  }

  window.location.href = redirect_url;
};


;(function($,UMENG,undefined){
    if(UMENG != undefined){
        UMENG.Agent = UMENG.Agent || {};
        function Agent(){
            //actionStats
            var as = $('#action_stats');
            if(as != undefined && as.length > 0){
                this.actionStats =  $('#action_stats').val();
            };
            //userDate
            this.getDate = function() {
                if ($('.dateselect').length > 1) {
                    var result = {};

                    result.date_count = $('.dateselect').length;

                    $('.dateselect').each(function(i, el) {
                        var startDate = $('.start', el).text().replace(/\./g,'-');
                        var endDate = $('.end', el).text().replace(/\./g,'-');
                        startDate == '' ? startDate = $.GetDate() : startDate = startDate;
                        endDate == '' ? endDate = $.GetDate() : endDate = endDate;
                        var c = $.GetDate(startDate,endDate);

                        result[$(el).attr('id')] = {
                            start_date: startDate,
                            end_date: endDate,
                            counts: c
                        };
                    });

                    return result;

                } else if ($('.dateselect').length > 0) {
                    var startDate = $('.dateselect .start').text().replace(/\./g,'-');
                    var endDate = $('.dateselect .end').text().replace(/\./g,'-');
                    startDate == '' ? startDate = $.GetDate() : startDate = startDate;
                    endDate == '' ? endDate = $.GetDate() : endDate = endDate;
                    var c = $.GetDate(startDate,endDate);

                    return {
                        start_date: startDate,
                        end_date: endDate,
                        counts: c
                    };
                } else {
                    return '';
                }

            };
            //
            this.getFilters = function(){
                var v = [], c = [],s = [];
                if($('#filter-version').data('checked') != undefined){
                    v.push($('#filter-version').data('checked').check == true ? $('#filter-version').data('checked').id : '');
                }else{
                    v.push('');
                }

                if($('#filter-channel').data('checked') != undefined){
                    c.push($('#filter-channel').data('checked').check == true ? $('#filter-channel').data('checked').id : '');
                }else{
                    c.push('');
                }

                if($('#filter-segment').data('checked') != undefined){
                    s.push($('#filter-segment').data('checked').check == true ? $('#filter-segment').data('checked').id : '');
                }else{
                    s.push('');
                }
                return {
                    versions: v,
                    channels: c,
                    segments: s
                }
            };

            this.getTimeunit = function(){
                var unit = $('.js-um-timeUnit').timeUnit('getUnit');
                if(unit.length > 0){
                    return unit;
                }else{
                    return 'daily';
                }
            };
            this.getTimeunitArray = function(){
                var unit = [];
                $('.js-um-timeUnit').each(function(){
                    unit.push($(this).timeUnit('getUnit'));
                });
                return unit;
            };
            this.buildParams = function(params){
                params = params || {};

                var date = (typeof(this.getDate().date_count) === 'undefined') ? this.getDate() : undefined; // if has multi date, set undefined
                var filters = this.getFilters();
                //TODO : hide timeUnit params: proid
                var timeunit = this.getTimeunit();
                var stats = UMENG.ACTIONSTATS;
                var p = $.extend({},date,filters,{time_unit: timeunit,stats: stats},params);
                delete p.counts;
                return p;
            }

        }
        UMENG.Agent = new Agent();
    }else{
        console.log('E: UMENG(OBJECT) NOT DEFINED!');
    }
})(jQuery,window.UMENG)

/*
 * new render chart plugin
 * author: linan@umeng.com
 * date: 2013/10/14
 * base on jQuery, Highcharts.
 * update: 2014/04/10 remove callback when ajax return failed
 */

;(function($,undefined){
    $.widget('umeng.renderChart',{
       options: {
           url: '/apps/'+ UMENG.APPKEY +'/reports/load_chart_data',
           params: {},
           chartParams: {},
           callback: function(){
               //console.log('callback!')
           }
       },
       //Init plugin
       _init: function(){
           //destroy cruuent chart
           try{
               this.element.highcharts().destroy();
           }catch(e){}
           //loading
           this.element.html(UMENG.Tmpl.getTemplate('plugin.chartLoading'));
           this.chartDNA = MD5(JSON.stringify(this.options.params) + this.options.url);
           this._getSeries();
       },
       _commonOptions:function(){
           var that = this;
           return {
               colors:['#4096B5', '#ED7054', '#47C6C9', '#E5A653', '#399960', '#CC4A5A', '#9BAD4E', '#DB4F82', '#7E58AF','#CC5CB7'],
               // xAxis: {
//                    labels: {
//                        align:"center",
//                        formatter: function(){
//                          if (typeof(this.value) == "string") {
//                            return this.value.split(':')[0];
//                          } else {
//                            return this.value;
//                          }
//                        }
//                    }
//                },
               tooltip: {
                   enabled: true,
                   formatter: function() {
                       //hourly data
                       if( that.options.params['time_unit'] == 'hourly' ){
                           var date_and_time =  this.key.split(' ');
                           if(date_and_time.length > 1) {
                               var hourFormat = date_and_time[1].split(':');
                               return date_and_time[0] + " " + parseInt(hourFormat[0], 10) + "~" + (parseInt(hourFormat[0], 10)+1) +" "+I18n.t('components.filters.time_unit.hour_unit')+": " + this.y;
                           } else {
                               return parseInt(date_and_time[0], 10) + "~" + (parseInt(date_and_time[0], 10)+1) +" "+I18n.t('components.filters.time_unit.hour_unit')+": " + this.y;
                           }
                       }else{
                           //normal data
                           return this.key + getHoliday(this.key,this.series.userOptions) +': ' + this.y;
                       }
                   }
               },
               legend: {
                 margin: 25,
                 enabled: true
               },
               title:{
                   text:''
               },
               subtitle: {}
           }
       },
       _readCache: function(chartDNA){
           for(i in UMENG.Storage.charts){
               if(UMENG.Storage.charts[i].chartID == chartDNA){
                   return UMENG.Storage.charts[i].chartBody;
               }
           }
           return undefined;
       },
       //TODO: write cache
       _writeCache: function(options){
           var chartDNA = MD5(JSON.stringify(this.options.params) + this.options.url);
           UMENG.Storage.charts.push({
               chartID: chartDNA,
               chartBody: options,
               callback: this.options.callback
           })
       },
       //Get series by ajax
       _getSeries: function(){
           var chartDNA = MD5(JSON.stringify(this.options.params) + this.options.url);
           var that = this;
           var data = this._readCache(chartDNA);
           if(data != undefined){
               //update callback function
               function docallback(){
                   var s = data.summary;
                   that.element.data('currentChart',that.chartDNA);
                   if(s != undefined){
                       that.options.callback(that.element,s);
                   }else{
                       that.options.callback(that.element);
                   }
               }
               var chart = new Highcharts.Chart($.extend(true,that._commonOptions(),data),docallback);
           }else{
               $.ajax({
                   type: 'get',
                   url: that.options.url,
                   data: that.options.params,
                   success: function(results){
                       if(results.result != 'success'){
                           that.errorResult(results,that.options,that.element);
                       }else{
                           var tmpStats = results.stats;
                           if (that.options.dataCallback && typeof that.options.dataCallback === 'function') {
                             var reformedData = that.options.dataCallback(results.stats);
                             if (reformedData) {
                               tmpStats = reformedData;
                             }
                           }
                           var newResult = $.extend({}, results, {stats: tmpStats});
                           that._renderSeries(newResult);
                       }
                   }
               })
           }
       },
       //Set chart params, render Chart
       _renderSeries: function(results){
           var chartId = this.element.attr('id'),
               series = [],
               categories = results.dates,
               that = this,
               serie = results.stats,
               summary = results.summary;
           $.each(serie, function(i,serie){
               //only one data show point
               if(serie.data.length == 1){
                   series[i] = $.extend(true,{visible:true}, {marker:{enabled: true}},serie,{workWeekend: results.work_weekend_days,holidays: results.holidays} );
               }else{
                   series[i] = $.extend(true,{visible:true}, serie, {workWeekend: results.work_weekend_days,holidays: results.holidays});
               }
               //modify the last point
               /*
               var l = series[i].data.length;
                              var lastPoint = series[i].data[l-1];
                              series[i].data[l-1] = {
                                  y: lastPoint,
                                  marker:{
                                      enabled: true,
                                      symbol: 'url(/demo/gfx/sun.png)'

                                  }
                              }*/

           });
           var currentChartOptions = $.extend(true,{},{
                   chart: {
                       renderTo: chartId,
                       height: 300,
                       defaultSeriesType: "line",
                       animation: false
                   },
                   plotOptions: {
                       area:{
                           "stacking":null
                       },
                       series: {
                           marker: {
                               radius:2,
                               enabled: true,
                               symbol: 'circle',
                               fillColor: '#FFFFFF',
                               lineWidth: 1,
                               lineColor: null
                           },
                           animation: false,
                           events: {
                               legendItemClick: function(event) {
                                   var legendName = this.name+'_<dot>';
                                   var tempSeries = this.chart.series;
                                   var seriesLength = tempSeries.length;
                                   for (var i=0; i < seriesLength; i++){
                                       if (tempSeries[i].name == legendName){
                                           tempSeries[i].visible ? tempSeries[i].hide() : tempSeries[i].show();
                                       }
                                   }
                               }
                           }
                       }
                   },
                   credits: {
                       "enabled":false
                   },
                   yAxis: {
                       startOnTick: false,
                       minPadding: 0.1,
                       allowDecimals: false,
                       title:"",
                       min:0,
                       labels:{
                         formatter: function(){
                           return abbrNum(this.value,2);
                         }
                       }
                   },
                   xAxis: {
                     categories: categories,
                     labels:{
                         align:"center",
                         maxStaggerLines: 1,
                         formatter:function(){
                             //this.value
                             var d = this.value.split(' ')[0].split('-');
                             if(d.length == 3){
                                 return d[1] + '-' + d[2];
                             }else{
                                 return this.value;
                             }
                         },
                         step: parseInt(categories.length / 7)
                     }
                   },
                   series: series,
                   workWeekend: results.work_weekend_days,
                   holidays: results.holidays
               },
               that.options.chartParams
           );
           var chartOptions = $.extend(true,{},that._commonOptions(),currentChartOptions);
           //cache chart options
           if(summary != undefined){
               currentChartOptions.summary = summary;
           }

           //add compare chart series
           /*
            * CompareChart has a Array(startDate,endDate) in Storage. when renderChart , check array whether it is NULL,
            * if has elements, require host for compareChart, and merge data to origin serie, and md5 the require params ,and cache data
            * with key of md5.After this, when check compareChart, if has md5 key,return data.
            */
           //TODO auto add compare chart
           if(UMENG.Storage.compareChart && UMENG.Storage.compareChart.length < 0){
               var compareSerie = this.renderCompareChart(this.options);
               //chartOptions.series.push(compareSerie);
           };

           //set highcharts theme
           //Highcharts.setOptions(chartOptions);
           function doCallback(){
               try{
                   that.options.callback(that.element,summary);
               }catch(e){}
           };
           //Dom render highcharts, Callback

           //render weekend
           for(var s=0;s<chartOptions.series.length;s++){
               var cat = currentChartOptions.xAxis.categories;
               $.each(cat,function(ii,date){
                   var ww = currentChartOptions.workWeekend;
                   var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
                   if(reg.test(date)){
                       var index = new Date(date).getDay();
                       if(index == 0 || index == 6){
                           if(ww != undefined && ww.indexOf(date) == -1){
                               //fill point
                               var originWeekend = chartOptions.series[s].data[ii];
                               chartOptions.series[s].data[ii] = {
                                   y: chartOptions.series[s].data[ii],
                                   marker:{
                                       symbol:'circle',
                                       fillColor: chartOptions.colors[s%10],
                                       states:{
                                           hover:{
                                               fillColor:chartOptions.colors[s%10]
                                           }
                                       }
                                   }
                               }
                           }else{
                               //work weekend
                               var originWeekend = chartOptions.series[s].data[ii];
                               chartOptions.series[s].data[ii] = {
                                   y: chartOptions.series[s].data[ii]
                               }
                           }
                       }
                   }
               });
           };


           //render holidays
           if(currentChartOptions.holidays){
               for(h=0;h<currentChartOptions.holidays.length;h++){
                   var cat = currentChartOptions.xAxis.categories;
                   var hd = currentChartOptions.holidays[h];
                   var n = cat.indexOf(hd.date);
                   for(var s=0;s<chartOptions.series.length;s++){
                       var originData = chartOptions.series[s].data[n];
                       if(typeof originData == 'object'){
                           originData = originData;
                       }else{
                           chartOptions.series[s].data[n] = {
                               y: originData,
                               marker:{
                                   symbol:'circle',
                                   fillColor: chartOptions.colors[s%10],
                                   states:{
                                       hover:{
                                           fillColor:chartOptions.colors[s%10]
                                       }
                                   }
                               }
                           }
                       }
                   }
               };
           }


           this._writeCache(chartOptions);
           //add params to series;
           var chart = new Highcharts.Chart(chartOptions,doCallback);
           /*
           this.element.highcharts({
                series: series
           });
           */


           //cache current chart md5 with el data
           this.element.data('currentChart',this.chartDNA);
       },
       renderCompareChart: function(options){
           var date = UMENG.Storage.compareChart[this.element[0].id] || [[UMENG.Agent.getDate().start_date,UMENG.Agent.getDate().end_date]],
               that = this,
               u = '',
               opt = options || {};
           try{
               var chart = that.element.highcharts();
               var seriesNum = chart.series.length;
               'url' in opt ? u = opt.url : u = '/apps/'+ UMENG.APPKEY +'/reports/load_chart_data';
               this.element.after('<div class="loadingChart"><img src="/images/pic/ajax-loader.gif" /></div>');
               $.ajax({
                   type: 'get',
                   url: u,
                   data: UMENG.Agent.buildParams($.extend(true, {}, {start_date: date[date.length-1][0], end_date: date[date.length-1][1], original_data_count: chart.xAxis[0].categories.length,
                       is_compared: true}, opt.params)),
                   success: function(data){
                       that.element.parent().find('.loadingChart').remove();
                       if(data.result == 'success'){
                           chart.addSeries(makeData(data,chart.options.colors[seriesNum]));
                       }
                   }
               });
           }catch(e){console.log("error: ",e);}
           function makeData(data,color){
               var series = {};
               series.data = [];
               series.name = data.stats[0].name;
               series.color = color;
               for(i in data.stats[0].data){
                   series.data.push({
                       y: data.stats[0].data[i],
                       name: data.dates[i]
                   })
               }
               return series;
           }
       },
       setSeries: function(){

       },
       setOption: function(opt){
           if(opt != undefined){
               this.options = $.extend(true,this.options,opt);
           }else{
               return false;
           }
       },
       errorResult: function(results,options,elem){
           this.element.html('<div class="tip-noResult">' + results.msg + '</div>');
           try{
               //this.options.callback(this,this.options);
           }catch(e){}
       },
       destroy: function(){
           console.log('destroy!');
           $.Widget.prototype.destroy.call(this);
       }
    });
})(jQuery);


/*
 * Usage:UMENG.Tmpl.getTemplate(param);
 */
;(function($,U){
    function Template(){
        this.setTemplate = function(key,temp){
            for(i in this.custom){
                if(i == key){
                    this.custom.key = temp;
                    return;
                }
            }
            this.custom[key] = temp;
        };
        this.getTemplate = function(key){
            var _template = _getTemplateID(this.temps,key);
            if(_template != undefined){
                return _template;
            }else if(_template != undefined){
                return _template;
            }else{
                return '';
            }
        };
        function _getTemplateID(ns,key){
            var n = ns;
            var k = key.split('.'),
                o = ns;
            for(i=0,l=k.length;i<l;i++){
                o = o[k[i]];
            }
            return o;
        }
    }
    //backend set language //I18n.locale
    Template.prototype.temps = {
        plugin:{
            chartLoading: '<div class="load-chart"><p><img src="/images/pic/ajax-loader.gif"></p></div>',
            compareChart: '<div class="mod singledate" id="${panelid}" style="display:none">'+
                            '<div class="mod-header clearfix"><h2><span class="startday">2012.12.23</span> - <span class="endday">2012.12.24</span></h2><div class="option">(<span class="days"></span>'+I18n.t('components.filters.time_unit.day_unit')+')</div></div>'+
                            '<div class="mod-body">'+
                                '<div class="">'+
                                    '<div class="tabs">'+
                                        '<ul class="clearfix">'+
                                            '<li class="lastmonth"><a href="#">'+I18n.t('components.compare.last_month')+'</a></li>'+
                                            '<li class="lastweek"><a href="#">'+I18n.t('components.compare.last_week')+'</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<div class="myEndDate">'+
                                    '</div>'+
                                    '<div class="form">'+
                                    I18n.t('components.compare.select_end')+'<input type="button" class="submit"  value="'+I18n.t('components.buttons.confirm')+'"/>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
        },
        pages:{
            'active_user':{
                
            },
            'benchmark':{
                parentTable: '<tr><td>${name}</td><td>${app_stat}</td><td>${all_range_average}</td><td>${all_range_rank}</td><td>${same_range_average}</td><td>${same_range_rank}</td><td><a href="#" class="show_more" data-item="${item}" data-name="${name}">'+I18n.t("components.labels.expand")+'</a></td></tr>',
                childTable:'<tr><td>${date}</td><td>${app_stat}</td><td>${all_range_average}</td><td>${all_range_rank}</td><td>${same_range_average}</td><td>${same_range_rank}</td></tr>'
            },
            'interval': {
                fixDate: '<div class="mod singledate" id="${panelid}" style="display:none">' +
                  '<div class="mod-header clearfix">' +
                    '<h2><span class="startday"></span> - <span class="endday"></span></h2>' +
                    '<div class="option">(<span class="days"></span>'+I18n.t('components.filters.time_unit.day_unit')+')</div></div>' +
                    '<div class="mod-body">' +
                      '<div class="">' +
                        '<div class="tabs">' +
                          '<ul class="clearfix">' +
                            '<li class="on" date-length="-30"><a href="#">'+I18n.t('components.filters.time_unit.last_30_day')+'</a></li>' +
                          '</ul>' +
                        '</div>' +
                        '<div class="myEndDate">' +
                        '</div>' +
                        '<div class="form">' +
                          I18n.t('components.filters.end_date_select')+'<input type="button" class="submit"  value="'+I18n.t('components.buttons.confirm')+'"/>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>'
            },
            'versionList': {
                exportTmpl:'<div class="panelExportCustom"><div class="small-corner"></div><h4>'+I18n.t('components.filters.time_select')+':</h4><div>'+I18n.t('components.filters.start_date')+'&nbsp;<input type="text" class="input exportStart" size="30"/></div><div>'+I18n.t('components.filters.end_date')+'&nbsp;<input type="text" class="input exportEnd" size="30"/></div><div class="exportSubmit"><input type="button" value="'+I18n.t('components.buttons.confirm')+'" class="button inputExportSubmit"/></div></div>'
            }
        }
        
    };
    Template.prototype.custom = {
        
    };
    U.Tmpl = new Template();
})(jQuery,window.UMENG)

$(document).ready(function(){
  $('a#login_testin').click(function() {
    $.ajax({
      type: 'post',
      url: '/users/logon_testin.json',
      data: { consumer: 'testin' },
      error: function(data) {
        alert('请重新登录');
        window.location.href = '/users/sign_in';
      },
      success: function(data){
        var status = data['status'];
        if(status == 200){
          window.location.href = data['callback_url'];
        } else {
          alert('无法连接');
        }
      }
    });

    return false;
  });

  $('a#login_aliyun').click(function() {
    $.ajax({
      type: 'post',
      url: '/users/logon_testin.json',
      data: { consumer: 'aliyun' },
      error: function(data) {
        alert('请重新登录');
        window.location.href = '/users/sign_in';
      },
      success: function(data){
        var status = data['status'];
        if(status == 200){
          window.location.href = data['callback_url'];
        } else {
          alert('无法连接');
        }
      }
    });

    return false;
  });

  $('a#login_pgyer').click(function() {
    $.ajax({
      type: 'post',
      url: '/users/logon_testin.json',
      data: { consumer: 'pgyer' },
      error: function(data) {
        alert('请重新登录');
        window.location.href = '/users/sign_in';
      },
      success: function(data){
        var status = data['status'];
        if(status == 200){
          window.location.href = data['callback_url'];
        } else {
          alert('无法连接');
        }
      }
    });

    return false;
  });
});


$.fn._export = function(e,options){
    var inst = $(this);
    getCsv(e);
    function getCsv(tar){
        var action = '';
        var params = '';
        if(UMENG.ACTIONSTATS != undefined){
            action = UMENG.ACTIONSTATS + '_csv';
        }
        var defaults = {
            contrast:global.contrast,
            secend_param:'',
            url:'/apps/'+global.appid+'/reports/load_table_data',
            stats: action
        }
        params = $.extend(true,{},UMENG.Agent.buildParams(defaults),options);
        inst.addClass('export-icon-load');
        if(params.group !=''){
            params.group_id = $('#'+params.group).DownList('get').attr('id');
            params.group = "";
        }
        if(params.events !=''){
            params.event_id = $('#'+params.events).DownList('get').attr('id');
            params.events = "";
        }
        if($.type(params.secend_param) != 'string'){
            params.stats = params.stats  + '_csv_' + params.secend_param.renderTab('get_status');
            delete params.secend_param;
        };
        $.ajax({
            url: params.url,
            type: 'get',
            data: params,
            success: function(data){
                callbackFunc(tar,data);
            },
            error:function(e){
                alert(I18n.t('components.msg.load_error'));
                inst.removeClass('export-icon-load');
            }
        });
    };
    function callbackFunc(e,data){
        var right = e.offsetX+35 +'px';
        var top = e.offsetY+20+'px';
        if(data.result == 'success'){
            inst.removeClass('export-icon-load');
            inst.after('<div class="tip-export"><div class="small-corner"></div><a class="fr close font-highlight"><b class="icon icon-close"></b></a>'+I18n.t('page_misc.download_center.redirect_link', {'aleft':'<a href="/apps/download_center" class="font-highlight close">', 'aright':'</a>'})+'&nbsp;</div>');
            setTimeout(function(){
                $('.tip-export').fadeOut('fast',function(){
                    $('.tip-export').remove();
                })
            },4000)
        } else{
            //alert(data['msg']);
            inst.removeClass('export-icon-load');
            //inst.after('<div class="tip-export"><a class="fr close font-highlight">知道了<b class="icon icon-close"></b></a>请前往<a href="/apps/download_center" class="font-highlight close">报表中心</a></div>');
        }
        $('.tip-export .close').bind('click',function(){
            $(this).parent().fadeOut('fast',function(){
                $(this).remove();
            })

        });
    };
};
//$('.exportCsv')._export();
/*$('.exportCsv').bind('click',function(e){
    $(this)._export(e);
    //add google analtics
    var pageName = $('#siderNav a.current-item').attr('page_id') || $('#siderNav li.current-item a').attr('page_id');
    var tableName = $(this).parents('.mod-header').find('h2').text();
    _gaq.push(['_trackEvent', '导出报表', pageName, tableName]);
})*/


/*!
* TableSorter 2.7.12 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach
*/
!function(j){j.extend({tablesorter:new function(){function e(d){"undefined"!==typeof console&&"undefined"!==typeof console.log?console.log(d):alert(d)}function u(d,c){e(d+" ("+((new Date).getTime()-c.getTime())+"ms)")}function p(d,c,a){if(!c)return"";var b=d.config,g=b.textExtraction,f="",f="simple"===g?b.supportsTextContent?c.textContent:j(c).text():"function"===typeof g?g(c,d,a):"object"===typeof g&&g.hasOwnProperty(a)?g[a](c,d,a):b.supportsTextContent?c.textContent:j(c).text();return j.trim(f)} function h(d){var c=d.config,a=c.$tbodies=c.$table.children("tbody:not(."+c.cssInfoBlock+")"),b,q,f,l,j,n,k="";if(0===a.length)return c.debug?e("*Empty table!* Not building a parser cache"):"";a=a[0].rows;if(a[0]){b=[];q=a[0].cells.length;for(f=0;f<q;f++){l=c.$headers.filter(":not([colspan])");l=l.add(c.$headers.filter('[colspan="1"]')).filter('[data-column="'+f+'"]:last');j=c.headers[f];n=g.getParserById(g.getData(l,j,"sorter"));c.empties[f]=g.getData(l,j,"empty")||c.emptyTo||(c.emptyToBottom?"bottom": "top");c.strings[f]=g.getData(l,j,"string")||c.stringTo||"max";if(!n)a:{l=d;j=a;n=-1;for(var u=f,x=void 0,t=g.parsers.length,y=!1,m="",x=!0;""===m&&x;)n++,j[n]?(y=j[n].cells[u],m=p(l,y,u),l.config.debug&&e("Checking if value was empty on row "+n+", column: "+u+": "+m)):x=!1;for(x=1;x<t;x++)if(g.parsers[x].is&&g.parsers[x].is(m,l,y)){n=g.parsers[x];break a}n=g.parsers[0]}c.debug&&(k+="column:"+f+"; parser:"+n.id+"; string:"+c.strings[f]+"; empty: "+c.empties[f]+"\n");b.push(n)}}c.debug&&e(k);return b} function s(d){var c=d.tBodies,a=d.config,b,q,f=a.parsers,l,v,n,k,h,x,t,m=[];a.cache={};if(!f)return a.debug?e("*Empty table!* Not building a cache"):"";a.debug&&(t=new Date);a.showProcessing&&g.isProcessing(d,!0);for(k=0;k<c.length;k++)if(a.cache[k]={row:[],normalized:[]},!j(c[k]).hasClass(a.cssInfoBlock)){b=c[k]&&c[k].rows.length||0;q=c[k].rows[0]&&c[k].rows[0].cells.length||0;for(v=0;v<b;++v)if(h=j(c[k].rows[v]),x=[],h.hasClass(a.cssChildRow))a.cache[k].row[a.cache[k].row.length-1]=a.cache[k].row[a.cache[k].row.length- 1].add(h);else{a.cache[k].row.push(h);for(n=0;n<q;++n)if(l=p(d,h[0].cells[n],n),l=f[n].format(l,d,h[0].cells[n],n),x.push(l),"numeric"===(f[n].type||"").toLowerCase())m[n]=Math.max(Math.abs(l),m[n]||0);x.push(a.cache[k].normalized.length);a.cache[k].normalized.push(x)}a.cache[k].colMax=m}a.showProcessing&&g.isProcessing(d);a.debug&&u("Building cache for "+b+" rows",t)}function m(d,c){var a=d.config,b=d.tBodies,q=[],f=a.cache,e,v,n,k,h,p,m,y,s,r,E;if(f[0]){a.debug&&(E=new Date);for(y=0;y<b.length;y++)if(e= j(b[y]),!e.hasClass(a.cssInfoBlock)){h=g.processTbody(d,e,!0);e=f[y].row;v=f[y].normalized;k=(n=v.length)?v[0].length-1:0;for(p=0;p<n;p++)if(r=v[p][k],q.push(e[r]),!a.appender||!a.removeRows){s=e[r].length;for(m=0;m<s;m++)h.append(e[r][m])}g.processTbody(d,h,!1)}a.appender&&a.appender(d,q);a.debug&&u("Rebuilt table",E);c||g.applyWidget(d);j(d).trigger("sortEnd",d)}}function F(d){var c,a,b,g=d.config,f=g.sortList,e=[g.cssAsc,g.cssDesc],h=j(d).find("tfoot tr").children().removeClass(e.join(" "));g.$headers.removeClass(e.join(" ")); b=f.length;for(c=0;c<b;c++)if(2!==f[c][1]&&(d=g.$headers.not(".sorter-false").filter('[data-column="'+f[c][0]+'"]'+(1===b?":last":"")),d.length))for(a=0;a<d.length;a++)d[a].sortDisabled||(d.eq(a).addClass(e[f[c][1]]),h.length&&h.filter('[data-column="'+f[c][0]+'"]').eq(a).addClass(e[f[c][1]]))}function G(d){var c=0,a=d.config,b=a.sortList,g=b.length,f=d.tBodies.length,e,h,n,k,p,m,t,r,s;if(!a.serverSideSorting&&a.cache[0]){a.debug&&(e=new Date);for(n=0;n<f;n++)p=a.cache[n].colMax,s=(m=a.cache[n].normalized)&& m[0]?m[0].length-1:0,m.sort(function(f,e){for(h=0;h<g;h++){k=b[h][0];r=b[h][1];t=/n/i.test(a.parsers&&a.parsers[k]?a.parsers[k].type||"":"")?"Numeric":"Text";t+=0===r?"":"Desc";/Numeric/.test(t)&&a.strings[k]&&(c="boolean"===typeof a.string[a.strings[k]]?(0===r?1:-1)*(a.string[a.strings[k]]?-1:1):a.strings[k]?a.string[a.strings[k]]||0:0);var l=j.tablesorter["sort"+t](d,f[k],e[k],k,p[k],c);if(l)return l}return f[s]-e[s]});a.debug&&u("Sorting on "+b.toString()+" and dir "+r+" time",e)}}function C(d, c){d.trigger("updateComplete");"function"===typeof c&&c(d[0])}function I(d,c,a){!1!==c?d.trigger("sorton",[d[0].config.sortList,function(){C(d,a)}]):C(d,a)}var g=this;g.version="2.7.12";g.parsers=[];g.widgets=[];g.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0, sortForce:null,sortList:[],sortAppend:null,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"simple",textSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,initialized:null,tableClass:"tablesorter",cssAsc:"tablesorter-headerAsc",cssChildRow:"tablesorter-childRow",cssDesc:"tablesorter-headerDesc",cssHeader:"tablesorter-header",cssHeaderRow:"tablesorter-headerRow",cssIcon:"tablesorter-icon",cssInfoBlock:"tablesorter-infoOnly", cssProcessing:"tablesorter-processing",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[]};g.benchmark=u;g.construct=function(d){return this.each(function(){if(!this.tHead||0===this.tBodies.length||!0===this.hasInitialized)return this.config&&this.config.debug?e("stopping initialization! No thead, tbody or tablesorter has already been initialized"):"";var c=j(this),a=this,b,q,f,l="",v,n,k,C,x=j.metadata; a.hasInitialized=!1;a.config={};b=j.extend(!0,a.config,g.defaults,d);j.data(a,"tablesorter",b);b.debug&&j.data(a,"startoveralltimer",new Date);b.supportsTextContent="x"===j("<span>x</span>")[0].textContent;b.supportsDataObject=1.4<=parseFloat(j.fn.jquery);b.string={max:1,min:-1,"max+":1,"max-":-1,zero:0,none:0,"null":0,top:!0,bottom:!1};/tablesorter\-/.test(c.attr("class"))||(l=""!==b.theme?" tablesorter-"+b.theme:"");b.$table=c.addClass(b.tableClass+l);b.$tbodies=c.children("tbody:not(."+b.cssInfoBlock+ ")");var t=[],y={},O=0,R=j(a).find("thead:eq(0), tfoot").children("tr"),E,K,z,A,P,D,L,S,T,H;for(E=0;E<R.length;E++){P=R[E].cells;for(K=0;K<P.length;K++){A=P[K];D=A.parentNode.rowIndex;L=D+"-"+A.cellIndex;S=A.rowSpan||1;T=A.colSpan||1;"undefined"===typeof t[D]&&(t[D]=[]);for(z=0;z<t[D].length+1;z++)if("undefined"===typeof t[D][z]){H=z;break}y[L]=H;O=Math.max(H,O);j(A).attr({"data-column":H});for(z=D;z<D+S;z++){"undefined"===typeof t[z]&&(t[z]=[]);L=t[z];for(A=H;A<H+T;A++)L[A]="x"}}}a.config.columns= O;var M,B,Q,U,N,J,V,w=a.config;w.headerList=[];w.headerContent=[];w.debug&&(V=new Date);U=w.cssIcon?'<i class="'+w.cssIcon+'"></i>':"";t=j(a).find(w.selectorHeaders).each(function(a){B=j(this);M=w.headers[a];w.headerContent[a]=this.innerHTML;N=w.headerTemplate.replace(/\{content\}/g,this.innerHTML).replace(/\{icon\}/g,U);w.onRenderTemplate&&(Q=w.onRenderTemplate.apply(B,[a,N]))&&"string"===typeof Q&&(N=Q);this.innerHTML='<div class="tablesorter-header-inner">'+N+"</div>";w.onRenderHeader&&w.onRenderHeader.apply(B, [a]);this.column=y[this.parentNode.rowIndex+"-"+this.cellIndex];var b=g.getData(B,M,"sortInitialOrder")||w.sortInitialOrder;this.order=/^d/i.test(b)||1===b?[1,0,2]:[0,1,2];this.count=-1;"false"===g.getData(B,M,"sorter")?(this.sortDisabled=!0,B.addClass("sorter-false")):B.removeClass("sorter-false");this.lockedOrder=!1;J=g.getData(B,M,"lockedOrder")||!1;"undefined"!==typeof J&&!1!==J&&(this.order=this.lockedOrder=/^d/i.test(J)||1===J?[1,1,1]:[0,0,0]);B.addClass((this.sortDisabled?"sorter-false ":" ")+ w.cssHeader);w.headerList[a]=this;B.parent().addClass(w.cssHeaderRow)});a.config.debug&&(u("Built headers:",V),e(t));b.$headers=t;if(a.config.widthFixed&&0===j(a).find("colgroup").length){var W=j("<colgroup>"),X=j(a).width();j(a.tBodies[0]).find("tr:first").children("td").each(function(){W.append(j("<col>").css("width",parseInt(1E3*(j(this).width()/X),10)/10+"%"))});j(a).prepend(W)}b.parsers=h(a);b.delayInit||s(a);b.$headers.find("*")[j.fn.addBack?"addBack":"andSelf"]().filter(b.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter", function(d,e){var h=(this.tagName.match("TH|TD")?j(this):j(this).parents("th, td").filter(":last"))[0];if(1!==(d.which||d.button))return!1;if("mousedown"===d.type)return C=(new Date).getTime(),"INPUT"===d.target.tagName?"":!b.cancelSelection;if(!0!==e&&250<(new Date).getTime()-C)return!1;b.delayInit&&!b.cache&&s(a);if(!h.sortDisabled){c.trigger("sortStart",a);l=!d[b.sortMultiSortKey];h.count=d[b.sortResetKey]?2:(h.count+1)%(b.sortReset?3:2);b.sortRestart&&(q=h,b.$headers.each(function(){if(this!== q&&(l||!j(this).is("."+b.cssDesc+",."+b.cssAsc)))this.count=-1}));q=h.column;if(l){b.sortList=[];if(null!==b.sortForce){v=b.sortForce;for(f=0;f<v.length;f++)v[f][0]!==q&&b.sortList.push(v[f])}k=h.order[h.count];if(2>k&&(b.sortList.push([q,k]),1<h.colSpan))for(f=1;f<h.colSpan;f++)b.sortList.push([q+f,k])}else if(b.sortAppend&&1<b.sortList.length&&g.isValueInArray(b.sortAppend[0][0],b.sortList)&&b.sortList.pop(),g.isValueInArray(q,b.sortList))for(f=0;f<b.sortList.length;f++)n=b.sortList[f],k=b.headerList[n[0]], n[0]===q&&(n[1]=k.order[k.count],2===n[1]&&(b.sortList.splice(f,1),k.count=-1));else if(k=h.order[h.count],2>k&&(b.sortList.push([q,k]),1<h.colSpan))for(f=1;f<h.colSpan;f++)b.sortList.push([q+f,k]);if(null!==b.sortAppend){v=b.sortAppend;for(f=0;f<v.length;f++)v[f][0]!==q&&b.sortList.push(v[f])}c.trigger("sortBegin",a);setTimeout(function(){F(a);G(a);m(a)},1)}});b.cancelSelection&&b.$headers.each(function(){this.onselectstart=function(){return!1}});c.unbind("sortReset update updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter", function(){b.sortList=[];F(a);G(a);m(a)}).bind("update.tablesorter updateRows.tablesorter",function(d,f,g){c.find(b.selectorRemove).remove();b.parsers=h(a);s(a);I(c,f,g)}).bind("updateCell.tablesorter",function(d,f,g,e){c.find(b.selectorRemove).remove();var q,h,l;q=c.find("tbody");d=q.index(j(f).parents("tbody").filter(":last"));var k=j(f).parents("tr").filter(":last");f=j(f)[0];q.length&&0<=d&&(h=q.eq(d).find("tr").index(k),l=f.cellIndex,q=b.cache[d].normalized[h].length-1,b.cache[d].row[a.config.cache[d].normalized[h][q]]= k,b.cache[d].normalized[h][l]=b.parsers[l].format(p(a,f,l),a,f,l),I(c,g,e))}).bind("addRows.tablesorter",function(d,g,e,q){var j=g.filter("tr").length,l=[],k=g[0].cells.length,n=c.find("tbody").index(g.closest("tbody"));b.parsers||(b.parsers=h(a));for(d=0;d<j;d++){for(f=0;f<k;f++)l[f]=b.parsers[f].format(p(a,g[d].cells[f],f),a,g[d].cells[f],f);l.push(b.cache[n].row.length);b.cache[n].row.push([g[d]]);b.cache[n].normalized.push(l);l=[]}I(c,e,q)}).bind("sorton.tablesorter",function(b,d,f,g){c.trigger("sortStart", this);var e,q,l,h=a.config;b=d||h.sortList;h.sortList=[];j.each(b,function(a,b){e=[parseInt(b[0],10),parseInt(b[1],10)];if(l=h.headerList[e[0]])h.sortList.push(e),q=j.inArray(e[1],l.order),l.count=0<=q?q:e[1]%(h.sortReset?3:2)});F(a);G(a);m(a,g);"function"===typeof f&&f(a)}).bind("appendCache.tablesorter",function(b,c,d){m(a,d);"function"===typeof c&&c(a)}).bind("applyWidgetId.tablesorter",function(c,d){g.getWidgetById(d).format(a,b,b.widgetOptions)}).bind("applyWidgets.tablesorter",function(b,c){g.applyWidget(a, c)}).bind("refreshWidgets.tablesorter",function(b,c,d){g.refreshWidgets(a,c,d)}).bind("destroy.tablesorter",function(b,c,d){g.destroy(a,c,d)});b.supportsDataObject&&"undefined"!==typeof c.data().sortlist?b.sortList=c.data().sortlist:x&&(c.metadata()&&c.metadata().sortlist)&&(b.sortList=c.metadata().sortlist);g.applyWidget(a,!0);0<b.sortList.length?c.trigger("sorton",[b.sortList,{},!b.initWidgets]):b.initWidgets&&g.applyWidget(a);b.showProcessing&&c.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(b){g.isProcessing(a,"sortBegin"===b.type)});a.hasInitialized=!0;b.debug&&g.benchmark("Overall initialization time",j.data(a,"startoveralltimer"));c.trigger("tablesorter-initialized",a);"function"===typeof b.initialized&&b.initialized(a)})};g.isProcessing=function(d,c,a){var b=d.config;d=a||j(d).find("."+b.cssHeader);c?(0<b.sortList.length&&(d=d.filter(function(){return this.sortDisabled?!1:g.isValueInArray(parseFloat(j(this).attr("data-column")),b.sortList)})),d.addClass(b.cssProcessing)): d.removeClass(b.cssProcessing)};g.processTbody=function(d,c,a){if(a)return c.before('<span class="tablesorter-savemyplace"/>'),d=j.fn.detach?c.detach():c.remove();d=j(d).find("span.tablesorter-savemyplace");c.insertAfter(d);d.remove()};g.clearTableBody=function(d){d.config.$tbodies.empty()};g.destroy=function(d,c,a){if(d.hasInitialized){g.refreshWidgets(d,!0,!0);var b=j(d),e=d.config,f=b.find("thead:first"),h=f.find("tr."+e.cssHeaderRow).removeClass(e.cssHeaderRow),u=b.find("tfoot:first > tr").children("th, td"); f.find("tr").not(h).remove();b.removeData("tablesorter").unbind("sortReset update updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave sortBegin sortEnd ".split(" ").join(".tablesorter "));e.$headers.add(u).removeClass(e.cssHeader+" "+e.cssAsc+" "+e.cssDesc).removeAttr("data-column");h.find(e.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter");h.children().each(function(a){j(this).html(e.headerContent[a])});!1!==c&&b.removeClass(e.tableClass+ " tablesorter-"+e.theme);d.hasInitialized=!1;"function"===typeof a&&a(d)}};g.regex=[/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,/^0x[0-9a-f]+$/i];g.sortText=function(d,c,a,b){if(c===a)return 0;var e=d.config,f=e.string[e.empties[b]||e.emptyTo],h=g.regex;if(""===c&&0!==f)return"boolean"===typeof f?f?-1:1:-f||-1;if(""===a&&0!==f)return"boolean"===typeof f? f?1:-1:f||1;if("function"===typeof e.textSorter)return e.textSorter(c,a,d,b);d=c.replace(h[0],"\\0$1\\0").replace(/\\0$/,"").replace(/^\\0/,"").split("\\0");b=a.replace(h[0],"\\0$1\\0").replace(/\\0$/,"").replace(/^\\0/,"").split("\\0");c=parseInt(c.match(h[2]),16)||1!==d.length&&c.match(h[1])&&Date.parse(c);if(a=parseInt(a.match(h[2]),16)||c&&a.match(h[1])&&Date.parse(a)||null){if(c<a)return-1;if(c>a)return 1}e=Math.max(d.length,b.length);for(c=0;c<e;c++){a=isNaN(d[c])?d[c]||0:parseFloat(d[c])|| 0;h=isNaN(b[c])?b[c]||0:parseFloat(b[c])||0;if(isNaN(a)!==isNaN(h))return isNaN(a)?1:-1;typeof a!==typeof h&&(a+="",h+="");if(a<h)return-1;if(a>h)return 1}return 0};g.sortTextDesc=function(d,c,a,b){if(c===a)return 0;var e=d.config,f=e.string[e.empties[b]||e.emptyTo];return""===c&&0!==f?"boolean"===typeof f?f?-1:1:f||1:""===a&&0!==f?"boolean"===typeof f?f?1:-1:-f||-1:"function"===typeof e.textSorter?e.textSorter(a,c,d,b):g.sortText(d,a,c)};g.getTextValue=function(d,c,a){if(c){var b=d?d.length:0,e= c+a;for(c=0;c<b;c++)e+=d.charCodeAt(c);return a*e}return 0};g.sortNumeric=function(d,c,a,b,e,f){if(c===a)return 0;d=d.config;b=d.string[d.empties[b]||d.emptyTo];if(""===c&&0!==b)return"boolean"===typeof b?b?-1:1:-b||-1;if(""===a&&0!==b)return"boolean"===typeof b?b?1:-1:b||1;isNaN(c)&&(c=g.getTextValue(c,e,f));isNaN(a)&&(a=g.getTextValue(a,e,f));return c-a};g.sortNumericDesc=function(d,c,a,b,e,f){if(c===a)return 0;d=d.config;b=d.string[d.empties[b]||d.emptyTo];if(""===c&&0!==b)return"boolean"===typeof b? b?-1:1:b||1;if(""===a&&0!==b)return"boolean"===typeof b?b?1:-1:-b||-1;isNaN(c)&&(c=g.getTextValue(c,e,f));isNaN(a)&&(a=g.getTextValue(a,e,f));return a-c};g.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6", O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};g.replaceAccents=function(d){var c,a="[",b=g.characterEquivalents;if(!g.characterRegex){g.characterRegexArray={};for(c in b)"string"===typeof c&&(a+=b[c],g.characterRegexArray[c]=RegExp("["+b[c]+"]","g"));g.characterRegex=RegExp(a+"]")}if(g.characterRegex.test(d))for(c in b)"string"===typeof c&&(d=d.replace(g.characterRegexArray[c],c));return d};g.isValueInArray=function(d, c){var a,b=c.length;for(a=0;a<b;a++)if(c[a][0]===d)return!0;return!1};g.addParser=function(d){var c,a=g.parsers.length,b=!0;for(c=0;c<a;c++)g.parsers[c].id.toLowerCase()===d.id.toLowerCase()&&(b=!1);b&&g.parsers.push(d)};g.getParserById=function(d){var c,a=g.parsers.length;for(c=0;c<a;c++)if(g.parsers[c].id.toLowerCase()===d.toString().toLowerCase())return g.parsers[c];return!1};g.addWidget=function(d){g.widgets.push(d)};g.getWidgetById=function(d){var c,a,b=g.widgets.length;for(c=0;c<b;c++)if((a= g.widgets[c])&&a.hasOwnProperty("id")&&a.id.toLowerCase()===d.toLowerCase())return a};g.applyWidget=function(d,c){var a=d.config,b=a.widgetOptions,e=a.widgets.sort().reverse(),f,h,m,n=e.length;h=j.inArray("zebra",a.widgets);0<=h&&(a.widgets.splice(h,1),a.widgets.push("zebra"));a.debug&&(f=new Date);for(h=0;h<n;h++)(m=g.getWidgetById(e[h]))&&(!0===c&&m.hasOwnProperty("init")?m.init(d,m,a,b):!c&&m.hasOwnProperty("format")&&m.format(d,a,b));a.debug&&u("Completed "+(!0===c?"initializing":"applying")+ " widgets",f)};g.refreshWidgets=function(d,c,a){var b,h=d.config,f=h.widgets,l=g.widgets,m=l.length;for(b=0;b<m;b++)if(l[b]&&l[b].id&&(c||0>j.inArray(l[b].id,f)))h.debug&&e("Refeshing widgets: Removing "+l[b].id),l[b].hasOwnProperty("remove")&&l[b].remove(d,h,h.widgetOptions);!0!==a&&g.applyWidget(d,c)};g.getData=function(d,c,a){var b="";d=j(d);var e,f;if(!d.length)return"";e=j.metadata?d.metadata():!1;f=" "+(d.attr("class")||"");"undefined"!==typeof d.data(a)||"undefined"!==typeof d.data(a.toLowerCase())? b+=d.data(a)||d.data(a.toLowerCase()):e&&"undefined"!==typeof e[a]?b+=e[a]:c&&"undefined"!==typeof c[a]?b+=c[a]:" "!==f&&f.match(" "+a+"-")&&(b=f.match(RegExp(" "+a+"-(\\w+)"))[1]||"");return j.trim(b)};g.formatFloat=function(d,c){if("string"!==typeof d||""===d)return d;var a;d=(c&&c.config?!1!==c.config.usNumberFormat:"undefined"!==typeof c?c:1)?d.replace(/,/g,""):d.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(d)&&(d=d.replace(/^\s*\(/,"-").replace(/\)/,""));a=parseFloat(d);return isNaN(a)? j.trim(d):a};g.isDigit=function(d){return isNaN(d)?/^[\-+(]?\d+[)]?$/.test(d.toString().replace(/[,.'"\s]/g,"")):!0}}});var h=j.tablesorter;j.fn.extend({tablesorter:h.construct});h.addParser({id:"text",is:function(){return!0},format:function(e,u){var p=u.config;e=j.trim(p.ignoreCase?e.toLocaleLowerCase():e);return p.sortLocaleCompare?h.replaceAccents(e):e},type:"text"});h.addParser({id:"currency",is:function(e){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((e|| "").replace(/[,. ]/g,""))},format:function(e,j){return h.formatFloat(e.replace(/[^\w,. \-()]/g,""),j)},type:"numeric"});h.addParser({id:"ipAddress",is:function(e){return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(e)},format:function(e,j){var p,r=e.split("."),s="",m=r.length;for(p=0;p<m;p++)s+=("00"+r[p]).slice(-3);return h.formatFloat(s,j)},type:"numeric"});h.addParser({id:"url",is:function(e){return/^(https?|ftp|file):\/\//.test(e)},format:function(e){return j.trim(e.replace(/(https?|ftp|file):\/\//, ""))},type:"text"});h.addParser({id:"isoDate",is:function(e){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(e)},format:function(e,j){return h.formatFloat(""!==e?(new Date(e.replace(/-/g,"/"))).getTime()||"":"",j)},type:"numeric"});h.addParser({id:"percent",is:function(e){return/(\d\s?%|%\s?\d)/.test(e)},format:function(e,j){return h.formatFloat(e.replace(/%/g,""),j)},type:"numeric"});h.addParser({id:"usLongDate",is:function(e){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(e)|| /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(e)},format:function(e,j){return h.formatFloat((new Date(e.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||"",j)},type:"numeric"});h.addParser({id:"shortDate",is:function(e){return/^(\d{1,2}|\d{4})[\/\-\,\.\s+]\d{1,2}[\/\-\.\,\s+](\d{1,2}|\d{4})$/.test(e)},format:function(e,j,p,r){p=j.config;var s=p.headerList[r],m=s.shortDateFormat;"undefined"===typeof m&&(m=s.shortDateFormat=h.getData(s,p.headers[r],"dateFormat")||p.dateFormat);e=e.replace(/\s+/g," ").replace(/[\-|\.|\,]/g, "/");"mmddyyyy"===m?e=e.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===m?e=e.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===m&&(e=e.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3"));return h.formatFloat((new Date(e)).getTime()||"",j)},type:"numeric"});h.addParser({id:"time",is:function(e){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(e)},format:function(e,j){return h.formatFloat((new Date("2000/01/01 "+e.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime()||"",j)},type:"numeric"});h.addParser({id:"digit",is:function(e){return h.isDigit(e)},format:function(e,j){return h.formatFloat(e.replace(/[^\w,. \-()]/g,""),j)},type:"numeric"});h.addParser({id:"metadata",is:function(){return!1},format:function(e,h,p){e=h.config;e=!e.parserMetadataName?"sortValue":e.parserMetadataName;return j(p).metadata()[e]},type:"numeric"});h.addWidget({id:"zebra",format:function(e,u,p){var r,s,m,F,G,C,I=RegExp(u.cssChildRow,"i"),g=u.$tbodies;u.debug&&(G= new Date);for(e=0;e<g.length;e++)r=g.eq(e),C=r.children("tr").length,1<C&&(m=0,r=r.children("tr:visible"),r.each(function(){s=j(this);I.test(this.className)||m++;F=0===m%2;s.removeClass(p.zebra[F?1:0]).addClass(p.zebra[F?0:1])}));u.debug&&h.benchmark("Applying Zebra widget",G)},remove:function(e,h){var p,r,s=h.$tbodies,m=(h.widgetOptions.zebra||["even","odd"]).join(" ");for(p=0;p<s.length;p++)r=j.tablesorter.processTbody(e,s.eq(p),!0),r.children().removeClass(m),j.tablesorter.processTbody(e,r,!1)}})}(jQuery);


/*
* Time Unit Widget
*
* Author: wangfang@umeng.com
* Date: 2013.12.09
* Dependencies:
*/
;(function($) {
    $.widget("umeng.timeUnit", {
        options: {
            onClickItem: function() {}
        },
        _create: function() {
            var self  = this,
                o     = self.options,
                el    = self.element,
                elID  = el.get(0).id,
                items = el.find('li');
            // init style
            $.each(items, function(i, item) {
                var $item = $(item);
                if($item.attr('data-on') === 'true') $item.addClass('on');
                if($item.attr('data-enable') === 'true') self._setItemEnable($item);
                else if($item.attr('data-enable') === 'false') self._setItemDisable($item);
            });
            // set on item
            $.subscribe("timeunit.on", function(event, unit, callback) {
                items.removeClass('on').filter('[data-unit="' + unit + '"]').addClass('on');
                if (typeof callback == 'function') {
                    try {
                        callback();
                    } catch (e) {}
                }
            });
            // set enable items
            $.subscribe("timeunit.disable", function(event, units, callback) {
                $.each(items, function(i, item) {
                    var $item = $(item);
                    (units.indexOf($item.attr('data-unit')) != -1) ? self._setItemDisable($item) : self._setItemEnable($item);
                });
                if (typeof callback == 'function') {
                    try {
                        callback();
                    } catch (e) {}
                }
            });
        },
        _setItemEnable: function($item) {
            var self = this,
                o    = self.options;  
            $item
                .removeClass('off')
                .attr('data-enable', 'true')
                .off().on('click.timeunit', function(e) {
                    if(!$item.hasClass('on')) {
                        $item.addClass('on').siblings('li[data-enable="true"]').removeClass('on');
                        o.onClickItem($item.attr('data-unit'));
                    }
                });
        },
        _setItemDisable: function($item) {
            var self  = this,
                o     = self.options;
            if ($item.hasClass('on')) {
                $item.off().removeClass('on').addClass('off').attr('data-enable', 'false');
                if ($item.next().length !== 0) {
                    self._setItemEnable($item.next());
                } else {
                    var $first = $item.siblings('li[data-enable="true"]:eq(0)');
                    if ($first.length !== 0) {
                        $first.addClass('on');
                        self._setItemEnable($first);
                    }
                }
            } else {
                $item.off().addClass('off').attr('data-enable', 'false');
            }
        },
        getUnit: function() {
            return this.element.find('li.on').data('unit');
        },
        set: function(opts) {
            var self  = this,
                el    = self.element;
                items = el.find('li');
            $.each(items, function(i, item) {
                var $item = $(item).removeClass('on');
                if (opts.disable.indexOf($item.data('unit')) != -1 ) {
                    self._setItemDisable($item);
                } else {
                    self._setItemEnable($item);
                    if($item.data('unit') === opts.on) $item.addClass('on');
                }
            });
        },
        onClickItem: function(callback) {
            var self  = this,
                el    = self.element;
                items = el.find('li');
            $.each(items, function(i, item) {
                var $item = $(item);
                    self.options.onClickItem = callback;
                if($item.attr('data-enable') === 'true') {
                    $item.off().on('click.timeunit', function(e) {
                        _track_userEvent('新功能监测_时间颗粒度', $item.data('unit'), UMENG.Agent.getDate().counts);
                        $item.addClass('on').siblings().removeClass('on');
                        self.options.onClickItem($item.attr('data-unit'));
                    });
                }
            });
        }
    });
    // auto init
    $(function () {
        $('.js-um-timeUnit').timeUnit();
    });
})(jQuery);

/*
* Tab Widget
*
* Author: wangfang@umeng.com
* Date: 2013.12.24
* 
*/

;(function($) {
    
    $.widget('umeng.tab', {

        options: {
            onClickTab: function() {}
        },

        _create: function() {

            var self = this,
                o    = self.options,
                el   = self.element,
                elID = el.get(0).id,
                tabs = el.find('li');

            $.each(tabs, function(i, tab) {
                var $tab = $(tab);

                if($tab.attr('default') == 'on') $tab.addClass('on');

                $tab.on('click', function(event) {
                    event.preventDefault();
                    if (!$tab.hasClass('on')) {
                        $(this).addClass('on').siblings().removeClass('on');
                        o.onClickTab();
                    }
                });

            });
        },

        _init: function() {},

        getTab: function() {
            return this.element.find('li.on').attr('particle');
        },
        setEnable: function(particle){
            this.element.find("li[particle='" + particle + "']").removeClass('off');
        },
        setDisable: function(particle){
            var el = this.element.find("li[particle='" + particle + "']");
            if(el.hasClass('on')){
                return ;
            }else{
                el.addClass('off');
            }
        },
        setTab: function(opts) {
            this.element.find("li[particle='" + opts.name + "']").addClass('on').siblings().removeClass('on');
        },

        setTabText: function(opts) {
            var self = this,
                o    = self.options,
                el   = self.element,
                tabs = el.find('li'),
                t    = opts.text;

            $.each(tabs, function(i, tab) {
                if (t[i] !== '') {
                    if(tab.textContent){
                        tab.textContent = t[i];
                    }else{
                        tab.innerText = t[i];
                    }
                }
            });
        },

        onClickTab: function(callback) {
            var self = this,
                el   = self.element,
                tabs = el.find('li');
            
            $.each(tabs, function(i, tab) {
                var $tab = $(tab);
                
                self.options.onClickTab = callback;
                $tab.off().on('click.tab', function(e) {
                    if($tab.hasClass('off')){
                        return;
                    }else{
                        $tab.addClass('on').siblings().removeClass('on');
                        self.options.onClickTab($tab.attr('particle'));

                    }
                });
            });
        },

        destroy: function() {}

    });

    // Auto init
    $(function () {
        $('.js-um-tab').tab();
    });

})(jQuery);

/* require jQuery.js ,jQueryUI, storage for ie6,7
 * Dom:
 *  <div id="hellobar" class="hellobar" style="display:none">
 *    <span>
 *    </span>
 *    <a class="close-notify"><img class="hellobar-up-arrow" src="/images/icons/hellobar-up-arrow.png"></a>
 *  </div>
 *  <div class="hellobar-stub" style="display:none">
 *    <a class="show-notify"><img class="hellobar-down-arrow" src="/images/icons/hellobar-down-arrow.png"></a>
 *  </div>
 *  <input type="hidden" name="umengAds" id="pos" value="">
 *  value = 0 ==>portal
 *  value = 1 ==>report
 *  value = 2 ==>docs
 */
var umengAdsBar = function(){
  var t = this;
  this.time = 86400000; // 1day
  this.doajax = function(pos,id,callback){
    $.ajax({
      type:'get',
      dataType:'jsonp',
      url:'http://op.umeng.us/ads/get?pos='+pos,
      success:function(data){
        if(data.status == '1'){
          callback(data,id);
        }
        t.setCookie(pos,data);
      }
    })
  };
  this.showbar = function(params,adsId){
    $('#hellobar span').html('');
    if(params.link){
      $('#hellobar span').text(params.content);
      $('#hellobar span').append('<a href="' + params.link + '" target="_blank">了解更多</a>');
    }else{
      $('#hellobar span').text(params.content);
    }
    if(params.id != adsId){
      hellobar_show();
    }else{
      t.setUserAg();
    }
    
  };
  this.getAds = function(posid,id){
    //t.doajax(posid,id,t.showbar);
  };
  this.getCookie = function(id){
    var ls = localStorage[id];
    if(ls != "undefined"){
      return JSON.parse(ls);
    }else{
      return undefined;
    }
  };
  this.setCookie = function(id,data,isClear){
    if(isClear != undefined){
      t.clearCookie(id);
    }
    var H = new Date().getDate();
    data["expireTime"] = H;
    var string = JSON.stringify(data);
    localStorage[id] = string;
  };
  this.clearCookie = function(s){
    if(s){
      localStorage.removeItem(s);
    }
  };
  this.setUserAg = function(){
    if(localStorage.getItem('userAg'+$('body').attr('class')) == "hide"){
      hellobar_hide();
    }else{
      hellobar_show();
    }
  };
  return{
    setExpireTime: function(time){ //time = sec/1000
      if(time != undefined && typeof time == number){
        return t.time = time;
      }else{
        return t.time = 86400;
      }
    },
    init: function(){
      var pos = $('#pos').val();
      var ls = localStorage.getItem(pos);
      if(ls == null){
        //no ads
        t.getAds(pos,'');
      }else{
        //get cache
        var data = t.getCookie(pos);
        var currentDate = new Date().getDate();
        //expired
        if(currentDate != data.expireTime){
          t.clearCookie(pos);
          t.getAds(pos,data.id);
        }else{
          //has ads
          if(data.status == '1'){
            t.showbar(data,data.id);
          }else{
            return false;
          }
          
        }
      }
    }
  }
};
// var uab = new umengAdsBar();
// uab.init();

// ads show and hide
var stub_showing = false;
(function(){
  $('.show-notify').bind('click',function(){
    localStorage.setItem('userAg'+$('body').attr('class'),'show');
    hellobar_show();
  });
  $('.close-notify').bind('click',function(){
    localStorage.setItem('userAg'+$('body').attr('class'),'hide');
    hellobar_hide();
  });
})();
function hellobar_show(){
  if(stub_showing){
    $('.hellobar-stub').slideUp('fast', function() {
      $('.hellobar').show('bounce', { times:3, distance:15 }, 100); 
      $('body').animate({"marginTop": "35px"}, 250);
    }); 
  }else{
    $('.hellobar').show('bounce', { times:3, distance:15 }, 100); 
    $('body').animate({"marginTop": "35px"}, 250);
  }
};
function hellobar_hide(){ 
    $('.hellobar').slideUp('fast', function() {
      $('.hellobar-stub').show('bounce', { times:3, distance:15 }, 100);
      stub_showing = true;
    }); 
    if( $(window).width() > 1024 ) {
      $('body').animate({"marginTop": "0px"}, 250);
    }
};


;(function($) {
  $.widget('umeng.multiSelector', {
    templateSection: '<ul> \
          <li class="first"> \
            <input type="radio" checked="checked" value="top" name="multi-sel-sec" class="multi-selector-top"> \
            <label class="multi-selector-top-label" for="multi-selector-top"></label></li> \
          <li class="last"> \
            <input type="radio" value="custom" name="multi-sel-sec" class="multi-selector-custom"> \
             <label class="multi-selector-custom-label" for="multi-selector-custom"><span class="multi-selector-custom-name"></span> ( '+I18n.t('title.analytics.retention.selected')+' <span  class="multi-selector-custom-number">0</span> '+I18n.t('title.analytics.retention.selected_metric')+' )</label> \
            <input class="multi-selector-filter" class="multi-selector-input" type="search" name="name-filter"> \
          </li> \
      </ul>',
    templatePicker: '<div class="multi-selector-options"> \
      <div class="loading-tip" ><img src="/images/pic/ajax-loader.gif"></div> \
      </div> \
      <div class="multi-selector-footer"> \
        <button type="button" class="multi-selector-submit" class="certain_btn">' + I18n.t('components.buttons.confirm') + '</button> \
        <button type="button" class="multi-selector-cancel" class="certain_btn">'+I18n.t('components.buttons.cancel') + '</button> \
      </div>',
    topName: I18n.t('components.select.top10'),
    keyHash: {
      9:true, // tab
      13:true, // enter
      37:true, // left
      38:true, // up
      39:true, // right
      40:true // down
    },
    options: {
      name: I18n.t('title.analytics.retention.version'),
      dataUrl: '',
      selected: false,
      customName: I18n.t('components.select.custom'),
      type: 'radiobox',
      onlyCustom: false,
      simpleButton: false,
      selected: false,
      showTip: false,
      maxSelected: 0,
      sort: true
    },
    _create: function() {
      // init the state
      this.top10Data = [];
      this.data = [];
      this.selectedData = [];
      this.selectedSection = 'top';
      this._createSign();

      // create the content html
      if ('onlyCustom' in this.options && this.options.onlyCustom === true) {
        this.element.find('.multi-sel-con').html(this.templatePicker);
        this.selectedSection = 'custom';
      } else {
        this.element.find('.multi-sel-con').html(this.templateSection + this.templatePicker);
        var topRadioId = 'multi-selector-top-' + this.sign;
        var customRadioId = 'multi-selector-custom-' + this.sign;
        this.radioName = 'multi-sel-sec-' + this.sign;
        this.element.find('.multi-selector-top').attr('id', topRadioId).attr('name', this.radioName);
        this.element.find('.multi-selector-top-label').attr('for', topRadioId).text(this.topName + this.options.name);
        this.element.find('.multi-selector-custom').attr('id', customRadioId).attr('name', this.radioName);
        this.element.find('.multi-selector-custom-label').attr('for', customRadioId);
        this.element.find('.multi-selector-custom-name').text(this.options.customName + this.options.name);
      }

      // pulldown
      this.element.find('.pulldown').attr('id', this.sign + 'pulldown');
      var section = localStorage.getItem(this.sign + 'section');
      if (section !== null) {
        this.selectedSection = section;
      } else if (this.options.onlyCustom === true) {
        this.selectedSection = 'custom';
      }
      this.element.find('.multi-selector-result-text').text((this.selectedSection === 'custom'? this.options.customName : this.topName ) + this.options.name);
      // button status
      var cacheSelected = JSON.parse(localStorage.getItem(this.sign + 'selected'));
      if (cacheSelected !== null) {
        this.options.selected = cacheSelected;
        if (this.options.selected === true) {
          $('.multi-selector').trigger("other-multi-selector-selected");
        }
      }

      if (this.options.selected === true) {
        if (this.options.type !== 'checkbox') {
          this.element.find('.multi-selector-button').addClass('multi-selector-button-on');
        }
        $('.retention-table-first-col').text(this.element.find('.multi-selector-result-text').text());
      }

      // radio status
      var cachedSection = localStorage.getItem(this.sign + 'section');
      if (cachedSection === 'custom') {
        this.element.find('.multi-selector-custom').attr('checked', true);
      }

      // get data
      this.getData();
      // bind event handler
      this.bindEvent();
    },
    _init: function() {

    },
    destroy: function() {},
    _createSign: function() {
      var user_email = '';
      if ($('#user_email').length > 0) {
        user_email = $('#user_email').attr('attr-id');
      }
      this.sign = MD5(user_email + window.location.pathname + this.element.attr('id'));
    },
    getSign: function() {
      return this.sign;
    },
    getData: function() {
      // mock the data
      var self = this;
      if (self.options.data) {
        self.data = self.options.data;
        self.initData();
      } else {
        $.get(self.options.dataUrl).done(function(data){
          if (data.result === "success") {
            self.data = data.datas;
            self.initData();
          } else {
            self.element.find('.loading-tip').html('<div class="tip-noResult">'+data.msg+'</div>');
          }
        });
      }

    },

    initData: function() {
      var self = this;
      var top10Data = [];
      $.each(self.data, function(index, value){
        if (value.is_shown === true) {
          top10Data.push(value);
        }
      });
      self.top10Data = top10Data;
      var selectedData = JSON.parse(localStorage.getItem(self.sign + 'selectedData'));
      if (selectedData && $.isArray(selectedData) && selectedData.length > 0) {
        self.selectedData = selectedData;
        $.each(self.selectedData, function(i, value){
          var start =  -1;
          var startSelected = -1;
          $.each(self.data, function(j, item){
            if (item.id === value.id) {
              start = j;
              if (item.name !== value.name) {
                startSelected = i;
              }
              return false;// break the loop
            }
          });
          if (start !== -1) {
            var removedItem = self.data.splice(start, 1)[0];
            if (startSelected !== -1) {
              self.selectedData.splice(startSelected, 1, removedItem);
            }
          }
        });
      }
      var resultCache = JSON.parse(localStorage.getItem(this.sign + this.element.attr('id')));
      if (!resultCache || !($.isArray(resultCache) && resultCache.length > 0)) {
        localStorage.setItem(this.sign + this.element.attr('id'), JSON.stringify(this.getResultData()));
      }
      self.element.find('.multi-selector-custom-number').text(self.selectedData.length);
      self.createOptions();
    },

    //
    createOptions: function (query) {
      var self = this;
      var html = [];
      if (query && query.length !== 0 && $.trim(query).length === 0) {
        return;
      }
      if (self.options.sort === true) {
        this.selectedData.sort(compareData);
        this.data.sort(compareData);
      }
      query = $.trim(query);
      if (!query) {
        $.each(this.selectedData, function(index, value) {
          addOption(index, value, true);
        });
        $.each(this.data, addOption);
      } else {
        $.each(this.data, function(index, value) {
          if (value.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            addOption(index, value);
          }
        });
        $.each(this.selectedData, function(index, value) {
          if (value.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            addOption(index, value, true);
          }
        });
      }
      this.element.find('.multi-selector-options').html(html.join(''));
      this.element.find('.multi-selector-option:first').addClass('multi-selector-option-focus');
      function addOption(index, value, selected){
        var selectedClass = "";
        var tipAttr = "";
        if (selected === true) {
          selectedClass = " multi-selector-option-selected";
        }
        if (self.options.showTip === true) {
          tipAttr = 'action-frame="tip_'+ escape(value.id) +'"';
        }
        html.push('<a href="#'+ escape(value.id) +'" class="multi-selector-option' + selectedClass + '" ' + tipAttr + ' animate="false">' + value.name + '</a>');
      }
      function compareData(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }

    },
    bindEvent: function () {
      var self = this;
      // main button
      this.element.find('.pulldown').click(function(){
        $.publish("multi-selector-open", self.element.attr('id'));
        toggleContent();
        if (self.options.type === 'checkbox') {
          self.element.find('.multi-selector-button').toggleClass('multi-selector-button-on');
        }
      });
      this.element.find('.multi-selector-result-text').click(function(){
        if (self.options.type === 'checkbox') {
          $.publish("multi-selector-open", self.element.attr('id'));
          toggleContent();
          self.element.find('.multi-selector-button').toggleClass('multi-selector-button-on');
        } else {
          $.publish("multi-selector-submit", {'id':self.element.attr('id')});
          $.publish('rPage');
        }

      });

      // Main Content
      $.subscribe("multi-selector-open", function(event, id){
          if (self.element.attr('id') === id) {
            return false;
          } else {
            self.element.find('.multi-sel-con').removeClass('multi-sel-con-on');
          }
      });
      $.subscribe('multi-selector-submit', function(event, params) {
        self.submit(event, params.id, params.updateCache);
      });

      this.element.find('.multi-selector-button').on('selectstart',function(){return false;});
      this.element.find('.multi-selector-submit').click(function () {
        self.selectedSection = $('input[name="' + self.radioName + '"]:checked').val();
        if (self.options.onlyCustom === true) {
          self.selectedSection = 'custom';
        }
        if(self.getCustomData().length === 0 && self.selectedSection === 'custom') {
          alert(I18n.t('page_misc.retention.no_custom_info') + self.options.name + "！", 3000);
          return false;
        }
        $.publish("multi-selector-submit", {'id':self.element.attr('id'), 'updateCache':true});
        //update state
        localStorage.setItem(self.sign + 'section', self.selectedSection);
        $.publish('rPage');
      });

      $('.multi-selector').on('other-multi-selector-selected', function(event){
        if ($(event.target).attr('id') === self.element.attr('id')) {
          return false;
        } else {
          if(self.options.simpleButton !== true) {
            self.options.selected = false;
            self.element.find('.multi-selector-button').removeClass('multi-selector-button-on');
          }

        }
      });
      this.element.find('.multi-selector-cancel').click(function(){
        if(self.options.type === 'checkbox') {
            self.element.find('.multi-selector-button').removeClass('multi-selector-button-on');
        }
        toggleContent();
      });
      this.element.find('.multi-selector-options').on('click', '.multi-selector-option', function(event) {
        self.element.find('.multi-selector-custom').attr('checked', true);
        event.preventDefault();
        self.focus(this);
        if (!$(this).hasClass('multi-selector-option-selected') && self.options.maxSelected > 0 && self.getResultData().length > self.options.maxSelected-1) {
          alert(I18n.t('page_misc.channel.max_info').replace('${max}', self.options.maxSelected).replace('${name}', self.options.name), 2000);
          return false;
        }
        $(this).toggleClass('multi-selector-option-selected');
        self.updateData($(this).attr('href'), $(this).hasClass('multi-selector-option-selected'));

      });
      this.element.find('.multi-selector-options').on('selectstart',function(){return false;});
      this.element.find('.multi-selector-filter').focus(function(){
        self.element.find('.multi-selector-custom').attr('checked', true);
      });
      this.element.find('.multi-selector-filter').on('input propertychange',function(event){
        var key = event.keyCode;
        if (!(key in self.keyHash)) {
          self.createOptions($(this).val());
        }
      });



      $(document).keydown(function(event){
        var key = event.keyCode;
        if (self.element.find('.multi-sel-con').hasClass('multi-sel-con-on') && key in self.keyHash) {
          //get focus buttons
          var focus = self.element.find('.multi-selector-option-focus');
          if (focus.length !== 0) {
            focus.animate({scrollTop:100});
            var offset = focus.offset();
            var target = focus[0];
            var left  = offset.left - $(window).scrollLeft();
            var topUp = offset.top - $(window).scrollTop() - focus.outerHeight() * 0.5;
            var topDown = offset.top - $(window).scrollTop() + focus.outerHeight() * 1.5;
            var prev = focus.prev()[0];
            var next = focus.next()[0];
            switch (key) {
              case 9: //tab
                if (event.shiftKey) {
                  if (prev && $(prev).hasClass('multi-selector-option')) {
                    self.focus(prev);
                    target = prev;
                  } else {
                    return;
                  }
                } else {
                  if (next && $(next).hasClass('multi-selector-option')) {
                    self.focus(next);
                    target = next;
                  } else {
                    return;
                  }
                }
                break;
              case 13: //enter
                self.element.find('.multi-selector-custom').attr('checked', true);
                if (!$(focus).hasClass('multi-selector-option-selected') && self.options.maxSelected > 0 &&  self.getResultData().length > self.options.maxSelected-1) {
                  alert(I18n.t('page_misc.channel.max_info').replace('${max}', self.options.maxSelected).replace('${name}', self.options.name), 2000);
                  return false;
                }
                focus.toggleClass('multi-selector-option-selected');
                self.updateData(focus.attr('href'), focus.hasClass('multi-selector-option-selected'));
                target = focus[0];
                break;
              case 37:
                if (prev && $(prev).hasClass('multi-selector-option')) {
                  self.focus(prev);
                  target = prev;
                } else {
                  return;
                }
                break;
              case 38:
                var up = document.elementFromPoint(left, topUp);
                if (!up || !$(up).hasClass('multi-selector-option')) {
                  up = document.elementFromPoint(left + 15, topUp);
                }
                if (!up || !$(up).hasClass('multi-selector-option')) {
                  up = document.elementFromPoint(left - 15, topUp);
                }
                if (up !== null && $(up).hasClass('multi-selector-option')) {
                  self.focus(up);
                  target = up;
                } else {
                  return;
                }
                break;
              case 39:
                if (next && $(next).hasClass('multi-selector-option')) {
                  self.focus(next);
                  target = next;
                } else {
                  return;
                }
                break;
              case 40:

                var down = document.elementFromPoint(left, topDown);
                if (!down || !$(down).hasClass('multi-selector-option')) {
                  down = document.elementFromPoint(left + 15, topDown);
                }
                if (!down || !$(down).hasClass('multi-selector-option')) {
                  down = document.elementFromPoint(left - 15, topDown);
                }
                if (down !== null && $(down).hasClass('multi-selector-option')) {
                  self.focus(down);
                  target = down;
                } else {
                  return;
                }
                break;
            }
            self.element.find('.multi-selector-options').scrollTop(target.offsetTop - 80);
            return false;
          }
        }

      });
      this.element.find('.multi-selector-filter').blur(function(){
        self.element.find('.multi-selector-option:first').removeClass('multi-selector-option-focus');
      });
      function toggleContent () {
        self.element.find('.multi-sel-con').toggleClass('multi-sel-con-on');
      }
    },
    focus: function(element) {
      this.element.find('.multi-selector-option').removeClass('multi-selector-option-focus');
      $(element).addClass('multi-selector-option-focus');
    },
    submit: function(event, id, updateCache) {

      // hide selection pannel
      this.element.find('.multi-sel-con').removeClass('multi-sel-con-on');
      if (this.options.type === 'checkbox') {
        this.element.find('.multi-selector-button').removeClass('multi-selector-button-on');
      }
      if (this.element.attr('id') === id) {
        if (this.options.type !== 'checkbox') {
          this.options.selected = true;
          this.element.find('.multi-selector-button').addClass('multi-selector-button-on');
        }
        var resultText = (this.selectedSection === 'top'? this.topName : this.options.customName) + this.options.name;
        this.element.find('.multi-selector-result-text').text(resultText);
        $('.retention-table-first-col').text(resultText);
        if (updateCache === true) {
          localStorage.setItem(this.sign + this.element.attr('id'), JSON.stringify(this.getResultData()));
        }
      } else {
        if (this.options.type !== 'checkbox') {
          this.options.selected = false;
          this.element.find('.multi-selector-button').removeClass('multi-selector-button-on');
        }
      }
      localStorage.setItem(this.sign + 'selected', JSON.stringify(this.options.selected));
      this.element.find('.multi-selector-filter').val('');
      this.createOptions();
    },
    updateData: function(href, selected) {
      var item = null;
      var id = unescape(href.substring(1));
      $.each(this.data, getItemByName);
      $.each(this.selectedData, getItemByName);
      function getItemByName(index, value) {
        if (value.id === id) {
          item = value;
        }
      }
      if (selected === true) {
        this.selectedData.push(item);
        this.data.splice($.inArray(item, this.data), 1);
      } else if (selected === false) {
        this.selectedData.splice($.inArray(item, this.selectedData), 1);
        this.data.push(item);
      }
      this.element.find('.multi-selector-custom-number').text(this.selectedData.length);
      localStorage.setItem(this.sign + 'data', JSON.stringify(this.data));
      localStorage.setItem(this.sign + 'selectedData', JSON.stringify(this.selectedData));
    },
    getResult: function() {
      if (this.options.selected === false && this.options.type !== 'checkbox') {
        return [];
      }
      return localStorage.getItem(this.sign + this.element.attr('id')) || [];
    },
    getResultData: function() {

      var section = $('input[name="' + this.radioName + '"]:checked').val();
      var data = [];
      if (section === 'top') {
        data = [];
      } else {
        data = this.selectedData;
      }

      var ids = [];
      $.each(data, function(index, value){
        ids.push(value.id);
      });
      return ids;
    },
    getCustomData: function() {
      var ids = [];
      $.each(this.selectedData, function(index, value){
        ids.push(value.id);
      });
      return ids;
    },
    getStatus: function() {
      return this.options.selected;
    },
    compareOption: function (a, b) {
      if (a.name === b.name && a.id === b.id) {
        return true;
      }
      return false;
    }

  });
})(jQuery);
