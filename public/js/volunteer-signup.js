var volunteerSignupHandler = async function (event) {
  event.preventDefault();
  const url = "http://localhost:3001/api/users/profile";
  const signupEndPoint = "http://localhost:3001/api/signups";
  const opportunity_id = window.location.pathname.split("/").pop();

  try {
    const response = await fetch(url);
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
};

document
  .querySelector("form")
  .addEventListener("submit", volunteerSignupHandler);
