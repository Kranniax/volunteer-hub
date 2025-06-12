import { faker } from "@faker-js/faker";

const userCount = 100;
const opportunityCount = 50;
const signUpCount = 100;

// Create random users.
function createRandomUsers(count) {
  const roles = ["admin", "organization", "volunteer"];
  const users = [];
  for (var i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password({ length: 15 }),
      role: roles[Math.floor(Math.random() * roles.length)],
    });
  }
  return users;
}
const randomUsers = createRandomUsers(userCount);

// Create random volunteers based on an array of volunteer user objects
var createRandomVolunteers = function (volunteerArr) {
  var randomVolunteers = [];
  var relationships = [
    "parent",
    "child",
    "spouse",
    "sibling",
    "grandparent",
    "grandchild",
  ];

  for (var i = 0; i < volunteerArr.length; i++) {
    var volunteer = {
      user_id: volunteerArr[i].id, // Link to the corresponding user
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
};

// Create random organizations based on an array of organization user objects
var createRandomOrganizations = function (organizationArr) {
  var randomOrganizationsArr = [];

  for (var i = 0; i < organizationArr.length; i++) {
    var organization = {
      user_id: organizationArr[i].id, // Link to the corresponding user
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
};

// Create random volunteer opportunities, each linked to a random organization
var createRandomVolunteerOpportunities = function (organizationArr) {
  const statuses = ["open", "closed", "pending"];
  const opportunities = [];
  for (let i = 0; i < opportunityCount; i++) {
    opportunities.push({
      // Use a valid organization_id from organizationArr (which is an array of organization objects)
      organization_id:
        organizationArr[Math.floor(Math.random() * organizationArr.length)].id,
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      requirements: faker.lorem.sentence(),
      date: faker.date.future(),
      startTime: faker.date.future().toTimeString().slice(0, 8),
      endTime: faker.date.future().toTimeString().slice(0, 8),
      spotsAvailable: faker.number.int({ min: 1, max: 20 }),
      spotsFilledCount: faker.number.int({ min: 0, max: 20 }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return opportunities;
};

// Create unique volunteer signups for opportunities (no duplicate pairs)
var createRandomVolunteerSignUps = function (opportunityArr, volunteerArr) {
  const signups = [];
  const usedCombinations = new Set();

  for (var i = 0; i < signUpCount; i++) {
    let opportunityId, volunteerId, combination;
    // Keep generating until we find a unique combination
    do {
      opportunityId =
        opportunityArr[Math.floor(Math.random() * opportunityArr.length)].id;
      volunteerId =
        volunteerArr[Math.floor(Math.random() * volunteerArr.length)].id;
      combination = `${opportunityId}-${volunteerId}`;
    } while (usedCombinations.has(combination));
    usedCombinations.add(combination);
    signups.push({
      opportunity_id: opportunityId,
      volunteer_id: volunteerId,
    });
  }
  return signups;
};

export {
  randomUsers,
  createRandomVolunteers,
  createRandomOrganizations,
  createRandomVolunteerOpportunities,
  createRandomVolunteerSignUps,
};
