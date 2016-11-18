<%@ tag import="com.sys.singleton.DicSingleton" %>
<%@ tag import="java.util.List" %>
<%@ tag import="java.util.HashMap" %>
<%@ tag pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ attribute name="name" type="java.lang.String" required="true" description="角色列表" %>

<%
	List list = DicSingleton.getInstance().getDic(name);
	if(list!=null && list.size()>0){
	for(int i = 0;i<list.size();i++){
	HashMap	 map = (HashMap)list.get(i);


   
%>


  <option value="<%=map.get("dic_name").toString() %>" ><%=map.get("dic_value").toString() %></option>
        <jsp:doBody/>

       
<%
}
    }
%>