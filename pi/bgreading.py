from datetime import datetime

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

	def toJSONString(self):
		return "{ \'time\': {}, \'level\': {}, \'scale\': {}, \'trend\': {}}".format(self.time.isoformat(), self.level, self.scale, self.trend)


r = bgreading(200, -2)
print(r.toJSONString())