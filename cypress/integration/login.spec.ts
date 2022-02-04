/// <reference path="../support/global.d.ts"/>
/// <reference types="cypress" />

// const companies = [
//   'Panorays',
//   'Cybersaint',
//   'UpGuard',
//   'Balbix',
//   'RiskRecon',
//   'Whistic',
//   'CyberGRX',
//   'Lifars',
//   'Praetorian',
//   'Prevalent',
//   'SecurityScoreCard',
//   'BitSight',
//   'OneTrust',
//   'Sharedassessments',
//   'Trustnetinc',
//   'BlackKite',
//   'ThirdPartyTrust',
//   'BlueVoyant',
//   'StrikeGraph',
//   'SecurityTrails',
//   'Vendict',
//   'Helios',
//   'RiskLedger',
//   'RecordedFuture',
//   'ProcessUnity',
//   'NQC',
//   'Aptible',
//   'ZenGRC',
//   'SafeBas',
//   'SecurityPal',
//   'Venminder',
//   'ISS',
//   'FICO',
//   'RiskIQ',
//   'Qualys',
//   'STACKSI',
//   'StackSi',
//   'Itrust',
//   'CYRATING',
//   'Cyrating',
//   'Lockpath',
//   'XQcyber',
//   'VenMinder',
//   'Trusight',
//   'SaiGlobal',
//   'RSAArcher',
//   'ProccessUnity',
//   'Aruvio',
//   'Aravo',
//   'Bwise',
//   'Miragin',
//   'Zartech',
//   'WolfPac',
//   'Verego',
//   'TrustMapp',
//   'TrustExchange',
//   'TraceSecurity',
//   'Tevora',
//   'SureCloud',
//   'ServiceNow',
// ];
const username = Cypress.env('username');
const password = Cypress.env('password');
const hashTag = Cypress.env('hashTag');

const arr = [];

const chooseArea = geoUrn => {
  cy.visit('https://www.linkedin.com/search/results/people/', {
    qs: { geoUrn },
  });
};

const dup = uniqueCount => {
  let count = {};
  uniqueCount.forEach(i => (count[i] = (count[i] || 0) + 1));

  let graph = [];

  Object.entries(count).forEach(([key, value]) => {
    const shortName = key.split(' ')[0].concat(key.split(' ')[1]);
    graph.push({ Letter: shortName, Freq: value });
  });

  const fileNameDate = date();
  cy.writeFile(`cypress/fixtures/${fileNameDate}.json`, graph);
  cy.writeFile(`cypress/fixtures/graph.json`, graph);
};

const collectFromPage = () => {
  cy.get('.entity-result__content-container')
    .each(block => {
      const entityOnPage = block.find('.entity-result__title-text').text();
      const sharedPersonName = entityOnPage.trim().split('View')[0];
      arr.push(sharedPersonName);
    })
    .then(() => cy.waitForResources());
};

const date = () => {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const companies = ['Panorays', 'Cybersaint', 'UpGuard', 'Balbix', 'RiskRecon'];

describe('linkedin', () => {
  before(() => cy.loginUi(username, password).waitForResources());

  it.only('count all users that shared', () => {
    cy.navigate(undefined, hashTag);
    cy.getTotalPageNumber();

    cy.get('@times')
      .then(time => {
        Cypress._.times(Number(time), n => {
          cy.navigate(String(n + 1), hashTag).then(() => collectFromPage());
          cy.log(`PAGE NUMBER: ${n}`);
        });
      })
      .then(() => dup(arr));
  });

  it.skip('clicks for likes', () => {
    // chooseArea(101620260); // israel
    // cy.get('.app-aware-link').then(el => {
    //   el.eq(0).find('href');
    // });
    // https://www.linkedin.com/in/narjes-abdalhady/recent-activity/shares/
    // cy.fixture('/pipl/hr_arr_00-25_clean.json').then(link => {
    //   Cypress._.times(1, count => {
    //     cy.visit(`${link[count].href}recent-activity/shares/`).waitForResources();
    //     cy.scrollTo('bottom', { ensureScrollable: false, easing: 'linear', duration: 2000 }).waitForResources();
    //     cy.scrollTo('top', { ensureScrollable: false, easing: 'linear', duration: 1500 }).waitForResources();
    //     cy.get('.relative')
    //       .then(posts => cy.wrap(posts).find('[type="like-icon"]').first())
    //       .click()
    //       .waitForResources();
    //   });

    cy.visit(`/in/benyaminrafaeli/recent-activity/shares/`).waitForResources();
    cy.scrollTo('bottom', { ensureScrollable: false, easing: 'linear', duration: 2000 }).waitForResources();
    cy.scrollTo('top', { ensureScrollable: false, easing: 'linear', duration: 1500 }).waitForResources();
    cy.get('.relative')
      .then(posts => cy.wrap(posts).find('[type="like-icon"]').eq(0))
      .click()
      .waitForResources()
      .then(() => cy.get('.entry-point').find('[role="button"]').click().waitForResources())
      .then(() => cy.get('.msg-form__contenteditable').click().type('hello friend').waitForResources())
      .then(() => cy.get('[type="submit"]').click().waitForResources());

    // check properties if clicked
    // try to send message
    // find artdeco-button__text with textMessage = Message

    // cy.visit('https://www.linkedin.com/in/kaylamenashe888/recent-activity/').wait(delay);
    // cy.get('[type="like-icon"]').children();
    // https://www.linkedin.com/mynetwork/invite-connect/connections/
    // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/
    // likes    => [type="like-icon"]
    // comments => [type="speech-bubble-icon"]
    // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/posts/
    // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/shares/
    // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/documents/
  });

  let graph = [];

  it.skip('get page count by companies', () => {
    // companies.forEach(hashTag => {
    const hashTag = companies[0];

    cy.visit('https://www.linkedin.com/search/results/all/', {
      qs: {
        keywords: hashTag,
        origin: 'GLOBAL_SEARCH_HEADER',
        page: 1,
      },
    });
    // cy.navigate(undefined, `#${hashTag}`);
    // cy.getTotalPageNumber();
    // cy.get('@times').then(time => {
    //   graph.push({ Letter: hashTag, Freq: time });
    // });

    // cy.pause();
    // cy.log(JSON.stringify(graph));
    // });
  });
});
