import { faker } from "@faker-js/faker";

const volunteerTestUsers = 100;
const userCount = 50;
// 100 Test Users - Ready to use seed data
const seedUsers = [
  // ADMIN USERS (5)
  { email: "admin1@platform.com", password: "admin123", role: "admin" },
  { email: "admin2@platform.com", password: "secure456", role: "admin" },
  { email: "superadmin@platform.com", password: "manager789", role: "admin" },
  { email: "admin.chief@platform.com", password: "welcome123", role: "admin" },
  {
    email: "platform.admin@platform.com",
    password: "testing456",
    role: "admin",
  },

  // ORGANIZATION USERS (20)
  {
    email: "director@redcross.org",
    password: "redcross2024",
    role: "organization",
  },
  {
    email: "manager@habitat.org",
    password: "buildHomes",
    role: "organization",
  },
  {
    email: "coordinator@foodbank.org",
    password: "coordinate789",
    role: "organization",
  },
  {
    email: "admin@unitedway.org",
    password: "unitedway1",
    role: "organization",
  },
  {
    email: "director@salvation.org",
    password: "salvation24",
    role: "organization",
  },
  { email: "lead@ymca.org", password: "ymcaLeader", role: "organization" },
  { email: "head@goodwill.org", password: "goodwill123", role: "organization" },
  {
    email: "manager@shelter.org",
    password: "shelterMgr",
    role: "organization",
  },
  {
    email: "org.admin@charity.org",
    password: "charity456",
    role: "organization",
  },
  {
    email: "director@nonprofit.org",
    password: "nonprofit1",
    role: "organization",
  },
  {
    email: "coord@community.org",
    password: "community24",
    role: "organization",
  },
  {
    email: "leader@foundation.org",
    password: "foundation1",
    role: "organization",
  },
  {
    email: "manager@animalrescue.org",
    password: "rescue123",
    role: "organization",
  },
  {
    email: "admin@foodpantry.org",
    password: "foodhelp1",
    role: "organization",
  },
  {
    email: "director@homeless.org",
    password: "homeless24",
    role: "organization",
  },
  { email: "coord@veterans.org", password: "veterans1", role: "organization" },
  {
    email: "manager@seniors.org",
    password: "seniors123",
    role: "organization",
  },
  { email: "lead@youth.org", password: "youth2024", role: "organization" },
  {
    email: "admin@environment.org",
    password: "green123",
    role: "organization",
  },
  {
    email: "director@education.org",
    password: "education1",
    role: "organization",
  },

  // VOLUNTEER USERS (75)

  {
    email: "sarah.johnson@gmail.com",
    password: "volunteer1",
    role: "volunteer",
  },
  { email: "mike.davis@yahoo.com", password: "helper123", role: "volunteer" },
  {
    email: "emily.wilson@hotmail.com",
    password: "emily2024",
    role: "volunteer",
  },
  { email: "john.smith@gmail.com", password: "johnvol1", role: "volunteer" },
  { email: "lisa.brown@outlook.com", password: "lisa456", role: "volunteer" },
  { email: "david.miller@gmail.com", password: "david123", role: "volunteer" },
  {
    email: "jennifer.garcia@yahoo.com",
    password: "jennifer1",
    role: "volunteer",
  },
  {
    email: "robert.martinez@gmail.com",
    password: "robert24",
    role: "volunteer",
  },
  {
    email: "maria.rodriguez@hotmail.com",
    password: "maria123",
    role: "volunteer",
  },
  {
    email: "james.taylor@outlook.com",
    password: "james456",
    role: "volunteer",
  },
  { email: "anna.anderson@gmail.com", password: "anna2024", role: "volunteer" },
  {
    email: "michael.thomas@yahoo.com",
    password: "michael1",
    role: "volunteer",
  },
  {
    email: "jessica.jackson@gmail.com",
    password: "jessica24",
    role: "volunteer",
  },
  {
    email: "william.white@hotmail.com",
    password: "william1",
    role: "volunteer",
  },
  {
    email: "ashley.harris@outlook.com",
    password: "ashley123",
    role: "volunteer",
  },
  {
    email: "christopher.martin@gmail.com",
    password: "chris456",
    role: "volunteer",
  },
  {
    email: "amanda.thompson@yahoo.com",
    password: "amanda24",
    role: "volunteer",
  },
  {
    email: "matthew.garcia@gmail.com",
    password: "matthew1",
    role: "volunteer",
  },
  {
    email: "stephanie.lee@hotmail.com",
    password: "steph123",
    role: "volunteer",
  },
  {
    email: "andrew.clark@outlook.com",
    password: "andrew24",
    role: "volunteer",
  },
  { email: "nicole.lewis@gmail.com", password: "nicole456", role: "volunteer" },
  {
    email: "joshua.walker@yahoo.com",
    password: "joshua123",
    role: "volunteer",
  },
  { email: "rachel.hall@gmail.com", password: "rachel24", role: "volunteer" },
  {
    email: "daniel.allen@hotmail.com",
    password: "daniel456",
    role: "volunteer",
  },
  {
    email: "heather.young@outlook.com",
    password: "heather1",
    role: "volunteer",
  },
  { email: "kevin.king@gmail.com", password: "kevin123", role: "volunteer" },
  {
    email: "michelle.wright@yahoo.com",
    password: "michelle24",
    role: "volunteer",
  },
  { email: "brian.lopez@gmail.com", password: "brian456", role: "volunteer" },
  { email: "kimberly.hill@hotmail.com", password: "kim123", role: "volunteer" },
  { email: "jason.green@outlook.com", password: "jason24", role: "volunteer" },
  { email: "laura.adams@gmail.com", password: "laura456", role: "volunteer" },
  { email: "ryan.baker@yahoo.com", password: "ryan123", role: "volunteer" },
  { email: "megan.gonzalez@gmail.com", password: "megan24", role: "volunteer" },
  {
    email: "tyler.nelson@hotmail.com",
    password: "tyler456",
    role: "volunteer",
  },
  {
    email: "crystal.carter@outlook.com",
    password: "crystal1",
    role: "volunteer",
  },
  {
    email: "jacob.mitchell@gmail.com",
    password: "jacob123",
    role: "volunteer",
  },
  { email: "samantha.perez@yahoo.com", password: "sam24", role: "volunteer" },
  { email: "aaron.roberts@gmail.com", password: "aaron456", role: "volunteer" },
  {
    email: "brittany.turner@hotmail.com",
    password: "brittany1",
    role: "volunteer",
  },
  {
    email: "nathan.phillips@outlook.com",
    password: "nathan123",
    role: "volunteer",
  },
  {
    email: "vanessa.campbell@gmail.com",
    password: "vanessa24",
    role: "volunteer",
  },
  {
    email: "jordan.parker@yahoo.com",
    password: "jordan456",
    role: "volunteer",
  },
  { email: "tiffany.evans@gmail.com", password: "tiffany1", role: "volunteer" },
  {
    email: "brandon.edwards@hotmail.com",
    password: "brandon24",
    role: "volunteer",
  },
  {
    email: "christina.collins@outlook.com",
    password: "christina1",
    role: "volunteer",
  },
  { email: "scott.stewart@gmail.com", password: "scott123", role: "volunteer" },
  { email: "amy.sanchez@yahoo.com", password: "amy456", role: "volunteer" },
  {
    email: "jonathan.morris@gmail.com",
    password: "jonathan1",
    role: "volunteer",
  },
  {
    email: "monica.rogers@hotmail.com",
    password: "monica24",
    role: "volunteer",
  },
  {
    email: "jeremy.reed@outlook.com",
    password: "jeremy123",
    role: "volunteer",
  },
  { email: "kayla.cook@gmail.com", password: "kayla456", role: "volunteer" },
  { email: "austin.bailey@yahoo.com", password: "austin24", role: "volunteer" },
  {
    email: "denise.rivera@gmail.com",
    password: "denise123",
    role: "volunteer",
  },
  { email: "adam.cooper@hotmail.com", password: "adam456", role: "volunteer" },
  {
    email: "julie.richardson@outlook.com",
    password: "julie24",
    role: "volunteer",
  },
  { email: "sean.cox@gmail.com", password: "sean123", role: "volunteer" },
  {
    email: "leslie.howard@yahoo.com",
    password: "leslie456",
    role: "volunteer",
  },
  { email: "marcus.ward@gmail.com", password: "marcus24", role: "volunteer" },
  {
    email: "crystal.torres@hotmail.com",
    password: "crystal24",
    role: "volunteer",
  },
  {
    email: "erik.peterson@outlook.com",
    password: "erik123",
    role: "volunteer",
  },
  { email: "cynthia.gray@gmail.com", password: "cynthia1", role: "volunteer" },
  { email: "alex.ramirez@yahoo.com", password: "alex456", role: "volunteer" },
  { email: "mariah.james@gmail.com", password: "mariah24", role: "volunteer" },
  {
    email: "derek.watson@hotmail.com",
    password: "derek123",
    role: "volunteer",
  },
  {
    email: "brooke.brooks@outlook.com",
    password: "brooke456",
    role: "volunteer",
  },
  { email: "chase.kelly@gmail.com", password: "chase24", role: "volunteer" },
  { email: "paige.sanders@yahoo.com", password: "paige123", role: "volunteer" },
  { email: "trevor.price@gmail.com", password: "trevor456", role: "volunteer" },
  {
    email: "sierra.bennett@hotmail.com",
    password: "sierra24",
    role: "volunteer",
  },
  { email: "colin.wood@outlook.com", password: "colin123", role: "volunteer" },
  {
    email: "autumn.barnes@gmail.com",
    password: "autumn456",
    role: "volunteer",
  },
  { email: "blake.ross@yahoo.com", password: "blake24", role: "volunteer" },
  {
    email: "destiny.henderson@gmail.com",
    password: "destiny1",
    role: "volunteer",
  },
  {
    email: "garrett.coleman@hotmail.com",
    password: "garrett24",
    role: "volunteer",
  },
  {
    email: "sydney.jenkins@outlook.com",
    password: "sydney123",
    role: "volunteer",
  },
  { email: "travis.perry@gmail.com", password: "travis456", role: "volunteer" },
  { email: "jade.powell@yahoo.com", password: "jade24", role: "volunteer" },
  { email: "hunter.long@gmail.com", password: "hunter123", role: "volunteer" },
  {
    email: "maya.patterson@hotmail.com",
    password: "maya456",
    role: "volunteer",
  },
  {
    email: "connor.hughes@outlook.com",
    password: "connor24",
    role: "volunteer",
  },
];
// function createRandomUsers(count) {
//   const roles = ["admin", "organization", "volunteer"];
//   const users = [];
//   for (let i = 0; i < count; i++) {
//     users.push({
//       email: faker.internet.email(),
//       password: faker.internet.password({ length: 10 }),
//       role: roles[Math.floor(Math.random() * roles.length)],
//     });
//   }
//   return users;
// }
// const randomUsers = createRandomUsers(userCount);


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

export { seedUsers, volunteers };
