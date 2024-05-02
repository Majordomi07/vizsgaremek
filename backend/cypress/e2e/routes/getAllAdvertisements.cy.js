describe("getAllAdvertisements", () => {
  it("Az összes hirdetés lekérdezésének működnie kell", () => {
    cy.request("GET", "localhost:3000/advertisement/getAllAdvertisements").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results").that.is.an("array").not.empty;
      expect(response.body).to.have.property("totalCount").that.is.a("number");
    });
  });
});
