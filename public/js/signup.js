var signUpFormHandler = async function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const role = document.querySelector("#role").value.trim();

  // Check for any blank input fields.
  if (email && password && role) {
    try {
      const response = await fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        // if successful render the appropriate pages.
        switch (role) {
          case "volunteer":
            document.location.replace("/volunteer-profile");
            break;
          case "organization":
            document.location.replace("/organization-profile");
            break;
          default:
            alert("You do not have admin access");
            document.location.replace("/signup");
            break;
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Signup Failed");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all fields");
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signUpFormHandler);
