const editOpportunityForm = document.getElementById("edit-opportunity-form");
const opportunityID = editOpportunityForm.getAttribute("data-opportunity-id");

const editOpportunityHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const description = document.querySelector("#description").value.trim();
  const requirements = document.querySelector("#requirements").value.trim();
  const date = document.querySelector("#date").value;
  const location = document.querySelector("#location").value.trim();
  const startTime = document.querySelector("#startTime").value;
  const endTime = document.querySelector("#endTime").value;
  const spotsAvailable = parseInt(document.querySelector("#spotsAvailable").value);
  const spotsFilledCount = parseInt(document.querySelector("#spotsFilledCount").value);
  const status = document.querySelector("#status").value;

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

  // Check for required fields
  if (title && description && requirements && date && location && startTime && endTime && status) {
    try {
      const response = await fetch(
        `/api/opportunities/${opportunityID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opportunity),
        }
      );
      if (response.ok) {
        window.location.replace("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Opportunity update failed");
        window.location.replace("/");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all required fields");
  }
};

editOpportunityForm.addEventListener("submit", editOpportunityHandler);
