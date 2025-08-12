const cancelSignupForm = document.querySelector("#cancel-signup-form");
const cancelButton = document.querySelector(".cancel-btn");
const opportunityId = parseInt(window.location.pathname.split("/").pop());

const updateSpotCount = async () => {
  const opportunityEndpoint = `/api/opportunities/${opportunityId}`;
  // Fetch the current opportunity data to get spots info
  const opportunityResponse = await fetch(opportunityEndpoint);
  if (!opportunityResponse.ok) {
    alert("Cannot locate opportunity with this id!");
    cancelButton.disabled = false;
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
      spotsAvailable: spotsAvailable + 1,
      spotsFilledCount: spotsFilledCount - 1,
    }),
  });
  if (!updateSpotsResponse.ok) {
    alert("Failed to update opportunity spots.");
    cancelButton.disabled = false;
    return;
  }
};

const cancelSignUpHandler = async (event) => {
  event.preventDefault();
  const profileEndpoint = "/api/users/profile";
  try {
    // Fetch volunteer profile id for the current user
    const profileResponse = await fetch(profileEndpoint);
    if (!profileResponse.ok) {
      throw new Error(`Response status: ${profileResponse.status}`);
    }
    const { volunteerProfile } = await profileResponse.json();
    const volunteerId = volunteerProfile.id;

    const signupResponse = await fetch(
      `/api/signups/find?opportunity_id=${opportunityId}&volunteer_id=${volunteerId}`
    );
    const signup = await signupResponse.json();

    // Check if the signup exists before trying to delete.
    if (!signup || !signup.id) {
      alert("Signup not found.");
      return;
    }
    const signupDeleteResponse = await fetch(
      `/api/signups/${signup.id}`,
      {
        method: "DELETE",
      }
    );

    if (signupDeleteResponse.ok) {
      await updateSpotCount();
      window.location.reload();
    } else {
      alert("Failed to cancel signup.");
    }
  } catch (error) {
    console.error(error.message);
  }
};

cancelSignupForm.addEventListener("submit", cancelSignUpHandler);
