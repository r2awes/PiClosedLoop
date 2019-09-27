# Richard McHorgh
# Closed Loop System
# Written for Raspberry Pi Zero W
from time import sleep

from bgreading import bgreading
from records import Record

def __main__():
	#bgs = [125, 128, 133]
	#trends = [1, 2, 0]
	bgs = [225, 228, 253]
	trends = [1, 2, 2]
	r = Record()
	for i in range(0, 3):
		r.createBGRecord( bgreading( bgs[i], trends[i] ) )
		print(bgs[i])
		sleep( 60 * 5 )

__main__()