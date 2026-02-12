const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const { userSchema, loginSchema } = require("../config/zod");
const { sendEmail } = require("../lib/email");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};

function getAppUrl() {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT}`;
  }
  return process.env.APP_URL || `http://localhost:${process.env.PORT}`;
}

exports.register = async (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Invalid Data", error: result.error.flatten() });
  }

  try {
    const { username, email, password } = sanitize(result.data);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Registration failed: User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
      isEmailVerified: false,
    });

    // Email verification token (will be used for email verification process)
    const verificationToken = jwt.sign(
      { userId: newUser._id },
      process.env.EMAIL_VERIFICATION_SECRET,
      { expiresIn: "1d" },
    );

    const verifyUrl = `${getAppUrl()}/api/auth/verify-email?token=${verificationToken}`;

    await sendEmail(
      email,
      "Verify your email",
      `<p>Please click on the link below to verify your email:</p>
       <p><a href="${verifyUrl}">Verify Email</a></p>`,
    );

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      isEmailVerified: newUser.isEmailVerified,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: "Verification token is missing" });
  }

  try {
    const payload = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);

    const user = await User.findById(payload.userId); // this was coded as { userId: newUser._id } which is mongoose Id, so we can directly use findById
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    user.isEmailVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Invalid Data", error: result.error.flatten() });
    }
    const { email, password } = sanitize(result.data);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // HTTPS only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      role: user.role,
    };

    res.status(200).json({
      message: "User logged in successfully",
      user: userResponse,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.refreshToken = (req, res) => {
  try {
    const cookie = req.cookies.jwt;
    if (!cookie) {
      return res.status(400).json({ message: "No refresh token found" });
    }

    const decoded = jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
