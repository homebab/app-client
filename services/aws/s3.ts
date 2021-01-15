import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import {CameraCapturedPicture} from "expo-camera";
// import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
// @ts-ignore
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from 'react-native-dotenv'
import {S3} from "aws-sdk";
import {AWSError} from "aws-sdk/lib/error";
import {DeleteObjectOutput} from "aws-sdk/clients/s3";

const bucket = 'omtm-production';
// TODO: Local Date Partitioning
const prefix = 'app-service/client/images/';

export const uploadImageOnS3 = (picture: CameraCapturedPicture) => new Promise<string>(async (resolve, reject) => {
    const filename = `${uuidv4()}.jpg`;
    const key = prefix + filename;

    // build s3 bucket
    const s3bucket = new S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        // @ts-ignore
        Bucket: bucket, // process.env.BUCKET_NAME,
        signatureVersion: 'v4',
    });

    const response: Response = await fetch(picture.uri);
    const blob: Blob = await response.blob();

    // upload image
    s3bucket.upload({
        Bucket: bucket, // process.env.BUCKET_NAME,
        Key: key,
        Body: blob,
        ACL: "public-read",
        ContentDisposition: 'inline;filename="' + filename + '"',
        ContentType: 'image/jpeg',
        // CacheControl: "no-cache"
    }, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
            console.warn('[HOMEBAB]: fail to upload the image to s3 with ', err);
            reject(err);
        } else {
            console.log(`[HOMEBAB]: success to upload the image to s3 URL '${data.Location}'`);
            resolve(data.Location);
        }
    });
});

export const deleteImageOnS3 = (imageUrl: string) => new Promise((resolve, reject) => {
    const key = prefix + imageUrl.split('/').filter(s => s.includes(".jpg"))[0]

    // build s3 bucket
    const s3bucket = new S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    });

    // delete image
    s3bucket.deleteObject({
        Bucket: bucket, // process.env.BUCKET_NAME,
        Key: key
    }, (err: AWSError, res: DeleteObjectOutput) => {
        if (err) {
            console.warn('[HOMEBAB]: fail to delete the image on s3 with ', err);
            reject(err);
        } else {
            console.log(`[HOMEBAB]: success to delete the image on s3 URL '${imageUrl}' with ` + JSON.stringify(res));
            resolve(res);
        }
    });
});