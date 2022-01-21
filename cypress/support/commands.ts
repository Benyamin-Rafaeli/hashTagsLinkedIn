const delay = 3000;


const randomNumber = max => {
  return Math.floor(Math.random() * max);
};

Cypress.Commands.add('loginUi', (username: string, password: string) => {
  cy.visit('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin').wait(delay);

  cy.get('#username')
    .type(username, { delay: randomNumber(10 + 20) })
    .wait(delay);

  cy.get('#password')
    .type(password, { delay: randomNumber(10 + 30) })
    .wait(delay);

  cy.get('.btn__primary--large').click().wait(delay);
});

Cypress.Commands.add('navigate', (pageNumber: string, hashTag: string) => {
  // https://www.linkedin.com/search/results/all/?keywords=#panorays&origin=GLOBAL_SEARCH_HEADER
  const page = pageNumber || 1;
  cy.visit('https://www.linkedin.com/search/results/all/', {
    qs: {
      keywords: hashTag,
      origin: 'GLOBAL_SEARCH_HEADER',
      page,
    },
  }).then(() => {
    cy.scrollTo('bottom', { easing: 'linear' }).wait(delay);

    cy.get('.artdeco-pagination__pages--number li')
      .last()
      .then(el => cy.wrap(el.text()).as('times'));
    // Cypress._.times(3, () => {
    //   cy.scrollTo('bottom', { ensureScrollable: false }).wait(delay);
    // });
    // console.log(`page number -  ${page}`);
  });
});


