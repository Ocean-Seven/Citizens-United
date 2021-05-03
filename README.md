# Citizens-United

### Introduction
This project was a brief 1.5 week sprint where our team (Blue Ocean) completed an MVP for our external client, Victor. The goal was to create a web app that bridges tech and the local community by connecting volunteers with individuals that require assistance with day-to-day activities (e.g. aiding senior citizens to get groceries) around the Los Angeles area.

### App Functionality
Citizens United was built because our client saw a need for a safe and easy-to-use medium for senior citizens to request help with simple daily tasks. The app allows a user to to sign up as either a volunteer or an individual that requires assistance. On sign-up, our app stores our user's information in our secure MongoDB database. Individuals that request assistance ("requestor") can submit a task request in a neighborhood of his or her choosing at a specified date and time. A requester is able to filter by a neighborhood and a task duration and "accept" or "hide" tasks. Once accepted, both users will have the ability to enter a chatroom, which displays the task information, requester information, volunteer information, a map overview of the location to meet at, and real-time chat feature.

### Contributors
[Liam Olson-Kenny](https://github.com/liamohkay)

[Sarah Baek](https://github.com/sbaek44)

[Dirk Zhang](https://github.com/dirkzhang0104)

[Weilly Tong](https://github.com/weillytong)

[Chris Wang](https://github.com/heyitschrisw)

[Daniel Liu](https://github.com/DanielL158)

[Jordan Beaird](https://github.com/Jbeairdo)


### Tech Stack
*Citizens United* was built primarily with ReactJS on the front end and Node/Express on the backend. Other key technologies used are listed below:

<img src="https://lh3.googleusercontent.com/ZIHOUCCxFaB7NirPhEX4K8cyTPIMvxvdJxpuhjb_qJ_dk-z7qEgD8riaR0ODXzXQZYn23zHpFiwGzxTDT88FTLeUMoPqlIjyLKoL1am8MH5pCoJExjL8SUC8uaeeiAjvQB0_vym6" width="100"/>
<img src="https://lh3.googleusercontent.com/xcong6Yn8NoueMYWPhEfO76dw0Nt70kiDVOCOygTFEQWpysHxcT-5jYzq9XWIgD3lvCGnGrjlhddm7WEOw9V1FlHivqFjZCXF9IDsfd7uQ2SxlI80roSJcnHvb0O7POvlYOPNvRG" width="100" />
<img src="https://lh5.googleusercontent.com/_RcI-sgNRX5J0olXzRycjQN3tysoTXbH8kXRfE0AtBY8KkDrINApsrfZGAkczZYGwKTPZlYdJXQyKmWO4zFzvON9Op6Ovcu0GQxwabxWfGJH__oRB6YCC-qD_3b2yj_efkprD8UP" width="100" />
<img src="https://lh5.googleusercontent.com/rdAoVdYKOCnmtev6t7DJrEY7mG4iYsRPqeTH0Z-OrlsVmiea3q5SMtOGNSa7HzJcyxcIcelTacG5gPNgyBoIviiNcLbohQAicvpldcfM32Klb_ewouDRd67OtYhUAU1CEZB4rBqB" width="100" />
<img src="https://lh6.googleusercontent.com/tKlT8lGB2bTDqSilr_a2y8vaO-QBUdcUIYASnslf-RAKTxUEiEBq-_gTVBP0irIP1ZWNuSvp1fouOJrQBXUr0joVmBZzNyOec4jBpOyVogPZMOYhPH6YQwYOiLdZnfuaDnFel9rn" width="100" />
<img src="https://lh5.googleusercontent.com/pqPRWyCMu39CU4GAERH3XI0fri2uJzMteIV5t-4qAG566IJWdXRABxLjV1jwdVvID-NvFw3USgyM8FXC5w_yAimYz4FY1gVEm96Yd2JQZh-pYl33lHpbOI7-3-uTixqgX1XHRker" width="100" />
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Jhwpt2a1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/1cpozv1jc7lgue4iqgi9.png" width="100"/>
<img src="https://www.pngkit.com/png/detail/225-2254691_9kib-354x415-unnamed-mongodb-logo-svg.png" width="100"/>


### User Stories
* As a user, I should be able to sign up as a volunteer or a requester and specify my neighborhood and add a profile pictures
* As a user, I should be able to login to my account with the same email and password that was created during sign-up
* As a user, I should be able to log out of my account and be directed to the home page
* As a volunteer, I should be able filter requests by neighborhood
* As a volunteer, I should be able to filter requests by duration (under 30mins, under 60mins, under 90mins)
* As a volunteer, I should be able to see a requester's picture and request information in an individual request tile
* As a volunteer, I should be able to hide a request tile from home my volunteer page
* As a volunteer, I should be able to accept able to request a tile
* As a volunteer, upon accepting a request, I should be directed to a confirmation page
* As a requester, I should be able to submit a new request and specify my request, neighborhood, request date, start time, and end time
* As a requester, I should be able to see a list of all my pending requests
* As a requester, I should be able to delete a pending request
* As a requester, I should be able to see list of all my old requests (completed or expired requests)
* As a requester, upon a volunteer accepting my request, I should see my request status change from "pending" to "accepted"
* As a requester, upon a volunteer accepting my request, I should see a "Chat" button on my request tile
* As a requester, I should be able to click the "Chat" button and be directed to a confirmation page
* As a volunteer or requester, I should be able to a see a confirmation page with the request information, volunteer information, requester information, a map of the location to meet at, and a live chat room
* As a volunteer or requester, I should be able to chat with the requestor or volunteer
* As a volunteer or requester, I should be able to mark a task complete
* As a volunteer or requester, I should be able to rate the requestor or volunteer with a thumbs up or thumbs down
