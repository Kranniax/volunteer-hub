export default {
  signedUp: (currentVolunteerId, volunteerList) => {
    const volunteerIds = volunteerList.map((v) => v.user_id);
    if (volunteerIds.includes(currentVolunteerId)) {
      return true;
    } else {
      return false;
    }
  },
  checkRole: (role) => {
    if (role === "organization") {
      return true;
    } else {
      return false;
    }
  },
};
