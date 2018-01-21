## Homepage - Not Logged In
- [ ] As a user I want to see the logo
- [ ] As a user I want to see the calendar
- [ ] As a user I want to login
    - [ ] Username and password input
    - [ ] If I forget my password I want to reset it
        - [ ]  Username / password/ retype password
- [ ]  As a user I want to create an account
    - [ ]  Username / password / retype password / name / phone number

## Homepage - Logged in
- [ ]  As a user once I’m logged in I want to see my name
    - [ ]  “Hi, John Doe”
- [ ]  As a user I want to access “My Account”
    - [ ]  Add a link to the user “My Account” within the users name
- [ ]  As a user I want to book a new appointment
    - [ ]  3 preferred time inputs - Month / Day / Year / Time
    - [ ]  Description input
- [ ]  As a user I want to Logout

## Client Console
- [ ]  As a user I want to see my appointment history
    - [ ]  Displays the date of appointment & description
- [ ]  As a user I want to see my chat logs
    - [ ]  Socket.Io & Mongo
- [ ]  As a user I want to edit my profile information
    - [ ]  Placehold the original users information
    - [ ]  When the user clicks edit it unlocks the information
    - [ ]  When the user clicks save it locks the information

## Admin Console - 'nameofsite.com/admin'
- [ ]  As an admin id like to login
    - [ ]  Using Google Oauth
- [ ]  As an admin id like to see my dashboard
    - [ ]  Chatlogs
        - [ ]  Each user with a chat - New notifications
            - [ ]  Socket.Io & Mongo
    - [ ]  Appointments
        - [ ]  List of upcoming appointments
            - [ ]  Google Events
    - [ ]  Pending approvals
        - [ ]  List of client send approvals
    - [ ]  Info
        - [ ]  Admins information
            - [ ]  Name / phone number / drop down of calendars / about me
    - [ ]  Contacts
        - [ ]  List of all the Clients signed up
            - [ ]  Clicking on the client opens their profile
                - [ ]  Users profile can be edited or deleted
