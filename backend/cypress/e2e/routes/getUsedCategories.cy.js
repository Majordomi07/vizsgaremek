describe("getUsedCategories", () => {
  it("A használt kategóriák lekérdezésének működnie kell", () => {
    cy.request("GET", "localhost:3000/advertisement/usedCategories").then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("categories").that.is.an("array").not.empty;
    });
  });
});
