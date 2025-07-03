var organizationProfileFormHandler = async function (event) {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const description = document.querySelector("#description").value.trim();
  const mission = document.querySelector("#mission").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const website = document.querySelector("#website").value.trim();
  const address = document.querySelector("#address").value.trim();
  const latitude = document.querySelector("#latitude").value.trim();
  const longitude = document.querySelector("#longitude").value.trim();
  const contactPerson = document.querySelector("#contactPerson").value.trim();
  const logoImage = document.querySelector("#logoImage").value.trim();

  const profile = {
    name,
    description,
    mission,
    phone,
    website,
    address,
    latitude: latitude ? parseFloat(latitude) : undefined,
    longitude: longitude ? parseFloat(longitude) : undefined,
    contactPerson,
    logoImage,
    isVerified: false,
  };
//   console.log(profile);
  

  // Check for required fields
  if (name && description) {
    try {
      const response = await fetch("http://localhost:3001/api/organizations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Organization profile creation failed");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all required fields");
  }
};

document
  .querySelector(".organization-form")
  .addEventListener("submit", organizationProfileFormHandler);
