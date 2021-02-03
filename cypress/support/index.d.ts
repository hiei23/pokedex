declare namespace Cypress {
  interface Chainable {
    checkTableRowNames(elementId: string, names: string[]): void;
  }
}
