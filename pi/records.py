from datetime import datetime, timedelta
import json
import os

from bolus import Bolus
from bg import BG

class Record():
	recordInterval = 0
	latestRecord = ""

	# returns interval of new record file creation in hours
	def getRecordInt(self):
		return json.loads(open("pi/settings.json", "r").read())["recordInterval"]

	# returns datetime of latest record create in ISO format
	def getLatestRecord(self):
		a = sorted(os.listdir(os.getcwd() + "/pi/bg"))
		l = ""
		try:
			l = a[-1][0:-8]
		except IndexError:
			l = ""
		return l

	# gets scroll rate setting
	def getScrollRate(self):
		return json.loads(open("pi/settings.json", "r").read())["bolus"]["scrollRate"]

	# gets current duty cycle of the servo
	def getDutyCycle(self):
		return json.loads(open("pi/bg/"+self.getLatestRecord()+".bg.json").read())["cdc"]

	# stores bg value in a json record
	def createBGRecord( self, bg ):
		self.recordInterval = self.getRecordInt()
		self.latestRecord = self.getLatestRecord()

		recordDelta = 0
		if( self.latestRecord == "" ):
			recordDelta = 9999
		else:
			recordDelta = (datetime.now() - datetime.strptime( self.latestRecord, "%Y-%m-%dT%H:%M:%S.%fZ")).total_seconds()
			recordDelta /= 3600

		print("Latest record was created at " + self.latestRecord + ".")
		print("{} hrs since last record file created.".format(recordDelta))
		if( self.latestRecord == "" or recordDelta > self.recordInterval ):

			start = datetime.now().isoformat() + "Z"
			end = (datetime.now() + timedelta(hours=self.recordInterval)).isoformat() + "Z"
			
			record = { 
				"version": 1, 
				"start": start,
				"end": end, 
				"bg": [ bg.toDic() ],
				"adjustments": [],
				"cdc": 2.5
			}

			print("Making new record.")
			jrec = json.dumps( record, indent=2 )
			newRecord = open( "pi/bg/"+start+".bg.json", "w+" )
			print("Record file created.")
			newRecord.write(jrec)
			newRecord.close()
			print("Record written to file.")
		else:
			print("Opening latest record.")
			old = json.loads(open("pi/bg/" + self.latestRecord + ".bg.json", "r").read())
			old["bg"].append(bg.toDic())
			print("BG reading appended.")

			b = Bolus()
			self.createAdjRecord(b.needsAdjustment(old["bg"]), old)

			new = open("pi/bg/" + self.latestRecord + ".bg.json", "w+")
			j = json.dumps( old, indent=2 )
			new.write(j)
			new.close()
			print("Record file written to file.")

	# records insulin injection in json
	def createAdjRecord(self, adj, j):
		if( isinstance(adj, bool) == False ):
			j["adjustments"].append(adj)

	def setDutyCycle( self, dc ):
		old = json.loads(open("pi/bg/" + self.latestRecord + ".bg.json", "r").read())
		old["cdc"] = dc
		old = json.dumps( old, indent=2 )
		new = open("pi/bg/" + self.latestRecord + ".bg.json", "w+")
		new.write(old)
		new.close()
		print("Current duty cycle recorded to file.")

