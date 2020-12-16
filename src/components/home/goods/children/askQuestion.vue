<template>
    <div class="consult_wrapper">
        <div class="listWrapper" v-if="showListData">
            <h6>
                商品咨询-列表
                <span>(共{{dataList.length}}条记录)</span>
            </h6>
            <el-table
                ref="multipleTable"
                :data="dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="编号" width="120">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column prop="goods_name" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="user_name" label="咨询人"></el-table-column>
                <el-table-column prop="content" label="咨询问题"></el-table-column>
                <el-table-column label="咨询时间">
                    <template slot-scope="scope">{{ scope.row.create_time|formatDate }}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">{{scope.row.status==0?'未回复':'已回复'}}</template>
                </el-table-column>
                <el-table-column prop="operate" label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleSelect(scope.$index, scope.row)"
                        >{{scope.row.status==0?'回复':'查看'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="listWrapper">
                <div class="page_one"></div>
            </div>
        </div>
        <div class="itemWrapper" v-if="showItemData">
            <div class="header">
                <h6>商品咨询内页</h6>
                <span @click="backBefore">返回上一层</span>
            </div>

            <div class="goods_name">
                <h5>商品名称:</h5>
                <span>{{getReturnData.goods_name}}</span>
            </div>

            <h4>{{getReturnData.user_name}}</h4>
            <div class="askReply">
                <h4>问:</h4>
                <h5>{{getReturnData.content}}</h5>
                <span>{{getAskTime|formatDate}}</span>
            </div>
            <div class="askReply">
                <h4>回复:</h4>
                <h5>{{getReturnData.reply}}</h5>
                <span>{{getReturnData.create_time|formatDate}}</span>
            </div>
        </div>
        <reply-question
            v-if="showItem"
            @close="close"
            :dataList="dataList"
            :receivedData="receivedData"
        ></reply-question>
        <el-pagination
            v-if="showPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataList.length"
        ></el-pagination>
    </div>
</template>

<script>
import qs from "qs";
import ReplyQuestion from "./replyQuestion";
export default {
    data() {
        return {
            dataList: [],
            getReplyTime: "",
            getInputValue: "",
            getReturnData: "",
            getAskTime: "",
            itemTimeData: {},
            dataListTransfer: [],
            showItem: false,
            showListData: true,
            showItemData: false,
            receivedData: "",
            multipleSelection: [],
            currentPage: 1,
            pagesize: 10,
            currentPageList: [],
            showPage: true
        };
    },

    methods: {
        backBefore(){
            this.showListData=true;
            this.showItemData=false;
            this.showPage=true;
        },
        change() {
            console.log(1);
        },
        handleSelectionChange(val) {
            console.log(val, "handleSelectionChange");
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.pagesize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        },
        handleSelect(val1, val2) {
            // debugger;
            if (val2.status == 0) {
                this.showItem = true;
                this.receivedData = val2;
            } else {
                this.$HTTP(this.$httpConfig.checkReply, {
                    consultation_id: val2.id
                }).then(res => {
                    this.getReturnData = res.data.data;
                });
                this.showItemData = true;
                this.showListData = false;
                this.showPage = false;
            }
        },

        close(value, time) {
            this.getInputValue = value;
            this.getReplyTime = time;
            console.log(value, time, 111);
            this.showItem = false;
        }
    },
    mounted() {
        this.$HTTP(this.$httpConfig.getConsultQuestion, {})
            .then(res => {
                this.dataList = res.data.data;
                console.log(this.$refs.multipleTable, "multipleTable");
                console.log(this.dataList, "this.dataList");
                for (let i = 0; i < this.dataList.length; i++) {
                    this.getAskTime = this.dataList[i].create_time;
                }
            })
            .catch(err => {
                console.error(err);
            });
    },
    components: {
        ReplyQuestion
    }
};
</script>
<style lang="less">
.el-pagination {
    margin-left: 30%;
    margin-top: 15px;
}
</style>
<style lang="less" scoped>
.consult_wrapper {
    padding: 20px;
    height: 100%;
    overflow-y: auto;
    .listWrapper {
        h6 {
            border-bottom: 1px solid #e8e8e8;
            padding: 10px 0;
            font-size: 16px;
            color: #333;
            span {
                font-size: 12px;
                color: #a4a5a7;
                margin-left: 6px;
            }
        }
    }
    .itemWrapper {
        .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e8e8e8;
            padding: 10px 0;
            h6 {
                font-size: 16px;
                color: #333;
            }
            span{
                cursor: pointer;
            }
        }

        .goods_name {
            display: flex;
            align-items: center;
            margin-top: 10px;
            span {
                margin-left: 10px;
            }
        }
        h4 {
            font-size: 14px;
            color: #333;
            margin-top: 20px;
        }
        .askReply {
            display: flex;
            align-items: baseline;
            margin: 5px 0;
            h4 {
                color: #f7bc0a;
            }
            h5 {
                margin-left: 10px;
                color: #333;
                font-size: 14px;
            }
            span {
                margin-left: 20px;
                font-size: 14px;
            }
        }
    }
}
</style>