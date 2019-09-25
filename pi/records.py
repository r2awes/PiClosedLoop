from datetime import datetime, timedelta
import json
from bgreading import bgreading
import os
# datetime of latest record create in ISO format
allrecords = sorted(os.listdir(os.getcwd() + "/pi/bg"))
latestRecord = allrecords[-1][0:-8]
#latestRecord = ""
# interval of new record file creation in hours
recordInterval = 24

def createRecord( bg: bgreading ):
	recordDelta = 0
	if( latestRecord == ""):
		recordDelta = 9999
	else:
		recordDelta = (datetime.now() - datetime.strptime(latestRecord, "%Y-%m-%dT%H:%M:%S.%fZ")).total_seconds()
		recordDelta /= 3600

	print("Latest record was created at " + latestRecord + ".")
	print("{} hrs since last record file created.".format(recordDelta))
	if( latestRecord == "" or recordDelta > recordInterval ):

		start = datetime.now().isoformat() + "Z"
		end = (datetime.now() + timedelta(hours=recordInterval)).isoformat() + "Z"
		
		record = { 
			"version": 1, 
			"start": start,
			"end": end, 
			"bg": [ bg.toDic() ],
			"adjustments": []
		}

		print("Making new record.")
		jrec = json.dumps( record, indent=2 )
		newRecord = open( "pi/bg/"+start+".bg.json", "w+" )
		print("Record file created.")
		newRecord.write(jrec)
		print("Record written to file.")
	else:
		print("Opening latest record.")
		oldRecord = open("pi/bg/"+latestRecord+".bg.json", "r")
		reading = json.loads(oldRecord.read())
		reading["bg"].append(bg.toDic())
		print("BG reading appended.")
		oldRecord = open("pi/bg/"+latestRecord+".bg.json", "w+")
		jread = json.dumps( reading, indent=2 )
		oldRecord.write(jread)
		print("Record file written to file.")