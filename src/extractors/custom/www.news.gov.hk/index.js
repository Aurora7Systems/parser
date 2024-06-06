export const WwwNewsGovHkExtractor = {
  domain: 'www.news.gov.hk',

  title: {
    selectors: [
      'h1.news-title', // enter title selectors
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="date"]', 'value'], // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'], // enter selectors
    ],
  },

  content: {
    selectors: [
      '.newsdetail-content', // enter content selectors
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
