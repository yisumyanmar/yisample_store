<template>
    <div class="right">
        <!-- {{$store.state.link}} -->
        <iframe  
        	id="show-iframe" 
        	frameborder=0 
        	style="overflow: scroll;" 
        	name="iframe" 
        	width="100%" 
        	height="100%" 
        	onload="window.parent" 
        	scrolling="yes" 
        	:src="'#/' + $store.state.link">
        </iframe>

    </div>
</template>
<script>
    export default {
        name : 'home',
        data(){
            return {
                loading:true,
                topHeight: 62, //顶部高度
                footerHeight : 25,
                leftWidth : 190,
                list:[{url:'index',title:'欢迎页'}]
            }
        },
        created(){
            // console.log(this.$store.state.orderState)
        },
        methods:{
            // 取窗口可视范围的高度
             getClientHeight () {
                var clientHeight = 0;
                if(document.body.clientHeight&&document.documentElement.clientHeight){
                    var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
                }
                else{
                    var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
                }
                return clientHeight;
            }
        },
        mounted() {
            const oIframe = document.getElementById("show-iframe");
            let deviceHeight = document.documentElement.clientHeight;
            oIframe.height = this.getClientHeight() - this.topHeight - this.footerHeight;
            oIframe.style.display = "block";
        
            window.onresize = () => {
            var iframe = window.parent.document.getElementById("show-iframe");
            var width = document.documentElement.clientWidth;
                if (iframe) {
                    iframe.height = this.getClientHeight() - this.topHeight - this.footerHeight;
                }
            }
        },
    }
</script>
<style lang="less" scoped>
        .right{
            width: 1042px;
            border-right: 1px solid #dddddd;
            padding: 16px;
            background-color: #FFF;
            min-height: 800px;
            overflow: hidden;
            float: left;
        }
        
</style>