import { faker } from "@faker-js/faker";

const userCount = 100;
const volunteerArr = [];
const organizationArr = [];
const adminArr = [];
const VolunteerOpportunityCount = 100;
// const signUpCount = 100;

// Create random users.
function createRandomUsers(count) {
  const roles = ["admin", "organization", "volunteer"];
  const users = [];
  for (let i = 0; i < count; i++) {
    var userID = i + 1;
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      role: roles[Math.floor(Math.random() * roles.length)],
    };
    switch (user.role) {
      case "volunteer":
        volunteerArr.push(userID);
        break;
      case "organization":
        organizationArr.push(userID);
        break;
      default:
        adminArr.push(userID);
        break;
    }
    users.push(user);
  }
  return users;
}
const randomUsers = createRandomUsers(userCount);

// Create random volunteers.
function createRandomVolunteers(count) {
  var randomVolunteers = [];
  var relationships = [
    "parent",
    "child",
    "spouse",
    "sibling",
    "grandparent",
    "grandchild",
  ];

  for (var i = 0; i < count; i++) {
    var volunteer = {
      user_id: volunteerArr[i],
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number({ style: "national" }),
      dateOfBirth: faker.date.birthdate(),
      address: faker.location.streetAddress(),
      emergencyContact: {
        name: faker.person.fullName(),
        phone: faker.phone.number({ style: "national" }),
        relationship:
          relationships[Math.floor(Math.random() * relationships.length)],
      },
      bio: faker.person.bio(),
      profileImage: faker.image.url(),
      totalHours: faker.number.int({ max: 500 }),
      isActive: faker.datatype.boolean({ probability: 0.5 }),
    };

    randomVolunteers.push(volunteer);
  }
  return randomVolunteers;
}
const volunteers = createRandomVolunteers(volunteerArr.length);

// create random organizations.
function createRandomOrganizations(count) {
  var randomOrganizationsArr = [];

  for (var i = 0; i < count; i++) {
    var organization = {
      user_id: organizationArr[i],
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      mission: faker.company.catchPhraseDescriptor(),
      phone: faker.phone.number({ style: "national" }),
      website: faker.internet.url(),
      address: faker.location.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      contactPerson: faker.person.fullName(),
      logoImage: faker.image.url(),
      isVerified: faker.datatype.boolean({ probability: 0.8 }),
    };

    randomOrganizationsArr.push(organization);
  }
  return randomOrganizationsArr;
}
const organizations = createRandomOrganizations(organizationArr.length);

// create random volunteer opportunities.
function createRandomVolunteerOpportunities(count) {
  const statuses = ["open", "closed", "pending"];
  const opportunities = [];
  for (let i = 0; i < count; i++) {
    const opportunity = {
      organization_id: Math.floor(Math.random() * organizationArr.length) + 1, // This assumes organizations will have IDs 1, 2, 3, etc.
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      requirements: faker.lorem.sentence(),
      date: faker.date.future(),
      startTime: faker.date.future().toTimeString().slice(0, 8),
      endTime: faker.date.future().toTimeString().slice(0, 8),
      spotsAvailable: faker.number.int({ min: 1, max: 20 }),
      spotsFilledCount: faker.number.int({ min: 0, max: 20 }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
    opportunities.push(opportunity);
  }
  return opportunities;
}
const volunteerOpportunities = createRandomVolunteerOpportunities(
  VolunteerOpportunityCount
);

// function createRandomVolunteerSignUps(count) {
//   const signUps = [];
//   for (var i = 0; i < count; i++) {
//     signUps.push({
//       opportunity_id:
//         Math.floor(Math.random() * VolunteerOpportunityCount) + 1,
//       volunteer_id: Math.floor(Math.random() * volunteerArr.length) + 1,
//     });
//   }
//   return signUps;
// }

// const volunteerSignups = createRandomVolunteerSignUps(signUpCount);

export { randomUsers, volunteers, organizations, volunteerOpportunities };
