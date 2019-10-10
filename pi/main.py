# Richard McHorgh
# Closed Loop System
# Written for Raspberry Pi Zero W
from time import sleep

from bg import BG
from records import Record

import dbus

from advertisement import Advertisement
from service import Application, Service, Characteristic, Descriptor

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

class TempCharacteristic(Characteristic):
	TEMP_CHARACTERISTIC_UUID = "00000002-710e-4a5b-8d75-3e5b444bc3cf"

	def __init__(self, service):
		self.notifying = False

		Characteristic.__init__( self, self.TEMP_CHARACTERISTIC_UUID, ["notify", "read"], service)
		self.add_descriptor(TempDescriptor(self))

	def get_temperature(self):
		value = []
		unit = "C"

		cpu = CPUTemperature()
		temp = cpu.temperature
		if self.service.is_farenheit():
			temp = (temp * 1.8) + 32
			unit = "F"

		strtemp = str(round(temp, 1)) + " " + unit
		for c in strtemp:
			value.append(dbus.Byte(c.encode()))

		return value

	def set_temperature_callback(self):
		if self.notifying:
			value = self.get_temperature()
			self.PropertiesChanged(GATT_CHRC_IFACE, {"Value": value}, [])

		return self.notifying

	def StartNotify(self):
		if self.notifying:
			return

		self.notifying = True

		value = self.get_temperature()
		self.PropertiesChanged(GATT_CHRC_IFACE, {"Value": value}, [])
		self.add_timeout(NOTIFY_TIMEOUT, self.set_temperature_callback)

	def StopNotify(self):
		self.notifying = False

	def ReadValue(self, options):
		value = self.get_temperature()

		return value


class TempDescriptor(Descriptor):
	TEMP_DESCRIPTOR_UUID = "2901"
	TEMP_DESCRIPTOR_VALUE = "CPU Temperature"

	def __init__(self, characteristic):
			Descriptor.__init__(
					self, self.TEMP_DESCRIPTOR_UUID,
					["read"],
					characteristic)

	def ReadValue(self, options):
			value = []
			desc = self.TEMP_DESCRIPTOR_VALUE

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
