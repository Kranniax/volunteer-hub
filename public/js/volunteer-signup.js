const signupForm = document.querySelector("form");
const signupBtn = document.querySelector("button");
const volunteerUListEl = document.querySelector(".volunteer-list");
const opportunity_id = parseInt(window.location.pathname.split("/").pop());

// A users signs up for a opportunity.
var volunteerSignupHandler = async function (event) {
  event.preventDefault();
  // Diable button when pressed.
  signupBtn.disabled = true;
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

    if (signupResponse.ok) {
      // Reload after sucessfull post to signup model.
      location.reload();
    } else {
      signupBtn.disabled = false; // Re-enable if signup fails
    }
  } catch (error) {
    console.error(error.message);
    signupBtn.disabled = false; // Re-enable on error
  }
};

// Helper function to get an array of volunteer names.
function volunteerProfileHandler(signups) {
  const volunteerNames = signups.map(
    (volunteer) => `${volunteer.firstName} ${volunteer.lastName}`
  );

  displayVolunteerList(volunteerNames);
}

// Display list of attending volunteers.
function displayVolunteerList(volunteers) {
  volunteerUListEl.innerHTML = ""; // Clear existing list
  for (var i = 0; i < volunteers.length; i++) {
    var volunteerListEl = document.createElement("li");
    volunteerListEl.classList.add("volunteer-list-item");
    volunteerListEl.textContent = volunteers[i];
    volunteerUListEl.appendChild(volunteerListEl);
  }
}
// Load all all volunteers who signed up.
var init = async () => {
  const url = `http://localhost:3001/api/opportunities/${opportunity_id}`;
  try {
    const opportunityResponse = await fetch(url);
    const { volunteers } = await opportunityResponse.json();
    if (volunteers.length === 0) {
      volunteerUListEl.innerHTML =
        "<li>No sign-ups yet—this could be your moment to shine.</li>";
      return;
    }
    volunteerProfileHandler(volunteers);
  } catch (error) {
    console.error(error.message);
  }
};

init();

signupForm.addEventListener("submit", volunteerSignupHandler);
