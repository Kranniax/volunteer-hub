const cancelSignupForm = document.querySelector("#cancel-signup-form");

const cancelSignUpHandler = (e) => {
  alert("Cancel Signup Button Pressed");
};

cancelSignupForm.addEventListener("submit", cancelSignUpHandler);
