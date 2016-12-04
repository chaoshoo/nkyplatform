// Prompt layerHTML
var onShowHtml = '';
var onFocusHtml = '';
var onErrorHtml = '<P class="noticeWrap"><B class="ico-warning"></B><SPAN class=txt-err>$data$</SPAN></P>';
var onCorrectHtml = '<P class="noticeWrap"><B class="ico-succ"></B><SPAN class=txt-succ>$data$</SPAN></P>';
var onShowHtml = '';

// 文本框的样式
var onShowClass = "g-ipt";
var onFocusClass = "g-ipt-active";
var onErrorClass = "g-ipt-err";
var onCorrectClass = "g-ipt";

// 固定提示层的HTML
var onMouseOnFixTextHtml = '<DIV class="txt-info-mouseon">$data$</DIV>';
var onMouseOutFixTextHtml = '<DIV class="txt-info-mouseout">$data$</DIV>';

// 初始状态，加其它几种状态
var passwordStrengthStatusHtml = [
		'<P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog0"></B><EM class=st2>strong</EM></P>',
		'<P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog1"></B><EM class=st2>strong</EM></P>',
		'<P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog2"></B><EM class=st2>strong</EM></P>',
		'<P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog3"></B><EM class=st2>strong</EM></P>'];

var passwordStrengthText = ['Password strength：weak', 'Password strength：in', 'Password strength：strong']
// 密码强度校验规则(flag=1(数字)+2(小写)+4(大写)+8(特殊字符)的组合，value里的0表示跟密码一样长,1表示起码1个长度)
var passwordStrengthRule = [{
			level : 1,
			rule : [{
						flag : 1,
						value : [0]
					}, // number
					{
						flag : 2,
						value : [0]
					}, // Lowercase character
					{
						flag : 4,
						value : [0]
					} // Capital character
			]
		}, {
			level : 2,
			rule : [{
						flag : 8,
						value : [0]
					}, // Special symbol
					{
						flag : 9,
						value : [1, 1]
					}, // number(>=1)+Special symbol>=1)
					{
						flag : 10,
						value : [1, 1]
					}, // A lowercase letter(>=1)+Special symbol>=1)
					{
						flag : 12,
						value : [1, 1]
					}, // Capital(>=1)+Special symbol>=1)
					{
						flag : 3,
						value : [1, 1]
					}, // number(>=1)+A lowercase letter(>=1)
					{
						flag : 5,
						value : [1, 1]
					}, // number(>=1)+Capital(>=1)
					{
						flag : 6,
						value : [1, 1]
					} // A lowercase letter(>=1)+Capital(>=1)
			]
		}, {
			level : 3,
			rule : [{
						flag : 11,
						value : [1, 1, 1]
					}, // number(>=1)+A lowercase letter(>=1)+Special symbol(>=1)
					{
						flag : 13,
						value : [1, 1, 1]
					}, // number(>=1)+Capital(>=1)+Special symbol(>=1)
					{
						flag : 14,
						value : [1, 1, 1]
					}, // A lowercase letter(>=1)+Capital(>=1)+Special symbol(>=1)
					{
						flag : 7,
						value : [1, 1, 1]
					} // number(>=1)+A lowercase letter(>=1)+Capital(>=1)
			]
		}];