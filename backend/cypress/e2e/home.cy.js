describe("Álláshirdetések", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.viewport(1920, 1080);
  });

  it("Álláshirdetések megjelennek", () => {
    cy.get(".posts").should("be.visible");
    cy.get(".post").should("have.length.greaterThan", 0);
  });

  it("Álláshirdetések szűrése település alapján", () => {
    cy.get("#locationFilter").select("Budapest");
    cy.get(".post").each(($post) => {
      cy.wrap($post).contains("Budapest");
    });
  });

  it("Álláshirdetések szűrése kategória alapján", () => {
    cy.get("#categoryFilter").select("Adminisztráció");
    cy.get(".post").each(($post) => {
      cy.wrap($post).contains("Teszt");
    });
  });

  it("Álláshirdetések szűrése órabér alapján", () => {
    cy.get('input[type="radio"][id="wage1"]').check();
    cy.get(".post").each(($post) => {
      cy.wrap($post).contains("Ft/óra");
    });
  });

  it("Álláshirdetések szűrése kulcsszó alapján", () => {
    cy.get("#keywordFilter").type("Teszt");
    cy.get(".post").each(($post) => {
      cy.wrap($post).contains("Teszt");
    });
  });

  it("Álláshirdetések rendezése legtöbbet fizető szerint", () => {
    cy.get("#orderFilter").select("Legtöbbet fizető");
    cy.get(".post:first").within(() => {
      cy.get(".wage p").should("contain", "Ft/óra");
    });
  });

  it("Álláshirdetések megtekintése", () => {
    cy.get(".post:first button").click();
    cy.url().should("include", "/advertisement/view/");
  });

  it("Álláshirdetések szűrése és rendezése visszaállítása", () => {
    cy.get("#locationFilter").select("Budapest");
    cy.get("#categoryFilter").select("Adminisztráció");
    cy.get('input[type="radio"][id="wage1"]').check();
    cy.get("#keywordFilter").type("Teszt");
    cy.get("#orderFilter").select("Legtöbbet fizető");
    cy.get("#resetFilter").click();
    cy.get(".post").should("have.length.greaterThan", 0);
  });
});
