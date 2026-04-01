# Employee Management System


## Overview

This is a full-stack Employee Management System built to manage employee data, authentication, and reporting in a structured and secure way.


## Tech Stack

- Frontend: React + TypeScript

- Backend: ASP.NET Core Web API

- Database: MySQL


## Features

- Secure login using JWT authentication

- Add, edit, delete employees

- View employee details

- Form validation and error handling

- PDF/Excel report generation


## Demo Credentials

Use the following credentials to log in:


- Username: admin  

- Password: admin123  


## Project Structure

EmployeeManagementSystem/
├── EmployeeManagement.Api/      # ASP.NET Core Backend
├── employee-management-ui/      # React Frontend
├── EmployeeManagement.sln

## Setup Instructions

### Backend
1. Navigate to backend folder: cd EmployeeManagement.Api
2. Update database connection string in: appsettings.json
3. Run the API: dotnet run


---

### Frontend
1. Navigate to frontend folder: cd employee-management-ui
2. Install dependencies: npm install
3. Start the application: npm run dev


## Notes

- Database credentials are not included for security reasons.
- Please update the connection string before running the project.
- Ensure MySQL is running locally.


## Demo Video

https://www.loom.com/share/your-video-link

## Author

Urmy Biswas


## Architecture

- Layered architecture (Controller → Service → Repository)
- JWT-based authentication
- Secure password hashing using BCrypt