<template>
  <div class="z_index" v-loading="loading" style="width: 100%;height:100%;">
    <!-- 内容 -->
    <div class="content">
      <div class="detail distributiondetails">
        <div class="title">分销详情</div>
        <el-table :data="tableData" border style="width: 93%;margin:15px auto">
          <el-table-column fixed prop="id" label="ID" width="100">
          </el-table-column>
          <el-table-column prop="user_name" label="用户名" width="220">
          </el-table-column>
          <el-table-column prop="cash" label="提成总金额" width="220">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="btns">
                <!-- <div @click="detail()" class="detail-btn">详情</div> -->
                <el-popover placement="top" width="650" trigger="click">
                  <el-table :data="gridData">
                    <el-table-column
                      width="50"
                      property="puser_id"
                      label="ID"
                    ></el-table-column>
                    <el-table-column
                      width="150"
                      property="user_name"
                      label="用户名"
                    ></el-table-column>
                    <el-table-column
                      width="150"
                      property="puser_name"
                      label="被提成用户名"
                    ></el-table-column>
                    <el-table-column
                      width="150"
                      property="cash"
                      label="提成金额"
                    ></el-table-column>
                    <el-table-column
                      width="150"
                      property="remark"
                      label="备注"
                    ></el-table-column>
                  </el-table>
                  <el-button
                    @click="getDetail(scope.row)"
                    style="background:#327ab5;color:#fff"
                    slot="reference"
                    >详情</el-button
                  >
                </el-popover>
                <el-button
                  @click="makeMoney(scope.row.id)"
                  :class="scope.row.status == 1 ? 'active' : ''"
                  :disabled="scope.row.status == 1 ? true : false"
                  style="color:#fff;margin-left:5px;"
                  >{{ scope.row.status == 1 ? "已打款" : "打款" }}</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/header/top";
import MerchantFoot from "@/components/foot/foot";
export default {
  name: "distributiondetails",
  data() {
    return {
      loading: true,
      tableData: [],
      gridData: [],
      user_id:''
    };
  },
  created() {
    //获取分销详情
    this.getMemberDetail();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    getDetail(row) {
      this.$HTTP(
        this.$httpConfig.getDataListDetails,
        { t_id: row.t_id, user_id: row.user_id },
        "post"
      )
        .then(res => {
          this.gridData = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    getMemberDetail() {
      this.$HTTP(
        this.$httpConfig.getDataListInner,
        { id: this.$route.params.id},
        "post"
      )
        .then(res => {
          this.$message.success(res.data.message);
          this.tableData = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    makeMoney(id) {
      this.$HTTP(this.$httpConfig.makeMoney, { id: id }, "post")
        .then(res => {
          this.$message.success(res.data.message);
          this.getMemberDetail();
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  components: {
    headerTop,
    MerchantFoot
  }
};
</script>
<style lang="less" scoped>
body {
  overflow: inherit;
}
.z_index {
  .content {
    width: 100%;
    color: #a4a5a7;
    margin: 0 auto;
    overflow: hidden;
    .distributiondetails {
      .el-button {
        background: #54c3de;
      }
      .active {
        background: #ff0000;
      }
    }
    .btns {
      display: flex;
      align-items: center;
      > div {
        padding: 8px 15px;
        color: #fff;
        background: #59c0e1;
        margin-left: 15px;
        border-radius: 5px;
      }
      .detail-btn {
        background: #307cba;
      }
    }
    .detail {
      width: 100%;
      border: 1px solid #dedede;
      box-sizing: border-box;
      .title {
        text-align: center;
        padding: 10px 0;
        background: #f5f5f5;
        width: 100%;
        font-size: 14px;
      }
    }
  }
}
</style>
