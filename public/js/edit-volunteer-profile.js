const editProfileForm = document.querySelector(".edit-volunteer-form");
const volunteerID = editProfileForm.getAttribute("data-volunteer-id");

var editProfileHandler = async function (event) {
  event.preventDefault();
  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const dateOfBirth = document.querySelector("#dateOfBirth").value.trim();
  const address = document.querySelector("#address").value.trim();
  const emergencyName = document
    .querySelector("#emergencyContactName")
    .value.trim();
  const emergencyPhone = document
    .querySelector("#emergencyContactPhone")
    .value.trim();
  const emergencyRelationship = document
    .querySelector("#emergencyContactRelationship")
    .value.trim();
  const bio = document.querySelector("#bio").value.trim();
  const profileImage = document.querySelector("#profileImage").value.trim();

  const profile = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    dateOfBirth: dateOfBirth,
    address: address,
    emergencyContact: {
      name: emergencyName,
      phone: emergencyPhone,
      relationship: emergencyRelationship,
    },
    bio: bio,
    profileImage: profileImage,
    isActive: true,
  };
  //   console.log(profile);

  // Check for any blank input fields.
  if (firstName && lastName && dateOfBirth && address) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/volunteers/${volunteerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      if (response.ok) {
        // if successful render dashboard.
        window.location.replace("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Volunteer profile creation failed");
        window.location.replace("/");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all fields");
  }
};

editProfileForm.addEventListener("submit", editProfileHandler);
