# StickyNotes

A simple sticky notes boad SPA built with Laravel 9 + React 18.

  ## Installation

Before install make sure you have all system requirements to run <strong>Laravel 9</strong> (<a  target="_blank"  href="https://laravel.com/docs/9.x/deployment">See the official documentation</a>). It's recommended to use MariaDB as database.

- Clone this repo in your environment
- In root directory copy `.env.example` file and rename it to `.env`
- Open your `.env` file and set the following variables according to your environment configuration
    
    - `APP_URL`
    - `DB_HOST`
    - `DB_PORT`
    - `DB_DATABASE`
    - `DB_USERNAME`
    - `DB_PASSWORD`
    - `APP_NAME` (Optional. I suggest **StickyNotes**)
    - `VITE_API_URL_ENDPOINT="${APP_URL}/api"` (don't change it!)
 - In root directory run these commands in order:
    - `composer install`
    - `php artisan key:generate`
    - `php artisan migrate`
    - `php artisan db:seed`
    - `php artisan serve`
    - `npm install`
    - `npm run dev` or `npm run build`
 
 If everything is ok you should be able to access your app via the app url you set earlier (eg. `http://localhost:8000`).
 A user will be created automatically during installation:
    
    username: stickyuser
    password: stickypassword

## Usage

With this app you can create, edit and delete as many text notes as you want and convert an image (only .jpg and .png, max 1MB) into notes by simply dragging them to the board.
User access is only frontend based. Backend access has not been implemented.
This app can be used without sign up but the registered users can save and recover their notes after each access.


### User sign up
The registration is the top of simplicity, only username and password are required. As requested, the classic registration via email has not been implemented, so be careful not to forget your credentials!
The authentication actions can be found at the top right, "Register" for sign up, "Login" for sign in. That's all! 
