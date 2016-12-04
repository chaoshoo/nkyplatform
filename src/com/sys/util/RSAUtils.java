/*
 */
package com.sys.util;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.Provider;
import java.security.PublicKey;
import java.security.SecureRandom;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.util.Assert;

/**
 * Utils - RSACrypto
 * 
 * @author lezu Team
 * @version 3.0
 */
public final class RSAUtils {

	/** Security Service Provider */
	private static final Provider PROVIDER = new BouncyCastleProvider();

	/** Key size */
	private static final int KEY_SIZE = 1024;

	/**
	 * Non instance
	 */
	private RSAUtils() {
	}

	/**
	 * Generating key pair
	 * 
	 * @return Key pair
	 */
	public static KeyPair generateKeyPair() {
		try {
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA", PROVIDER);
			keyPairGenerator.initialize(KEY_SIZE, new SecureRandom());
			return keyPairGenerator.generateKeyPair();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * encryption
	 * 
	 * @param publicKey
	 *            public key
	 * @param data
	 *            data
	 * @return Encrypted data
	 */
	public static byte[] encrypt(PublicKey publicKey, byte[] data) {
		Assert.notNull(publicKey);
		Assert.notNull(data);
		try {
			Cipher cipher = Cipher.getInstance("RSA", PROVIDER);
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			return cipher.doFinal(data);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * encryption
	 * 
	 * @param publicKey
	 *            public key
	 * @param text
	 *            Character string
	 * 
	 * @return Base64Code string
	 */
	public static String encrypt(PublicKey publicKey, String text) {
		byte[] data = encrypt(publicKey, text.getBytes());
		return data != null ? new String(Base64.encodeBase64(data)) : null;
	}

	/**
	 * Decrypt
	 * 
	 * @param privateKey
	 *            private key
	 * @param data
	 *            data
	 * @return Data after decryption
	 */
	public static byte[] decrypt(PrivateKey privateKey, byte[] data) {
		Assert.notNull(privateKey);
		Assert.notNull(data);
		try {
			Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding", PROVIDER);
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			return cipher.doFinal(data);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * Decrypt
	 * 
	 * @param privateKey
	 *            private key
	 * @param text
	 *            Base64Code string
	 * @return Data after decryption
	 */
	public static String decrypt(PrivateKey privateKey, String text) {
		byte[] data = decrypt(privateKey, Base64.decodeBase64(text.getBytes()));
		return data != null ? new String(data) : null;
	}

}