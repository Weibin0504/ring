手环足迹分析
    //查询某一手环足迹的输入框
                                <form class="form-search">
                                    <span class="input-icon">
                                        <input type="text" placeholder="搜索 ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
                                        <i class="icon-search nav-search-icon"></i>
                                        <a href="javascript:findRing()" class="btn btn-primary btn-xs" style="margin-top:-3px">查找手环</a>
                                    </span>
                                </form>

//查询搜索手环id号的足迹
        function findRing(){
		//将搜索框得到的id提取出来
            var keyword = $.trim($("#nav-search-input").val());
            var found = false;
            if(keyword == "") 
                centerWarning("操作结果", "关键字不能为空.");
                return;
            }
            getsingle_gps(keyword);
        }

//将搜索框的id号与数据库的比较找出对应的GPS位置的点
                    if(gpsData.id==keyword){
						if(gpsData.gps_y!=null&&gpsData.gps_x!=null){
							var x = gpsData.gps_y;
							var y = gpsData.gps_x;
							var bPoint = new BMap.Point(x, y); 
							gpsArray.push(bPoint);
						}
                    }

//通过行走实例得到的点在地图上划线
                var polyline = new BMap.Polyline(gpsArray, {strokeColor:'#642100', strokeWeight:2, strokeOpacity:0.5});
                map.addOverlay(polyline);
