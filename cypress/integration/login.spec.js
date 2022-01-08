/// <reference types="cypress" />

const username = Cypress.env('username');
const password = Cypress.env('password');
const hashTag = Cypress.env('hashTag');

const delay = 3000;
const arr = [];

const login = () => {
  cy.visit('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin').wait(delay);
  cy.get('#username').type(username).wait(delay);
  cy.get('#password').type(password).wait(delay);
  cy.get('.btn__primary--large').click().wait(delay);
  navigate(1, hashTag);
};

const navigate = (page, hashTag) => {
  cy.visit('https://www.linkedin.com/search/results/all/', {
    qs: {
      keywords: hashTag,
      origin: 'GLOBAL_SEARCH_HEADER',
      page: page,
    },
  }).then(() => {
    cy.scrollTo('bottom', { easing: 'linear' }).wait(delay);
    console.log(`page number -  ${page}`);
  });
};

const collectFromPage = () => {
  cy.get('.entity-result__content-container').each(block => {
    const entity = block.find('.entity-result__title-text').text();
    const name = entity.trim().split('View')[0];
    arr.push(name);
  });
};

const getTimes = () => {
  cy.wait(delay).then(() => {
    cy.scrollTo('bottom', { easing: 'linear' }).wait(delay);
    cy.get('.artdeco-pagination__pages--number li')
      .last()
      .then(el => cy.wrap(el.text()).as('times'));
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

describe('linkedin', () => {
  it('navigate', () => {
    login();
    getTimes();

    cy.get('@times')
      .then(time => {
        Cypress._.times(Number(time), n => {
          navigate(n + 1, hashTag);
          collectFromPage();
        });
      })
      .then(() => {
        dup(arr);
      });
  });

  it.only('clicks', () => {
    login();

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

  it('add connections', () => {
    login();
    // navigate to https://www.linkedin.com/mynetwork/
    // find artdeco-button__text => Connect
    //
  });
});
