describe("getAllCategories", () => {
  it("Összes kategóriát vissza kell adnia", () => {
    cy.request("GET", "localhost:3000/advertisement/allCategories").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("categories").that.is.an("array").not.empty;
    });
  });
});
