
package com.sys.service.shiro;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.drools.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.nky.entity.doctor.DoctorEntity;
import com.nky.entity.hospital.HospitalAdminEntity;
import com.nky.service.doctor.DoctorService;
import com.nky.service.hospital.HospitalService;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.LoginAttribute;
import com.sys.entity.sys.SysAuth;
import com.sys.entity.sys.SysUser;
import com.sys.service.sys.SysAuthService;
import com.sys.service.sys.SysRoleAuthorityService;
import com.sys.service.sys.SysUserService;
import com.sys.singleton.AuthoritySingleton;

/**
 * Authorization authentication
 *   
 */
public class AuthenticationRealm extends AuthorizingRealm {

	@Autowired
	private SysUserService sysUserService;
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private HospitalService hospitalService;
	@Autowired
	SysAuthService sysAuthService;

	@Autowired
	SysRoleAuthorityService sysRoleAuthorityService;

	/**
	 * Get authentication information
	 * 
	 * @param token
	 *            token
	 * @return Authentication information
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(org.apache.shiro.authc.AuthenticationToken token) {
		AuthenticationToken authenticationToken = (AuthenticationToken) token;
		String username = authenticationToken.getUsername();
		char[] pwdChars = authenticationToken.getPassword();
		String type = authenticationToken.getType();

		if (username == null || pwdChars == null)
			throw new UnknownAccountException();

		String password = new String(authenticationToken.getPassword());

		Session session = SecurityUtils.getSubject().getSession();

		LoginEntity loginEntity = new LoginEntity();

		//sys    后台系统登录
		if ("sys".equals(type)) {
			SysUser user = new SysUser();
			user.setUserMail(username.trim());
			user.setUserPwd(password);
			SysUser currentUser = sysUserService.getLoginInfo(user);
			if (currentUser.getUserId() == 0 || currentUser.getUserId() == -1) {
				throw new UnknownAccountException();
			}
			loginEntity.setIsvalid("1");
			loginEntity.setId(currentUser.getUserId());
			loginEntity.setCodeId(currentUser.getSys_id());
			loginEntity.setName(currentUser.getUserName());
			loginEntity.setType("S");
			loginEntity.setSysUser(currentUser);
			loginEntity.setRoles(currentUser.getRoleId());
		} else if ("doctor".equals(type)) {
			DoctorEntity currentUser = doctorService.getDoctor(username, password);
			if (currentUser == null || StringUtils.isEmpty(currentUser.getCode())) {
				throw new UnknownAccountException();
			}
			loginEntity.setIsvalid(currentUser.getIsvalid() + "");
			loginEntity.setId(Integer.parseInt(currentUser.getId().toString()));
			loginEntity.setCodeId(currentUser.getCode());
			loginEntity.setName(currentUser.getName());
			loginEntity.setType("D");
			loginEntity.setDoctor(currentUser);
			loginEntity.setRoles("3"); //Corresponding role table Temporary dead value
		} else if ("hospital".equals(type)) {
			HospitalAdminEntity currentUser = hospitalService.getAdmin(username, password);
			if (currentUser == null || StringUtils.isEmpty(currentUser.getHospital_code())) {
				throw new UnknownAccountException();
			}
			loginEntity.setIsvalid(currentUser.getIsvalid() + "");
			loginEntity.setId(Integer.parseInt(currentUser.getId().toString()));
			//医院用户codeId  用医院code+用户id
			loginEntity.setCodeId(currentUser.getHospital_code() + "_" + currentUser.getId());
			loginEntity.setName(currentUser.getTel());
			loginEntity.setType("H");
			loginEntity.setHospital(currentUser);
			loginEntity.setRoles("2"); //Corresponding role table Temporary dead value
		}

		session.setAttribute(LoginAttribute.ATTRIBUTE_USER, loginEntity);
		List<SysAuth> list = AuthoritySingleton.getInstance().getSysAuthList();
		session.setAttribute("authList", list);
		session.setAttribute("kaptchaEbabled", false);

		return new SimpleAuthenticationInfo(
				new Principal(loginEntity.getId(), loginEntity.getCodeId(), username, loginEntity.getRoles()), password,
				getName());

	}

	/**
	 * Access authorization information
	 * 
	 * @param principals
	 *            principals
	 * @return Authorization information
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		Principal principal = (Principal) principals.fromRealm(getName()).iterator().next();
		if (principal != null) {
			String roleId = principal.getRoleId();
			//查询权限表  获取具备该角色的所有权限 放入集合中
			List<String> list = sysRoleAuthorityService.getAuthorityByRoleId(roleId);
			SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
			//			authorizationInfo.addStringPermission("sysRole:show");
			//			authorizationInfo.addStringPermission("sysUser:show");
			//			authorizationInfo.addStringPermission("sysAuth:show");
			for (String a : list) {
				authorizationInfo.addStringPermission(a);
			}

			return authorizationInfo;
		}
		return null;
	}

	/**
	 * Update user authorization information cache.
	 */
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
		clearCachedAuthorizationInfo(principals);
	}

	/**
	 * Clear all user authorization information cache.
	 */
	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			for (Object key : cache.keys()) {
				cache.remove(key);
			}
		}
	}

}