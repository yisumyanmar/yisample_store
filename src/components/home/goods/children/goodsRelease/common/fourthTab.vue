<template>
    <div class="mainDiv">
        <div class="title">
            <img class="" src="../../../../../../assets/images/fourthTab/1.png">
            <span class="contentTitle">恭喜您，商品发布成功！</span>
        </div>
        
        <div class="btncss2">
            <el-button class="btnsize" @click="successBtn" type="success">下一步，确认商品发布</el-button>
        </div>
        <span class="line1">
            去店铺查看商品详情>>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重新编辑刚发布的商品>>
        </span>
        <p class="line2">您还可以:</p>
        <p class="line3">
            <span>1. 继续 " <span class="line4">发布新商品</span> "</span>
            <br>
            <span class="line5">2. 进入 " 商家中心" 管理 " <span class="line4">出售中的商品</span> "</span>
        </p>  
    </div>
</template>
<script>
export default {
    name: "goodsrelease",
    data() {
        return {
        status: [true, false],
        index1: "",
        data: ""
        };
    },
    props: {
        data1: null
    },
    methods: {
        successBtn() {
            // if(this.data1) {
                // this.$HTTP(this.$httpConfig.addGoodsPic, {pic_url: this.data1}).then((res) => {
                //     this.$message.success(res.data.message);
                // });
            // }
            // this.$emit('childToParent', {tab: 0})
            parent.location.href = "#/goods?type=goodData";
            parent.location.reload();
            
        }
    },
    created() {
        
    }
};
</script>
<style>
body {
  overflow: inherit;
}
</style>

<style lang="less" scoped>
    .mainDiv {
        border: 1px solid #EEEEEE;
        text-align: center;
        padding: 50px 0;
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 20px;
        }
        .contentTitle {
            font-size: 28px;
            color: #F7BC0A;
            padding-left: 20px;
        }
        .btncss2 {
            display: flex;
            padding-left: 375px;
            // justify-content: center;
            padding-bottom: 20px;
        }
        .line1 {
            font-size: 12px;
            color: #E5AE06;
            display: block;
            padding-left: 70px;
            padding-bottom: 20px;
        }
        .line2 {
            font-size: 14px;
            color: #333333;
            display: block;
            margin-left: -185px;
            padding-bottom: 10px;
        }
        .line3 {
            font-size: 12px;
            color: #333333;
            margin-left: -125px;
        }
        .line4 {
            color: #E5AE06;
        }
        .line5 {
            font-size: 12px;
            margin-left: 105px;
        }
        .btnsize {
            padding: 10px 20px;
        }
    }
</style>
