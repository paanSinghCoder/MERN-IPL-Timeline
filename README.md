# MERN-IPL-Timeline
IPL Timeline app developed in MERN stack

In a nutshell, IPL timeline displays the IPL cricket match played in stadiums each year. Moving the slider on bottom right of screen will make the markers change on the map. Hovering on individual marker displays a tooltip and when clicked on marker, detailed info about the stadium is displayed. After clicking on show comments, all comments made by users on that stadium is displayed in a modal.

Tech stack used: Mongodb, Express js, React js, Node js.

Map used: Leaflet js

UI Library: Ant Design


Client folder contains the react code. server.js is the starting point for express server which also contains routes.

Steps to repro the app on localhost: 
In home directory of project start command prompt and execute following commands(Make sure node is installed):

1: Add mongodb url by going to config/keys.js and add your mongodb url.

module.exports = {
    mongoURI : 'YOUR_MONGODB_URL_HERE'
}

2: npm install

3: cd client

4: npm install

5: cd ..

6: npm run dev

![Capture](https://user-images.githubusercontent.com/9462473/55272160-411abf00-52de-11e9-8520-13c0a49a26cd.PNG)


![image](https://user-images.githubusercontent.com/9462473/55272177-8e972c00-52de-11e9-8bde-a90217ae9a96.png)
