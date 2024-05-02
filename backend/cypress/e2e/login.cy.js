describe("Bejelentkezés", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Sikeres bejelentkezés", () => {
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Tester123.");
    cy.get("form").submit();

    cy.url().should("include", "/");
  });

  it("Hibás adatokkal sikertelen bejelentkezés", () => {
    cy.get("#email").type("invalid@example.com");
    cy.get("#password").type("invalidPassword");
    cy.get("form").submit();

    cy.get(".popup.error").should("be.visible");
    cy.get(".popup.error p").should(
      "contain",
      "Ezekkel az adatokkal nincsen felhasználó regisztrálva. Kérlek próbálj újra!"
    );
  });

  it("Üres mezőkkel sikertelen bejelentkezés", () => {
    cy.get("form").submit();

    cy.get("#emailError").should("contain", "Az email cím mező nem lehet üres.");
    cy.get("#passwordError").should("contain", "A jelszó mező nem lehet üres.");
  });

  it("Megfelelő email és üres jelszóval sikertelen bejelentkezés", () => {
    cy.get("#email").type("valid@example.com");
    cy.get("form").submit();

    cy.get("#passwordError").should("contain", "A jelszó mező nem lehet üres.");
  });
});
