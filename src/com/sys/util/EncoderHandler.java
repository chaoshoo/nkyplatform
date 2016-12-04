package com.sys.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import jp.sourceforge.qrcode.QRCodeDecoder;
import jp.sourceforge.qrcode.exception.DecodingFailedException;

import com.swetake.util.Qrcode;

public class EncoderHandler {
	/**
	 * Generate two-dimensional code(QRCode)picture
	 * @param content Storage content
	 * @param imgPath Image path
	 */
	public void encoderQRCode(String content, String imgPath) {
		this.encoderQRCode(content, imgPath, "png", 14);
	}

	/**
	 * Generate two-dimensional code(QRCode)picture
	 * @param content Storage content
	 * @param output output stream
	 */
	public void encoderQRCode(String content, OutputStream output) {
		this.encoderQRCode(content, output, "png", 14);
	}

	/**
	 * Generate two-dimensional code(QRCode)picture
	 * @param content Storage content
	 * @param imgPath Image path
	 * @param imgType Picture type
	 */
	public void encoderQRCode(String content, String imgPath, String imgType) {
		this.encoderQRCode(content, imgPath, imgType, 14);
	}

	/**
	 * Generate two-dimensional code(QRCode)picture
	 * @param content Storage content
	 * @param output output stream
	 * @param imgType Picture type
	 */
	public void encoderQRCode(String content, OutputStream output, String imgType) {
		this.encoderQRCode(content, output, imgType, 14);
	}

	/**
	 * Generate two-dimensional code(QRCode)picture
	 * @param content Storage content
	 * @param imgPath Image path
	 * @param imgType Picture type
	 * @param size Two-dimensional code size
	 */
	public void encoderQRCode(String content, String imgPath, String imgType, int size) {
		try {
			BufferedImage bufImg = this.qRCodeCommon(content, imgType, size);
			File imgFile = new File(imgPath);
			// 生成二维码QRCode图片
			ImageIO.write(bufImg, imgType, imgFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Generate two-dimensional code(QRCode)picture
	 * @param content Storage content
	 * @param output output stream
	 * @param imgType Picture type
	 * @param size Two-dimensional code size
	 */
	public void encoderQRCode(String content, OutputStream output, String imgType, int size) {
		try {
			BufferedImage bufImg = this.qRCodeCommon(content, imgType, size);
			// 生成二维码QRCode图片
			ImageIO.write(bufImg, imgType, output);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Generate two-dimensional code(QRCode)Public method of image
	 * @param content Storage content
	 * @param imgType Picture type
	 * @param size Two-dimensional code size
	 * @return
	 */
	private BufferedImage qRCodeCommon(String content, String imgType, int size) {
		BufferedImage bufImg = null;
		try {
			Qrcode qrcodeHandler = new Qrcode();
			// 设置二维码排错率，可选L(7%)、M(15%)、Q(25%)、H(30%)，排错率越高可存储的信息越少，但对二维码清晰度的要求越小
			qrcodeHandler.setQrcodeErrorCorrect('M');
			qrcodeHandler.setQrcodeEncodeMode('B');
			// 设置设置二维码尺寸，取值范围1-40，值越大尺寸越大，可存储的信息越大
			// ，也象征着二维码的信息容量；二维码可以看成一个黑白方格矩阵，版本不同，矩阵长宽
			// //方向方格的总数量分别不同，版本1为21*21矩阵，版本每增1，二维码的两个边长都增4；所以版本//7为45*45的矩阵；最高版本为是40，是177*177的矩阵；
			qrcodeHandler.setQrcodeVersion(size);
			// 获得内容的字节数组，设置编码格式
			byte[] contentBytes = content.getBytes("utf-8");
			// 图片尺寸
			int imgSize = 67 + 12 * (size - 1);
			bufImg = new BufferedImage(imgSize, imgSize, BufferedImage.TYPE_INT_RGB);
			Graphics2D gs = bufImg.createGraphics();
			// 设置背景颜色
			gs.setBackground(Color.WHITE);
			gs.clearRect(0, 0, imgSize, imgSize);
			// 设定图像颜色> BLACK
			gs.setColor(Color.BLACK);
			// 设置偏移量，不设置可能导致解析出错
			int pixoff = 2;
			// 输出内容> 二维码
			if (contentBytes.length > 0 && contentBytes.length < 800) {
				boolean[][] codeOut = qrcodeHandler.calQrcode(contentBytes);
				for (int i = 0; i < codeOut.length; i++) {
					for (int j = 0; j < codeOut.length; j++) {
						if (codeOut[j][i]) {
							gs.fillRect(j * 3 + pixoff, i * 3 + pixoff, 3, 3);
						}
					}
				}
			} else {
				throw new Exception("QRCode content bytes length = " + contentBytes.length + " not in [0, 800].");
			}
			gs.dispose();
			bufImg.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bufImg;
	}

	/**
	 * Analytic two-dimensional code（QRCode）
	 * @param imgPath Image path
	 * @return
	 */
	public String decoderQRCode(String imgPath) {
		// QRCode 二维码图片的文件
		File imageFile = new File(imgPath);
		BufferedImage bufImg = null;
		String content = null;
		try {
			bufImg = ImageIO.read(imageFile);
			QRCodeDecoder decoder = new QRCodeDecoder();
			content = new String(decoder.decode(new QRCoderImage(bufImg)), "utf-8");
		} catch (IOException e) {
			System.out.println("Error: " + e.getMessage());
			e.printStackTrace();
		} catch (DecodingFailedException dfe) {
			System.out.println("Error: " + dfe.getMessage());
			dfe.printStackTrace();
		}
		return content;

	}

	/**
	 * Analytic two-dimensional code（QRCode）
	 * @param input Input stream
	 * @return
	 */

	public String decoderQRCode(InputStream input) {
		BufferedImage bufImg = null;
		String content = null;
		try {
			bufImg = ImageIO.read(input);
			QRCodeDecoder decoder = new QRCodeDecoder();
			content = new String(decoder.decode(new QRCoderImage(bufImg)), "utf-8");
		} catch (IOException e) {
			System.out.println("Error: " + e.getMessage());
			e.printStackTrace();
		} catch (DecodingFailedException dfe) {
			System.out.println("Error: " + dfe.getMessage());
			dfe.printStackTrace();
		}
		return content;
	}

	public static void main(String[] args) {
		String imgPath = "d:/test.bmp"; // Generate two-dimensional code image storage address and name
		String encoderContent = "http://127.0.0.1:8080/lezui/mobile/interface.do?content={namespace:'orderPay',type:'qryQRCoderOrderPayInfo',orderActionId:'DA2351050120'}"; // Contents of two-dimensional code display
		EncoderHandler handler = new EncoderHandler();
		handler.encoderQRCode(encoderContent, imgPath, "png");
		try {
			OutputStream output = new FileOutputStream(imgPath);
			handler.encoderQRCode(encoderContent, output);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("========encoder success");
		String decoderContent = handler.decoderQRCode(imgPath);
		System.out.println("解析结果如下：");
		System.out.println(decoderContent);
		System.out.println("========decoder success!!!");
	}
}