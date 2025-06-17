var signUpFormHandler = function (event) {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log(username);
  
  // Check any blank input fields.
  if (username && email && password) {
    try {
      const response = fetch("http://localhost:3001/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // if successful render the homepage.
        document.location.replace("/");
      }
    } catch (error) {
      alert(error.message);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signUpFormHandler);
