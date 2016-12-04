var onShowHtml = '';
var onFocusHtml = '<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt">$data$</div></div>';
var onErrorHtml = '<div class="user_div_off"><div class="user_div_off_txt">$data$</div></div>';
var onCorrectHtml = '';
var onShowClass = "user_input";
var onFocusClass = "user_input_focus";
var onErrorClass = "user_input_error";
var onCorrectClass = "user_input";


//初始状态，加其它几种状态
var passwordStrengthStatusHtml = [
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog0"></B><EM class=st2>strong</EM></P>6~16One character，Include letter、number、Special symbol，Case sensitive</div></div>',
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog1"></B><EM class=st2>strong</EM></P6~16One character，Include letter、number、Special symbol，Case sensitive></div></div>',
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog2"></B><EM class=st2>strong</EM></P>6~16One character，Include letter、number、Special symbol，Case sensitive</div></div>',
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">Strength：<EM class=st1>weak</EM><B class="progressImage prog3"></B><EM class=st2>strong</EM></P>6~16One character，Include letter、number、Special symbol，Case sensitive</div></div>'
							  ];

var passwordStrengthText = ['Password strength：weak','Password strength：in','Password strength：strong']
//密码强度校验规则(flag=1(数字)+2(小写)+4(大写)+8(特殊字符)的组合，value里的0表示跟密码一样长,1表示起码1个长度)
var passwordStrengthRule = [
	{level:1,rule:[
				   {flag:1,value:[0]},			//number
				   {flag:2,value:[0]},				//Lowercase character
				   {flag:4,value:[0]}			//Capital character
				  ]
	},
	{level:2,rule:[
				   {flag:8,value:[0]},				//Special symbol
				   {flag:9,value:[1,1]},		//number(>=1)+Special symbol>=1)
				   {flag:10,value:[1,1]},		//A lowercase letter(>=1)+Special symbol>=1)
				   {flag:12,value:[1,1]},		//Capital(>=1)+Special symbol>=1)
				   {flag:3,value:[1,1]},	//number(>=1)+A lowercase letter(>=1)
				   {flag:5,value:[1,1]},	//number(>=1)+Capital(>=1)
				   {flag:6,value:[1,1]}			//A lowercase letter(>=1)+Capital(>=1)
				  ]
	},
	{level:3,rule:[
				   {flag:11,value:[1,1,1]},	//number(>=1)+A lowercase letter(>=1)+Special symbol(>=1)
				   {flag:13,value:[1,1,1]},	//number(>=1)+Capital(>=1)+Special symbol(>=1)
				   {flag:14,value:[1,1,1]},	//A lowercase letter(>=1)+Capital(>=1)+Special symbol(>=1)
				   {flag:7,value:[1,1,1]}	//number(>=1)+A lowercase letter(>=1)+Capital(>=1)
				  ]
	}
];