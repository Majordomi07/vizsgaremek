describe("getAdvertisement", () => {
  it("A hirdetés lekérdezésének működnie kell", () => {
    cy.request("GET", "localhost:3000/advertisement/api/1").then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.lengthOf.at.least(1);
    });
  });
});
