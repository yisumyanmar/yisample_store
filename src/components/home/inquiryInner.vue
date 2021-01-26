<template>
    <div class="z_index" v-loading="loading" style="width: 100%;height:100%;">
        <div v-title data-title="商户中心">商户中心</div>
         <header-Top></header-Top>
         <div class="content clearfix">
             <div class="inquiryInner">
                 <div class="inq_head">
                     <p class="commodity">商品 > 询价采购 > <span>潍坊山水水泥有限公司夏被包装盒询价单</span></p>
                 </div>
                 <div class="quilt_box">
                     <span class="com_name">潍坊山水水泥有限公司夏被包装盒询价单</span>
                     <div class="frig">
                     <i class="el-icon-star-on"></i>
                     <p class="favourite">收藏</p>
                     </div>
                     <p class="paper">纸类包装</p>
                     <div class="inquiry_no">
                         <p class="inq_deadline">
                             询价单编号：356118380947<br>
                             报价截止日期：2020年10月01日 10:00<br>
                             采购类型：价格协议(长期采购)<br>
                             联系人：付费后可见
                         </p>
                         <p class="inq_time">
                             询价单编号：356118380947<br>
                             报价截止日期：2020年10月01日 10:00<br>
                             采购类型：价格协议(长期采购)<br>
                             联系人：付费后可见
                         </p>
                         <div class="card_box" v-show="cardBox">
                             <div class="box_head">
                                 <div class="time_box">
                                     <p class="box_hour">23</p>
                                     <span>时</span>
                                     <p class="box_hour">30</p>
                                     <span>分</span>
                                 </div>
                                 <p class="paid_quote" @click="popupBox">付费报价</p>
                             </div>
                             <div class="time_remain">
                                 <p class="remain">报价结束剩余时间</p>
                                 <p class="quote">报价收费：￥10.00</p>
                             </div>
                             <p class="paid_inq">该询价单为付费询价单</p>
                         </div>
                         <div class="card_box1" v-show="cardBox1">
                             <div class="box_head1">
                                 <div class="time_box1">
                                     <img class="face" src="../../assets/face.png" />
                                 </div>
                                 <p class="paid_quote1" @click="popupBox">付费报价</p>
                             </div>
                             <div class="time_remain1">
                                 <p class="quote1">报价收费：￥10.00</p>
                             </div>
                             <p class="paid_inq1"> 报价已结束</p>
                         </div>
                     </div>
                 </div>

                 <div class="req_supplier l">
                     <p class="supplier_name">对供应商要求</p>
                     <div class="supplier_body">
                         <p class="quo_req">报价要求</p>
                         <div class="tax_include">
                             <p>需要报含税价</p>
                             <p>发票需要包含运费</p>
                             <p>报价需要包含运费</p>
                             <p>不允许对询价单部分物料报价</p>
                         </div>
                         <div class="place_rec">
                             <div class="rec_box">
                                 <p>收货地</p>
                                 <p>山东 潍坊 潍坊市潍城区 于河街道符山镇潍坊山水水泥有限公司</p>
                                 <p>交易方式</p>
                                 <p>账期支付（确认收货后60天内结算）</p>
                             </div>
                             <div class="rec_box1">
                                 <p>发票要求</p>
                                 <p>增值税专用发票（一般纳税人开具）</p>
                                 <p>支付方式</p>
                                 <p>网商银行融易收（对公转账）</p>
                             </div>
                         </div>
                     </div>
                     <div class="sup_desc">
                         <p>补充说明描述</p>
                         <p>请供应商报价前认真核实询价单中的账期、付款方式、付款条件等信息，一旦报价则默认为接受该询价单所有条款。</p>
                         <p>为保证产品质量，报价同时必须提供样品邮寄到我公司。样品质量合格后，由我公司选择图案。</p>
                         <p>中标者需与我公司签订纸质合同。</p>
                         <div class="desc_foot">
                             <div class="desc_box">
                                 <img src="../../assets/yi-store.png" />
                                 <p>夏被包装盒样品1.jpg</p>
                             </div>
                             <div class="desc_box">
                                 <img src="../../assets/yi-store.png" />
                                 <p>夏被包装盒样品1.jpg</p>
                             </div>
                             <div class="desc_box">
                                 <img src="../../assets/yi-store.png" />
                                 <p>夏被包装盒样品1.jpg</p>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="com_supplier r">
                     <p class="sup_name">山东山水水泥集团有限公司</p>
                     <div class="online_pur">
                         <p>线上采购金额</p>
                         <p>6,151.22<span>万元</span></p>
                         <p>累计询价<span>12174 单</span></p>
                         <p>在线采购次数<span>1614 单</span></p>
                     </div>
                 </div>
                 <div class="buyer r">该买家还在采购</div>
                 <div class="recom_box r">
                    <p class="box_paper">纸类包装</p>
                    <p class="box_title">中铁十七局集团铺架分公司京沈项目V型轨距挡块询价单</p>
                    <div class="purchase">
                        <p>采购数量：</p>
                        <p>5 种</p>
                    </div>
                    <div class="purchase">
                        <p>已有报价：</p>
                        <p>4 条</p>
                    </div>
                    <div class="map">
                        <img class="clock_img" src="../../assets/yi-clock.png" />
                        <p>剩余<span> 3 </span>天</p>
                    </div>
                    <p class="com">中铁七局集团有限公司</p>
                </div>
                 <div class="total_inq l">
                     <div class="total_search">
                         <p>共 1 个询价物料</p>
                         <el-input placeholder="按照物料名称/编码快速查找" v-model="input" size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <p>复制物料</p>
                     </div>
                     <div class="col_head">
                         <p>行号</p>
                         <p>物料编码</p>
                         <p>物料名称</p>
                         <p>品牌/型号</p>
                         <p>采购量</p>
                         <p>附言及附件</p>
                     </div>
                     <div class="col_head1">
                         <p>1</p>
                         <p>— —</p>
                         <p>夏被包装盒</p>
                         <p>型号：<br>48mm*16mm*38mm</p>
                         <p>625个</p>
                         <p>查看详情</p>
                     </div>
                     <p class="materital_desc">物料描述：纸盒，见附件样品图，尺寸可略大，图案可选择</p>
                 </div>
                 <div class="recom_box r">
                    <p class="box_paper">纸类包装</p>
                    <p class="box_title">中铁十七局集团铺架分公司京沈项目V型轨距挡块询价单</p>
                    <div class="purchase">
                        <p>采购数量：</p>
                        <p>5 种</p>
                    </div>
                    <div class="purchase">
                        <p>已有报价：</p>
                        <p>4 条</p>
                    </div>
                    <div class="map">
                        <img class="clock_img" src="../../assets/yi-clock.png" />
                        <p>剩余<span> 3 </span>天</p>
                    </div>
                    <p class="com">中铁七局集团有限公司</p>
                </div>
                 <div class="ref_quo l">
                     <p>参考报价</p>
                     <p>买家公开：已有2家报价</p>
                 </div>
                 <div class="recom_box r">
                    <p class="box_paper">纸类包装</p>
                    <p class="box_title">中铁十七局集团铺架分公司京沈项目V型轨距挡块询价单</p>
                    <div class="purchase">
                        <p>采购数量：</p>
                        <p>5 种</p>
                    </div>
                    <div class="purchase">
                        <p>已有报价：</p>
                        <p>4 条</p>
                    </div>
                    <div class="map">
                        <img class="clock_img" src="../../assets/yi-clock.png" />
                        <p>剩余<span> 3 </span>天</p>
                    </div>
                    <p class="com">中铁七局集团有限公司</p>
                </div>
             </div>

             <div class="pop_visible" v-show="visible">
                <div class="post_inquiry">
                    <div class="inquiry_head">
                        <p>报价收费说明</p>
                        <i @click="close" class="el-icon-close"></i>
                    </div>
                    <div class="inquiry_body">
                        <img src="../../assets/yi-20.png" />
                        <span>尊敬的客户：</span>
                    </div>
                    <div class="body_letter">
                        <p>
                            这里是收费说明 ，具体规则还在制定当中<br>
                            规则郑重提醒：请供应商仔细阅读询价单详情后（上文和下文），严谨报价，乱报价者我们会向阿里里巴巴举报，<br>
                            且拉入供应商黑名单，谢谢合作！
                        </p>
                        <p>1、报价要求：﻿报价有效期内供应商可多次报价，以最后一次确认报价为准，交易确认后卖方不能以任何理由提出涨价要求。﻿</p>
                        <p>2、买方收到货进行现场验收合格并且要收到卖家的有效发票后，才按约定的方式最终确认货款支付。</p>
                        <p>3、随货资料务必齐全，包括不限于营业执照、合格证、质保书、检测报告等，一式   份 </p>
                        <p>4、如有技术问题请及时与      联系 </p>
                        <p>5、开票信息：</p>
                        <p>开票抬头：中国电子系统工程第二建设有限公司</p>
                        <p>纳税人识别号：91320200134757148J </p>
                        <p>地址、电话：无锡市具区路88号，0510-81180118</p>
                        <p>开户行及账号：中国建设银行无锡胜利门支行32001614736050404268</p>
                    </div>
                    <div class="inquiry_foot">
                        <el-checkbox v-model="checked"></el-checkbox>
                        <span>我已阅读并同意<a>《定制服务系统运营商城服务协议（供应商版）》</a></span>
                    </div>
                    <div class="inquiry_foot">
                        <el-checkbox v-model="checked1"></el-checkbox>
                        <span>下次不再提示</span>
                        <button @click="next">继续报价</button>
                    </div>
                </div>
             </div>

             <div class="pop_visible1" v-show="visible1">
                <div class="post_inquiry1">
                    <div class="inquiry_head1">
                        <p>报价提示</p>
                        <i @click="close" class="el-icon-close"></i>
                    </div>
                    <div class="inquiry_body1">
                        <img src="../../assets/yi-20.png" />
                        <span>你的本次报价，将收取相应的费用，支付后请务必在报价截止前完成</span>
                        <p>报价，以免错失商机！<span style="color: #999999;">（已支付的报价费用将不予退还）</span></p>
                        <p>报价收费：<span style="color: #D80707;">￥10.00</span></p>
                    </div>
                    <div class="inquiry_foot1">
                        <el-checkbox v-model="checked2"></el-checkbox>
                        <span>我已阅读并同意<a>《定制服务系统运营商城服务协议（供应商版）》</a></span>
                    </div>
                    <div class="inquiry_foot1">
                        <button>放弃报价</button>
                        <button @click="showBox">支付并报价</button>
                    </div>
                </div>
             </div>

         </div>

         <Merchant-Foot></Merchant-Foot>
    </div>
</template>
<script>
import headerTop from '@/components/header/top';
import MerchantFoot from '@/components/foot/foot';
    export default {
        name : 'inquiryInner',
        data(){
            return {
                loading:true,
                input: '',
                visible: false,
                visible1: false,
                checked: true,
                checked1: false,
                checked2: true,
                cardBox: true,
                cardBox1: false
            }
        },
        created(){
            setTimeout(() => {
                this.loading = false;
                }, 500);
        },
        methods: {
            popupBox() {
                this.visible = true;
            },
            close() {
                this.visible = false;
                this.visible1 = false;
            },
            next() {
                this.visible1 = true;
                this.visible = false;
            },
            showBox() {
                this.cardBox = false;
                this.cardBox1 = true;
                this.visible1 = false;
            }
        },
        components: {
            headerTop,
            MerchantFoot,
        },
    }
</script>
<style lang="less" scoped>
.l {
    float: left;
}
.r {
    float: right;
}
.el-input-group {
    line-height: normal;
    display: inline-table;
    width: 30%;
    border-collapse: separate;
    border-spacing: 0;
    padding-right: 438px;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #409EFF !important;
    border-color: #409EFF !important;
}
.z_index{
    .content{
        width: 1266px;
        color: #a4a5a7;
        margin: 0 auto;
        overflow: hidden;
        background: #f1f1f1;
        padding-bottom: 100px;
        .inquiryInner {
            padding: 20px 20px;
            .inq_head {
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
                height: 230px;
                background: #fff;
                padding: 20px;
                margin-bottom: 20px;
                .com_name {
                    font-size: 24px;
                    color: #000;
                }
                .frig {
                    float: right;
                    .el-icon-star-on {
                        font-size: 25px;
                        padding-right: 40px;
                    }
                    .favourite {
                        font-size: 12px;
                        color: #333333;
                        margin-top: -20px;
                        padding-left: 40px;
                    }
                }
                .paper {
                    width: 50px;
                    background: #F0F0F0;
                    color: #D02629;
                    font-size: 12px;
                    margin: 10px 0;
                    padding: 5px 20px;
                }
                .inquiry_no {
                    display: flex;
                    .inq_deadline {
                        width: 460px;
                        line-height: 30px;
                        font-size: 14px;
                        color: #A3ABB7;
                    }
                    .inq_time {
                        width: 370px;
                        line-height: 30px;
                        font-size: 14px;
                        color: #A3ABB7;
                    }
                    .card_box {
                        width: 360px;
                        height: 132px;
                        background: #D02629;
                        margin-top: 10px;
                        .box_head {
                            padding: 20px 15px 0 15px;
                            display: flex;
                            .time_box {
                                width: 240px;
                                font-size: 14px;
                                color: #fff;
                                display: flex;
                                .box_hour {
                                    padding: 8px;
                                    margin: -5px 10px 0 0;
                                    background: #940E10;
                                }
                            }
                            .paid_quote {
                                background: #FFE8B2;
                                color: #D02629;
                                font-size: 12px;
                                padding: 8px 20px;
                                cursor: pointer;
                            }
                        }
                        .time_remain {
                            padding: 12px 15px;
                            display: flex;
                            border-bottom: 1px solid #E53639;
                            .remain {
                                width: 225px;
                                font-size: 12px;
                                color: #fff;
                            }
                            .quote {
                                font-size: 12px;
                                color: #fff;
                            }
                        }
                        .paid_inq {
                            padding: 10px;
                            float: right;
                            font-size: 12px;
                            color: #fff;
                        }
                    }
                    .card_box1 {
                        width: 360px;
                        height: 132px;
                        background: #89919D;
                        margin-top: 10px;
                        .box_head1 {
                            padding: 20px 15px 0 15px;
                            display: flex;
                            .time_box1 {
                                width: 240px;
                                height: 70px;
                                font-size: 14px;
                                color: #fff;
                                display: flex;
                                .face {
                                    width: 52px;
                                    height: 52px;
                                    background-size: 100% 100%;
                                    padding-left: 5px;
                                }
                            }
                            .paid_quote1 {
                                height: 20px;
                                background: #E8EDF8;
                                color: #89919D;
                                font-size: 12px;
                                padding: 8px 20px;
                                cursor: pointer;
                            }
                        }
                        .time_remain1 {
                            border-bottom: 1px solid #A1A7B1;
                            .quote1 {
                                font-size: 12px;
                                color: #fff;
                                float: right;
                                margin-top: -25px;
                                padding-right: 15px;
                            }
                        }
                        .paid_inq1 {
                            padding: 10px;
                            float: right;
                            font-size: 12px;
                            color: #fff;
                        }
                    }
                }
            }
            .req_supplier {
                width: 920px;
                height: 500px;
                background: #fff;
                margin-bottom: 20px;
                .supplier_name {
                    font-size: 16px;
                    padding: 20px;
                    color: #000;
                    border-bottom: 1px solid #F0F0F0;
                }
                .supplier_body {
                    padding: 20px;
                    border-bottom: 1px solid #F0F0F0;
                    .quo_req {
                        font-size: 14px;
                        color: #333;
                    }
                    .tax_include {
                        display: flex;
                        padding: 10px 0;
                        p {
                            font-size: 14px;
                            background: #DAE7FE;
                            color: #333;
                            padding: 5px;
                            margin-right: 10px;
                        }
                    }
                    .place_rec {
                        display: flex;
                        .rec_box {
                            width: 550px;
                            p {
                                font-size: 14px;
                                color: #000;
                                line-height: 28px;
                            }
                            p:nth-of-type(2) {
                                color: #555;
                            }
                            p:nth-of-type(4) {
                                color: #555;
                            }
                        }
                        .rec_box1 {
                            width: 350px;
                            p {
                                font-size: 14px;
                                color: #000;
                                line-height: 28px;
                            }
                            p:nth-of-type(2) {
                                color: #555;
                            }
                            p:nth-of-type(4) {
                                color: #555;
                            }
                        }
                    }
                }
                .sup_desc {
                    padding: 20px;
                    p {
                        font-size: 14px;
                        color: #555;
                        line-height: 25px;
                    }
                    p:nth-of-type(1) {
                        color: #000;
                    }
                    .desc_foot {
                        padding: 20px 0;
                        display: flex;
                        .desc_box {
                            width: 255px;
                            padding: 10px;
                            display: flex;
                            background: #F0F0F0;
                            margin-right: 20px;
                            img {
                                width: 40px;
                                height: 28px;
                            }
                            p {
                                font-size: 14px;
                                color: #555;
                                padding-left: 20px;
                            }
                        }
                    }
                }
            }
            .buyer {
                padding: 20px;
                font-size: 14px;
                color: #000;
                float: left;
            }
            .recom_box {
                background: #fff;
                width: 245px;
                height: 240px;
                padding: 20px;
                margin-bottom: 20px;
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
                    padding: 10px 0 5px 0;
                }
                .purchase {
                    padding: 15px 0;
                    p {
                        color: #666666;
                        padding-bottom: 10px;
                    }
                    p:nth-of-type(1) {
                        float: left;
                    }
                    p:nth-of-type(2) {
                        float: right;
                    }
                }
                .map {
                    padding: 15px 0;
                    width: 245px;
                    display: flex;
                    border-bottom: 1px solid #E9EEF3;
                    border-top: 1px solid #E9EEF3;
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
                    color: #999999;
                    padding: 15px 0;
                }
            }
            .com_supplier {
                width: 285px;
                height: 250px;
                background: #fff;
                .sup_name {
                    font-size: 16px;
                    color: #464746;
                    margin: 20px;
                    border-bottom: 1px solid #F0F0F0;
                    padding-bottom: 20px;
                }
                .online_pur {
                    padding: 0 20px;
                    p:nth-of-type(1) {
                        font-size: 14px;
                        color: #5784D2;
                        padding-bottom: 5px;
                    }
                    p:nth-of-type(2) {
                        font-size: 18px;
                        color: #333;
                        padding-bottom: 20px;
                        span {
                            font-size: 14px;
                        }
                    }
                    p:nth-of-type(3) {
                        font-size: 12px;
                        color: #666666;
                        padding-bottom: 10px;
                        span {
                            padding-left: 60px;
                        }
                    }
                    p:nth-of-type(4) {
                        font-size: 12px;
                        color: #666666;
                        span {
                            padding-left: 36px;
                        }
                    }
                }
            }
            .total_inq {
                width: 920px;
                height: 300px;
                background: #fff;
                margin-bottom: 20px;
                .total_search {
                    padding: 20px;
                    display: flex;
                    p {
                        font-size: 14px;
                        color: #464746;
                        padding-top: 5px;
                    }
                    p:nth-of-type(1) {
                        padding-right: 20px;
                    }
                }
                .col_head {
                    padding: 20px;
                    background: #F8F8F8;
                    display: flex;
                    margin: 0 20px;
                    p {
                        color: #000;
                        font-size: 13px;
                    }
                    p:nth-of-type(2) {
                        padding: 0 100px;
                    }
                    p:nth-of-type(4) {
                        padding: 0 120px;
                    }
                    p:nth-of-type(6) {
                        padding-left: 80px;
                    }
                }
                .col_head1 {
                    padding: 30px;
                    display: flex;
                    margin: 0 20px;
                    border-bottom: 1px solid #EEEEEE;
                    p {
                        color: #333;
                        font-size: 13px;
                    }
                    p:nth-of-type(2) {
                        padding: 0 106px 0 115px;
                    }
                    p:nth-of-type(4) {
                        padding: 0 50px 0 112px;
                    }
                    p:nth-of-type(6) {
                        padding-left: 85px;
                        color: #0458E3;
                    }
                }
                .materital_desc {
                    padding: 20px;
                    font-size: 13px;
                    color: #999999;
                }
            }
            .ref_quo {
                width: 880px;
                height: 60px;
                background: #fff;
                margin-bottom: 20px;
                padding: 20px;
                p {
                    font-size: 14px;
                    line-height: 30px;
                }
                p:nth-of-type(1) {
                    color: #000;
                }
                p:nth-of-type(2) {
                    color: #333;
                }
            }
        }
        .pop_visible {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            .post_inquiry {
                position: absolute;
                left: 29%;
                top: 13%;
                width: 800px;
                height: 685px;
                background: #ffffff;
                padding: 20px;
                .inquiry_head {
                    border-bottom: 1px solid #DAE7FE;
                    p {
                        font-size: 16px;
                        color: #000;
                        display: flex;
                        padding-bottom: 20px;
                    }
                    .el-icon-close {
                        font-size: 16px;
                        color: #777;
                        float: right;
                        margin-top: -40px;
                    }
                }
                .inquiry_body {
                    padding: 10px 0;
                    span {
                        font-size: 16px;
                        color: #333;
                        padding-left: 10px;
                    }
                }
                .body_letter {
                    padding: 0 30px;
                    p {
                        font-size: 14px;
                        color: #333;
                        line-height: 20px;
                        padding-bottom: 20px;
                    }
                }
                .inquiry_foot {
                    text-align: center;
                    padding-bottom: 20px;
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
                        margin-left: 20px;
                        border: none;
                    }
                }
            }
        }
        .pop_visible1 {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            .post_inquiry1 {
                position: absolute;
                left: 33%;
                top: 30%;
                width: 600px;
                height: 350px;
                background: #ffffff;
                padding: 20px;
                .inquiry_head1 {
                    border-bottom: 1px solid #DAE7FE;
                    p {
                        font-size: 16px;
                        color: #000;
                        display: flex;
                        padding-bottom: 20px;
                    }
                    .el-icon-close {
                        font-size: 16px;
                        color: #777;
                        float: right;
                        margin-top: -40px;
                    }
                }
                .inquiry_body1 {
                    padding: 20px 0;
                    border-bottom: 1px solid #DAE7FE;
                    span {
                        font-size: 16px;
                        color: #333;
                        padding-left: 10px;
                    }
                    p {
                        font-size: 16px;
                        color: #333;
                        padding-left: 30px;
                        padding-top: 3px;
                    }
                }
                .inquiry_foot1 {
                    text-align: center;
                    padding-top: 30px;
                    span {
                        font-size: 14px;
                        margin-left: 20px;
                        color: #333;
                        a {
                            color: #1A6DF7;
                        }
                    }
                    button {
                        font-size: 14px;
                        width: 100px;
                        height: 38px;
                        border-radius: 3px;
                        margin-right: 10px;
                        border: none;
                    }
                    button:nth-of-type(1) {
                        color: #333333;
                        background: #DCDCDC;
                    }
                    button:nth-of-type(2) {
                        color: #fff;
                        background: #1A6DF7;
                    }
                }
            }
        }
    }
}
        
</style>