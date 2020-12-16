<template>
    <!-- 经营类目列表-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">经营类目 - 列表</span>
                <div class="t_add fr" @click="tolink">添加经营类目</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>经营类目须总后台审核</p>
                </div>
            </div>
            <h1 class="t_title">
                <span class="size16">经营类目列表</span>
                <i>（ 共 {{listData.length}} 条记录 ）</i>
            </h1>
            <el-table ref="multipleTable" :data="listData" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="编号" prop="id">
                </el-table-column>
                <el-table-column prop="one_name" label="一级分类">
                </el-table-column>
                <el-table-column prop="two_name" label="二级分类">
                </el-table-column>
                <el-table-column prop="three_name" label="三级分类">
                </el-table-column>
                <el-table-column label="审核状态">
                    <template slot-scope="scope" v-if="scope">
                        <span>{{ statusArray[scope.row.status] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button slot="reference" @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button> -->
                        <el-button size="mini" icon="el-icon-delete" @click="clear(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-button type="danger" style="float:left; margin-left:50px;" @click="deleteAll" size="mini">删除</el-button>
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberGrade',
    data() {
        return {
            value: true,
            listData: [],
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 10,//每页显示多少条数据
            statusArray:['审核中','通过审核', '拒绝审核']
        }
    },
    created() {
        
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            this.$HTTP(this.$httpConfig.getStoreBindClassList,{page: this.currentPage}).then((res) => {
                this.listData = [];
                let data = res.data.data.data;
                for (let key in data) {
                    this.listData.push(data[key])
                }
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.page);
            }).catch((err) => {
                console.log(err);
            })
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
        },
        //编辑
        edit(id) {
            this.$router.push({
                name: 'addCategory',
                params: {
                    id: id
                }
            })
        },
        deleteAll() {
             this.$router.push('/addCategory');
        },
        clear(id){
            this.$confirm('此操作将永久删除此类目，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$HTTP(this.$httpConfig.delOperateClass,{id:id}).then((res)=>{
                    this.$message.success(res.data.message);
                    this.getData();
                })
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        tolink() {
            this.$router.push('addCategory');
        },
    }

}
</script>
<style lang="less">
body {
  overflow: inherit;
}
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
.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label span {
    line-height: 20px;
  }
}
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
  }
}
</style>
