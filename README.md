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