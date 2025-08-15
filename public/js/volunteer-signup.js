// Get form, button, and volunteer list elements
const signupForm = document.querySelector("#signup-form");
const signupButton = document.querySelector(".signup-btn");
const volunteerListElement = document.querySelector(".volunteer-list");
// Get the opportunity ID from the URL
const opportunityId = parseInt(window.location.pathname.split("/").pop());

// A user signs up for an opportunity.
var volunteerSignupHandler = async function (event) {
  event.preventDefault();
  // Disable button when pressed to prevent double submissions
  signupButton.disabled = true;
  const profileEndpoint = "/api/users/profile";
  const signupEndpoint = "/api/signups";
  const opportunityEndpoint = `/api/opportunities/${opportunityId}`;

  try {
    // Fetch volunteer profile id for the current user
    const profileResponse = await fetch(profileEndpoint);
    if (!profileResponse.ok) {
      throw new Error(`Response status: ${profileResponse.status}`);
    }
    const { volunteerProfile } = await profileResponse.json();
    const volunteerId = volunteerProfile.id;
    // Post a new signup request for this opportunity and volunteer
    const signupResponse = await fetch(signupEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opportunity_id: opportunityId, volunteer_id: volunteerId }),
    });
    // Fetch the current opportunity data to get spots info
    const opportunityResponse = await fetch(opportunityEndpoint);
    if (!opportunityResponse.ok) {
      alert("Cannot locate opportunity with this id!");
      signupButton.disabled = false;
      return;
    }
    const { spotsAvailable, spotsFilledCount } = await opportunityResponse.json();
    // Update the opportunity's spotsAvailable and spotsFilledCount
    const updateSpotsResponse = await fetch(opportunityEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotsAvailable: spotsAvailable - 1,
        spotsFilledCount: spotsFilledCount + 1,
      }),
    });
    if (!updateSpotsResponse.ok) {
      alert("Failed to update opportunity spots.");
      signupButton.disabled = false;
      return;
    }
    // If signup was successful, reload the page
    if (signupResponse.ok) {
      location.reload();
    } else {
      signupButton.disabled = false; // Re-enable if signup fails
    }
  } catch (error) {
    console.error(error.message);
    signupButton.disabled = false; // Re-enable on error
  }
};
/*
// Helper function to get an array of volunteer names.
function volunteerProfileHandler(signups) {
  const volunteerNames = signups.map(
    (volunteer) => `${volunteer.firstName} ${volunteer.lastName}`
  );

  displayVolunteerList(volunteerNames);
}

// Display list of attending volunteers.
function displayVolunteerList(volunteers) {
  volunteerListElement.innerHTML = ""; // Clear existing list
  for (var i = 0; i < volunteers.length; i++) {
    var volunteerListItem = document.createElement("li");
    volunteerListItem.classList.add("volunteer-list-item");
    volunteerListItem.textContent = volunteers[i];
    volunteerListElement.appendChild(volunteerListItem);
  }
}
// Load all volunteers who signed up.
var init = async () => {
  const url = `http://localhost:3001/api/opportunities/${opportunityId}`;
  try {
    const opportunityResponse = await fetch(url);
    const { volunteers } = await opportunityResponse.json();
    console.log(volunteers);
    
    if (volunteers.length === 0) {
      volunteerListElement.innerHTML =
        "<li>No sign-ups yet—this could be your moment to shine.</li>";
      return;
    }
    volunteerProfileHandler(volunteers);
  } catch (error) {
    console.error(error.message);
  }
};

// init()*/
signupForm.addEventListener("submit", volunteerSignupHandler);
