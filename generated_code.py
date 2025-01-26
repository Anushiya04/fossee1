import pyfirmata
import time

# Set up the connection to the Arduino board
board = pyfirmata.Arduino('COM3') 
print("Connected to Arduino")

# Define the LED pin
led_pin = board.get_pin('d:13:o')  
print("LED pin set up")

class LED:
    def ON(self):
        print("Turning LED ON")
        led_pin.write(1)  # Turn the LED on

    def OFF(self):
        print("Turning LED OFF")
        led_pin.write(0)  # Turn the LED off

# Create an instance of the LED class
led = LED()

# Code generated from the Blockly webpage
led.ON()
time.sleep(2)
led.OFF()