<template>
  <div class="customize_order">
    <div class="g_att">
      <h1 class="t_title">
        <span class="size16">定制商品价格设置</span>
      </h1>
    </div>
    <div class="custom_pump">
      <p>定制水泵彩箱</p>
      <p><span>一级分类</span><span>二级分类</span><span>三级分类</span></p>
      <p>数码印刷&nbsp;&nbsp;模板</p>
      <p>制造尺寸</p>
      <p>长 10 cm 宽 20cm 高 30 cm ：<el-input v-model="input"></el-input>元</p>
      <p>长 50 cm 宽 20cm 高 30 cm ：<el-input v-model="input"></el-input>元</p>
      <p>内装重量30kg 内装重量 18层：<el-input v-model="input"></el-input>元</p>
      <p>30%&nbsp;&nbsp;承压：<el-input v-model="input"></el-input>元</p>
      <p>存储环境：<span>正常</span></p>
      <p>一页成型：<el-input v-model="input"></el-input>元</p>
      <p>牛皮纸：<el-input class="el-input1" v-model="input"></el-input>元</p>
      <p>涂布纸: <el-input v-model="input"></el-input>元</p>
      <p>AA：<el-input class="el-input1" v-model="input"></el-input>元</p>
      <p>AB：<el-input v-model="input"></el-input>元</p>
      <p>开槽：<el-input class="el-input2" v-model="input"></el-input>元</p>
      <p>31%-50%：<el-input v-model="input"></el-input>元</p>
      <p>水性光油：<el-input v-model="input"></el-input>元</p>
      <p>钉箱: <el-input class="el-input2" v-model="input"></el-input>元</p>
      <p>绳捆打包：<el-input v-model="input"></el-input>元</p>
    </div>
    <button class="next_step">下一步</button>
  </div>
</template>
<script>
export default {
  name: "customizeOrder",
  data() {
    return {
      input: ''
    };
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.el-input {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 20%;
    padding: 0 10px;
}
.el-input1 {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 51%;
    padding: 0 10px;
}
.el-input2 {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 20.6%;
    padding: 0 10px;
}
.customize_order {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .t_title {
      color: #333;
      border-bottom: 1px solid #dddddd;
      overflow: hidden;
      line-height: 50px;
      span {
        float: left;
        color: #333;
      }
    }
  }
  .custom_pump {
    padding: 40px;
    p {
      font-size: 12px;
      color: #333;
      line-height: 50px;
    }
    p:nth-of-type(2) {
      span {
        padding-right: 40px;
      }
    }
    p:nth-of-type(9) {
      span {
        padding-left: 17px;
      }
    }
    p:nth-of-type(10) {
      padding-left: 7px;
    }
    p:nth-of-type(11) {
      width: 360px;
      float: left;
      padding-left: 19px;
    }
    p:nth-of-type(13) {
      width: 356px;
      float: left;
      padding-left: 39px;
    }
    p:nth-of-type(15) {
      padding-left: 31px;
    }
    p:nth-of-type(17) {
      padding-left: 6px;
    }
    p:nth-of-type(18) {
      padding-left: 36px;
    }
    p:nth-of-type(19) {
      padding-left: 6px;
    }
  }
  .next_step {
    margin-left: 115px;
    padding: 12px 100px;
    background: #F7BC0A;
    border: none;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
  }
}
</style>