import passport from "passport";
import GoogleOAuth from "passport-google-oauth20";
import GitHubOAuth from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

const { Strategy: GoogleStrategy } = GoogleOAuth;
const { Strategy: GitHubStrategy } = GitHubOAuth;

// Google strategy
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
        email: profile.emails?.[0].value,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value,
      };
      done(null, user);
    }
  )
);

// GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = {
        githubId: profile.id,
        email: profile.emails?.[0].value,
        name: profile.username,
        avatar: profile.photos?.[0]?.value,
      };
      done(null, user);
    }
  )
);
