const connection = require("../config/connection");
const { Reaction, Thought, User } = require("../models");
// const reactionSchema = require("../models/Reaction");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  const userData = [
    {
      username: "HomerSimpson",
      email: "homer_smrt@yahoo.com",
    },
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

  let user;
  let newThought;
  for (let thought of thoughtData) {
    console.log("Searching for ", thought.userName);
    user = await User.findOne({ username: thought.userName });
    if (!user) {
      console.log("something went wrong");
      exit();
    } else {
      console.log("Found", user.username, user.thoughts);
    }
    newThought = await Thought.collection.insertOne(thought);

    await user.thoughts.push(newThought.insertedId);
    try {
      await user.save();
      console.log("saved", user);
    } catch (error) {
      console.error(error);
    }
  }

  const newUsers = await User.find();

  let friends;
  let friendsIds;
  for (let thisUser of newUsers) {
    friends = await User.find({ _id: { $nin: [thisUser._id] } });
    friendsIds = friends.map((item) => item._id);
    thisUser.friends = friendsIds;
    await thisUser.save();
    // console.log("user", thisUser);
  }

  // Add users to the collection and await the results
  // const t = await Thought.collection.insertMany(thoughtData);
  // console.log("results", t);
  // Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
