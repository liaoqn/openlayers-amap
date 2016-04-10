# openlayers-amap
使用 OpenLayers 加载高德地图

使用方式
=====
如下初始化高德地图图层，其中 new AMap.TileLayer() 为高德地图的瓦片图层对象，由高德地图的API提供。

	var layer = new OpenLayers.Layer.Amap('高德地图', null, new AMap.TileLayer(), { 
		isBaseLayer : true,
		zoomOffset : 3
	});

需要注意，因为高德地图默认缩放级别为 3 - 18，所以需要设置缩放级别偏移 zoomOffset 为 3。
