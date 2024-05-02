describe("Álláshirdetés létrehozása", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("#email").type("teszt@gmail.com");
    cy.get("#password").type("Teszter123.");
    cy.get("form").submit();

    cy.wait(2000);

    cy.visit("http://localhost:3000/controlPanel/advertisements");

    cy.get(".new-advertisement").click();
  });

  it("Üres inputok", () => {
    cy.get(".save").click();

    cy.get("#titleError").should("contain", "Az cím mező nem lehet üres.");
    cy.get("#introductionError").should(
      "contain",
      "Az ismertető mező minimum 100 karakter, maximum 350 karakter lehet."
    );
    cy.get("#generalError").should(
      "contain",
      "Az általános információ mezőnek minimum 100 karaktert tartalmaznia kell."
    );
    cy.get("#wageError").should("contain", "Az órabérnek 1000 és 10000 között kell lennie.");
    cy.get("#requirementError").should("contain", "A követelmények mező nem lehet üres.");
    cy.get("#benefitError").should("contain", "A juttatások mező nem lehet üres.");
  });

  it("Hiányos inputok", () => {
    cy.get("#title").type("Teszt cím");

    cy.get(".save").click();

    cy.get("#introductionError").should(
      "contain",
      "Az ismertető mező minimum 100 karakter, maximum 350 karakter lehet."
    );
    cy.get("#generalError").should(
      "contain",
      "Az általános információ mezőnek minimum 100 karaktert tartalmaznia kell."
    );
    cy.get("#wageError").should("contain", "Az órabérnek 1000 és 10000 között kell lennie.");
    cy.get("#requirementError").should("contain", "A követelmények mező nem lehet üres.");
    cy.get("#benefitError").should("contain", "A juttatások mező nem lehet üres.");
  });

  it("Sikeres feltöltés", () => {
    cy.get("#title").type("Teszt cím");
    cy.get("#introduction").type(
      "A beszéd a kommunikáció alapvető eszköze, amely lehetőséget nyújt az információk átadására, az érzelmek kifejezésére és az ötletek megosztására."
    );
    cy.get("#general").type(
      "A beszéd a kommunikáció alapvető eszköze, amely lehetőséget nyújt az információk átadására, az érzelmek kifejezésére és az ötletek megosztására. Az emberek beszéddel kommunikálnak egymással személyesen, telefonon, az interneten keresztül és más eszközökön keresztül is. A beszéd segítségével az emberek képesek kifejezni a gondolataikat, véleményüket és igényeiket. Emellett a beszéd fontos szerepet játszik az oktatásban, az üzleti életben, a kormányzásban és a kulturális tevékenységekben is. Az emberi beszéd sokféle formát ölthet, ideértve az éneket, a szónoklást, a vitát és a színpadi előadást is. A jó kommunikációs készségek fejlesztése kulcsfontosságú az egyéni és a szakmai sikerek eléréséhez."
    );
    cy.get("#wage").type("1200");
    cy.get("#requirement").type("semmi");
    cy.get("#benefit").type("semmi");

    cy.get(".save").click();

    cy.url().should("eq", "http://localhost:3000/controlPanel/advertisements");
  });
});
