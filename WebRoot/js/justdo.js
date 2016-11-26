(function() {
	window.IM = window.IM || {
        _appid : '8aaf070856bbb3c50156c093fa3b04ff', // 应用I
        _onUnitAccount : 'KF10089', // 多渠道客服帐号，目前只支持1individual
        _3rdServer : 'http://123.57.230.158:8886/authen/', // 3rdServer，主要用来虚拟用户服务器获取SIG
		/** 以下不要动，不需要改动 */
		_timeoutkey: null,
		_username: null,
		_user_account: null,  //用户登录账号
		_contact_type_c: 'C', // 代表联系人
		_contact_type_g: 'G', // 代表群组
		_contact_type_m: 'M', // 代表多渠道客服
		_onMsgReceiveListener: null,
		_onDeskMsgReceiveListener: null,
		_noticeReceiveListener: null,
		_onConnectStateChangeLisenter: null,
		_onCallMsgListener: null,
		_isMcm_active: false,
		_local_historyver: 0,
		_msgId: null, // MessageID，查看图片时有用
		_pre_range: null, // pre的光标监控对象
		_pre_range_num: 0, // 计数，Recordpre中当前光标位置，以childNodes为单位
		_fireMessage: 'fireMessage',
		_serverNo: 'XTOZ',
		_baiduMap: null,
		_loginType: 1, //登录类型: 1账号登录，3voip账号密码登录
		_Notification: null,
		_extopts: [], // 新建一个数组存放@的人
		_transfer : 12,
		_isNewSDK:false,
		/**
		 * 初始化
		 * 
		 * @private
		 */
		init: function() {
			// 初始化SDK
			var resp = RL_YTX.init(IM._appid);
			if (!resp) {
				console.log('SDKInitialization error');
				return;
			};
			if (200 == resp.code) { // 初始化成功
				$('#navbar_login').show();
				$('#navbar_login_show').hide();
				// 重置页面高度变化
				IM.HTML_resetHei();
				window.onresize = function() {
					IM.HTML_resetHei();
				};
				// 初始化一些页面需要绑定的事件
				IM.initEvent();
				if ($.inArray(174004, resp.unsupport) > -1 || $.inArray(174009, resp.unsupport) > -1) { //不支持getUserMedia方法或者url转换
					IM.Check_usermedie_isDisable(); //拍照、录音、音视频呼叫都不支持
				} else if ($.inArray(174007, resp.unsupport) > -1) { //不支持发送附件
					IM.SendFile_isDisable();
				} else if ($.inArray(174008, resp.unsupport) > -1) { //不支持音视频呼叫，音视频不可用
					IM.SendVoiceAndVideo_isDisable();
				};
			} else if (174001 == resp.code) { // 不支持HTML5
				var r = confirm(resp.msg);
				if (r == true || r == false) {
					window.close();
				}
			} else if (170002 == resp.code) { //缺少必须参数
				console.log("Error code：170002,Error codedescription" + resp.msg);
			} else {
				console.log('Unknown state code');
			};
			IM._Notification = window.Notification || window.mozNotification || window.webkitNotification || window.msNotification || window.webkitNotifications;
			if (!!IM._Notification) {
				IM._Notification.requestPermission(function(permission) {
					if (IM._Notification.permission !== "granted") {
						IM._Notification.permission = "granted";
					}
				});
			}
		},
		/**
		 * 初始化一些页面需要绑定的事件
		 */
		initEvent: function() {
			$('#im_send_content').bind('paste', function() {
				IM.DO_pre_replace_content();
			});
		},
		/**
		 * 初始化表情
		 */
		initEmoji: function() {
			var emoji_div = $('#emoji_div').find('div[class="popover-content"]');
			for (var i in emoji.show_data) {
				var c = emoji.show_data[i];
				var out = emoji.replace_unified(c[0][0]);
				var content_emoji = '<span style="cursor:pointer; margin: 0 2px 0 4px;" ' +
					'onclick="IM.DO_chooseEmoji(\'' + i + '\', \'' + c[0][0] + '\')" ' +
					'imtype="content_emoji">' + out + '</span>';
				emoji_div.append(content_emoji);
			}
		},
		/**
		 * 监控键盘
		 * 
		 * @param event
		 * @constructor
		 */
		_keyCode_1: 0,
		_keyCode_2: 0,
		EV_keyCode: function(event) {
			IM._keyCode_1 = IM._keyCode_2;
			IM._keyCode_2 = event.keyCode;
			// 17=Ctrl 13=Enter  16=shift 50=@
			if (17 == IM._keyCode_1 && 13 == IM._keyCode_2) {
				if ('none' == $('#navbar_login').css('display')) {
					IM.DO_sendMsg();
				}
			} else if (17 != IM._keyCode_1 && 13 == IM._keyCode_2) {
				if ('block' == $('#navbar_login').css('display')) {
				}
			} else if (16 == IM._keyCode_1 && 50 == IM._keyCode_2) { //chrome、火狐、opear 英文输入法
				//判断如果是群组的话才展示成员列表
				$('#im_contact_list').find('li').each(function() {
					if ($(this).attr('class').indexOf("active") > -1) {
						if ($(this).attr("contact_type") == IM._contact_type_g) {
							//展示成员列表
							var groupId = $(this).attr("contact_you");
							if (document.getElementById("im_send_content") == document.activeElement) {
								//传入startIndex
								var startIndex = window.getSelection().anchorOffset;
								IM.EV_getGroupMemberList(groupId, "memberList", startIndex);
							}
						}
					}
				});
			} else if (16 == IM._keyCode_1 && 229 == IM._keyCode_2) { //chrome中文输入法时返回229
				setTimeout(function() {
					var str = $("#im_send_content").text();
					var startIndex = window.getSelection().anchorOffset;
					if ("@" == str.substring(startIndex - 1, startIndex)) {
						//判断如果是群组的话才展示成员列表
						$('#im_contact_list').find('li').each(function() {
							if ($(this).attr('class').indexOf("active") > -1) {
								if ($(this).attr("contact_type") == IM._contact_type_g) {
									//展示成员列表
									var groupId = $(this).attr("contact_you");
									if (document.getElementById("im_send_content") == document.activeElement) {
										IM.EV_getGroupMemberList(groupId, "memberList", startIndex - 1);
									}
								}
							}
						});
					};
				}, 500)
			} else if (50 == IM._keyCode_2) {
				if (!!navigator.userAgent.match(/mobile/i)) { //判断是否移动端
					setTimeout(function() {
						var str = $("#im_send_content").text();
						if ("@" == str.substring(str.length - 1)) {
							$('#im_contact_list').find('li').each(function() {
								if ($(this).attr('class').indexOf("active") > -1) {
									if ($(this).attr("contact_type") == IM._contact_type_g) {
										//展示成员列表
										var groupId = $(this).attr("contact_you");
										if (document.getElementById("im_send_content") == document.activeElement) {
											IM.EV_getGroupMemberList(groupId, "memberList", '');
											$("#groupMemList_div").css("max-width", "100%");
										}
									}
								}
							});
						}
					}, 200);
				}
			} else if (8 == IM._keyCode_2) { //退格键
				$("#groupMemList_div").hide();
			} else if (16 == IM._keyCode_2) { //火狐中文输入模式
				var userAgent = navigator.userAgent.toLowerCase();
				if (userAgent.indexOf("firefox") > -1) {
					setTimeout(function() {
						//传入startIndex
						var startIndex = window.getSelection().anchorOffset;
						var str = $("#im_send_content").text();
						if ("@" == str.substring(startIndex - 1, startIndex)) {
							//判断如果是群组的话才展示成员列表
							$('#im_contact_list').find('li').each(function() {
								if ($(this).attr('class').indexOf("active") > -1) {
									if ($(this).attr("contact_type") == IM._contact_type_g) {
										//展示成员列表
										var groupId = $(this).attr("contact_you");
										if (document.getElementById("im_send_content") == document.activeElement) {
											IM.EV_getGroupMemberList(groupId, "memberList", startIndex - 1);
										}
									}
								}
							});
						}
					}, 200)
				}
			}
		},
		/**
		 * 正式处理登录逻辑，此方法可供断线监听回调登录使用 获取时间戳，获取SIG，调用SDK登录方法
		 * 
		 * @param user_account
		 * @param pwd 密码
		 * @private
		 */
		_login: function(user_account, pwd) {
			var timestamp = IM._getTimeStamp();
			var appToken = 'cbdc3d2987abc1191a3763a1aceae319'; //使用是赋值为应用对应的appToken
			var sig = hex_md5(IM._appid + user_account + timestamp + appToken);
			console.log("Local computingsig：" + sig);
			IM.EV_login(user_account, pwd, sig, timestamp);
		},
		/**
		 * SIG获取 去第三方（客服）服务器获取SIG信息 并将SIG返回，传给SDK中的登录方法做登录使用
		 * 
		 * @param user_account
		 * @param timestamp -- 时间戳要与SDK登录方法中使用的时间戳一致
		 * @param callback
		 * @param onError
		 * @private
		 */
		_privateLogin: function(user_account, timestamp, callback, onError) {
			console.log("_privateLogin");
			var data = {
				"appid": IM._appid,
				"username": user_account,
				"timestamp": timestamp
			};
			var url = IM._3rdServer + 'genSig';
			$.ajax({
				url: url,
				dataType: 'jsonp',
				data: data,
//				contentType:"application/json",
				jsonp: 'cb',
				success: function(result) {
					if (result.code != 000000) {
						var resp = {};
						resp.code = result.code;
						resp.msg = "Get SIG fail from 3rd server!...";
						onError(resp);
						return;
					} else {
						var resp = {};
						resp.code = result.code;
						resp.sig = result.sig;
						callback(resp);
						return;
					}
				},
				error: function() {
					var resp = {};
					resp.msg = 'Get SIG fail from 3rd server!';
					onError(resp);
				},
				timeout: 5000
			});
		},
		/**
		 * 事件，登录 去SDK中请求登录
		 * 
		 * @param user_account
		 * @param sig
		 * @param timestamp --
		 *            时间戳要与生成SIG参数的时间戳保持一致
		 * @constructor
		 */
		EV_login: function(user_account, pwd, sig, timestamp) {
			console.log("EV_login");
			var loginBuilder = new RL_YTX.LoginBuilder();
			loginBuilder.setType(IM._loginType);
			loginBuilder.setUserName(user_account);
			loginBuilder.setSig(sig);
			loginBuilder.setTimestamp(timestamp);
			RL_YTX.login(loginBuilder, function(obj) {
				console.log("EV_login succ...");
				IM._user_account = user_account;
				IM._username = user_account;
				// 服务器连接状态变更时的监听
				IM._onConnectStateChangeLisenter = RL_YTX.onConnectStateChangeLisenter(function(obj) {
					// obj.code;//变更状态 1 断开连接 2 重练中 3 重练成功 4 被踢下线 5 断开连接，需重新登录
					// 断线需要人工重连
					if (1 == obj.code) {
						ajaxLoadEnd();
						$.messager.alert("Prompt","Connection interrupt");
						IM.DO_logout();
						console.log('onConnectStateChangeLisenter obj.code:' + obj.msg);
					} else if (2 == obj.code) {
						IM.HTML_showAlert('alert-warning',
							'Network situation is not good，Re-connecting server', 10 * 60 * 1000);
						ajaxLoadEnd();
						$.messager.alert("Prompt","Network situation is not good，Re-connecting server");
						IM.DO_logout();
//						$("#pop_videoView").hide();
					} else if (3 == obj.code) {
						IM.HTML_showAlert('alert-success', 'Connect successfully');
					} else if (4 == obj.code) {
						IM.DO_logout();
					} else if (5 == obj.code) {
						IM.HTML_showAlert('alert-warning',
							'Network situation is not good，Re-connecting server');
						IM.DO_logout();
						ajaxLoadEnd();
						$.messager.alert("Prompt","Network situation is not good，Please try later");
//						$("#pop_videoView").hide();
//						IM._login(IM._user_account);
					} else {
						ajaxLoadEnd();
						IM.DO_logout();
						console.log('onConnectStateChangeLisenter obj.code:' + obj.msg);
					}
				});
				IM._onCallMsgListener = RL_YTX.onCallMsgListener(
					function(obj) {
						IM.EV_onCallMsgListener(obj);
					});
				IM.HTML_LJ_none();
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，登出
		 * 
		 * @constructor
		 */
		EV_logout: function() {
			console.log("EV_logout");
			IM.DO_logout();
			RL_YTX.logout(function() {
				console.log("EV_logout succ...");
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 登出
		 * 
		 * @constructor
		 */
		DO_logout: function() {
			// 销毁PUSH监听
			IM._onMsgReceiveListener = null;
			// 注册客服消息监听
			IM._onDeskMsgReceiveListener = null;
			// 销毁注册群组通知事件监听
			IM._noticeReceiveListener = null;
			// 服务器连接状态变更时的监听
			IM._onConnectStateChangeLisenter = null;
			//呼叫监听
			IM._onCallMsgListener = null;
			//阅后即焚监听
			IM._onMsgNotifyReceiveListener = null;
			$("#fireMessage").removeClass("active");
			// 清理左侧数据
			$('#im_contact_list').empty();
			// 清理右侧数据
			$('#im_content_list').empty();
			// 隐藏图片层
			IM.HTML_pop_photo_hide();
			// 隐藏拍照层
			IM.HTML_pop_takePicture_hide();
			//隐藏音视频呼叫遮罩层
//			$("#pop_videoView").hide();
			//隐藏录音遮罩层，停掉录音流
			$("#pop_recorder").hide();
			// 隐藏群组详情页面
			IM.HTML_pop_hide();
			// 隐藏表情框
			$('#emoji_div').hide();
			// 隐藏提示框
			IM.HTML_closeAlert('all');
			// 联系人列表切换到沟通
			IM.DO_choose_contact_type('C');
			$('#navbar_login').show();
			$('#navbar_login_show').hide();
			IM.HTML_LJ_block('black');
		},
		/**
		 * 事件，push消息的监听器，被动接收信息
		 * 
		 * @param obj
		 * @constructor
		 */
		EV_onMsgReceiveListener: function(obj) {
			console.log('Receive message sender:[' + obj.msgSender + ']...msgId:[' + obj.msgId + ']...content[' + obj.msgContent + ']');
		},
		/**
		 * 事件，notice群组通知消息的监听器，被动接收消息
		 * 
		 * @param obj
		 * @constructor
		 */
		EV_noticeReceiveListener: function(obj) {
			console.log('notice message groupId:[' + obj.groupId + ']...auditType[' + obj.auditType + ']...msgId:[' + obj.msgId + ']...');
			IM.DO_notice_createMsgDiv(obj);
			// 播放铃声
			document.getElementById('im_ring').play();

		},
		EV_onCallMsgListener: function(obj) {
			console.log("-------obj.callId = " + obj.callId);
			console.log("-------obj.caller = " + obj.caller);
			console.log("-------obj.called = " + obj.called);
			console.log("-------obj.callType = " + obj.callType);
			console.log("-------obj.state = " + obj.state);
			console.log("-------obj.reason = " + obj.reason);
			console.log("-------obj.code = " + obj.code);
			var noticeMsg = ''; //桌面提醒消息
			if (obj.callType == 1) { //video
				if (200 == obj.code) {
					if (obj.state == 1) { //收到振铃消息
						ajaxLoadEnd();
						//本地播放振铃
						document.getElementById("voipCallRing").play();
					} else if (obj.state == 2) { //呼叫中
						
					} else if (obj.state == 3) { //被叫接受
						ajaxLoadEnd();
						$('#diagnose_operation_dialog').dialog('open');
						document.getElementById("voipCallRing").pause();
						$("#cancelVoipCall").text("End");
						noticeMsg = "[Receive video calls]";
						//开始视频诊断
						startVideoDiagnose();
					} else if (obj.state == 4) { //呼叫失败 对主叫设定：自动取消，对方拒绝或者忙 
//						$("#pop_videoView").hide();
						ajaxLoadEnd();
						$('#diagnose_operation_dialog').dialog('close');
						$.messager.alert("Prompt", 'The other is on the phone.');
						IM.HTML_showAlert('alert-error', 'The other is on the phone.');
						document.getElementById("voipCallRing").pause();
						noticeMsg = "[End of video call]";
					} else if (obj.state == 5) { //结束通话  或者主叫取消（对被叫而言）
						document.getElementById("voipCallRing").pause();
//						$("#pop_videoView").hide();
						ajaxLoadEnd();
						$('#diagnose_operation_dialog').dialog('close');
						$.messager.alert("Prompt", 'End of video call');
						noticeMsg = "[End of video call]";
						finishVideoDiagnose();
					} else if (obj.state == 6) { //呼叫到达
						ajaxLoadEnd();
						$("#videoView").show();
						IM.HTML_videoView(obj.callId, obj.caller, obj.called, 1);
						$("#acceptVoipCall").show();
						$("#refuseVoipCall").show();
						//本地播放振铃
						document.getElementById("voipCallRing").play();
						noticeMsg = "[Video call]";
					}
				} else {
					ajaxLoadEnd();
					$('#diagnose_operation_dialog').dialog('close');
					$.messager.alert("Prompt", 'Request video call，Please use other terminal processing');
					var str = '<pre>Request video call，Please use other terminal processing</pre>';
					IM.HTML_pushCall_addHTML(obj.caller, obj.callId, str);
				}
			}
			//桌面提醒通知
			if (!!noticeMsg) {
				IM.DO_deskNotice(obj.caller, '', noticeMsg, '', false, true);
			}
		},
		/**
		 * 事件，发送消息
		 * 
		 * @param msgid
		 * @param text
		 * @param receiver
		 * @param isresend
		 * @constructor
		 */
		EV_sendTextMsg: function(oldMsgid, text, receiver, isresend, type) {
			console.log('send Text message: receiver:[' + receiver + ']...connent[' + text + ']...');
			var obj = new RL_YTX.MsgBuilder();
			obj.setText(text);
			obj.setType(1);
			obj.setReceiver(receiver);
			if (IM._extopts.length > 0) {
				obj.setAtAccounts(IM._extopts);
				obj.setType(11);
			}
			if ($("#fireMessage").attr("class").indexOf("active") > -1) { //domain
				obj.setDomain("fireMessage");
			};
			if(!!type){
				obj.setType(type);
			}
			var msgId = RL_YTX.sendMsg(obj, function(obj) {
				$('#im_send_content').html('');
				$(document.getElementById(receiver + '_' + obj.msgClientNo)).show();
				$(document.getElementById(receiver + '_' + obj.msgClientNo)).find('span[imtype="resend"]').css('display', 'none');
				console.log('send Text message succ');
				if (isresend) {
					var msg = $(document.getElementById(receiver + '_' + obj.msgClientNo));
					$('#im_content_list').append(msg.prop("outerHTML"));
					msg.remove(); // 删掉原来的展示
				};
				$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			}, function(obj) {
				setTimeout(function() { //断线的时候如果不延迟会出现找不到标签的情况，延迟0.3秒可解决。
					if (170001 == obj.code) {
						$(document.getElementById(receiver + '_' + obj.msgClientNo)).remove();
						alert("Message is too long，Please send in different messages");
					} else if (174002 == obj.code) {
						$(document.getElementById(receiver + '_' + obj.msgClientNo)).remove();
						console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
					} else {
						$('#im_send_content').html('');
						var msgf = $(document.getElementById(receiver + '_' + obj.msgClientNo));
						msgf.show();
						if (msgf.find('pre [msgtype="resendMsg"]').length == 0) {
							var resendStr = '<pre msgtype="resendMsg" style="display:none;">' + text + '</pre>'
							msgf.append(resendStr);
						}

						msgf.find('span[imtype="resend"]').css('display', 'block');
						console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
					}
				}, 300)
			});
			$(document.getElementById(receiver + '_' + oldMsgid)).attr("id", receiver + "_" + msgId);
			//@数组清空
			IM._extopts = [];
		},
		/**
		 * 事件，重发消息
		 * 
		 * @param id
		 *            右侧展示模块元素的id
		 * 
		 * @constructor
		 */
		EV_resendMsg: function(obj) {
			var msg = $(obj.parentElement);
			// 消息类型1:文本消息 2：语音消息 3：视频消息 4：图片消息 5：位置消息 6：文件
			var msgtype = msg.attr('im_msgtype');
			var receiver = msg.attr('content_you');
			var oldMsgid = msg.attr('id').substring(msg.attr('id').indexOf("_") + 1);
			if (1 == msgtype) { // 文本消息
				msg.find('span[imtype="resend"]').css('display', 'none');
				var text = msg.find('pre[msgtype="resendMsg"]').html();
				if (text.length > 2048) {
					IM.HTML_showAlert('alert-error', 'Message length cannot be exceeded2048');
					return false;
				}
				console.log('resend message: text[' + text + ']...receiver:[' + receiver + ']');
				if (IM._contact_type_m == contact_type) {
					IM.EV_sendMcmMsg(oldMsgid, text, content_you, true);
				} else {
					IM.EV_sendTextMsg(oldMsgid, text, receiver, true);
				}
			} else if (4 == msgtype || 7 == msgtype) {
				// 查找当前选中的contact_type值 1、IM上传 2、MCM上传
				var contact_type = msg.attr('content_type');
				var oFile = msg.find('input[imtype="msg_attach_resend"]')[0];
				if (!!oFile) {
					oFile = oFile.files[0];
					console.log('resend Attach message: msgtype[' + msgtype + ']...receiver:[' + receiver + ']');
					if (IM._contact_type_m == contact_type) {
						IM.EV_sendToDeskAttachMsg(oldMsgid, oFile, msgtype,
							receiver, true);
					} else {
						IM.EV_sendAttachMsg(oldMsgid, oFile, msgtype, receiver, true);
					}
				} else {
					oFile = msg.find("object").val();
					console.log('resend Attach message: msgtype[' + msgtype + ']...receiver:[' + receiver + ']');
					if (IM._contact_type_m == contact_type) {
						IM.EV_sendToDeskAttachMsg(oldMsgid, oFile,
							msgtype, receiver, true);
					} else {
						IM.EV_sendAttachMsg(oldMsgid, oFile,
							msgtype, receiver, true);
					};
				};
			} else if (2 == msgtype) { //Voice
				var oFile = msg.find("object").val();
				if (IM._contact_type_m == contact_type) {
					IM.EV_sendToDeskAttachMsg(oldMsgid, oFile,
						msgtype, receiver, true);
				} else {
					IM.EV_sendAttachMsg(oldMsgid, oFile,
						msgtype, receiver, true);
				};
			} else {
				console.log('Do not support the attachment type message retransmission');
			}
		},
		/**
		 * 发送附件
		 * 
		 * @param msgid
		 * @param file --
		 *            file对象
		 * @param type --
		 *            附件类型 2 语音消息 3 视频消息 4 图片消息 5 位置消息 6 文件消息
		 * @param receiver --
		 *            接收者
		 * @constructor
		 */
		EV_sendAttachMsg: function(oldMsgid, file, type, receiver, isresend) {
			console.log('send Attach message: type[' + type + ']...receiver:[' + receiver + ']' + 'fileName:[' + file.fileName + ']');
			var obj = new RL_YTX.MsgBuilder();
			obj.setFile(file);
			obj.setType(type);
			obj.setReceiver(receiver);
			if ($("#fireMessage").attr("class").indexOf("active") > -1) { //domain
				obj.setDomain("fireMessage");
			};
			var oldMsg = $(document.getElementById(receiver + '_' + oldMsgid));
			oldMsg.attr('msg', 'msg');
			oldMsg.css('display', 'block');
			if (4 == type) {
				oldMsg.attr('im_carousel', 'real');
				oldMsg.attr('im_msgtype', '4');
			}
			$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			var msgid = RL_YTX.sendMsg(obj, function(obj) {
				setTimeout(function() {
					var id = receiver + "_" + obj.msgClientNo;
					var msg = $(document.getElementById(id));
					msg.find('span[imtype="resend"]').css(
						'display', 'none');
					msg.find('div[class="bar"]').parent().css(
						'display', 'none');
					msg.find('span[imtype="msg_attach"]').css(
						'display', 'block');
					console.log('send Attach message succ');
					if (isresend) {
						$('#im_content_list').append(msg.prop("outerHTML"));
						msg.remove(); // 删掉原来的展示
					}
					$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
				}, 100)
			}, function(obj) { // fail
				setTimeout(function() {
					var msg = $(document.getElementById(receiver + "_" + obj.msgClientNo));
					msg.find('span[imtype="resend"]').css(
						'display', '');
					msg.find('div[class="bar"]').parent().css(
						'display', 'none');
					msg.find('span[imtype="msg_attach"]').css(
						'display', '');
					console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
				}, 100)
			}, function(sended, total, msgId) { // 进度条
				setTimeout(function() {
					var msg = $(document.getElementById(receiver + "_" + msgId));
					// console.log('send Attach message progress:' + (sended / total * 100 + '%'));
					// sended;//已发送字节数
					// total;//总字节数
					if (sended < total) {
						msg.find('div[class="bar"]').css(
							'width',
							(sended / total * 100 + '%'));
					} else {
						msg.find('div[class="bar"]').parent()
							.css('display', 'none');
						msg.find('span[imtype="msg_attach"]')
							.css('display', 'block');
					};
				}, 100)
			});
			oldMsg.attr("id", receiver + '_' + msgid);
			if (file instanceof Blob) {
				oldMsg.find("object").val(file);
			}
		},
		/**
		 * 发送附件
		 * 
		 * @param msgid
		 * @param file --
		 *            file对象
		 * @param type --
		 *            附件类型 2 语音消息 3 视频消息 4 图片消息 5 位置消息 6 文件消息
		 * @param receiver --
		 *            接收者
		 * @constructor
		 */
		EV_sendToDeskAttachMsg: function(oldMsgid, file, type, receiver, isresend) {
			console.log('send Attach message: type[' + type + ']...receiver:[' + receiver + ']');
			var obj = new RL_YTX.DeskMessageBuilder();
			obj.setFile(file);
			obj.setType(type);
			obj.setOsUnityAccount(receiver);
			if ($("#fireMessage").attr("class").indexOf("active") > -1) { //domain
				obj.setDomain("fireMessage");
			};
			var oldMsg = $(document.getElementById(receiver + '_' + oldMsgid));
			oldMsg.attr('msg', 'msg');
			oldMsg.css('display', 'block');
			$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			var msgid = RL_YTX.sendToDeskMessage(obj, function(obj) { // chenggong
				setTimeout(function() {
					var msg = $(document.getElementById(receiver + "_" + obj.msgClientNo));
					msg.find('span[imtype="resend"]').css(
						'display', 'none');
					msg.find('div[class="bar"]').parent().css(
						'display', 'none');
					msg.find('span[imtype="msg_attach"]').css(
						'display', 'block');
					msg.attr('msg', 'msg');
					console.log('send Attach message succ');
					if (isresend) {
						$('#im_content_list').append(msg.prop("outerHTML"));
						msg.remove(); // 删掉原来的展示
					}
					$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
				}, 100);
			}, function(obj) { // fail
				setTimeout(function() {
					var msg = $(document.getElementById(receiver + "_" + obj.msgClientNo));
					msg.find('span[imtype="resend"]').css(
						'display', 'block');
					msg.find('div[class="bar"]').parent().css(
						'display', 'none');
					msg.find('span[imtype="msg_attach"]').css(
						'display', 'block');
					console.log("Error code：" + obj.code + "; Error description：" + obj.msg);
				}, 100);
			}, function(sended, total, msgId) { // 进度条
				setTimeout(function() {
					var msg = $(document.getElementById(receiver + "_" + msgId));
					console.log('send Attach message progress:' + (sended / total * 100 + '%'));
					// sended;//已发送字节数
					// total;//总字节数
					if (sended < total) {
						msg.find('div[class="bar"]').css(
							'width',
							(sended / total * 100 + '%'));
					} else {
						msg.find('div[class="bar"]').parent()
							.css('display', 'none');
						msg.find('span[imtype="msg_attach"]')
							.css('display', 'block');
					}
				}, 100);
			});
			oldMsg.attr("id", receiver + '_' + msgid);
		},
		/**
		 * 事件，客服开始咨询
		 * 
		 * @param receiver --
		 *            客服号
		 * @constructor
		 */
		EV_startMcmMsg: function(receiver) {
			console.log('start MCM message...');
			var obj = new RL_YTX.DeskMessageStartBuilder();
			obj.setOsUnityAccount(receiver);
			obj.setUserData('');
			RL_YTX.startConsultationWithAgent(obj, function() {
				console.log('start MCM message succ...');
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，客服停止咨询
		 * 
		 * @param receiver --
		 *            客服号
		 * @constructor
		 */
		EV_stopMcmMsg: function(receiver) {
			console.log('stop MCM message...');
			var obj = new RL_YTX.DeskMessageStopBuilder();
			obj.setOsUnityAccount(receiver);
			obj.setUserData('');
			RL_YTX.finishConsultationWithAgent(obj, function() {
				console.log('stop MCM message succ...');
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，客服发送消息
		 * 
		 * @param msgid
		 * @param text
		 * @param receiver --
		 *            客服号
		 * @constructor
		 */
		EV_sendMcmMsg: function(oldMsgid, text, receiver, isresend) {
			console.log('send MCM message...');
			var obj = new RL_YTX.DeskMessageBuilder();
			obj.setText(text);
			obj.setUserData();
			obj.setType(1);
			obj.setOsUnityAccount(receiver);
			if ($("#fireMessage").attr("class").indexOf("active") > -1) { //domain
				obj.setDomain("fireMessage");
			};
			var msgid = RL_YTX.sendToDeskMessage(obj, function(obj) {
				var msg = $(document.getElementById(receiver + "_" + obj.msgClientNo));
				msg.find('span[imtype="resend"]').css('display', 'none');
				console.log('send MCM message succ...');
				if (isresend) {
					$('#im_content_list').append(msg.prop("outerHTML"));
					msg.remove(); // 删掉原来的展示
				};
				$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			}, function(obj) {
				var msgf = $(document.getElementById(receiver + '_' + obj.msgClientNo));
				if (msgf.find('pre [msgtype="resendMsg"]').length == 0) {
					var resendStr = '<pre msgtype="resendMsg" style="display:none;">' + text + '</pre>'
					msgf.append(resendStr);
				}
				msgf.find('span[imtype="resend"]').css('display', 'block');
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
			$(document.getElementById(receiver + "_" + oldMsgid)).attr("id", receiver + "_" + msgid);
		},
		/**
		 * 事件，创建群组
		 * 
		 * @param groupName
		 * @param permission
		 * @constructor
		 */
		EV_createGroup: function(groupName, permission, target) {
			$("#createGroup_bt").attr("disabled", "disabled");
			//如果有类型则传值
			var declare = $("#createDeclare").val();
			if (!!declare) {
				var regx1 = /^[\\x00-\\x7F\a-zA-Z\u4e00-\u9fa5、，。！；《》【】”“’‘：:,.!;_\s-]{0,128}$/; //只含有汉字、number、Letter、下划线，下划线位置不限
				if (regx1.exec(declare) == null) {
					alert("Group instructions only allow Chinese and English numbers and Chinese symbols、，。！；《》【】”“’‘：And English symbols:,.!;and@_-，Length is shorter than128");
					$("#createGroup_bt").removeAttr("disabled");
					return;
				};

				if (declare.substring(0, 1) == "g" || declare.substring(0, 1) == "G") {
					alert("Group description cannot begorGStart");
					$("#createGroup_bt").removeAttr("disabled");
					return;
				}
			}
			//如果群组说明不是空，校验说明的合法性
			var groupType = $(document).find('input[name="groupType"]:checked').val();
			//如果有地区信息则传值
			var province = $("#province").find("option:selected").text();
			var city = $("#city").find("option:selected").text()
			console.log('create group...groupName[' + groupName + '] permission[' + permission + ']target[' + target + ']');
			var obj = new RL_YTX.CreateGroupBuilder();
			obj.setGroupName(groupName);
			obj.setPermission(permission);
			obj.setTarget(target);
			if (!!groupType) {
				obj.setGroupType(groupType);
			}
			if (!!province && (province != "--")) {
				obj.setProvince(province);
			}
			if (!!city) {
				obj.setCity(city);
			}
			if (!!declare) {
				obj.setDeclared(declare);
			}
			// target参数 1讨论组 2 群组
			if (target == 1) {
				// 校验邀请参数是否符合要求
				var memberSts = $("#pop_invite_area").val();
				var memberArr = memberSts.split(",");
				if (memberArr.length > 50) {
					alert("Invite too many users！");
					$("#createGroup_bt").removeAttr("disabled");
					return;
				}
				for (var i in memberArr) {
					if (memberArr[i] == IM._user_account) {
						$("#createGroup_bt").removeAttr("disabled");
						return;
					};
					if (!IM.DO_checkContact(memberArr[i])) {
						$("#createGroup_bt").removeAttr("disabled");
						return;
					}
				};
			}
			RL_YTX.createGroup(obj, function(obj) {
				var groupId = obj.data;
				console.log('create group succ... groupId[' + groupId + ']');
				if (target == 1) { // 如果是讨论组，需要在讨论组创建成功之后随即添加账号
					// 左侧名称列表
					IM.EV_inviteGroupMember(groupId, permission, target, true, groupName);
				} else {
					// 左侧名称列表
					IM.HTML_addContactToList(groupId, groupName,
						IM._contact_type_g, true, true, false,
						IM._user_account, 1, 2);
					IM.HTML_pop_hide();
				}
			}, function(obj) {
				$("#createGroup_bt").removeAttr("disabled");
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
				return;
			});
		},
		/**
		 * 解散群组
		 * 
		 * @param groupId
		 * @constructor
		 */
		EV_dismissGroup: function(groupId) {
			console.log('dismiss Group...');
			var obj = new RL_YTX.DismissGroupBuilder();
			obj.setGroupId(groupId);
			RL_YTX.dismissGroup(obj, function() {
				console.log('dismiss Group SUCC...');
				// 将群组从列表中移除
				IM.HTML_remove_contact(groupId);
				// 隐藏群组详情页面
				IM.HTML_pop_hide();
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 退出群组
		 * 
		 * @param groupId
		 * @constructor
		 */
		EV_quitGroup: function(groupId, flag) {
			//加一层判断提醒是否直接推出群组
			var flagOne=true;
			if (flag&&flagOne) {
				flagOne=false;
				var r = confirm("Whether to transfer the group and then exit");
				if (r == true) {
					return;
				}
			}
			console.log('quit Group...');
			var obj = new RL_YTX.QuitGroupBuilder();
			obj.setGroupId(groupId);

			RL_YTX.quitGroup(obj, function() {
				console.log('quit Group SUCC...');
				// 将群组从列表中移除
				IM.HTML_remove_contact(groupId);
				// 隐藏群组详情页面
				IM.HTML_pop_hide();
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，获取群组详情
		 * 
		 * @param groupId
		 * @param target
		 * @constructor
		 */
		EV_getGroupDetail: function(groupId, isowner, target) {
			console.log('get Group Detail...');
			var objBuilder = new RL_YTX.GetGroupDetailBuilder();
			objBuilder.setGroupId(groupId);
			RL_YTX.getGroupDetail(objBuilder, function(obj) {
				console.log('get Group Detail SUCC...');
				var getTarget = obj.target;
				if (target == null) { // 推送的target参数为空
					// 构建页面
					IM.DO_pop_show(groupId, isowner, getTarget);
					// 调用SDK方法获取数据
					// 获取群组详情
					IM.EV_getGroupDetail(groupId, isowner, getTarget);
				} else {
					// 更新pop弹出框属性
					var im_target = $('#pop').find('div[im_isowner]');
					im_target.attr('im_target', getTarget);
					// 获取成员列表并展示
					IM.EV_getGroupMemberList(groupId, getTarget, null, obj);

				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，获取群组列表
		 * 
		 * @constructor
		 */
		EV_getGroupList: function() {
			var obj = new RL_YTX.GetGroupListBuilder();
			obj.setPageSize(-1);
			obj.setTarget(125); // target传125是一起查， 1是讨论组 2是群组
			RL_YTX.getGroupList(obj, function(obj) {
				for (var i in obj) {
					var groupId = obj[i].groupId;
					var groupName = obj[i].name;
					var owner = obj[i].owner;
					var isNotice = obj[i].isNotice;
					var target = obj[i].target;
					IM.HTML_addContactToList(groupId, groupName,
						IM._contact_type_g, false, false, true,
						owner, isNotice, target);
				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		EV_getRecentConList: function() {
			var recentConListBuilder = new RL_YTX.GetRecentContactListBuilder();
			RL_YTX.getRecentContactList(recentConListBuilder, function(succObj) {
				console.log("get recent Contact List success");
				alert("succObj" + succObj);
				//增加到左侧联系人列表中,zzx
				if (obj.contact.substring(0, 1) != "g") { //如果是普通联系人
					IM.HTML_addContactToList(obj.contact, obj.name, IM._contact_type_c, true, true, false, null, null, null);
				} else { //如果是群组或讨论组
					IM.HTML_addContactToList(obj.contact, obj.name, IM._contact_type_g, false, false, true, null, null, null);
				}
			}, function(errObj) {
				console.log("Error code： " + errObj.code + "; Error description：" + errObj.msg);
			});
		},
		/**
		 * 事件，获取群组成员列表
		 * 
		 * @param groupId
		 * @param isowner
		 * @param target
		 *            1 讨论组 2 群组
		 * @constructor
		 */
		EV_getGroupMemberList: function(groupId, target, startIndex, group) {
			console.log('get Group Member List...');
			var obj = new RL_YTX.GetGroupMemberListBuilder();
			obj.setGroupId(groupId);
			obj.setPageSize(-1);
			RL_YTX.getGroupMemberList(obj, function(obj) {
				console.log('get Group Member List SUCC...');
				if ("memberList" == target) {
					console.log("Show group member list");
					IM.HTML_memberList(obj, startIndex);
				} else {
					IM.DO_pop_show_help_GroupMemberList(obj, groupId, target);
				}
				var isadmin = false;
				for (var i in obj) {
					var member = obj[i];
					if (member.role == 2 && member.member == IM._user_account) { //如果是管理员
						if (member.member == IM._user_account) { //判断是当前对象
							isadmin = true;
						}
					}
				}
				if (group) {
					IM.DO_pop_show_help_GroupDetail(group, groupId, target, isadmin); //当当前用户是管理员的时候，传入一个isadmin，让他有修改群组信息的权限
					//走的还是成员的逻辑，给管理员多一个保存修改的按钮
					if (isadmin && target == 2) {
//						var saveChange = '<a href="javascript:void(0);" class="btn btn-primary" onclick="IM.EV_updateGroupInfo(\'' + groupId + '\')">保存修改</a>';
//						$("#pop_group_" + groupId + ">.modal-footer").append(saveChange);
					}
				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 更新群组信息
		 * 
		 * @param groupId
		 * @constructor
		 */
		EV_updateGroupInfo: function(groupId) {
			console.log("update groupInfo,groupId:[" + groupId + "]");
			var obj = $('#pop').find('span[imtype="im_pop_group_declared"]');
			var declaredObj = obj.children();
			var declared = declaredObj.val();
			if (declared.length > 200) {
				IM.HTML_showAlert('alert-error', 'Announcement length cannot exceed200');
				return false;
			}
			obj = $('#pop').find('div[imtype="im_pop_group_name"]');
			var nameObj = obj.children();
			var groupName = nameObj.val();
			if (!groupName) {
				IM.HTML_showAlert('alert-error', 'Name can't be empty');
				return false;
			}
			if (groupName.length > 50) {
				IM.HTML_showAlert('alert-error', 'Name length cannot exceed50');
				return false;
			}
			var builder = new RL_YTX.ModifyGroupBuilder(groupId, groupName,
				null, null, null, null, declared);
			RL_YTX.modifyGroup(builder, function() {
				console.log("update group info suc");
				IM.HTML_addContactToList(groupId, groupName,
					IM._contact_type_g, false, true, true, null,
					null, null);
				IM.HTML_pop_hide();
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 更新群组个性化设置
		 * 
		 * @param groupId
		 * @param isNotice
		 * @constructor
		 */
		EV_groupPersonalization: function(groupId, isNotice) {
			console.log("set group notice,groupId:[" + groupId + "],isNotice[" + isNotice + "]");
			var builder = new RL_YTX.SetGroupMessageRuleBuilder(groupId,
				isNotice);
			RL_YTX.setGroupMessageRule(builder, function() {
				console.log("set groupNotice suc");
				// 切换btn样式
				if (isNotice == 2) {
					str = '<a href="javascript:void(0);" class="btn btn-primary" style="margin-left:10px;" >open</a>' + '<a href="javascript:void(0);" class="btn" style="margin-left:10px;" onclick="IM.EV_groupPersonalization(\'' + groupId + '\',1)">Close</a>';
				} else {
					str = '<a href="javascript:void(0);" class="btn" style="margin-right:10px;" style="margin-left:10px;" onclick="IM.EV_groupPersonalization(\'' + groupId + '\',2)">open</a>' + '<a href="javascript:void(0);" class="btn btn-primary" >Close</a>';
				}
				$('#pop').find('span[imtype="im_pop_group_notice"]').html(str);
				// 修改左侧联系人列表attr值
				$(document.getElementById('im_contact_' + groupId)).attr('im_isnotice', isNotice);
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 邀请成员加入群组
		 * 
		 * @param groupId
		 * @param permission
		 * @constructor
		 */
		EV_inviteGroupMember: function(groupId, permission, target, isowner, groupName) {
			var memberSts = $("#pop_invite_area").val();
			var memberArr = memberSts.split(",");
			if (target != 1) {
				if (memberArr.length > 50) {
					alert("Invite too many users！");
					return;
				}
				for (var i in memberArr) {
					if (!IM.DO_checkContact(memberArr[i])) {
						return;
					}
				}
			};
			var confirm = 2;
			if (permission <= 1) { // 是否需要邀请者确认 可选 1 不需要 2 需要 默认为2
				confirm = 1;
			}
			if (target <= 1) {
				confirm = 1;
			}
			var builder = new RL_YTX.InviteJoinGroupBuilder(groupId, null,
				memberArr, confirm);
			RL_YTX.inviteJoinGroup(builder, function() {
				IM.HTML_hideInviteArea();
				$("#pop_invite_area").val("");
				if (confirm == 1) {
					for (var i in memberArr) {
						IM.HTML_popAddMember(groupId, memberArr[i],
							memberArr[i], isowner, target);
					}
				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
				$("#createGroup_bt").removeAttr("disabled");
			})
			IM.HTML_addContactToList(groupId, groupName,
				IM._contact_type_g, true, true, false,
				IM._user_account, 1, 1);
			$('#im_add').find('input[imtype="im_add_group"]').val('');
			IM.HTML_pop_hide();
		},
		/**
		 * 事件，用户申请加入确认操作
		 * 
		 * @param groupId
		 *            群组id 必选
		 * @param memberId
		 *            成员id 必选
		 * @param confirm
		 *            是否同意 必选 1 不同意 2同意
		 * @constructor
		 */
		EV_confirmJoinGroup: function(you_sender, version, groupId, memberId,
			confirm) {
			console.log('confirm join group...groupId[' + groupId + '] memberId[' + memberId + '] confirm[' + confirm + ']');
			var obj = new RL_YTX.ConfirmJoinGroupBuilder();
			obj.setGroupId(groupId);
			obj.setMemberId(memberId);
			obj.setConfirm(confirm);

			RL_YTX.confirmJoinGroup(obj, function() {
				var str = '';
				if (1 == confirm)
					str = '{Refused}';
				if (2 == confirm)
					str = '{Agreed}';
				$(document.getElementById(you_sender + '_' + version)).find('span[imtype="notice"]').html(str);
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，管理员是否同意加入群组
		 * 
		 * @param invitor
		 *            邀请者 必选
		 * @param groupId
		 *            群组id 可选
		 * @param confirm
		 *            是否同意 1 不同意 2同意
		 * @constructor
		 */
		EV_confirmInviteJoinGroup: function(you_sender, groupName, version,
			invitor, groupId, confirm) {
			console.log('confirm invite join group...invitor[' + invitor + '] groupId[' + groupId + '] confirm[' + confirm + ']');
			var obj = new RL_YTX.ConfirmInviteJoinGroupBuilder();
			obj.setInvitor(invitor);
			obj.setGroupId(groupId);
			obj.setConfirm(confirm);
			RL_YTX.confirmInviteJoinGroup(obj, function() {
				var str = '';
				if (1 == confirm)
					str = '{Refused}';
				if (2 == confirm)
					str = '{Agreed}';
				$(document.getElementById(you_sender + '_' + version)).find('span[imtype="notice"]').html(str);
				if (2 == confirm) {
					// 在群组列表中添加群组项
					var current_contact_type = IM.HTML_find_contact_type();
					var isShow = false;
					if (IM._contact_type_g == current_contact_type) {
						isShow = true;
					}
					IM.HTML_addContactToList(groupId, groupName,
						IM._contact_type_g, false, isShow, false,
						null, null, null);
				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 更新群组成员禁言状态
		 * 
		 * @param groupId
		 * @param memberId
		 * @param status
		 * @constructor
		 */
		EV_forbidMemberSpeak: function(groupId, memberId, status) {
			console.log('forbid member speakstatus groupId:[' + groupId + '],memberId:[' + memberId + '],status[' + status + ']');
			var builder = new RL_YTX.ForbidMemberSpeakBuilder(groupId,
				memberId, status);
			RL_YTX.forbidMemberSpeak(builder, function() {
				var trobj = $('#pop').find('tr[contact_you="' + memberId + '"]');
				var tdobj = trobj.children();
				var spanobj = tdobj.children();
				var deleobj = spanobj[1];
				var speakobj = spanobj[2];
				$(speakobj).remove();
				console.log("Member banned state changed");
				if (status == 2) {
					$(spanobj).eq(1).after('<span class="pull-right label label-success" imtype="im_pop_memberspeak' + memberId + '" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + memberId + '\',1)"> recovery </span>')
				} else {
					$(spanobj).eq(1).after('<span class="pull-right label label-important" imtype="im_pop_memberspeak' + memberId + '" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + memberId + '\',2)"> Gag </span>')
				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			})
		},
		/**
		 * 提出群组成语
		 * 
		 * @param groupId
		 * @param memberId
		 * @constructor
		 */
		EV_deleteGroupMember: function(groupId, memberId) {
			console.log("delete group member groupId:[" + groupId + "],memberId:[" + memberId + "]");
			var builder = new RL_YTX.DeleteGroupMemberBuilder(groupId, memberId);
			RL_YTX.deleteGroupMember(builder, function() {
				console.log("delete group member suc");
				IM.HTML_popDeleteMember(memberId);
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		},
		/**
		 * 事件，获取群组成员列表
		 * 
		 * @param obj
		 *            obj.creator; //创建者 obj.groupName; //群组名称 obj.type; //群组类型
		 *            obj.province; //省份 obj.city; //城市 obj.scope; //群组大小
		 *            obj.declared; //群组公告 obj.dateCreated; //创建时间 obj.numbers;
		 *            //群组人数 obj.isNotice; //是否免打扰 obj.permission; //群组权限
		 *            1：默认可直接加入 2：需要身份验证 3:私有群组（不能主动加入，仅能管理员邀请） obj.groupDomain;
		 *            //扩展信息 obj.isApplePush; //是否苹果离线推送 obj.target;//群组模式 1 讨论组
		 *            2 普通群组
		 * @param groupId
		 * @param target
		 * @constructor
		 * //TODO
		 */
		DO_pop_show_help_GroupDetail: function(obj, groupId, target, isadmin) {
			var isowner = false;
			if (IM._user_account == obj.creator) {
				isowner = true;
			}
			var str = '';
			$('#pop').find('div[im_isowner]').attr('im_isowner', isowner || isadmin);
			if (isowner || isadmin || target == 1) {//如果是群主，或者管理员，或讨论组
				$('#pop').find('table[imtype="im_pop_members_add"]').show(); //加号的框显示
				str = '<input type="text" class="pull-right" style="width:95%;" value="' + obj.groupName + '"/>';
				$('#pop').find('div[imtype="im_pop_group_name"]').html(str);

				if (!obj.declared) { // 群组公告
					obj.declared = '';
				}
				str = '<textarea class="pull-right" rows="3" style="width:95%;">' + obj.declared + '</textarea>';
				$('#pop').find('span[imtype="im_pop_group_declared"]')
					.html(str);
				var str_add = '<tr>' + '<td style="padding:0 0 0 0;"></td>' + '</tr>' + '<tr>' + '<td>' + '<span class="pull-left" style="width: 25%;"><a href="javascript:void(0);" class="btn" style="font-size: 20px;" onclick="IM.HTML_showInviteArea(this)" >+</a></span>' + '<span class="pull-left" style="width: 25%; display: none;">' + '<a href="javascript:void(0);" class="btn" onclick="IM.EV_inviteGroupMember(\'' + groupId + '\',' + obj.permission + ',' + target + ',\'' + isowner + '\')" >Invitation</a>' + '</span>' + '<span class="pull-right" style="width: 75%; display: none;">' + '<textarea class="pull-left" id="pop_invite_area" style="width:95%;" rows=3 placeholder="Please inputInvitation用户账号，Use English comma\“,”\Separate，' + '最多Invitation50individual"></textarea>' + '</span>' + '</td>' + '</tr>';
				$('#pop').find('table[imtype="im_pop_members_add"]')
					.html(str_add);
				if(isowner && target == 2){
					var adminAdd = '<button class="btn btn-primary" type="button" onclick="IM.EV_quitGroup(\'' + groupId + '\',' + isowner + ')"> Exit group </button> <a href="javascript:void(0);" class="btn" onclick="IM.EV_dismissGroup(\'' + groupId + '\')"> ungroup </a>' + '<a href="javascript:void(0);" class="btn btn-primary" onclick="IM.EV_updateGroupInfo(\'' + groupId + '\')">Save changes</a>';
					$('#pop').find('.modal-footer').html(adminAdd);
				}
				if(isadmin && target == 2){
					var adminAdd = '<button class="btn btn-primary" type="button" onclick="IM.EV_quitGroup(\'' + groupId + '\',' + isowner + ')"> Exit group </button> ' + '<a href="javascript:void(0);" class="btn btn-primary" onclick="IM.EV_updateGroupInfo(\'' + groupId + '\')">Save changes</a>';
					$('#pop').find('.modal-footer').html(adminAdd);
				}
			} else {
				$('#pop').find('table[imtype="im_pop_members_add"]').hide(); //加号的框不显示
				str = '<span class="pull-left" maxlength="128">' + obj.groupName + '</span>';
				$('#pop').find('div[imtype="im_pop_group_name"]').html(str);
				if (!obj.declared) {
					obj.declared = '';
				}
				str = '<div style="width:75%;word-wrap:break-word;height:auto">' + obj.declared + '</div>'
				$('#pop').find('span[imtype="im_pop_group_declared"] > textarea')
					.html(obj.declared);
				$('#pop').find('span[imtype="im_pop_group_declared"] > textarea').attr("readonly", "readonly");
				$('#pop').find('span[imtype="im_pop_group_declared"] > textarea').css("background", "transparent");
				$('#pop').find('span[imtype="im_pop_group_declared"] > textarea').css("border-style", "none");
				$('#pop').find('span[imtype="im_pop_group_declared"] > textarea').css("cursor", "default");
				$('#pop').find('.modal-footer').html('<button class="btn btn-primary" type="button" onclick="IM.EV_quitGroup(\'' + groupId + '\',' + isowner + ')"> Exit group </button>');
			}
			if (obj.isNotice == 1) {
				str = '<a href="javascript:void(0);" class="btn" style="margin-left:10px;" onclick="IM.EV_groupPersonalization(\'' + groupId + '\',2)" >open</a>' + '<a href="javascript:void(0);" class="btn btn-primary" style="margin-left:10px;">Close</a>';
			} else {
				str = '<a href="javascript:void(0);" class="btn btn-primary" style="margin-left:10px;">open</a>' + '<a href="javascript:void(0);" class="btn" style="margin-left:10px;" onclick="IM.EV_groupPersonalization(\'' + groupId + '\',1)">Close</a>';
			}
			$('#pop').find('span[imtype="im_pop_group_notice"]').html(str);
		},
		DO_pop_phone: function(you_sender, version, obj) {
			var msgId = '';
			if (obj) {
				msgId = $(obj).parent().parent()[0].id;
			} else {
				msgId = you_sender + '_' + version;
			}
			IM._msgId = msgId;
			var msg = $(document.getElementById(msgId));
			var videoUrl = msg.find('img').attr("videourl");
			var str = '';
			var showHei = $("#lvjing").height() - 50; //客户端竖屏视频需要拖动滚动条才能露出控制按钮，所以减去50px
			if (!!videoUrl) {
				var type = videoUrl.substring(videoUrl.lastIndexOf(".") + 1);
				str = '<video controls="controls" preload="auto" height="' + showHei + 'px" style="position:relative;top:-20px;left:0px;">' +
					'<source src="' + videoUrl + '" type="video/' + type + '" /></video>';
			} else {
				var url = msg.find('img').attr('src');
				str = '<img src="' + url + '" />';
			};
			$("#carousels").empty();
			$("#carousels").append(str);
			IM.HTML_pop_photo_show();
		},
		/**
		 * lat 纬度
		 * lon 经度
		 * title 位置信息描述
		 */
		DO_show_map: function(lat, lon, title) {
			$("#im_body").append("<div id='baiduMap' style='z-index:888899; margin-left: 10%;margin-right:10%; height: 550px; width: 80%;'></div>");
			$("#carousels").empty();
			var map = new BMap.Map("baiduMap"); // 创建地图实例 
			var point = new BMap.Point(lon, lat); // 创建点坐标 
			var marker = new BMap.Marker(point); // 创建标注    
			map.addOverlay(marker);
			map.centerAndZoom(point, 15);
			var opts = {
				width: 200,
				height: 100,
				enableMessage: true //设置允许信息窗发送短息
			};
			var infoWindow = new BMap.InfoWindow(title, opts); // 创建信息窗口对象 
			marker.addEventListener("click", function() {
				map.openInfoWindow(infoWindow, point); //开启信息窗口
			});
			IM._baiduMap = $("#baiduMap");
			$("#carousels").append(IM._baiduMap);
			$("#baiduMap").show();
			IM.HTML_pop_photo_show();
		},
		/**
		 * 向上选择图片，同一个对话框内
		 * 
		 * @constructor
		 */
		DO_pop_photo_up: function() {
			var msg = $(document.getElementById(IM._msgId));
			if (msg.length < 1) {
				return;
			};
			var index = -1;
			msg.parent().find('div[msg="msg"][im_carousel="real"]:visible').each(
				function() {
					index++;
					if (IM._msgId == $(this).attr('id')) {
						index--;
						return false;
					};
				});
			if (index < 0) {
				return;
			};
			var prevMsg = msg.parent().children('div[msg="msg"][im_carousel="real"]:visible').eq(index);
			if (prevMsg.length < 1) {
				return;
			};
			var str = '';
			var showHei = $("#lvjing").height() - 50; //客户端竖屏视频需要拖动滚动条才能露出控制按钮，所以减去50px
			if (prevMsg.attr("im_msgtype") == 4) {
				var src = prevMsg.find('img').attr('src');
				str = '<img src="' + src + '" />';
			} else {
				var videoUrl = prevMsg.find('img').attr("videourl");
				var type = videoUrl.substring(videoUrl.lastIndexOf(".") + 1);

				str = '<video controls="controls" preload="auto" height="' + showHei + 'px" style="position:relative;top:-20px;left:0px;">' +
					'<source src="' + videoUrl + '" type="video/' + type + '" /></video>';
			};
			IM._msgId = prevMsg.attr('id');
			$("#carousels").empty();
			$("#carousels").append(str);
			if ($("#carousels").find("img")) {
				$("#carousels").find("img").css('max-height', (showHei - 30) + "px").css(
					'max-width', ($(window).width() - 50) + "px");
			};
			var q = 1;
		},
		/**
		 * 向下选择图片,同一个对话框内
		 * 
		 * @constructor
		 */
		DO_pop_photo_down: function() {
			var msg = $(document.getElementById(IM._msgId));
			if (msg.length < 1) {
				return;
			}
			var index = -1;
			msg.parent().find('div[msg="msg"][im_carousel="real"]:visible').each(
				function() {
					index++;
					if (IM._msgId == $(this).attr('id')) {
						index++;
						return false;
					}
				});
			if (index < 0) {
				return;
			}
			var nextMsg = msg.parent().children('div[msg="msg"][im_carousel="real"]:visible').eq(index);
			if (nextMsg.length < 1) {
				return;
			}
			var showHei = $("#lvjing").height() - 50; //客户端竖屏视频需要拖动滚动条才能露出控制按钮，所以减去50px
			if (nextMsg.attr("im_msgtype") == 4) {
				var src = nextMsg.find('img').attr('src');
				str = '<img src="' + src + '" />';
			} else {
				var videoUrl = nextMsg.find('img').attr("videourl");
				var type = videoUrl.substring(videoUrl.lastIndexOf(".") + 1);

				str = '<video controls="controls" preload="auto" height="' + showHei + 'px" style="position:relative;top:-20px;left:0px;">' +
					'<source src="' + videoUrl + '" type="video/' + type + '" /></video>';
			};
			IM._msgId = nextMsg.attr('id');
			$("#carousels").empty();
			$("#carousels").append(str);
			if ($("#carousels").find("img")) {
				$("#carousels").find("img").css('max-height', (showHei - 30) + "px").css(
					'max-width', ($(window).width() - 50) + "px");
			}
		},
		/**
		 * 添加群组事件消息，只处理页面
		 * 
		 * @param obj:confirm 1拒绝 2同意  target 1讨论组 2群组
		 *            auditType (1申请加入群组，2邀请加入群组，3直接加入群组，4解散群组，5退出群组，6踢出群组，7确认申请加入，8确认邀请加入，
		 *                       9邀请加入群组的用户因本身群组个数超限加入失败(只发送给邀请者)10管理员修改群组信息，11用户修改群组成员名片12新增管理员变更通知)
		 * @constructor
		 */
		DO_notice_createMsgDiv: function(obj) {
			var you_sender = IM._serverNo;
			var groupId = obj.groupId;
			var name = 'System notification';
			var groupName = obj.groupName;
			var version = obj.msgId;
			var peopleId = obj.member;
			var people = (!!obj.memberName) ? obj.memberName : obj.member;
			var you_msgContent = '';
			var noticeContent = '';
			// 1,(1申请加入群组，2邀请加入群组，3直接加入群组，4解散群组，5退出群组，6踢出群组，7确认申请加入，8确认邀请加入，
			//9邀请加入群组的用户因本身群组个数超限加入失败(只发送给邀请者)10管理员修改群组信息，11用户修改群组成员名片12新增管理员变更通知)
			var auditType = obj.auditType;
			var groupTarget = (obj.target == 2) ? "group" : "discussion group";
			if (1 == auditType) {
				you_msgContent = '[' + people + ']Apply to join' + groupTarget + '[' + groupName + '] <span imtype="notice">{<a style="color: red; cursor: pointer;" onclick="IM.EV_confirmJoinGroup(\'' + you_sender + '\', \'' + version + '\', \'' + groupId + '\', \'' + peopleId + '\', 2)">Agree！</a>}{<a style="color: red; cursor: pointer;" onclick="IM.EV_confirmJoinGroup(\'' + you_sender + '\', \'' + version + '\', \'' + groupId + '\', \'' + peopleId + '\', 1)">refuse</a>}</span>';
				noticeContent = '[' + people + ']Apply to join' + groupTarget + '[' + groupName + '] ';
			} else if (2 == auditType) {
				if (1 == obj.confirm) {
					you_msgContent = '[' + groupName + ']Administrator invites you to join' + groupTarget;
					noticeContent = you_msgContent;
					// 在群组列表中添加群组项
					var current_contact_type = IM.HTML_find_contact_type();
					var isShow = false;
					if (IM._contact_type_g == current_contact_type) {
						isShow = true;
					}
					IM.HTML_addContactToList(groupId, groupName,
						IM._contact_type_g, false, isShow, false, null,
						null, null);
				} else {
					you_msgContent = '[' + groupName + ']The administrator invites you to join the group <span imtype="notice">{<a style="color: red; cursor: pointer;" onclick="IM.EV_confirmInviteJoinGroup(\'' + you_sender + '\', \'' + groupName + '\', \'' + version + '\', \'' + obj.admin + '\', \'' + groupId + '\', 2)">Agree！</a>}{<a style="color: red; cursor: pointer;" onclick="IM.EV_confirmInviteJoinGroup(\'' + you_sender + '\', \'' + groupName + '\', \'' + version + '\', \'' + obj.admin + '\', \'' + groupId + '\', 1)">refuse</a>}</span>';
					noticeContent = '[' + groupName + ']The administrator invites you to join the group;';
				}
			} else if (3 == auditType) {
				you_msgContent = '[' + people + ']Direct join group[' + groupName + ']';
				noticeContent = you_msgContent;
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, people);
			} else if (4 == auditType) {
				you_msgContent = 'The administrator has dissolved the group[' + groupName + ']';
				noticeContent = you_msgContent;
				// 将群组从列表中移除
				IM.HTML_remove_contact(groupId);
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, people);
			} else if (5 == auditType) {
				you_msgContent = '[' + people + ']Logout' + groupTarget + '[' + groupName + ']';
				noticeContent = you_msgContent;
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, people);
			} else if (6 == auditType) {
				you_msgContent = '[' + groupName + ']Administrator will[' + people + ']Kick out' + groupTarget;
				noticeContent = you_msgContent;
				// 将群组从列表中移除
				if (IM._user_account == people) {
					IM.HTML_remove_contact(groupId);
				}
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, people);
			} else if (7 == auditType) {
				you_msgContent = 'Administrator consent[' + people + ']Join group[' + groupName + ']Application for';
				noticeContent = you_msgContent;
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, people);
			} else if (8 == auditType) {
				if (2 != obj.confirm) {
					you_msgContent = '[' + people + ']Rejected the group[' + groupName + ']The invitation';
					noticeContent = you_msgContent;
				} else {
					you_msgContent = '[' + people + ']Agreed to the administrator's invitation，Join group[' + groupName + ']';
					noticeContent = you_msgContent;
					IM.DO_procesGroupNotice(auditType, groupId, peopleId,
						people);
				}
			} else if (10 == auditType) {
				people = (!!obj.adminName) ? obj.adminName : obj.admin;
				if (obj.target == 2) {
					you_msgContent = 'The administrator changed the group[' + groupName + ']information';
				} else {
					you_msgContent = 'user[' + people + ']Modified group[' + groupName + ']information';
				}
				noticeContent = you_msgContent;
				if (!!obj.groupName) {
					IM.HTML_addContactToList(groupId, obj.groupName,
						IM._contact_type_g, false, isShow, true, null,
						null, null);
				}
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, people, obj.groupName, obj.ext);
			} else if (11 == auditType) {
				you_msgContent = 'user[' + people + ']Modify group membership';
				noticeContent = you_msgContent;
				// TODO obj.memberName有值，意味着要修改展示的名字
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, obj.memberName, obj.groupName, obj.ext);
			} else if (12 == auditType) {
				you_msgContent = 'user[' + people + ']Become' + groupTarget + '[' + groupName + ']Administrators12';
				noticeContent = you_msgContent;
				IM.DO_procesGroupNotice(auditType, groupId, peopleId, obj.memberName, obj.groupName, obj.ext);
			} else if (13 == auditType) {
				var role;
				var ext = JSON.parse(obj.ext);
				switch (ext.role) {
					case "1":
						role = "The main group";
						break;
					case "2":
						role = "Administrators";
						break;
					case "3":
						role = "member";
						break;
					default:
						break;
				}
				you_msgContent = 'user[' + people + ']Become' + groupTarget + groupName + role;
				noticeContent = you_msgContent;
				IM.DO_procesGroupNotice(auditType, groupId, peopleId,
					obj.memberName, obj.groupName, obj.ext);
			} else {
				you_msgContent = 'Unknowntype[' + auditType + ']';
				noticeContent = you_msgContent;
			}
			// 添加左侧消息
			// 监听消息的联系人，是否是当前展示的联系人
			var b_current_contact_you = IM.DO_createMsgDiv_Help(you_sender, name, true);
			// 添加右侧消息
			IM.HTML_pushMsg_addHTML(1, you_sender, version, IM._contact_type_g,
				b_current_contact_you, groupName, you_msgContent);
			//桌面提醒通知
			IM.DO_deskNotice('', '', noticeContent, '', false, false);
		},
		/**
		 * 处理群组成员变更通知,只处理pop页面
		 * 
		 * @param type
		 *            通知类型 4解散群组，5退出群组，6踢出群组，7确认申请加入，8确认邀请加入
		 *            10管理员修改群组信息，11用户修改群组成员名片)
		 * @param groupId
		 *            群组id
		 * @param memberId
		 *            用户id
		 * @param memberName
		 *            用户名称
		 * @param groupName
		 *            群组名称
		 * @param ext
		 *            扩展字段
		 * @constructor
		 */
		DO_procesGroupNotice: function(type, groupId, memberId, memberName,
			groupName, ext) {
			if (!IM.DO_checkPopShow(groupId)) {
				return;
			}
			if (type == 4) {
				alert("The administrator dissolved the group！");
				IM.HTML_pop_hide();
			} else if (type == 5 || type == 6) {
				if (memberId == IM._user_account) {
					alert("You are moved out of the group by the administrator！");
					IM.HTML_pop_hide();
				} else {
					IM.HTML_popDeleteMember(memberId);
				}
			} else if (type == 7 || type == 8) {
				var obj = $('#pop').find('div[im_isowner]');
				var isowner = obj.attr('im_isowner');
				var target = obj.attr('im_target');
				IM.HTML_popAddMember(groupId, memberId, memberName, isowner,
					target);
			} else if (type == 10) {
				var obj = $('#pop').find('div[im_isowner]');
				var isowner = obj.attr('im_isowner');
				if (!!groupName) {
					IM.HTML_showGroupName(isowner, groupName);
				}
				if (!!ext) {
					var json = eval("(" + ext + ")");
					if (!!json["groupDeclared"]) {
						IM.HTML_showGroupDeclared(isowner,
							json["groupDeclared"]);
					}
				}
			} else if (type == 11) {
				IM.HTML_showMemberName(memberId, memberName);
			}
		},
		DO_checkPopShow: function(groupId) {
			if ($('#pop_group_' + groupId).length <= 0) {
				return false;
			}
			var display = $('#pop').css("display");
			if (display != 'block') {
				return false;
			}
			return true;
		},
		/**
		 * 删除联系人，包括左侧和右侧
		 * 
		 * @param id
		 * @constructor
		 */
		HTML_remove_contact: function(id) {
			// 删除左侧联系人列表
			$(document.getElementById('im_contact_' + id)).remove();
			// 删除右侧相应消息
			$('#im_content_list').find('div[content_you="' + id + '"]').each(
				function() {
					$(this).remove();
				});
		},
		/**
		 * 添加消息列表的辅助方法 消息的联系人(you_sender)，是否是当前展示的联系人
		 * 并处理左侧联系人列表的展示方式（新增条数，及提醒数字变化）
		 * 
		 * @param you_sender
		 * @param b_isGroupMsg --
		 *            true:group消息列表 false:点对点消息列表
		 * @returns {boolean} -- true:是当前展示的联系人；false:不是
		 * @constructor
		 */
		DO_createMsgDiv_Help: function(you_sender, name, b_isGroupMsg) {
			// 处理联系人列表，如果新联系人添加一条新的到im_contact_list，如果已经存在给出数字提示
			var b_current_contact_you = false; // push消息的联系人(you_sender)，是否是当前展示的联系人
			$('#im_contact_list').find('li').each(function() {
				if (you_sender == $(this).attr('contact_you')) {
					if ($(this).hasClass('active')) {
						b_current_contact_you = true;
					}
				}
			});
			// 新建时判断选中的contact_type是那个然后看是否需要显示
			var current_contact_type = IM.HTML_find_contact_type();
			var isShow = false;
			if (IM._contact_type_g == current_contact_type && b_isGroupMsg) {
				isShow = true;
			}
			if (IM._contact_type_c == current_contact_type && !b_isGroupMsg) {
				isShow = true;
			}
			IM.HTML_addContactToList(you_sender, name, (b_isGroupMsg) ? IM._contact_type_g : IM._contact_type_c, false, isShow, false, null, null, null);
			return b_current_contact_you;
		},
		/**
		 * 查找当前选中的contact_type值
		 * 
		 * @returns {*}
		 * @constructor
		 */
		HTML_find_contact_type: function() {
			// 在群组列表中添加群组项
			var current_contact_type = null;
			$('#im_contact_type').find('li').each(function() {
				if ($(this).hasClass('active')) {
					current_contact_type = $(this).attr('contact_type');
				}
			});
			return current_contact_type;
		},
		/**
		 * 样式，push监听到消息时添加右侧页面样式
		 * 
		 * @param msgtype --
		 *            消息类型1:文本消息 2：语音消息 3：视频消息 4：图片消息 5：位置消息 6：文件
		 * @param you_sender --
		 *            对方帐号：发出消息时对方帐号，接收消息时发送者帐号
		 * @param version --
		 *            消息版本号，本地发出时为long时间戳
		 * @param content_type --
		 *            C G or M
		 * @param b --
		 *            是否需要展示 true显示，false隐藏
		 * @param name --
		 *            显示对话框中消息发送者名字
		 * @param you_msgContent --
		 *            消息内容
		 * @constructor
		 */
		HTML_pushMsg_addHTML: function(msgtype, you_sender, version,
			content_type, b, name, you_msgContent, inforSender, isAtMsg) {
			var carou = '';
			if (msgtype == 4 || msgtype == 3) {
				carou = "real";
			};
			if (isAtMsg) {
				if (you_msgContent.indexOf('@' + IM._user_account) > -1) {
					you_msgContent = you_msgContent;
				}
			}
			if (inforSender != IM._user_account) {
				if (you_sender != IM._serverNo) {
					name = inforSender;
				}
				if (!inforSender || content_type.toUpperCase("G")) {
					inforSender = you_sender; //由于系统消息没有发送者，所以这里给定义为系统的发送者.群消息的发送者为群。
				}
				var str = '<div msg="msg" im_carousel="' + carou + '" im_msgtype="' + msgtype + '" id="' + inforSender + '_' + version + '" content_type="' + content_type + '" content_you="' + you_sender + '" class="alert alert-left alert-info" style="display:' + ((b) ? 'block' : 'none') + '">' + '<code style=";text-overflow:ellipsis;overflow: hidden;">' + name + ':</code>&nbsp;' + you_msgContent + '</div>';
			} else {
				name = inforSender;
				var str = '<div contactor="sender" im_carousel="' + carou + '" msg="msg" im_msgtype="' + msgtype + '" id="' + you_sender + '_' + version + '" content_type="' + content_type + '" content_you="' + you_sender + '" class="alert alert-right alert-success" style="display:' + ((b) ? 'block' : 'none') + '">' + '<span imtype="resend" class="add-on" onclick="IM.EV_resendMsg(this)"' + 'style="display:none;cursor:pointer; position: relative; left: -40px; top: 0px;"><i class="icon-repeat"></i></span>' + '<code class="pull-right" style=";text-overflow:ellipsis;overflow: hidden;">&nbsp;:' + name + '</code>' + you_msgContent + '</div>';
			}
			$('#im_content_list').append(str);
			if (you_msgContent.indexOf("fireMsg") > -1) { //fireMsg="yes"
				var id = you_sender + "_" + version;
				$(document.getElementById(id)).find("code").next().hide();
				var windowWid = $(window).width();
				var imgWid = 0;
				var imgHei = 0;
				if (windowWid < 666) {
					imgWid = 100;
					imgHei = 150;
				} else {
					imgWid = 150;
					imgHei = 200;
				};
				var fireMsgStr = '<img style="cursor:pointer;max-width:' + imgWid + 'px; max-height:' + imgHei + 'px; margin-right:5px; margin-left:5px;" ' +
					'src="assets/img/fireMessageImg.png" onclick="IM.DO_showFireMsg(\'' + id + '\',\'' + msgtype + '\')" />';
				$(document.getElementById(id)).append(fireMsgStr);
			}
			setTimeout(function() {
				$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			}, 100);
			// 右侧列表添加数字提醒
			// TODO 后期要添加提醒数字时，记得要先拿到旧值，再+1后写入新建的列表中
			var current_contact = $(document.getElementById('im_contact_' + you_sender));
			if (!current_contact.hasClass('active')) {
				var warn = current_contact.find('span[contact_style_type="warn"]');
				if ('99+' == warn.html()) {
					return;
				}
				var warnNum = parseInt((!!warn.html()) ? warn.html() : 0) + 1;
				if (warnNum > 99) {
					warn.html('99+');
				} else {
					warn.html(warnNum);
				}
				warn.show();
			}
			if (you_msgContent) $("#notice").html(""); //消息类型提示，发完消息接收方隐藏即可
		},
		HTML_pushCall_addHTML: function(you_sender, callId, you_msgContent) {
			// push消息的联系人，是否是当前展示的联系人
			var b = IM.DO_createMsgDiv_Help(you_sender, you_sender, false);
			var str = '<div msg="msg" id="' + you_sender + '_' + callId + '" content_you="' + you_sender + '" class="alert alert-left alert-info" style="display:' + ((b) ? 'block' : 'none') + '">' + '<code style=";text-overflow:ellipsis;overflow: hidden;">' + you_sender + ':</code>&nbsp;' + you_msgContent + '</div>';
			$('#im_content_list').append(str);
			setTimeout(function() {
				$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			}, 100);
			// 右侧列表添加数字提醒
			// TODO 后期要添加提醒数字时，记得要先拿到旧值，再+1后写入新建的列表中
			var current_contact = $(document.getElementById('im_contact_' + you_sender));
			if (!current_contact.hasClass('active')) {
				var warn = current_contact.find('span[contact_style_type="warn"]');
				if ('99+' == warn.html()) {
					return;
				}
				var warnNum = parseInt((!!warn.html()) ? warn.html() : 0) + 1;
				if (warnNum > 99) {
					warn.html('99+');
				} else {
					warn.html(warnNum);
				}
				warn.show();
			}
		},
		HTML_pushMsg_addPreHTML: function(msgtype, you_sender, version,
			content_type, b, name, you_msgContent) {
			var carou = '';
			if (msgtype == 4 || msgtype == 3) {
				carou = "real";
			};
			var str = '<div msg="msg" im_carousel="' + carou + '" im_msgtype="' + msgtype + '" id="' + you_sender + '_' + version + '" content_type="' + content_type + '" content_you="' + you_sender + '" class="alert alert-left alert-info" style="display:' + ((b) ? 'block' : 'none') + '">' + '<code style=";text-overflow:ellipsis;overflow: hidden;">' + name + ':</code>&nbsp;' + you_msgContent + '</div>';
			$('#im_content_list').prepend(str);
			setTimeout(function() {
				$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			}, 100);
			// 右侧列表添加数字提醒
			// TODO 后期要添加提醒数字时，记得要先拿到旧值，再+1后写入新建的列表中
			var current_contact = $(document.getElementById('im_contact_' + you_sender));
			if (!current_contact.hasClass('active')) {
				var warn = current_contact.find('span[contact_style_type="warn"]');
				if ('99+' == warn.html()) {
					return;
				}
				var warnNum = parseInt((!!warn.html()) ? warn.html() : 0) + 1;
				if (warnNum > 99) {
					warn.html('99+');
				} else {
					warn.html(warnNum);
				}
				warn.show();
			}
		},
		/**
		 * 样式，发送消息时添加右侧页面样式
		 * 
		 * @param msg --
		 *            是否为临时消息 msg、temp_msg;msg
		 *            右侧对话消息display为block；temp_msg用于发送本地文件；需要点击确定的时候resendMsg方法中修改属性为block
		 * @param msgtype --
		 *            消息类型1:文本消息 2：语音消息 3：视频消息 4：图片消息 5：位置消息 6：文件
		 * @param msgid --
		 *            消息版本号，本地发出时均采用时间戳long
		 * @param content_type --
		 *            C G or M
		 * @param content_you --
		 *            对方帐号：发出消息时对方帐号，接收消息时发送者帐号
		 * @param im_send_content --
		 *            消息内容
		 * @constructor
		 */
		HTML_sendMsg_addHTML: function(msg, msgtype, msgid, content_type, content_you, im_send_content) {
			im_send_content = emoji.replace_unified(im_send_content);
			var display = ('temp_msg' == msg) ? 'none' : 'block';
			var carou = '';
			if (msgtype == 4 || msgtype == 3) {
				carou = "real";
			};
			var str = '<div contactor="sender" im_carousel="' + carou + '" msg="msg" im_msgtype="' + msgtype + '" id="' + content_you + '_' + msgid + '" content_type="' + content_type + '" content_you="' + content_you + '" class="alert alert-right alert-success" style="display:' + display + '">' + '<span imtype="resend" class="add-on" onclick="IM.EV_resendMsg(this)"' + ' style="display:none; cursor:pointer; position: relative; left: -40px; top: 0px;"><i class="icon-repeat"></i></span>' + '<code class="pull-right" style=";text-overflow:ellipsis;overflow: hidden;">&nbsp;:' + IM._username + '</code>' + im_send_content + '</div>';
			$('#im_content_list').append(str);
			$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			return content_you + '_' + msgid;
		},
		HTML_sendMsg_addPreHTML: function(msg, msgtype, msgid, content_type, content_you, im_send_content) {
			if (!!im_send_content) {
				im_send_content = emoji.replace_unified(im_send_content);
			};
			var display = ('temp_msg' == msg) ? 'none' : 'block';
			var carou = '';
			if (msgtype == 4 || msgtype == 3) {
				carou = "real";
			};
			var str = '<div contactor="sender" im_carousel="' + carou + '" msg="msg" im_msgtype="' + msgtype + '" id="' + content_you + '_' + msgid + '" content_type="' + content_type + '" content_you="' + content_you + '" class="alert alert-right alert-success" style="display:' + display + '">' + '<span imtype="resend" class="add-on" onclick="IM.EV_resendMsg(this)"' + ' style="display:none; cursor:pointer; position: relative; left: -40px; top: 0px;"><i class="icon-repeat"></i></span>' + '<code class="pull-right" style=";text-overflow:ellipsis;overflow: hidden;">&nbsp;:' + IM._username + '</code>' + im_send_content + '</div>';
			$('#im_content_list').prepend(str);
			var hisStr = $("#getHistoryMsgDiv").prop('outerHTML');
			$("#getHistoryMsgDiv").remove();
			$('#im_content_list').prepend(hisStr);
			$('#im_send_content').html('');
			$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
			return content_you + '_' + msgid;
		},
		/**
		 * 选择联系人列表，并切换消息列表
		 * 
		 * @param contact_type
		 * @param contact_you
		 * @param isNew 是否是5.2.1之后的SDK
		 */
		DO_chooseContactList: function(contact_type, contact_you, isNewUserState) {
			newUserState = isNewUserState ? isNewUserState : false;
			IM.HTML_clean_im_contact_list();
			$("#fireMessage").removeClass("active");
			var current_contact = document.getElementById("im_contact_" + contact_you);
			$(current_contact).addClass('active');
			var warn = $(current_contact).find('span[contact_style_type="warn"]');
			warn.hide();
			warn.html(0);
			/* 暂时屏蔽历史消息功能
               $("#getHistoryMsgDiv").html('<a href="#" onclick="IM.DO_getHistoryMessage();" style="font-size: small;position: relative;top: -30px;">查看更多消息</a>');
            $("#getHistoryMsgDiv").show();
          */
			IM.HTML_clean_im_content_list(contact_you);

			//显示用户的状态
			if (IM._contact_type_c == contact_type) {
				$("#fireMessage").show();
				$("#voipInvite").show();
				$("#voiceInvite").show();
				$("#luodi").show();
				contact_you = contact_you.split(","); //专为数组传入
				IM.EV_getUserState(contact_you,newUserState); //这里需要见一个额开发任务获取用户状态的返回参数变了；由单个{}对象变成[{},...]这种数组对象了
			} else if (IM._contact_type_g == contact_type) {
				$("#fireMessage").hide();
				$("#voipInvite").hide();
				$("#voiceInvite").hide();
				$("#luodi").hide();
			}
			// 如果当前选择的是客服列表直接发起咨询
			if (IM._contact_type_m == contact_type) {
				IM.EV_startMcmMsg(contact_you);
				IM._isMcm_active = true;
			} else {
				if (IM._isMcm_active) {
					IM.EV_stopMcmMsg(contact_you);
				}
			}
		},
		EV_getUserState: function(contact_you,isNew) {
			var current_contact = document.getElementById("im_contact_" + contact_you);
			var getUserStateBuilder = new RL_YTX.GetUserStateBuilder();
			getUserStateBuilder.setNewUserstate(isNew);
			getUserStateBuilder.setUseracc(contact_you);
			var onlineState = $(current_contact).find('span[contact_style_type="onlineState"]');
			RL_YTX.getUserState(getUserStateBuilder, function(obj) {
				if (obj[0].state == 1) { //1On-line 2Off-line
					onlineState.html("On-line");
					onlineState.show();
					onlineState.css("background-color", "blue");
				} else if (obj[0].state == 2) {
					onlineState.html("Off-line");
					onlineState.show();
				} else {
					alert("Error code：" + obj[0].state + "; Error description：Acquired user status is invalid")
				}
			}, function(obj) {
				if (174006 != obj.code) {
					console.log("Error code：" + obj.code + "; Error description：" + obj.msg)

				}
			});
		},
		/**
		 * 清理右侧消息列表
		 * 
		 * @param contact_you --
		 *            左侧联系人列表中的
		 */
		HTML_clean_im_content_list: function(contact_you) {
			$('#im_content_list').find('div[msg="msg"]').each(function() {
				if ($(this).attr('content_you') == contact_you) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			$('#im_content_list').scrollTop($('#im_content_list')[0].scrollHeight);
		},
		/**
		 * 清理联系人列表样式
		 */
		HTML_clean_im_contact_list: function() {
			// 清除选中状态class
			$('#im_contact_list').find('li').each(function() {
				$(this).removeClass('active');
			});
		},
		/**
		 * 添加联系人到列表中
		 */
		DO_addContactToList: function() {
			var contactVal = $('#im_add').find('input[imtype="im_add_contact"]').val();
			if (!IM.DO_checkContact(contactVal)) { //校验联系人格式
				return;
			}
			var im_contact = $('#im_contact_list').find('li[contact_type="' + IM._contact_type_c + '"][contact_you="' + contactVal + '"]');
			if (im_contact.length <= 0) {
				IM.HTML_clean_im_contact_list(); //清除原来选中的li
				IM.HTML_addContactToList(contactVal, contactVal, IM._contact_type_c, true, true, false, null, null, null);
			}
			$('#im_add').find('input[imtype="im_add_contact"]').val('');
		},
		/**
		 * 检查联系名称规则是否合法
		 * 
		 * @param contactVal
		 * @returns {boolean}
		 * @constructor
		 */
		DO_checkContact: function(contactVal) { //zyhcontact
			if (!contactVal) {
				IM.HTML_showAlert('alert-warning', 'Please input contact');
				return false;
			} else if (contactVal.length > 64) {
				IM.HTML_showAlert('alert-error', 'Contact length should not exceed64');
				return false;
			}
			if ('g' == contactVal.substr(0, 1)) {
				IM.HTML_showAlert('alert-error', 'Contact cannot be"g"start');
				return false;
			}
			if (contactVal.indexOf("@") > -1) {
				var regx2 = /^([a-zA-Z0-9]{32}#)?[a-zA-Z0-9_-]{1,}@(([a-zA-z0-9]-*){1,}.){1,3}[a-zA-z-]{1,}$/;
				if (regx2.exec(contactVal) == null) {
					IM.HTML_showAlert('alert-error',
						'Check mailbox format、If it is cross application and then check the applicationIdWhether the length is32And consists of numbers or letters.）');
					return false;
				}
			} else {
				var regx1 = /^[A-Za-z0-9._-]+$/; // /^[a-zA-Z\u4e00-\u9fa5]+$/满足大小写字母数字和ascii码值;
				if (regx1.exec(contactVal) == null) {
					IM.HTML_showAlert('alert-error',
						'Only numbers, letters and underlined allowed');
					return false;
				}
			}
			return true;
		},
		/**
		 * 添加群组
		 * 
		 * @param permission
		 * @constructor
		 */
		DO_addGroupToList: function(permission, target) {
			var groupName = $('#im_add').find('input[imtype="im_add_group"]').val();
			if (!groupName) {
				IM.HTML_showAlert('alert-error', 'Please input group name，Used to create groups');
				return;
			} else if (groupName.trim() == "") {
				IM.HTML_showAlert('alert-error', 'Please input a valid group name');
				return;
			} else { //校验群组名称的合法性
				var regx1 = /^[\\x00-\\x7F\a-zA-Z\u4e00-\u9fa5_-]{0,50}$/;
				if (regx1.exec(groupName) == null) {
					alert("Group name only allowed in English and Chinese@_-,Length is shorter than50")
					return;
				}
				if (groupName.substring(0, 1) == "g" || groupName.substring(0, 1) == "G") {
					alert("Group name cannot begorGStart")
					return;
				}
				if (groupName.indexOf("@") > -1) {
					alert("Group name cannot contain@Symbol")
					return;
				}
			}
			IM.DO_html_create(groupName, permission, target);
			$('#im_add').find('input[imtype="im_add_group"]').val('');
		},
		/**
		 * 样式，添加左侧联系人列表项
		 * 
		 * @param contactVal
		 * @param contact_type
		 * @param b
		 *            true--class:active false--class:null
		 * @param bb
		 *            true--display:block false--display:none
		 * @param bbb
		 *            true--需要改名字 false--不需要改名字
		 * @param owner --
		 *            当前群组创建者（只有content_type==G时才有值）
		 * @param isNotice --
		 *            是否提醒 1：提醒；2：不提醒(只有content_type==G时才有值)
		 * @param target --
		 *            1表示讨论组 2表示群组
		 * @constructor
		 */
		HTML_addContactToList: function(contactVal, contactName, content_type,
			b, bb, bbb, owner, isNotice, target) {
		},
		/**
		 * 选择群组管理事件，群组列表后面的扳手
		 * 
		 * @param groupId
		 * @param owner
		 * @param target
		 *            1 讨论组 2 群组
		 * @constructor
		 */
		DO_groupMenu: function(groupId, owner, target) { // 依据推送生成的左侧列表只有groupIdparameter
			var isowner = false;
			if (IM._user_account == owner) { // 自己创建的群组
				isowner = true;
			};
			if (target == null) { // 推送创建的页面参数没有target
				IM.EV_getGroupDetail(groupId, isowner, target);
			} else {
				// 构建页面
				IM.DO_pop_show(groupId, isowner, target);
				// 调用SDK方法获取数据
				// 获取群组详情
				IM.EV_getGroupDetail(groupId, isowner, target);
			}
		},
		/**
		 * 初始化讨论组弹窗
		 */
		DO_html_create: function(groupName, permission, target) {
			var str = '<div class="modal" style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="IM.HTML_pop_hide();">×</button>';
			if (target == 1) {
				str += '<h3>discussion group：';
			} else {
				str += '<h3>group：';
			}
			str += groupName + '</h3></div>' + '<div class="modal-body">' + '<table class="table table-bordered">' + '<tr>' + '<td>' + '<div style="height:auto; padding-bottom: 0px;">' + '<table imtype="im_pop_members_add" class="table table-striped">';
			if (target == 1) {
				str += '<tr>' + '<td>' + '<span class="pull-left" style="width: 25%;"><a href="javascript:void(0);" class="btn" style="font-size: 20px;" onclick="IM.HTML_showInviteArea(this)" >+</a></span>' + '<span class="pull-left" style="width: 25%; display: none;">' + '<span>Invitation :</span>' + '</span>' + '<span class="pull-right" style="width: 75%; display: none;">' + '<textarea class="pull-left" id="pop_invite_area" style="width:95%;" rows=3 placeholder="Please inputInvitation用户账号，Use English comma\“,”\Separate，' + '最多Invitation50individual"></textarea>' + '</span>' + '</td>' + '</tr>';
			} else {
				str += '<tr>' + '<td>' + '<div style="height:auto">' + '<div style="height:auto;padding-bottom:30px">' + '<span style="float:left">classification ：</span>' + '<div style="margin-left:90px;height:auto">' + '<div style="height:auto;min-width: 122px;float:left">' + '<input type="radio" name="groupType" value="1">&nbsp;&nbsp;&nbsp;Classmate' + '</div>' + '<div style="height:auto;min-width: 122px;float:left">' + '<input type="radio" name="groupType" value="2">&nbsp;&nbsp;&nbsp;Friend' + '</div>' + '<div style="height:auto;min-width: 122px;float:left">' + '<input type="radio" name="groupType" value="3">&nbsp;&nbsp;&nbsp;Colleague' + '</div>' + '</div>' + '</div>' + '<div style="height:auto;padding-bottom:5px;padding-top:10px;clear:both">' + '<span style="float:left;margin-top: 10px;">region ：</span>' + '<div style="margin-left:90px;height:auto;padding:0px">' + '<div style="height:auto;padding-top:5px;min-width:122px;float:left">' + '<span style="position:relative;top:-5px">province：</span><select id="province" size=1 onchange="IM.DO_getCity()" style="width:auto">' + '<option value=-1>--</option>' + '<option value=0>beijing</option>' + '<option value=1>shanghai</option>' + '<option value=2>tianjin</option>' + '<option value=3>chongqing</option>' + '<option value=4>hebei</option>' + '<option value=5>shanxi</option>' + '<option value=6>innermongolia</option>' + '<option value=7>liaoning</option>' + '<option value=8>jilin</option>' + '<option value=9>heilongjiang</option>' + '<option value=10>jiangsu</option>' + '<option value=11>zhejiang</option>' + '<option value=12>anhui</option>' + '<option value=13>fujian</option>' + '<option value=14>jiangxi</option>' + '<option value=15>shandong</option>' + '<option value=16>henan</option>' + '<option value=17>hubei</option>' + '<option value=18>hunan</option>' + '<option value=19>guangdong</option>' + '<option value=20>guangxi</option>' + '<option value=21>hainan</option>' + '<option value=22>sichuan</option>' + '<option value=23>guizhou</option>' + '<option value=24>yunnan</option>' + '<option value=25>tibet</option>' + '<option value=26>shaanxi</option>' + '<option value=27>gansu</option>' + '<option value=28>ningxia</option>' + '<option value=29>qinghai</option>' + '<option value=30>xinjiang</option>' + '<option value=31>hongkong</option>' + '<option value=32>macau</option>' + '<option value=33>taiwan</option>' + '</select>' + '</div>' + '<div style="height:auto;padding-top:5px;min-width:122px;float:left">' //如果屏幕过小的时候就分成两列 
					+ '<span style="position:relative;top:-5px">city：</span><select id="city" style="width:auto">' + '<option value=-1>--</option>' + '</select>' + '</div>' + '</div>' + '</div>' + '<div style="height:auto;padding-top:10px;clear:both">' + '<span style="float:left;margin-top: 10px;">Group description ：</span>' + '<div style="height:auto;margin-left:90px;padding-top:10px">' + '<textarea id="createDeclare" class="pull-left" style="width:95%"></textarea>' + '</div>' + '</div>' + '</div>' + '</td></tr>';
			}
			str += '</table></div></td></tr></table></div>' + '<div class="modal-footer">' + '<button href="#" id= "createGroup_bt" class="btn btn-primary" onclick="IM.EV_createGroup(\'' + groupName + '\',' + permission + ',' + target + ')" > Confirmed </button>' + '<a href="javascript:void(0);" class="btn" onclick="IM.HTML_pop_hide()">cancel</a>' + '</div>' + '</div>';
			$('#pop').find('div[class="row"]').html(str);
			IM.HTML_pop_show();
			if (!!navigator.userAgent.match(/mobile/i) || $(window).width() < 600) { //浏览器兼容
				$("#city").parent().css("float", "none");
			}
		},
		DO_getCity: function() {
			var arr = new Array();
			arr[0] = "dongcheng,xicheng,Chongwen,Xuanwu,chaoyang,fengtai,shijingshan,haidian,mentougou,fangshan,tongzhou,shunyi,changping,daxing,pinggu,huairou,miyun,yanqing"
			arr[1] = "huangpu,Luwan,xuhui,changning,jing`an,putuo,zhabei,hongkou,yangpu,minhang,baoshan,jiading,pudong,jinshan,songjiang,qingpu,Nanhui,fengxian,chongming"
			arr[2] = "heping,dongli,hedong,xiqing,hexi,jinnan,nankai,beichen,hebei,wuqing,Red Bridge,Tanggu,Hangu,Dagang,ninghe,jinghai,baodi,jixian"
			arr[3] = "wanzhou,fuling,yuzhong,dadukou,jiangbei,shapingba,jiulongpo,nan`an,beibei,Maxell,Double bridge,yubei,banan,qianjiang,changshou,qijiang,tongnan,tongliang,dazu,rongchang,Bishan,liangping,chengkou,fengdu,dianjiang,wulong,zhongxian,kaixian,yunyang,fengjie,wushan,wuxi,shizhu,xiushan,youyang,pengshui,jiangjin,hechuan,yongchuan,nanchuan"
			arr[4] = "shijiazhuang,handan,xingtai,baoding,zhangjiakou,chengde,langfang,tangshan,qinhuangdao,cangzhou,hengshui"
			arr[5] = "taiyuan,datong,yangquan,changzhi,jincheng,shuozhou,lvliang,xinzhou,jinzhong,linfen,yuncheng"
			arr[6] = "hohhot,baotou,wuhai,chifeng,Hulun Buir Union,alxa,Zhelimumeng,hinggan,Wulanchabu Union,xilingol,Bayannaoer Union,Yikezhaomeng"
			arr[7] = "shenyang,dalian,anshan,fushun,benxi,dandong,jinzhou,yingkou,fuxin,liaoyang,panjin,tieling,chaoyang,huludao"
			arr[8] = "changchun,jilin,siping,liaoyuan,tonghua,baishan,songyuan,baicheng,yanbian"
			arr[9] = "harbin,qiqihar,mudanjiang,jiamusi,daqing,suihua,hegang,jixi,heihe,shuangyashan,yichun,qitaihe,daxinganling"
			arr[10] = "nanjing,zhenjiang,suzhou,nantong,yangzhou,yancheng,xuzhou,lianyungang,changzhou,wuxi,suqian,taizhou,huai`an"
			arr[11] = "hangzhou,ningbo,wenzhou,jiaxing,huzhou,shaoxing,jinhua,quzhou,zhoushan,taizhou,lishui"
			arr[12] = "hefei,wuhu,bengbu,ma`anshan,huaibei,tongling,anqing,huangshan,chuzhou,suzhou,chizhou,huainan,chaohu,fuyang,lu`an,xuancheng,bozhou"
			arr[13] = "fuzhou,xiamen,putian,sanming,quanzhou,zhangzhou,nanping,longyan,ningde"
			arr[14] = "nanchang,jingdezhen,jiujiang,yingtan,pingxiang,New balance,ganzhou,ji`an,yichun,fuzhou,shangrao"
			arr[15] = "jinan,qingdao,zibo,zaozhuang,dongying,yantai,weifang,jining,tai`an,weihai,rizhao,laiwu,linyi,dezhou,liaocheng,binzhou,heze"
			arr[16] = "zhengzhou,kaifeng,luoyang,pingdingshan,anyang,hebi,xinxiang,jiaozuo,puyang,xuchang,luohe,sanmenxia,nanyang,shangqiu,xinyang,zhoukou,zhumadian,jiyuan"
			arr[17] = "wuhan,yichang,jingzhou,Xiangfan,huangshi,jingmen,huanggang,shiyan,enshi,qianjiang,tianmen,xiantao,suizhou,xianning,xiaogan,ezhou"
			arr[18] = "changsha,changde,zhuzhou,xiangtan,hengyang,yueyang,shaoyang,yiyang,loudi,huaihua,chenzhou,yongzhou,xiangxi,zhangjiajie"
			arr[19] = "guangzhou,shenzhen,zhuhai,shantou,dongguan,zhongshan,foshan,shaoguan,jiangmen,zhanjiang,maoming,zhaoqing,huizhou,meizhou,shanwei,heyuan,yangjiang,qingyuan,chaozhou,jieyang,yunfu"
			arr[20] = "nanning,liuzhou,guilin,wuzhou,beihai,fangchenggang,qinzhou,guigang,yulin,nanningregion,liuzhouregion,hezhou,baise,hechi"
			arr[21] = "haikou,sanya"
			arr[22] = "chengdu,mianyang,deyang,zigong,panzhihua,guangyuan,neijiang,leshan,nanchong,yibin,guang`an,dachuan,ya`an,meishan,garze,liangshan,luzhou"
			arr[23] = "guiyang,liupanshui,zunyi,anshun,tongren,qianxinan,bijie,qiandongnan,qiannan"
			arr[24] = "kunming,dali,qujing,yuxi,zhaotong,chuxiong,honghe,wenshan,simao,xishuangbanna,baoshan,dehong,lijiang,nujiang,deqen,lincang"
			arr[25] = "lhasa,rikaze,shannan,nyingchi,qamdo,ngari,naqu"
			arr[26] = "xi`an,baoji,xianyang,tongchuan,weinan,yan`an,yulin,hanzhong,ankang,shangluo"
			arr[27] = "lanzhou,jiayuguan,jinchang,baiyin,tianshui,jiuquan,zhangye,wuwei,dingxi,longnan,pingliang,qingyang,linxia,gannan"
			arr[28] = "yinchuan,shizuishan,wuzhong,guyuan"
			arr[29] = "xining,haidong,hainan,haibei,huangnan,yushu,golog,haixi"
			arr[30] = "wulumuqi,shihezi,kelamayi,ili,Bayangol,changji,Kirgiz,Bo Ertala,turpan,hami,kashi,hotan,aksu"
			arr[31] = "hongkong"
			arr[32] = "macau"
			arr[33] = "taipei,kaohsiung,taichung,tainan,pingtung,nantou,yunlin,hsinchu,changhua,miaoli,chiayi,hualien,taoyuan,yilan,keelung,taitung,jinmen,Matsu,penghu"
			var pro = document.getElementById("province");
			var city = document.getElementById("city");
			var index = pro.selectedIndex - 1;
			var cityArr = arr[index].split(",");
			city.length = 0;
			//将城市数组中的值填充到城市下拉框中
			for (var i = 0; i < cityArr.length; i++) {
				city[i] = new Option(cityArr[i], cityArr[i]);
			}
		},
		/**
		 * 展现群组名称
		 * 
		 * @param isowner
		 * @param groupName
		 * @constructor
		 */
		HTML_showGroupName: function(isowner, groupName) {
			var str = '';
			if (isowner && isowner == 'true') {
				str = '<input type="text" class="pull-right" style="width:95%;" value="' + groupName + '"/>';
			} else {
				str = '<span class="pull-right" maxlength="128">' + groupName + '</span>';
			}
			$('#pop').find('div[imtype="im_pop_group_name"]').html(str);
		},
		/**
		 * 展现群组公告
		 * 
		 * @param isowner
		 * @param groupDeclared
		 * @constructor
		 */
		HTML_showGroupDeclared: function(isowner, groupDeclared) {
			var str = '';
			if (isowner && isowner == 'true') {
				str = '<textarea class="pull-right" rows="5" style="width:95%;">' + groupDeclared + '</textarea>';
			} else {
				str = '<span class="pull-right" maxlength="128">' + groupDeclared + '</span>';
			}
			$('#pop').find('span[imtype="im_pop_group_declared"]').html(str);
		},
		/**
		 * 样式，展现邀请域
		 * 
		 * @constructor
		 */
		HTML_showInviteArea: function(obj) {

			$(obj).parent().next().show();
			$(obj).parent().next().next().show();
			$(obj).parent().hide();
		},
		/**
		 * 样式，隐藏邀请域
		 * 
		 * @constructor
		 */
		HTML_hideInviteArea: function() {
			var tab = $('#pop').find('table[imtype="im_pop_members_add"]');
			var tdObj = tab.children().children().next().children();
			tdObj.children().show();
			tdObj.children().next().hide();
			tdObj.children().next().next().hide();
		},
		/**
		 * 处理群组成员列表展现
		 * 
		 * @param obj
		 *            member.member;//成员id member.nickName;//昵称
		 *            member.speakState;//禁言状态 1:不禁言 2:禁言 member.role;//角色 1:创建者
		 *            2:管理员 3：成员 member.sex;//性别 1:男 2：女
		 * @param isowner
		 * @param groupId
		 * @param target
		 *            1 讨论组 2 群组
		 * @constructor
		 */
		DO_pop_show_help_GroupMemberList: function(obj, groupId, target) {
			function compare(propertyName) {
				return function(object1, object2) {
					var value1 = object1[propertyName];
					var value2 = object2[propertyName];
					if (value2 < value1) {
						return -1;
					} else if (value2 > value1) {
						return 1;
					} else {
						return 0;
					}
				}
			}
			obj.sort(compare("role")).reverse();
			var str = '<tr><td style="padding:0 0 0 0;"></td></tr>';
			var isowner = false;
			var isadmin = false;
			for (var i in obj) {
				var member = obj[i];
				if (!member.member) {
					continue;
				}
				if (!member.nickName) {
					member.nickName = member.member;
				}
				if (member.role == 1) { // 判断是否是群主
					if (member.member == IM._user_account) { //判断是当前对象
						isowner = true;
					}
					if(target == 1){
						str += '<tr contact_you="' + member.member + '">' + '<td><span class="pull-left"><span style="color: #b94a48" data-role="1">[Administrators]</span>&nbsp;&nbsp;' + '<a href="javascript:void(0);" onclick="IM.DO_editNickName(this)" ' + ' style="word-break:keep-all;text-overflow:ellipsis;overflow: hidden;text-decoration:none;display: inline-block;width: 189px;vertical-align: bottom;">' + member.nickName + '</a><input style="display:none;padding:0px;margin-bottom:0px" type="text" onblur="IM.DO_checkNick(this);" /></span></td>' + '</tr>';
					}else{
						str += '<tr contact_you="' + member.member + '">' + '<td><span class="pull-left"><span style="color: #b94a48" data-role="1">[The main group]</span>&nbsp;&nbsp;' + '<a href="javascript:void(0);" onclick="IM.DO_editNickName(this)" ' + ' style="word-break:keep-all;text-overflow:ellipsis;overflow: hidden;text-decoration:none;display: inline-block;width: 189px;vertical-align: bottom;">' + member.nickName + '</a><input style="display:none;padding:0px;margin-bottom:0px" type="text" onblur="IM.DO_checkNick(this);" /></span></td>' + '</tr>';	
					}
					
				} else if (member.role == 2) { //如果是管理员
					if (member.member == IM._user_account) { //判断是当前对象
						isadmin = true;
					}
					str += '<tr contact_you="' + member.member + '">' + '<td><span class="pull-left"><span style="color: #b94a48" data-role="2">[Administrators]</span>&nbsp;&nbsp;' + '<a href="javascript:void(0);" onclick="IM.DO_editNickName(this)" ' + ' style="word-break:keep-all;text-overflow:ellipsis;overflow: hidden;text-decoration:none;display: inline-block;width: 189px;vertical-align: bottom;">' + member.nickName + '</a><input style="display:none;padding:0px;margin-bottom:0px" type="text" onblur="IM.DO_checkNick(this);" /></span>';
					if (isowner) {
						str += '<span class="pull-right label label-warning" onclick="IM.EV_deleteGroupMember(\'' + groupId + '\',\'' + member.member + '\')"> Kick out </span>';
						// 禁言状态 1:不禁言 2:禁言
						if (target == 2) {
							if (member.speakState == 2) {
								str += '<span class="pull-right label label-success" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + member.member + '\',1)"> recovery </span>';
							} else {
								str += '<span class="pull-right label label-important" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + member.member + '\',2)"> Gag </span>'
							}
							if (!isadmin) {
								str += '<span class="pull-right label label-important" onclick="IM.EV_GroupMemberRole(\'' + groupId + '\',\'' + member.member + '\',3)"> Cancel administrator qualification </span>'
								str += '<span class="pull-right label label-important" onclick="IM.EV_GroupMemberRole(\'' + groupId + '\',\'' + member.member + '\',1)"> Transfer the possession of </span>'
							}
						}
					} else {
						// 禁言状态 1:不禁言 2:禁言
						if (member.speakState == 2) {
							str += '<span class="pull-right label label-inverse" style="cursor: default;"> Banned </span>'
						}
					}
					str += '</td>' + '</tr>';
				} else {
					str += '<tr contact_you="' + member.member + '">' + '<td>' + '<span class="pull-left"><span style="color: #006dcc" data-role="3">[member]</span>&nbsp;&nbsp;' + '<a href="javascript:void(0);"  onclick="IM.DO_editNickName(this)" ' + 'style="word-break:keep-all;text-overflow:ellipsis;overflow: hidden;text-decoration:none;display: inline-block;width: 189px;vertical-align: bottom;">' + member.nickName + '</a><input style="display:none;padding:0px;margin-bottom:0px" type="text" onblur="IM.DO_checkNick(this);" /></span>';
					if (isowner || isadmin) {
						str += '<span class="pull-right label label-warning" onclick="IM.EV_deleteGroupMember(\'' + groupId + '\',\'' + member.member + '\')"> Kick out </span>';
						// 禁言状态 1:不禁言 2:禁言
						if (target == 2) {
							if (member.speakState == 2) {
								str += '<span class="pull-right label label-success" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + member.member + '\',1)"> recovery </span>';
							} else {
								str += '<span class="pull-right label label-important" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + member.member + '\',2)"> Gag </span>'
							}
							if (isowner) {
								str += '<span class="pull-right label label-success" onclick="IM.EV_GroupMemberRole(\'' + groupId + '\',\'' + member.member + '\',2)"> Set as Administrator </span>';
								str += '<span class="pull-right label label-important" onclick="IM.EV_GroupMemberRole(\'' + groupId + '\',\'' + member.member + '\',1)"> Transfer the possession of </span>'
							}
						}
					}
					else {
						// 禁言状态 1:不禁言 2:禁言
						if (member.speakState == 2) {
							str += '<span class="pull-right label label-inverse" style="cursor: default;"> Banned </span>'
						}
					}
					str += '</td>' + '</tr>';
				}
			}
			$('#pop').find('table[imtype="im_pop_members"]').html(str);
		},
		HTML_showMemberName: function(memberId, memberName) {
			var trobj = $('#pop').find('tr[contact_you="' + memberId + '"]');
			var nameSpan = trobj.children().children().children().next();
			nameSpan.html(memberName);
		},
		/**
		 * 样式，删除群组成员
		 * 
		 * @param memberId
		 * @constructor
		 */
		HTML_popDeleteMember: function(memberId) {
			var trobj = $('#pop').find('tr[contact_you="' + memberId + '"]');
			trobj.remove();
		},
		/**
		 * 样式，新增群组成员
		 * 
		 * @param groupId
		 * @param memberId
		 * @param memberName
		 * @param isowner
		 * @param permission
		 * @constructor
		 */
		HTML_popAddMember: function(groupId, memberId, memberName, isowner,
			target) {
			if ($('#pop').find('tr[contact_you=' + memberId + ']').length > 0) {
				return;
			}
			var str = '<tr contact_you="' + memberId + '">' + '<td>' + '<span class="pull-left"><span style="color: #006dcc">[member]</span>&nbsp;&nbsp;' + '<a href="javascript:void(0);"  onclick="IM.DO_editNickName(this)" ' + 'style="word-break:keep-all;text-overflow:ellipsis;overflow: hidden;text-decoration:none;display: inline-block;width: 189px;vertical-align: bottom;">' + memberName + '</a><input style="display:none;padding:0px;margin-bottom:0px" type="text" onblur="IM.DO_checkNick(this);" /></span>';
			if (isowner && isowner == 'true') {
				str += '<span class="pull-right label label-warning" onclick="IM.EV_deleteGroupMember(\'' + groupId + '\',\'' + memberId + '\')"> Kick out </span>';
				if (target == 2) {
					str += '<span class="pull-right label label-important" onclick="IM.EV_forbidMemberSpeak(\'' + groupId + '\',\'' + memberId + '\',2)"> Gag </span>';
				};

			};
			str += '</td>' + '</tr>';
			$('#pop').find('table[imtype="im_pop_members"]').append(str);
		},
		DO_editNickName: function(obj) {
			$(obj).hide();
			$(obj).next().show();
			$(obj).next().focus();
		},
		_modifyName: function(obj) {
			var memberId = $(obj).parent().parent().parent().attr("contact_you");
			var nick = $(obj).prev().text();
			var belong = $("#pop").find("h3").text();
			var belongIndex = belong.indexOf("：") + 1;
			belong = belong.substring(belongIndex);
			var modifyMemberCardBuilder = new RL_YTX.ModifyMemberCardBuilder();
			modifyMemberCardBuilder.setMember(memberId);
			modifyMemberCardBuilder.setBelong(belong);
			modifyMemberCardBuilder.setDisplay(nick);
			RL_YTX.modifyMemberCard(modifyMemberCardBuilder, function(obj) { //member belong
				console.log("Modify group membership card success！");
			}, function(obj) {
				console.log("Failed to modify group membership！");
			})
		},
		DO_checkNick: function(obj) {
			var nick = $(obj).val();
			if ('' == nick.trim()) {
				$(obj).prev().show();
				$(obj).hide();
				return;
			} else {
				if (nick == null) {
					alert("Nickname cannot be empty");
					return;
				} else {
					$(obj).prev().text(nick);
				}
				$(obj).prev().show();
				$(obj).hide();
				$(obj).val("");
			};
			IM._modifyName(obj);
		},
		/**
		 * 群组详情页面数据处理
		 * 
		 * @param groupId
		 * @param owner
		 * @target 1 讨论组 2 群组
		 * @constructor
		 */
		DO_pop_show: function(groupId, isowner, target) {
			// 弹窗展示
			var str = '<div class="modal" id="pop_group_' + groupId + '" style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;">' + '<div class="modal-header" im_isowner="' + isowner + '" im_target="' + target + '">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="IM.HTML_pop_hide();">×</button>';
			if (target == 1) {
				str += '<h3>discussion groupId：' + groupId + '</h3>';
			}
			if (target == 2) {
				str += '<h3>groupId：' + groupId + '</h3>';
			}
			str += '</div>' + '<div class="modal-body">' + '<table class="table table-bordered">' + '<tr>' + '<td>' + '<div style="height:150px;overflow-y:auto;">' + '<table imtype="im_pop_members" class="table table-striped">' + '</table>' + '</div>' + '<div style="height:auto; padding-bottom: 0px;">' + '<table imtype="im_pop_members_add" style="display:none;" class="table table-striped">' + '</table>' + '</div>' + '<a href="javascript:void(0);" class="btn pull-right" style="margin-left:10px;" onclick="IM.DO_cleanChatHis(\'' + groupId + '\')">Clear chat history</a>' + '</td>' + '</tr>' + '<tr>' + '<td>' + '<span class="pull-left">Message without interruption：</span>' + '<span class="pull-right" imtype="im_pop_group_notice">'
				//+ '<a href="javascript:void(0);" class="btn btn-primary" style="margin-left:10px;">开启</a>'
				//+ '<a href="javascript:void(0);" class="btn" style="margin-left:10px;">关闭</a>'
				+ '</span>' + '</td>' + '</tr>';
			str += '<tr><td>';
			if (target == 2) {
				str += '<div class="pull-left" style="width: 25%;">Group name：</div>';
			}
			if (target == 1) {
				str += '<div class="pull-left" style="width: 25%;">Group name：</div>';
			}
			str += '<div class="pull-right" style="width: 75%;" imtype="im_pop_group_name">' + '<input class="pull-right" type="text" style="width:95%;" />' + '</div>' + '</td>' + '</tr>' + '<tr>' + '<td>' + '<span class="pull-left" style="width: 25%;">Notice：</span>' + '<span class="pull-right" style="width: 75%;" imtype="im_pop_group_declared">' + '<textarea class="pull-left" rows="3" style="width:95%;"></textarea>' + '</span>' + '</td>' + '</tr>' + '</table>';
			if (target == 2) {
				str += '</div><div class="modal-footer">' + '<button class="btn btn-primary" type="button" onclick="IM.EV_quitGroup(\'' + groupId + '\',' + isowner + ')"> Exit group </button>'
				if (isowner) {
					str += '<a href="javascript:void(0);" class="btn" onclick="IM.EV_dismissGroup(\'' + groupId + '\')"> ungroup </a>' + '<a href="javascript:void(0);" class="btn btn-primary" onclick="IM.EV_updateGroupInfo(\'' + groupId + '\')">Save changes</a>';
				}
				str += '</div>';
			}
			if (target == 1) {
				str += '</div><div class="modal-footer">' + '<a href="javascript:void(0);" class="btn" onclick="IM.EV_quitGroup(\'' + groupId + '\',' + false + ')">Exit discussion group</a>' + '<a href="javascript:void(0);" class="btn btn-primary" onclick="IM.EV_updateGroupInfo(\'' + groupId + '\')">Save changes</a>' + '</div>';
			}
			str += '</div>';
			$('#pop').find('div[class="row"]').html(str);
			IM.HTML_pop_show();
		},
		/**
		 * 群组pop层展示
		 * 
		 * @constructor
		 */
		HTML_pop_photo_show: function() {
			IM.HTML_LJ_block('photo');
			var navbarHei = $('#navbar').height();
			var lvjingHei = $('#lvjing').height();
			var pop_photo = $('#pop_photo');
			pop_photo.find('img').css('max-height', lvjingHei - 30).css('max-width', $(window).width() - 50);
			pop_photo.css('top', navbarHei);
			var d = $(window).scrollTop();
			// a+b=c
			var a = parseInt(pop_photo.find('div[imtype="pop_photo_top"]').css('margin-top'));
			var b = parseInt(pop_photo.find('div[imtype="pop_photo_top"]').css('height'));
			var c = $(window).height();
			if (a + b >= c) {
				d = 0;
			} else if (d + b >= c) {
				d = c - b - 20;
			}
			pop_photo.find('div[imtype="pop_photo_top"]').css('margin-top', d);
			$(window).scrollTop(d);
			pop_photo.show();
		},
		HTML_pop_takePicture_show: function() {
			IM.HTML_LJ_block('photo');
			var navbarHei = $('#navbar').height();
			var lvjingHei = $('#lvjing').height();
			var pop_photo = $('#pop_takePicture');
			pop_photo.find('img').css('max-height', lvjingHei - 30).css('max-width', $(window).width() - 50);
			pop_photo.css('top', navbarHei);
			var d = $(window).scrollTop();
			// a+b=c
			var a = parseInt(pop_photo.find('div[imtype="pop_takePicture_top"]').css('margin-top'));
			var b = parseInt(pop_photo.find('div[imtype="pop_takePicture_top"]').css('height'));
			var c = $(window).height();
			if (a + b >= c) {
				d = 0;
			} else if (d + b >= c) {
				d = c - b - 20;
			}
			pop_photo.find('div[imtype="pop_takePicture_top"]').css('margin-top', d);
			$(window).scrollTop(d);
			pop_photo.show();
		},
		/**
		 * 图片pop层隐藏
		 * 
		 * @constructor
		 */
		HTML_pop_photo_hide: function() {
			IM._msgId = null;
			$('#pop_photo').hide();
			if ($('#pop_photo').find("video").length > 0) {
				if (!document.getElementById("pop_photo").querySelector('video').paused) {
					document.getElementById("pop_photo").querySelector('video').pause();
				}
			};
			IM.HTML_LJ_none();
		},
		/**
		 * 拍照pop层隐藏
		 * 
		 * @constructor
		 */
		HTML_pop_takePicture_hide: function() {
			$('#pop_takePicture').hide();
			$("#video").attr("src", '');
			IM.HTML_LJ_none();
		},
		/**
		 * 样式，群组详情页面显示
		 * 
		 * @constructor
		 */
		HTML_pop_show: function() {
			IM.HTML_LJ_block('white');
			var navbarHei = $('#navbar').height();
			var contentHei = $(".scrollspy-content-example").height();
			var pop = $('#pop');
			pop.css('top', navbarHei + 20);
			pop.css('height', contentHei);
			pop.show();
		},
		/**
		 * 样式，群组详情页面隐藏
		 * 
		 * @constructor
		 */
		HTML_pop_hide: function() {
			$('#pop').hide();
			IM.HTML_LJ_none();
		},
		/**
		 * 隐藏提示框
		 * 
		 * @param id
		 */
		HTML_closeAlert: function(id) {
			if ('all' == id) {
				IM.HTML_closeAlert('alert-error');
				IM.HTML_closeAlert('alert-info');
				IM.HTML_closeAlert('alert-warning');
				IM.HTML_closeAlert('alert-success');
			} else {
				$('#hero-unit').css('padding-top', '60px');
				$(document.getElementById(id)).parent().css('top', '0px');
				$(document.getElementById(id)).hide();
				$(document.getElementById(id)).parent().hide();
			}
		},
		/**
		 * 显示提示框
		 * 
		 * @param id
		 * @param str
		 */
		HTML_showAlert: function(id, str, time) {
			var t = 3 * 1000;
			if (!!time) {
				t = time;
			}
			clearTimeout(IM._timeoutkey);
			$('#alert-info').hide();
			$('#alert-warning').hide();
			$('#alert-error').hide();
			$('#alert-success').hide();
			$(document.getElementById(id + '_content')).html(str);
			$('#hero-unit').css('padding-top', '0px');
			$(document.getElementById(id)).parent().css('top', '-5px');
			$(document.getElementById(id)).show();
			$(document.getElementById(id)).parent().show();
			IM._timeoutkey = setTimeout(function() {
				IM.HTML_closeAlert(id);
			}, t);
		},
		/**
		 * 样式，因高度变化而重置页面布局
		 * 
		 * @constructor
		 */
		HTML_resetHei: function() {
			// 绘制滤镜
			if ('block' == $('#pop_photo').css('display')) {
				IM.HTML_pop_photo_show();
			} else if ('block' == $('#pop').css('display')) {
				IM.HTML_pop_show();
			} else if ('block' == $('#lvjing').find('img').css('display')) {
				IM.HTML_LJ('black');
			} else if ('block' == $('#pop_takePicture').css('display')) {} else {
				IM.HTML_LJ('black');
			}
		},
		/**
		 * canvas绘制滤镜层（HTML5）
		 * 
		 * @param style
		 *            white, black
		 * @constructor
		 */
		HTML_LJ: function(style) {
			var lvjing = $('#lvjing');
			var windowWid = $(window).width();
			if (windowWid < 666) {
				$('#hero-unit').css('padding-left', 20);
				$('#hero-unit').css('padding-right', 20);
			} else {
				//$('#hero-unit').css('padding-left', 60);
				//$('#hero-unit').css('padding-right', 60);
			}
			var navbarHei = $('#navbar').height();
			var concentHei = ($('#hero-unit').height() + 20 + 60 + 30);
			var concentwid = ($('#hero-unit').width() + parseInt($('#hero-unit').css('padding-left')) + parseInt($('#hero-unit').css('padding-right')));
			var lvjingImgHei = lvjing.find('img').height();
			if (0 == lvjingImgHei)
				lvjingImgHei = 198;
			lvjing.css('top', navbarHei);
			lvjing.css('left', 0);
			lvjing.css('width', '100%');
			lvjing.height(concentHei + 15);
			var canvas = document.getElementById("lvjing_canvas");
			canvas.clear;
			canvas.height = (concentHei + 15);
			canvas.width = concentwid;
			if (!canvas.getContext) {
				console.log("Canvas not supported. Please install a HTML5 compatible browser.");
				return;
			}
			var context = canvas.getContext("2d");
			context.clear;
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(concentwid, 0);
			context.lineTo(concentwid, concentHei + 15);
			context.lineTo(0, concentHei + 15);
			context.closePath();
			context.globalAlpha = 0.4;
			if ('white' == style) {
				context.fillStyle = "rgb(200,200,200)";
				lvjing.find('img').hide();
			} else if ('photo' == style) {
				context.fillStyle = "rgb(20,20,20)";
				lvjing.find('img').hide();
			} else if ('black' == style) {
				context.fillStyle = "rgb(0,0,0)";
				var qr = lvjing.find('img');
				qr.css('top', concentHei / 2 - lvjingImgHei / 2);
				qr.css('left', concentwid / 2 - lvjingImgHei / 2);
				qr.show();
			}
			context.fill();
			context.stroke();
			var cha = navbarHei + 4;
			if (navbarHei > 45)
				cha = 0;
			setTimeout(function() {
				$('#ClCache').parent().remove();
			}, 20);
		},
		/**
		 * 样式，滤镜隐藏
		 * 
		 * @constructor
		 */
		HTML_LJ_none: function() {
			$('#lvjing').hide();
		},
		/**
		 * 样式，滤镜显示
		 * 
		 * @constructor
		 */
		HTML_LJ_block: function(style) {
			IM.HTML_LJ(style);
			$('#lvjing').show();
		},
		/**
		 * 聊天模式选择
		 * 
		 * @param contact_type --
		 *            'C':代表联系人; 'G':代表群组; 'M':代表多渠道客服
		 * @constructor
		 */
		DO_choose_contact_type: function(contact_type) {
			$('#im_contact_type').find('li').each(function() {
				$(this).removeClass('active');
				if (contact_type == $(this).attr('contact_type')) {
					$(this).addClass('active');
				}
			});
			// 选择列表下内容
			$('#im_contact_list').find('li').each(function() {
				if (contact_type == $(this).attr('contact_type')) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			// 切换样式
			var current_contact_type = IM.HTML_find_contact_type();
			var im_add = $('#im_add');
			if (IM._contact_type_c == current_contact_type) { // 点对点
				im_add.find('i').attr('class', '').addClass('icon-user');
				im_add.find('input[imtype="im_add_contact"]').show();
				im_add.find('input[imtype="im_add_group"]').hide();
				im_add.find('input[imtype="im_add_mcm"]').hide();
				im_add.find('button[imtype="im_add_btn_contact"]').show();
				im_add.find('div[imtype="im_add_btn_group"]').hide();
			} else if (IM._contact_type_g == current_contact_type) { // group
				im_add.find('i').attr('class', '').addClass('icon-th-list');
				im_add.find('input[imtype="im_add_contact"]').hide();
				im_add.find('input[imtype="im_add_group"]').show();
				im_add.find('input[imtype="im_add_mcm"]').hide();
				im_add.find('button[imtype="im_add_btn_contact"]').hide();
				im_add.find('div[imtype="im_add_btn_group"]').show();
			} else if (IM._contact_type_m == current_contact_type) { // Customer service
				im_add.find('i').attr('class', '').addClass('icon-home');
				im_add.find('input[imtype="im_add_contact"]').hide();
				im_add.find('input[imtype="im_add_group"]').hide();
				im_add.find('input[imtype="im_add_mcm"]').show();
				im_add.find('button[imtype="im_add_btn_contact"]').hide();
				im_add.find('div[imtype="im_add_btn_group"]').hide();
			} else {

			}
		},
		/**
		 * 群组聊天的时候监控到@符号则展示群组成员列表
		 */
		HTML_memberList: function(obj, startIndex) {
			var popoverContent = $("#groupMemList_div").find('div[class="popover-content"]');
			popoverContent.empty();
			var num = obj.length;
			$("#groupMemList_div").css("top", (20 - (num - 1) * 30) + "px");
			for (var i = 0; i < obj.length; i++) {
				var member = obj[i].member; //Account number  nickName nickname
				console.log("member = " + member + ";nickName=" + obj[i].nickName);
				$("#groupMemList_div").show();
				var str = '';
				if ('' != obj[i].nickName && IM._user_account != member) {
					str += '<div id="' + member + '" onclick="IM._selectGroupMem(this,\'' + startIndex + '\')" ' + 'onmousemove="IM._mouseoverStyle(this)" onmouseout="IM._mouseoutStyle(this)">' + obj[i].nickName + '</div>';
				} else if (IM._user_account != member) {
					str += '<div id="' + member + '" onclick="IM._selectGroupMem(this,\'' + startIndex + '\')" ' + 'onmousemove="IM._mouseoverStyle(this)" onmouseout="IM._mouseoutStyle(this)" >' + member + '</div>';
				};
				popoverContent.append(str);
			};
			$("#groupMemList_div").show();
			$(window).click(function() {
				$("#groupMemList_div").hide();
			});
		},
		_mouseoverStyle: function(obj) {
			$(obj).css("background-color", "#E9E9E4");
		},
		_mouseoutStyle: function(obj) {
			$(obj).css("background-color", "");
		},
		_selectGroupMem: function(obj, startIndex) {
			var member = $(obj).attr("id");
			var nickName = $(obj).text();
			IM._extopts.push(member);
			if (startIndex == '') {
				$("#im_send_content").append(nickName);
			} else {
				var currentTab = document.getElementById("im_send_content");
				IM.insertText(currentTab, nickName, startIndex);
			}
		},
		insertText: function(obj, nickName, startIndex) {
			var startPos = parseInt(startIndex) + 1;
			var endPos = startPos;
			var cursorPos = startPos;
			var tmpStr = obj.childNodes[0].data;
			obj.childNodes[0].data = tmpStr.substring(0, startPos) + nickName + tmpStr.substring(endPos, tmpStr.length);
			cursorPos += nickName.length;
		},
		/**
		 * 样式，发送消息
		 */
		DO_sendMsg: function() {
			var str = IM.DO_pre_replace_content_to_db();
			$('#im_send_content_copy').html(str);
			$('#im_send_content_copy').find('img[imtype="content_emoji"]').each(function() {
				var emoji_value_unicode = $(this).attr('emoji_value_unicode');
				$(this).replaceWith(emoji_value_unicode);
			});
			var im_send_content = $('#im_send_content_copy').html();
			// 清空pre中的内容
			$('#im_send_content_copy').html('');
			// 隐藏表情框
			$('#emoji_div').hide();
			var msgid = new Date().getTime();
			var content_type = '';
			var content_you = '';
			var b = false;
			$('#im_contact_list').find('li').each(function() {
				if ($(this).hasClass('active')) {
					content_type = $(this).attr('contact_type');
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			if (!b) {
				alert("Select the contact or group you want to talk to");
				return;
			};
			if (IM._serverNo == content_you) {
				alert("System message no reply");
				return;
			}
			if (im_send_content == undefined || im_send_content == null || im_send_content == '')
				return;
			im_send_content = im_send_content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
			console.log('msgid[' + msgid + '] content_type[' + content_type + '] content_you[' + content_you + '] im_send_content[' + im_send_content + ']');
			var str = '<pre msgtype="content">' + im_send_content + '</pre>';
			IM.HTML_sendMsg_addHTML('temp_msg', 1, msgid, content_type, content_you, str);
			// 发送消息至服务器
			if (IM._contact_type_c == content_type) {
				IM.EV_sendTextMsg(msgid, im_send_content, content_you, false);
			} else if (IM._contact_type_g == content_type) {
				IM.EV_sendTextMsg(msgid, im_send_content, content_you, false);
			} else {
				IM.EV_sendMcmMsg(msgid, im_send_content, content_you, false);
			};
		},
		DO_im_image_file: function() {
			var msgid = new Date().getTime();
			var content_type = '';
			var content_you = '';
			var b = false;
			$('#im_contact_list').find('li').each(function() {
				if ($(this).hasClass('active')) {
					content_type = $(this).attr('contact_type');
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			if (!b) {
				alert("Select the contact or group you want to talk to");
				return;
			}
			if (IM._serverNo == content_you) {
				alert("System message no reply");
				return;
			}
			var windowWid = $(window).width();
			var imgWid = 0;
			var imgHei = 0;
			if (windowWid < 666) {
				imgWid = 100;
				imgHei = 150;
			} else {
				imgWid = 150;
				imgHei = 200;
			}
			var str = '<div class="progress progress-striped active">' + '<div class="bar" style="width: 20%;"></div>' + '</div>' + '<span imtype="msg_attach">' + '<img imtype="msg_attach_src" src="#" style="max-width:' + imgWid + 'px; max-height:' + imgHei + 'px;" onclick="IM.DO_pop_phone(\'' + content_you + '\', \'' + '' + '\',this)" />' + '<input imtype="msg_attach_resend" type="file" accept="image/*" style="display:none;margin: 0 auto;" onchange="IM.DO_im_image_file_up(\'' + content_you + '_' + msgid + '\', \'' + msgid + '\',null)">' + '</span>';
			// 添加右侧消息
			var id = IM.HTML_sendMsg_addHTML('temp_msg', 4, msgid, content_type, content_you, str);
			$(document.getElementById(id)).find('input[imtype="msg_attach_resend"]').click();
		},
		/**
		 * 发送图片，页面选择完图片后出发
		 * 
		 * @param id --
		 *            dom元素消息体的id
		 * @param msgid
		 * @constructor
		 */
		DO_im_image_file_up: function(id, oldMsgid, img_blob) {
			var msg = $(document.getElementById(id));
			var oFile = msg.find('input[imtype="msg_attach_resend"]')[0];
			if (!!oFile) {
				oFile = oFile.files[0];
				console.log(oFile.name + ':' + oFile.type);
			} else {
				oFile = img_blob;
			}
			//如果是附件则本地显示
			window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
			var url = window.URL.createObjectURL(oFile);
			msg.find('img[imtype="msg_attach_src"]').attr('src', url);

			var receiver = msg.attr('content_you');
			// 查找当前选中的contact_type值 1、IM上传 2、MCM上传
			var current_contact_type = IM.HTML_find_contact_type();
			if (IM._contact_type_m == current_contact_type) {
				IM.EV_sendToDeskAttachMsg(oldMsgid, oFile, 4, receiver);
			} else {
				IM.EV_sendAttachMsg(oldMsgid, oFile, 4, receiver);
			}
		},
		/**
		 * 发送本地附件
		 */
		DO_im_attachment_file: function() {
			var msgid = new Date().getTime();
			var content_type = '';
			var content_you = '';
			var b = false;
			$('#im_contact_list').find('li').each(function() {
				if ($(this).hasClass('active')) {
					content_type = $(this).attr('contact_type');
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			if (!b) {
				alert("Select the contact or group you want to talk to");
				$('#im_attachment_file').val('');
				return;
			};
			if (IM._serverNo == content_you) {
				alert("System message no reply");
				return;
			}
			var str = '<div class="progress progress-striped active">' + '<div class="bar" style="width: 40%;"></div>' + '</div>' + '<span imtype="msg_attach">' + '<a imtype="msg_attach_href" href="javascript:void(0);" target="_blank">' + '<span>' + '<img style="width:32px; height:32px; margin-right:5px; margin-left:5px;" src="assets/img/attachment_icon.png" />' + '</span>' + '<span imtype="msg_attach_name"></span>' + '</a>' + '<span style="font-size: small;margin-left:15px;"></span>' + '<input imtype="msg_attach_resend" type="file" accept="" style="display:none;margin: 0 auto;" onchange="IM.DO_im_attachment_file_up(\'' + content_you + '_' + msgid + '\', \'' + msgid + '\')">' + '</span>';
			// 添加右侧消息
			var id = IM.HTML_sendMsg_addHTML('temp_msg', 6, msgid, content_type, content_you, str);
			$(document.getElementById(id)).find('input[imtype="msg_attach_resend"]').click();
		},
		/**
		 * 打开本地文件时触发本方法
		 * 
		 * @param id --
		 *            dom元素消息体的id
		 * @param msgid
		 * @constructor
		 */
		DO_im_attachment_file_up: function(id, oldMsgid) {
			var msg = $(document.getElementById(id));
			var oFile = msg.find('input[imtype="msg_attach_resend"]')[0].files[0];
			var msgType = 0;
			console.log(oFile.name + ':' + oFile.type);
			window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
			var url = window.URL.createObjectURL(oFile);
			var num = oFile.size;
			var size = 0;
			if (num < 1024) {
				size = num + "byte";
			} else if (num / 1024 >= 1 && num / Math.pow(1024, 2) < 1) {
				size = Number(num / 1024).toFixed(2) + "KB";
			} else if (num / Math.pow(1024, 2) >= 1 && num / Math.pow(1024, 3) < 1) {
				size = Number(num / Math.pow(1024, 2)).toFixed(2) + "MB";
			} else if (num / Math.pow(1024, 3) >= 1 && num / Math.pow(1024, 4) < 1) {
				size = Number(num / Math.pow(1024, 3)).toFixed(2) + "G";
			};
			var receiver = msg.attr('content_you');
			//判断如果该浏览器支持拍照，那么在这里做个附件图片和文件的区别化展示；
			if ($("#camera_button").find("i").hasClass("icon-picture")) {
				msg.find('a[imtype="msg_attach_href"]').attr('href', url);
				msg.find('span[imtype="msg_attach_name"]').html(oFile.name);
				msg.find('a[imtype="msg_attach_href"]').next().html(size);
				msgType = 7;
			} else {
				if ("image" == oFile.type.substring(0, oFile.type.indexOf("/"))) {
					var windowWid = $(window).width();
					var imgWid = 0;
					var imgHei = 0;
					if (windowWid < 666) {
						imgWid = 100;
						imgHei = 150;
					} else {
						imgWid = 150;
						imgHei = 200;
					}
					var str = '<img imtype="msg_attach_src" src="' + url + '" style="max-width:' + imgWid + 'px; max-height:' + imgHei + 'px;" ' + ' onclick="IM.DO_pop_phone(\'' + receiver + '\', \'' + '' + '\',this)" />';
					msg.find('a[imtype="msg_attach_href"]').replaceWith(str);

					msgType = 4;
				} else {
					msg.find('a[imtype="msg_attach_href"]').attr('href', url);
					msg.find('span[imtype="msg_attach_name"]').html(oFile.name);
					msg.find('a[imtype="msg_attach_href"]').next().html(size);
					msgType = 7;
				}
			}
			// 查找当前选中的contact_type值 1、IM上传 2、MCM上传
			var current_contact_type = IM.HTML_find_contact_type();
			if (IM._contact_type_m == current_contact_type) {
				IM.EV_sendToDeskAttachMsg(oldMsgid, oFile, msgType, receiver);
			} else {
				IM.EV_sendAttachMsg(oldMsgid, oFile, msgType, receiver);
			}
		},
		/**
		 * 选择表情
		 * 
		 * @param unified
		 * @param unicode
		 * @constructor
		 */
		DO_chooseEmoji: function(unified, unicode) {
			var content_emoji = '<img imtype="content_emoji" emoji_value_unicode="' + unicode + '" style="width:18px; height:18px; margin:0 1px 0 1px;" src="img/img-apple-64/' + unified + '.png"/>';
			if ($('#im_send_content').children().length <= 1) {
				$('#im_send_content').find('p').detach();
				$('#im_send_content').find('br').detach();
				$('#im_send_content').find('div').detach();
			}
			var brlen = $('#im_send_content').find('br').length - 1;
			$('#im_send_content').find('br').each(function(i) {
				if (i == brlen) {
					$(this).replaceWith('');
				}
			});
			var plen = $('#im_send_content').find('p').length - 1;
			$('#im_send_content').find('p').each(function(i) {
				if (i < plen) {
					$(this).replaceWith($(this).html() + '<br>');
				} else {
					$(this).replaceWith($(this).html());
				}
			});
			$('#im_send_content').find('div').each(function(i) {
				if ('<br>' == $(this).html()) {
					$(this).replaceWith('<br>');
				} else {
					$(this).replaceWith('<br>' + $(this).html());
				}
			});
			var im_send_content = $('#im_send_content').html();
			if ('<br>' == im_send_content) {
				im_send_content = '';
			} else {
				im_send_content = im_send_content.replace(/(<(br)[/]?>)+/g, '\u000A');
			}
			$('#im_send_content').html(im_send_content + content_emoji);
		},
		DO_pre_replace_content: function() {
			console.log('pre replace content...');
			setTimeout(function() {
				var str = IM.DO_pre_replace_content_to_db();
				$('#im_send_content').html(str);
			}, 20);
		},
		DO_pre_replace_content_to_db: function() {
			var str = $('#im_send_content').html();
			str = str.replace(/<(div|br|p)[/]?>/g, '\u000A');
			str = str.replace(/\u000A+/g, '\u000D');
			str = str.replace(/<[^img][^>]+>/g, ''); // 去掉所有的html标记
			str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(
				/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g,
				' ');
			if ('\u000D' == str) {
				str = '';
			}
			return str;
		},
		/**
		 * 隐藏或显示表情框
		 * 
		 * @constructor
		 */
		HTML_showOrHideEmojiDiv: function() {
			if ('none' == $('#emoji_div').css('display')) {
				$('#emoji_div').show();
			} else {
				$('#emoji_div').hide();
			}
		},
		/**
		 * 获取当前时间戳 YYYYMMddHHmmss
		 * 
		 * @returns {*}
		 */
		_getTimeStamp: function() {
			var now = new Date();
			var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? "" + (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
			return timestamp;
		},
		/**
		 * 修改用户信息
		 */
		DO_userMenu: function() {
			// 构建用户信息页面
			IM.DO_userpop_show();
			// 调用SDK方法获取user信息
			IM.EV_getMyMenu();
		},
		/**
		 * 构建用户信息页面
		 */
		DO_userpop_show: function() {
			var str = '<div class="modal" id="pop_MyInfo" style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;">' + '<div class="modal-header" >' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="IM.HTML_pop_hide();">×</button>' + '<h3>Personal information </h3>' + '</div>' + '<div class="modal-body">' + '<table class="table table-bordered">' + '<tr>' + '<td>' + '<div class="pull-left" style="width: 25%;">nickname：</div>' + '<div class="pull-right" style="width: 75%;" imtype="im_pop_MyInfo_nick">' + '<input id="nickName" class="pull-right" type="text" style="width:95%;" value="" />' + '</div>' + '</td>' + '</tr>' + '<tr>' + '<td>' + '<div class="pull-left" style="width: 25%;">Gender：</div>' + '<div class="pull-right" style="width: 75%;" imtype="im_pop_MyInfo_sex">' + '<input name="sex" type="radio" value="1" />male' + '<input name="sex" style="margin-left:20%;" type="radio" value="2" />female' + '</div>' + '</td>' + '</tr>' + '<tr>' + '<td>' + '<div class="pull-left" style="width: 25%;">Birthday：</div>' + '<div class="pull-right" style="width: 75%;" >' + '<input id="birth" size="16" type="text" value="" class="form_date" readonly="readonly">' + '</div></td>' + '</tr>' + '<tr>' + '<td>' + '<span class="pull-left" style="width: 25%;">Personalized signature：</span>' + '<span class="pull-right" style="width: 75%;" imtype="im_pop_MyInfo_sign">' + '<textarea id="sign" class="pull-left" style="width:95%;"></textarea>' + '</span>' + '</td>' + '</tr>' + '</table>' + '<div class="modal-footer">' + '<a href="javascript:void(0);" class="btn btn-primary" onclick="IM.EV_updateMyInfo()"> Save changes </a>' + '<a href="javascript:void(0);" class="btn" onclick="IM.HTML_pop_hide();">cancel</a>' + '</div></div>';
			$('#pop').find('div[class="row"]').html(str);
			// 时间控件
			$('.form_date').datetimepicker({
				language: 'zh-CN',
				pickTime: true,
				todayBtn: true,
				autoclose: true,
				minView: '2',
				forceParse: false,
				format: "yyyy-mm-dd"
			});
			IM.HTML_pop_show();
		},
		/**
		 * 获取当前用户个人信息
		 */
		EV_getMyMenu: function() {
			RL_YTX.getMyInfo(function(obj) {
				$("#nickName").val(obj.nickName);
				$("[name=sex]").each(function() {
					if ($(this).val() == obj.sex) {
						$(this).prop("checked", true);
					}
				});
				$("#birth").val(obj.birth);
				if (!!obj.sign) {
					$("#sign").text(obj.sign);
				}
			}, function(obj) {
				if (520015 != obj.code) {
					console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
				}
			});
		},
		/**
		 * 整合用户信息传给服务器
		 */
		EV_updateMyInfo: function() {
			var nickName = $("#nickName").val();
			if (nickName != IM._user_account) {
				/*if (nickName.length > 6) {
					alert("昵称长度不能超过6");
					return;
				};*/
				if (nickName == "") {
					alert("Nickname cannot be empty");
					return false;
				}
			}
			var sex = '';
			$("[name=sex]").each(function() {
				if (!!$(this).prop("checked")) {
					sex = $(this).val();
				}
			});
			var birth = $("#birth").val();
			var sign = $("#sign").val();
			if (sign.length > 100) {
				alert("Signature length cannot exceed100");
				return;
			}
			var uploadPersonInfoBuilder = new RL_YTX.UploadPersonInfoBuilder(nickName, sex, birth, sign);
			RL_YTX.uploadPerfonInfo(uploadPersonInfoBuilder, function(obj) {
				IM.HTML_pop_hide();
				$('#navbar_login_show').find('span')[1].innerHTML = nickName;
				$('#navbar_login_show').html('<span style="float: left;display: block;font-size: 20px;font-weight: 200;padding-top: 10px;padding-bottom: 10px;text-shadow: 0px 0px 0px;color:#eee" >Hello!:</span>' + '<a onclick="IM.DO_userMenu()" style="text-decoration: none;cursor:pointer;float: left;font-size: 20px;font-weight: 200;max-width:130px;' + 'padding-top: 10px;padding-right: 20px;padding-bottom: 10px;padding-left: 20px;text-shadow: 0px 0px 0px;color:#eee;word-break:keep-all;text-overflow:ellipsis;overflow: hidden;" >' + nickName + '</a>' + '<span onclick="IM.EV_logout()" style="cursor:pointer;float: right;font-size: 20px;font-weight: 200;' + 'padding-top: 10px;padding-bottom: 10px;text-shadow: 0px 0px 0px;color:#eeeeee">Sign out</span>');
				IM._username = nickName;
			}, function(obj) {
				console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
			});
		},
		_cancelTakePic: function() {
			IM.HTML_pop_takePicture_hide();
			var onErr = function(obj) {
				console.log("Error code：" + obj.code + "; Error codedescription：" + obj.msg);
			};
			RL_YTX.photo.cancel();
		},
		DO_takePicture: function() {
			var b = false;
			var content_you = '';
			$('#im_contact_list').find('li').each(function() {
				if (!!$(this).hasClass('active')) {
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			if (!b) {
				alert("Select the contact or group you want to talk to");
				return;
			};
			if (IM._serverNo == content_you) {
				alert("System message no reply");
				return;
			}
			// 拍照按钮的浏览器兼容
			var windowWid = $(window).width();
			if (windowWid < 666) {
				$('#takePhoto').find('div').css("height", "35px");
				$('#takePhoto').find('img').css("height", "30px");
				$('#takePhoto').find('img').css("width", "30px");
			} else {
				$('#takePhoto').find('div').css("height", "50px");
				$('#takePhoto').find('img').css("height", "45px");
				$('#takePhoto').find('img').css("width", "45px");
			};
			var objTag = {};
			var video = document.getElementById("video");
			objTag.tag = video;
			var onCanPlay = function() {
				IM.HTML_pop_takePicture_show();
			};
			var onErr = function(errObj) {
				console.log("Error code：" + errObj.code + "; Error description：" + errObj.msg);
				// IM.HTML_pop_takePicture_hide();
				return;
			};
			RL_YTX.photo.apply(objTag, onCanPlay, onErr);
		},
		/**
		 * 拍照
		 */
		_snapshot: function() {
			var content_type = '';
			var content_you = '';
			$('#im_contact_list').find('li').each(function() {
				if (!!$(this).hasClass('active')) {
					content_type = $(this).attr('contact_type');
					content_you = $(this).attr('contact_you');
				}
			});
			var resultObj = RL_YTX.photo.make();
			IM.HTML_pop_takePicture_hide();
			if ("174010" == resultObj.code) { //没有调用applayMethod
				alert("Error description：" + resultObj.msg);
			} else {
				var windowWid = $(window).width();
				var msgid = new Date().getTime();
				var imgWid = 0;
				var imgHei = 0;
				if (windowWid < 666) {
					imgWid = 100;
					imgHei = 150;
				} else {
					imgWid = 150;
					imgHei = 200;
				};
				var url = resultObj.blob.url;
				// 初始化右侧对话框消息
				var str1 = '<div class="progress progress-striped active">' + '<div class="bar" style="width: 20%;"></div>' + '</div>' + '<span imtype="msg_attach">' + '<img imtype="msg_attach_src" src="' + url + '" onclick="IM.DO_pop_phone(\'' + content_you + '\', \'' + '' + '\',this)" style="cursor:pointer;max-width:' + imgWid + 'px;max-height:' + imgHei + 'px;" />' + '<object style="display:none"></object>' + '</span>';

				var id = IM.HTML_sendMsg_addHTML('msg', 4, msgid, content_type, content_you, str1);
				IM.DO_im_image_file_up(id, msgid, resultObj.blob);
			};
		},
		DO_getHistoryMessage: function() {
			var content_list = $('#im_content_list');
			var scrollTop = content_list.scrollTop();
			if (scrollTop == 0) {
				// 获取参数
				var firstMsg = null;
				for (var i = 0; i < content_list.children().length; i++) {
					var child = content_list.children()[i];
					if (child.nodeName == "DIV" && child.id != "getHistoryMsgDiv") { // 判断标签是不是div
						if (child.style.display != "none") {
							firstMsg = child;
							break;
						}
					}
				}
				IM.EV_getHistoryMessage(firstMsg);
			}
		},
		/**
		 * 获取历史消息GetHistoryMessageBuilder
		 * 
		 * @param talker
		 *            消息交互者或群组id
		 * @param pageSize
		 *            获取消息数目 默认为10 最大为50
		 * @param version
		 *            接收消息的消息版本号 分页条件
		 * @param msgId
		 *            发送消息的msgId 分页条件
		 * @param order
		 *            排序方式 1升序 2降序 默认为1
		 * @param callback --
		 *            function(obj){ var msg = obj[i]; //obj 为数组 msg.version;
		 *            //消息版本号 msg.msgType; //消息类型 msg.msgContent; //文本消息内容
		 *            msg.msgSender; //发送者 msg.msgReceiver; //接收者 msg.msgDomain;
		 *            //扩展字段 msg.msgFileName; //消息文件名 msg.msgFileUrl; //消息下载地址
		 *            msg.msgDateCreated; //服务器接收时间 msg.mcmEvent; //是否为mcm消息
		 *            0普通im消息 1 start消息 2 end消息 53发送mcm消息 }
		 * @param onError --
		 *            function(obj){ obj.code; //错误码; }
		 * @constructor
		 */
		EV_getHistoryMessage: function(firstMsg) {
			var getHistoryMessageBuilder = null;
			var pageSize = 20;
			var order = 2;
			var talker = null;
			if (!!firstMsg) {
				talker = $(firstMsg).attr("content_you"); // 接受者
				console.log("talker" + talker + "," + IM._user_account);
				var msgId = $(firstMsg).attr("id").substring(talker.length + 1); // 当前条为发送消息则提供参数msgId
				console.log(msgId);
				var sender = $(firstMsg).attr("contactor");
				if (sender != "sender") {
					getHistoryMessageBuilder = new RL_YTX.GetHistoryMessageBuilder(
						talker, pageSize, 1, msgId, order);
				} else {
					getHistoryMessageBuilder = new RL_YTX.GetHistoryMessageBuilder(
						talker, pageSize, 2, msgId, order);
				}
				console.log("talker=" + talker + ";pageSize=" + pageSize + ";msgId=" + msgId + ";(1Ascending2Descending)order=" + order);
			} else {
				$('#im_contact_list').find('li').each(function() {
					if ($(this).hasClass('active')) {
						talker = $(this).attr('contact_you');
					}
				});
				getHistoryMessageBuilder = new RL_YTX.GetHistoryMessageBuilder(talker, pageSize, "", "", order);
				console.log("talker=" + talker + ";pageSize=" + pageSize + ";msgId=" + msgId + ";(1Ascending2Descending)order=" + order);
			}
			// 调用接口
			RL_YTX.getHistoryMessage(getHistoryMessageBuilder,
				function(obj) {
					var windowWid = $(window).width();
					var imgWid = 0;
					var imgHei = 0;
					if (windowWid < 666) {
						imgWid = 100;
						imgHei = 150;
					} else {
						imgWid = 150;
						imgHei = 200;
					};
					for (var i = 0; i < obj.length; i++) {
						var msg = obj[i];
						var content_you = '';
						var version = msg.version;
						if (msg.msgSender == IM._user_account) {
							content_you = msg.msgReceiver;
						} else {
							content_you = msg.msgSender;
						};
						var str = '';
						if (msg.msgType == 1) { //1:文本Message 2：语音Message 3：视频Message 4：图片Message 5：位置Message 6：file   msg.msgFileName; //Messagefile名
							str = '<pre msgtype="content">' + msg.msgContent + '</pre>';
						};
						if (msg.msgType == 2) { //zzx
							str = '<pre>You have a voice message.,Please use other devices to receive</pre>';
						};
						if (msg.msgType == 3) {
							str = '<img onclick="IM.DO_pop_phone(\'' + content_you + '\', \'' + version + '\')" ' +
								'videourl="' + msg.msgFileUrl + '" src="' + msg.msgFileUrlThum + '" ' +
								'style="max-width:' + imgWid + 'px;max-height:' + imgHei + 'px;" />';
						};
						if (msg.msgType == 4) {
							str = '<span imtype="msg_attach">' + '<img imtype="msg_attach_src" src="' + msg.msgFileUrl + '" style="max-width:' + imgWid + 'px;max-height:' + imgHei + 'px;" />' + '</span>';
						};
						if (msg.msgType == 5) { //zzx
							var jsonObj = eval('(' + obj.msgContent + ')');
							var lat = jsonObj.lat; //latitude
							var lon = jsonObj.lon; //longitude
							var title = jsonObj.title; //位置信息描述
							var windowWid = $(window).width();
							var imgWid = 0;
							var imgHei = 0;
							if (windowWid < 666) {
								imgWid = 100;
								imgHei = 150;
							} else {
								imgWid = 150;
								imgHei = 200;
							};
							var str = '<img src="img/baidu.png" style="cursor:pointer;max-width:' + imgWid + 'px; max-height:' + imgHei + 'px;" onclick="IM.DO_show_map(\'' + lat + '\', \'' + lon + '\', \'' + title + '\')"/>';
						};
						if (msg.msgType == 7) {
							str = '<span imtype="msg_attach">' + '<a imtype="msg_attach_href" href="' + msg.msgFileUrl + '" target="_blank">' + '<span>' + '<img style="width:32px; height:32px; margin-right:5px; margin-left:5px;" src="assets/img/attachment_icon.png" />' + '</span>' + '<span imtype="msg_attach_name">' + msg.msgFileName + '</span>' + '</a>' + '</span>';
						};
						if (!!msg && msg.msgSender == IM._user_account) {
							// 追加自己聊天记录
							IM.HTML_sendMsg_addPreHTML("msg", msg.msgType, null, null, msg.msgReceiver, str);
						} else {
							// 追加对方聊天记录
							IM.HTML_pushMsg_addPreHTML(msg.msgType, msg.msgReceiver, msg.version, null, true, msg.msgSender, str);
						}
					}
				},
				function(obj) {
					if (obj.code == "540016") {
						$("#getHistoryMsgDiv").html('<a href="javascript:void(0);" style="font-size: small;position: relative;top: -30px;">No more history information</a>');
					} else {
						console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
					}
				});
		},
		DO_inviteCall: function(callType) {
			//发起呼叫
			var receiver = $("#callerId").val();
			if (IM._serverNo == receiver) {
				alert("System message no reply");
				return;
			};
			var view = document.getElementById("receivedVideo");
			var localView = document.getElementById("localVideo");
			localView.muted = true;
			RL_YTX.setCallView(view, localView);
			var makeCallBuilder = new RL_YTX.MakeCallBuilder();
			makeCallBuilder.setCalled(receiver); //John的号码
			makeCallBuilder.setCallType(callType); //呼叫的类型 0 音频 1video 2 落地电话
			makeCallBuilder.setNickName('65asdasd646d4');
			console.log("called = " + receiver + "; " + "callType = " + callType);
			var callId = RL_YTX.makeCall(makeCallBuilder,
				function() {
					
				},
				function callback(obj) {
					ajaxLoadEnd();
					$('#diagnose_operation_dialog').dialog('close');
					if(obj.code == 174002){
						$.messager.alert("Prompt", 'Users not online');
					} else if(obj.code == 174005) {
						$.messager.alert("Prompt", 'No camera detected,Please connect and try again');
					}
					console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
				});
			IM.HTML_videoView(callId, IM._user_account, receiver, callType);
			$("#videoView").show();
			$("#voiceCallDiv_audio").hide();
			$("#cancelVoipCall").show();
			$("#cancelVoipCall").text("cancel");
			$("#acceptVoipCall").hide();
			$("#refuseVoipCall").hide();
		},
		/**
		 * 展示视频通话窗口
		 */
		HTML_videoView: function(callId, caller, called, type) {
			var windowWidth = document.body.clientWidth;
			var windowHeight = document.body.clientHeight;
			var viewCanva = document.getElementById("videoViewCanvas");
			var context = viewCanva.getContext("2d");
			context.clearRect(0, 0, windowWidth, windowHeight + 200);
			context.globalAlpha = 0.4;
			context.fillRect(0, 0, windowWidth, windowHeight + 200);
			if (!document.getElementById("cancelVoipCall")) {
				var str = '<div style="width:100%;	background-color:black;margin-top:0px;' +
					'padding-top:5px;padding-bottom:5px;"><a href="javascript:void(0);" id="cancelVoipCall" ' +
					'class="btn" >cancel</a><a href="javascript:void(0);" id="acceptVoipCall" ' +
					'class="btn btn-primary" >Accept video</a><a href="javascript:void(0);" id="refuseVoipCall" ' +
					'class="btn" >Refuse video chat</a></div>';
				$("#videoView").append(str);
				$("#cancelVoipCall").click(function() {
					IM.DO_cancelVoipCall(callId, caller, called);
				});
				$("#acceptVoipCall").click(function() {
					IM.DO_answerVoipCall(callId, caller, called, type);
				});
				$("#refuseVoipCall").click(function() {
					IM.DO_refuseVoipCall(callId, caller, called);
				})
			} else {
				$("#cancelVoipCall").unbind('click');
				$("#cancelVoipCall").click(function() {
					IM.DO_cancelVoipCall(callId, caller, called);
				});
				$("#cancelVoipCall").text("cancel");
				$("#acceptVoipCall").unbind('click');
				$("#acceptVoipCall").click(function() {
					IM.DO_answerVoipCall(callId, caller, called, type);
				});
				$("#refuseVoipCall").unbind('click');
				$("#refuseVoipCall").click(function() {
					IM.DO_refuseVoipCall(callId, caller, called);
				})
			};
		},
		/**
		 * 取消呼叫
		 * @param callId 消息的唯一标识
		 * @param called 被叫号码
		 * @param caller 主叫号码
		 */
		DO_cancelVoipCall: function(callId, caller, called) {
			document.getElementById("voipCallRing").pause();
			var releaseCallBuilder = new RL_YTX.ReleaseCallBuilder();
			releaseCallBuilder.setCallId(callId); //请求的callId
			releaseCallBuilder.setCaller(caller); //请求的主叫号码，That isTony的号码\n
			releaseCallBuilder.setCalled(called); // 请求的被叫号码，That isJohn的号码
			RL_YTX.releaseCall(releaseCallBuilder, function() {},
				function(obj) {
					console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
				});
			$('#diagnose_operation_dialog').dialog('close');
			finishVideoDiagnose();
			$.messager.alert("Prompt", 'Call is over');
		},
		/**
		 * 接受voipCall
		 * @param callId 唯一消息标识
		 * @param caller 主叫
		 */
		DO_answerVoipCall: function(callId, caller, called, acceptType) {
			if (acceptType == 1) {
				document.getElementById("voipCallRing").pause();
				//设置页面view句柄
				var view = document.getElementById("receivedVideo");
				var localView = document.getElementById("localVideo");
				localView.muted = true;
				RL_YTX.setCallView(view, localView);
				$("#cancelVoipCall").text("End");
				$("#cancelVoipCall").show();
				$("#acceptVoipCall").hide();
				$("#refuseVoipCall").hide();
			} else if (acceptType == 0) {
				document.getElementById("voipCallRing").pause();
				//设置页面view句柄
				var view = document.getElementById("voiceCallAudio");
				RL_YTX.setCallView(view, null);
				$("#cancelVoiceCall").text("End");
				$("#cancelVoiceCall").show();
				$("#acceptVoiceCall").hide();
				$("#refuseVoiceCall").hide();
			}
			var acceptCallBuilder = new RL_YTX.AcceptCallBuilder();
			acceptCallBuilder.setCallId(callId); //请求的callId，
			acceptCallBuilder.setCaller(caller); //请求的主叫号码，That isTony的号码
			console.log("callId=" + callId + "; caller=" + caller);
			RL_YTX.accetpCall(acceptCallBuilder,
				function() {

				},
				function callback(obj) {
					console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
				});
		},
		/**
		 * 拒绝voipCall
		 * @param callId 唯一消息标识
		 * @param caller 主叫
		 * @param reason 拒绝原因
		 */
		DO_refuseVoipCall: function(callId, caller, refuseType) {
			document.getElementById("voipCallRing").pause();
			var rejectCallBuilder = new RL_YTX.RejectCallBuilder();
			rejectCallBuilder.setCallId(callId); //请求的callId
			rejectCallBuilder.setCaller(caller); //请求的主叫号码，That isTony的号码
			RL_YTX.rejectCall(rejectCallBuilder, function() {

			}, function(obj) {
				console.log("Error code：" + obj.code + "; Error description：" + obj.msg)
			});
		},
		DO_fireMsg: function(obj) {
			if ($(obj).attr("class").indexOf("active") > -1) {
				$(obj).removeClass("active");
			} else {
				$(obj).addClass("active");
			}
		},
		/**
		 * 录音发送
		 */
		DO_startRecorder: function() {
			IM.Do_notice(2, "t");
			var b = false;
			var content_you = '';
			$('#im_contact_list').find('li').each(function() {
				if ($(this).hasClass('active')) {
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			if (!b) {
				alert("Select the contact or group you want to talk to");
				return;
			};
			if (IM._serverNo == content_you) {
				alert("System message no reply");
				return;
			}
			var windowWidth = document.body.clientWidth;
			var windowHeight = document.body.clientHeight;
			var recorderCanva = document.getElementById("recorderCanvas");
			var context = recorderCanva.getContext("2d");
			context.clearRect(0, 0, windowWidth, windowHeight + 200);
			context.globalAlpha = 0.4;
			context.fillRect(0, 0, windowWidth, windowHeight + 200);
			$("#pop_recorder").show();
			$("#recorderAudio").parent().css("top", windowHeight / 2);
			var width = $("#recorderAudio").parent().width();
			$("#recorderAudio").parent().css("left", (windowWidth - width) / 2 + "px");
			var obj = new Object;
			obj.tag = document.getElementById("recorderAudio");
			RL_YTX.audio.apply(obj, function() {
				//初始化录音成功回调
			}, function(resp) {
				console.log("Error code：" + resp.code + "; Error description：" + resp.msg)
				$("#recorderCanvas").hide();
				$("#pop_recorder").hide();
			});
		},
		DO_endRecorder: function() {
			IM.Do_notice(0, "f");
			var dataBlob = RL_YTX.audio.make();
			var code = dataBlob.code;
			if (code == 200) {
				IM._sendRecorder(dataBlob.blob);
			} else {
				$("#pop_recorder").hide();
				$("#recorderAudio").attr("src", "");
			}
		},
		_sendRecorder: function(blob) {
			// 初始化右侧对话框消息
			var str1 = '<div class="progress progress-striped active">' + '<div class="bar" style="width: 20%;"></div>' + '</div>' + '<span imtype="msg_attach">' + '<audio controls="controls" src="' + blob.url + '" ></audio>' + '<object style="display:none"></object>' + '</span>';
			var msgid = new Date().getTime();
			var content_type = '';
			var content_you = '';
			$('#im_contact_list').find('li').each(function() {
				if ($(this).hasClass('active')) {
					content_type = $(this).attr('contact_type');
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			IM.HTML_sendMsg_addHTML('msg', 2, msgid, content_type, content_you, str1);
			$("#pop_recorder").hide();
			$("#recorderAudio").attr("src", "");
			var current_contact_type = IM.HTML_find_contact_type();
			if (IM._contact_type_m == current_contact_type) {
				IM.EV_sendToDeskAttachMsg(msgid, blob, 2, content_you);
			} else {
				IM.EV_sendAttachMsg(msgid, blob, 2, content_you);
			};
		},
		EV_cancel: function() {
			IM.Do_notice(0, "f");
			RL_YTX.audio.cancel();
			$("#pop_recorder").hide();
			$("#recorderAudio").attr("src", "");
		},
		/**
		 * 禁止发送附件
		 */
		SendFile_isDisable: function() {
			$("#file_button").append('<span style="color:#FF0000; font-size: 16px; font-weight:bold;margin-left:-15px;">X</span>');
			$("#file_button").removeAttr("onclick");
		},

		/**
		 * 禁止发送音视频
		 */
		SendVoiceAndVideo_isDisable: function() {
			$("#voipInvite").append('<span style="color:#FF0000; font-size: 16px; font-weight:bold;margin-left:-15px;">X</span>');
			$("#voipInvite").removeAttr("onclick");
			$("#voiceInvite").append('<span style="color:#FF0000; font-size: 16px; font-weight:bold;margin-left:-15px;">X</span>');
			$("#voiceInvite").removeAttr("onclick");
			$("#luodi").append('<span style="color:#FF0000; font-size: 16px; font-weight:bold;margin-left:-15px;">X</span>');
			$("#luodi").removeAttr("onclick");
		},
		/**
		 * 不支持usermedie
		 */
		Check_usermedie_isDisable: function() {
			$("#camera_button").removeAttr("onclick");
			$("#camera_button").html('<i class="icon-picture"></i>');
			$("#camera_button").click(function() {
				IM.DO_im_image_file();
			});
			$("#startRecorder").append('<span style="color:#FF0000; font-size: 16px; font-weight:bold;margin-left:-15px;">X</span>');
			$("#startRecorder").removeAttr("onclick");
			IM.SendVoiceAndVideo_isDisable();
		},
		/**
		 * 切换按钮
		 */
		Check_login: function() {
			$("div[name = 'loginType']").each(function() {
				var display = $(this).css("display");
				if (display == 'none') {
					IM._loginType = $(this).attr("id");
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		},
		isNull: function(value) {
			if (value == '' || value == undefined || value == null) {
				return true;
			}
		},
		DO_cleanChatHis: function(groupId) {
			$('#im_content_list > div[content_you="' + groupId + '"]').each(function() {
				$(this).remove();
			});
		},
		/**
		 * 桌面提醒功能
		 * @param you_sender 消息发送者账号
		 * @param nickName 消息发送者昵称
		 * @param you_msgContent 接收到的内容
		 * @param msgType 消息类型
		 * @param isfrieMsg 是否阅后即焚消息
		 * @param isCallMsg 是否音视频呼叫消息
		 */
		DO_deskNotice: function(you_sender, nickName, you_msgContent, msgType, isfrieMsg, isCallMsg, inforSender, isAtMsg) {
			console.log("you_msgContent=" + you_msgContent + "；msgType=" + msgType + "；isCallMsg=" + isCallMsg);
			var title;
			var body = '';
			if (!!you_sender || !!nickName) {
				if ('g' == you_sender.substr(0, 1)) {
					title = "Group message";
					if (!!nickName) {
						body =  isAtMsg+inforSender + ":" ;
					} else {
						body = you_sender + ":";
					}
				} else {
					if (!!nickName) {
						title = nickName;
					} else {
						title = you_sender;
					}
				}

			} else {
				title = "System notification";
				body = you_msgContent;
			}
			if (isfrieMsg) {
				body += "[Burn after reading news]";
			} else if (isCallMsg) {
				body += you_msgContent;
			} else {
				if (1 == msgType) {
					emoji.showText = true;
					you_msgContent = emoji.replace_unified(you_msgContent);
					emoji.showText = false;
					body += you_msgContent;
				} else if (2 == msgType) {
					body += "[Voice]";
				} else if (3 == msgType) {
					body += "[video]";
				} else if (4 == msgType) {
					body += "[picture]";
				} else if (5 == msgType) {
					body += "[position]";
				} else if (6 == msgType || 7 == msgType) {
					body += "[Attachment]";
				} else if (11 == msgType) {
					body += you_msgContent; //@group，typeby11的时候
				}
			}
			if (11 == msgType) {
				if (!IM._Notification) {
					return;
				}
			} else {
				if (!IM._Notification || !IM.checkWindowHidden()) {
					return;
				}
			}
			var instance = new IM._Notification(
				title, {
					body: body,
					icon: "http://h5demo.yuntongxun.com/assets/img/logo-blue.png"
				}
			);
			instance.onclick = function() {
				// Something to do
			};
			instance.onerror = function() {
				// Something to do
				console.log('notification encounters an error');
			};
			instance.onshow = function() {
				// Something to do
				setTimeout(function() {
					//instance.onclose();
					instance.close();
				}, 3000);
			};
			instance.onclose = function() {
				// Something to do
				console.log('notification is closed');
			};
		},
		/**
		 * 获取hidden属性
		 */
		getBrowerPrefix: function() {
			return 'hidden' in document ? null : function() {
				var r = null;
				['webkit', 'moz', 'ms', 'o'].forEach(function(prefix) {
					if ((prefix + 'Hidden') in document) {
						return r = prefix;
					}
				});
				return r;
			}();
		},
		checkWindowHidden: function() {
			var prefix = IM.getBrowerPrefix();
			//不支持该属性
			if (!prefix) {
				return document['hidden'];
			}
			return document[prefix + 'Hidden'];
		},
		//输入框校验
		Do_boxCheck: function(flag) {
			var result = [];
			var im_send_content = IM.DO_pre_replace_content_to_db();
			if (im_send_content != "") {
				return;
			}
			var msgid = new Date().getTime();
			var content_type = '';
			var content_you = '';
			var b = false;
			$('#im_contact_list').find('li').each(function() {
				if ($(this).hasClass('active')) {
					content_type = $(this).attr('contact_type');
					content_you = $(this).attr('contact_you');
					b = true;
				}
			});
			if (flag != "f" & !b) {
				alert("Select the contact or group you want to talk to");
				return;
			}
			result[0] = msgid;
			result[1] = im_send_content;
			result[2] = content_you;
			result[3] = content_type;
			return result;
		},
		/*
		 *发消息提示
		 *bOn domain 状态参数 0表示结束，1表示正在写，2表示正在录音
		 * t表示需要消息提示，f不需要消息提示
		 * */
		Do_notice: function(domain, bOn) {
			console.log("focus");
			var result = IM.Do_boxCheck(bOn);
			if (result != null) {
				// 发送消息至服务器
				if (IM._contact_type_c == result[3]) {
					IM.EV_sendTextMsg(result[0], domain, result[2], false, IM._transfer);
				}
			}
		},
		EV_GroupMemberRole: function(groupId, member, role) {
			var roleBuilder = new RL_YTX.SetGroupMemberRoleBuilder();
			roleBuilder.setGroupId(groupId);
			roleBuilder.setMemberId(member);
			roleBuilder.setRole(role);
			RL_YTX.setGroupMemberRole(roleBuilder, function() {
				var trobj = $('#pop').find('tr[contact_you="' + member + '"]');
				var tdobj = trobj.children();
				var spanobj = tdobj.children();
				var deleobj = spanobj[3];
				$(deleobj).remove();
				console.log("Member role Changed");
				if (role == 1) {
					IM.HTML_pop_hide();
				} else if (role == 2) {
					$(spanobj).eq(0).children("span").text("[Administrators]");
					$(spanobj).eq(2).after('<span class="pull-right label label-important" imtype="im_pop_memberspeak' + member + '" onclick="IM.EV_GroupMemberRole(\'' + groupId + '\',\'' + member + '\',3)"> Cancel administrator qualification </span>');
				} else {
					$(spanobj).eq(0).children("span").text("[member]");
					$(spanobj).eq(2).after('<span class="pull-right label label-success" imtype="im_pop_memberspeak' + member + '" onclick="IM.EV_GroupMemberRole(\'' + groupId + '\',\'' + member + '\',2)"> Set as Administrator </span>');
				}
			}, function(obj) {
				console.log("Error code： " + obj.code + "; Error description：" + obj.msg);
			});
		}
	};
})();