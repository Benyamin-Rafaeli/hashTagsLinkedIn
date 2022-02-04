import '../support/commands';

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on('uncaught:exception', err => !resizeObserverLoopErrRe.test(err.message));
