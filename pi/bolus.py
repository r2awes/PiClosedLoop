from datetime import datetime
import json
from time import sleep

from bg import BG

class Bolus():
	def needsAdjustment(self, bgs):
		settings = ""
		try:
			settings = json.loads(open("pi/settings.json", "r").read())
		except FileNotFoundError:
			print("Settings file doesn't exist.")

		if( len(bgs) >= 3):
			bio = settings["biometrics"]
			bolus = settings["bolus"]
			
			trends = []
			levels = []
			totalTrends = 0
			totalLevels = 0
			bgs = bgs[::-1]
			
			for i in range(0, 3):
				trend = bgs[i]["trend"]
				totalTrends += trend
				trends.append(trend)

				level = bgs[i]["level"]
				totalLevels += level
				levels.append(level)

			if( totalTrends >= 4 and totalLevels >= 600 ):
				h = datetime.now().hour
				m = datetime.now().minute
				selSen = 0
				for i in range(0, len(bio["sensitivity"])-1):
					t = bio["sensitivity"][i]
					n = bio["sensitivity"][i+1]
					# All hours must be in 24hr format
					if( (t[0] <= h and n[0] > h) or (t[0] <= h and n[0] == h and n[1] >= m) ):
						selSen = t[2]
					else:
						selSen = bio["sensitivity"][-1]

				activeIns = 2
				target = bolus["bgTargets"][1]
				dose = round((((bgs[0]["level"] - target) / selSen[2]) - activeIns), 1)
				print( "Applying a dose of {} units.".format(dose))
				self.giveInsulin(dose)
				return {
					"time": datetime.now().isoformat() + "Z",
					"dose": dose,
					"scale": True
				}
			else:
				print("Adjustment unneeded")
				return False
		else:
			print("Not enough data to determine adjustment.")
			return False

	def giveInsulin(self, amount: float):
		print( "Trying to deliver {} units of insulin.".format(amount) )
		from records import Record
		r = Record()
		scrollRate = r.getScrollRate()
		lastDC = r.getDutyCycle()
		ratio = .03 # Not a set ratio, I have to design the gearbox first.

		try:
			import RPi.GPIO as GPIO
			GPIO.setmode(GPIO.BCM)
			GPIO.setup(17, GPIO.OUT)
			servo = GPIO.PWM(17, 50)
			servo.start( lastDC )

			for i in range(amount / scrollRate):
				dutycycle = lastDC + ( i * ratio )
				servo.ChangeDutyCycle( dutycycle )
				print("Servo dutycycle is now {}.\n{} units out of {} of insulin delivered as of now.".format(dutycycle, i * scrollRate, amount))
				r.setDutyCycle( dutycycle )
				sleep(.5)

			servo.stop()
			GPIO.cleanup()
		
		except ImportError or ModuleNotFoundError:
			print("This is likely not running on a Raspberry Pi.\nIf it is, make sure RPi is installed for Python 3.\n\nRunning print loop now instead of sending servo commands.")
			print(amount / scrollRate)
			for i in range(int(amount / scrollRate)):
				dutycycle = lastDC + (i * ratio)
				print("Servo dutycycle is now {}.\n{} units out of {} of insulin delivered as of now.".format(dutycycle, i * scrollRate, amount))
				r.setDutyCycle(dutycycle)
				sleep(.5)
		
