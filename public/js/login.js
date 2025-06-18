var loginFormHandler = async function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  // Check for any blank inputted fields.
  if (email && password) {
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // if successful render the homepage.
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all fields");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
