<template>
    <div class="storeNoticeItem-wrapper">
        <div class="show-detail">
            <div class="container">
                <h5>举报违规-列表:</h5>
                <div class="wrapper">
                    <div class="notice">温馨提示</div>
                    <ul>
                        <li>1<span>请填写证明内容</span></li>
                        <li>2<span>请上传相关证明</span></li>
                        <li>
                            3<span>提交后,工作人员会在3-5个工作日审查</span>
                        </li>
                    </ul>
                </div>
                <div class="com">
                    <h6>相关商品:</h6>
                    <span>{{ reportDetailData.title }}</span>
                </div>
                <div class="com">
                    <h6>举报类型:</h6>
                    <span>{{ reportDetailData.type }}</span>
                </div>
                <div class="com">
                    <h6>举报主题:</h6>
                    <span>{{ reportDetailData.topic }}</span>
                </div>
                <div class="com">
                    <h6>举报内容:</h6>
                    <span>{{ reportDetailData.content }}</span>
                </div>
                <div class="com">
                    <h6>图片展示:</h6>
                    <!--预览-->

                    <show-img :reportDetailData="reportDetailData"></show-img>
                </div>
            </div>
            <div class="input-wrapper">
                <div
                    class="el-input-wrapper"
                    v-if="reportDetailData.store_status == 0"
                >
                    <h6>申诉内容:</h6>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="textarea"
                    >
                    </el-input>
                </div>

                <div
                    v-if="reportDetailData.store_status == 1"
                    class="inner-input-wrapper"
                >
                    证明内容:
                    {{ reportDetailData.store_content }}
                </div>
            </div>
            <div
                class="select-wrapper"
                v-if="reportDetailData.store_status == 0"
            >
                <h5>申诉图片:</h5>
                <div class="img-list">
                    <div
                        class="img-content"
                        v-for="(item, key) in fileList"
                        :key="key"
                    >
                        <img :src="item.url" />
                        <!-- 放大icon -->
                        <div class="layer">
                            <i
                                class="el-icon-zoom-in"
                                @click="handlePictureCardPreview1(item.url)"
                            ></i>
                            <i
                                @click="handleRemove(item, key)"
                                class="el-icon-delete"
                            ></i>
                        </div>
                    </div>
                    <div style="margin-top: 5px">
                        <el-upload
                            :action="action"
                            :http-request="UploadImage"
                            :on-change="fileChange"
                            list-type="picture-card"
                            accept=".jpg,.png,.jpeg"
                            :show-file-list="false"
                            multiple
                            name="fileData"
                            :data="uploadData"
                            :on-preview="handlePictureCardPreview1"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </div>
            <div
                class="select-wrapper"
                v-if="reportDetailData.store_status == 1"
            >
                <div class="another">
                    <h3>图片:</h3>
                    <div class="imgitem-wrapper" ref="imgDom">
                        <img
                            v-for="(item, index) in handleStorePic"
                            :key="index"
                            :src="URL + item"
                            preview="index"
                            preview-text="描述文字"
                        />
                    </div>
                    <!-- <img :src="URL + reportDetailData.store_pic_url" alt="" /> -->
                </div>
            </div>

            <el-button
                style="margin-bottom: 100px"
                @click="confirm"
                v-if="reportDetailData.store_status == 0"
                >确认提交</el-button
            >
            <el-button
                style="margin-bottom: 100px"
                @click="back"
                v-if="reportDetailData.store_status == 1"
                >返回列表</el-button
            >
        </div>
    </div>
</template>

<script>
import ShowImg from "./imgShow";
export default {
    data() {
        return {
            resStatus: "", //正确获取图片状态
            checkPic: [], //检查图片是否满足要求
            picArr: [], //接受多张图片
            figureCollection: [], //图片路径
            dialogImageUrl: "",
            dialogVisible: false,
            imgURL: "agent.shopsn.cn",
            textarea: "",
            reportDetailData: {},
            imgIndex: -1,
            showImgClick: false,
            fileList: [],
            action:
                this.$store.state.image_api_url +
                "FileUpload/uploadImageToLocal/",
            uploadData: {
                sessionToken: "",
                imageToken: ""
            },
            uploadFile: []
        };
    },

    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        //获取列表详情
        this.getDetailInfo(this.$route.query.id);
    },
    computed: {
        handlePicture() {
            if (this.reportDetailData.pic_url) {
                return this.reportDetailData.pic_url.split(",");
            } else {
                return this.reportDetailData.pic_url;
            }
        },
        handleStorePic() {
            if (this.reportDetailData.store_pic_url) {
                return this.reportDetailData.store_pic_url.split(",");
            } else {
                return this.reportDetailData.store_pic_url;
            }
        }
    },
    methods: {
        back() {
            this.$router.push({
                name: "storeNotice"
            });
        },
        getDetailInfo(id) {
            this.$HTTP(
                this.$httpConfig.reportDetail,
                {
                    id: id
                },
                "post"
            )
                .then(res => {
                    this.reportDetailData = res.data.data;
                    this.getID = Number(id);
                    console.log(res.data.data, 444);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //检验输入信息
        checkMessage() {
            if (this.textarea.match(/^\s*$/)) {
                this.$message.error("请输入举报内容");
                return;
            } else if (this.fileList.length == 0) {
                this.$message.error("请上传凭证");
                return;
            } else {
                this.$router.push({
                    path: "/storeNotice"
                });
            }
        },
        UploadImage(param) {
            this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, "post")
                .then(res => {
                    let data = res.data.data;
                    this.imageConf = data.config;
                    // this.imageToken = data.token;
                    // this.sToken = data.s_token;
                    // this.uploadData.sessionToken = data.s_token;
                    // this.uploadData.imageToken = data.token;
                    const isLt2M = param.file.size / 1024 / 1024 < 3;
                    if (!isLt2M) {
                        this.$layer.msg("上传头像图片大小不能超过 2MB!");
                        return;
                    }

                    var formData = new FormData();
                    formData.append("fileData", param.file);
                    formData.append("imageToken", data.token);
                    formData.append("sessionToken", data.s_token);
                    this.axios
                        .post(
                            this.$store.state.image_api_url +
                                "FileUpload/uploadImageToLocal/",
                            formData
                        )
                        .then(res => {
                            if (res.data.status == 0) {
                                this.$message({
                                    duration: 1000,
                                    type: "error",
                                    message: res.data.message
                                });
                                this.fileList.splice(this.fileList.length - 1);
                            } else {
                                this.newUrl = res.data.data;
                                this.fileList[this.fileList.length - 1].url =
                                    this.URL + res.data.data;
                                this.uploadFile.push(res.data.data);
                            }
                        });
                })
                .catch(res => {
                    let data = res.data.data;
                    this.$layer.msg(data.token);
                });
        },
        fileChange(file) {
            console.log("fileChange");
            this.fileList.push({ name: file.name, url: file.url });
        },
        confirm() {
            this.$HTTP(
                this.$httpConfig.commitReport,
                {
                    id: this.$route.query.id,
                    pic_url: this.uploadFile.join(","),
                    content: this.textarea.replace(/\s+/g, "")
                },
                "post"
            )
                .then(res => {
                    if (res.data.status == 1) {
                        this.$message.success(res.data.message);
                        this.checkMessage();
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //上传路径
        difficulty() {
            return this.$httpConfig.upLoadImage;
        },
        //上传成功，在数组中添加获取后的路径
        succeed(response, file, fileList) {
            //判断有没有上传图片
            this.resStatus = fileList;
            //存储删除的状态
            this.checkPic.push(Number(response.status));
            //将传入的图片放进数组
            this.picArr.push(response.data);
            this.figureCollection.push(file.response.data);
        },
        handlePictureCardPreview1(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        //取消图片上传
        handleRemove(file, index) {
            this.uploadFile.splice(index, 1);
            this.fileList.splice(index, 1);
        },
        // 图片最大数之后
        beyond() {
            this.$message.warning("做多五张图片");
        }
    },
    components: {
        ShowImg
    }
};
</script>
<style lang="less">
.storeNoticeItem-wrapper {
    .el-textarea__inner {
        width: 800px;
    }
}
</style>
<style lang="less">
.img-list {
    overflow: hidden;
    width: 100%;
}

.img-list .img-content {
    float: left;
    position: relative;
    display: inline-block;
    width: 148px;
    height: 148px;
    margin: 5px 20px 20px 0;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    transition: all 0.3s;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    .active {
        border: 3px solid #ff0000;
    }
}

.img-list .img-content img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 4px;
}

.img-list .img-content .name {
    margin-top: 10px;
}

.img-list .img-content .name > div {
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 25px;
    line-height: 25px;
}

.img-list .img-content:hover .del,
.img-list .img-content:hover .layer {
    opacity: 1;
}

.img-list .img-content .del,
.img-list .img-content .layer {
    opacity: 0;
    transition: all 0.3s;
}

.img-list .img-content .del {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #8492a6;
    cursor: pointer;
    font-size: 1.1em;
}

.img-list .img-content .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 148px;
    color: #fff;
    text-align: center;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.4);
}

.img-list .img-content .layer i {
    font-size: 1.6em;
    margin-top: 60px;
    margin-left: 0.3rem;
}

.storeNoticeItem-wrapper {
    .el-upload__input {
        display: none;
    }
    .el-button {
        position: absolute;
        left: 50%;
    }
}
</style>
<style lang="less" scoped>
.storeNoticeItem-wrapper {
    .show-detail {
        .container {
            h5 {
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
            .com {
                margin: 30px 0;
                h6 {
                    display: inline-block;
                    font-size: 16px;
                }
                span {
                    font-size: 16px;
                    margin-left: 5px;
                }
            }
        }
        .input-wrapper {
            margin-left: 30px;
            display: flex;
            align-items: center;
            h6 {
                margin: 10px;
                font-size: 16px;
            }
            .inner-input-wrapper {
                margin-left: 12px;
                font-size: 16px;
            }
        }
        .select-wrapper {
            margin-left: 30px;
            h5 {
                margin: 10px;
                font-size: 16px;
            }
            .another {
                h3 {
                    font-size: 16px;
                    margin: 10px;
                }
                img {
                    width: 200px;
                    height: 200px;
                }
            }
        }
    }
}
</style>
