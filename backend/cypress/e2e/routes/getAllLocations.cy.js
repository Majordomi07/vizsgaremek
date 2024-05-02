describe("getAllLocations", () => {
  it("Az összes helyszín lekérdezésének működnie kell", () => {
    cy.request("GET", "localhost:3000/advertisement/allLocations").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("locations").that.is.an("array").not.empty;
    });
  });
});
