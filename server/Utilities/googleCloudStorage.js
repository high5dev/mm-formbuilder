require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const gcsJson = require("./mad-for-chicken-243518-28ef1834055d");
var fs = require("fs");
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: gcsJson,
});
const bucket = storage.bucket(process.env.GCS_BUCKET);

function GoogleCloudStorage() {
  this.upload = (file) => {
    const fileName = file.originalname.replace(/ /g, "-");
    const newFileName = `${uuidv4()}-${fileName}`;
    const doc = bucket.file(`my-manager/${newFileName}`);

    const blogStream = doc.createWriteStream({ resumable: false });
    async function configureBucketCors() {
      await bucket.setCorsConfiguration([
        {
          method: ["GET", "POST", "HEAD"],
          origin: ["*"],
          responseHeader: ["*"],
        },
      ]);
    }

    // eslint-disable-next-line no-console
    configureBucketCors().catch(console.error);

    return new Promise((resolve, reject) => {
      blogStream.on("error", (err) => reject(err));
      blogStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`;
        resolve(publicUrl);
      });
      blogStream.end(file.buffer);
    });
  };
  this.uploadBlob = async (filePath,fileName) => {
    //const fileName = file.originalname.replace(/ /g, "-");
    const newFileName = `${uuidv4()}-${fileName}`;
    const doc = bucket.file(`my-manager/${newFileName}`);
    const fileBuffer = fs.readFileSync(filePath);
    await doc.save(fileBuffer);
    async function configureBucketCors() {
      await bucket.setCorsConfiguration([
        {
          method: ["GET", "POST", "HEAD"],
          origin: ["*"],
          responseHeader: ["*"],
        },
      ]);
    }

    // eslint-disable-next-line no-console
    configureBucketCors().catch(console.error);
    return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`;
  };
  this.uploadBuffer = async (buffer,fileName) => {
    //const fileName = file.originalname.replace(/ /g, "-");
    const newFileName = `${uuidv4()}-${fileName}`;
    const doc = bucket.file(`my-manager/${newFileName}`);
    
    const stream = doc.createWriteStream({
      metadata: {
        contentType: 'application/pdf' // Set the content type if you know it
      }
    });

    async function configureBucketCors() {
      await bucket.setCorsConfiguration([
        {
          method: ["GET", "POST", "HEAD"],
          origin: ["*"],
          responseHeader: ["*"],
        },
      ]);
    }
    return new Promise((resolve, reject) => {
      stream.on("error", (err) => reject(err));
      stream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`;
        resolve(publicUrl);
      });
      stream.end(buffer);
    });
   
    // eslint-disable-next-line no-console
    // configureBucketCors().catch(console.error);
    // return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${doc.name}`;
  };
  

  // eslint-disable-next-line consistent-return
  this.delete = async (fileName) => {
    if (bucket.file(fileName).exists()) {
      // eslint-disable-next-line no-inner-declarations
      async function deleteFile() {
        return bucket.file(fileName).delete();
      }
      // eslint-disable-next-line no-console
      return deleteFile().catch(console.error);
    }
  };
}

module.exports = new GoogleCloudStorage();
