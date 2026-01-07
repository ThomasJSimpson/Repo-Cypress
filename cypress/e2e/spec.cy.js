import "cypress-real-events";

describe("connexion + recherche + ajout panier + vérif panier", () => {
  it("fait tout d'un coup (pour le moment...)", () => {
    // ÉTAPE 1 : CONNEXION
    cy.log("ÉTAPE 1 : Connexion");
    cy.visit(Cypress.env("site_url"));
    cy.get(".page-title-text").contains("Boutique");
    cy.get(".menu-item-2772").click();
    cy.get(".page-title-text").contains("Mon compte");
    cy.get("#username").type(Cypress.env("db_user"));
    cy.get("#password").type(Cypress.env("db_password"), { log: false });
    cy.get("#rememberme").click();
    cy.get(".woocommerce-form-login__submit").click();
    cy.get(".woocommerce-MyAccount-content p")
      .first()
      .should("contain", `Bonjour ${Cypress.env("db_user")}`);
    // ÉTAPE 2 : RECHERCHE
    cy.log("ÉTAPE 2 : Recherche produit");
    cy.get(".search-overlay-trigger").click();
    cy.get(".apsw-search-input").type(Cypress.env("product"));
    cy.get("ul.apsw_data_container li").first().find(".apsw-name").should("contain", Cypress.env("product"));
    cy.get("ul.apsw_data_container li").first().click();
    cy.get(".product_title").first().should("contain", Cypress.env("product"));
    // ÉTAPE 3 : PANIER
    cy.log("ÉTAPE 3 : Ajout panier");
    cy.get(".single_add_to_cart_button").click();
    // Va voir le récap de la commande dans le panier
    cy.get(".wc-forward").click();
    cy.wait(2500);
    cy.get(".wp-block-woocommerce-cart-line-items-block")
      .find("tbody")
      .children()
      .then((enfants) => {
        // npombre d'article différents
        const nombreDenfants = enfants.length;
        cy.log("Le nombre d'enfants est : " + nombreDenfants);
      });

    // // ÉTAPE 4 : DÉCONNEXION
    // cy.log("ÉTAPE 4 : Déconnexion");
    // cy.get(".header-icon").find(".icofont-user-alt-4").realHover();
    // cy.get(".header-icon").find(".woocommerce-MyAccount-navigation-link--customer-logout").click();
  });
});
