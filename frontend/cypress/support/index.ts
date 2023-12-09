/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;
      getBySelLike(value: string): Chainable<JQuery<HTMLElement>>;
      findBySel(value: string): Chainable<JQuery<HTMLElement>>;
      findBySelLike(value: string): Chainable<JQuery<HTMLElement>>;
      getLink(value: string): Chainable<JQuery<HTMLElement>>;
      findLink(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add(
  "findBySel",
  { prevSubject: "element" },
  (subject, selector, ...args) => {
    return cy.wrap(subject).find(`[data-test=${selector}]`, ...args);
  }
);

Cypress.Commands.add(
  "findBySelLike",
  { prevSubject: "element" },
  (subject, selector, ...args) => {
    return cy.wrap(subject).find(`[data-test*=${selector}]`, ...args);
  }
);

Cypress.Commands.add("getLink", (path, ...args) => {
  return cy.get(`[href="${path}"]`, ...args);
});

Cypress.Commands.add(
  "findLink",
  { prevSubject: "element" },
  (subject, path, ...args) => {
    return cy.wrap(subject).find(`[href="${path}"]`, ...args);
  }
);

export {};
