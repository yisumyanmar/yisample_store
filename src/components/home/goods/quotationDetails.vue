<template>
  <div class="commodity" v-loading="loading" style="width: 100%;height:100%;">
     <div v-title data-title="商品管理">商户-商品管理</div>
      <header-Top></header-Top>
      <div class="content clearfix">
        <div class="quotation_details">
          <div class="quo_head">
              <p class="commodity">商品 > 报价管理> 报价单详情</p>
          </div>
          <div class="bidder">
            <img src="../../../assets/background.png" />
            <p class="bidder_text">报价方</p>
            <div class="materials">
              <p class="materials_com">上海光泰包装材料有限公司</p>
              <div class="contact">
                <p>
                  联系人：胡鹏<br>
                  联系电话：15675999803<br>
                  与贵司累计成交金额：0 元
                </p>
                <p>
                  注册资本：150.0万元/人民币元<br>
                  与贵司累计报价次数：1次
                </p>
                <p>
                  主营行业：/<br>
                  与贵司累计成交单数：0单
                </p>
              </div>
            </div>
          </div>
          <div class="information">
            <div class="quo_in">
              <div class="text">
              <span class="quo_line"></span>
              <span class="quo_text">报价信息</span>
              </div>
              <p>报价状态：<span>已报价</span></p>
              <p>报价时间：<span>2020年10月12日 15:36:48</span></p>
              <p>报价类型：<span>协议价格（长期供货）</span></p>
              <p>价格有效期：<span>2020年10月15日 - 2020年10月18日（还剩6天）</span></p>
              <p>共<span>1 </span>行物料&nbsp;&nbsp;&nbsp;&nbsp;已报价<span>1 </span>行&nbsp;&nbsp;物料</p>
            </div>
            <div class="mat_in">
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
            <div class="packaging_paper">
              <p>1</p>
              <p>包装 纸类包装容器 纸盒</p>
              <p>0101BJ201612140125</p>
              <p>1000PCS</p>
              <p>50.000</p>
              <p><span>¥99.01</span>/PCS</p>
              <p><span>¥100.00</span>/PCS</p>
              <p><span>¥100.00</span>/PCS</p>
              <p>1%</p>
              <p>MARS1717X-MASTER-CARTON.pdf</p>
            </div>
            <div class="total">
              <p>产品总额：<span>¥100000.00 </span><span>（含运费：¥0.00）</span></p>
            </div>
            <div class="trading_information">
              <div class="info">
              <span class="info_line"></span>
              <span class="info_text">交易信息</span>
              </div>
              <p>交易方式：<span>担保交易</span></p>
              <p>备货周期：<span>7天</span></p>
              <p>交货期：<span>自下单后30天内交货至指定地点</span></p>
              <p>收货地：<span>浙江 宁波 宁波市海曙区</span></p>
              <p>税务发票：<span>提供增值税专用发票 （自行开票）</span></p>
              <p>附件：<span>MARS1717X-MASTER-CARTON.pdf</span></p>
              <p>补充说明：<span>技术方面请联系郑工，Tel：86-21-61651888-7767，邮箱：pengwei_zheng@tianma.cn</span></p>
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
    name:'quotationDetails',
    data (){
      return {
          loading:true,
      }
    },
    created(){
      setTimeout(() => {
          this.loading = false;
          }, 300);
    },
    methods:{
    },
    components: {
      headerTop,
      MerchantFoot,
    }
            
}
</script>

<style lang="less" scoped>
.commodity {
  position: relative;
  .content {
    width: 1266px;
    color: #a4a5a7;
    margin: 0 auto;
    overflow: hidden;
    background: #f1f1f1;
    padding-bottom: 80px;
    .quotation_details {
      padding: 20px 20px;
      .quo_head {
        padding-bottom: 20px;
        .commodity {
          font-size: 12px;
          color: #333;
        }
      }
      .bidder {
        height: 205px;
        padding: 0 20px;
        background: #fff;
        .bidder_text {
          font-size: 14px;
          color: #fff;
          margin: -30px 0 0 11px;
        }
        .materials {
          padding: 20px 30px;
          .materials_com {
            font-size: 14px;
            color: #496AB4;
            padding: 8px 0;
          }
          .contact {
            display: flex;
            p {
              width: 400px;
              font-size: 14px;
              color: #333;
              line-height: 30px;
            }
          }
        }
      }
      .information {
        background: #fff;
        margin-top: 20px;
        .quo_in {
          padding: 30px 20px 20px 20px;
          .text {
            padding-bottom: 10px;
            margin-bottom: 15px;
            border-bottom: 1px solid #f1f1f1;
            .quo_line {
              padding: 4px 8px;
              border-left: 5px solid #D02629;
            }
            .quo_text {
              font-size: 18px;
              color: #333;
            }
          }
          p {
            font-size: 14px;
            color: #333;
            line-height: 30px;
            span {
              padding-left: 10px;
            }
          }
          p:nth-of-type(5) {
            padding-top: 20px;
            span {
              color: #4494F9;
            }
          }
        }
        .mat_in {
          margin: 0 5px;
          padding: 25px;
          display: flex;
          border: 1px solid #DDDDDD;
          p {
            font-size: 13px;
            color: #000;
          }
          p:nth-of-type(2) {
            padding: 0 100px 0 45px;
          }
          p:nth-of-type(4) {
            padding: 0 25px 0 75px;
          }
          p:nth-of-type(6) {
            padding: 0 55px 0 25px;
          }
          p:nth-of-type(8) {
            padding: 0 40px 0 55px;
          }
          p:nth-of-type(10) {
            padding-left: 120px;
          }
        }
        .packaging_paper {
          margin:0 5px;
          padding: 25px;
          display: flex;
          border-left: 1px solid #DDDDDD;
          border-right: 1px solid #DDDDDD;
          border-bottom: 1px solid #DDDDDD;
          p {
            font-size: 13px;
            color: #000;
          }
          span {
            color: #D02629;
          }
          p:nth-of-type(2) {
            padding: 0 20px;
          }
          p:nth-of-type(4) {
            padding: 0 40px;
          }
          p:nth-of-type(6) {
            padding: 0 40px;
          }
          p:nth-of-type(8) {
            padding: 0 40px;
          }
          p:nth-of-type(10) {
            color: #496AB4;
            padding-left: 40px;
          }
        }
        .total {
          margin:0 5px;
          padding: 25px;
          border-left: 1px solid #DDDDDD;
          border-right: 1px solid #DDDDDD;
          border-bottom: 1px solid #DDDDDD;
          p {
            font-size: 13px;
            color: #000;
            padding-left: 880px;
            span:nth-of-type(1) {
              font-size: 18px;
              color: #D02629;
            }
            span:nth-of-type(2) {
              color: #999999;
            }
          }
        }
        .trading_information {
          padding: 40px 20px 60px 20px;
          .info {
            padding-bottom: 10px;
            margin-bottom: 15px;
            border-bottom: 1px solid #f1f1f1;
            .info_line {
              padding: 4px 8px;
              border-left: 5px solid #D02629;
            }
            .info_text {
              font-size: 18px;
              color: #333;
            }
          }
          p {
            font-size: 14px;
            color: #333;
            line-height: 30px;
            span {
              padding-left: 10px;
            }
          }
          p:nth-of-type(6) {
            span {
            color: #496AB4;
            }
          }
        }
      }
    }
  }
}
</style>