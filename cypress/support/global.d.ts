/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    loginUi(email: string, password: string): Chainable<void>;
    navigate(page?: string, hashTag: string): Chainable<void>;
    waitForResources(resources?: string[]): Chainable<void>;
    getTotalPageNumber(): void;
  }
}
