# Richard McHorgh
# Closed Loop System
# Written for Raspberry Pi Zero W
from time import sleep

from bg import BG
from records import Record

import dbus

from advertisement import Advertisement
from service import Application, Service, Characteristic, Descriptor

import json

GATT_CHRC_IFACE = "org.bluez.GattCharacteristic1"
NOTIFY_TIMEOUT = 5000

""" #bgs = [125, 128, 133]
#trends = [1, 2, 0]
bgs = [225, 228, 253]
trends = [1, 2, 2]
r = Record()
for i in range(0, 3):
	r.createBGRecord( BG( bgs[i], trends[i] ) )
	print(bgs[i])
	sleep( 60 * 5 ) """


class PiAdvertisement(Advertisement):
	def __init__(self, index):
		Advertisement.__init__(self, index, "peripheral")
		self.add_local_name("Pi")
		self.include_tx_power = True

class PiService(Service):
	PI_SVC_UUID = "00000001-710e-4a5b-8d75-3e5b444bc3cf"

	def __init__(self, index):
		Service.__init__(self, index, self.PI_SVC_UUID, True)
		self.add_characteristic(BGCharacteristic(self))

class BGCharacteristic(Characteristic):
	BG_CHARACTERISTIC_UUID = "00000002-710e-4a5b-8d75-3e5b444bc3cf"

	def __init__(self, service):
		self.notifying = False
		self.current = 0
		self.max = 2
		Characteristic.__init__( self, self.BG_CHARACTERISTIC_UUID, ["notify", "read"], service)
		self.add_descriptor(BGDescriptor(self))

	def get_bg(self):
		value = []
		r = Record()
		bgs = str(json.loads(open("bg/" + r.getLatestRecord(full=True),"r").read())["bg"][0]["level"])
		if( self.current == self.max ):
			self.current = 0
		else:
			self.current += 1

		for b in "225":
			value.append(dbus.Byte(b.encode()))
		return value

	def set_bg_callback(self):
		if self.notifying:
			value = self.get_bg()
			self.PropertiesChanged(GATT_CHRC_IFACE, {"Value": value}, [])

		return self.notifying

	def StartNotify(self):
		if self.notifying:
			return

		self.notifying = True
		value = self.get_bg()
		self.PropertiesChanged(GATT_CHRC_IFACE, {"Value": value}, [])
		self.add_timeout(NOTIFY_TIMEOUT, self.set_bg_callback)

	def StopNotify(self):
		self.notifying = False

	def ReadValue(self, options):
		value = self.get_bg()

		return value


class BGDescriptor(Descriptor):
	BG_DESCRIPTOR_UUID = "2901"
	BG_DESCRIPTOR_VALUE = "BG"

	def __init__(self, characteristic):
		Descriptor.__init__( self, self.BG_DESCRIPTOR_UUID, ["read"], characteristic)

	def ReadValue(self, options):
		value = []
		desc = self.BG_DESCRIPTOR_VALUE

		for c in desc:
			value.append(dbus.Byte(c.encode()))

		return value

app = Application()
app.add_service(PiService(0))
app.register()

adv = PiAdvertisement(0)
adv.register()

try:
	app.run()
except KeyboardInterrupt:
	app.quit()
