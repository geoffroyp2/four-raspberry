# <center>FOUR-RASPBERRY</center>

 <center>Software for a custom-made ceramics oven</center>

## Description

The setup involves 2 RaspberryPIs:

- The first one runs a stateless, synchronous thermodynamics model that aims to regulate the temperature, oxygen level and various other parameters during the firing. It is connected to an arduino that reads various sensors values and controls valves to regulate gaz and air flows.

- The second one is used for the state logic. It runs the code found in this repository, and has several roles contained in the following folders:

  - ./backend/ : A database API built with PostgreSQL and GraphQL. The database stores various elements:
    - All of the target firing graphs
    - All of the recorded firing infos
    - An historics of all firings and potteries
    - Infos about ceramics and enamel chemical formulas

    The GraphQL API allows the front-end to have access to all of the entries and have full CRUD control.

  - ./frontend/ : A front-end app built with React and Redux. It displays the live infos about the current firing and allows user interaction to control the engine logic (loading a target temperature graph, start, stop, etc...). It also displays all of the infos in the database and allows to browse and edit the entries.

  - ./ovenEngine/ : stand-alone program using Typescript that is responsible for the communication with the other RPI and the live firing logic. It calculates the target temperature and relays the user interaction (start, stop, etc...). It receives sensor values and sends it to the backend API to be recorded. It also has a small API with live infos aboutthe current firing.
    
  - ./imageServer/ : a very small image host created with jquery that stores pictures of the potteries and enamels.

  - ./backend.old/ : last iteration of the backend, using MongoDb and Mongoose (REST API).
  - ./frontend.old/: various experiments with React


Every project is built separately and has its own package.json and node_modules folder. Random database data can be generated with the generateData script.


