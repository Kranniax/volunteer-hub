import { faker } from "@faker-js/faker";

const volunteerTestUsers = 50;
const userCount = 100;

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
const volunteers = createRandomVolunteers(volunteerTestUsers);

export { randomUsers, volunteers };
