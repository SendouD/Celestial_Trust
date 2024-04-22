const {S3}=require('aws-sdk');
require('dotenv').config();
const s3uploadV2=async(file)=>{
    const s3=new S3();
    const params={
        Bucket:`${process.env.TRUST_VERIFY_BUCKET}` ,
        Key:`${file.originalname}`,
        Body:file.buffer

    };
    const result= await s3.upload(params).promise();
    return result;

}

module.exports={s3uploadV2};