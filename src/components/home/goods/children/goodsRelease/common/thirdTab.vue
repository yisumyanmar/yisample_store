<template>
    <div>
        <div class="mainDiv">
            <div class="firstDiv">
                <div class="goods_title">
                    <span class="title fl size14">内页产品轮播图</span>
                </div>

                <div class="img-list">
                    <div v-if="fileList.length == 0" style="width: 125px; ">
                        <div class="activeinneruploadDiv" style="border: 2px solid #fafafa;">
                            <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="activeunderimg" style="visibility: hidden; ">
                                <img class="updatecss" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>
                    </div>    
                    <div v-else class="img-content" v-for="(item,key) in fileList" :key="key">
                        <div class="activeinneruploadDiv">
                            <img v-if="item.url && item.name !== null" :class="{active:item.sort==1}" :src="item.url">
                            <img v-else-if="item.url && item.name == null" :class="{active:item.sort==1}" src="../../../../../../assets/images/thirdTab/1.png">
                            <img v-else :class="{active:item.sort==1}" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="activeunderimg">
                                <img class="updatecss" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>  
                        <div class="rowleftright">
                            <div class="uploadleft">排序：{{key+1}}</div>
                            <div class="uploadright">
                                <img class="updatecss" src="../../../../../../assets/images/thirdTab/3.png">
                                <span>上传</span>
                            </div>
                        </div>  
                        <div class="layer" v-if="item.url && item.name !== null">
                            <i class="el-icon-zoom-in" @click="handlePictureCardPreview(item.url)"></i>
                            <i @click="handleRemove(item,key)" class="el-icon-delete"></i>
                            <i @click="setMainImg(item,key)" class="el-icon-picture"></i>
                        </div>
                    </div>

                    
                    <!-- <div>
                        <el-upload 
                            class="avatar-uploader"
                            :action="action" 
                            :show-file-list="false" 
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :on-change="fileChange"
                            :http-request="UploadImage" 
                            :data="uploadData"
                            :on-preview="handlePictureCardPreview"
                            accept=".jpg,.png,.jpeg" 
                            multiple name="fileData"
                        > 
                            <div class="activeinneruploadDiv">
                                <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                                <div class="activeunderimg" style="visibility: hidden; ">
                                    <img class="updatecss" src="../../../../../../assets/images/thirdTab/2.png">
                                    <span>默认主图</span>
                                </div>
                            </div>
                        </el-upload>
                    </div> -->
                    
                </div>
                <div class="btncss1">
                    <!-- :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload" -->
                    <el-upload 
                        class="avatar-uploader"
                        :action="action" 
                        :show-file-list="false" 
                        :on-change="fileChange"
                        :http-request="UploadImage" 
                        :data="uploadData"
                        :on-preview="handlePictureCardPreview"
                        accept=".jpg,.png,.jpeg" 
                        multiple name="fileData"
                        :limit='noOfImg'
                    > 
                        <div class="">
                            <el-button class="btnsize" type="success">
                                <img class="" src="../../../../../../assets/images/thirdTab/imgicon.png">
                                从图片空间中选择
                            </el-button>
                        </div>
                    </el-upload>
                    
                </div>
                <!-- <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb,图片宽度介于{{imageConf.min_width}}~{{imageConf.max_width}},高度介于{{imageConf.min_height}}~{{imageConf.max_height}}
                </div>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div class="button">
                    <span @click="addPicture">确认提交</span>
                </div> -->


                <!-- <div class="uploadDiv">
                    <div>
                        <div class="activeinneruploadDiv">
                            <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="activeunderimg">
                                <img class="" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>
                        <div class="rowleftright">
                            <div class="uploadleft">排序：0</div>
                            <div class="uploadright">
                                <img class="" src="../../../../../../assets/images/thirdTab/3.png">
                                <span>上传</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="inneruploadDiv">
                            <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="underimg">
                                <img class="" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>
                        <div class="rowleftright">
                            <div class="uploadleft">排序：0</div>
                            <div class="uploadright">
                                <img class="" src="../../../../../../assets/images/thirdTab/3.png">
                                <span>上传</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="inneruploadDiv">
                            <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="underimg">
                                <img class="" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>
                        <div class="rowleftright">
                            <div class="uploadleft">排序：0</div>
                            <div class="uploadright">
                                <img class="" src="../../../../../../assets/images/thirdTab/3.png">
                                <span>上传</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="inneruploadDiv">
                            <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="underimg">
                                <img class="" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>
                        <div class="rowleftright">
                            <div class="uploadleft">排序：0</div>
                            <div class="uploadright">
                                <img class="" src="../../../../../../assets/images/thirdTab/3.png">
                                <span>上传</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="inneruploadDiv">
                            <img class="" src="../../../../../../assets/images/thirdTab/1.png">
                            <div class="underimg">
                                <img class="" src="../../../../../../assets/images/thirdTab/2.png">
                                <span>默认主图</span>
                            </div>
                        </div>
                        <div class="rowleftright">
                            <div class="uploadleft">排序：0</div>
                            <div class="uploadright">
                                <img class="" src="../../../../../../assets/images/thirdTab/3.png">
                                <span>上传</span>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- <div class="btncss1">
                    <el-button class="btnsize" @click.native="tolink" type="success">
                        <img class="" src="../../../../../../assets/images/thirdTab/imgicon.png">
                        从图片空间中选择
                    </el-button>
                </div> -->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

                <div class="videogoods_title">
                    <span class="title fl size14">内页产品视频</span>
                </div>
                <ele-upload-video
                    :fileSize="50"
                    @error="handleUploadError"
                    :responseFn="handleResponse"
                    style="margin: 50px"
                    :action="videoaction"
                    v-model="video"
                />
                <div class="btncss2">
                    <el-button class="btnsize" @click="addPicture" type="success">下一步，确认商品发布</el-button>
                </div>
            </div>
            <div class="secondDiv">
                <div class="innersecond">
                    <span class="texttitle">上传要求：</span>
                    <p class="textcontent">
                        1. 请使用jpg、jpeg、png等格式、单张大小不超过4M的正方形图片。<br>
                        2. 上传图片最大尺寸将被保留为1500像素，建议使用尺寸 {{imgMaxH}}*{{imgMinH}}像素。<br>
                        3. 每种颜色最多5张图片，可上传图片或从图片空间中选择已有的图片，上传后的图片也将被保存在店铺图片空间中以便其它使用。<br>
                        4. 通过更改排序数字修改商品图片的显示顺序。<br>
                        5. 图片质量要清晰，不能虚化，要保证亮度充足 <br>
                        6. 操作完成后请点下一步，否则无法在网站生效。<br>
                        7. 商品视频50mb以内的视频上传 <br>
                        <span class="texttitle">建议：</span>
                        1. 主图为白色背景正面图。<br>
                        2. 排序依次为正面图->背面图->侧面图->细节图。
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {Upload} from "element-ui";
import EleUploadVideo from "vue-ele-upload-video";
import qs from 'qs';
export default {
    name: "goodsrelease",
    data() {
        return {
            status: [true, false],
            index1: "",
            data: "",

            action: this.$store.state.image_api_url + "FileUpload/uploadImageToLocal/",
            dialogImageUrl: "",
            dialogVisible: false,
            uploadData: {
                sessionToken: "",
                imageToken: ""
            },
            fileList: [],
            imageConf: {},
            imageToken: "",
            sToken: "", // session token
            uploadFile: [],
            newUrl: '1',
            noOfImg: 8,
            late: null,
            video: "",
            videoaction: this.$store.state.image_api_url + "FileUpload/VideoUpload",
            imgMaxH: 0,
            imgMinH: 0,
        };
    },
    created() {
        this.imageCreated();
        this.imageConfigure();
    },
    components: {
        EleUploadVideo
    },
    methods: {
            handleUploadError(error) {
                console.log("error", error);
            },
            handleResponse(response) {
                return "http://center.shopsn.cn/" + response.data;
            },
            imageCreated() {
                let total = 8 - this.fileList.length
                for(var i = 0; i < total; i++) {
                    this.fileList.push({name: null, url: ""});
                }
            },
            imageList() {
				this.$HTTP(this.$httpConfig.getGoodsImgList, {goods_id: this.$route.params.id}).then((res) => {
					if (!res.data.data) {
						return false
					}
					if (this.fileList.length) return;
					let data = res.data.data;
					for (let key in data) {
						this.fileList.push({
							name: data[key].id,
							url: this.URL + data[key].pic_url,
							old_url: data[key].pic_url,
							sort: data[key].sort
						})
						this.uploadFile.push(data[key].pic_url);
                    }
                    let total = 8 - this.fileList.length
                    for(var i = 0; i < total; i++) {
                        this.fileList.push({name: null, url: ""});
                    }
				});
			},
			fileChange(file) {
                for(var i = 0; i < this.fileList.length; i++) {
                    if(this.fileList[i].name == null && this.fileList[i].url == "") {
                        this.fileList.splice(i, 1, {name: file.name, url: file.url})
                        let ii = this.fileList.length - i
                        this.late = i
                        i+=ii
                    }
                }
				// this.fileList.push({name: file.name, url: file.url});
			},
			setMainImg(item,index){
				var url = [];
				url.push(this.uploadFile[index]);
				this.$HTTP(this.$httpConfig.setGoodsImages,{pic_url:url}).then((res)=>{
					if(res.data.status == 1){
						this.$message.success(res.data.message);
						this.fileList.forEach((item,index)=>{
							this.fileList[index].sort = 50;
						})
						this.fileList[index].sort = 1;

                        for(let i = 0; i < this.fileList.length; i++) {
                            if(this.fileList[i].sort == 1){
                                let temp1 = this.fileList[0]
                                let temp2 = this.fileList[i]
                                this.fileList.splice(i, 1, temp1)
                                this.fileList.splice(0, 1, temp2)
                            }
                        }
					}
				})
			},
			UploadImage(param) {
				this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, 'post').then(res => {
					let data = res.data.data;
					this.imageConf = data.config;
					// this.imageToken = data.token;
					// this.sToken = data.s_token;
					// this.uploadData.sessionToken = data.s_token;
					// this.uploadData.imageToken = data.token;
					const isLt2M = param.file.size / 1024 / 1024 < 3;
					if (!isLt2M) {
						this.$layer.msg("上传头像图片大小不能超过 2MB!");
						return
					}

					var formData = new FormData();
					formData.append("fileData", param.file);
					formData.append("imageToken", data.token);
					formData.append("sessionToken", data.s_token);
					this.axios.post(this.$store.state.image_api_url + "FileUpload/uploadImageToLocal/", formData).then((res) => {
						if (res.data.status == 0) {
							this.$message({
								duration: 1000,
								type: "error",
								message: res.data.message
                            });
                            
                            // this.fileList.splice(this.fileList.length-1);
                            this.fileList.splice(this.late, 1, {name: null, url: ""})

						} else {
							this.newUrl = res.data.data;
							// this.fileList[this.fileList.length - 1].url = this.URL + res.data.data
                            this.fileList[this.late].url = this.URL + res.data.data
                            console.log(this.fileList)
                            this.uploadFile.push(res.data.data);

						}
					})

				}).catch((res) => {
					let data = res.data.data;
					this.$layer.msg(data.token);
				});
			},
			//图片配置
			imageConfigure() {
				this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, 'post').then(res => {
					let data = res.data.data;
					this.imageConf = data.config;
					this.imageToken = data.token;
                    this.sToken = data.s_token;
                    this.imgMaxH = data.config.max_height;
                    this.imgMinH = data.config.min_height;
				}).catch((res) => {
					let data = res.data.data;
					this.$layer.msg(data.message);
				});
			},
			// 删除回调
			handleRemove(file, index) {
				//	console.log('del1', this.uploadFile)
				let newUrl = file.url.substring(29);
				this.axios.post(this.$httpConfig.delGoodsImgByDb, qs.stringify({
					id: file.name,
					token: sessionStorage.getItem("data_token")
				})).then(res => {
					//找到删除的图片并在数据里删除
					if (res.data.status == 1) {
						//	console.log('del2', this.uploadFile)
						this.$message.success(res.data.message);
					}
					let index = this.uploadFile.indexOf(newUrl);
					this.uploadFile.splice(index, 1);
					// this.fileList.splice(index, 1);

                    for(let i = 0; i < this.fileList.length; i++) {
                        if(this.fileList[i].name == file.name) {
                            this.fileList.splice(i, 1);
                            this.fileList.push({name: null, url: ""});
                        }
                    }
					// this.uploadFile.forEach((value,index)=>{
					// 	if(value == newUrl){
					// 		this.uploadFile.splice(index,1);
					// 	}
					// })
				}).catch(function (error) {
					console.log(error);
				});

			},
			//显示
			handlePictureCardPreview(url) {
				this.dialogImageUrl = url;
				this.dialogVisible = true;
			},
			// 上传成功
			success(response, file, fileList) {
				this.$layer.msg(response.message);
				if (response.status == 0) {
					let length = fileList.length;
					let i = 0;
					for (i; i < length; i++) {
						if (fileList[i].name === file.name) {
							fileList.splice(i, 1);
						}
					}
				} else {
					this.uploadFile.push(response.data);
				}
			},
			// 上传之前
			beforeUploade(file) {

				this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, 'post').then(res => {
					let data = res.data.data;
					this.imageConf = data.config;
					this.imageToken = data.token;
					this.sToken = data.s_token;
					this.uploadData.sessionToken = data.s_token;
					this.uploadData.imageToken = data.token;
					const isLt2M = file.size / 1024 / 1024 < 3;
					if (!isLt2M) {
						this.$layer.msg("上传头像图片大小不能超过 2MB!");
					}
					return isLt2M;

				}).catch((res) => {
					let data = res.data.data;
					this.$layer.msg(data.message);
				});
            },
            // 添加图片
			addPicture() {
				this.$HTTP(this.$httpConfig.addGoodsPic, {pic_url: this.uploadFile,video:this.video}).then((res) => {
					this.$message.success(res.data.message);
                    this.$emit('thirdToParent', {tab: 3, uploadData: this.uploadFile})
                    this.$emit('selectTab');
					this.$store.state.tab_state = 3;
					if (!this.$store.state.tab_Index[3]) {
						this.$store.state.tab_Index.push(3);
					}
				});
			}
			
        
    }
};
</script>
<style>
body {
  overflow: inherit;
}
</style>

<style lang="less" scoped>
.activeinneruploadDiv {
    border: 1px solid #F7BC0A;
    margin-top: 10px;
    margin-bottom: 10px;
}
.activeunderimg {
    display: flex;
    align-items: center; 
    justify-content: space-evenly;
}
.inneruploadDiv {
    border: 1px solid #E5E5E5;
    margin-top: 10px;
    margin-bottom: 10px;
}
.rowleftright {
    display: flex;
    border: 1px solid #ECECEC;
}
.uploadleft {
    font-size: 12px;
    color: #666666;
    width: 50%;
    text-align: center;
}
.uploadright {
    font-size: 12px;
    color: #666666;
    width: 50%;

    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.center_else {
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    line-height: 70px;
    color: red;
}

.el-upload__input {
    display: none !important;
}

.el-upload--picture-card i {
    line-height: inherit;
}
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 348px !important;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    margin-left: 63px !important;
    margin-top: -10px;
    margin-bottom: 10px;
}
.img-list {
    overflow: hidden;
    width: 100%;
}

.img-list .img-content {
    float: left;
    position: relative;
    display: inline-block;
    width: 148px;
    width: 115px;
    // height: 148px;
    margin: 5px 20px 20px 0;
    margin: 0;
    margin-right: 25px;
    border: 1px solid none;
    border-radius: 4px;
    transition: all .3s;
    height: 200px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    .active{
        border: 3px solid #ff0000;
    }
}

.img-list .img-content img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin: 0;
    border-radius: 4px;
}
.updatecss {
    width: auto !important;
    height: auto !important;
    margin: 0;
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
    transition: all .3s;
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
    background-color: rgba(0, 0, 0, .4);
}

.img-list .img-content .layer i {
    font-size: 1.6em;
    margin-top: 60px;
    margin-left: .3rem;
}

.button {
    height: 32px;
    margin: 20px 0 20px 135px;
    border-radius: 6px;
    background: #f7bc0a;
    width: 199px;

    span {
        display: block;
        line-height: 32px;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
}
    .mainDiv {
        display: flex;
        justify-content: space-between;
    }
    .secondDiv {
        width: 30%;
        border: 1px solid #D5EFF8;
        background: #EEF7FF;
        .innersecond {
            line-height: 2;
            padding: 15px;
        }
        .texttitle {
            color: #F7BC0A;
            font-size: 14px;
            display: block;
        }
        .textcontent {
            color: #474544; 
            font-size: 12px;
        }
    }
    .firstDiv {
        width: 68%;
        .uploadDiv {
            display: flex;
            justify-content: space-between;
            .activeinneruploadDiv {
                border: 1px solid #F7BC0A;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .inneruploadDiv {
                border: 1px solid #E5E5E5;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            
            .rowleftright {
                display: flex;
                border: 1px solid #ECECEC;
            }
            .uploadleft {
                font-size: 12px;
                color: #666666;
                width: 50%;
                text-align: center;
            }
            .uploadright {
                font-size: 12px;
                color: #666666;
                width: 50%;

                background: #F5F5F5;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
            }
            .activeunderimg {
               display: flex;
               align-items: center; 
               justify-content: space-evenly;
            }
            .underimg {
               display: flex;
               align-items: center; 
               justify-content: space-evenly;
               
               //to hide but take place
               visibility:hidden;
               //    opacity: 0;
               //    background: transparent;
               //    color: transparent;
            }
        }
        .btnsize {
            padding: 10px 20px;
        }
        .btncss1 {
            margin-top: 25px;
        }
        .btncss2 {
            display: flex;
            justify-content: center;
            margin-top: 50px;
        }
    }
    .goods_title {
        border-right: 0;
        position: relative;
        background: #F6F6F6;
        padding: 10px 15px;
        display: flex;
      .title {
        color: #333333;
      }
    }
    .videogoods_title {
        border-right: 0;
        position: relative;
        background: #F6F6F6;
        padding: 10px 15px;
        display: flex;
        margin-top: 30px;
      .title {
        color: #333333;
      }
    }
</style>
