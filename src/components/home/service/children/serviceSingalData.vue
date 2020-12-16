<template>
    <div class="serviceSingalData-wrapper">
        <div class="intrduce">
            <div class="title">
                说明:
            </div>
            <ul>
                <li>1.管理员可以查看全部信息</li>
                <li>
                    2.只有管理员可以删除信息,删除后其他账户该条信息也会被删除
                </li>
            </ul>
        </div>
        <div class="message">
            <p>消息内容:</p>
            <span>{{ singalServiceData.sm_content }}</span>
        </div>
        <div class="time">
            <p>发送时间:</p>
            <span>{{ singalServiceData.sm_addtime | formatDate }}</span>
        </div>
        <el-button @click="back">返回上级</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            singalServiceData: {}
        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
        this.checkSingalData();
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {},
    methods: {
        checkSingalData() {
            this.$HTTP(this.$httpConfig.serviceSingalData, {
                id: this.$route.query.id
            })
                .then(res => {
                    this.singalServiceData = res.data.data;
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        back() {
            this.$router.push({
                name: "serviceMessage"
            });
        }
    },
    components: {}
};
</script>
<style lang="less">
.serviceSingalData-wrapper {
    .el-button {
        position: absolute;
        left: 40%;
        top: 50%;
    }
}
</style>
<style lang="less" scoped>
.serviceSingalData-wrapper {
    .intrduce {
        background: rgba(79, 192, 232, 0.11);
        .title {
            color: #0ba4da;
            font-size: 16px;
            padding: 10px;
        }
        ul {
            margin: 10px;
            padding-bottom: 10px;
            li {
                margin: 5px 0;
                color: #0ba4da;
                font-size: 13px;
            }
        }
    }
    .message {
        display: flex;
        align-items: center;
        margin: 10px;
        font-size: 16px;
        color: #333;
        p {
            font-size: 16px;
            color: #333;
        }
        span {
            margin-left: 10px;
            font-size: 16px;
            color: #333;
        }
    }
    .time {
        display: flex;
        align-items: center;
        margin: 10px;
        p {
            font-size: 16px;
            color: #333;
        }
        span {
            margin-left: 10px;
            font-size: 16px;
            color: #333;
        }
    }
}
</style>
