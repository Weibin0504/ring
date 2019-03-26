电子围栏
		//判断点是否在选择的电子围栏中
		function ispoint(){
			drawingManager.addEventListener('overlaycomplete', overlaycomplete); //实例化鼠标绘制覆盖物
			map.addEventListener('click',function(e){
				//圆形边界点的坐标
				border_x=e.point.lng;
				border_y=e.point.lat;
				var n=0;
				if(drawingManager.getDrawingMode()==BMAP_DRAWING_CIRCLE){
					for(var key in gpsArray){
						circle_r=Math.pow((border_x-center_x),2)+Math.pow((border_y-center_y),2); //圆形的半径
						var gpsData = gpsArray[key];
						if(gpsData.lng!=null&&gpsData.lat!=null){
							var point_x = gpsData.lng;
							var point_y = gpsData.lat;
							var point_r=Math.pow((point_x-center_x),2)+Math.pow((point_y-center_y),2); //点到圆形的距离
						}
						//判断点是否在圆形内
						if(point_r<circle_r){
							n++;
						}
					}
					//计算圆形里面的点个数
					alert(n);
				}
				 
			});
		}

		//圆心坐标
        if(e.drawingMode == BMAP_DRAWING_CIRCLE) {
			center_x=e.overlay.getCenter().lng;
			center_y=e.overlay.getCenter().lat;
			}
        }

		//判断地图上的点是否在矩形框中
        if (e.drawingMode == BMAP_DRAWING_RECTANGLE) {
		var lineBounds = e.overlay.getBounds();
		var sw = lineBounds.getSouthWest(); //矩形框西南脚点
		var ne = lineBounds.getNorthEast(); //矩形框东北脚点
		var n=0;
		for(var key in gpsArray){
			var gpsData = gpsArray[key];
				if(gpsData.lng!=null&&gpsData.lat!=null){
					var point_x = gpsData.lng;
					var point_y = gpsData.lat;
				}
				//判断点是否在矩形框内
				if(point_x >= sw.lng && point_x <= ne.lng && point_y >= sw.lat && point_y <= ne.lat){
					n++;
				}	
		}
		//计算矩形框的点
			alert(n); 
        }	

		var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
		}
    //实例化鼠标绘制工具
		var drawingManager = new BMapLib.DrawingManager(map,{
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_LEFT, //位置
            offset: new BMap.Size(5, 5), //偏离值
        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });  

  //清除所有覆盖物
		function clearAll() {
		for(var i = 0; i < overlays.length; i++){
            map.removeOverlay(overlays[i]);
        }
        overlays.length = 0   
		}
