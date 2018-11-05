import express from "express";
import User from "../models/User";
import { sendConfirmationEmail } from "../mailer";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

router.post('/confirmation', (req, res) => {
  const {token} = req.body;
  User.findOneAndUpdate(
      { confirmationToken: token },
      { confirmationToken: "", confirmed: true },
      { new: true }
    )
    .then(user => {
      user ?
      res.json({user: user.toAuthJSON()}) : res.status(400).json({})
    })
})

router.post('/resend_confirmation', (req, res) => {
  const {email} = req.body;
  User.findOne({email}).then(user => {
    if (user && user.confirmed === false) {
      sendConfirmationEmail(user);
      res.json({user: user.toAuthJSON()})
    } else if ( user && user.confirmed === true) {
      res.status(400).json({errors: { global: "Already confirmed" }})
    } else {
      res.status(404).json({errors: { global: "User not found" }})
    }
  });
})

export default router;
