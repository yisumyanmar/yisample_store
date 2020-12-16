<template>
	<!-- 店铺 - 文章列表-->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">文章列表</span>
				<i>（ 共 21 条记录 ）</i>
				<div class="t_add fr" @click="tolink">添加普通文章</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>如果发布文章时，未有文章分类，请联系平台方进行添加</p>
					<p>店铺发布文章后，需平台审核通过后，方可在前台文章模块展示</p>
				</div>
			</div>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list search">
				<tr>
					<td width="7%" align="right">提标 ：</td>
					<td width="22%">
						<el-input style="width: 200px;" v-model="title" clearable></el-input>
					</td>
					<td width="6%" align="right"> 文章分类 ： </td>
					<td width="20%">
						<el-select  v-model="params1.category_id" placeholder="请选择">
							<el-option v-for="(items, index) in artType" :key="index" :label="items.name" :value="items.id">
              </el-option>
						</el-select>
        
					</td>
					<td width="12%" align="left" class="black bold">
						<el-button @click="Search" type="success">搜索</el-button>
					</td>
				</tr>
			</table>
      
			<el-table border :data="dataTable" style="width: 100%" max-width="900">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="title" width="150" label="文章提标" >
				</el-table-column>
				<el-table-column prop="name" label="文章分类" show-overflow-tooltip>
				</el-table-column>
        <!-- <el-table-column prop="range" label="点出量"> 
				</el-table-column> -->
				<el-table-column prop="display" label="是否显示">
          <template slot-scope="scope">
              <el-switch v-model="displayStatus[scope.$index]" @click.native="setStatus(scope.row.id,displayStatus[scope.$index])"  active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
          </template>
				</el-table-column>
				<el-table-column prop="show" label="是否推荐">
          <template slot-scope="scope">
              <el-switch v-model="recommendStatus[scope.$index]" @click.native="setRecommend(scope.row.id,recommendStatus[scope.$index])" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
          </template>
				</el-table-column>
        <el-table-column prop="sort" label="排序">
				</el-table-column>
        <!-- <el-table-column prop="end_time" label="审核状态">
				</el-table-column> -->
				<el-table-column width="140" label="操作">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
						<el-button @click="deleteArticle(scope.row.id)" size="mini" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
      <div class="Paging">
				<div class="fl pil">删除</div>
				<div class="Paging_r">
					<el-pagination background layout="prev, pager, next,jumper" 
          :page-size="page_size" @current-change="handleCurrentChange" :total="page">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'artuclelist',
	data() {
		return {
      title:'',
      dataTable:[],
      value: true,
      page_size: 0, //每页显示几个
			page: 0, //总页数
      currentPage: 1, //当前页
   
      artType: [],
      
      params1: {
        page: 1,
        category_id:''
      },
      displayStatus: [],
      recommendStatus: []
		}
	},
  created() {
      this.querySelect();
      this.getArticle();
     
  },
	methods: {
		tolink() {
			this.$router.push({
				name: 'addarticle',
				// params: {
				//     status: 0
				// }
			});
    },

    getArticle() {
            this.axios.post(this.$httpConfig.getStoreArticle, {}).then((res) => {
                this.artType = res.data.data;    
            })
        },
        setStatus(status, displayStatus) {
            let state = displayStatus == false ? 1 : 0;
            
            this.$HTTP(this.$httpConfig.showArticle,{
                status: state,
                id: status,
            }).then(res => {
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
            }).catch(err => {
                console.log(err);
            })
        },
        setRecommend(status, recommendStatus) {
            let state = recommendStatus == false ? 1 : 0;
            
            this.$HTTP(this.$httpConfig.recommendArticle,{
                status: state,
                id: status,
            }).then(res => {
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
            }).catch(err => {
                console.log(err);
            })
        },
    Search(){
        this.params1.page = this.currentPage;
        this.$HTTP(this.$httpConfig.articleSearch,{
          title: this.title,
          categoryId: this.params1.category_id 
        },"post").then((res)=>{
          this.dataTable = [];
          this.dataTable = res.data.data.articles;
          for (var i in this.dataTable) {
              this.displayStatus[i] = this.dataTable[i].display == "1" ? true : false;
              this.recommendStatus[i] = this.dataTable[i].recommend == "1" ? true : false;
          }
          this.page_size = res.data.data.page_size;
          this.page = Number(res.data.data.totalPages * res.data.data.page_size);
          this.$message.success(res.data.message);
        }).catch((err) =>{
          this.$message.error(res.data.message);
        });
    },
    querySelect(){
        this.params1.page = this.currentPage;
        this.$HTTP(this.$httpConfig.selectArticle,{page: this.currentPage},"post").then((res)=>{
          this.dataTable = [];
          this.dataTable = res.data.data.articles;
          for (var i in this.dataTable) {
              this.displayStatus[i] = this.dataTable[i].display == "1" ? true : false;
              this.recommendStatus[i] = this.dataTable[i].recommend == "1" ? true : false;
          }
          this.page_size = res.data.data.page_size;
          this.page = Number(res.data.data.totalPages * res.data.data.page_size);
          this.$message.success(res.data.message);
        }).catch((err) =>{
          this.$message.error(res.data.message);
        });
    },
    edit: function (value) {
			this.$router.push({
				name: 'addarticle',
				params: {
					status: 1,
					id: value
				}
			});
		},
    deleteArticle(value){
			this.$confirm('此操作将永久删除此文章，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delArticle,{id: value},).then((res) => {
					this.$message.success(res.data.message);
          this.querySelect();
         
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		},
    handleCurrentChange: function (currentPage) {
			// console.log(currentPage);
      this.currentPage = currentPage;
      this.querySelect();
		},
	}

}
</script>
<style lang="less">
.Paging {
  width: 100%;
  height: 50px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  .pil {
    border: 1px solid #e9573e;
    color: #fff;
    text-align: center;
    display: block;
    border-radius: 4px;
    background-color: #e9573e;
    float: left;
    margin: 10px 10px 10px 70px;
    cursor: pointer;
    width: 58px;
    height: 32px;
    line-height: 32px;
  }
  .Paging_r {
    float: right;
    padding: 10px;
  }
}
</style>
<style lang="less">
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
    i {
      color: #999;
    }
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 15px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 35px;
    }
  }
}
</style>
<style lang="less" scoped>
.classify {
  width: 1042px;
  .g_att {
    .Commodity-management {
      background-color: #f6f6f6;
      border: 1px solid #dddddd;
      margin-top: 15px;
      line-height: 50px;
      tr {
        td {
          input {
            border: 1px solid #ddd;
            line-height: 29px;
            height: 29px;
            color: #999;
            text-indent: 5px;
          }
          select {
            width: 170px;
            border: 1px solid #ddd;
            line-height: 29px;
            height: 29px;
            color: #999;
          }
          .search {
            width: 58px;
            height: 32px;
            line-height: 32px;
            background-color: #f7bc0a;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }
    }
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
          input,
          select,
          textarea,
          button {
            outline: 0 none;
            vertical-align: middle;
            text-indent: 5px;
          }
          .paging {
            background: #fff;
            line-height: 30px;
            float: right;
            width: 850px;
            input {
              border: 1px solid #dddddd;
              height: 28px;
            }
            .number {
              float: right;
              span {
                width: 30px;
                height: 28px;
                float: left;
                text-align: center;
                line-height: 30px;
                border: 1px solid #dddddd;
              }
              .page {
                width: 30px;
                height: 30px;
                line-height: 30px;
                background-color: #f7bc0a;
                text-align: center;
                color: #fff;
                border: none;
                border-right: 1px solid #eeb407;
                cursor: pointer;
              }
            }
            .go {
              width: 37px;
              border: 1px solid #dddddd;
              height: 28px;
              border-radius: 6px;
              background-color: #f7f7f7;
              display: block;
              float: right;
              text-align: center;
              margin: 0 15px;
              cursor: pointer;
            }
            span {
              float: right;
            }
          }
          .edit {
            border: 1px solid #dddddd;
            color: #666666;
            width: 40px;
            line-height: 22px;
            text-align: center;
            display: block;
            border-radius: 4px;
            float: left;
            margin-right: 15px;
            cursor: pointer;
          }
        }
      }
      .delete {
        background-color: #e9573e;
        color: #fff;
        width: 56px;
        line-height: 30px;
        text-align: center;
        display: block;
        border-radius: 4px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>