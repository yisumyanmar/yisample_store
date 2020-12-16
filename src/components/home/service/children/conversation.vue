<template>
    <!-- 客服-系统信息-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">客服管理 - 会话</span>
                <!--<i>（ 共 {{dataTable.length}} 条记录 ）</i>-->
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>店铺客服可看全部消息</p>
                    <p>只有店铺客服管理员可删除消息，删除后，其它子账号管理员的该条信息也将被删除</p>
                </div>
            </div>
            <div class="chart">
                <div class="chart-chat">
                    <div class="chat-text">
                        <span>当前对话</span>
                    </div>
                    <div class="chat-content"></div>
                </div>
                <div class="chart-windows">
                    <div class="small-windows"></div>
                    <div class="small-window"></div>
                </div>
                <div class="chart-window" v-show="win">
                    <img src="../../../../assets/await.png" alt="#" class="await-img">
                    <span class="not-available">暂无在线访客</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import timePlunge from "../../../page/time";
    export default {
        name: 'conversation',
        data() {
            return {
                win: false
            }
        },
        components: {},
        mounted() {},
        methods: {

        }
    }
</script>
<style type="text/css">
    /*表格内容居中*/
    .el-table th > .cell,
    .el-table .cell {
        text-align: center;
    }
</style>
<style lang="less">
    .g_att {
        .t_title {
            color: #333;
            border-bottom: 1px solid #dddddd;
            overflow: hidden;
            margin-bottom: 22px;
            line-height: 50px;

            span {
                float: left;
                color: #333;
            }
            i {
                color: #999;
            }
        }
    }
    .el-switch {
        .el-switch__core {
            width: 35px !important;
            height: 16px;
            .el-switch__button {
                width: 11px;
                height: 11px;
            }
        }
        .el-switch__label {
            color: #a4a5a7;
        }
        .el-switch__label.is-active {
            color: #f7bc0a;
        }
        .el-switch__label span {
            line-height: 20px;
            font-size: 12px;
        }
    }
</style>
<style lang="less" scoped>
    .Paging_r {
        float: right;
        padding: 10px;
    }
    .classify {
        width: 1042px;
        padding-bottom: 80px;
        .g_att {
            .list {
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-top: 1px solid #ddd;
                margin-top: 15px;
                tr {
                    td {
                        padding: 15px 0;
                        border-bottom: 1px solid #ddd;
                        input,
                        select,
                        textarea,
                        button {
                            outline: 0 none;
                            vertical-align: middle;
                            text-indent: 5px;
                        }

                        .paging {
                            background: #fff;
                            line-height: 30px;
                            float: right;
                            width: 850px;

                            input {
                                border: 1px solid #dddddd;
                                height: 28px;
                            }
                            .number {
                                float: right;

                                span {
                                    width: 30px;
                                    height: 28px;
                                    float: left;
                                    text-align: center;
                                    line-height: 30px;
                                    border: 1px solid #dddddd;
                                }
                                .page {
                                    width: 30px;
                                    height: 30px;
                                    line-height: 30px;
                                    background-color: #f7bc0a;
                                    text-align: center;
                                    color: #fff;
                                    border: none;
                                    border-right: 1px solid #eeb407;
                                    cursor: pointer;
                                }
                            }
                            .go {
                                width: 37px;
                                border: 1px solid #dddddd;
                                height: 28px;
                                border-radius: 6px;
                                background-color: #f7f7f7;
                                display: block;
                                float: right;
                                text-align: center;
                                margin: 0 15px;
                                cursor: pointer;
                            }
                            span {
                                float: right;
                            }
                        }
                        .edit {
                            border: 1px solid #dddddd;
                            color: #666666;
                            width: 40px;
                            line-height: 22px;
                            text-align: center;
                            display: block;
                            border-radius: 4px;
                            float: left;
                            margin-right: 15px;
                            cursor: pointer;
                        }
                    }
                }
                .delete {
                    background-color: #e9573e;
                    color: #fff;
                    width: 56px;
                    line-height: 30px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    margin-left: 40px;
                    cursor: pointer;
                }
            }
        }
    }
    .chart{
        width: 100%;
        height: 60vh;
        background: #fff;
        position: relative;
        border-top: 1px solid #ccc;
        display: inline-block;
        font-size: 0;
        .chart-chat{
            width: 25%;
            height: 100%;
            background: #f3f3f5;
            position: relative;
            display: inline-block;
            border-right: 1px solid #d6d6d8;
            border-left: 1px solid #d6d6d8;
            border-bottom: 1px solid #d6d6d8;
            .chat-text{
                width: 100%;
                height: 50px;
                font-size: 0;
                display: inline-block;
                position: absolute;
                border-right: 1px solid #d6d6d8;
                list-style: none;
                border-bottom: 1px solid #d6d6d8;
                span{
                    width: 100%;
                    line-height: 4.2rem;
                    display: inline-block;
                    font-size: 12px;
                    text-align: center;
                    line-height: 50px;
                }
            }
            .chat-content{
                width: 100%;
                height: 89.5%;
                position: absolute;
                top: 51px;
                display: inline-block;
                background: #fff;
            }
        }
        .chart-windows{
            width: 74.7%;
            height: 100%;
            background: #fff;
            position: relative;
            display: inline-block;
            border-bottom: 1px solid #d6d6d8;
            border-right: 1px solid #d6d6d8;
            .small-windows{
                width: 100%;
                height: 69.5%;
                background: #f5f5f5;
                border-bottom: 1px solid #ccc;
            }
            .small-window{
                width: 100%;
                height: 30%;
                background: #fff;
            }
        }
        .chart-window{
            width: 74.7%;
            height: 100%;
            background: #f5f5f5;
            position: relative;
            display: inline-block;
            .await-img{
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                top: 40%;
            }
            .not-available{
                position: absolute;
                width: 100%;
                height: 30px;
                line-height: 30px;
                top: 50%;
                text-align: center;
                font-size: 14px;
                color: #c7d3d1;
            }
        }
        .chart-paging{
            width: 25%;
            height: 100%;
            background: #e8e8ea;
            position: relative;
            display: inline-block;
            border-left: 1px solid #d6d6d8;
            .paging-text{
                width: 100%;
                height: 50px;
                font-size: 0;
                display: inline-block;
                position: absolute;
                list-style: none;
                border-bottom: 1px solid #d6d6d8;
                span{
                    width: 27%;
                    display: inline-block;
                    font-size: 12px;
                    text-align: center;
                    line-height: 50px;
                }
            }
        }
    }
</style>
