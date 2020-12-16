 

// Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
var echarts_stype = 'shine';
// 基于准备好的dom，初始化echarts实例

console.log(document.getElementById('user_chart'));
var myChart = echarts.init(document.getElementById('user_chart'),echarts_stype);
option = {
	title : {
		text : '订单统计图表'
	},
	tooltip : {
		trigger : 'axis'
	},
	
	toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
	
	legend : {
		data : [ '订单数','付款订单数' ]
	},
	grid : {
		left : '3%',
		right : '4%',
		bottom : '3%',
		containLabel : true
	},
	xAxis : [ {
		type : 'category',
		boundaryGap : false,
		data :  [] 
	} ],
	yAxis : [ {
		type : 'value',
		name : '金额',
        axisLabel : {
        	formatter: '{value} ￥'
        }
			 
	} ],
	series : [ {
		name : '订单数',
		type : 'line',
		data : []
	}, {
		name : '付款订单数',
		type : 'line',
		data : []
	} ]
};
myChart.setOption(option);

function payType (res)
{
	var data = res.data;
	if (!data.hasOwnProperty('pay_type')) {
		data.pay_type = [];
	}
	var typeData = data.pay_type;
	
	var payNumber = data.order_pay_number;
	
	// var array  = AnalysisOrder.addJsonByArray(payNumber);
	
	console.log(payNumber);
	var paymentChart = echarts.init(document.getElementById('payment_type_chart'), echarts_stype);
	var optionPayType = {
		title : {
			text : '支付方式统计',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			left : 'left',
			data : typeData
		},
		series : [ {
			name : '支付方式',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : array,
			itemStyle : {
				emphasis : {
					shadowBlur : 10,
					shadowOffsetX : 0,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			}
		} ]
	};
	paymentChart.setOption(optionPayType);
}

function distributionMode (res)
{
	var expressChart = echarts.init(document.getElementById('express_type_chart'), echarts_stype);

	var data = res.data;
	if (!data.hasOwnProperty('distribution_mode')) {
		data.distribution_mode = [];
	}
	var mode = data.distribution_mode;
	
	// var array  = AnalysisOrder.addJsonByArray(mode);
	
	option = {
		title : {
			text : '配送方式统计',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			left : 'left',
			data : mode
		},
		series : [ {
			name : '配送方式',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : array,
			itemStyle : {
				emphasis : {
					shadowBlur : 10,
					shadowOffsetX : 0,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			}
		} ]
	};
	expressChart.setOption(option);
}



$.get(path,function(chinaJson) {
	
	console.log(chinaJson);
	echarts.registerMap('china', chinaJson);
	
	
	Tool.ajax(AREA_URL_LIST, {}, parseArea);
	
});

// function parseArea (res)
// {
// 	var data = res.data;
	
// 	if (!data.hasOwnProperty('areaOrder')) {
// 		data.areaOrder = [];
// 	}
// 	var mode = data.areaOrder;
	
// 	// var array  = AnalysisOrder.addJsonByArray(mode);
	
// 	array.sort();
	
// 	console.log(array);
	
// 	var max  = 0;
// 	// if (!Tool.isEmptyArray(array)) {
// 	// 	max = array[0].value;
// 		for (var i =1 ; i < array.length; i++) {
// 			if (!array[i].hasOwnProperty('value')) {
// 				continue;
// 			}
// 			if ( array[i].value > max) {
// 				max =array[i].value
// 			} 
// 		}
// 	//}
	
	
	var chart = echarts.init(document.getElementById('order_map_chart'),echarts_stype);
	var option = {
		title : {
			text : '不同地区订单统计',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		series : [ {
			name : '订单量',
			type : 'map',
			mapType : 'china',
			roam : false,
			label : {
				normal : {
					show : false
				},
				emphasis : {
					show : false
				}
			},
			data : array
		}],
		visualMap : {
			min : 0,
			max : max,
		    left : 'left',
		    top : 'bottom',
		    text : ['高','低' ], // 文本，默认为数值文本
			calculable : true
		},
	};
	chart.setOption(option);

