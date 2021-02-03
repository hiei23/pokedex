/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
context("Actions", () => {
  const baseURL = "http://localhost:3000/";

  beforeEach(() => {
    cy.intercept("**/api/v2/pokemon?limit=10&offset=0", {
      fixture: "paginatedPokemonListFixture.json",
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
});
