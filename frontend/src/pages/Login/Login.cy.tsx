import Login from ".";

describe("Login", () => {
  it("should render", () => {
    cy.mount(<Login />);
    cy.getBySel("login-form").should("exist");
  });
});
