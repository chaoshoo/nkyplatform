<%@page import="org.springframework.context.ApplicationContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>好医家直播</title>
    <link rel="stylesheet" type="text/css" href="//cdn.bootcss.com/Buttons/2.0.0/css/buttons.min.css">
    <link href="//nos.netease.com/vod163/nep.min.css" rel="stylesheet">
</head>
<style type="text/css">
    .m-panel-half {
        float: left;
        margin: 5px;
    }
    .row {
        margin-top: 5px;
    }
</style>
<body>
    <h1>好医家直播</h1>
    
    <video id="my-video" class="video-js" x-webkit-airplay="allow" webkit-playsinline controls poster="1.jpg" preload="auto" width="640" height="480" data-setup="{}">
    </video>
    <div class="row">
        <button class="button button-primary button-pill button-large" onclick="playNow()">开始播放</button>
    </div>
   <div class="m-panel-container">
        <div class="m-panel-half">
   
        </div>
      
        </div>
    </div>
    <script src="//nos.netease.com/vod163/nep.min.js"></script>
    <script type="text/javascript">
        var testBtnList = document.getElementsByClassName('testBtn');
        videojs.options.flash.swf = "//nos.netease.com/vod163/nep.test.swf"
        var myPlayer = neplayer('my-video', {}, function() {
            console.log('播放器初始化完成');
        });
        var playerTech = videojs("my-video").tech({ IWillNotUseThisInPlugins: true });
        myPlayer.onPlayState(1,function(){
            console.log('play');
        });
        myPlayer.onPlayState(2,function(){
            console.log('pause');
        });
        myPlayer.onPlayState(3,function(){console.log('ended')});
        myPlayer.onError(function(data){console.log(data)});
        for (var i = testBtnList.length - 1; i >= 0; i--) {
            testBtnList[i].disabled = true;
        }
        function playNow() {
			var url="http://flv7a2ea1d5.live.126.net/live/a2ba8d0eb3374e7e90b4843d3f5f8616.flv?netease=flv7a2ea1d5.live.126.net",
                lowUrl = url.toLowerCase(),
                urlType = lowUrl.substring(0, 4),
                type;
			
            if (url === '') {
               alert('请输入播放地址');
               return;
            }
            switch (urlType) {
                case 'http':
                    if (lowUrl.indexOf('mp4') !== -1) {
                        type = 'video/mp4';
                    } else if (lowUrl.indexOf('flv') !== -1) {
                        type = 'video/x-flv';
                    } else if (lowUrl.indexOf('m3u8') !== -1) {
                        type = 'application/x-mpegURL';
                    }
                    break;
                case 'rtmp':
                    type = 'rtmp/flv';
                    break;
               
            }
            myPlayer.setDataSource({ type: type, src: url });
            myPlayer.play();
            for (var i = testBtnList.length - 1; i >= 0; i--) {
                testBtnList[i].disabled = false;
            }
        }
    </script>
</body>
</html>
