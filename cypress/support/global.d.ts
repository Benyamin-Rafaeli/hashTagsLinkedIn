/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    loginUi(email: string, password: string): void;
    navigate(page?: string, hashTag: string): void;
  }
}
