<template>
  <!-- 行业统计 -->
  <div class="industry">
      <div class="g_att">
        <h1 class="t_title">
          <span class="size16">行业统计</span>
        </h1>
        <div class="notes-box">
            <div class="notes_title">温馨提示</div>
            <div class="notes_content">
              <p>销售额：所选时间范围内所有订单状态下商品售价总额（不包含运费）。</p>
              <p>商品总数：所选商品分类下商品总数。</p>
            </div>
        </div>
      </div>
      <div class="cartogram">
          <div class="title">统计订单</div>
          <div id="orderStatistics" v-if="iscar"></div>
          <div id="hint" v-else>暂无数据</div>
      </div>
      <!--搜索 -->
      <div class="search">
        <div class="title">
          日期:
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="search"
            clearable>
          </el-input>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        </div>
      </div>
      <!--明细 -->
      <template>
        <el-table
          :data="data"
          border
          style="width: 100%">
          <el-table-column
            prop="class_name"
            label="分类标题"
            >
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品名称"
            >
          </el-table-column>
          <el-table-column
            prop="total_num"
            label="商品销售总数量">
          </el-table-column>
          <el-table-column
            prop="total_price"
            label="商品销售总额">
          </el-table-column>
        </el-table>
      </template>
  </div>
</template>
<script>
// 引入echarts
var echarts = require('echarts');
export default {
  data(){
    return {
      search:'',
      data:[],
      echarts_stype:'shine',
      page: 0, //共多少页
      currentPage: 1, //当前页
      page_size: 0, //每页显示多少条数据
      iscar:true
    }
  },
  created(){
    this.getajaxGetDataList();
    this.getajaxGetIndustryStatistics();
  },
  methods:{
    // 行业分析-折线图数据
    getajaxGetIndustryStatistics(){
      this.$HTTP(this.$httpConfig.getajaxGetIndustryStatistics,{},'post').then(res=>{ 
        this.orderStatistics(res.data.data);
        this.iscar=true;
      }).catch(e=>{
        this.$message.error(e.data.message);
        this.iscar=false;
      })
    },
    // 行业分析-列表
    getajaxGetDataList(){
      this.$HTTP(this.$httpConfig.getajaxGetIndustryStatisticsDetailList,{},'post').then(res=>{
        this.data = res.data.data.data;
        this.$message.success(res.data.message);
      }).catch(e=>{
        this.$message.error(e.data.message);
        
      })
    },
    // 搜索
    get(){
      if(this.search!=''){
        this.$HTTP(this.$httpConfig.getajaxGetIndustryStatisticsDetailList,{
          //goods_id:this.search   暂无搜索参数
        },'post').then(res=>{
          this.data = res.data.data.data;
          this.$message.success(res.data.message);
        }).catch(e=>{
          this.$message.error(e.data.message)
        })
      } else {
        this.$message.error('搜索不能为空')
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
    orderStatistics(reg){//订单统计图表
      let name=[],price=[],goods=[];
      for(let i in reg){
        name.push(reg[i].class_name);
        price.push(reg[i].total_price);
        goods.push(reg[i].total_goods_number);
      }
      console.log(reg);
      console.log(name,price,goods);
        var myChart = echarts.init(document.getElementById('orderStatistics'),this.echarts_stype);
          myChart.setOption({
            title: {
                text: '行业分析概况图表',

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
              data : [ '订单金额','商品数量' ]
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
              data :name
            } ],
            yAxis : [ {
              type : 'value',
              name : '订单数量',
                  axisLabel : {
                    formatter: '{value}￥'
                  }
            } ],
            series : [ {
              name : '订单金额',
              type : 'line',
              data : this.random(price, 0, price.length)
            }, {
              name : '商品数量',
              type : 'line',
              data : this.random(goods, 0, goods.length)
            } ]
        });
      },
  }
}
</script>
<style>
  body{
    overflow:scroll !important;
  }
  #hint{
    text-align: center;
    font-size: 24px;
    height:100px;
    line-height: 100px;
  }
  #orderStatistics{
    width:100%;
    height:400px;
    display: flex;
  }
  .search{
    margin-top:5px;
    margin-bottom:10px;
    height:53px;
    line-height: 53px;
    display: flex;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    background: #F8F8F8;
    
  }
  .search>div{
    width:260px;
    height: 34px;
    margin-right:10px;
    
  }
  .search>div.title{
    color: #000;
    font-size:14px; 
    font-weight:900;
    margin-right: 10px;
    height: 34px;
    width:80px;
    margin-left:10px;
  }
  .cartogram{
    margin-top:5px;
    margin-bottom:5px;
    border:1px solid #ddd;
   
    
  }
  .cartogram>.title{
    color: #000;
    height:40px;
    line-height:40px;
    text-align: center;
    font-size:16px;
    font-weight:400;
    border-bottom:1px solid #ddd;
    border-radius: 5px;
  }
</style>

<style lang="less" scoped>

	.industry {
    width: 1020px;
    margin-bottom:200px;
		.g_att {
		.t_title {
			color: #333;
			border-bottom: 1px solid #dddddd;
			overflow: hidden;
			margin-bottom: 22px;
			line-height: 50px;
			span {
				float: left;
				color: #333;
			  }
		  }
	  }
	}
</style>
