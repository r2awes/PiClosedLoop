from datetime import datetime
import json

class bgreading():
	time = ""
	level = 0
	trend = 0
	scale = True
	
	def __init__(self, level: int, trend: int, scale: bool = True):
		self.time = datetime.now()
		self.level = level
		self.trend = trend
		self.scale = scale

	def toDic(self):
		time = self.time.isoformat() + "Z"
		
		scale = ""
		if(self.scale):
			scale = "mg/dl"
		else:
			scale = "mmol/L"
			
		print("At {}, blood glucose level was {} {}.".format(time, self.level, scale))
		return {
			"time": time,
			"level": self.level,
			"scale": self.scale,
			"trend": self.trend
		}