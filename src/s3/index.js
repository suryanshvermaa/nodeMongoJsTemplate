import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import s3client from "../config/s3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";

const Bucket = process.env.S3_BUCKET;
/**
 *
 * @param {string} object
 * @returns {string} uploading signedUrl
 */
export const objectUploadURL = async (object) => {
	return new Promise(async (resolve, reject) => {
		const putObjectCommand = new PutObjectCommand({
			Bucket,
			Key: `${Date.now().toString() + object}`,
		});
		const signedUrl = await getSignedUrl(s3client, putObjectCommand, {
			expiresIn: 60 * 5,
		});
		if (!signedUrl) reject("signed url not found");
		resolve(signedUrl);
	});
};

/**
 *
 * @param {string} objectUrl
 * @param {number} time time in seconds
 * @returns {Promise<string>} returns signed url
 */
export const signedUrl = async (objectUrl, time) => {
	return new Promise(async (resolve, reject) => {
		const getObjectCommand = new GetObjectCommand({
			Bucket,
			Key: objectUrl,
		});
		const signedImageUrl = await getSignedUrl(s3client, getObjectCommand, {
			expiresIn: 60 * time,
		});
		if (!signedImageUrl) reject("signed url not found");
		resolve(signedImageUrl);
	});
};

/**
 *
 * @param {string} objectUrl
 * @returns {Promise<boolean>} returns true if object deleted
 */
export const deleteObject = async (objectUrl) => {
	return new Promise(async (resolve, reject) => {
		try {
			const deleteObjectCommand = new DeleteObjectCommand({
				Bucket,
				Key: objectUrl,
			});
			await s3client.send(deleteObjectCommand);
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
};
