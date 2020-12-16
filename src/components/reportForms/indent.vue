<template>
	<!-- 订单统计 -->
	<div class="indent">
		<div class="g_att">
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.订单统计图表可切换显示模式（数据视图、折线图、柱状图）</p>
          <p>2.订单统计图表可以将图表下载为图片格式</p>
				</div>
			</div>
      <h1 class="t_title">
				  <span class="size16">订单统计</span>
			</h1>
      <!-- 查询按钮 -->
      <div class="query">
          <el-row>
            <el-button type="primary" @click="weeklyStatistics">最近七天</el-button>
            <el-button type="primary" @click="MonthlyStatistics">最近一个月</el-button>
          </el-row>
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker> ~
            <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              >
            </el-date-picker>
          </div>
          <el-row>
            <el-button type="primary" @click="ScopeStatistics">查看</el-button>
          </el-row>
      </div>
      <!-- 订单数量 -->
      <div class="orderQuantity">
        <p :title="sky.money+'元'">今日订单：{{sky.number}}</p>
        <p :title="luna.money+'元'">本月订单：{{luna.number}}</p>
        <p>总金额：{{week.moneryTotal}}元</p>
        <p>订单总数：{{week.totalNumber}}</p>
      </div>
      <!-- 订单统计 -->
			<div id="user_chart">
      </div>
      <!-- 支付与配送统计 -->
			<div class="pancake">
        <div id='payment_type_chart'></div>
        <div id="express_type_chart"></div>
      </div>
      <!-- 地区统计 -->
			<div id="order_map_chart">

      </div>
		</div>
	</div>
</template>
<script>
// 引入echarts
var echarts = require('echarts');

export default {
	data() {
		return {
      echarts_stype:'shine',
      value1:'',
      value2:'',
      week:[],
      sky:{},
      luna:{},
		}
  },
  created(){
    this.weeklyStatistics();// 周查
    this.getcurretMonthNumber();// 当月订单数
    this.getcurretDayNumber(); // 当天订单数
    this.getpayMemtMonery(); // 支付方式统计\
    this.getdistributionMode(); // 配送方式统计
    this.getAreaOrderNumber(); // 地区统计
  },
	mounted() {
     
  },
	methods: {
      // 地区统计
      getAreaOrderNumber(){
        
        this.$HTTP(this.$httpConfig.getAreaOrderNumber,{},'post').then(res=>{
          this.order_map_chart(res.data.data);
        }).catch(e=>{
          console.log(e)
        })
      }, 
      // 配送方式统计
      getdistributionMode(){
        this.$HTTP(this.$httpConfig.getdistributionMode,{},'post').then(res=>{
          this.express_type_chart(res.data.data);
        }).catch(e=>{
          console.log(e)
        })
      },
      // 支付方式统计
      getpayMemtMonery(){
        this.$HTTP(this.$httpConfig.getpayMemtMonery,{},'post').then(res=>{
          this.payment_type_chart(res.data.data);
        }).catch(e=>{
          console.log(e)
        })
      }, 
      // 当月订单数
      getcurretMonthNumber(){
        this.$HTTP(this.$httpConfig.getcurretMonthNumber,{},'post').then(res=>{
          this.luna = res.data.data;
        }).catch(e=>{
          console.log(e)
        })
      },
      // 当天订单数
      getcurretDayNumber(){
        this.$HTTP(this.$httpConfig.getcurretDayNumber,{},'post').then(res=>{
          this.sky = res.data.data;
        }).catch(e=>{
          console.log(e)
        })
      },
      // 周查询
      weeklyStatistics(){
        this.$HTTP(this.$httpConfig.getWeeklyStatistics,{},'post').then(res=>{
          this.week = [];
          this.week = res.data.data;
          this.user_chart(res.data.data);
          this.$message.success(res.data.message);
        }).catch((e)=>{
          console.log(e);
          this.$message.error(e.data.message);
        })
      },
      // 月查询
      MonthlyStatistics(){
        this.$HTTP(this.$httpConfig.getMonthlyStatistics,{},'post').then(res=>{
          //console.log(res);
          this.week = [];
          this.week = res.data.data;
          this.user_chart(res.data.data);
          this.$message.success(res.data.message);
        }).catch(e=>{
          console.log(e);
          this.$message.error(e.data.message);
        })
      },
      // 范围查询
      ScopeStatistics(){
        if(this.value2!=''&&this.value1!=''){
          this.$HTTP(this.$httpConfig.getScopeStatistics,{
            start_time:this.value1,
            end_time:this.value2
          },'post').then(res=>{
            //console.log(res);
            this.week = [];
            this.week = res.data.data;
            this.user_chart(res.data.data);
            this.$message.success(res.data.message);
          }).catch(e=>{
            console.log(e);
            this.$message.error(e.data.message);
          })
        }else{
          this.$message.error('搜索日期不能为空')
        }
        
      },
      /**
       * 
       * @param {Array}  请求的数组
       * @param {} 填充的值
       * @param {Number} 需要填充的数量
       * @returns {Array}
       * 
       */
      random (arr, fillValue, num) {
        let res = []
        if (arr.length === 0) {
          for (let i = 0; i < num; i++) {
            res.push(fillValue)
          }
        } else {
          for(let i in arr){
            res.push(arr[i]);
          }
          if(res.length<num){//如果返回的数据数量小于日期的数量，就末尾追加为0
            for(let i=res.length;i<num;i++){
              res.push(0)
            }
          }
        }
        return res
      },
      user_chart(res){//订单统计图表
        let week=res;
        var myChart = echarts.init(document.getElementById('user_chart'),this.echarts_stype);
          myChart.setOption({
            title: {
                text: '订单统计图表'
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
              data :week.dataStr
            } ],
            yAxis : [ {
              type : 'value',
              name : '订单数量',
                  axisLabel : {
                    formatter: '{value}'
                  }
            } ],
            series : [ {
              name : '订单数',
              type : 'line',
              data : this.random(week.payNumber, 0, week.dataStr.length)
            }, {
              name : '付款订单数',
              type : 'line',
              data : this.random(week.dataNumber, 0, week.dataStr.length)
            } ]
        });
      },
      payment_type_chart(res){//支付方式统计
        let pay_type = res.pay_type;
        let order_pay_number = res.order_pay_number;
        var payment_type_chart = document.getElementById('payment_type_chart');
        var paymentChart = echarts.init(payment_type_chart,this.echarts_stype);
        var option = {
                title : {
                    text: '支付方式统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: pay_type
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:order_pay_number,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        paymentChart.setOption(option);
      },
      express_type_chart(res){//配送方式统计
        let express = res.express; 
        let distribution_mode = res.distribution_mode;
        var expressChart = echarts.init(document.getElementById('express_type_chart'),this.echarts_stype);
        var option = {
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
            data : express
          },
          series : [ {
            name : '配送方式',
            type : 'pie',
            radius : '55%',
            center : [ '50%', '60%' ],
            data : distribution_mode,
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
      },
      /**
       * @param {Object}  // param 请求的结果
       * @param {Object}  // chinaJson 地区数据
       * */
      // 地区统计方法
      addJsonByArray(param,chinaJson) {
         let features = chinaJson.features;
          let city = [];
          features.map((item, index) => {
            city.push({name: item.properties.name, value: null})
          })
        if (param.length !== 0) {
          features.map((item, index) => {
            city.push({name: item.properties.name})
            param.filter(j => {
              if (city[index].name === j.name) city[index].value = j.value
              // city[index].name == j.name ? city[index].value = j.value : city[index].value = null
            })
          })
          return city
        }else{
          return city
        }
        
      },
      order_map_chart(res){//地区统计
        var chinaJson = require('echarts/map/json/china.json');
        echarts.registerMap('china', chinaJson);
       let data = res;
       if (!data.hasOwnProperty('areaOrder')) {
          data.areaOrder = [];
       };
       let mode = data.areaOrder;
       let array  = this.addJsonByArray(mode,chinaJson);
       //array.sort();
       let max  = 0;
       if (array!=false) {
          max = array[0].value;
          for (var i =1 ; i < array.length; i++) {
            if (!array[i].hasOwnProperty('value')) {
              continue;
            }
            if ( array[i].value > max) {
              max =array[i].value
            } 
          }
      }
      
        var chart = echarts.init(document.getElementById('order_map_chart'),this.echarts_stype);
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
            calculable : true,
            realtime: false,
            inRange: {
                color: ['#43A6D6','#DDDDDD','yellow',]
            }
          },
        };
        chart.setOption(option);
      }
  }
}
</script>
<style type="text/css">
/* 订单数量 */
.orderQuantity{
  width:998px;
  height:37px;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid #ddd;
}
.orderQuantity>p{
  height:37px;
  line-height:37px;
  border-right:1px solid #ddd;
  width:25%;
  /* text-align: center; */
  padding-left: 10px;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  color:#000;
}
 .orderQuantity>p:nth-of-type(4){
   border-right:0px;
 }
/* 查询but设置 */
.query{
  width:978px;
  height:53px;
  line-height:50px;
  display: flex;
  flex-wrap: nowrap;
  padding-left:20px;
  border:1px solid #ddd;
  border-bottom: 0px;
}
.block{
  margin-left:40px;
  margin-right:20px;
}
/* ↓统计图框样式 */
#user_chart{
  width:998px;
  height:25pc;
  border:1px solid #ddd;
  border-top:0px;
  border-bottom:0px;
}
.pancake{
  width:1000px;
  height:450px;
  display: flex;
  flex-wrap: nowrap;
  
}
#payment_type_chart {
  width:50%;
  height:430px;
  border: 1px solid #ddd;
  border-right: 0px;
  background: #fff;
  padding-top:20px;
}
#express_type_chart{
  width:50%;
  height:430px;
  border: 1px solid #ddd;
  background: #fff;
  padding-top:20px;
}
#order_map_chart{
  width:998px;
  height:467px;
  padding-top:30px; 
  border: 1px solid #ddd;
  border-top:0px;
}
/* ↑统计图框样式 */
.indent {
  width: 1000px !important;
  padding-bottom: 80px;
}
.shopManage {
  padding-bottom: 80px;
}
.logistics {
  padding-bottom: 80px;
}
</style>
<style lang="less">
body {
  overflow: inherit;
}
</style>
<style lang="less">
.g_att {
  .t_title {
    color: #333;
    border: 1px solid #dddddd;
    border-bottom:0px;
    overflow: hidden;
    padding-left:20px;
    // margin-bottom: 22px;
    line-height: 50px;
    span {
      float: left;
      color: #333;
    }
  }
}
</style>
<style lang="less" scoped>
.indent {
  width: 1042px;
  margin-bottom:200px;
  .g_att {
   
    
  }
}
</style>

