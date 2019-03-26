手环实时定位
//百度秘钥
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=dsCP0LTviVZrrdkD6XEMQhF9">

     <div class="widget-body">
             <div class="widget-main" style="height:550px" id="allmap">
              </div>
     </div>

        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(113.23, 23.16), 11);  // 初始化地图,设置中心点坐标和地图级别
        //map.centerAndZoom(point, 15);
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	//添加覆盖物
        function addMarker(point){
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
       }

 //将PHP从数据库得到的GPS位置通过ajax传递到网页，并显示出来
        function reloadGpsData(){
            var url = '{$webroot}fleet/api_getcar_gps';
            $.ajax({
                url: url,
                async: true,
                cache: false,
                dataType: "text",
                success: function(data) {
                //alert(data);
                var jsonObj = eval("("+data+")");//json格式反序列化
                var gpsList = jsonObj.list;
                var lastPoint = null;
                for(var key in gpsList) {
                    var gpsData = gpsList[key];
					if(gpsData.gps_y!=null&&gpsData.gps_x!=null){
						var x = gpsData.gps_y;
						var y = gpsData.gps_x;
						var point = new BMap.Point(x,y);
						addMarker(point);  //将GPS位置打到百度地图上
					}
                    lastPoint = point;
                }
                map.centerAndZoom(lastPoint, 8); //将最后一个点设置为中心并设置地图级别为8
                }
            });
        }
