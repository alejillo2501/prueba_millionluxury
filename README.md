# Technical Test for Million Luxury - Full Stack Application

- **Developer**: Oscar Alejandro Londoño Torres
- **Email**: alejandro.minus@gmail.com
- **Phone**: +57 350 857 5168


This project is a full-stack application developed for a real estate company that allows managing and viewing property information. It includes a .NET backend with MongoDB, and a React/Next.js frontend.

## 🚀 Features

### Backend (API)
- RESTful API developed in .NET 9 with C#
- MongoDB integration for data storage
- Property management endpoints with advanced filters
- Filters by name, address, and price range
- Clean and maintainable architecture
- Proper error handling
- Optimized database queries

### Frontend (Web Application)
- Responsive web application developed with React and Next.js
- Property listing with adaptive design
- Filter system for property search
- Detailed view for each property
- User experience optimized for different devices

### Database
- MongoDB as NoSQL database
- Collections for Properties, Images, and Traces
- Sample data included for testing

## 🛠️ Technologies Used

- **Backend**: .NET 9, C#, MongoDB.Driver
- **Frontend**: React.js/Next.js, TypeScript
- **Database**: MongoDB
- **Testing**: NUnit (Backend), Jest and Mockito (Frontend)
- **Containers**: Docker, Docker Compose

## 📋 Prerequisites

- Node.js (v20 or higher)
- .NET 9 SDK
- Docker and Docker Compose

## 🚀 Steps to Run the Application

### Manual Local Setup

#### 1. Frontend

Navigate to the `inmobiliaria-app` folder and run the following:

```bash
npm install
npm run build
```
### Using Docker (Recommended)

This is the easiest way to get the entire application running, including the database.

1.  **Build and Run Containers**
    From the root of the project, run the following command:
    ```bash
    docker-compose up --build -d
    ```
    This will build the API and frontend images, start all services, and automatically initialize the MongoDB database with sample data.

2.  **Access the Applications**
    -   **Frontend**: Open your browser to [http://localhost:3000](http://localhost:3000)
    -   **Backend API (Swagger UI)**: Open your browser to [http://localhost:5144](http://localhost:5144)

3.  **Manual Database Restore (If Needed)**

    If the database contains no data, you can run the following command after the Docker containers are up:

    **Linux:**
    ```bash
    docker exec -it mongodb-real-estate mongosh "mongodb://localhost:27017/RealEstatePlatform" < ./init-db.js
    ```

    **Windows (PowerShell):**
    ```powershell
    Get-Content .\init-db.js | docker exec -i mongodb-real-estate mongosh "mongodb://localhost:27017"
    ```
