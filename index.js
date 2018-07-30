// root file
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// CLient ID: 5919214599-btpefgmd9uaj54cr703plcmn9jgqgrlv.apps.googleusercontent.com
// CLient Secret: 3MMomctAnjcaHpunAT96oHjx

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
