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

const configureBucketCors = async() => {
  await bucket.setCorsConfiguration([
    {
      method: ["GET", "POST", "HEAD"],
      origin: ["*"],
      responseHeader: ["*"],
    },
  ]);
};

const deleteFolder = async(folder) => {
  const [files] = await bucket.getFiles({ prefix: `${folder}/` });
  await Promise.allSettled(files.map(file => file.delete({ ignoreNotFound: true })))
};

function googleCloudStorageWebBuilder() {

  this.createAndUpdatePage = async(pageDirectory, pageData) => {
    configureBucketCors().catch(console.error);
    const pageDoc = bucket.file(`website-builder/${pageDirectory}/index.html`);
    const pageStream = pageDoc.createWriteStream({ resumable: false });
    return new Promise((resolve, reject) => {
      pageStream.on("error", (err) => {
        reject(err);
        console.log('error---------------------------')
      });
      pageStream.on("finish", () => {
        const pageUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${pageDoc.name}`;
        resolve(pageUrl);
      })
      pageStream.end(pageData);
    });
  };

  this.uploadMenuImage = async(filePath, fileName) => {
    configureBucketCors().catch(console.error);
    const pageDoc = bucket.file(`website-builder/menu-image/${fileName}`);
    const fileBuffer = fs.readFileSync(filePath);
    await pageDoc.save(fileBuffer);
    return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${pageDoc.name}`;
  }

  this.upload = (file, websiteId) => {
    const fileName = file.originalname.replace(/ /g, "-");
    const newFileName = `${uuidv4()}-${fileName}`;
    const doc = bucket.file(`website-builder/${websiteId}/library/${newFileName}`);   

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

  this.getWebsiteImageUrls = async(websiteId) => {
    const imageUrls = [];
    await bucket.getFiles({ prefix: `website-builder/${websiteId}/library`, autoPaginate: false }).then((imageFiles) => {
      if (imageFiles && imageFiles[0]?.length > 0) {
        for (i = 0; i < imageFiles[0].length; i++) {
          imageUrls.push(`https://storage.googleapis.com/${process.env.GCS_BUCKET}/${imageFiles[0][i].name}`);
        }
      }
    });
    return imageUrls;
  };

  this.readPage = async(pageDirectory) => {
    configureBucketCors().catch(console.error);
    const pageDoc = bucket.file(`website-builder/${pageDirectory}/index.html`);
    const contents = await pageDoc.download();
    return contents.toString();
  };

  this.copyPage = async(srcName, destName) => {
    configureBucketCors().catch(console.error);
    const destFile = bucket.file(`website-builder/${destName}/index.html`);
    const srcFile = bucket.file(`website-builder/${srcName}/index.html`);
    await srcFile.copy(destFile);
    const contents = await destFile.download();
    return contents;
  };

  // eslint-disable-next-line consistent-return
  this.deletePage = async (fileName) => {
    if (bucket.file(`website-builder/${fileName}/index.html`).exists()) {
      // eslint-disable-next-line no-inner-declarations
      async function deleteFile() {
        return bucket.file(`website-builder/${fileName}/index.html`).delete();
      }
      // eslint-disable-next-line no-console
      return deleteFile().catch(console.error);
    }
  };

  this.deleteWeb = (webName) => {
    deleteFolder(`website-builder/${webName}`);
  };
}

module.exports = new googleCloudStorageWebBuilder();
