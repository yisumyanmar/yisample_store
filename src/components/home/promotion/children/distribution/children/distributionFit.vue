<template>
  <div class="logistics fl">
    <!-- 分销设置 -->
    <div class="t_tab">
      <h1 class="t_title">
        <span class="size16">分销设置</span>
      </h1>
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        class="logistics_x"
      >
        <tr>
          <td width="12%" align="right" class="black">分销开关：</td>
          <td width="10%">
            <el-switch
              v-model="value"
              active-text="开启"
              inactive-text="关闭"
              active-color="#f7bc0a"
            >
            </el-switch>
          </td>
          <td width="200">&nbsp;</td>
        </tr>

        <tr>
          <td align="right" class="black">一级分销比例：</td>
          <td>
            <input
              type="text"
              v-model="value1"
              placeholder="请输入一级分销比例"
            />
          </td>
          <td align="left"><span class="notes">单位 : %</span></td>
        </tr>
        <tr>
          <td align="right" class="black">二级分销比例：</td>
          <td>
            <input
              type="text"
              v-model="value2"
              placeholder="请输入二级分销比例"
            />
          </td>
          <td align="left"><span class="notes">单位 : %</span></td>
        </tr>
        <tr>
          <td align="right" class="black">三级分销比例：</td>
          <td>
            <input
              type="text"
              v-model="value3"
              placeholder="请输入三级分销比例"
            />
          </td>
          <td align="left"><span class="notes">单位 : %</span></td>
        </tr>
        <tr>
          <td align="right" class="black">四级分销比例：</td>
          <td>
            <input
              type="text"
              v-model="value4"
              placeholder="请输入四级分销比例"
            />
          </td>
          <td align="left"><span class="notes">单位 : %</span></td>
        </tr>
        <tr>
          <td align="right" class="black">五级分销比例：</td>
          <td>
            <input
              type="text"
              v-model="value5"
              placeholder="请输入五级分销比例"
            />
          </td>
          <td align="left"><span class="notes">单位 : %</span></td>
        </tr>
        <!--<tr>-->
        <!--<td align="right" class="black"> 三级分销商比例：</td>-->
        <!--<td><input type="text" value="70"></td>-->
        <!--<td align="left"><span class="notes">单位 : %</span></td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td align="right" class="black"> 分成时间：</td>-->
        <!--<td><input type="text" value="20"></td>-->
        <!--<td align="left"><span class="notes">订单收货确认后多少天可以分成</span></td>-->
        <!--</tr>-->
        <tr>
          <td align="right">&nbsp;</td>
          <td>
            <span
              @click="setMemberConfig()"
              class="Settled"
              style="background:#f7bc0a; width:199px;"
              >确认提交</span
            >
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  // name:'freightTemplet',
  data() {
    return {
      value: false,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: ""
    };
  },
  created() {
    this.getMemberConfig();
  },
  methods: {
    setMemberConfig() {
      //设置分销
      if (this.value1 == "") {
        this.$message.error("请输入一级分销比例");
        return;
      }
      if (this.value2 == "") {
        this.$message.error("请输入二级分销比例");
        return;
      }
      if (this.value3 == "") {
        this.$message.error("请输入三级分销比例");
        return;
      }
      if (this.value4 == "") {
        this.$message.error("请输入四级分销比例");
        return;
      }
      if (this.value5 == "") {
        this.$message.error("请输入五级分销比例");
        return;
      }
      var data = {
        is_open: this.value ? 1 : 0,
        royalty_one: Number(this.value1),
        royalty_two: Number(this.value2),
        royalty_three: Number(this.value3),
        royalty_four: Number(this.value4),
        royalty_five: Number(this.value5)
      };
      this.$HTTP(this.$httpConfig.setMemberConfig, data)
        .then(res => {
          this.$message.success(res.data.message);
        //   this.getMemberConfig();
        })
        .catch(res => {
          this.$message.error(res.data.message);
        });
    },
    getMemberConfig() {
      // 获取分销
      this.$HTTP(this.$httpConfig.getMemberConfig, {}, "post")
        .then(res => {
          this.value = res.data.data.is_open == 1 ? true : false;
          this.value1 = res.data.data.royalty_one;
          this.value2 = res.data.data.royalty_two;
          this.value3 = res.data.data.royalty_three;
          this.value4 = res.data.data.royalty_four;
          this.value5 = res.data.data.royalty_five;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
.t_tab {
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
.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label {
    color: #a4a5a7;
  }
  .el-switch__label.is-active {
    color: #f7bc0a;
  }
  .el-switch__label span {
    line-height: 20px;
    font-size: 12px;
  }
}
</style>
<style lang="less" scoped>
.logistics {
  width: 1000px;
  .Commodity-management {
    background-color: #f6f6f6;
    border: 1px solid #dddddd;
    margin-top: 15px;
    line-height: 50px;
    margin-bottom: 20px;
    input {
      width: 140px;
      border: 1px solid #ddd;
      line-height: 29px;
      height: 29px;
      color: #999;
      text-indent: 5px;
    }
  }
  .bold {
    font-weight: bold;
  }
  .black {
    color: #333;
  }
  .logistics_x {
    tr {
      td {
        padding: 10px 0;
        .ss {
          margin: 0;
        }
        .notes {
          padding-left: 15px;
        }
        input,
        select {
          padding-left: 5px;
          width: 288px;
          height: 32px;
          border: 1px solid #cccccc;
        }
        .Settled {
          height: 32px;
          line-height: 32px;
          color: #fff;
          text-align: center;
          display: block;
          border-radius: 6px;
          margin-top: 20px;
          float: left;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<!--<style lang="less" scoped>-->
<!--.classify {-->
<!--width: 1000px;-->
<!--padding-bottom: 80px;-->
<!--.g_att {-->
<!--.page {-->
<!--overflow: hidden;-->
<!--padding-top: 20px;-->
<!--}-->
<!--}-->
<!--}-->
<!--</style>-->
