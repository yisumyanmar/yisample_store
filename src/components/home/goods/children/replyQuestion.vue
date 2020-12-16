<template>
    <div class="reply_wrapper">
        <div class="container_wrapper">
            <div class="header">
                <h6>回复</h6>
                <img src="../../../../assets/close.png" @click="close" />
            </div>
            <div class="container">
                <div class="top">
                    <h5>问题:</h5>
                    <span>{{receivedData.content}}</span>
                </div>
                <div class="down">
                    <h5>回复</h5>
                    <textarea type="text" style="resize:none;" v-model="inputValue" />
                </div>
            </div>
            <div class="footer">
                <div class="btn">
                    <div class="com sure" @click="handleSubmit(receivedData.id)">确定</div>
                    <div class="com cancel" @click="close">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputValue: ""
        };
    },
    props: {
        dataList: {
            type: Array
        },
        receivedData: {
            type: Object
        }
    },
    mounted() {
        console.log(this.receivedData, "receivedData");
    },
    methods: {
        handleSubmit(item) {
            if (this.inputValue) {
                this.inputValue = this.inputValue.replace(/\s*/g, "");
            } else if (
                this.inputValue == "" ||
                this.inputValue == undefined ||
                this.inputValue == null
            ) {
                alert("输入内容不能为空");
                return;
            }
            this.$HTTP(this.$httpConfig.consultReply, {
                id: item,
                content: this.inputValue
            })
                .then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: res.data.message,
                            type: "success"
                        });
                    }
                    this.sendMessage();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        sendMessage() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            let todayTime =
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hour +
                ":" +
                minute +
                ":" +
                second;
            console.log(todayTime, "todayTime");
            this.$emit("close",this.inputValue,todayTime);
        },
        close() {
            this.$emit("close");
        }
    }
};
</script>


<style lang="less">
</style>
<style lang="less" scoped>
.reply_wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
    .container_wrapper {
        width: 650px;
        height: 300px;
        border: 1px solid #e8e8e8;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -325px;
        margin-top: -150px;
        .header {
            background: #f8f8f8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            h6 {
                font-size: 13px;
                font-weight: normal;
            }
            img {
                width: 20px;
                height: 20px;
            }
        }
        .container {
            .top {
                margin-top: 30px;
                margin-left: 100px;
                display: flex;
                align-items: center;

                h5 {
                    color: #333;
                    font-size: 14px;
                }
                span {
                    margin-left: 16px;
                    font-size: 14px;
                }
            }
            .down {
                margin-left: 100px;
                margin-top: 10px;
                display: flex;
                align-items: center;
                h5 {
                    color: #333;
                    font-size: 14px;
                }
                textarea {
                    width: 440px;
                    height: 75px;

                    border: 1px solid #e8e8e8;
                    margin-left: 20px;
                }
            }
        }
        .footer {
            margin-top: 28px;
            padding: 10px 0;
            border-top: 1px solid #e8e8e8;
            .btn {
                margin-left: 163px;
                display: flex;
                box-shadow: none;
                border: none;
                .com {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 60px;
                    height: 35px;
                    border-radius: 4px;
                }
                .sure {
                    background: #58b4ff;
                    color: #fff;
                }
                .cancel {
                    border: 1px solid #e8e8e8;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>