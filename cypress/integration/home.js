/// <reference types="cypress" />
// @ts-check

describe("Home screen", () => {
  it("should show the brands", () => {
    cy.intercept("GET", "/brands", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "Trek test",
          price: 19.99,
          stock: 20,
        },
      ],
    });
    cy.visit("http://localhost:3000");
    cy.get(".brand")
      .should("have.length", 1)
      .should("contain", "Trek test")
      .should("contain", 19.99);
  });
});
