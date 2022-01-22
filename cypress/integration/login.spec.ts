///<reference path="../support/global.d.ts"/>
/// <reference types="cypress" />

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

describe('linkedin', () => {
  // before(() => cy.loginUi(username, password).waitForResources());

  it('count all users that shared', () => {
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

  it.only('clicks for likes', () => {
    // chooseArea(101620260); // israel
    // cy.get('.app-aware-link').then(el => {
    //   el.eq(0).find('href');
    // });
    // https://www.linkedin.com/in/narjes-abdalhady/recent-activity/shares/
    cy.fixture('/pipl/hr_arr_00-25_clean.json').then(el => {
      cy.log(el);
      cy.visit('/');
      // cy.visit(`${el[0]}/recent-activity/shares/`).waitForResources();
      // scroll
      // check which index liked
    });
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
  //
  // it.skip('add connections', () => {
  //   login();
  //   // navigate to https://www.linkedin.com/mynetwork/
  //   // find artdeco-button__text => Connect
  //   //
  // });
});
