var signUpFormHandler = async function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const role = document.querySelector("#role").value.trim();

  // Check for any blank input fields.
  if (email && password && role) {
    try {
      const response = await fetch("http://localhost:3001/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        // if successful render the appropriate pages.
        switch (role) {
          case "volunteer":
            document.location.replace("/volunteer-profile");
            break;
          case "organization":
            document.location.replace("/organization-profile");
            break;
          default:
            alert("You do not have admin access");
            document.location.replace("/signup");
            break;
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Signup Failed");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  } else {
    alert("Please fill in all fields");
  }
};

var volunteerProfileFormHandler = async function (event) {
  event.preventDefault();
  const firstName = document.querySelector("#firstName").trim().value;
  const lastName = document.querySelector("#lastName").trim().value;
  const phone = document.querySelector("#phone").trim().value;
  const dateOfBirth = document.querySelector("#dateOfBirth").trim().value;
  const address = document.querySelector("#address").trim().value;
  const emergencyName = document.querySelector("#emergencyName").trim().value;
  const emergencyPhone = document.querySelector("#emergencyPhone").trim().value;
  const emergencyRelationship = document
    .querySelector("#emergencyRelationship")
    .trim().value;
  const bio = document.querySelector("#bio").trim().value;
  const profileImage = document.querySelector("#profileImage").trim().value;

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
  console.log(profile);
  
  // Check for any blank input fields.
  // if (firstName && lastName && dateOfBirth && address) {
  //   try {
  //     const response = await fetch("http://localhost:3001/api/volunteers/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(profile),
  //     });

  //     if (response.ok) {
  //       // if successful render homepage.
  //       document.location.replace("/");
  //     } else {
  //       const errorData = await response.json();
  //       alert(errorData.message || "Signup Failed");
  //     }
  //   } catch (error) {
  //     alert("Network error: " + error.message);
  //   }
  // } else {
  //   alert("Please fill in all fields");
  // }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signUpFormHandler);

document
  .querySelector(".volunteer-form")
  .addEventListener("submit", volunteerProfileFormHandler);
