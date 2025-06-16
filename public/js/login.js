var loginFormHandler = async function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  try {
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.ok) {
      // if successful render the homepage.
      document.location.replace("/");
    }
  } catch (error) {
    alert(error);
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
