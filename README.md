# ChattyApp

ChattyApp is a simple chat app that uses websockets to allow multiple connections
to the chat client.

## Screenshots
!["Screenshot of ChattyApp: "](https://github.com/dleard/chattyApp/blob/master/assets/chatty.png)

## Dependencies

### ChattyApp

- Node.js
- babel
- webpack
- node-sass
- css-loader
- sockjs
- style-loader
- css-loader
- webpack
- webpack-dev-server
- react
- react-dom

### Chatty Server

- dotenv
- express
- uuid
- ws

## Getting Started

- Install all dependencies from root folder (using the `npm install` command).
- Install all dependencies from chatty_server folder (using the `npm install` command).
- Run server from chatty_server folder with `node server`
- Run app from root folder with `npm start`

## Using the app

- Write a message and hit enter
- Change username box by hitting enter or tab

## Extras

- `/giphy [searchParam]`  a random gif based on the searchParam
- `/wave`  wave emoji
- `/thumbs`  thumbs up emoji
- `/rockout`  devilhorns emoji
- Inputting an image url in the message bar will show the image below the message