<template>
	<!-- 促销-添加满赠 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<!-- d{{status}}ss<br>
				s{{!status}}dd <br>
				{{updateGoods}} <br>
				{{updateGoods1}} -->
	          	<span v-if="!status" class="size16">添加商品促销活动</span>
            	<span v-else class="size16">修改商品促销活动</span>
	          	<div @click="to" class="t_m fr">返回满赠列表</div>
	        </h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label="赠品功能类型">
					<el-input style="width: 600px;" value="满赠" disabled></el-input>
				</el-form-item>
				<el-form-item label="促销活动名称">
					<el-input style="width: 600px;" v-model="params.name" clearable></el-input>
				</el-form-item>
				<el-form-item label="满赠价格">
					<el-input style="width: 600px;" v-model="params.full" clearable></el-input> 元
				</el-form-item>
				<el-form-item label="赠送商品总数量">
					<el-input style="width: 600px;" v-model="params.give_count" clearable></el-input>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-date-picker :picker-options="pickerOptions1" v-model="params.start_time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker :picker-options="pickerOptions2" v-model="params.end_time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<!-- <el-form-item label="适合用户范围">
					<el-select v-model="params.group" placeholder="请选择">
						<el-option v-for="item in group" :key="item.id" :label="item.level_name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item> -->
				<select-one-goods v-on:sendGoodsData="getGoodsData" :sendUpdateData="updateGoods" :sendStatus="status"></select-one-goods>

				
				<div v-if="commonLoop1.length > 0 && realShow == true">
					<div v-for="(i, index) in commonLoop1" :key="index">
						<!-- {{i}} -->
						<select-one-goods v-on:sendGoodsData="getGoodsData1" :salePro='true' :lookcount="i.loop" :giveFlag="giveFlag" :sendUpdateData="i.data" :sendStatus="status"></select-one-goods>
					</div>
				</div>
				<div v-else v-for="(i, index) in this.checklist3" :key="index">
					<!-- {{updateGoods1}} -->
					<select-one-goods v-on:sendGoodsData="getGoodsData1" :lookcount="i.id" :giveFlag="giveFlag" :sendUpdateData="updateGoods1" :sendStatus="status"></select-one-goods>
				</div>
				<el-form-item label="一次赠送商品个数">
					<el-input style="width: 600px;" v-model="params.give_num" clearable></el-input>
				</el-form-item>
				<el-form-item label="活动描述">
					<UE :defaultMsg="params.description" :config="config" ref="ue"></UE>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="submit">确认提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import UE from '../../goods/children/goodsRelease/children/UE';
	import selectOneGoods from '../../../../common/selectOneGoods.vue';
	export default {
		name: 'addsales',
		data() {
			return {
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				giveFlag:true,
				params: {
					name: '',
					full: 0,
					expression: 0,
					description: '',
					start_time: '',
					end_time: '',
					group: [],
					goods_id: 0,
					give_num:"",
					give_count:''
				},
				group: [],
				girdData: [],
				hasCityData: [], //已经存在于服务器的地区数据
				defaultProps: {
					children: '',
					label: 'title'
				},
				multipleSelection: [],
				hasCityId: null, //已存在/选中的数据，只有ID
				hasCityId1:null,
				status: 0, //0代表是新增，1代表是修改
				id:0,
				updateGoods: [],
				updateGoods1: [],
				page_size: 0, //每页显示几个
				page: 0, //总页数
				currentPage: 1, //当前页
		        pickerOptions1: {
		            disabledDate(time) {
		                return time.getTime() > Date.now();
		            },
		            shortcuts: [{
		                text: '今天',
		                onClick(picker) {
		                picker.$emit('pick', new Date());
		                }
		            }],
		        },
		        pickerOptions2: {
		            disabledDate(time) {
		                return time.getTime() < Date.now();
		            }
				},
				checklist3: null,
				commonLoop: [],
				commonLoop1: [],
				realShow: false
			}
		},
		created() {
		},
		mounted() {

			this.getRange();
			this.status = this.$route.params.status;
			if(this.status) {
				/*修改*/
				this.id = this.$route.params.id;
				this.queryData();
			}
		},
		methods: {
			getGoodsData(data, data1, checklist){
				// alert(JSON.stringify(data))
				// alert(JSON.stringify(data1))
				// alert(JSON.stringify(checklist))
				this.hasCityId = data;
				this.checklist3 = checklist

				let submitArr = []
				for(let i = 0; i < this.commonLoop.length; i++) {
					let ss = this.commonLoop[i].loop
					let dd = this.commonLoop[i].data
					let gl = {
						[ss]: dd
					}
					submitArr.push(gl)
				}
				let ss = submitArr
				let tempss = []
				for(let i in ss) {
					tempss.push(Object.keys(ss[i]))
				}

				let result = []
				let result1 = []
				for(let i = 0; i < this.checklist3.length; i++) {
					for(let j = 0; j < tempss.length; j++) {
						if(this.checklist3[i].id == tempss[j]) {
							result.push(submitArr[j])
							result1.push(tempss[j])
						}
					}
				}
				
				// alert(JSON.stringify(this.checklist3))
				// alert(JSON.stringify(result1))
				// alert(JSON.stringify(result))
				// alert(JSON.stringify(this.commonLoop1))
				// this.updateGoods1 = result
				
				let temp = this.commonLoop1

				for(let i = 0; i < result1.length; i++) {
					let count = 0
					for(let j = 0; j < temp.length; j++) {
						if(result1[i][0] == temp[j].loop) {
							// 	result.push(submitArr[j])
							// 	result1.push(tempss[j])	
							// alert('equal')
							this.commonLoop1.splice(i, 1)
							
						}
					}
				}
				alert(JSON.stringify(this.commonLoop1))
				if(this.commonLoop1 && this.commonLoop1.length > 0) {
					this.realShow = true
				}
			},
			getGoodsData1(data, data1, data2, loopcount){
				// alert(JSON.stringify(data))
				// alert(JSON.stringify(data2))
				// alert(JSON.stringify(loopcount))
				this.hasCityId1 = data;
				// alert("ParentCheck "+JSON.stringify(this.checklist3))

				

				if(this.commonLoop.length == 0) {
					this.commonLoop.push({'loop': loopcount, 'data': this.hasCityId1})
				} else {
					let count = 0
					for(let i = 0; i < this.commonLoop.length; i++) {
						// alert(this.commonLoop[i].loop + " " + loopcount)
						if(this.commonLoop[i].loop == loopcount) {
							this.commonLoop.splice(i, 1, {'loop': loopcount, 'data': this.hasCityId1})
						} else {
							count++
						}
					} 
					if(count == this.commonLoop.length) {
						this.commonLoop.push({'loop': loopcount, 'data': this.hasCityId1})
					}
				} 
				// alert(JSON.stringify(this.commonLoop))

		 		let submitArr = []
				for(let i = 0; i < this.commonLoop.length; i++) {
					let ss = this.commonLoop[i].loop
					let dd = this.commonLoop[i].data
					let gl = {
						[ss]: dd
					}
					submitArr.push(gl)
				}
				let ss = submitArr
				let tempss = []
				for(let i in ss) {
					tempss.push(Object.keys(ss[i]))
				}

				let result = []
				let result1 = []
				for(let i = 0; i < this.checklist3.length; i++) {
					for(let j = 0; j < tempss.length; j++) {
						if(this.checklist3[i].id == tempss[j]) {
							result.push(submitArr[j])
							result1.push(tempss[j])
						}
					}
				}
				// alert(JSON.stringify(result))
				// alert(JSON.stringify(this.checklist3))
				// let gg = Object.keys(result[0])[0]
				
					
				if(this.commonLoop1.length == 0) {
					// this.commonLoop1 = data1
					for(let i = 0; i < result.length; i++) {
						if(loopcount == Object.keys(result[i])[0]) {
							// alert(loopcount + " d " + Object.keys(result[i])[0])
							this.commonLoop1.push({'loop': loopcount, 'data': data1, 'childData': Object.values(result[i])[0]})
							// alert(JSON.stringify(this.commonLoop1))
						}
					}
					
				} else {
					let count = 0
					for(let i = 0; i < this.commonLoop1.length; i++) {
						// alert('equal ' + this.commonLoop1[i].data[0].id +' '+ data1[0].id)
						// alert(JSON.stringify(result))
						
						if(this.commonLoop1[i].data[0].id == data1[0].id) {
							for(let ii = 0; ii < result.length; ii++) {
								if(loopcount == Object.keys(result[ii])[0]) {
									this.commonLoop1.splice(i, 1, {'loop': loopcount, 'data': data1, 'childData': Object.values(result[ii])[0]})
								}
							}
						} else {
							count++
						}
						
						// alert('equal ' + count +' '+ JSON.stringify(this.commonLoop1))
					}
					// alert('equal ' + count +' '+ this.commonLoop1.length)
					if(count == this.commonLoop1.length) {
						for(let ii = 0; ii < result.length; ii++) {
							if(loopcount == Object.keys(result[ii])[0]) {
								this.commonLoop1.push({'loop': loopcount, 'data': data1, 'childData': Object.values(result[ii])[0]})
							}
						}
					}
					
				}
				// alert(JSON.stringify(this.commonLoop1))
				
				
			},
			tam2time(value) {
				var time = new Date(Number(value)*1000);
				var Y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var H = time.getHours();
				var mi = time.getMinutes();
				var s = time.getSeconds();
				if(m < 10) {
					m = '0' + m;
				}
				if(d < 10) {
					d = '0' + d;
				}
				return(Y + "-" + m + "-" + d);
			},
			queryData(){
				this.$HTTP(this.$httpConfig.getFullGiftDetail,{id: this.id}).then((res) => {
					if(res.data.data.give_goods != null) {
						res.data.data.give_count = res.data.data.give_goods.give_count;
						res.data.data.give_num = res.data.data.give_goods.give_num;
					} // else {
					// 	alert('Equal Null')
					// }
					
					this.params.id = res.data.data.id;
					this.params.full = res.data.data.full;
					this.params.expression = res.data.data.expression;
					this.params.description = res.data.data.description;
					this.params.start_time = res.data.data.start_time;
					this.params.end_time = res.data.data.end_time;
					// this.params.group = res.data.data.group;
					this.params.goods_id = res.data.data.goods_id;
					this.params.give_num = res.data.data.give_num;
					this.params.give_count = res.data.data.give_count;
					this.params.name = res.data.data.name;
					// params: {
					// 	name: '',
					// 			full: 0,
					// 			expression: 0,
					// 			description: '',
					// 			start_time: '',
					// 			end_time: '',
					// 			group: [],
					// 			goods_id: 0,
					// 			give_num:"",
					// 			give_count:''
					// },
					console.log(this.params);
					this.params.start_time = this.tam2time(this.params.start_time);
					this.params.end_time = this.tam2time(this.params.end_time);
					this.$refs.ue.editor.setContent(this.params.description);
					this.hasCityId = res.data.data.goods.goods_id;
					this.hasCityId1 = res.data.data.give_goods.goods_id;
					this.updateGoods.push(res.data.data.goods);
					this.updateGoods1.push(res.data.data.give_goods);
					this.$message.success(res.data.message);
				})
				.catch((err) => {
					this.$message.error(err);
				});
			},
			to() {
				this.$router.back();
			},
			getRange() {
				this.$HTTP(this.$httpConfig.getStoreLevelNameList,{}).then((res) => {
					this.group = res.data.data;
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			},
			submit() {
				var that = this;
				this.params.goods_id = this.hasCityId;
				this.params.description = this.$refs.ue.getUEContent();
				let submitArr = []
				for(let i = 0; i < this.commonLoop.length; i++) {
					let ss = this.commonLoop[i].loop
					let dd = this.commonLoop[i].data
					let gl = {
						[ss]: dd
					}
					submitArr.push(gl)
				}
				let ss = submitArr
				let tempss = []
				for(let i in ss) {
					tempss.push(Object.keys(ss[i]))
				}

				let result = []
				let result1 = []
				for(let i = 0; i < this.checklist3.length; i++) {
					for(let j = 0; j < tempss.length; j++) {
						if(this.checklist3[i].id == tempss[j]) {
							result.push(submitArr[j])
							result1.push(tempss[j])
						}
					}
				}
				// alert(JSON.stringify(this.hasCityId1)) //['1','2']
				// this.params.give_goods_id = this.hasCityId1;
				// alert(JSON.stringify(result1))
				// alert(JSON.stringify(this.checklist3))
				// alert(JSON.stringify(result))
				this.params.give_goods_id = result;
				console.log(JSON.stringify(this.params));

				if(this.status) {
					this.$HTTP(this.$httpConfig.saveFullGift,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 1000);
						this.$message.success(res.data.message);
					}).catch((err) => {
						this.$message.error(err.data.message);
					})
				}else{
					this.$HTTP(this.$httpConfig.addFullGift,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 1000);
						this.$message.success(res.data.message);
					}).catch((err) => {
						this.$message.error(err.data.message);
					})
				}
			},
		},
		components: {
			UE,
			selectOneGoods
		}

	}
</script>
<style type="text/css">
	.el-table__empty-block{
		height: 0;
	}
	/*分页*/
	.page_size {
		text-align: center;
		padding: 20px;
		width: 95%;
	}
	/*分页中的确认按钮*/
	.select-submit-btn {
		margin-top: 20px;
	}
	/*名称项超出隐藏*/

	#name-single {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/*表格内容居中*/

	.el-table th>.cell,
	.el-table .cell {
		text-align: center;
	}
</style>
<style lang="less">
	.el-table__empty-block{
		height: 0;
	}
	.time-error{
		color: #f00;
	}
	.g_att {
		.shop_img {
			width: 50px;
			height: 50px;
			border: 1px solid #ddd;
			float: left;
		}
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
			i {
				color: #999;
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
</style>
<style lang="less" scoped>
	.classify {
		width: 1000px;
		.g_att {
			.currency {
				height: auto;
				min-height: 100px;
				line-height: 20px;
				padding: 10px;
				border-top: 0;
				color: #333;
				.ss {
					padding-left: 5px;
				}
				.z_info {
					padding-left: 65px;
					.goods_name {
						span {
							padding: 10px 0;
							b {
								color: #ff0000;
							}
						}
						select {
							margin: 10px 0;
							width: 150px;
							height: 32px;
							border: 1px solid #cccccc;
						}
					}
					.z_price {
						padding-left: 33px;
						span {
							padding: 10px 0;
							b {
								color: #ff0000;
							}
						}
						input {
							margin: 10px 0;
							width: 288px;
							height: 32px;
							border: 1px solid #cccccc;
						}
					}
					.set {
						padding-left: 8px;
						span {
							padding: 10px 0;
						}
						.opt {
							padding-right: 140px;
							margin: 10px 0;
						}
						input {
							border: 0;
							margin: 0;
							width: 15px;
							height: 15px;
						}
					}
					.presell_days {
						padding-left: 33px;
						span {
							padding: 17px 0;
							b {
								color: #ff0000;
							}
						}
						.choose {
							padding: 0;
							margin: 17px 0;
							margin-left: 15px;
							border-radius: 3px;
							width: 70px;
							text-align: center;
							line-height: 20px;
							height: 20px;
							background-color: #f7bc0a;
							cursor: pointer;
							color: #FFF;
						}
						input {
							margin: 10px 0;
							margin-left: 4px;
							width: 288px;
							height: 32px;
							border: 1px solid #cccccc;
						}
					}
				}
				.discount {
					padding-left: 49px;
					span {
						padding: 10px 0;
					}
					.specification {
						margin-top: 10px;
						margin-left: 5px;
						border: 1px solid #dddddd;
						color: #a4a5a7;
						tr {
							td {
								border-bottom: 1px solid #ddd;
								padding: 10px 0;
								line-height: 24px;
								font-size: 12px;
							}
							.edit {
								border: 1px solid #dddddd;
								color: #666666;
								width: 40px;
								line-height: 22px;
								text-align: center;
								display: block;
								border-radius: 4px;
								float: left;
								margin-right: 15px;
								cursor: pointer;
								padding: 0;
							}
						}
					}
				}
				.editor {
					padding: 20px 0 0 97px;
					overflow: hidden;
					span {
						padding: 150px 0;
					}
					.ue {
						width: 800px;
					}
				}
				.button {
					height: 32px;
					margin: 20px 0 20px 157px;
					border-radius: 6px;
					background: #f7bc0a;
					width: 199px;
					span {
						display: block;
						line-height: 32px;
						color: #FFF;
						text-align: center;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
