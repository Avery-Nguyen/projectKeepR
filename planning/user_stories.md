
## Project Requirements

- user can register/login and be assigned to an organization
- an organization has many users
- user can add a new username and password for a specific website
- app can generate passwords based on the criteria specified (password length, contains lowercase, contairs uppercase, contains numbers, etc)
- user can edit and change their password any time
- user has a convinient copy to clipboard button so they dont have to select the password
- sites can be categoried, to, social (fb, linkedin), work related (bamboo, harvest), entertainment (snapchat, reddit), etc, etc

## User Stories

- As a user, I want to login because I need to use a company password

- As a user, I want to create new account on a website for the company so we can use their service

- As a user, I want the app generate a password because it is more secure

- As a user, I want to change a password so its more secure

- As a user, I want to click a button to copy the password to the clipboard because it is faster

- As a user, I want my sites/passwords categorized because it is convienient 

- As a non-user, I should not be able to see a companies passwords/accounts

## ERD 
!["ERD Screenshot"](https://github.com/Avery-Nguyen/projectKeepR/blob/master/planning/docs/ERD_password_keepr.png?raw=true)

## Routes
### users
B GET /websites 
R GET /websites/:id
E POST /website/:id
A POST /websites
D POST /website/:id/delete

### non-users
B GET /login
