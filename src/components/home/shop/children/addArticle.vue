<template>
  <div class="logistics fl">
    <!-- 店铺-添加文章 -->
    <div class="t_tab">
        <h1 class="t_title">
            <span class="size16"></span>
            <span v-if="!status" class="size16">文章列表 - 文章添加</span>
			<span v-else class="size16">文章列表 - 文章修改</span>
            <div class="t_m fr" @click="tolink">返回文章列表</div>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x" >
            <tr>
                <td width="15%" align="right" class="black"><b>*</b> 文章分类： </td>
                <td width="85%">
                    <el-select v-model="params.category_id" placeholder="请选择" style="width: 300px;margin: 10px 0;">
                        <el-option v-for="(items, index) in artType" :key="index" :label="items.name" :value="items.id">
                        </el-option>
                  </el-select>
                </td>         
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>文章标题： </td>
                <td>
                    <el-input
                            v-model="params.title"
                            placeholder="请输入内容"
                            clearable
                            style="width: 300px;height: 40px;"
                        >
                        </el-input>
                    <span class="notes">最多输入30个字</span> 
                </td>
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>关键字：</td>
                <td>
                    <el-input 
                        v-model="params.keyword" 
                        :maxlength="60" 
                        size="medium" 
                        style="width: 300px; padding-left: 12px;margin-left: -12px;"
                        clearable
                    >
                    </el-input>
                    <span class="notes">最多输入50个字，多关键词之前用空格或者 "," 隔开</span>
                </td>   
            </tr>
            <tr>
                <td align="right" class="black">来源：</td>
                <td>
                    <el-input  
                        v-model="params.source" 
                        :maxlength="60" 
                        size="medium" 
                        style="width: 300px; padding-left: 12px;margin-left: -12px;" 
                        clearable>
                    </el-input>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">文章缩略图：</td>
                <td>
                    <!-- :on-remove="handleRemove" 
                    :on-exceed="exceeding"
                    :on-preview="handlePictureCardPreview" 
                    :before-upload="beforeUploade" 
                    :on-success="handleAvatarSuccess" 
                    :data="uploadData" -->
                    <el-upload
                        :action="action"
                        :http-request="UploadImage"
                        list-type="picture-card"
                        accept=".jpg,.png,.jpeg"
                        name="pic"
                        :file-list="fileList"
                        :on-change="fileChange" 
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <!-- <span class="up_btn">选择上传...</span> -->
                    <span class="notes">建议上传 300*200 像素的图片</span>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">是否显示：</td>
                <td>
                    <el-switch
                        v-model="params.display"
                        inactive-text="否"
                        active-text="是"
                        active-color="#f7bc0a">
                    </el-switch>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">是否推荐：</td>
                <td>
                    <el-switch
                        v-model="params.recommend"
                        inactive-text="否"
                        active-text="是"
                        active-color="#f7bc0a">
                    </el-switch>
                    <span class="notes">控制文章是否在前台列表推荐位上展示</span>                    
                </td>               
            </tr>
             <tr>
                <td align="right" class="black">文章摘要：</td>
                <td>
                    <el-input
                        type="textarea"
                        :rows="2"
                        :column="20"
                        class="abstract"
                        placeholder="请输入内容"
                        v-model="params.intro"
                    >
                    </el-input>
                    <!-- <span class="notes">最多输入100字</span> -->
                </td>   
            </tr>
            <tr>
                <td align="right" class="black">文章摘要：</td>
                <td>
                    <div class="fl">
                        <UE :defaultMsg="params.content" :config="config" ref="ue"></UE>
                    </div>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">排序：</td>
                <td>
                    <el-input 
                        v-model="params.sort" 
                        clearable 
                        style="width: 300px;" 
                        type="number"
                    >
                    </el-input>   
                    <span class="notes">数字范围 0~9999 ，数字越小越靠前</span>
                </td>   
            </tr>
            <tr>
                <td align="right">&nbsp;</td>
                <td colspan="2"><span class="Settled" @click="submit" style="background:#f7bc0a; width:199px;">确认提交</span></td>
            </tr>
        </table>
    </div>
  </div>
</template>
<script>
import UE from '../../goods/children/goodsRelease/children/UE';
export default {
  name:'addarticle',
  data () {
    return {
        defaultMsg: '',
        config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
        },
        action: this.$store.state.image_api_url + "FileUpload/uploadImageToLocal/",
        uploadData: {
            sessionToken: "",
            imageToken: ""
            },
        params:{
            category_id:'',
            title:'',
            keyword:'',
            source:'',
            pic:'',
            display: false,
            recommend: false,
            intro:'',
            content:'',
            sort:''
        },
        status: 0,
        id: 0,
        artType: [],
        uploadFile: '',
        fileList:[],
    }
  },
  components:{
    UE
  },
    created(){
        this.getArticle();
    },
    mounted() {
	
			this.status = this.$route.params.status;
			if (this.status) {
				/*修改*/
				this.id = this.$route.params.id;
				this.queryData();
			}
		},
    methods:{
        tolink(){
            this.$router.back(); 
        },
        //文章分类选择
        getArticle() {
            this.axios.post(this.$httpConfig.getStoreArticle, {})
            .then((res) => {
                this.artType = res.data.data;    
            })
        },
        queryData(){
            this.$HTTP(this.$httpConfig.getArticleDetail, {id : this.id}, 'post').then((res) => {
                this.fileList = []
                if(res.data.data.pic) {
                    this.fileList.push({name: res.data.data.pic, url: this.URL + res.data.data.pic});
                    this.uploadFile = res.data.data.pic;
                }
                this.params = res.data.data;
                this.params.display = res.data.data.display == "0" ? false : true
                this.params.recommend = res.data.data.recommend == "0" ? false : true
                let ee = document.createElement('div');
                ee.innerHTML = this.params.content;
                let ss = ee.childNodes[0].nodeValue;
                this.$refs.ue.editor.setContent(ss);
			}).catch((err) => {
				this.$message.error(err);
			});
        },
        submit(){
            this.params.pic = this.uploadFile
            this.params.display = this.params.display == false ? 0 : 1
            this.params.recommend = this.params.recommend == false ? 0 : 1
            this.params.content = this.$refs.ue.getUEContent();
            if(this.status){
                this.$HTTP(this.$httpConfig.saveArticle,this.params,'post').then((res) => {
                    this.$message.success(res.data.message);
                    this.to();
                }).catch((err) => {
                    this.$message.error(err);
                    console.log('err');
                    this.params.display = this.params.display == 0 ? false : true
                    this.params.recommend = this.params.recommend == 0 ? false : true
                })  
            }else{
                console.log("hello ", this.params)
                this.$HTTP(this.$httpConfig.addStoreArticle,this.params,'post').then((res) => {
                    this.$message.success(res.data.message);
                    this.to();
                }).catch((err) => {
                    this.$message.error(err);
                    console.log('err');
                }) 
            }
        },
        to() {
			this.$router.push({
                name: 'articlelist'
            });
		},
        handlePictureCardPreview(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },   
        fileChange(file) {
            this.fileList = []
            this.fileList.push({name: file.name, url: file.url});
        }, 
        imageConfigure() {
            this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, 'post').then(res => {
                let data = res.data.data;
                this.imageConf = data.config;
                this.imageToken = data.token;
                this.sToken = data.s_token;
            }).catch((res) => {
                let data = res.data.data;
                this.$layer.msg(data.message);
            });
        },
        UploadImage(param) {
            this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, 'post').then(res => {
                let data = res.data.data;
                this.imageConf = data.config;
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
                        this.fileList = []
                    } else {
                        this.uploadFile = res.data.data;
                    }
                })

            }).catch((res) => {
                let data = res.data.data;
                this.$layer.msg(data.token);
            });
        },

    }
}
</script>
<style lang="less">
    .t_tab {
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
              .t_m {
                    background: url(../../../../assets/return.jpg) no-repeat 15px #ff9f24;
                    width: 135px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 35px;
                }
          }
    }
    .el-switch {
      .el-switch__core {
        width: 35px!important;
        height:16px;
        .el-switch__button {
          width: 11px;
          height: 11px;
        }
      }
        .el-switch__label{
          color:#a4a5a7;
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
    .logistics {
        width: 1042px;
        .Commodity-management {
                background-color: #f6f6f6;
                border: 1px solid #dddddd;
                margin-top: 15px;
                line-height: 50px;
                margin-bottom: 20px;
                input {
                    width: 140px;
                    border: 1px solid #ddd;
                    line-height: 29px;
                    height: 29px;
                    color: #999;
                    text-indent: 5px;
                }
            }
        .bold {
            font-weight: bold;
        }
        .black {
            color: #333;
        }
          .logistics_x {
              tr {
                  td {
                    padding: 10px 0;
                    .ss {
                        margin:0;
                    }
                    b{
                        color: #ff0000;
                    }
                    .notes {
                        padding-left:0px;
                    }
                    input,select {
                        padding-left: 5px;
                        width: 288px;
                        height: 32px;
                        border: 1px solid #cccccc;
                    }
                    .up{
                        width:220px;
                    }
                    .up_btn {
                        display: inline-block;
                        width:70px;
                        height:36px;
                        text-align:center;
                        background:#e6e6e6;
                        line-height:34px;
                        cursor: pointer;
                    }
                    textarea {
                        padding-left: 5px;
                        padding-top: 5px;
                        min-height: 50px;
                        border: 1px solid #cccccc;
                    }
                    .abstract {
                        min-height: 70px;
                        width: 300px;
                    }
                    .Settled {
                        height: 32px;
                        line-height: 32px;
                        color: #FFF;
                        text-align: center;
                        display: block;
                        border-radius: 6px;
                        margin-top: 30px;
                        float: left;
                        margin-right: 20px;
                        cursor: pointer;
                    }
                  }
              }
          }
        }
</style>