/*
 * pumin.js 1.0.0
 * Date: 2016-06-14 12:08:57
 * Author : early at wangcunwu dot com
 */
(function ($, window, undefined) {
	$.noop = $.noop || function () {}; // jQuery 1.3.2
	var _count = 0,
		_$window = $(window),
		_$document = $(document),
		_$html = $('html'),
		_elem = document.documentElement,
		_isIE6 = window.VBArray && !window.XMLHttpRequest,
		_isMobile = 'createTouch' in document && !('onmousemove' in _elem)
			|| /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
		_quirks = document.compatMode != 'CSS1Compat',
		_expando = 'PuMin' + + new Date;

	var PuMin = function (opts) {
		//默认配置赋值
		opts = opts || {};
		
		//调用默认配置
		var defaults = PuMin.defaults;

		//合并默认配置
		for (var i in defaults){
			if (typeof(opts[i]) == 'undefined') opts[i] = defaults[i];
		}

		//存储全局配置
		self.options = opts;
		
		_count ++;
		
		return new PuMin.fn.init(opts);
	};

	PuMin.fn = PuMin.prototype = {
		version: '1.0.0',
		init: function (opts) {
			var that = this;
		},
		//script:脚本名 , path:脚本路径, jq:jquery脚本开关
		load: function (script, path) {
			alert('x');
		}
	};

	PuMin.stat = {
		//块图自动生成方法
		/*o : 即将展示的区域(JQuery选择器的方式)
		e.g. $('.class') 或 $('#elementId') 或 $('div')
		a : 即将展示的数组 
		e.g. var a =  [
	      		{name:'太阳能', percent: '68', color : 'LimeGreen', trend : 'up',param:'a1'},
	      		{name:'电能', percent: '12', color : 'Orange', trend : 'down',param:'a2'},
	      		{name:'风能', percent: '7', color : 'Brown', trend : 'up',param:'a3'},
	      		{name:'柴油', percent: '4', color : 'Purple', trend : 'up',param:'a4'},
	      		{name:'其他', percent: '9', color : 'DarkGoldenrod', trend : 'down',param:'a5'},
	      	 ];
	     url : 各个块的链接，留空则为无效链接，不可点击链接
	     e.g. http://eee.punmintech.com:40000/statist/index.html
	     start : 开始时间 格式：YYYY-mm-dd
	     end : 结束时间 格式：YYYY-mm-dd
	     e.g. 2016-06-28*/
		square : function(o, a, url, start, end){
			var __id = Math.round(Math.random()*1000000); //防止重复、随机ID
			var ow = $(o).width();
			var oh = $(o).height();
			var op = 100;
			if(typeof a === 'undefined') a = {};
			$(o).css('position','relative');
			$(o).addClass('pmStat__wrapper');
			var $sider = $('<div class="pmStat__sider" />');
			var bh = 60;
			if(ow > oh && a.length * 50 + bh <= ow){
				ow = ow - 120;
				oh = oh - bh;
				$sider.css({'width':'120px','height':oh+'px','padding':'0','margin':'0','border':'none','position':'absolute','right':'0','top':bh+'px'});
			}else{
				oh = oh - 80 - bh;
				$sider.css({'width':ow+'px','height':'80px','padding':'0','margin':'0','border':'none','position':'absolute','left':'0','bottom':'0'});
			}
			$('<div class="pmStat__banner" />').css({'height':bh+'px','width':($(o).width() - 10)+'px','padding':'0 0 0 10px','margin':'0','font-size':'1.2em','font-family':'microsoft yahei','text-align':'left', 'line-height' :bh+'px','border':'none'}).text(start + ' ~ ' + end).appendTo(o);
			$sider.appendTo(o);
			var rw = ow, rh = oh, rp = op, w, h, $mainArea = $('<div class="pmStat__mainArea" />');
			$mainArea.css({'width':ow+'px','height':oh+'px','background-color':'#f0f0f0','padding':'0','margin':'0','border':'none','position':'absolute','left':'0','top':bh+'px'}).appendTo(o);
			$.each(a, function(k, v){
				w = ow > oh ? (k%2 == 0 ? Math.floor(rw*v.percent/rp) : rw) : (k%2 == 0 ? rw : Math.floor(rw*v.percent/rp));
				h = ow > oh ? (k%2 == 0 ? rh : Math.floor(rh*v.percent/rp)) : (k%2 == 0 ? Math.floor(rh*v.percent/rp) : rh);
				rw = ow > oh ? (k%2 == 0 ? (rw - w) : rw) : (k%2 == 0 ? rw : (rw - w));
				rh = ow > oh ? (k%2 == 0 ? rh : (rh - h)) : (k%2 == 0 ? (rh - h) : rh);
				rp = rp - v.percent;
				$('<div id="pmStat_'+__id+'__block_'+k+'" class="pmStat__block" />').css({'padding':0,'margin':0,'float':(k > 0 && k%2 === 0 ? (ow > oh ? 'right' : 'left') : (ow > oh ? 'left' : 'right')),'position': 'relative','display':'block','width':w+'px','height':h+'px','background-color':(typeof PuMin.color[v.color] !== 'undefined' ? PuMin.color[v.color] : PuMin.color['Black'])}).appendTo($mainArea);
				$('<h3 id="pmStat_'+__id+'__percent_'+k+'" class="pmStat__percent" />').css({'font-size':'1.15em','padding-top':Math.floor((h-28)/2)+'px','white-space':'normal','color':'#ffffff','text-align':'center'}).appendTo('#pmStat_'+__id+'__block_'+k).html('<p>'+v.percent+'<span style="font-size:0.8em;">%</span></p>');
				$('<i class="icon fa-arrow-'+v.trend+'" />').css({'color':'#ffffff','font-style':'normal', 'margin-left':'10px' ,'font-size':'0.9em'}).appendTo('#pmStat_'+__id+'__percent_'+k+' p');
				if($('#pmStat_'+__id+'__percent_'+k+' p').width() < 100){
					$('#pmStat_'+__id+'__percent_'+k+' p').find('i').css({'display':'block','margin-left':'0'});
					$('#pmStat_'+__id+'__percent_'+k).css({'padding-top': Math.floor(h/2-28)+'px',});
				}
				//$('<a id="pmStat_'+__id+'__link_'+k+'" class="pmStat__link" href="'+(typeof url === 'undefined' || url == '' ? 'javascript:void();' : (url + v.param))+'" />').css({'display':'block', 'position':'absolute', 'height':h+'px', 'width':w+'px', 'top':'0', 'left':'0'}).appendTo('#pmStat_'+__id+'__block_'+k+'');
				$('<a id="'+(v.name)+'" onclick="displayNextLayer(this.id)" class="pmStat__link" />').css({'display':'block', 'position':'absolute', 'height':h+'px', 'width':w+'px', 'top':'0', 'left':'0'}).appendTo('#pmStat_'+__id+'__block_'+k+'');
				$('<dl id="pmStat_'+__id+'__legend_'+k+'" class="pmStat__legend" />').css({'padding':'0','margin':'0','float':'right','clear':'both', 'height':'50px','width':'70px'}).appendTo($sider);
				$('<dd />').css({'padding':'0','margin':'0','height':'20px','width':'70px','background-color':(typeof PuMin.color[v.color] !== 'undefined' ? PuMin.color[v.color] : PuMin.color['Black'])}).appendTo('#pmStat_'+__id+'__legend_'+k);
				$('<dt />').css({'padding':'0','margin':'0 0 5px 0','height':'25px','width':'65px','line-height':'25px','text-align':'right','font-size':'14px','padding-right':'5px','font-family':'microsoft yahei'}).appendTo('#pmStat_'+__id+'__legend_'+k).text(v.name);
				if(ow <= oh || a.length * 50 + bh > ow){
					$('#pmStat_'+__id+'__legend_'+k).css({'float':'left','clear':'none','margin':'30px 10px 0 0'});
					$('#pmStat_'+__id+'__legend_'+k).find('dt').css({'text-align':'center', 'padding':'0','margin':'0'});
				}
			});
		},
		//饼图自动生成方法
		sector : function(o, a, url, start, end){

		}
	};

	//判断浏览器类型以及版本
	PuMin.chkBrowse = function() {
		var _ua = navigator.userAgent.toLowerCase();
		var _is = (_ua.match(/\b(chrome|opera|safari|msie|firefox)\b/) || ['', 'mozilla'])[1];
		var _r = '(?:' + _is + '|version)[\\/: ]([\\d.]+)';
		var _v = (_ua.match(new RegExp(_r)) || [])[1];
		return {'is': _is,'ver': _v};
	};

	PuMin.fn.init.prototype = PuMin.fn;

	$.fn.PuMin = function () {
		var opts = arguments;
		PuMin.apply(this, opts);
		return this;
	};
	//颜色代码请参考：http://tool.oschina.net/commons?type=3
	PuMin.color = {
		Snow: '#FFFAFA',
		GhostWhite:'#F8F8FF',
		WhiteSmoke:'#F5F5F5',
		Gainsboro:'#DCDCDC',
		FloralWhite:'#FFFAF0',
		OldLace:'#FDF5E6',
		Linen:'#FAF0E6',
		AntiqueWhite:'#FAEBD7',
		PapayaWhip:'#FFEFD5',
		BlanchedAlmond:'#FFEBCD',
		Bisque:'#FFE4C4',
		PeachPuff:'#FFDAB9',
		NavajoWhite:'#FFDEAD',
		Moccasin:'#FFE4B5',
		Cornsilk:'#FFF8DC',
		Ivory:'#FFFFF0',
		LemonChiffon:'#FFFACD',
		Seashell:'#FFF5EE',
		Honeydew:'#F0FFF0',
		MintCream:'#F5FFFA',
		Azure:'#F0FFFF',
		AliceBlue:'#F0F8FF',
		lavender:'#E6E6FA',
		LavenderBlush:'#FFF0F5',
		MistyRose:'#FFE4E1',
		White:'#FFFFFF',
		Black:'#000000',
		DarkSlateGray:'#2F4F4F',
		DimGrey:'#696969',
		SlateGrey:'#708090',
		LightSlateGray:'#778899',
		Grey:'#BEBEBE',
		LightGray:'#D3D3D3',
		MidnightBlue:'#191970',
		NavyBlue:'#000080',
		CornflowerBlue:'#6495ED',
		DarkSlateBlue:'#483D8B',
		SlateBlue:'#6A5ACD',
		MediumSlateBlue:'#7B68EE',
		LightSlateBlue:'#8470FF',
		MediumBlue:'#0000CD',
		RoyalBlue:'#4169E1',
		Blue:'#0000FF',
		DodgerBlue:'#1E90FF',
		DeepSkyBlue:'#00BFFF',
		SkyBlue:'#87CEEB',
		LightSkyBlue:'#87CEFA',
		SteelBlue:'#4682B4',
		LightSteelBlue:'#B0C4DE',
		LightBlue:'#ADD8E6',
		PowderBlue:'#B0E0E6',
		PaleTurquoise:'#AFEEEE',
		DarkTurquoise:'#00CED1',
		MediumTurquoise:'#48D1CC',
		Turquoise:'#40E0D0',
		Cyan:'#00FFFF',
		LightCyan:'#E0FFFF',
		CadetBlue:'#5F9EA0',
		MediumAquamarine:'#66CDAA',
		Aquamarine:'#7FFFD4',
		DarkGreen:'#006400',
		DarkOliveGreen:'#556B2F',
		DarkSeaGreen:'#8FBC8F',
		SeaGreen:'#2E8B57',
		MediumSeaGreen:'#3CB371',
		LightSeaGreen:'#20B2AA',
		PaleGreen:'#98FB98',
		SpringGreen:'#00FF7F',
		LawnGreen:'#7CFC00',
		Green:'#00FF00',
		Chartreuse:'#7FFF00',
		MedSpringGreen:'#00FA9A',
		GreenYellow:'#ADFF2F',
		LimeGreen:'#32CD32',
		YellowGreen:'#9ACD32',
		ForestGreen:'#228B22',
		OliveDrab:'#6B8E23',
		DarkKhaki:'#BDB76B',
		PaleGoldenrod:'#EEE8AA',
		LtGoldenrodYello:'#FAFAD2',
		LightYellow:'#FFFFE0',
		Yellow:'#FFFF00',
		Gold:'#FFD700',
		LightGoldenrod:'#EEDD82',
		goldenrod:'#DAA520',
		DarkGoldenrod:'#B8860B',
		RosyBrown:'#BC8F8F',
		IndianRed:'#CD5C5C',
		SaddleBrown:'#8B4513',
		Sienna:'#A0522D',
		Peru:'#CD853F',
		Burlywood:'#DEB887',
		Beige:'#F5F5DC',
		Wheat:'#F5DEB3',
		SandyBrown:'#F4A460',
		Tan:'#D2B48C',
		Chocolate:'#D2691E',
		Firebrick:'#B22222',
		Brown:'#A52A2A',
		DarkSalmon:'#E9967A',
		Salmon:'#FA8072',
		LightSalmon:'#FFA07A',
		Orange:'#FFA500',
		DarkOrange:'#FF8C00',
		Coral:'#FF7F50',
		LightCoral:'#F08080',
		Tomato:'#FF6347',
		OrangeRed:'#FF4500',
		Red:'#FF0000',
		HotPink:'#FF69B4',
		DeepPink:'#FF1493',
		Pink:'#FFC0CB',
		LightPink:'#FFB6C1',
		PaleVioletRed:'#DB7093',
		Maroon:'#B03060',
		MediumVioletRed:'#C71585',
		VioletRed:'#D02090',
		Magenta:'#FF00FF',
		Violet:'#EE82EE',
		Plum:'#DDA0DD',
		Orchid:'#DA70D6',
		MediumOrchid:'#BA55D3',
		DarkOrchid:'#9932CC',
		DarkViolet:'#9400D3',
		BlueViolet:'#8A2BE2',
		Purple:'#A020F0',
		MediumPurple:'#9370DB',
		Thistle:'#D8BFD8',
		DarkBlue:'#00008B',
		DarkCyan:'#008B8B',
		DarkMagenta:'#8B008B',
		DarkRed:'#8B0000',
		LightGreen:'#90EE90'
	};

	window.PuMin = $.PuMin = PuMin;

})(jQuery, window);


function displayNextLayer(layer_type) {
	var __ar1 = [];

	switch (layer_type){
		case '太阳能':{
			__ar1 =  [
				{name:'太阳能', percent: '12', color : 'LimeGreen', trend : 'up',param:'a1'},
				{name:'电能', percent: '68', color : 'Orange', trend : 'down',param:'a2'},
				{name:'风能', percent: '9', color : 'Brown', trend : 'up',param:'a3'},
				{name:'柴油', percent: '7', color : 'Purple', trend : 'up',param:'a4'},
				{name:'其他', percent: '4', color : 'DarkGoldenrod', trend : 'down',param:'a5'},
			];
		}break;
		case '电能':{
			__ar1 =  [
				{name:'太阳能', percent: '10', color : 'LimeGreen', trend : 'up',param:'a1'},
				{name:'电能', percent: '20', color : 'Orange', trend : 'down',param:'a2'},
				{name:'风能', percent: '30', color : 'Brown', trend : 'up',param:'a3'},
				{name:'柴油', percent: '30', color : 'Purple', trend : 'up',param:'a4'},
				{name:'其他', percent: '10', color : 'DarkGoldenrod', trend : 'down',param:'a5'},
			];
		}break;
		case '风能':{
			__ar1 =  [
				{name:'太阳能', percent: '50', color : 'LimeGreen', trend : 'up',param:'a1'},
				{name:'电能', percent: '10', color : 'Orange', trend : 'down',param:'a2'},
				{name:'风能', percent: '10', color : 'Brown', trend : 'up',param:'a3'},
				{name:'柴油', percent: '10', color : 'Purple', trend : 'up',param:'a4'},
				{name:'其他', percent: '20', color : 'DarkGoldenrod', trend : 'down',param:'a5'},
			];
		}break;
		case '柴油':{
			__ar1 =  [
				{name:'太阳能', percent: '30', color : 'LimeGreen', trend : 'up',param:'a1'},
				{name:'电能', percent: '30', color : 'Orange', trend : 'down',param:'a2'},
				{name:'风能', percent: '30', color : 'Brown', trend : 'up',param:'a3'},
				{name:'柴油', percent: '5', color : 'Purple', trend : 'up',param:'a4'},
				{name:'其他', percent: '5', color : 'DarkGoldenrod', trend : 'down',param:'a5'},
			];
		}break;
		case '其他':{
			__ar1 =  [
				{name:'太阳能', percent: '10', color : 'LimeGreen', trend : 'up',param:'a1'},
				{name:'电能', percent: '10', color : 'Orange', trend : 'down',param:'a2'},
				{name:'风能', percent: '10', color : 'Brown', trend : 'up',param:'a3'},
				{name:'柴油', percent: '10', color : 'Purple', trend : 'up',param:'a4'},
				{name:'其他', percent: '60', color : 'DarkGoldenrod', trend : 'down',param:'a5'},
			];
		}break;
	}

	//区域统计
	$.PuMin.stat.square('#statArea1', __ar1, "www.baidu.com", '2016-06-20', '2016-06-22');

}