
# Backend Project

This project is a backend service that provides user authentication, profile management, and other related features. It is built with Node.js and Express, and it uses MongoDB as its database.

## Tech Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A cross-platform document-oriented database program.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Bcrypt**: A library for hashing passwords.
- **Cloudinary**: A cloud-based service that provides an end-to-end image and video management solution.
- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **Express-validator**: A set of Express.js middlewares that wraps `validator.js` validator and sanitizer functions.
- **Prettier**: An opinionated code formatter.
- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables**:

    Copy the `.env.example` file to a new `.env` file. Then, fill in the required values in the new `.env` file.

    ```bash
    cp .env.example .env
    ```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the server with Nodemon, which will automatically restart the server when you make changes to the code.

## API Routes

### User Routes

-   `POST /api/v1/users/register`: Register a new user.
-   `POST /api/v1/users/login`: Log in a user.
-   `POST /api/v1/users/logout`: Log out a user.
-   `POST /api/v1/users/refresh-token`: Refresh the access token.
-   `POST /api/v1/users/change-password`: Change the current password.
-   `GET /api/v1/users/current-user`: Get the current user's details.
-   `PATCH /api/v1/users/update-account`: Update the user's account details.
-   `PATCH /api/v1/users/avatar`: Update the user's avatar.
-   `PATCH /api/v1/users/cover-image`: Update the user's cover image.
-   `GET /api/v1/users/c/:username`: Get a user's channel profile.
-   `GET /api/v1/users/history`: Get the user's watch history.
