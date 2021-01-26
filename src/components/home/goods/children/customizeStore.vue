<template>
  <div class="customize_store">
    <div class="g_att">
      <span class="att_details">商品详情</span>
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane label="通用信息">
          <div class="customize_details">
            <p>
              <span>*</span>商品名称：
              <el-input v-model="input"></el-input>
            </p>
            <p>请输入商品名,不能超过60个字符</p>
            <p>
              <span>*</span>商品分类：
              <el-select v-model="value" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="value1" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="value2" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </p>
            <p>数码印刷&nbsp;&nbsp;模板</p>
            <p>
              <span>*</span>模板: 
              <el-select v-model="value3" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </p>
            <p>制造尺寸</p>
            <p>
              <span>*</span>尺寸类型：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>纸箱尺寸：
              <el-input v-model="input" placeholder="长 cm"></el-input>
              <el-input v-model="input" placeholder="宽 cm"></el-input>
              <el-input v-model="input" placeholder="高 cm"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>非承压</p>
            <p>
              <span>*</span>物理特性：
              <el-input v-model="input" placeholder="内装重量 1<x<50 kg"></el-input>
              <el-input v-model="input" placeholder="仓储叠放 1<x<20 层"></el-input>
            </p>
            <p>正常</p>
            <p>
              <span>*</span>产品承压：
              <el-input class="el-input1" v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>一页成型</p>
            <p>
              <span>*</span>存储环境：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>成型方式：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>面纸类型：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>版面设定：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>开槽模切：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>印刷面积：
              <el-input class="el-input1" v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>数码表处：
              <el-input class="el-input1" v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>成箱方式：
              <el-input v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <p>
              <span>*</span>打包方式：
              <el-input class="el-input1" v-model="input"></el-input>
              <img src="../../../../assets/yi-19.png" />
            </p>
            <button class="next_step">确认提交</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品相册">aaaaaaaaaa</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "customizeStore",
  data() {
    return {
      activeName: 'first',
      input: '',
      options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }],
        value: '',
        value1: '',
        value2: '',
        value3: ''
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
}
</script>

<style lang="less">
.el-tabs__nav-scroll {
    padding-left: 200px;
}
.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    background: #EDEDED;
}
.el-tabs__item.is-active {
    color: #F7BC0A;
    background: #fff;
}
.el-tabs__item:hover {
    color: #F7BC0A;
    cursor: pointer;
}
</style>

<style lang="less" scoped>
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 26%;
    padding-left: 20px;
}
.el-input1 {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 18%;
    padding-left: 20px;
}
.el-select {
    display: inline-block;
    position: relative;
    padding-left: 20px;
    width: 26%;
}
.customize_store {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .att_details {
      color: #333;
      float: left;
      font-size: 16px;
      padding-top: 10px;
    }
    .customize_details {
      padding: 40px;
      p {
        font-size: 12px;
        color: #666666;
        line-height: 50px;
        span {
          color: #FF0000;
          padding-right: 5px;
        }
        img {
          width: 22px;
          height: 22px;
          margin: 14px 10px;
        }
      }
      p:nth-of-type(2) {
        color: #999999;
        padding-left: 94px;
        margin-top: -15px;
      }
      p:nth-of-type(4) {
        color: #999999;
        padding-left: 94px;
        margin-top: -15px;
      }
      p:nth-of-type(5) {
        padding-left: 34px;
      }
      p:nth-of-type(6) {
        color: #999999;
        padding-left: 94px;
        margin-top: -15px;
      }
      p:nth-of-type(9) {
        color: #999999;
        padding-left: 94px;
        margin-top: -15px;
      }
      p:nth-of-type(11) {
        color: #999999;
        padding-left: 94px;
        margin-top: -15px;
      }
      p:nth-of-type(13) {
        color: #999999;
        padding-left: 94px;
        margin-top: -15px;
      }
    }
    .next_step {
      margin: 60px 0 0 94px;
      padding: 12px 100px;
      background: #F7BC0A;
      border: none;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>