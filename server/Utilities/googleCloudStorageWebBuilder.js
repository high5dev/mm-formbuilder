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
        console.log('pageUrl----------------------', pageUrl);
        resolve(pageUrl);
      })
      pageStream.end(pageData);
    });
  };

  this.readPage = async(pageDirectory) => {
    configureBucketCors().catch(console.error);
    const pageDoc = bucket.file(`website-builder/${pageDirectory}/index.html`);
    const contents = await pageDoc.download();
    console.log('contents----------------', contents.toString());
    return contents;
  };

  this.copyPage = async(srcName, destName) => {
    configureBucketCors().catch(console.error);
    const destFile = bucket.file(`website-builder/${destName}/index.html`);
    const srcFile = bucket.file(`website-builder/${srcName}/index.html`);
    await srcFile.copy(destFile);
    const contents = await destFile.download();
    console.log('read copy contents----------------', contents.toString());
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
