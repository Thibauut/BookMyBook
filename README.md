# BookMyBook

**BookMyBook** is an application that allows users to borrow books and pick them up using a generated Barcode. This project utilizes a MySQL database, a Python-based API, and a mobile app built with React Native and Expo.

## Technologies Used

- **Backend (API)**: Python with Flask to build the API.
- **Database**: MySQL for managing user, book, and loan data.
- **Frontend (Mobile App)**: React Native with Expo for the mobile application.

## Features

- **Borrow a book**: Users can borrow books online.
- **Barcode**: A Barcode is generated for each loan, which the user can scan to pick up the book.
- **Loan Tracking**: Track borrowed books and due dates.

## Prerequisites

Before starting the project, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)  to use npm and Expo.
- [Python 3](https://www.python.org/)  to run the API.
- [MySQL](https://www.mysql.com/)  for database management.
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  for mobile app development.

## Installation

### 1. Clone the Project
Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/bookmybook.git
```

### 2 Install Dependencies
Backend (API)
Navigate to the backend directory and install the necessary dependencies.

```bash
cd backend
pip install Flask
pip install Flask-Cors
pip install Flask-MySQLdb
pip install bcrypt
```
Frontend (React Native)
Navigate to the mobile app directory and install dependencies using npm.

```bash
npm install
```
3. Install Expo CLI
If you haven't installed Expo CLI yet, install it globally with npm:

```bash
npm install -g expo-cli
```

4. Run the API (Backend)
Navigate to the backend directory and run the API with Python:

```bash
cd backend
python3 backend.py
```
The API will now be available locally at http://localhost:30360.

6. Run the React Native App (Frontend)
Start Expo to launch the app:

```bash
npx expo start
```
This will open a page in your browser where you can scan the QR code to run the app on your mobile device or in an emulator.

## Screenshots
<div align="center">
  <img src="./screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.27.43.png" alt="Description of image 2" width="120" height="100%">
  <img src="/screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.30.33.png" alt="Description of image 1" width="120" height="10%%">
  <img src="/screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.30.40.png" alt="Description of image 3" width="120" height="100%">
    <img src="/screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.30.48.png" alt="Description of image 4" width="120" height="100%">
    <img src="/screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.30.56.png" alt="Description of image 5" width="120" height="100%">
    <img src="/screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.31.02.png" alt="Description of image 5" width="120" height="100%">
    <img src="/screen_app/Simulator Screenshot - iPhone 11 - 2024-12-05 at 15.31.09.png" alt="Description of image 5" width="120" height="100%">
</div>
