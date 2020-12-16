<template>
    <div class="foot">
       {{configInfo[11].config_value}}
    </div>
</template>
<script>
export default {
    name: "foot",
    data(){
        return{
            configInfo:[]
        }
    },
    created() {
        this.getConfigInfo();
    },
    methods: {
        getConfigInfo() {
            this.$HTTP(this.$httpConfig.getHome, {})
                .then(res => {
                    this.configInfo = res.data.data.config;
                    console.log(res.data.data.config, 1122);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.foot {
    height: 52px;
    background-color: #474544;
    text-align: center;
    color: #fff;
    line-height: 52px;
    width: 100%;
    display: block;
    position: fixed;
    bottom: 0;
}
</style>
