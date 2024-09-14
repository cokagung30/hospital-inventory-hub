# **Hospital Inventory Management App** 🏥

A **Node.js** and **Express** powered backend for managing hospital inventory efficiently. Integrated with **Firebase** for real-time data handling, **Elasticsearch** for advanced search functionalities, and **JWT authentication** for secure user access. This app allows hospitals to track medical supplies, equipment, and pharmaceuticals with ease.

## Key Features 🔑

- **Real-Time Inventory Tracking**: Powered by Firebase for instant updates.
- **Advanced Search**: Elasticsearch ensures fast, full-text search functionality.
- **Secure Authentication**: Implemented using JWT to ensure secure access.
- **API Documentation**: Swagger-based interactive API documentation for easy testing.

---

## Tech Stack 🛠️

| **Technology**   | **Purpose**                               |
| ---------------- | ----------------------------------------- |
| **Node.js**       | Server-side scripting                     |
| **Express.js**    | Web framework for building REST APIs      |
| **Firebase**      | Real-time NoSQL database                  |
| **Elasticsearch** | Search engine for quick inventory lookup  |
| **JWT**           | Secure authentication and authorization   |
| **Swagger**       | API documentation and testing             |

---

## Setup Instructions 🛠️

1. **Clone the repository**:
    ```bash
    git clone https://github.com/cokagung30/hospital-inventory-hub.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:  
    Add your Firebase credentials to a `.env` file:
    ```bash
    FIREBASE_PROJECT_ID=<your-project-id>
    FIREBASE_CLIENT_EMAIL=<your-client-email>
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-private-key>\n-----END PRIVATE KEY-----\n"
    JWT_SECRET=""
    ELASTICSEARCH_NODE=""
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```

---

## API Documentation 📄

You can explore the API using **Swagger**. Once the app is running, visit:

```bash
http://localhost:5050/api-docs
```

![Swagger UI](https://github.com/user-attachments/assets/04eae2e8-2b04-4ea1-b36a-93380d6f134e)

---

## Authentication 🔐

The app uses **JWT** for secure authentication. After logging in, you will receive a JWT token which should be included in the `Authorization` header for all authenticated requests.

Example:
```http
Authorization: Bearer your_jwt_token_here

---

## Project Structure 📂

The project follows a modular structure to keep the codebase organized and maintainable. Below is an overview of the key directories and files in the project:

```bash
├── src/                         # Main application folder
│   ├── config/                  # Configuration files for the app (e.g., Firebase, Elasticsearch)
│   ├── locales/                 # Localization files (i18n JSON translation files)
│   ├── middleware/              # Custom middleware functions (e.g., auth, rate-limiting)
│   ├── models/                  # Database models for interacting with Firebase or other databases
│   ├── modules/                 # Core modules handling business logic and features
│   ├── types/                   # TypeScript type definitions for strong typing
│   ├── utils/                   # Utility functions for common operations
│   ├── i18n.ts                  # i18n (internationalization) setup and configuration
│   ├── index.ts                 # Entry point for starting the Express server
│   ├── module-alias.ts          # Alias configuration for cleaner imports
├── .env                         # Environment variables (hidden, not tracked by version control)
├── .env.example                 # Example of environment variables setup for contributors
├── .gitignore                   # List of files and directories ignored by Git
├── eslint.config.mjs            # ESLint configuration file for code linting
├── package-lock.json            # Lock file for package management
├── package.json                 # Project metadata and dependencies
├── README.md                    # Documentation for the project
└── tsconfig.json                # TypeScript configuration file

