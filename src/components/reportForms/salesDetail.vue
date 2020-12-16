<template>
  <!-- 商家销售明细 -->
  <div class="salesDetail">
      <div class="g_att">
        <h1 class="t_title">
          <span class="size16">销售分析列表</span>
        </h1>
        <div class="notes-box">
            <div class="notes_title">温馨提示</div>
            <div class="notes_content">
              <p>统计商品销量，销售数量</p>
              <p>方便平台 对商户进行分析</p>
            </div>
        </div>
      </div>
      <!--搜索 -->
      <div class="search">
        <div class="title">
          商品名称:
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
            prop="title"
            label="商家标题"
            >
          </el-table-column>
          <el-table-column
            prop="total_num"
            label="卖出数量"
            >
          </el-table-column>
          <el-table-column
            
            prop="total_price"
            label="商品总价">
          </el-table-column>
          <el-table-column
            prop="avg_price"
            label="均价">
          </el-table-column>
        </el-table>
      </template>
  </div>
</template>
<script>
export default {
  data(){
    return {
      search:'',
      data:[],
      page: 0, //共多少页
      currentPage: 1, //当前页
      page_size: 0, //每页显示多少条数据
    }
  },
  created(){
    this.getajaxGetDataList();
  },
  methods:{
    // 销售明细
    getajaxGetDataList(){
      this.$HTTP(this.$httpConfig.getajaxGetDataList,{},'post').then(res=>{
        this.data = res.data.data.data;
        this.$message.success(res.data.message);
      }).catch(e=>{
        this.$message.error(e.data.message)
      })
    },
    // 搜索
    get(){
      if(this.search!=''){
        this.$HTTP(this.$httpConfig.getajaxGetDataList,{
          goods_id:this.search
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
  }
}
</script>
<style>
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
</style>

<style lang="less" scoped>
	.salesDetail {
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

