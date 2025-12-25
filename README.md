
# BusPass Scanner

The BusPass_Scanner project is a cross-platform application designed for the authentication and validation of bus pass of students using QR Code. It includes an admin panel for managing users and bus passes, a client-side application for users to interact with their bus passes, and a server-side application to handle data and authentication requests.


## Features

- Authentication of bus pass information
- Admin panel for managing users and passes
- Client-side application for users
- Server-side application for handling data and authentication requests


## Tech Stack

**Client:** React, React Native, Redux, Material UI

**Server:** Node, Express


## Project Structure
```bash
BusPass_Scanner
    │   .gitignore
    │   package-lock.json
    │   package.json
    │
    ├───adminpanel
    │   │   package-lock.json
    │   │   package.json
    │   │   README.md
    │   │   yarn.lock
    │   │
    │   ├───public
    │   │       favicon.ico
    │   │       index.html
    │   │       logo192.png
    │   │       logo512.png
    │   │       manifest.json
    │   │       robots.txt
    │   │       
    │   └───src
    │       │   App.css
    │       │   App.js
    │       │   App.test.js
    │       │   index.css
    │       │   index.js
    │       │   reportWebVitals.js
    │       │   store.js
    │       │
    │       ├───actions
    │       │       actionTypes.js
    │       │       authActions.js
    │       │       busActions.js
    │       │       busFacultyActions.js
    │       │       studentActions.js
    │       │
    │       ├───components
    │       │   ├───AdminPanel
    │       │   │       AdminPanel.js
    │       │   │       styles.js
    │       │   │
    │       │   ├───Borivali
    │       │   │       Borivali.js
    │       │   │       style.js
    │       │   │
    │       │   ├───Data
    │       │   │       Data.js
    │       │   │
    │       │   ├───Form
    │       │   │       EditForm.js
    │       │   │       RegisterForm.js
    │       │   │       style.js
    │       │   │
    │       │   ├───Home
    │       │   │       Home.js
    │       │   │       style.js
    │       │   │
    │       │   ├───Mira Road
    │       │   │       MiraRoad.js
    │       │   │
    │       │   ├───Navbar
    │       │   │       Navbar.js
    │       │   │       style.js
    │       │   │
    │       │   └───Vasai
    │       │           Vasai.js
    │       │
    │       └───reducers
    │               auth.js
    │               buses.js
    │               busFaculties.js
    │               index.js
    │               students.js
    │
    ├───client
    │   │   App.js
    │   │   app.json
    │   │   babel.config.js
    │   │   baseUrl.js
    │   │   package-lock.json
    │   │   package.json
    │   │   store.js
    │   │   yarn.lock
    │   │
    │   ├───.expo-shared
    │   │       assets.json
    │   │
    │   ├───actions
    │   │       actions.js
    │   │       types.js
    │   │
    │   ├───assets
    │   │   │   accountInfo.png
    │   │   │   adaptive-icon.png
    │   │   │   busIcon.png
    │   │   │   favicon.png
    │   │   │   icon.png
    │   │   │   qrCode.png
    │   │   │   qrScanner.png
    │   │   │   splash.png
    │   │   │
    │   │   └───Fonts
    │   │           Nunito-Bold.ttf
    │   │           Nunito-Regular.ttf
    │   │
    │   ├───reducers
    │   │       auth.js
    │   │       buses.js
    │   │       rootReducer.js
    │   │       
    │   ├───Routes
    │   │       BusFacultyTab.js
    │   │       StudentTab.js
    │   │
    │   ├───Screens
    │   │       AccountInfo.js
    │   │       BusFaculty.js
    │   │       Header.js
    │   │       Loading.js
    │   │       Login.js
    │   │       QrCode.js
    │   │       QrScanner.js
    │   │       Role.js
    │   │       Student.js
    │   │       VacancyOfSeats.js
    │   │
    │   └───styles
    │           globalStyles.js
    │
    └───server
        │   database.js
        │   index.js
        │
        ├───controllers
        │       multiAuth.js
        │       multiRoute.js
        │
        ├───middlewares
        │       auth.js
        │
        ├───model
        │       adminModel.js
        │       busFacultyModel.js
        │       busInfoModel.js
        │       studentModel.js
        │
        └───router
            └───api
                    multiAuth.js
                    multiRoute.js
```
## Installation

1. Clone the repository:

```bash
git clone https://github.com/aaryen-dsouza/BusPass_Scanner.git
```

2. Navigate to the project directory
```bash
cd BusPass_Scanner
```

3. Install the dependencies:
```bash
npm install
```
    
## Usage

1. Start the server
```bash
node server/app.js
```

2. Open the client/index.html in your browser to use the client-side application.

3. Open the adminpanel/index.html in your browser to access the admin panel.


## Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Commit your changes (git commit -am 'Add new feature')
4. Push to the branch (git push origin feature-branch)
5. Create a new Pull Request


## Contact

Contact
For any questions or feedback, please get in touch with the project maintainers at rohan.darji0409@gmail.com, maharsh.bajpai27@gmail.com and dc.aaryen@gmail.com
