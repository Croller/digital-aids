/* eslint-disable no-undef */
describe('Landing test', () => {

  it('Main page', () => {
    cy.visit('/');
    cy.waitForReact(4000, '#root');
    cy.get('[class*="_PresentButton-"]').should('have.text', 'Presentation');
    cy.get('[class*="_SendButton-"]').should('have.text', 'Send');
  });

  it('Tutorial page', () => {
    cy.wait(1500);
    cy.get('[class*="_PresentButton-"]').should('have.text', 'Presentation').click();
    cy.get('[class*="_SendButton-"]').should('have.text', 'Send');
    cy.get('[class*="_Control-"]').should('have.text', 'Back').click();
  });

  it('List of restaurant page', () => {
    cy.wait(1500);
    cy.get('[class*="_RestButton-"]').should('have.text', 'Restaurants').click();
    cy.get('[class*="_Search-"]').should('be.visible');
    cy.get('[class*="_List-"]').should('be.visible');
    cy.get('[class*="_Restaurant-"]').should('be.visible').click();
    cy.get('[class*="_QRCodeWrapper-"]').should('be.visible');
  });
});
