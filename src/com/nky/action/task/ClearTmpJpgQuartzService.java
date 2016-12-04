package com.nky.action.task;

import java.io.File;
import java.util.Calendar;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Clean up filesjob.
 * @author Ken
 * @version 2016year10month28day
 */
//@Component
public class ClearTmpJpgQuartzService {

	Logger LOG = LoggerFactory.getLogger(this.getClass());
	
//	@Scheduled(fixedRate=3000)  // 每隔5分钟执行一次
	//@Scheduled(cron = "10 * * * * ?") //
	public void start() throws ServletException {
		LOG.debug("Clean out expiredecgTemporary filejob == begin");
//		SpringContextUtil.getApplicationContext().getResource(arg0)
		String classPath =Thread.currentThread().getContextClassLoader().getResource("").toString();
		LOG.debug("classPathCatalog："+classPath);
		String temp = classPath.substring(0, classPath.indexOf("WEB-INF"));
		temp = temp.replace("file:/", "");
		temp += "temp/ecg";
		LOG.debug("ecgTemporary directory："+temp);
		File folder = new File(temp);
		if(folder.exists()){
			File[] ff = folder.listFiles();
			if(ff != null && ff.length>0){
				Calendar cNow = Calendar.getInstance();
				LOG.debug("Now is {}",cNow);
				cNow.set(Calendar.MINUTE, cNow.get(Calendar.MINUTE) - 5);
				LOG.debug("Five minute is {}",cNow);
				for(File f : ff){
					Calendar c = Calendar.getInstance();
					c.setTimeInMillis(f.lastModified());
					String name = f.getName();
					if(c.before(cNow)){
						if(f.isDirectory()){
							File [] fs = f.listFiles();
							if(fs != null){
								for(File ft : fs){
									boolean flag2 = ft.delete();
									LOG.info("file {} Already exist5More minutes，delete: {}",new Object[]{name,flag2});
								}
							}
							
							boolean flag = f.delete();
							LOG.info("Folder {} Already exist5More minutes，delete: {}",new Object[]{name,flag});
						}else{
							boolean flag = f.delete();
							LOG.info("file {} Already exist5More minutes，delete: {}",new Object[]{name,flag});
						}
					}
				}
			}
		}
		LOG.debug("Clean out expiredecgTemporary filejob == end");
	}

}