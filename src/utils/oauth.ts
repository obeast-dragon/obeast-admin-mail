import * as CryptoJS from "crypto-js";

/**
 * ase加密
 * @param data 数据
 * @param cryptoKey 加密密钥
 * @returns 加密数据
 */
export const aes = (data: string, cryptoKey: string) => {
	const key = CryptoJS.enc.Latin1.parse(cryptoKey);
	let iv = key;
	// 加密
	let encrypted = CryptoJS.AES.encrypt(data, key, {
		iv: iv,
		mode: CryptoJS.mode.CFB,
		padding: CryptoJS.pad.NoPadding
	});
	return encrypted.toString();
};

/**
 * base64 加密
 * @param data 数据
 * @returns 加密数据
 */
export const base64 = (data: string) => {
	return window.btoa(data);
};
