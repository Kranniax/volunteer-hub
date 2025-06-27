const opportunity_id = parseInt(window.location.pathname.split("/").pop());

var volunteerSignupHandler = async function (event) {
  event.preventDefault();
  const profileEndpoint = "http://localhost:3001/api/users/profile";
  const signupEndPoint = "http://localhost:3001/api/signups";

  try {
    const response = await fetch(profileEndpoint);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const { volunteerProfile } = await response.json();
    const volunteer_id = volunteerProfile.id;

    const signupResponse = await fetch(signupEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opportunity_id, volunteer_id }),
    });
    const signupResult = await signupResponse.json();
    console.log(signupResult);
  } catch (error) {
    console.error(error.message);
  }
  // Reload after sucessfull post to signup model.
  location.reload();
};

var init = async () => {
  const url = `http://localhost:3001/api/signups/opportunity/${opportunity_id}`;
  try {
    const signupsResponse = await fetch(url);
    const signups = await signupsResponse.json();

    console.log(signups);
  } catch (error) {
    console.error(error.message);
  }
};

init();
document
  .querySelector("form")
  .addEventListener("submit", volunteerSignupHandler);
