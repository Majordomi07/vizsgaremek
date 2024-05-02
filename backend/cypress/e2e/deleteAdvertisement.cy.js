describe("Álláshirdetés törlése", () => {
  it("Álláshírdetés törlése", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("#email").type("teszt@gmail.com");
    cy.get("#password").type("Teszter123.");
    cy.get("form").submit();

    cy.wait(2000);

    cy.visit("http://localhost:3000/controlPanel/advertisements");

    cy.contains(".post", "Teszt cím")
      .parent()
      .within(() => {
        cy.get(".edit").click();
      });

    cy.get(".delete").click();

    cy.url().should("eq", "http://localhost:3000/controlPanel/advertisements");
  });
});
