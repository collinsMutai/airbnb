const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Place = require("../models/PlaceSchema");
exports.test = (req, res, next) => {
  res.json("test ok");
};
let loggedUser = "";
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: "User created!" });
  } catch (err) {
    res.status(422).json({ message: "User registration failed!" });
  }
};
let cookies = "";
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email: email });
    loggedUser = user;

    if (!user) {
      return res.status(422).json({ message: "User login failed. Try again!" });
    }

    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = await jwt.sign(
        { email: user.email, userId: user._id, name: user.name },
        process.env.JWT_KEY
      );
      cookies = token;
      return res
        .cookie("token", token)
        .status(200)
        .json({ message: "User login successful!", user: user });
    }
    return res.status(422).json({ message: "User login failed. Try again!" });
  } catch (err) {
    res.status(422).json({ message: "User login failed. Try again!" });
  }
};

exports.profile = (req, res, next) => {
  // const { token } = req.cookies
  console.log(cookies);
  // res.json({token});
  if (cookies) {
    jwt.verify(cookies, process.env.JWT_KEY, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
  res.cookie("token", cookies).json("cookies");
};

exports.places = async (req, res, next) => {
  // console.log(req.body);
  const {
    owner,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  const getUser = await User.findOne({_id: owner})
  // console.log(getUser, 'found user');
  const newPlace = new Place({
    owner: getUser._id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });
  const placeDoc = await newPlace.save();
  res.json(placeDoc);
};
