<template>
  <div class="classify">
    <div class="g_att">
      <h1 class="t_title">
        <span class="size16">分销列表</span>
        <!-- <i>（ 共 {{ dataTable.length }} 条记录 ）</i> -->
        <!--<div @click="to" class="t_add fr">添加商品赠品</div>-->
      </h1>
      <div class="notes-box">
        <div class="notes_title">温馨提示</div>
        <div class="notes_content">
          <p>操作提示</p>
          <p>此分销属于店铺销售品台产品品类</p>
          <p>如店铺销售自己的产品则在商户管理中心设置提成</p>
        </div>
      </div>
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        class="Commodity-management"
      >
        <tr>
          <td class="td-title" align="right">时间段：</td>
          <td class="inp">
            <!--<el-input style="width: 200px;" v-model="params.activeName" clearable></el-input>-->
            <!-- <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            请选择时间段<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                            <el-dropdown-item command="b">狮子头</el-dropdown-item>
                            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                            <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown> -->
            <div class="select">
              <p class="select-title" @click="clickSize()">
                {{ timeSlotContent
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <transition name="opacityLeave">
                <div class="condition-list" v-show="isShowSize">
                  <div class="size-wrap">
                    <p
                      :class="colorHover == index ? 'active' : 'a_white'"
                      class="size"
                      @mouseenter="changeColor(index)"
                      @mouseleave="reductionColor(index)"
                      :key="index"
                      v-for="(item, index) in ringSize"
                      @click="getSize(item)"
                    >
                      {{ formatDate(item.start_time) }}-{{
                        formatDate(item.end_time)
                      }}
                    </p>
                  </div>
                </div>
              </transition>
            </div>
          </td>
          <td class="td-title" align="right">标题：</td>
          <td class="inp">
            <el-input
              style="width: 230px;"
              v-model="params.activeName"
              clearable
            ></el-input>
          </td>
          <td align="left">
            <el-button @click="createDistribution()" type="success"
              >生成分销</el-button
            >
          </td>
        </tr>
      </table>

      <el-table
        border
        :data="dataTable"
        style="width: 100%;text-align: center;"
        max-width="900"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="150" prop="id" label="ID"> </el-table-column>
        <el-table-column
          width="200"
          show-overflow-tooltip
          prop="title"
          label="标题"
        >
        </el-table-column>
        <!--<el-table-column prop="range" label="使用范围">-->
        <!--</el-table-column>-->
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            {{ scope.row.start_time | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            {{ scope.row.end_time | formatDate }}
          </template>
        </el-table-column>
        <el-table-column width="140" label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
                        <el-button @click="deleteItem(scope.row.id)" size="mini" icon="el-icon-delete"></el-button> -->
            <el-button @click="toDetail(scope.row.id)" type="success"
              >分销详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="Paging">
        <div class="fl pil">删除</div>
        <div class="Paging_r">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :page-size="page_size"
            @current-change="handleCurrentChange"
            :total="page"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "groupbuy",
  data() {
    return {
      dataTable: [],
      status: ["全部", "开启", "关闭"],
      params: {
        activeName: "",
        activeStatus: "",
        page: 1
      },
      page_size: 0, //每页显示几个
      page: 0, //总页数
      currentPage: 1, //当前页
      isShowSize: false,
      times: "",
      colorHover: -1,
      timeSlotContent: "请选择时间段",
      ringSize: [
        { id: 1, AttrValueName: "2018年10月11日-2019年11月20日" },
        { id: 2, AttrValueName: "2018年11月12日-2019年12月20日" }
      ]
    };
  },
  created() {
      console.log(sessionStorage);
  },
  mounted() {
    this.getData();
    this.getTimeSolt();
  },
  methods: {
    to() {
      this.$router.push({
        name: "addSales",
        params: {
          status: 0
        }
      });
    },
    //格式化时间戳
    formatDate: function(value) {
      var date = new Date(value * 1000);
      var Y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (H < 10) {
        H = "0" + H;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (s < 10) {
        s = "0" + s;
      }
      var t = Y + "年" + m + "月" + d + "日";
      return t;
    },
    createDistribution() {
      // 生成分销
      if (this.times == "") {
        this.$message.error("请选择时间段");
        return;
      }
      this.$HTTP(this.$httpConfig.getDistributeInfo, {
        times: this.times,
        title: this.params.activeName
      })
        .then(res => {
          this.$message.success("成功生成");
          this.getData();
        })
        .catch(res => {
          this.$message.error(res.data.message);
        });
    },
    //实现点击显示下拉框
    clickSize(item) {
      this.isShowSize = !this.isShowSize;
    },
    // 获取下拉时间段
    getTimeSolt() {
      this.$HTTP(this.$httpConfig.getDistributePicture, {})
        .then(res => {
          this.ringSize = res.data.data;
        })
        .catch(res => {
          this.$message.error(res.data.message);
        });
    },
    //实现选取下拉值
    getSize(item) {
      this.isShowSize = !this.isShowSize;
      this.times = item.start_time + "," + item.end_time;
      this.timeSlotContent =
        this.formatDate(item.start_time) + "-" + this.formatDate(item.end_time);
      this.params.activeName = this.formatDate(item.start_time) + "记录";
    },
    // 鼠标移动上去改变背景颜色
    changeColor(index) {
      this.colorHover = index;
    },
    // 鼠标移除还原颜色
    reductionColor(index) {
      this.colorHover = -1;
    },
    /*页面跳转*/
    handleCurrentChange: function(currentPage) {
      // console.log(currentPage);
      this.currentPage = currentPage;
      this.getData();
    },
    // 跳转到分销详情
    toDetail(id) {
      this.$router.push({
        name: "distributiondetails",
        params: {
          id: Number(id),
        }
      });
    },
    getData() {
      this.params.page = this.currentPage;
      this.$HTTP(this.$httpConfig.getDataList, { page: this.params.page })
        .then(res => {
          this.dataTable = res.data.data.list;
          this.page_size = res.data.data.pageSize;
          this.page = Number(res.data.data.page * res.data.data.page_size);
          this.$message.success(res.data.message);
        })
        .catch(res => {
          this.$message.error(res.data.message);
        });
      // this.$$HTTP(this.$$httpConfig.memberDistribution,{times:"1421620581,1481620581",time:"2018年11月12日记录"}).then((res) => {

      // }).catch((res)=>{
      //     this.$message.error(res.data.message);
      // })
    },
    edit: function(value) {
      this.$router.push({
        name: "distributionNexus",
        params: {
          status: 1,
          id: value
        }
      });
    },
    deleteItem(value) {
      this.$confirm("此操作将永久删除此活动，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$HTTP(this.$httpConfig.delFullGift, { id: value })
            .then(res => {
              this.$message.success(res.data.message);
              this.getData();
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  }
};
</script>
<style type="text/css">
.classify {
  width: 1000px !important;
  padding-bottom: 80px;
}
.Commodity-management .el-input__inner {
  height: 29px;
  line-height: 29px;
  border-radius: 0;
  color: #999;
}
.Commodity-management .el-button {
  margin-left: 10px;
  height: 29px;
  padding: 0;
  width: 90px;
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 1px;
}
.shopManage {
  padding-bottom: 80px;
}
.logistics {
  padding-bottom: 80px;
}
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
.el-switch {
  padding: 0;
}
</style>
<style lang="less">
body {
  overflow: inherit;
}
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
      background: url(../../../../../../assets/plus2.jpg) no-repeat 15px #ff9f24;
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
      .select {
        width: 230px;
        display: flex;
        font-size: 0.19rem;
        color: #999;
        position: relative;
        font-size: 14px;
        .select-title {
          border: 1px solid #dcdfe6;
          display: inline-block;
          width: 100%;
          height: 29px;
          line-height: 29px;
          background: #ffff;
          padding-left: 5px;
          box-sizing: border-box;
        }
        .condition-list {
          position: absolute;
          left: 0;
          top: 29px;
          width: 230px;
          z-index: 200;
          border: 1px solid #dcdfe6;
          background: #fff;
          box-sizing: border-box;
          .size-wrap {
            .size {
              width: 230px;
              text-align: center;
              height: 29px;
              line-height: 29px;
            }
            .active {
              background: #0000ff;
              color: #fff;
            }
          }
        }
      }
      tr {
        .inp {
          width: 230px;
        }
        .td-title {
          width: 60px;
          font-weight: bold;
          color: #000;
        }
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
