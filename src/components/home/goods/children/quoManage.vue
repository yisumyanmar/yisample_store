<template>
  <div class="quoManage">
    <div class="g_att">
      <h1 class="t_title">
        <span class="size16">已报价- 列表</span>
      </h1>
    </div>
    <div class="order_seek">
      <div class="crux clearfix">
        <div class="seek_l">
            <div>
                项目编号 ：
                <el-input
                    v-model="item"
                    clearable
                    style="width: 150px;height: 30px;"
                >
                </el-input>
            </div>
        </div>
        <div class="seek_l">
            <div>
                项目名称 ：
                <el-input
                    v-model="item"
                    clearable
                    style="width: 150px;height: 30px;"
                >
                </el-input>
            </div>
        </div>
        <div class="seek_l">
            <div>
                采购组织 ：
                <el-input
                    v-model="item"
                    clearable
                    style="width: 150px;height: 30px;"
                >
                </el-input>
            </div>
        </div>
      </div>
    </div>
    <div class="listWrapper">
      <h6>
        已报价列表
        <span>( 共 0 条记录 )</span>
      </h6>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          property="item_number"
          label="项目编号"
          width="160">
          <template slot-scope="scope">{{ scope.row.item_number }}</template>
        </el-table-column>
        <el-table-column
          property="project_name"
          label="项目名称"
          width="150">
        </el-table-column>
        <el-table-column
          property="bidder"
          label="报价方"
          width="180">
        </el-table-column>
        <el-table-column
          property="release_date"
          label="发布日期"
          width="110">
        </el-table-column>
        <el-table-column
          property="quotation_deadline"
          label="报价截止时间"
          width="170">
        </el-table-column>
        <el-table-column
          label="报价截止时间"
          width="173">
          <template>
            <el-button
                size="mini"
                >编辑
            </el-button>
            <el-button
                size="mini"
                >查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Paging">
        <div class="Paging_checkbox">
            <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="fl pil">删除</div>
        <div class="Paging_r">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
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
  name: "quoManage",
  data() {
    return {
      item: '',
      tableData: [{
          item_number: '0101BJ202009260743',
          project_name: '滤光片年度询比价',
          bidder: '上海光泰包装材料有限公司',
          release_date: '2020-09-26',
          quotation_deadline: '2020-09-27 10:00:00',
        }],
        multipleSelection: [],
        page: 1,
        currentPage: 1,
        page_size: 1,
        checked: false
    };
  },
  methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
      },
  }
}
</script>

<style lang="less">
.el-table th > .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 14px;
    padding-right: 14px;
    width: 100%;
}
.el-table thead {
    color: #333;
    font-weight: 500;
}
.el-table th, .el-table tr {
    background-color: #F9FAFA;
}
.el-table__row {
    background-color: #fff !important;
    height: 80px;
}
.el-table th > .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 14px;
    padding-right: 14px;
    width: 100%;
    color: #333;
}
.el-table_11_column_106 {
    color: #E9573E !important;
}
</style>

<style lang="less" scoped>
.el-table--fit {
    border-right: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
}
.has-gutter {
  background-color: #F9FAFA;
  color: #333;
}
.quoManage .listWrapper .Paging .Paging_checkbox[data-v-5b591b3e] {
    width: 5%;
    float: left;
    height: 50px;
    padding-top: 13px;
    padding-left: 14px;
}
.quoManage {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .t_title {
      color: #333;
      border-bottom: 1px solid #dddddd;
      overflow: hidden;
      margin-bottom: 15px;
      line-height: 50px;
      span {
        float: left;
        color: #333;
      }
    }
  }
  .order_seek {
    background-color: #f6f6f6;
    border: 1px solid #dddddd;
    margin-top: 15px;
    overflow: hidden;
    line-height: 70px;
    .crux {
      .seek_l {
        overflow: hidden;
        float: left;
        margin-left: 40px;
      }
      div:nth-child(1) {
        margin-left: 7px;
      }
    }
  }
  .listWrapper {
    h6 {
      border-bottom: 1px solid #e8e8e8;
      padding: 25px 0 10px 0;
      font-size: 16px;
      color: #333;
      span {
        font-size: 12px;
        color: #a4a5a7;
        margin-left: 6px;
      }
    }
    .Paging {
        width: 100%;
        height: 50px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        .Paging_checkbox {
            width: 5%;
            float: left;
            height: 50px;

            input {
                display: block;
                margin: auto;
                margin-top: 20px;
            }
        }

        .pil {
            border: 1px solid #e9573e;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 4px;
            background-color: #e9573e;
            float: left;
            margin: 10px 10px 10px 0;
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
  }
}
</style>