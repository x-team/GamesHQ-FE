<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://i.imgur.com/njuVb1g.png" alt="Markdownify" width="200"></a>
  <br>
  Games Admin panel
  <br>
</h1>

## What is it?

Headquarters of the games interactions. Games Admin Panel is basically a publishing tool to connect new browser games with the XTU ecosystem.

The admin panel let game developers integrate their games with the XTU world. It lets them create game key pairs, leaderboards, achievements, monitor statistics, between others.

The app also works great for XTeam Admins letting them create and manage The arena, and the Tower game rounds, new items, monitor games, between others.

## 📑Contents

* [Tech Stack](#tech-stack)
* [Requirements](#requirements)
* [Project](#project)
  * [Environmental Variables](#environmental-variables)
  * [Run APP](#run-app)
* [How to contribute](#how-to-contribute)
  * [JIRA](#jira)
  * [Commits](#commits)
  * [Pull Requests](#pull-requests)
* [Continous Integration](#continous-integration)

## 📦Tech Stack

* [Node.js](https://nodejs.org/)
* [React](https://es.reactjs.org/)
* [CRACO](https://www.npmjs.com/package/@craco/craco)

## 🔎Requirements

* [NVM - Node Version Manager](https://github.com/nvm-sh/nvm)

## 🚀Project

Let's setup the project!🥹

### **🔒Environmental Variables**

The APP needs some env vars to work properly. You can ask @ccmoralesj for this.

Just grab the `.env.example` file and copy everything into a new file called `.env`. It will look something like this at first.

```
# FRONTEND
REACT_APP_GAMESHQ_API_URL="http://127.0.0.1:3000"

# FIREBASE
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATTABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=

```

### **🖼️Run App**

We are almost there with the setup.🥲 Now it's time to run the API to connect the APP with. You can go to [Games API repo](https://github.com/x-team/GamesHQ-API) and follow the [README](https://github.com/x-team/GamesHQ-API#readme) to setup you own API, or you can connect with the staging API:

```bash
https://gameshq-api-staging.x-team.com
```

Now let's run the FE APP. 🎉

First, make sure you're using our recommended version of Node and npm by running these commands:

```bash
nvm use
```

Following up, we have to install all required dependencies to run the project:

```bash
npm i --legacy-peer-deps
# We use legacy peer deps due to a compatibility issue in React at the moment
```

Finally, **run the  API first** and then the application with the following command:

```bash
npm start
```

The APP should be up and running 🎉at port 3001!🎉 You can verify by browsing to [http://localhost:3001](http://localhost:3001)

Let's start coding!🤓

(GIF: Wait for it...)
![App Running](https://i.imgur.com/puC3sX2.png)

## 🫂How to contribute

Collaborate in this repo is quite easy.

### 📊JIRA

You only need to pick up a ticket from the [JIRA board](https://x-team-internal.atlassian.net/jira/software/c/projects/XTG/boards/48) (If you don't have access you can ask @ccmoralesj)

Each JIRA ticket has an identifier based on a code and a number like XTG-123 which you will use later.

### 💾Commits

Each commit you do needs to have the JIRA ticket identifier so it can be related to the board.

You can use this commit format suggestion.

```
:optional-emoji: XTG-123: New endpoint to handle login
```

| **Emoji** | **Description**                         |
|-----------|-----------------------------------------|
| **🚀**    | New features, or enhancements to code   |
| **🐞**    | Bug fixes                               |
| **⚙️**    | Refactors                               |
| **📦**    | Build files, dependencies, config files |
| **🔎**    | Minor fixes, typos, imports, etc        |
| **🪄**    | Others                                  |

![Commit Example](https://i.imgur.com/gClC6CV.gif)

### 🕵🏻Pull Requests

Once you're ready. You can create a new Pull Request (PR) by adding the JIRA ticket identifier in the title. The repo will give you a template to fill in the details of your amazing work!

You can use this PR title format suggestion.

```
XTG-123: Login
```

You'll need at least 1 review from your teammates to merge the pull request.

## 🪄Continous Integration

This project is connected to an EC2 instance from AWS.

All code from `main` branch will be deployed to staging.

To **deploy to production** you must create a `new release` and follow the [semantic versioning](https://semver.org/lang/es/) fundamentals. That will trigger an automated deployment to **production**.
