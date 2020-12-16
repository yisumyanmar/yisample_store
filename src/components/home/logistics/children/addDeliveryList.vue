<template>
	<div class="logistics fl">
		<!-- 添加收货地址 -->
		<div class="t_tab">
			<h1 class="t_title">
				<span class="size16">添加配送员</span>
				<span >修改配送员</span>
				<div @click="to" class="t_m fr">返回配送员地址</div>
			</h1>

			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
				<el-form-item label="账号" prop="account">
					<el-input type="text" style="width: 600px;" v-model="ruleForm.account" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input type="text" style="width: 600px;" v-model="ruleForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input type="text" style="width: 600px;" v-model="ruleForm.mobile" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="登陆密码" prop="password">
					<el-input type="text" style="width: 600px;" v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>
<script>
	import timePlunge from "../../../page/time";
	export default {
		name: 'ship',
		data() {
			var validateaccount = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'));
				} else {
					callback();
				}
			};
			var validatename = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'));
				} else {
					callback();
				}
			};
			var validatemobile = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入姓名'));
				} else {
					callback();
				}
			};

			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (value.length >12 || value.length < 6 ) {
					callback(new Error('密码长度在6-12之间'));
				} else {
					callback();
				}
			};


			return {
				ruleForm: {
					account:'',
					name:'',
					mobile:'',
					password:''
				},
				rules: {
					account: [
						{validator: validateaccount, trigger: 'blur'}
					],
					name: [
						{validator: validatename, trigger: 'blur'}
					],
					mobile: [
						{validator: validatemobile, trigger: 'blur'}
					],
					password: [
						{validator: validatePass, trigger: 'blur'}
					]
			 }

			}
			},




		methods: {
			submitForm(ruleForm) {
				this.$refs[ruleForm].validate((valid) => {
					if (valid) {
						this.$HTTP( this.$httpConfig.adddeliveryListList , this.ruleForm,
								'post').then((res)=> {
							console.log(res.data.data);
							this.$router.go(-1);
						}).catch((e) =>  {
							console.log(e);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},




			to() {
				this.$router.back();
			},
			queryData() {
				this.$HTTP(this.$httpConfig.getAddressDetail,{id:this.id}).then((res) => {
					this.$forceUpdate();
					this.params = res.data.data;
					this.params_status = !Number(!Number(this.params.status));
					this.$message.success(res.data.message);
				})
			},
			submit() {
				var that = this;
				this.params.status = this.params_status;
				if(this.status) {
					let status = Number(this.params.status);
					this.params.status = status;
					this.$HTTP(this.$httpConfig.saveAddress,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					})
							.catch((err) => {
								this.$message.error(err);
							});
				} else {
					let status = Number(this.params.status);
					this.params.status = status;
					this.$HTTP(this.$httpConfig.addAddress,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					})
							.catch((err) => {
								this.$message.error(err);
							});
				}
			},
		},
	}
</script>
<style type="text/css" scoped="scoped">

</style>
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
				background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
				width: 135px;
				height: 32px;
				border: 1px solid #ff920b;
				border-radius: 4px;
				font-size: 12px;
				font-weight: normal;
				cursor: pointer;
				color: #FFF;
				line-height: 32px;
				text-indent: 30px;
			}
		}
	}
</style>

<style lang="less" scoped>
	.logistics {
		width: 1000px;
	}
	.city{
		width:100px;
		height: 20px;
	}
</style>