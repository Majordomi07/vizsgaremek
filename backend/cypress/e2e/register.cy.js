describe("Regisztráció", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("Sikeres regisztráció", () => {
    cy.get("#email").type("teszt@example.com");
    cy.get("#password").type("Teszt123$");
    cy.get("#passwordAgain").type("Teszt123$");
    cy.get("#lastname").type("Teszt");
    cy.get("#firstname").type("Felhasználó");
    cy.get("#policy").check();

    cy.get("form").submit();

    cy.url().should("include", "/login");
  });

  it("Hibás email formátum", () => {
    cy.get("#email").type("hibasemail");
    cy.get("#password").type("Teszt123$");
    cy.get("#passwordAgain").type("Teszt123$");
    cy.get("#lastname").type("Teszt");
    cy.get("#firstname").type("Felhasználó");
    cy.get("#policy").check();

    cy.get("form").submit();

    cy.get("#emailError").should("contain", "Érvénytelen email cím.");
  });

  it("Két jelszó nem egyezik", () => {
    cy.get("#email").type("teszt@example.com");
    cy.get("#password").type("Teszt123$");
    cy.get("#passwordAgain").type("MasikJelszo123");
    cy.get("#lastname").type("Teszt");
    cy.get("#firstname").type("Felhasználó");
    cy.get("#policy").check();

    cy.get("form").submit();

    cy.get("#passwordAgainError").should("contain", "A két jelszó nem egyezik meg.");
  });

  it("Üres mezők regisztrációkor", () => {
    cy.get("form").submit();

    cy.get("#emailError").should("contain", "Érvénytelen email cím.");
    cy.get("#passwordError").should(
      "contain",
      "A jelszónak tartalmaznia kell legalább egy speciális karaktert."
    );
    cy.get("#passwordAgainError").should("contain", "A jelszó újra mező nem lehet üres.");
    cy.get("#lastnameError").should("contain", "A vezetéknév mező nem lehet üres.");
    cy.get("#firstnameError").should("contain", "A keresztnév mező nem lehet üres.");
    cy.get("#policyError").should("contain", "El kell fogadni az adatvédelmi nyilatkozatot.");
  });

  it("Adatvédelmi nyilatkozat nincs elfogadva", () => {
    cy.get("#email").type("teszt@example.com");
    cy.get("#password").type("Teszt123$");
    cy.get("#passwordAgain").type("Teszt123$");
    cy.get("#lastname").type("Teszt");
    cy.get("#firstname").type("Felhasználó");

    cy.get("form").submit();

    cy.get("#policyError").should("contain", "El kell fogadni az adatvédelmi nyilatkozatot.");
  });

  it("Hiányzó keresztnév", () => {
    cy.get("#email").type("teszt@example.com");
    cy.get("#password").type("Teszt123$");
    cy.get("#passwordAgain").type("Teszt123$");
    cy.get("#lastname").type("Teszt");
    cy.get("#policy").check();

    cy.get("form").submit();

    cy.get("#firstnameError").should("contain", "A keresztnév mező nem lehet üres.");
  });

  it("Hiányzó vezetéknév", () => {
    cy.get("#email").type("teszt@example.com");
    cy.get("#password").type("Teszt123$");
    cy.get("#passwordAgain").type("Teszt123$");
    cy.get("#firstname").type("Felhasználó");
    cy.get("#policy").check();

    cy.get("form").submit();

    cy.get("#lastnameError").should("contain", "A vezetéknév mező nem lehet üres.");
  });

  it("Hiányzó jelszó", () => {
    cy.get("#email").type("teszt@example.com");
    cy.get("#lastname").type("Teszt");
    cy.get("#firstname").type("Felhasználó");
    cy.get("#policy").check();

    cy.get("form").submit();

    cy.get("#passwordError").should(
      "contain",
      "A jelszónak tartalmaznia kell legalább egy speciális karaktert."
    );
  });
});
