describe('Landing test', () => {
  it('Start', () => {
    cy.visit('/');
    cy.waitForReact(2000, '#root');
    cy.get('[class*="_PresentButton"]').should('have.text', 'Presentation').click();
    cy.get('[class*="_SendButton"]').should('have.text', 'Send').click();
    cy.visit('/');
    cy.get('[class*="_RestButton"]').should('have.text', 'Restaurants').click();
  });
});
