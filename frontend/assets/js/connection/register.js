document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearErrors();

    const email = registerForm.querySelector("#email").value;
    const password = registerForm.querySelector("#password").value;
    const passwordAgain = registerForm.querySelector("#passwordAgain").value;
    const lastname = registerForm.querySelector("#lastname").value;
    const firstname = registerForm.querySelector("#firstname").value;
    const policy = registerForm.querySelector("#policy").checked;
    const company = registerForm.querySelector("#company").checked;
    const companyName = registerForm.querySelector("#companyName").value;
    const companyLogo = registerForm.querySelector("#companyLogo").files[0];
    const companyDescription = registerForm.querySelector("#companyDescription").value;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordAgain", passwordAgain);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("policy", policy);
      formData.append("company", company);
      formData.append("companyName", companyName);
      formData.append("companyLogo", companyLogo);
      formData.append("companyDescription", companyDescription);

      const response = await fetch("/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);

        localStorage.setItem("successfulRegister", "popup");
        window.location.href = "/login";
      } else if (result.error) {
        displayErrors(result.error);
      }
    } catch (error) {
      console.error("Hiba a regisztráció során:", error);
      displayErrors("Hiba történt a regisztráció során.");
    }
  });

  const displayErrors = (errors) => {
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        const errorField = document.getElementById(`${error.path}Error`);
        if (errorField) {
          errorField.textContent = error.msg;
        }
      });
    }
  };

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => {
      element.textContent = "";
    });
  }
});
