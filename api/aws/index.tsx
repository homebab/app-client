import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import {CameraCapturedPicture} from "expo-camera";
import {v4 as uuidv4} from "uuid";
// @ts-ignore
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from 'react-native-dotenv'
import {S3} from "aws-sdk";

const bucket = 'omtm-production';
const prefix = 'app-service/client/images/';

export const uploadImageOnS3 = (picture: CameraCapturedPicture) => new Promise(async (resolve, reject) => {
    const filename = `${uuidv4()}.jpg`;

    const key = prefix + filename;

    const s3bucket = new S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        // @ts-ignore
        Bucket: bucket, // process.env.BUCKET_NAME,
        signatureVersion: 'v4',
    });

    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + filename + '"';

    console.log(key)
    const response: Response = await fetch(picture.uri);
    const blob: Blob = await response.blob();
    s3bucket.createBucket(_ => {
        const params: S3.Types.PutObjectRequest = {
            Bucket: bucket, // process.env.BUCKET_NAME,
            Key: key,
            Body: blob,
            ACL: "public-read",
            ContentDisposition: contentDeposition,
            ContentType: contentType,
            // CacheControl: "no-cache"
        };
        s3bucket.upload(params, (err: Error, data: ManagedUpload.SendData) => {
            if (err) {
                console.warn('[omtm]: fail to upload the image to s3 with ', err);
                reject(err);
            } else {
                console.log(`[omtm]: success to upload the image to s3 URL '${data.Location}'`);
                resolve(data.Location);
            }
        });
    });
});

export const deleteImageOnS3 = () => {
    const s3bucket = new S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        // @ts-ignore
        Bucket: bucket, // process.env.BUCKET_NAME,
        signatureVersion: 'v4',
    });
}