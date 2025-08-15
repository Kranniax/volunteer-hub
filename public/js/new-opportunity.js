const newOpportunityForm = document.querySelector(".new-opportunity-form");

const newOpportunityHandler = async (event) => {
  event.preventDefault();
  const opportunityEndPoint = "/api/opportunities/";
  const profileEndpoint = "/api/users/profile";

  // Get form values
  const title = document.querySelector("#title").value.trim();
  const description = document.querySelector("#description").value.trim();
  const requirements = document.querySelector("#requirements").value.trim();
  const date = document.querySelector("#date").value;
  const location = document.querySelector("#location").value.trim();
  const startTime = document.querySelector("#startTime").value;
  const endTime = document.querySelector("#endTime").value;
  const spotsAvailable = parseInt(
    document.querySelector("#spotsAvailable").value
  );
  const spotsFilledCount = parseInt(
    document.querySelector("#spotsFilledCount").value
  );
  const status = document.querySelector("#status").value;

  // Build opportunity object
  const opportunity = {
    title,
    description,
    requirements,
    date,
    location,
    startTime,
    endTime,
    spotsAvailable,
    spotsFilledCount,
    status,
  };

  try {
    // Get current organization id
    const profileResponse = await fetch(profileEndpoint);
    if (!profileResponse.ok) {
      throw new Error(`Response status: ${profileResponse.status}`);
    }
    const { organizationProfile } = await profileResponse.json();
    opportunity.organization_id = organizationProfile.id;
   

    const response = await fetch(opportunityEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opportunity),
    });
    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Failed to create opportunity.");
    }
  } catch (error) {
    alert("Network error: " + error.message);
  }
};

newOpportunityForm.addEventListener("submit", newOpportunityHandler);
