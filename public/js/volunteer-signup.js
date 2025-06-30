const volunteerUListEl = document.querySelector(".volunteer-list");
const opportunity_id = parseInt(window.location.pathname.split("/").pop());

// Sign up for a volunteer opportunity.
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
    // console.log(signupResult);

    if (signupResponse.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error.message);
  }
  // Reload after sucessfull post to signup model.
};

// Get volunteer profiles based on volunteer profile ids.
async function getVolunteersProfiles(volunteerIds) {
  const volunteers = [];
  for (var i = 0; i < volunteerIds.length; i++) {
    const volunteerProfileResponse = await fetch(
      `http://localhost:3001/api/volunteers/${volunteerIds[i]}`
    );
    const volunteerProfile = await volunteerProfileResponse.json();
    volunteers.push(volunteerProfile);
  }
  const volunteersNames = volunteers.map((v) => `${v.firstName} ${v.lastName}`);
  displayVolunteerList(volunteersNames);
}

// Helper function to get an array of volunteer profile ids.
function volunteerProfileHandler(signups) {
  const volunteerProfileIds = signups.map(
    (volunteer) => volunteer.volunteer_id
  );
  getVolunteersProfiles(volunteerProfileIds);
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
  const url = `http://localhost:3001/api/signups/opportunity/${opportunity_id}`;
  try {
    const signupsResponse = await fetch(url);
    const signups = await signupsResponse.json();
    volunteerProfileHandler(signups);
  } catch (error) {
    console.error(error.message);
  }
};

init();
document
  .querySelector("form")
  .addEventListener("submit", volunteerSignupHandler);
