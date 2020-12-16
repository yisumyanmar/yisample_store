<template>
    <!-- 商品管理 -->
    <div class="shopManage fl">
        <h1 class="titles size16">审核不通过-列表</h1>
        <div class="notes-box">
            <div class="notes_title">温馨提示</div>
            <div class="notes_content">
                <p>1该列表的商品审核不通过，请点击查看原因</p>
                <p>
                    2商品可进行编辑提交系统重新审核。 
                </p>
            </div>
        </div>
        <div class="order_seek">
            <div class="crux clearfix">
                <div class="seek_l">
                    <div>
                        商品标题：
                        <el-input
                            v-model="title"
                            placeholder="请输入内容"
                            clearable
                            style="width: 150px;height: 40px;"
                        >
                        </el-input>
                    </div>
                </div>
                <el-button @click="search()" type="success">搜索</el-button>
            </div>
        </div>
        <div class="order_minute">
            <div class="col">
                <div class="minute_g"></div>
                <div class="black">编号</div>
                <div class="black">商品名称</div>
                <div class="black">本店价（元）</div>
                <div class="black">库存</div>
                <div class="black">状态</div>
                <div class="black">审核状态</div>
                <div class="black">发布时间</div>
                <div class="black">操作</div>
            </div>
        </div>
        <div class="order_minute">
            <div class="shop" v-for="(item, index) in goodsData" :key="index">
                <div class="minute_g">
                    <input type="checkbox" class="all" name="list_select" />
                </div>
                <div class="num">{{ item.id }}</div>
                <div class="shop_name">
                    <img :src="URL + item.pic_url" alt="" class="shop_img" />
                    <span class="name">
                        <span id="name">{{ item.title }}</span>
                        <span id="single">{{ item.description }}</span>
                    </span>
                </div>
                <div class="fl ping">￥{{ item.price_member }}</div>
                <div class="fl ping">{{ item.stock }}</div>
                <div class="fl ping color">
                    <span
                        @click="sale(item, index)"
                        class="cursor"
                        v-if="item.shelves != 2"
                    >
                        {{ shelves[item.shelves] }}
                    </span>
                    <span v-if="item.shelves == 2" :disable="true">
                        {{ shelves[item.shelves] }}
                    </span>
                </div>

                <div class="fl ping color">
                    <span v-if="item.shelves == 2" :disable="true">{{
                        approval[item.approval_status]
                    }}</span>
                    <span v-else @click="sale(item, index)" class="cursor">
                        {{ approval[item.approval_status] }}
                    </span>
                </div>

                <div class="fl ping">
                    <time-Plunge :timePlunge="item.create_time"></time-Plunge>
                </div>
                <div class="fl danj">
                    <!--弹出详情信息-->
                    <el-popover
                        placement="top-start"
                        width="100%"
                        trigger="click"
                    >
                        <el-table :data="gridData" border>
                            <el-table-column
                                width="50"
                                property="id"
                                label="ID"
                            ></el-table-column>
                            <el-table-column
                                show-overflow-tooltip=""
                                width="250"
                                property="title"
                                label="名称"
                            ></el-table-column>
                            <el-table-column
                                width="100"
                                property="class_name"
                                label="分类"
                            ></el-table-column>
                            <el-table-column
                                width="100"
                                property="price_market"
                                label="市场价"
                            ></el-table-column>
                            <el-table-column
                                width="100"
                                property="price_member"
                                label="会员价"
                            ></el-table-column>
                            <el-table-column
                                width="80"
                                property="stock"
                                label="库存"
                            ></el-table-column>
                            <el-table-column
                                width="80"
                                property="stock"
                                label="审核状态"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        {{
                                            approval[scope.row.approval_status]
                                        }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="50" label="上架">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="isMarks[scope.$index]"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :disabled="
                                            item.shelves == 2 ? true : false
                                        "
                                        @click.native="
                                            goodsGoodsSheve(
                                                scope.row.id,
                                                isMarks[scope.$index],
                                                scope.$index
                                            )
                                        "
                                    >
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="50"
                                property="recommend"
                                label="推荐"
                            >
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="recommends[scope.$index]"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                    >
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column width="150" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        type="success"
                                        size="small"
                                        @click="toShop(scope.row.id)"
                                        >预览</el-button
                                    >
                                    <el-button
                                        type="danger"
                                        size="small"
                                        @click="delSingleGoods(scope.row)"
                                        >删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button
                            @click="goodsDetail(item.id)"
                            slot="reference"
                            >查看</el-button
                        >
                    </el-popover>
                    <el-button
                        @click.native="edit(item)"
                        icon="el-icon-edit"
                        :disabled="item.shelves == 2"
                    ></el-button>
                    <!-- <el-button size="small" :disabled="item.shelves==2">被举报</el-button> -->
                    <!-- <el-button
                        size="small"
                        @click="sale(item, index)"
                        :disabled="item.shelves == 2"
                        >不通过原因</el-button
                    > -->
                    <el-dropdown>
                        <span class="first-name" @click="sale(item, index)"
                        :disabled="item.shelves == 2">不通过原因</span>
                        <el-dropdown-menu slot="dropdown" v-if="item.remark">
                            <el-dropdown-item>{{item.remark}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button
                        @click="delItem(item.id)"
                        icon="el-icon-delete"
                    ></el-button>
                </div>
            </div>
        </div>
        <div class="Paging">
            <div class="Paging_checkbox">
                <input
                    type="checkbox"
                    @click="allCheck()"
                    class="all"
                    name="all"
                />
            </div>
            <div class="fl pil">删除</div>
            <div class="Paging_r">
                <el-pagination
                    background
                    layout="total,prev, pager, next,jumper"
                    :page-size="page_size"
                    @current-change="handleCurrentChange"
                    :total="page"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import timePlunge from "../../../page/time";
import Vue from "vue";

const $vue = new Vue();
// import goodslookFrom from '../children/goodslookFrom.vue';
//	import goodsDetail from "./goodsManagerDetail"
export default {
    name: "auditPassed",
    data() {
        return {
            gridData: [],
            goodsData: {},
            shelves: ["上架", "下架", "被举报"],
            approval: ["审核中", "已审核", "拒绝审核"],
            recommends: [], //商品详情里面的是否推荐
            isMarks: [], //商品推荐里面的是否上架
            shelves_status: 1, //上架状态
            title: "", //商品标题
            approval_status: 0, //审核状态
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 0 //每页显示多少条数据
        };
    },
    components: {
        timePlunge
    },
    created() {
        this.search();
        var that = this;
        document.onkeydown = function(e) {
            var keyNum = window.event ? e.keyCode : e.which;
            if (keyNum == 13) {
                that.search();
            }
        };
        if(this.$route.query.answer) {
            this.goodMana()
        }
    },
    
    methods: {
        goodMana() {
            this.shelves_status = 1
            this.search();
        },
        toShop(id) {
            window.open("http://b2b2c.shopsn.cn/shopsn_product?id=" + id);
        },
        delItem(id) {
            this.$confirm("此操作将永久删除此商品，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$HTTP(this.$httpConfig.delGoods, { id: id }, "post")
                        .then(res => {
                            this.$message.success(res.data.message);
                            this.search();
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                })
                .catch(() => {
                    this.$message.info("已取消删除");
                });
        },
        // 商品编辑
        edit(item) {
            this.$store.commit("clearIndex", [0]);
            this.$store.commit("clearState", 0);
            this.$router.push({
                name: "goodsEdit",
                params: {
                    id: item.id
                }
            });
        },
        //全选和取消全选
        allCheck: function() {
            var list_selects = document.getElementsByName("list_select");
            var checkBox = document.getElementsByName("all");
            if (checkBox[0].checked == true) {
                for (var i = 0; i < list_selects.length; i++) {
                    list_selects[i].checked = true;
                }
            } else {
                for (var i = 0; i < list_selects.length; i++) {
                    list_selects[i].checked = false;
                }
            }
        },
        /*页面跳转*/
        handleCurrentChange: function(currentPage) {
            //	console.log(currentPage);
            this.currentPage = currentPage;
            this.search();
        },
        /*得到默认所有列表数据*/
        getGoodsList: function() {
            this.$HTTP(
                this.$httpConfig.getGoodsList + "/p/" + this.currentPage,
                {
                    p: this.currentPage
                },
                "post"
            )
                .then(res => {
                    //		console.log(res)
                    this.goodsData = res.data.data.data;
                    this.page_size = parseInt(res.data.data.page_size);
                    this.page = parseInt(res.data.data.page);
                    this.$message.success(`${res.data.message}`);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        log: function(data) {
            //	console.log(data);
        },
        /*商口列表里商品数组中的商品==是否上架*/
        goodsGoodsSheve: function(goods_id, isMark, index) {
            //	console.log(goods_id, Number(isMark));
            this.$HTTP(
                this.$httpConfig.setShelve,
                {
                    id: goods_id,
                    shelves: Number(isMark)
                },
                "post"
            )
                .then(res => {
                    // this.$layer.msg(res.data.message);
                    this.isMarks[index] = isMark;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        lookInfo(goodsId) {
            /*this.$layer.iframe({
				content: {
					content: goodsDetail, //传递的组件对象
					parent: this, //当前的vue对象
					data: [goodsId] //props
				},	
				area: ['800px', '600px'],
				title: "查看商品信息"
			});*/
        },

        //搜索
        search() {
            let number = [this.approval_status, this.shelves_status];
            let length = number.length;
            let index = 0;
            for (index; index < length; index++) {
                if (!/\d/.test(number[index])) {
                    this.$layer.msg("数据异常");
                    return false;
                }
            }
            if (
                this.title != "" &&
                !/^[\u4e00-\u9fa5\s_a-zA-Z0-9/_、，；！：,. 。“”【】（）]+$/.test(
                    this.title
                )
            ) {
                this.$layer.msg("商品名称异常，请尽量输入中文符号");
                return false;
            }
            this.$HTTP(
                this.$httpConfig.getGoodsList + "/p/" + this.currentPage,
                {
                    title: this.title,
                    approval_status: 2
                },
                "post"
            )
                .then(res => {
                    if (res.data.data == null) {
                        this.goodsData = {};
                    } else {
                        this.goodsData = res.data.data.data;
                    }
                    //	console.log(res.data.message)
                    // this.$layer.msg(res.data.message)
                    this.page_size = parseInt(res.data.data.page_size);
                    this.page = ~~res.data.data.page;
                    //	console.log(typeof (this.page_size))
                })
                .catch(err => {
                    this.goodsData = {};
                    this.page_size = 0;
                    this.page = 0;
                });
        },

        /*商品详情*/
        goodsDetail(goods_id) {
            //	console.log(goods_id);

            this.$HTTP(
                this.$httpConfig.getChildGoodsList,
                {
                    id: goods_id
                },
                "post"
            )
                .then(res => {
                    let list = res.data.data;
                    this.gridData = list;
                    for (let i = 0; i < list.length; i++) {
                        this.recommends[i] =
                            Number(list[i].recommend) == 1 ? true : false;
                        this.isMarks[i] =
                            Number(list[i].shelves) == 1 ? true : false;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //上下架
        sale(item, index) {
            //	console.log(item.id)
            let shelves = parseInt(item.shelves);
            shelves = shelves === 1 ? 0 : 1;
            this.$HTTP(
                this.$httpConfig.setShelve,
                {
                    id: item.id,
                    shelves: shelves
                },
                "post"
            )
                .then(res => {
                    this.$layer.msg(res.data.message);
                    this.goodsData[index].shelves = shelves;
                })
                .catch(err => {
                    console.log(err);
                });
                this.search();
        },

        /*删除单独的商品*/
        delSingleGoods(goods) {
            this.$confirm(
                "此操作将永久删除" + goods.title + ", 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    this.$HTTP(
                        this.$httpConfig.delChildGoods,
                        {
                            id: goods.id
                        },
                        "post"
                    )
                        .then(res => {
                            this.$message.success(res.data.message);
                            this.search();
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>
<style>
.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
}
</style>
<style lang="less" scoped>
 .el-dropdown{
//  width: 10% !important; 
}
.el-dropdown-menu {
    // width: 10% !important;
    position: absolute !important;
    margin: 3px 0 0 0 !important;
    background-color: #FFF;
    border: 1px solid #de2d35;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-dropdown-menu__item {
  line-height: 6px !important;
  font-size: 12px !important;
  color:rgb(101, 101, 101) !important;
}
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color:rgb(101, 101, 101) !important;
    background-color: #ffffff !important;
  }

.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));   
}

.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
}
.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
  
}
.el-popper .popper__arrow, .el-popper .popper__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;  
} 
</style>

<style type="text/css">
body {
    overflow: inherit;
}

.shopManage .order_minute .shop .shop_name .name #name {
    white-space: nowrap !important;
    overflow: hidden !important;
    display: -webkit-box !important;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: #333;
    height: 22px !important;
    line-height: 22px !important;
}

#single {
    height: 35px;
    white-space: nowrap !important;
    overflow: hidden !important;
    display: -webkit-box !important;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
<style lang="less" scoped>
.el-input--medium .el-input__inner {
    height: 40px;
}

* {
    box-sizing: border-box;
}

.cursor {
    cursor: pointer;
}

.el-button {
    padding: 5px 12px;
}

.shopManage {
    width: 1000px;
    padding-bottom: 80px;

    .titles {
        color: #333;
        border-bottom: 1px solid #dddddd;
        overflow: hidden;
        margin-bottom: 22px;
        line-height: 50px;
    }

    .fl {
        float: left;
    }

    .order_seek {
        background-color: #f6f6f6;
        border: 1px solid #dddddd;
        margin-top: 15px;
        overflow: hidden;
        line-height: 50px;

        .crux {
            .seek_l {
                overflow: hidden;
                float: left;
                margin-left: 40px;

                .name {
                    width: 200px;
                }
            }

            .z_s_list {
                overflow: hidden;
                float: left;
                margin-left: 33px;
            }

            div:nth-child(1) {
                margin-left: 7px;
            }

            button {
                margin: 10px 0 10px 40px;
                width: 70px;
                height: 35px;
            }
        }
    }

    .order_minute {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        margin-top: 15px;
        width: 100%;
        overflow: hidden;

        .m_t {
            margin-top: 25px;
            width: 100%;
        }

        .col {
            border: none;
            width: 100%;
            background-color: #f9fafa;
            overflow: hidden;
            border-bottom: 1px solid #ddd;

            .black {
                color: #333;
                font-size: 12px;
                text-align: center;
                font-weight: 600;
                float: left;
            }

            .hm {
                line-height: 40px;
            }
        }

        .col div {
            height: 40px;
            line-height: 40px;
        }

        .col div:nth-child(1) {
            width: 5%;
            float: left;
        }

        .col div:nth-child(2) {
            width: 5%;
            float: left;
        }

        .col div:nth-child(3) {
            width: 26%;
            float: left;
        }

        .col div:nth-child(4) {
            width: 8%;
            float: left;
        }

        .col div:nth-child(5) {
            width: 8%;
            float: left;
        }

        .col div:nth-child(6) {
            width: 8%;
            float: left;
        }

        .col div:nth-child(7) {
            width: 8%;
            float: left;
        }

        .col div:nth-child(8) {
            width: 8%;
            float: left;
        }

        .col div:nth-child(9) {
            width: 23%;
            float: left;
        }

        .all {
            outline: 0 none;
            vertical-align: middle;
            text-indent: 5px;
            border: 1px solid #ff920b;
            display: block;
            margin: auto;
            margin-top: 14px;
            width: 20px;
            height: 20px;
        }

        .shop {
            width: 100%;
            overflow: hidden;
            background-color: #fff;
            height: 88px;
            border-bottom: 1px solid #ddd;

            .shop_img {
                width: 58px;
                height: 58px;
                border: 1px solid #ddd;
                float: left;
                margin-top: 12px;
                margin-left: 20px;
            }

            .minute_g {
                width: 5%;
                float: left;

                input {
                    height: 65px;
                    line-height: 40px;
                }
            }

            .shop_name {
                width: 40%;
                display: flex;
                flex-direction: row;
                padding: none !important;
                padding-left: 0 !important;

                .name {
                    display: block;
                    float: left;

                    span {
                        display: block;
                        width: 200px;
                        overflow: hidden;
                        height: 20px;
                    }
                }
            }

            .ping {
                width: 8%;
                line-height: 88px;
                text-align: center;
            }

            .ping:nth-child(4) {
                /*line-height: normal;*/
            }

            .color {
                color: #259d0e;
            }

            .danj {
                width: 22%;
                line-height: 88px;
                text-align: center;
                display: flex;
                align-items: center;
                height: 100%;
                justify-content: space-around;

                span {
                    color: #666666;
                    line-height: 22px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button {
                    margin-left: 0;
                }

                // span:nth-child(1) {
                //     margin-left: 20px;
                // }
                .first-name{
                font-size: 12px;
                margin-left: 0;
                border: 2px solid #f1f1f1;
                padding: 0 4px;
                }
            }

            .num {
                width: 5%;
                text-align: center;
                line-height: 88px;
                overflow: hidden;
                height: 88px;
                float: left;
            }

            .caozu {
                width: 15%;
                line-height: 88px;
                text-align: center;
            }
        }
    }

    .Paging {
        width: 100%;
        height: 50px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        .Paging_checkbox {
            width: 5%;
            float: left;
            height: 50px;

            input {
                display: block;
                margin: auto;
                margin-top: 20px;
            }

            .all {
                outline: 0 none;
                vertical-align: middle;
                text-indent: 5px;
                border: 1px solid #ff920b;
                display: block;
                margin: auto;
                margin-top: 14px;
                width: 20px;
                height: 20px;
            }
        }

        .pil {
            border: 1px solid #e9573e;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 4px;
            background-color: #e9573e;
            float: left;
            margin: 10px 10px 10px 70px;
            cursor: pointer;
            width: 58px;
            height: 32px;
            line-height: 32px;
        }

        .Paging_r {
            float: right;
            padding: 10px;
        }
    }
}
</style>
