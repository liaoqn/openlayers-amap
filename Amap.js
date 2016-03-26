/**
 * 针对高德地图的OpenLayers图层
 * 支持高德地图切片图层、卫星图层、路网图层、实时交通图层
 * 依赖Openlayers、高德地图API
 */
OpenLayers.Layer.Amap = OpenLayers.Class(OpenLayers.Layer.XYZ, {
    url: null,
    wrapDateLine: true,
    amapLayer: null,	// 高德地图图层
    rqNo: 0,	// int型，请求编号，如果大于0，会加到请求url里。主要目的是为了跳过浏览器缓存
    
    initialize: function(name, url, amapLayer, options) {
    	if(!url) {	// 未定义地图url则重新指定url
    		var tmpUrl = amapLayer.getTileUrl(3418, 1684, 12);
    		url = tmpUrl.replace(/&x=3418/, '&x=${x}').replace(/&y=1684/, '&y=${y}').replace(/&z=12/, '&z=${z}');
    	}
    	
        OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [name, url, options]);
        
        this.amapLayer = amapLayer;
    },
    
    getURL: function (bounds) {
    	var xyz = this.getXYZ(bounds);
    	var currUrl = this.amapLayer.getTileUrl(xyz.x, xyz.y, xyz.z);
    	if(this.rqNo > 0) {
    		currUrl = currUrl + '&rqNo=' + this.rqNo;
    	}
    	return currUrl;
    },
    
    /**
     * 刷新图层，会重新请求，主要针对路况图层
     */
    refresh: function() {
    	this.rqNo = this.rqNo + 1;
    	this.redraw();
    },
    
    clone: function(obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Amap(
                this.name, this.url, this.amapLayer, this.getOptions());
        }
        obj = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [obj]);
        return obj;
    },
    
    CLASS_NAME: 'OpenLayers.Layer.Amap'
});