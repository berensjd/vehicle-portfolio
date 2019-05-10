describe("Site status", function() {
  it("successfully loads", function() {
    cy.visit("http://localhost:3000");
    cy.contains("Loading");
    cy.contains("loading");
    // Should be on a new URL which includes '/commands/actions'
    //cy.url().should('include', '/commands/actions')
  });
});
