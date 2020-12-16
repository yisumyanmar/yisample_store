<template>
	<div>
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>请在2分钟内添加图片，否则保存后点击“确认提交”按钮重新进入此页面修改。</p>
				<p>上传图片的宽高请在指定范围内，超过或过低将不能上传成功</p>
			</div>
		</div>
		<div>

			<div class="img-list">
				<div class="img-content" v-for="(item,key) in fileList" :key="key">
					<img :class="{active:item.sort==1}" :src="item.url">
					<!-- 放大icon -->
					<div class="layer">
						<i class="el-icon-zoom-in" @click="handlePictureCardPreview(item.url)"></i>
						<i @click="handleRemove(item,key)" class="el-icon-delete"></i>
						<i @click="setMainImg(item,key)" class="el-icon-picture"></i>
					</div>
				</div>
				<div style="margin-top: 5px">
					<el-upload :action="action" :http-request="UploadImage" :on-change="fileChange"
							   list-type="picture-card"
							   accept=".jpg,.png,.jpeg" :show-file-list="false" multiple name="fileData"
							   :data="uploadData"
							   :on-preview="handlePictureCardPreview">
						<i class="el-icon-plus"></i>
					</el-upload>
				</div>
			</div>


			<div slot="tip" class="el-upload__tip">
				只能上传jpg/png文件，且不超过500kb,图片宽度介于{{imageConf.min_width}}~{{imageConf.max_width}},高度介于{{imageConf.min_height}}~{{imageConf.max_height}}
			</div>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<div class="button">
				<span @click="addPicture">确认提交</span>
			</div>
		</div>
		<!-- <div v-else  class="center_else">
            请先完成商品信息
        </div> -->
	</div>
</template>
<script>
	import {Upload} from "element-ui";
	import qs from 'qs';
	import returnsVue from "../../../../../returns/returns.vue";

	export default {
		data() {
			return {
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
				newUrl: '1'
			};
		},
		created() {
			this.imageList();
		},
		props: {
			s: ''
		},
		methods: {
			//图片列表
			imageList(s) {
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
				});
			},
			fileChange(file) {
				this.fileList.push({name: file.name, url: file.url});
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
							this.fileList.splice(this.fileList.length-1);
						} else {
							this.newUrl = res.data.data;
							this.fileList[this.fileList.length - 1].url = this.URL + res.data.data
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
					// let index = this.uploadFile.indexOf(newUrl);
					this.uploadFile.splice(index, 1);
					this.fileList.splice(index, 1);

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
				this.$HTTP(this.$httpConfig.saveGoodsImg, {pic_url: this.uploadFile}).then((res) => {
					this.$message.success(res.data.message);
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
</style>
<style lang="less" scoped>


	* {
		box-sizing: border-box;
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
		height: 148px;
		margin: 5px 20px 20px 0;
		border: 1px solid #d1dbe5;
		border-radius: 4px;
		transition: all .3s;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
		.active{
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
</style>
