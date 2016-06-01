import csv
files = ['./data/snack.csv','./data/brunch.csv','./data/buffet.csv', './data/midnight.csv', './data/lunch.csv']
mobile = 0
pc = 0
for file in files:
	print(file.replace('./data/',"").replace('.csv',""))
	f = open(file, 'r')  
	for row in csv.reader(f):  
		if(row[4] == ' 行動載具'):
			mobile+=1
		elif(row[4] == ' 桌機'):
			pc+=1
	f.close()
	alldevice = mobile + pc
	print( 'mobile: ' + str(round(mobile/alldevice*100,2)) + '% ' + '(' + str(mobile) + '/' + str(alldevice) + ')')
	print( 'pc: '+ str(round(pc/alldevice*100,2)) + '% ' + '(' + str(pc) + '/' + str(alldevice) + ')')
	# print()
	mobile = 0
	pc = 0
	