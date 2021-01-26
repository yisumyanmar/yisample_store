<template>
  <div class="releaseProduct">
    <div class="g_att">
      <h1 class="t_title">
        <span class="size16">商品类型选择</span>
      </h1>
    </div>
    <div class="release_radio">
      <el-radio v-model="radio" label="1">定制商品</el-radio>
      <el-radio v-model="radio" label="2">定制商品</el-radio>
    </div>
    <button class="next_step">下一步</button>
  </div>
</template>
<script>
export default {
  name: "releaseProduct",
  data() {
    return {
      radio: '1'
    };
  },
}
</script>

<style lang="less" scoped>
.releaseProduct {
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
  .release_radio {
    padding: 60px;
  }
  .next_step {
    margin-left: 60px;
    padding: 12px 100px;
    background: #F7BC0A;
    border: none;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
  }
}
</style>