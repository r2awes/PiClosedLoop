from datetime import datetime
from decimal import Decimal
import json

from bgreading import bgreading

class Bolus():
	def needsAdjustment(self, bgs):
		settings = ""
		try:
			settings = json.loads(open("pi/settings.json", "r").read())
		except FileNotFoundError:
			print("Settings file doesn't exist.")

		for h in bgs:
			print(h)
		
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
				dose = round((((bgs[0]["level"] - target) / selSen) - activeIns), 1)
				print( "Applying a dose of {} units.".format(dose))
				
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