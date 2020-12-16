<template>
    <!-- 首页 -->
    <div class="right fl">
        <div class="Essential-information">
            <div class="commodity-logo" @click="shopEditors">
                <img :src="URL + handleStoreLogo" alt="" />
                <div class="dianp clearfix">
                    <img src="../../../assets/edit.png" alt="" />
                    <span>编辑店铺设置</span>
                </div>
            </div>
            <div class="QR-code">
                <div ref="qrcode" class="code"></div>
                <div class="xiazai">下载店铺二维码</div>
            </div>
            <div class="information">
                <ul>
                    <li class="title">{{ store.shop_name }}</li>
                    <li>
                        <span>用户名：</span>
                        <span class="Basket">{{ store.user_name }}</span>
                    </li>
                    <li>
                        <span>店铺有效期：</span>
                        <span class="Basket">
                            {{ store.shop_long }}
                            <!-- 截止至 <time-Plunge :timePlunge="home_data.store.shop_long"></time-Plunge> -->
                        </span>
                    </li>
                    <li>
                        <span>上次登录IP：</span>
                        <span class="Basket">{{ store.last_login_ip }}</span>
                    </li>
                    <li>
                        <span>上次登录时间：</span>
                        <span class="Basket">{{
                            new Date(
                                store.last_login_time * 1000
                            ).getFullYear() +
                                "-" +
                                (new Date(
                                    store.last_login_time * 1000
                                ).getMonth() +
                                    1) +
                                "-" +
                                new Date(
                                    store.last_login_time * 1000
                                ).getDate() +
                                " " +
                                new Date(
                                    store.last_login_time * 1000
                                ).getHours() +
                                ":" +
                                new Date(
                                    store.last_login_time * 1000
                                ).getMinutes() +
                                ":" +
                                new Date(
                                    store.last_login_time * 1000
                                ).getSeconds()
                        }}</span>
                    </li>
                </ul>
            </div>
            <div class="score">
                <ul>
                    <div class="pingf">店铺动态评分</div>
                    <li>
                        <div>{{ score.deliverycredit }}分</div>
                        <span>描述相符</span>
                    </li>
                    <li>
                        <div>{{ score.servicecredit }}分</div>
                        <span>服务态度</span>
                    </li>
                    <li>
                        <div>{{ score.desccredit }}分</div>
                        <span>物流速度</span>
                    </li>
                    <li>
                        <div>{{ score.comprehensive }}分</div>
                        <span>综合服务</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="index-left">
            <div class="commodity">
                <h3 class="lm">商品管理</h3>
                <ul>
                    <li>
                        <el-badge
                            @click.native="tolink"
                            :value="goods.inTheSale"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">出售中的商品</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge
                            @click.native="tolink"
                            :value="goods.inTheWarehouse"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">仓库中的商品</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge
                            @click.native="tolink"
                            :value="goods.waitForAudit"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">审核中商品</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge
                            @click.native="tolink(4)"
                            :value="goods.irregularities"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">违规下架的商品</el-button>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="commodity">
                <h3 class="lm">订单提醒</h3>
                <ul>
                    <li>
                        <el-badge
                            @click.native="orderFun(0)"
                            :value="order.pendingPayment"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">待付款订单</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge
                            @click.native="orderFun(1)"
                            :value="order.pendingDelivery"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">待发货订单</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge
                            @click.native="orderFun(4)"
                            :value="order.toBeEvaluated"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">待评价订单</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge
                            @click.native="orderFun(8)"
                            :value="order.refunds"
                            :max="99"
                            class="item"
                        >
                            <el-button size="small">退款中订单</el-button>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="commodity">
                <h3 class="lm">违规提醒</h3>
                <ul>
                    <li>
                        <el-badge
                            :value="home_data.illegal"
                            :max="10"
                            class="item"
                        >
                            <el-button size="small">待处理的投诉</el-button>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="commodity">
                <h3 class="lm">客户等级分析</h3>
                <el-table
                    max-height="200"
                    :data="home_data.userLevel"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="count"
                        label=""
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column prop="level_name" label="">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="index-right">
            <div class="Statistics">
                <h3 class="lm">今日统计</h3>
                <ul>
                    <li>
                        今日营业总额
                        <span class="Orange">{{
                            home_data.profitToday
                                ? home_data.profitToday
                                : "暂无数据"
                        }}</span>
                    </li>
                    <li>
                        今日订单量
                        <span class="Orange">{{
                            home_data.orderToday
                                ? home_data.orderToday
                                : "暂无数据"
                        }}</span>
                    </li>
                    <li>
                        今日有效订单量
                        <span class="Orange">{{
                            home_data.userToday
                                ? home_data.userToday
                                : "暂无数据"
                        }}</span>
                    </li>
                </ul>
            </div>
            <div class="Statistics">
                <h3 class="lm">平台联系方式</h3>
                <i class="mode" v-if="config[1]"
                    >电话：{{ config[1].config_value }}
                </i>
                <i class="mode" v-if="config[4]"
                    >邮箱：{{ config[4].config_value }}
                </i>
            </div>
            <div class="Statistics">
                <h3 class="lm">商家公告</h3>
                <el-table
                    max-height="200"
                    :data="home_data.announcement"
                    tooltip-effect="dark"
                    style="width: 100%"
                     @cell-click="LinkOpen(annId)"
                >
                    <el-table-column
                        prop="title"
                        label=""
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        label="" 
                        prop="create_time">
                        <!-- <template slot-scope="scope">
                            <time-Plunge
                                v-if="scope"
                                :timePlunge="scope.row.create_time"
                            ></time-Plunge>
                        </template> -->
                    </el-table-column>
                </el-table>
            </div>
            <div class="Statistics">
                <h3 class="lm c" @click="goGo">
                    销售情况统计<span class="gray">（近7天）</span>
                </h3>
                <el-table
                    max-height="150"
                    :data="home_data.salesStatistics"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="price"
                        label=""
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column prop="time" label=""> </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    <!-- 

        待付款 0
        待发货 1
        待评价 4
        退款中 8
     -->
</template>
<script>
import timePlunge from "@/components/page/time";
import QrCode from "qrcodejs2";
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
    name: "index",
    data() {
        return {
            loading: true,
            topHeight: 90, //顶部高度
            footerHeight: 25,
            leftWidth: 190,
            home_data: "",
            store: {},
            goods: {},
            order: {},
            config: [],
            score: {},
            replaceImg: require("../../../assets/initLogo.png"),
            animate: false,
            temptime: '',
            annId: ''
        };
    },
    created() {
        // console.log(parent.Vue.$store.state.orderState)
        this.$HTTP(this.$httpConfig.getHome, {})
            .then(res => {
                this.store = res.data.data.store;
                this.goods = res.data.data.goods;
                this.order = res.data.data.order;
                this.config = res.data.data.config;
                this.home_data = res.data.data;
                // console.log(JSON.stringify(this.home_data.announcement))
                for(let a in this.home_data.announcement) {
                this.annId = this.home_data.announcement[a].id   
                }
                this.dateFormat();
                this.score = res.data.data.score;
            })
            .catch(err => {
                console.log(err);
            });
    },
    computed: {
        handleStoreLogo() {
            if (
                this.store.store_logo == null ||
                this.store.store_logo.length <= 0
            ) {
                return this.replaceImg;
            } else {
                return this.store.store_logo;
            }
        }
    },
    methods: {
        LinkOpen(annId) {
            window.open("http://demo.shopsn.cn/notice/"+annId);
        },
        dateFormat() {
            for(var i in this.home_data.announcement) {
                let times = this.home_data.announcement[i].create_time
                this.temptime = this.format(times * 1000);
                this.home_data.announcement[i].create_time = this.temptime
            }
        },
        add0(m){return m<10?'0'+m:m },

        format(secondDate)
        {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(secondDate);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        },
        scroll() {
            this.animate = true;
            setTimeout(() => {
                this.home_data.announcement.push(this.home_data.announcement[0]);
                this.home_data.announcement.shift();
                this.animate = false;
            }, 500);
        },
        goGo() {
            parent.location.href = "#/statistics";
        },
        ...mapMutations(["orderFun"]),
        // 生成二维码
        code() {
            var qrcode = new QrCode(this.$refs.qrcode, {
                text: "http://m.shopsn.cn/",
                width: 100,
                height: 100,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QrCode.CorrectLevel.H
            });
        },

        shopEditors() {
            parent.location.href = "#/shop";
        },
        tolink(index) {
            if (index == 4) {
                parent.location.href = "#/goods?type=weigui";
            }else{
                parent.location.href = "#/goods";
            }
           
        }
        // orderFun(state){
        //     this.$store.state.orderState = state
        //     console.log(this.$store.state.orderState)
        //     parent.location.href = '#/trade';
        //     // console.log()
        //     // this.$router.push('#/tradeManage?state=' + state)
        //     // location.reload()
        // }
    },
    mounted() {
        setInterval(this.scroll, 3000);
        this.$nextTick(() => {
            this.code();
        });
        document.body.scrollTop = 0;
    },
    components: {
        timePlunge
    }
};
</script>
<style lang="less">
body {
    overflow: inherit;
}
.el-table td,
.el-table td {
    border-bottom: none;
}
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
    text-align: center;
    // position: relative;
    // overflow-y: hidden;
    // animation: mymove 5s infinite;
    // @keyframes mymove {
    //     from {bottom: 0px;}
    //     to {bottom: 100px;}
    // }
}
</style>

<style lang="less" scoped>
.c {
    cursor: pointer;
}
.right {
    width: 1042px;
    padding-bottom: 80px;
    .Essential-information {
        border: 1px solid #dddddd;
        padding: 36px;
        background-color: #fff;
        overflow: hidden;
        .commodity-logo {
            float: left;
            width: 192px;
            margin-right: 50px;
            overflow: hidden;
            img {
                max-width: 100%;
                height: auto;
                width: auto\9;
                border: 0;
            }
            .dianp {
                font-size: 12px;
                padding-left: 50px;
                padding-top: 10px;
                text-align: center;
                display: block;
                color: #555555;
                cursor: pointer;
                img {
                    float: left;
                    max-width: 100%;
                    height: auto;
                    width: auto\9;
                    border: 0;
                }
                span {
                    float: left;
                    line-height: 20px;
                }
            }
        }
        .QR-code {
            float: left;
            width: 100px;
            height: 180px;
            img {
                width: 100px;
                height: 100px;
                display: block;
            }
            .xiazai {
                font-size: 12px;
                line-height: 50px;
                cursor: pointer;
                text-align: center;
            }
        }
        .information {
            width: 220px;
            margin-left: 30px;
            float: left;
            .title {
                line-height: 30px;
                font-size: 18px;
                color: #333;
            }
            li {
                list-style: none outside none;
                .Basket {
                    color: #26a2f1;
                }
            }
        }
        .score {
            width: 300px;
            float: left;
            .pingf {
                line-height: 30px;
                color: #333;
                font-size: 18px;
                margin-right: 40px;
            }
            ul {
                display: flex;
            }
            li {
                justify-content: center;
                margin-right: 15px;
                div {
                    width: 70px;
                    height: 70px;
                    border: 2px solid #f6b30e;
                    border-radius: 50%;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #f6b30e;
                    font-size: 16px;
                }
                span {
                    display: flex;
                    justify-content: center;
                    margin-top: 15px;
                }
            }
        }
    }
    .index-left {
        width: 610px;
        float: left;
        .commodity {
            background-color: #fff;
            border: 1px solid #dddddd;
            margin-top: 15px;
            padding: 15px;
            overflow: hidden;
            .lm {
                background: url(../../../assets/s.jpg) no-repeat left;
                text-indent: 15px;
                color: #333;
            }
            li {
                position: relative;
                // width: 92px;
                // height: 22px;
                // margin-top: 15px;
                float: left;
                margin: 10px 15px;
                display: flex;
                justify-content: center;
                cursor: pointer;
                i {
                    border: 1px solid #dddddd;
                    line-height: 22px;
                    display: block;
                    text-align: center;
                }
                span {
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    background-color: #ff7840;
                    color: #fff;
                    right: -10px;
                    top: -10px;
                    text-align: center;
                    border-radius: 10px;
                    line-height: 16px;
                }
            }
        }
    }
    .index-right {
        width: 420px;
        float: right;
        .Statistics {
            background-color: #fff;
            border: 1px solid #dddddd;
            margin-top: 15px;
            padding: 15px;
            overflow: hidden;
            .lm {
                background: url(../../../assets/s.jpg) no-repeat left;
                text-indent: 15px;
                color: #333;
                z-index: 111;
                position: relative;
                .gray {
                    font-size: 12px;
                    color: #888;
                }
            }
            li {
                width: 120px;
                float: left;
                text-align: center;
                border-right: 1px solid #eeeeee;
                margin-top: 4px;
                .Orange {
                    color: #fb6c45;
                    font-size: 14px;
                    display: block;
                }
            }
            .mode {
                width: 45%;
                display: block;
                margin-top: 5px;
                float: left;
                line-height: 30px;
                margin-left: 15px;
            }
        }
    }
}
</style>
