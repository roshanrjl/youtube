import passport, { use } from "passport";
import { GoogleStrategy } from "passport-google-oauth20";
import { githubStrategy } from "passport-github2";
import dotenv from "dotenv";

dotenv.config();
//configuration for google login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        email: profile.email[0].value,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value,
      };

      done(null, user);
    }
  )
);
//configuration for github
passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = {
        githubId: profile.id,
        email: profile.emails?.[0].value ,
        name: profile.username,
        avatar: profile.photos?.[0]?.value,
      };
      done(null,user)
    }
  )
);
