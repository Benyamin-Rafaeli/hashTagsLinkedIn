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

const collectFromPage = () => {
  cy.get('.entity-result__content-container').each(block => {
    const entityOnPage = block.find('.entity-result__title-text').text();
    const sharedPersonName = entityOnPage.trim().split('View')[0];
    arr.push(sharedPersonName);
  });
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
  it('navigate', () => {
    cy.loginUi(username, password);
    cy.navigate(undefined, hashTag);

    cy.get('@times')
      .then(time => {
        Cypress._.times(Number(time), n => cy.navigate(String(n + 1), hashTag));
        collectFromPage();
      })
      .then(() => {
        dup(arr);
      });
  });

  // it.skip('clicks', () => {
  //   login();
  //   chooseArea(101620260);
  //   cy.get('.app-aware-link').then(el => {
  //     el.eq(0).find('href');
  //   });
  //
  //   // cy.visit('https://www.linkedin.com/in/kaylamenashe888/recent-activity/').wait(delay);
  //   // cy.get('[type="like-icon"]').children();
  //
  //   // https://www.linkedin.com/mynetwork/invite-connect/connections/
  //
  //   // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/
  //   // likes    => [type="like-icon"]
  //   // comments => [type="speech-bubble-icon"]
  //
  //   // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/posts/
  //   // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/shares/
  //   // https://www.linkedin.com/in/benyaminrafaeli/recent-activity/documents/
  // });
  //
  // it.skip('add connections', () => {
  //   login();
  //   // navigate to https://www.linkedin.com/mynetwork/
  //   // find artdeco-button__text => Connect
  //   //
  // });
});
