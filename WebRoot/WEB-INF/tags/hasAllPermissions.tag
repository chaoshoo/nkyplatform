<%@ tag import="org.apache.shiro.util.StringUtils" %>
<%@ tag import="org.apache.shiro.SecurityUtils" %>
<%@ tag pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ attribute name="name" type="java.lang.String" required="true" description="Authorization string list" %>
<%@ attribute name="delimiter" type="java.lang.String" required="false" description="Authorization string list separator" %><%

    if(!StringUtils.hasText(delimiter)) {
        delimiter = ",";//Default comma separated
    }

    if(!StringUtils.hasText(name)) {
%>
        <jsp:doBody/>
<%
        return;
    }

    String[] roles = name.split(delimiter);

    if(!SecurityUtils.getSubject().isPermittedAll(roles)) {
        return;
    } else {
%>
        <jsp:doBody/>
<%
    }
%>