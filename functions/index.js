const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');
const admin = require('firebase-admin');

admin.initializeApp();

exports.crawlNamiBlog = functions.https.onRequest(async (request, response) => {
  const baseUrl = 'https://www.nami.org/blogs/nami-blog/';
  let currentPage = 1;
  const maxPages = 64;
  const db = admin.firestore();
  const keywords = ['anxiety', 'depression', 'stress', 'mental health', 'ocd'];

  try {
    while (currentPage <= maxPages) {
      const url = `${baseUrl}page/${currentPage}/`;
      console.log(`Crawling: ${url}`);

      const res = await axios.get(url);
      const $ = cheerio.load(res.data);

      const promises = [];

      $('div.flex').each((index, div) => {
        const pTag = $(div).find('p');
        const aTag = $(div).find('a');
        const imgTag = $(div).find('img');

        if (pTag.length > 0 && aTag.length > 0) {
          const title = pTag.text().trim();
          const link = aTag.attr('href');
          const imgUrl = imgTag.attr('src');

          if (link) {
            const foundKeywords = keywords.filter(keyword => title.toLowerCase().includes(keyword));
            if (foundKeywords.length > 0 && imgUrl) {
              const linkData = { title: title, href: link, img: imgUrl, keywords: foundKeywords };

              const linkDoc = db.collection('namiBlogLinks').where('href', '==', link).limit(1);
              promises.push(linkDoc.get().then(snapshot => {
                if (snapshot.empty) {
                  return db.collection('namiBlogLinks').add(linkData).then(() => {
                    console.log(`Link added to Firestore: ${link}`);
                  }).catch(firestoreError => {
                    console.error(`Error adding link to Firestore: ${firestoreError}`);
                  });
                } else {
                  console.log(`Link already exists: ${link}`);
                  return Promise.resolve();
                }
              }));
            }
          }
        }
      });

      await Promise.all(promises);
      currentPage++;
    }

    response.status(200).send('Crawling and Firestore update completed.');
  } catch (error) {
    console.error('Error during crawling:', error);
    response.status(500).send(`An error occurred: ${error.message}`);
  }
});