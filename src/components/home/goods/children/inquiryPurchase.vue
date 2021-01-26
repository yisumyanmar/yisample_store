<template>
  <div class="inquiry">
    <div class="g_att">
      <h1 class="t_title">
        <span class="size16">询价采购</span>
      </h1>
    </div>
    <div class="carton">
      <span class="carton_text">纸箱包装</span>
      <div class="t_add fr">查看更多></div>

      <div class="recom_body" v-for="i in 3" :key="i">
        <div class="recom_box">
            <p class="box_paper">纸类包装</p>
            <p class="box_title">中电二公司十五分公司珠海景旺项目净化设备询价单</p>
            <p class="box_body">纸盒定制、智能定制、关键字</p>
            <div class="purchase">
                <p>采购数量：</p>
                <p>1 批</p>
            </div>
            <div class="purchase">
                <p>已有报价</p>
                <p>* 条</p>
            </div>
            <div class="map">
                <img class="map_img" src="../../../../assets/map.png" />
                <p>江苏无锡</p>
                <img class="clock_img" src="../../../../assets/yi-clock.png" />
                <p>不足<span> 1 </span>小时</p>
            </div>
            <p class="com">中铁七局集团有限公司</p>
            <div class="foot">
                <p class="heart_div">
                    <img class="heart" src="../../../../assets/yi-heart.png" />
                </p>
                <button class="quote_button">立即报价</button>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "inquiryPurchase",
  data() {
    return {

    };
  },
}
</script>

<style lang="less" scoped>
.inquiry {
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
  .carton {
    .carton_text {
      font-size: 16px;
      color: #333333;
    }
    .t_add {
      font-size: 14px;
      cursor: pointer;
      color: #999999;
    }
    .recom_body {
      .recom_box {
        background: #F6F6F6;
        width: 220px;
        height: 365px;
        float: left;
        margin: 20px 70px 20px 0;
        padding: 20px;
        .box_paper {
            width: 50px;
            height: 20px;
            background: #F0F0F0;
            color: #D02629;
            padding: 6px 25px;
            cursor: pointer;
        }
        .box_title {
            font-size: 14px;
            color: #333333;
            padding: 10px 0 20px 0;
        }
        .box_body {
            width: 220px;
            height: 20px;
            background: #F0F0F0;
            padding: 5px 0 3px 18px;
            color: #999999;
            margin-left: -10px;
        }
        .purchase {
            padding: 15px 0;
            p {
                color: #666666;
            }
            p:nth-of-type(1) {
                float: left;
            }
            p:nth-of-type(2) {
                float: right;
            }
        }
        .map {
            padding: 30px 0 20px 0;
            display: flex;
            width: 220px;
            border-bottom: 3px dotted #E9EEF3;
            .map_img {
                width: 15px;
                height: 15px;
                background-size: 100% 100%;
                margin-top: 4px;
            }
            .clock_img {
                width: 15px;
                height: 15px;
                background-size: 100% 100%;
                margin-top: 4px;
            }
            p {
                color: #666666;
            }
            span {
                color: #D33D3D;
            }
            p:nth-of-type(1) {
                padding: 0 40px 0 10px;
            }
            p:nth-of-type(2) {
                padding-left: 10px;
            }
        }
        .com {
            color: #666666;
            text-align: center;
            padding: 20px 0;
        }
        .foot {
            display: flex;
            .heart_div {
                background: #F0F0F0;
                width: 55px;
                height: 35px;
                border-radius: 5px;
                .heart {
                    width: 22px;
                    height: 22px;
                    background-size: 100% 100%;
                    position: relative;
                    margin: 8px 16px;
                }
            }
            .quote_button {
                color: #ffffff;
                border: none;
                background: #D02629;
                border-radius: 3px;
                padding: 0 50px;
                margin-left: 10px;
            }
        }
      }
    }
  }
}
</style>