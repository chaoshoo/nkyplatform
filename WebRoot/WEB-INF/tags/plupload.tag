<%@ tag pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/taglib.jsp"%>
<%@ tag import="java.util.UUID" %>
<%@ tag import="com.sys.util.ServiceConstants" %>
<%@ attribute name="id" type="java.lang.String" required="true" rtexprvalue="true"%>
<%@ attribute name="callmethod" type="java.lang.String" required="true" rtexprvalue="true"%>
<%@ attribute name="format" type="java.lang.String" required="true" rtexprvalue="true"%>


<%
	String path = request.getContextPath();
	
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String uuid = UUID.randomUUID().toString();
	
	String  url = ServiceConstants.www+ServiceConstants.upload;
	String  picUrl = ServiceConstants.www;
	System.out.print(picUrl);
%>


<script type="text/javascript" src="plupload/js/plupload.full.min.js"></script>

<div id="${id}_<%=uuid%>">
	<a id="${id}_pickfiles" href="javascript:;">选择</a> 
	<div id="${id}_container_filelist" class="upload-ok-con">您的浏览器不支持Flash或者HTML5.</div>
</div>

<script type="text/javascript">
var container ="${id}_" + "<%=uuid%>";
var format = "jpg,gif,png,jpeg,zip,rar,doc,docx";
var _format = "${format}";
if(_format != ""){
	format = _format;
}
var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : '${id}_pickfiles', // you can pass an id...
	container: document.getElementById(container), // ... or DOM Element itself
	url : '<%=picUrl%>/fileUploadServlet?name='+container,
	flash_swf_url : 'plupload/js/Moxie.swf',
	silverlight_xap_url : 'plupload/js/Moxie.xap',
	filelist:'${id}_container_filelist',
	allowDelete:true,
  	allowUpload:true,
	filters : {
		max_file_size : '10mb',
		mime_types: [
			{title : "format", extensions : format},
		]
	},
	init: {
 		PostInit: function() {
 			var f = document.getElementById('${id}_container_filelist');
			f.innerHTML = '';
 		},
 		FilesAdded: function(up, files) {
 			plupload.each(files, function(file) {
 				document.getElementById(up.getOption('filelist')).innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
 			});
 			up.start();
 		},
 		UploadProgress: function(up, file) {
 			document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
 		},
 		UploadComplete: function(up, files) {
 		  	plupload.each(files, function(file) {
 		  		var result =/\.[^\.]+/.exec(file.name);
 		      	var imgurl = "<%=url%>/"+container+result;
 		      	callback(imgurl);
 		  	});
 		  	up.destroy();
 		},
 		Error: function(up, err) {
 			//document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
 			alert(err.message);
 		}
 	}
});

uploader.init();

</script>