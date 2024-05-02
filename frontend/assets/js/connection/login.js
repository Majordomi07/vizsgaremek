document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearErrors();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);

      localStorage.setItem("successfulLogin", "popup");
      window.location.href = "/home";
    } else {
      popupLoginError();
      displayErrors(data.error);
    }
  });

  function clearErrors() {
    const errorElements = document.querySelectorAll("#loginForm .error");
    errorElements.forEach((element) => {
      element.textContent = "";
    });
  }

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
});
