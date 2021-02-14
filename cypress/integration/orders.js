/// <reference types="cypress" />
// @ts-check

describe("Orders screen", () => {
  it("should show all the orders", () => {
    cy.intercept("GET", "http://localhost:3001/orders", {
      statusCode: 200,
      body: [
        {
          amount: 79.97,
          id: 1,
          items: [
            {
              price: 19.99,
              product: "Trek test",
              quantity: 2,
              selected_features: [
                { feature: "Rim Color Test", feature_value: "black test" },
              ],
            },
          ],
        },
      ],
    });
    cy.visit("http://localhost:3000/orders");
    cy.get(".order")
      .should("have.length", 1)
      .should("contain", "Trek test")
      .should("contain", 79.97)
      .should("contain", "Rim Color Test")
      .should("contain", "black test");
  });
});
