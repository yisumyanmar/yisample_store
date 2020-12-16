<template>
    <div class="img-wrapper">
        <div class="imgitem-wrapper" ref="imgDom">
            <img
                v-for="(item, index) in handlePicture"
                :key="index"
                :src="URL + item"
                preview="index"
                preview-text="描述文字"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgIndex: -1,
            showImgClose: false,
            showMask: false
        };
    },
    props: {
        reportDetailData: {
            type: Object,
            default: null
        }
    },
    computed: {
        handlePicture() {
            if (this.reportDetailData.pic_url) {
                return this.reportDetailData.pic_url.split(",");
            } else {
                return this.reportDetailData.pic_url;
            }
        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        this.$previewRefresh();
    },
    methods: {
        handleImgScale(index) {
            this.imgIndex = index;
            this.showImgClose = true;
            this.showMask = true;
            this.showImgMask();
        },
        closeImg() {
            this.imgIndex = -1;
            this.showImgClose = false;
            this.hideImgMask();
        },
        hideImgMask() {
            this.$nextTick(el => {
                this.$refs.imgDom.style.background = "#fff";
                this.$refs.imgDom.style.position = "relative";
            });
        },
        showImgMask() {
            this.$nextTick(el => {
                this.$refs.imgDom.style.background = "rgba(0, 0, 0, 0.3)";
                this.$refs.imgDom.style.position = "fixed";
                this.$refs.imgDom.style.left = 0;
                this.$refs.imgDom.style.top = 0;
                this.$refs.imgDom.style.height = 100 + "%";
                this.$refs.imgDom.style.width = 100 + "%";
                this.$refs.imgDom.style.zIndex = 1111;
            });
        }
    },
    components: {}
};
</script>
<style lang="less">
.img-wrapper {
}
</style>
<style lang="less" scoped>
.img-wrapper {
    .imgitem-wrapper {
        margin: 10px 0;
        img {
            margin-left: 5px;
            width: 200px;
            height: 100px;
            transform: scale(1);
            transition: all ease 0.2s;
        }
        .img-close {
            height: 35px;
            width: 35px;
            position: absolute;
            left: 75%;
            top: 37%;
            z-index: 111;
        }
        img.active {
            transform: scale(3);
            position: absolute;
            left: 40%;
            top: 50%;
        }
    }
}
</style>
