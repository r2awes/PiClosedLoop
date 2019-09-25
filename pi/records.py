from datetime import datetime, timedelta
import json
import pi.bgreading

# datetime of latest record create in ISO format
latestRecord = "2019-09-19T01:55:00.000Z"
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

	print("latestRecord:" + latestRecord)
	print("recordDelta: {}".format(recordDelta))
	if( latestRecord == "" or recordDelta > recordInterval ):
		print("Making new record")

		end = datetime.now() + timedelta(hours=recordInterval)
		print(end)
		json.dumps({ 
			'version': 1, 
			'start': datetime.now(),
			'end': end, 
			'bg': [ bg.toJSONString() ],
			'adjustments': []
		})
		newRecord = open( "bg/{}.bg.json".format(datetime.now()), "w+" )
		newRecord.write()

createRecord()