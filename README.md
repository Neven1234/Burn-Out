# Burn out

Burn out is a full stack application designed for car racing events. It offers different functionalities for users based on their roles: audience, racer, organizer, and admin.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
## Description
Burn out provides a platform where car racing enthusiasts can engage with events. Users can have one of four roles: audience, racer, organizer, or admin. Each role has specific permissions and functionalities:

- **Audience**: Can view new events and purchase tickets.
- **Racer**: Can view new events and participate in races.
- **Organizer**: Can create, edit, and delete their own events.
- **Admin**: Reviews and approves or deletes events submitted by organizers. Only approved events are visible to users.

## Features
- Role-based access control
- Event management (creation, editing, deletion, approval)
- Ticket purchasing system with Stripe integration
- JWT-based authentication
- Responsive design using Bootstrap

## Technologies Used
- ASP .NET Core
- PostgreSQL
- Angular
- TypeScript
- Identity User
- JWT (JSON Web Tokens)
- Bootstrap
- Stripe (for payment integration)
## Usage
- Audience: Browse and buy tickets for events using Stripe.
- Racer: Browse and participate in events.
- Organizer: Create, edit, and delete your events.
- Admin: Approve or delete events submitted by organizers.

