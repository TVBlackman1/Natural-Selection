# using info from scene.json and build graphics

import matplotlib.pyplot as plt
import json
import numpy as np
from scipy.interpolate import splrep, splev

file_name = 'scene.json'
with open(file_name, "r") as read_file:
    data = json.load(read_file)

redCount = data['bacteriaRed']['count']
greenCount = data['bacteriaGreen']['count']
blueCount = data['food']['count']

redSpeed = data['bacteriaRed']['speed']
greenSpeed = data['bacteriaGreen']['speed']

redSenseRange = data['bacteriaRed']['senseRange']
greenSenseRange = data['bacteriaGreen']['senseRange']

redMaxTimeWithoutFood = data['bacteriaRed']['maxTimeWithoutFood']
greenMaxTimeWithoutFood = data['bacteriaGreen']['maxTimeWithoutFood']


# print(redCount)
# print(redSpeed)
# print(redSenseRange)


redX = list(range(len(redCount)))
greenX = list(range(len(greenCount)))
blueX = list(range(len(blueCount)))

plt.plot(redX, redCount, 'r-')
plt.plot(greenX, greenCount, 'g-')
plt.plot(greenX, blueCount, 'b-')
plt.title('Population')
plt.show()


plt.plot(redX, redSpeed, 'r-')
plt.plot(greenX, greenSpeed, 'g-')
plt.title('Average speed')
plt.show()

plt.plot(redX, redSenseRange, 'r-')
plt.plot(greenX, greenSenseRange, 'g-')
plt.title('Average sense range')
plt.show()

plt.plot(redX, redMaxTimeWithoutFood, 'r-')
plt.plot(greenX, greenMaxTimeWithoutFood, 'g-')
plt.title('Max time without food')
plt.show()
