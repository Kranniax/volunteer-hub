const cancelSignupForm = document.querySelector("#cancel-signup-form");
const opportunityId = parseInt(window.location.pathname.split("/").pop());

const cancelSignUpHandler = async (event) => {
  event.preventDefault();
  const profileEndpoint = "http://localhost:3001/api/users/profile";
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
      `http://localhost:3001/api/signups/${signup.id}`,
      {
        method: "DELETE",
      }
    );
    if (signupDeleteResponse.ok) {
      window.location.reload();
    } else {
      alert("Failed to cancel signup.");
    }
  } catch (error) {
    console.error(error.message);
  }
};

cancelSignupForm.addEventListener("submit", cancelSignUpHandler);
