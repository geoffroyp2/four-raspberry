## ADRESSES

* desktop:
  * machine:        <192.168.0.10>
  * display client: <http://192.168.0.10:3000>
  * db-API:         <http://192.168.0.10:3001>
  * engine-API:     <http://192.168.0.10:3002>
  * db-API debug:   <ws://127.0.0.1:9229>

* R-pi display:
  * machine:        <192.168.0.121>
  * db:             <mongodb://192.168.0.121:27017>
  * images:         <http://192.168.0.121:3003>

* R-pi calcul:
  * values out:     <ws://192.168.0.120:2501>
  * values in:      <ws://192.168.0.120:2502>


# infos live

API:
* launch new live program => Record created: id sent back to engine
* needs a memory area that is subscribed to by the engine:
  * relays commands sent by the front
  * can send a target Graph
* needs a memory area that is subscribed to by the front:
  * holds current live id if program started 
  * holds current live status & last sensor values in memory to be relayed to the front
  * only record to db every [m] seconds when program runs


Engine:
* init: 
  * establishes a ws connection with API at launch to receive live commands
    * Can receive a Full Target Graph to store in memory
    * Can receive live commands
  * Recovery routine:
    * look for the most recent log file and see if it contains the "finished" line at the end
    * if an unfinished file is present, send its infos (id, target name, start date, last record date) to the API to be relayed to the front
    * the front can choose to continue that program
* In the main loop:
  * sends current sensor values & live status (start, pause, stop...) every [n] ms 
  * sends other current infos (ping of the 2nd raspberry, etc...)
* Program Start:
  * receives command with Record ID, 
  * creates a log file to be able to sync if reboot
  * starts the engine program, keep sending live values + live status


Front:
* Establishes a ws connection with API to receive live values
  * keeps last [n] values when program is not started to be displayed on the graph (debug) ==> maybe use the API to do that ? Needs testing
  * at program start, displays current program (the API will send the required data)
* Can receive infos about an unfinished program, prompt the user to continue
* Can send commands to be realyed to the engine
* Can choose a Target to be sent to the engine