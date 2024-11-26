# Build a Secure Chat Application with React, Permit.io, and Firebase :writing_hand:

This repository contains the demo project for building a secure chat application using React, Firebase, and Permit.io for role-based access control (ReBAC). Users are assigned roles like Member and Moderator, with permissions to perform different CRUD operations in real-time chat rooms. Check out the full tutorial on [the Permit blog](https://www.permit.io/blog/coding-tutorial-build-a-secure-chat-app-with-react-firebase-and-permitio).

Visit my blog, [Timonwa's Notes](https://tech.timonwa.com/blog), for more awesome technical content such as articles, code snippets, tech goodies, community
projects, and more.

If you find this repository helpful, please give it a ⭐ to show your support!

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [License](#license)

---

## Features

- Relationship-based access control (ReBAC) using Permit.io
- Real-time messaging with Firebase
- User authentication with Firebase Auth (Google login)
- Chat rooms with permissions: moderators and members
- CRUD actions with different permissions per role

## Technologies Used

- **React** – Frontend library for building UI
- **Firebase** – For real-time database and authentication
- **Permit.io** – Handles permissions and relationship-based access control
- **Cloud Functions** – Backend API for permission checks

---

## Setup and Installation

To run this project locally:

- **Clone the repository:**

  ```bash
  git clone https://github.com/timonwa/react-chat-permitio-firebase.git
  ```

- **Install dependencies:**

  ```bash
  cd react-chat-permitio-firebase
  npm install
  ```

- **Start the development server:**

  ```bash
  npm start
  ```

---

## License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/Timonwa/react-chat-permitio-firebase/blob/main/LICENSE.MD) file
for details.

---

### Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Permit.io Documentation](https://docs.permit.io)
