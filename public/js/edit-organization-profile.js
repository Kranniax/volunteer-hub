const editOrgForm = document.getElementById("edit-organization-form");
const organizationID = editOrgForm.getAttribute("data-organization-id");

const editOrgHandler = async function (event) {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const description = document.querySelector("#description").value.trim();
  const mission = document.querySelector("#mission").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const website = document.querySelector("#website").value.trim();
  const address = document.querySelector("#address").value.trim();
  const latitude = document.querySelector("#latitude").value;
  const longitude = document.querySelector("#longitude").value;
  const contactPerson = document.querySelector("#contactPerson").value.trim();
  const logoImage = document.querySelector("#logoImage").value.trim();
  const isVerified = document.querySelector("#isVerified").checked;

  const orgProfile = {
    name,
    description,
    mission,
    phone,
    website,
    address,
    latitude: latitude ? parseFloat(latitude) : null,
    longitude: longitude ? parseFloat(longitude) : null,
    contactPerson,
    logoImage,
    isVerified,
  };

  // Check for required fields
  if (name && description) {
    try {
      const response = await fetch(
        `/api/organizations/${organizationID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orgProfile),
        }
      );
      if (response.ok) {
        window.location.replace("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Organization profile update failed");
        window.location.replace("/");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all required fields");
  }
};

editOrgForm.addEventListener("submit", editOrgHandler);
