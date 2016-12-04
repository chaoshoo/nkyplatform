package com.sys.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;

public class HttpClient {
	/**
	 * Splice into oneurlAnd then automatically request theurl
	 * 
	 * @return
	 * @throws IOException
	 */
	public static String PushForHttp(String url) {
		// 拼凑get请求的URL字串，使用URLEncoder.encode对特殊和不可见字符进行编码
		// &tpl_value=%23OrderNO%23%3d
		try {
			URL getUrl = new URL(url);
			// 根据拼凑的URL，打开连接，URL.openConnection()函数会根据
			// URL的类型，返回不同的URLConnection子类的对象，在这里我们的URL是一个http，因此它实际上返回的是HttpURLConnection
			HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-type", "text/html");
			connection.setRequestProperty("Accept-Charset", "utf-8");
			connection.setRequestProperty("contentType", "utf-8");
			connection.setConnectTimeout(3000);
			// 建立与服务器的连接，并未发送数据
			connection.connect();
			// 发送数据到服务器并使用Reader读取返回的数据
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
			String lines = ""; // Define return value
			String infoString = "";
			while ((lines = reader.readLine()) != null) {
				infoString += lines;
			}
			// 断开连接
			reader.close();
			connection.disconnect();
			return infoString;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return "";
	}

	private static org.apache.http.client.HttpClient getHttpClient(int port) {
		PoolingClientConnectionManager pcm = new PoolingClientConnectionManager();
		SSLContext ctx = null;
		try {
			ctx = SSLContext.getInstance("TLS");
			X509TrustManager x509 = new X509TrustManager() {
				public void checkClientTrusted(X509Certificate[] xcs, String string) throws CertificateException {
				}

				public void checkServerTrusted(X509Certificate[] xcs, String string) throws CertificateException {
				}

				public X509Certificate[] getAcceptedIssuers() {
					return null;
				}
			};
			ctx.init(null, new TrustManager[] { x509 }, null);
		} catch (Exception e) {
			e.printStackTrace();
		}

		SSLSocketFactory ssf = new SSLSocketFactory(ctx, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
		Scheme sch = new Scheme("https", port, ssf);
		pcm.getSchemeRegistry().register(sch);
		return new DefaultHttpClient(pcm);
	}

	public static String postXMLBody(String url, String xmlbody) {
		String result = null;
		HttpPost post = new HttpPost(url);
		try {
			post.setHeader("Content-type", "application/xml;charset=GBK");

			post.setEntity(new StringEntity(xmlbody,"GBK"));
			
			System.out.println("[HttpUtils Post] begin invoke url:" + url + " , params:" + xmlbody);
			
			org.apache.http.client.HttpClient httpclient = getHttpClient(80);

			HttpResponse response = httpclient.execute(post);

			StatusLine statusLine = response.getStatusLine();
			int statusCode = statusLine.getStatusCode();
			if (statusCode != 200) {
				return result;
			}
			StringBuffer sb = new StringBuffer();
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				InputStream instream = entity.getContent();
				BufferedReader br = new BufferedReader(new InputStreamReader(instream, "GBK"));
				String line;
				while ((line = br.readLine()) != null) {
					sb.append(line);
				}
				result = sb.toString();
				System.out.println("response result:" + result);
				try {
				} finally {
					instream.close();
				}
			}
		} catch (Exception e) {
			System.out.println("Exception" + e);
		} finally {
			post.releaseConnection();
		}
		return result;
	}

}