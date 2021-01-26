<template>
  <div class="commodity" v-loading="loading" style="width: 100%;height:100%;">
     <div v-title data-title="商品管理">商户-商品管理</div>
      <header-Top></header-Top>
      <div class="content clearfix">
        <div class="quotation_store">
          <div class="quo_head">
              <p class="commodity">商品 > 报价管理> 报价单><span>潍坊山水水泥有限公司夏被包装盒询价单</span></p>
          </div>
          <div class="quilt_box">
            <div class="inquirer">
            <p>询价方：中铁电气化铁路运营管理有限公司</p>
            <p>询价标题：<span>中铁电气化铁路运营管理有限公司呼和公司包头运营维管段</span></p>
            <p>收货地区：内蒙古 包头 固阳县 西斗铺镇内蒙古包头市固阳县西斗铺镇</p>
            </div>
            <p class="quo_information">报价信息 <span>报含税价 | 发票需要包含运费 | 报价需要包含运费 | 必须对询价单全部物料报价</span></p>
            <div class="total_search">
              <p>共 <span>3</span> 行物料</p>
              <el-input class="el-input1" placeholder="按照物料名称/编码快速查找" v-model="input" size="small">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="col_head">
              <p>行号</p>
              <p>物料信息</p>
              <p>项目编号</p>
              <p>最小起订量</p>
              <p>最小包装(必填)</p>
              <p>L/T(必填)</p>
              <p>未税单价</p>
              <p>未税小计(元)</p>
              <p>税率</p>
              <p>附件</p>
            </div>
            <div class="col_head1" v-for="i in 3" :key="i">
              <p>1</p>
              <p>包装<br>纸类包装容器<br>纸盒</p>
              <p>0101BJ202009260743</p>
              <p>
                <el-input v-model="input"></el-input><br>
                元/PCS
              </p>
              <p>
                <el-input v-model="input"></el-input>
              </p>
              <p>
                <el-input v-model="input"></el-input>
              </p>
              <p>
                <el-input v-model="input"></el-input>
              </p>
              <p>
                <el-input v-model="input"></el-input>
              </p>
              <p>
                <el-select v-model="value" placeholder="">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <p>上传</p>
            </div>
            <div class="total_price">
              <p class="price"><span>总计：</span><span>¥40000.00</span><span>（含运费：0.00）</span></p>
            </div>
            <div class="trading_information">
              <h1 class="information">交易信息</h1>
              <p>交易方式：<span>担保交易</span></p>
              <p>支付方式：<span>支付宝、微信</span></p>
              <p>税务发票类型：
                <el-radio v-model="radio" label="1">增值税普通发票</el-radio>
                <el-radio v-model="radio" label="2">增值税专票(一般纳税人开具)</el-radio>
              </p>
            </div>
            <div class="other_instruction">
              <h1 class="instruction">其他说明</h1>
              <p>价格有效期：
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    align="right"
                    start-placeholder="起始日期"
                    end-placeholder="结束日期"
                    default-value="2020-12-01">
                  </el-date-picker>
                  <span>（注意：采购商在价格有效期内才可以下单订购）</span>
              </p>
              <p>报价类型：&nbsp;&nbsp;&nbsp;&nbsp;<span>长期供货（价格协议）</span></p>
              <p>生产/备货周期：
                <el-input  class="el-input2" v-model="input"></el-input>
                <span>天</span>
              </p>
              <p>交货期：<span>自下单后</span>
                <el-input  class="el-input2" v-model="input"></el-input>
                <span>天内交货至指定地点</span>
              </p>
              <p>补充说明：
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="Please input"
                  v-model="textarea">
                </el-input>
              </p>
              <p>报价方：&nbsp;&nbsp;&nbsp;&nbsp;<span>上海光泰包装材料有限公司</span></p>
              <p>联系方式：&nbsp;<span>1567599803</span></p>
              <p>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange">
                  <el-button type="primary">
                    <i class="el-icon-plus"></i>添加附件
                  </el-button>
                  <span>产品规格书、样品图等（支持.doc .docx .xls .xlsx .ppt .pptx .pdf .txt .gif .jpg .png .bmp .dwg等格式）</span>
                </el-upload>
              </p>
            </div>
            <div class="inquiry_foot">
                <el-checkbox v-model="checked"></el-checkbox>
                <span>我已阅读并同意<a>《定制服务系统运营商城服务协议（供应商版）》</a></span>
            </div>
            <div class="inquiry_foot">
                <button>发表报价单</button>
            </div>
          </div>
        </div>
      </div>
      <Merchant-Foot></Merchant-Foot>
  </div>
</template>
<script>
import headerTop from '@/components/header/top'; //头部
import MerchantFoot from '@/components/foot/foot'; //脚部
export default {
    name:'quotationStore',
    data (){
      return {
          loading:true,
          input: '',
          options: [{
            value: 'Option1',
            label: 'Option1'
          }, {
            value: 'Option2',
            label: 'Option2'
          }],
          value: '',
          radio: '1',
          value1: '',
          textarea: '',
          checked: true
      }
    },
    created(){
      setTimeout(() => {
          this.loading = false;
          }, 300);
    },
    methods:{
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }
    },
    components: {
      headerTop,
      MerchantFoot,
    }
            
}
</script>

<style lang="less">
.el-upload__input {
  display: none !important;
}
</style>

<style lang="less" scoped>
.el-input-group {
    line-height: normal;
    display: inline-table;
    width: 22%;
    border-collapse: separate;
    border-spacing: 0;
}
.el-input1 {
  width: 22% !important;
}
.el-input {
    width: 80px;
}
.el-select {
    width: 80px;
}
.el-radio {
    color: #333;
    cursor: pointer;
    margin-right: 50px;
}
.el-input2 {
  width: 15% !important;
}
.el-textarea {
    position: relative;
    display: inline-block;
    width: 60%;
    vertical-align: bottom;
    font-size: 14px;
}
.el-icon-plus {
    padding-right: 10px;
}
   .commodity {
       position: relative;
      .content {
          width: 1266px;
        color: #a4a5a7;
        margin: 0 auto;
        overflow: hidden;
        background: #f1f1f1;
        padding-bottom: 80px;
        .quotation_store {
          padding: 20px 20px;
          .quo_head {
              padding-bottom: 20px;
              .commodity {
                  font-size: 12px;
                  color: #333;
                  span {
                      color: #D02629;
                  }
              }
          }
          .quilt_box {
            width: 1187px;
            background: #fff;
            padding: 20px;
            .inquirer {
              padding-bottom: 10px;
              p {
                font-size: 14px;
                color: #333;
                line-height: 40px;
              }
              p:nth-of-type(2) {
                float: right;
                margin-top: -40px;
                span {
                  color: #1A6DF8;
                }
              }
            }
            .quo_information {
              font-size: 24px;
              color: #1A6DF8;
              padding: 20px 0;
              span {
                font-size: 14px;
                color: #666;
              }
            }
            .total_search {
              padding: 10px 0;
              display: flex;
              p {
                  font-size: 14px;
                  color: #464746;
                  padding-top: 5px;
                  span {
                    color: #1A6DF8;
                  }
              }
              p:nth-of-type(1) {
                  padding-right: 20px;
              }
            }
            .col_head {
                    padding: 20px;
                    background: #F8F8F8;
                    display: flex;
                    margin-top: 20px;
                    p {
                        color: #000;
                        font-size: 13px;
                    }
                    p:nth-of-type(2) {
                        padding: 0 60px;
                    }
                    p:nth-of-type(4) {
                        padding: 0 46px 0 140px;
                    }
                    p:nth-of-type(6) {
                        padding: 0 66px 0 49px;
                    }
                    p:nth-of-type(8) {
                        padding: 0 68px 0 58px;
                    }
                    p:nth-of-type(10) {
                        padding-left: 72px;
                    }
                }
                .col_head1 {
                  padding: 20px;
                  display: flex;
                  border-bottom: 1px solid #EEEEEE;
                  p {
                      color: #333;
                      font-size: 13px;
                      line-height: 25px;
                  }
                  p:nth-of-type(2) {
                      padding: 0 37px 0 75px;
                  }
                  p:nth-of-type(4) {
                      padding: 0 40px 0 53px;
                  }
                  p:nth-of-type(6) {
                      padding: 0 40px;
                  }
                  p:nth-of-type(8) {
                      padding: 0 40px;
                  }
                  p:nth-of-type(10) {
                      height: 30px;
                      margin-left: 25px;
                      background: #01B4EE;
                      color: #fff;
                      border-radius: 3px;
                      padding: 5px 15px;
                  }
              }
              .total_price {
                padding: 20px 0;
                .price {
                  float: right;
                  span:nth-of-type(1) {
                    font-size: 14px;
                    color: #D02629;
                  }
                  span:nth-of-type(2) {
                    font-size: 18px;
                    color: #D02629;
                  }
                  span:nth-of-type(3) {
                    font-size: 14px;
                    color: #333333;
                  }
                }
              }
              .trading_information {
                padding: 20px 0;
                .information {
                  font-size: 24px;
                  color: #1A6DF8;
                  padding-bottom: 20px;
                }
                p {
                  font-size: 14px;
                  color: #333;
                  padding: 30px 0 0 40px;
                }
              }
              .other_instruction {
                padding: 20px 0 30px 0;
                .instruction {
                  font-size: 24px;
                  color: #1A6DF8;
                  padding-bottom: 20px;
                }
                p {
                  font-size: 14px;
                  color: #333;
                  padding: 30px 0 0 40px;
                }
                p:nth-of-type(1) {
                  span {
                    padding-left: 10px;
                  }
                }
                 p:nth-of-type(3) {
                  span {
                    padding-left: 10px;
                  }
                }
                p:nth-of-type(4) {
                  span:nth-of-type(1) {
                    padding-right: 10px;
                  }
                  span:nth-of-type(2) {
                    padding-left: 10px;
                  }
                }
                p:nth-of-type(8) {
                  padding-left: 115px;
                  span {
                    color: #666666;
                    padding-left: 10px;
                  }
                }
              }
              .inquiry_foot {
                padding: 10px 115px;
                span {
                    font-size: 14px;
                    margin-left: 20px;
                    color: #333;
                    a {
                        color: #1A6DF7;
                    }
                }
                button {
                    background: #D02629;
                    color: #fff;
                    font-size: 14px;
                    width: 100px;
                    height: 38px;
                    border-radius: 3px;
                    border: none;
                }
            }
          }
        }
      }
   }
</style>