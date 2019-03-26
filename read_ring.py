 1.Python接收手环数据并清洗到数据库
def sql_ring(securityParts,gps_x,gps_y):
	conn=MySQLdb.connect(host=DB_HOST,user=DB_USER,passwd=DB_PASS,db=DB_MAIN,port=3306,charset='utf8')
	cur=conn.cursor()        #连接后台数据库
	T = (securityParts[2],securityParts[1],securityParts[0],gps_x,gps_y)
	#将手环接收到的数据清洗到数据库
	cur.execute('INSERT INTO `ring`.`table_ringdata` (`id`, `order`, `timeStamp`, `gps_x`, `gps_y`) values(%s,%s,%s,%s,%s)',T)
	conn.commit() #更新MySQL数据库
	cur.close()
	conn.close() #关闭数据库
	print "Done"

 	2.取出s字段的GPS位置
securityFieldAes = revObj["s"]
if (revObj.has_key('d')):#判断是否有d字段
	gps_data = revObj["d"][1]
	data = gps_data.split(",")
	if(gps_data!=""):
		gps_x = data[0]
		gps_y = data[2]
	else:
		gps_x = None
		gps_y = None
else:
	gps_x = None
	gps_y = None

3判断手环接收到的请求并做相应的回复
                            if operation == "202":
                                ret = self.__syncTimestamp(imei, revObj["v"])
                                #write(timeStamp,operation,imei)
                                sql_ring(securityParts,gps_x,gps_y)
 
                            elif operation == "102":
                                ret = self.__addData(imei, timeStamp, revObj["d"])
                                sql_ring(securityParts,gps_x,gps_y)
                            elif operation == "404":
                                ret = self.__userReg(imei, timeStamp, revObj["v"])
                                sql_ring(securityParts,gps_x,gps_y)
                            elif operation == "606":
                                ret = self.__dev_sleep(imei, timeStamp, revObj["v"])
                                sql_ring(securityParts,gps_x,gps_y)
                            elif operation == "000":
                                ret = self.__logdata(imei, timeStamp)
                                sql_ring(securityParts,gps_x,gps_y)
                            elif operation == "707":
                                ret = self.__callpolice(imei, timeStamp, revObj["e"])
                                sql_ring(securityParts,gps_x,gps_y)
