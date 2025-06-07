import { faker } from "@faker-js/faker";
import { or } from "sequelize";

const volunteerCount = 50;
const userCount = 100;
const organizationCount = 25;

// Create random users.
function createRandomUsers(count) {
  const roles = ["admin", "organization", "volunteer"];
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      role: roles[Math.floor(Math.random() * roles.length)],
    });
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
      user_id: i + 1,
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
const volunteers = createRandomVolunteers(volunteerCount);

// create random organizations.
function createRandomOrganizations(count) {
  var randomOrganizationsArr = [];

  for (var i = 0; i < count; i++) {
    var organization = {
      user_id: i + 1,
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
const organizations = createRandomOrganizations(organizationCount);

export { randomUsers, volunteers, organizations };
