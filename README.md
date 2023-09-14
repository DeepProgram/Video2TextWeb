
# Reuv Play

Frontend For Video To Text Conversion And Visualization.


## Backend
Setup the backend first to run the frontend properly
[ReuvPlay Backend API](https://github.com/DeepProgram/artetoreAPI)
## Environment Variables

To run this project, you will need to add the following environment variables to your **.env.local**  file

`NEXT_PUBLIC_API_BASE_URL`



## Deployment

To deploy this project on **development server** run

```bash
  npm install
  npm run dev
```
To deploy this project on **production server** run

```bash
  npm install
  npm run build
  npm run start
```


## Demo

HomePage

![App Screenshot](https://raw.githubusercontent.com/DeepProgram/Video2TextWeb/screenshot/home_page.gif)

Login

![App Screenshot](https://raw.githubusercontent.com/DeepProgram/Video2TextWeb/screenshot/login_page.gif)

Signup

![App Screenshot](https://raw.githubusercontent.com/DeepProgram/Video2TextWeb/screenshot/signup_page.png)

Video Home

![App Screenshot](https://raw.githubusercontent.com/DeepProgram/Video2TextWeb/screenshot/video_page.png)

Watch Video

https://github.com/DeepProgram/Video2TextWeb/assets/110674579/4dee3feb-5e4b-47bd-957d-b7af2f75bfb2

Request Video

![App Screenshot](https://raw.githubusercontent.com/DeepProgram/Video2TextWeb/screenshot/request_video_page.gif)

Process Video

https://github.com/DeepProgram/Video2TextWeb/assets/110674579/e58d6c89-1c26-4329-86ce-997d17311a3f

## Features

-
    ### Home Page
    - Home page divided into three main components. Header, Body , Footer
    - Header contains navigation links and logo
    - Body is divided into two parts. Upper parts contains tagline and some fancy visualization and lower part is for subscription package info
    - Footer contains dveloper name and social links with icon
-
    ### Login Page
    - Login page contains email and password input
    - On valid and invalid server response, the page will show a notification based on that
    - After successfull login, the page will be redirected to /video page
-
    ### Signup Page
    - Signup page contains multiple input fields like full name, email, password and a radio input type for account type selection
    - On sucessfull account creation, the page will be redirected to /video page as logged in user
-
    ### Video Page
    - Video page contains video in 3x2 grid
    - Each video box contains a thumbnail and a video title
-
    ### Watch Video Page
    - Watch video page is devided into a main 2x1 grid
    - on the left grid child all the text segments ar listed
    - On the right grid child there are mainly two components. One is video player and othe other is video info
    - Above the text segments there is a search input field to search any text in those segments and filter the segments list
    - By default the vido player wont be visible and there will be the thumbnail with blurred image and play icon in the middle
    - On clicking a text segment, the segment video url will be fetched from server if video segemnt is already generated, otherwise the video segment will be generated and the url will be fetched after that
    - Blurred thumbnail will be replaced if a video segment url is fetched
    - Video player has custom play, pasue, seek and timestamp bar and all are interactive buttons
    - on fetching a video segment, the button below the video player named VIDEO will be active and on clicking it, the fetched video segment will be downloaded
    - GIF converting is under development
-
    ### Request Video
    - On loggin in, the sidemenu will have a new tab named REQUEST VIDEO. On clicking this a page will open and user can see the request queue and completed request list
    - By clicking on ADD button, a modal will open and the modal will have a input field or inserting url, two buttons for selecting the video platform, fetch button for validating the video. Validated video url can be sent to sever by clicking on request button
-
    ### Process Video
    - On loggin in with the user acount level of pro plus, a tab will be enabled in the sidemenu
    - By clicking on ADD button, the same modal will be opened that is used in request video page. SO the modal is reused for both the page. But the botom last button is named different is also connected to a different function.
    - On clicking on process button, the video info will be sent to backend and the processing will be started and it thw process status will be updated on every 5 seconds
