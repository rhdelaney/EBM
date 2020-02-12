# EBM
Electric Brain Music - BCI and tone.js to create music with brain signals

The interface is a piano keyboard that returns a musical note based on the users electric brain signals

Utilize node.js to run the program -

    node index.js
    
It defaults to localhost port 8080 but you can reconfigure as you see fit.

Here is the UI you should see if you navigate to the page correctly:

![alt text](https://github.com/rhdelaney/EBM/blob/master/photos_for_readme/userInterface.png "User Interface")

Here is the start/stop button. Once you have the piano as well as the BCI & EEG kit set up and ready to go you click the start button. Once you are done playing the keyboard you press the stop button(same button but the functionality and text changes).

![alt text](https://github.com/rhdelaney/EBM/blob/master/photos_for_readme/Start_stop.png "Start Stop Button")

The interface should adjust accordingly via the signals received through OpenBCI ports -

![alt text](https://github.com/rhdelaney/EBM/blob/master/photos_for_readme/BCI_Key_Gauge.png "BCI Gauge")

The keyboard can be manually manipulated if you want to check our work :)

![alt text](https://github.com/rhdelaney/EBM/blob/master/photos_for_readme/piano.png "Piano")
