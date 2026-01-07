import "cypress-real-events";

describe("connexion + recherche + ajout panier + vérif panier", () => {
  // beforeEach(() => {
  //   cy.visit(Cypress.env("site_url"));
  //   cy.get("#username").type(Cypress.env("db_user"));
  //   cy.get("#password").type(Cypress.env("db_password"), { log: false });
  //   cy.get("#rememberme").click();
  //   cy.get(".woocommerce-form-login__submit").click();
  // });
  it("se connecte", () => {
    cy.visit(Cypress.env("site_url"));
    cy.get(".menu-item-2772").click();
    cy.get("#username").type(Cypress.env("db_user"));
    cy.get("#password").type(Cypress.env("db_password"), { log: false });
    cy.get("#rememberme").click();
    cy.get(".woocommerce-form-login__submit").click();
    cy.get(".site-title").click();
    cy.get(".search-overlay-trigger").click();
    cy.get(".apsw-search-input").type("Voluptas.");
    cy.get("ul.apsw_data_container li").first().click();
    cy.get(".single_add_to_cart_button").click();
    cy.get(".wc-forward").click();
    cy.get(".header-icon").find(".icofont-user-alt-4").realHover();
    cy.get(".header-icon").find(".woocommerce-MyAccount-navigation-link--customer-logout").click();
  });
});
