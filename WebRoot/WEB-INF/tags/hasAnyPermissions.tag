<%@ tag import="org.apache.shiro.util.StringUtils" %>
<%@ tag import="org.apache.shiro.SecurityUtils" %>
<%@ tag import="java.util.Arrays" %>
<%@ tag import="org.apache.shiro.subject.Subject" %>
<%@ tag pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ attribute name="name" type="java.lang.String" required="true" description="Authorization string list" %>
<%@ attribute name="delimiter" type="java.lang.String" required="false" description="Authorization string list separator" %>
<%

    if(!StringUtils.hasText(delimiter)) {
        delimiter = ",";//Default comma separated
    }

    if(!StringUtils.hasText(name)) {
%>
        <jsp:doBody/>
<%
        return;
    }

    String[] permissions = name.split(delimiter);
    Subject subject = SecurityUtils.getSubject();
    for(String permission : permissions) {
        if(subject.isPermitted(permission)) {
%>
            <jsp:doBody/>
<%
        break;
        }
    }
%>