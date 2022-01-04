const connection = require("../config/connection");
const { Reaction, Thought, User } = require("../models");
// const reactionSchema = require("../models/Reaction");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  const userData = [
    { username: "HomerSimpson", email: "homer_smrt@yahoo.com" },
    { username: "LisaS", email: "lisa_simpson@gmail.com" },
    { username: "MargieS", email: "smarge@yahoo.com" },
    { username: "bartman", email: "eatmyshorts@gmail.com" },
  ];

  const thoughtData = [
    {
      thoughtText: "Trying is the first step towards failure.",
      userName: "HomerSimpson",
      reactions: [{ reactionBody: "Totally agree", userName: "bartman" }],
    },
    {
      thoughtText: "There’s only one thing to do at a moment like this: strut!",
      userName: "bartman",
      reactions: [
        { reactionBody: "Go to bed, Bart!", userName: "margieS" },
        { reactionBody: "Zzzzz", userName: "bartman" },
      ],
    },
    {
      thoughtText:
        "Don’t you think we ought to attack the roots of our social problems instead of jamming people into overcrowded prisons?",
      userName: "LisaS",
      reactions: [],
    },
  ];

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // // Drop existing reactions
  // await Reaction.deleteMany({});

  // Add users to the collection and await the results
  await User.collection.insertMany(userData);

  // Add users to the collection and await the results
  await Thought.collection.insertMany(thoughtData);

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.table(Thought);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
