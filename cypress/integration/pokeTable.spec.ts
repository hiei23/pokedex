/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
context("Actions", () => {
  const baseURL = "http://localhost:3000/";

  beforeEach(() => {
    cy.intercept("**/api/v2/pokemon?limit=10&offset=0", {
      fixture: "paginatedPokemonListFixture.json",
    });

    cy.intercept("**/api/v2/pokemon/*/", {
      fixture: "bulbasaur.json",
    });

    cy.visit(baseURL);
  });

  it("should display page title", () => {
    cy.contains("PokeTable");
  });

  it("should display pokemon names", () => {
    const pokemonNames = [
      "bulbasaur",
      "ivysaur",
      "venusaur",
      "charmander",
      "charmeleon",
      "charizard",
      "squirtle",
      "wartortle",
      "blastoise",
      "caterpie",
    ];

    cy.checkTableRowNames("#pokeTableBody", pokemonNames);
  });

  it("should display pokemon info", () => {
    // special case to select callapsable component because the material ui does not accept id prop
    cy.get("#bulbasaur-row").children().first().find("button").click();

    cy.log("checking pokemon info");
    cy.get("#bulbasaur-pokemon-card").then(() => {
      cy.get("#bulbasaur-pokemon-card-details").then(() => {
        cy.log("check if pokemon name exist");
        cy.contains("bulbasaur");

        cy.log("check if pokemon ability exist");
        cy.contains("overgrow");
        cy.contains("chlorophyl");

        cy.log("check if pokemon weight exist");
        cy.contains(69);

        cy.log("check if pokemon type exist");
        cy.contains("grass");
        cy.contains("poison");
      });

      cy.contains("Stats").click();
      cy.log("waiting for the canvas to render the graph");
      cy.wait(1000);

      cy.log("check if the canvas has drawn the graph");
      cy.get("canvas").toMatchImageSnapshot();
    });
  });
});
