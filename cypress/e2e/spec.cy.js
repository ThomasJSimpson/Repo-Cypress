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
    // Rejoinds le site
    cy.visit(Cypress.env("site_url"));
    cy.get(".page-title-text").contains("Boutique");
    // Rejoinds page de connexion
    cy.get(".menu-item-2772").click();
    cy.get(".page-title-text").contains("Mon compte");

    // Entre les crédentials et se co
    cy.get("#username").type(Cypress.env("db_user"));
    cy.get("#password").type(Cypress.env("db_password"), { log: false });
    cy.get("#rememberme").click();
    cy.get(".woocommerce-form-login__submit").click();
    cy.get(".woocommerce-MyAccount-content p")
      .first()
      .should("contain", `Bonjour ${Cypress.env("db_user")}`);
    // Recherche l'article et clique dessus vers page produit
    cy.get(".search-overlay-trigger").click();
    cy.get(".apsw-search-input").type(Cypress.env("product"));
    cy.get("ul.apsw_data_container li").first().find(".apsw-name").should("contain", Cypress.env("product"));
    cy.get("ul.apsw_data_container li").first().click();
    //Vérifie bonne fiche produit
    cy.get(".product_title").first().should("contain", Cypress.env("product"));
    // Ajoute le prod au panier
    cy.get(".single_add_to_cart_button").click();
    // Va voir le récap de la commande
    cy.get(".wc-forward").click();
    // Se déco via le menu déroulant "hover"
    cy.get(".header-icon").find(".icofont-user-alt-4").realHover();
    cy.get(".header-icon").find(".woocommerce-MyAccount-navigation-link--customer-logout").click();
  });
});
