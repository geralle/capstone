# CAPSTONE

## Project Description
A freelance scheduler app so clients can view available appointment slots, submit for a consultation, and chat with the potential consultant.

## What problem does your project solve?
Phone calls and drop in appointment scheduling is a pain for the client and the one providing the service. This app will alleviate  scheduling conflicts, waste of time in the waiting room, and instances where both parties are not quite the right fit for each other.

## Who has this problem?
Almost everyone in the drop / pop in service industry. More specifically my friend who is a tattoo artist.

## How will your project solve this problem?
I will build an Admin side where the admin will sign in with their Google Calendar account. They'll choose a calendar of their choice to show they're available times slots. Admins will also be able to approve clients sent time slots for a consultation, which will update their calendar schedule.

The client will be able to see the service providers available time slots, choose 3 of their favorite times to meet, and submit it for approval.

## What inputs does it need?
### Admin
* Name / location / biography or about me
* Google calendar credentials
* Which calendar they'd like to use
* Messaging inputs

### Client
* Username / Password / Name / phone number / description of service (possible mood board like with images)
* Time slots their interested in meeting with the admin
* Messaging inputs

## What outputs does it produce?
* Admins calendar / profile
* Users profile
* Messages

## What technologies do you plan to use?
* React
* Node, Express, database (still in the air if I'm using MongoDB or PostgrSQL)
* Socket.IO
* Google OAuth 2.0 / Google Calendar API
* STRETCH - AWS S3 buckets for image hosting
* STRETCH - React Native

## Prioritized Feature list (Label stretch features with STRETCH)
### Admin
* Login G-Auth / Calendar picker saves to the admins profile
* Admin Dashboard:
  * Admins profile: name / company name, phone number, about / biography
  * Upcoming appointments (Google Calendar 'Events')
  * Queue of client times slots needing approval
    * approval populates upcoming appointment list
  * List of clients potential & existing (sort of like a rolodex) for messaging

* Homepage:
  * Displays Admins chosen calendar
  * Admins company information
  * A signup form for clients to submit their profile information and chosen time selections.
  * Login information for returning clients (password change)

Client Dashboard:
  * Client profile: name, phone number, username, password
  * Timeslots sent
  * Clients chat window
  * STRETCH: image Mood Board

* STRETCH: Email notifications (admin is already using gmail for auth so it might not be too much of a stretch to add. 🤔)
