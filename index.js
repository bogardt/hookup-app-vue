const express = require("./server_mock/node_modules/express");
const bodyParser = require("./server_mock/node_modules/body-parser");
const cors = require("./server_mock/node_modules/cors");
const fileUpload = require("./server_mock/node_modules/express-fileupload");
const morgan = require("./server_mock/node_modules/morgan");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(morgan("dev"));

let users = [
  {
    email: "t@t.com",
    password: "toto",
    name: "t",
    id: 1,
  },
];
let meetups = [];

// Mock data for meetups
meetups = [
  {
    id: 1,
    distance: 100,
    photo: "/uploads/photo1.jpg",
    description: "Meetup at 100m",
  },
  {
    id: 2,
    distance: 500,
    photo: "/uploads/photo2.jpg",
    description: "Meetup at 500m",
  },
  {
    id: 3,
    distance: 1000,
    photo: "/uploads/photo3.jpg",
    description: "Meetup at 1km",
  },
];

// Register endpoint
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: Date.now(), name, email, password };
  users.push(user);
  res.json({ user, token: "dummy-token" });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ user, token: "dummy-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Fetch meetups endpoint
app.get("/api/meetups", (req, res) => {
  const { distance } = req.query;
  const filteredMeetups = meetups.filter((m) => m.distance <= distance);
  res.json(filteredMeetups);
});

// Create meetup endpoint
app.post("/api/meetups", (req, res) => {
  const { distance } = req.body;
  const photo = req.files.photo;
  const photoPath = `/uploads/${photo.name}`;
  photo.mv(`.${photoPath}`);
  const meetup = {
    id: Date.now(),
    distance: Number(distance),
    photo: photoPath,
    description: `Meetup at ${distance}m`,
  };
  meetups.push(meetup);
  res.json(meetup);
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
