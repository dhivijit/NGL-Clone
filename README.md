# NGL-Clone

This is a clone of the NGL (Not Gonna Lie) social platform, which you can host yourself and manage your own data.

## Features
- Receive anonymous messages
- Admin panel for viewing messages
- Customizable profile settings

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dhivijit/NGL-Clone.git
    ```
2. Navigate to the project directory:
    ```bash
    cd NGL-Clone
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up the environment variables:
  Create a .env file in the root directory and add the following variables:

    ```env
    PORT=3000
    ADMIN_PASSWORD="your_admin_password"
    INSTAGRAM_USERNAME="your_instagram_username"
    PROFILE_PICTURE="link_to_your_profile_picture"
    ```
- `PORT`: The port your server will run on (default is 3000 if not specified).
- `ADMIN_PASSWORD`: Password for accessing the admin panel.
- `INSTAGRAM_USERNAME`: Your Instagram username to be displayed.
- `PROFILE_PICTURE`: Link to your profile picture.

5. Start the server
   ```bash
   npm start
   ```

Usage
- Visit http://localhost:3000 to access the platform.
- Use the admin panel to view messages by navigating to http://localhost:3000/adminpage and logging in with the admin password.

# Contributing
Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

# Acknowledgments
- Inspired by the original NGL platform.
