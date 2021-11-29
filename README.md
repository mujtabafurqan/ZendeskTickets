Zendesk Coding Challenge

This application is build to demonstrate the use of Zendesk API to fetch the list of tickets on a User's dashboard.

The tech stack I have chosen is a ReactJS frontend connected to a NodeJs backend.

Steps to start the application locally after checking it out:
    
    1. Open the terminal to the base folder and execute the command 'yarn'. This will install all the dependencies needed for the execution
        of this application.

    2. At the root of the project add a new file and name it '.env'.
        Open this file in a editor of your choice and add the following 3 properties to it:
            ZENDESK_EMAIL = {your zendesk email}
            ZENDESK_PASSWORD = {your zendesk password}
            ZENDESK_URL = {your zendesk base URI for example 'peter.zendesk.com'}
    3. run the application with the command - 'npm run dev'