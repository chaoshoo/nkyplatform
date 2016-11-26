<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Ning Kang Yuan management platform</title>
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/auth/dicDefine_list.js"></script>
    </head>
    <body>
        <div id="main">
            <form action="dicDefine/aa.html" method="post">
                <div id="data">            
                    <table width="100%" border="1" cellpadding="0" cellspacing="0">
                    <thead class="list_banner">
                        <tr>
                            <td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">Dictionary definition code</span>
							</td>
							<td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">Dictionary attribute code</span>
							</td>
							<td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">Dictionary attribute value</span>
							</td>
							<td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">Dictionary description</span>
							</td>
							<td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">Dictionary description1</span>
							</td>
							<td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">Affiliated name</span>
							</td>
							<td width="15%">
								<a class="hd_line"></a>
								<span class="hd_name">operation</span>
							</td>
                        </tr>  
                        </thead>
						<tbody class="list_table"> 
                        <c:forEach items="${list}" var="a">
                        <tr>
                            <td >${a.dicType}</td>
                            <td >${a.dicName}</td>
                            <td >${a.dicValue}</td>
                            <td >${a.dicRemark}</td>
                            <td >${a.dicRemark1}</td>
                             <td >${a.belongName}</td>
                            <td>
                            <input type="button"  value="delete" onclick="del(${a.id})" />
							</td>
                            </tr>
                        </c:forEach>
                        </tbody>                   
                    </table>
                </div>
            </form>
    </body>
</html>