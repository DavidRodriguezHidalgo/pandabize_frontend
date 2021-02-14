/// <reference types="cypress" />
// @ts-check

describe("Brand Detail screen", () => {
  it("should show the product info and place and order", () => {
    cy.intercept("GET", "/brands/1", {
      statusCode: 200,
      body: {
        features: [
          {
            brand_id: 1,
            feature_values: [
              {
                feature_id: 1,
                id: 1,
                value: "17",
              },
              {
                feature_id: 1,
                id: 2,
                value: "19",
              },
              {
                feature_id: 1,
                id: 3,
                value: "21",
              },
            ],
            id: 1,
            name: "Wheel Size",
          },
          {
            brand_id: 1,
            feature_values: [
              {
                feature_id: 2,
                id: 4,
                value: "blue",
              },
              {
                feature_id: 2,
                id: 5,
                value: "black",
              },
              {
                feature_id: 2,
                id: 5,
                value: "green",
              },
            ],
            id: 2,
            name: "Rim Color",
          },
        ],
        id: 1,
        name: "Trek test",
        price: 19.99,
        stock: 20,
      },
    });
    cy.intercept(
      "GET",
      "http://localhost:3001/feature_values?ids[]=1&ids[]=2&ids[]=3&ids[]=4&ids[]=5&ids[]=5",
      {
        statusCode: 200,
        body: [
          {
            feature_id: 1,
            id: 1,
            value: "17",
          },
          {
            feature_id: 1,
            id: 2,
            value: "19",
          },
          {
            feature_id: 1,
            id: 3,
            value: "21",
          },
          {
            feature_id: 2,
            id: 4,
            value: "blue",
          },
          {
            feature_id: 2,
            id: 5,
            value: "black",
          },
        ],
      }
    );
    cy.intercept("POST", "/orders", {
      statusCode: 200,
    });
    cy.visit("http://localhost:3000/brand/1");
    cy.get(".divider").first().should("contain", "Trek test");

    //show popup when no options selected
    cy.get('button[type="submit"]').click();
    cy.get(".notification")
      .should("be.visible")
      .should("contain", "Please select any features");

    //show popup when you place an order
    cy.get('.form-field').first().find('select').select("19");
    cy.get('.form-field').eq(1).find('select').select("blue");
    cy.get('button[type="submit"]').click();
    cy.get(".notification")
    .should("be.visible")
    .should("contain", "You have created an order");
  });
});
