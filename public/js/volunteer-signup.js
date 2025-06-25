var volunteerSignupHandler = async function (event) {
  event.preventDefault();
  const opportunityID = window.location.pathname.split("/").pop();
};

document
  .querySelector("form")
  .addEventListener("submit", volunteerSignupHandler);
