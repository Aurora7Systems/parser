import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Parser from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwNewsGovHkExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.news.gov.hk/chi/2024/05/20240531/20240531_144119_521.html?type=category&name=finance';
      const html = fs.readFileSync(
        './fixtures/www.news.gov.hk/1717258806703.html'
      );
      result = Parser.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.news.gov.hk/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `陳茂波訪矽谷科企`);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.news.gov.hk/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2024-05-31T09:10:00.000Z`);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.news.gov.hk/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `http://www.news.gov.hk/chi/2024/05/20240531/20240531_144119_521/images/20240531153032145.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.news.gov.hk/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        '財政司司長陳茂波昨日完成最後一日訪問美國三藩市的行程，到訪矽谷兩家科技公司。 兩家科技公司分別從事科硏，以及回收塑料循環再用的業務。陳茂波到訪時聽取科企人員介紹專利技術，並參觀研發設施。其間，陳茂波向他們介紹香港推動創科發展的政策，以及吸引企業和人才的措施，鼓勵他們到香港設立研發和生產基地，利用香港作為開拓內地以至亞洲市場的平台。 同晚，陳茂波出席由加州---中國氣候研究院舉辦的酒會，與出席中美灣區對話和中美地方氣候行動高級別活動的中外嘉賓交流。 陳茂波今日啟程回港，明早抵港。'
      );
    });
  });
});
