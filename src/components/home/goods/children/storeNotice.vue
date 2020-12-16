<template>
    <div class="storeNotice-wrapper">
        <div class="header">
            <h6>举报违规-列表:</h6>
            <div class="wrapper">
                <div class="notice">温馨提示</div>
                <ul>
                    <li>1<span>请填写证明内容</span></li>
                    <li>2<span>请上传相关证明</span></li>
                    <li>3<span>提交后,工作人员会在3-5个工作日审查</span></li>
                </ul>
            </div>
            <div class="info">
                <h5>状态:</h5>
                <el-select v-model="selectValue" @change="handleSelectChange">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button @click="search">搜索</el-button>
            </div>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="编号" width="120">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="title" label="商品名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="审核状态" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">待审核</span>
                    <span v-else>审核成功</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="举报时间" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column  label="状态" width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.store_status==0">未处理</span>
                    <span v-else>已处理</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >查看</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import StoreItem from "./child/storeNoticeItem";
export default {
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            multipleSelection: [],
            showNoticeItem: false,
            reTableData: [],
            currentPage: 1, //初始页
            pagesize: 10, //每页的数据
            total: 0, //总的分页条目
            reportDetailData: {},
            selectValue: "",
            getID: 0,
            get_status: 0,
            options: [
                {
                    value: "1",
                    label: "未处理"
                },
                {
                    value: "2",
                    label: "已处理"
                }
            ]
        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        this.getReportList(this.currentPage);
    },
    methods: {
        search() {
            console.log(this.get_status);
            this.$HTTP(this.$httpConfig.reportList, {
                store_status: this.get_status
            })
                .then(res => {
                    this.tableData = res.data.data.list;
                    this.total = Number(res.data.data.count);
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleSelectChange(status) {
            this.$HTTP(
                this.$httpConfig.reportList,
                {
                    store_status: status
                },
                "get"
            )
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.error(err);
                });
            this.get_status = Number(status);
        },
        //获取列表数据
        getReportList(currentPage) {
            this.$HTTP(
                this.$httpConfig.reportList,
                {
                    page: currentPage
                },
                "get"
            )
                .then(res => {
                    this.tableData = res.data.data.list;
                    this.total = Number(res.data.data.count);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
            this.pagesize = size;
            console.log(this.pagesize); //每页下拉显示数据
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getReportList(currentPage);
            console.log(this.currentPage); //点击第几页
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val, 111);
        },
        handleEdit(index, row) {
            this.showNoticeItem = true;
            this.$router.push({
                path: "/storeNoticeItem",
                query: {
                    id: row.id
                }
            });
        },

        //返回上一级
        goBackTop() {
            this.showNoticeItem = false;
        },
        //详情隐藏显示
        cancel() {
            this.showNoticeItem = false;
        }
    },
    components: {
        StoreItem
    }
};
</script>
<style lang="less">
.storeNotice-wrapper {
    .el-pagination .el-select .el-input {
        display: none;
    }
    .el-pagination {
        text-align: center;
        margin: 20px 0;
    }
    .el-button {
        margin-left: 30px;
    }
    .el-input--suffix .el-input__inner {
        margin-left: 10px;
    }
}
</style>
<style lang="less" scoped>
.storeNotice-wrapper {
    .header {
        h6 {
            font-size: 16px;
            border-bottom: 1px solid #e8e8e8;
            color: #333;
            padding: 10px 0;
        }
        .wrapper {
            background: rgba(79, 192, 232, 0.11);
            border-left: 2px solid #0ba4da;
            margin: 15px 0;
            .notice {
                font-size: 16px;
                color: #0ba4da;
                padding-left: 8px;
                padding-top: 20px;
            }
            ul {
                display: flex;
                flex-direction: column;
                padding: 20px;
                li {
                    color: #0ba4da;
                    font-size: 13px;
                    span {
                        color: #0ba4da;
                        font-size: 13px;
                        margin: 10px 5px;
                    }
                }
            }
        }
        .info {
            h5 {
                margin-left: 5px;
            }
            display: flex;
            align-items: center;
            background: #efefef;
            padding: 5px;
            margin: 10px 0;
        }
    }
}
</style>
