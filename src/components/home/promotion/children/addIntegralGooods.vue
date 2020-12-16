<template>
	<div class="logistics fl">
		<!-- 添加积分商品信息 -->
		<div class="t_tab">
			<h1 class="t_title">
				<span v-if="!status" class="size16">添加积分商品信息</span>
				<span v-else class="size16">修改积分商品信息</span>
				<div class="t_m fr" @click="to">返回积分商品列表</div>
			</h1>
			<el-form class="form" label-width="180px" :model="params">
				<select-one-goods v-on:sendGoodsData="getGoodsData" :sendUpdateData="updateGoods" :sendStatus="status" :addIntegral="addIntegral"></select-one-goods>
				<!-- {{updateLoop}} -->
				<div v-if="status == true">
					<div v-for="(i, index) in updateLoop" :key="index">
						<el-form-item label="积分限制">
							<el-input style="width: 200px;" v-model="i.delayed" clearable></el-input>
							<span class="notes">用户得到积分后多少天才能兑换这件商品，默认0，最大999</span>
						</el-form-item>
						<el-form-item label="需要积分">
							<el-input style="width: 200px;" v-model="i.integral" clearable></el-input>
						</el-form-item>
						<el-form-item label="所需支付">
							<el-input style="width: 200px;" v-model="i.money" @change="checkMoney" clearable></el-input>
							<span class="notes">用户除积分外，还需要支付的金额，最低为0.01</span>
						</el-form-item>
						<el-form-item label="兑换状态">
							<el-switch v-model="i.status" active-text="可兑换" inactive-text="不可兑换"></el-switch>
						</el-form-item>
					</div>
				</div>
				<div v-else v-for="(i, index) in loopArr" :key="index">
					<el-form-item label="">
						<span class="">{{i.title}}</span>
					</el-form-item>
					<el-form-item label="积分限制">
						<el-input style="width: 200px;" v-model="params.delayed[index]" clearable></el-input>
						<span class="notes">用户得到积分后多少天才能兑换这件商品，默认0，最大999</span>
					</el-form-item>
					<el-form-item label="需要积分">
						<el-input style="width: 200px;" v-model="params.integral[index]" clearable></el-input>
					</el-form-item>
					<el-form-item label="所需支付">
						<el-input style="width: 200px;" v-model="params.money[index]" @change="checkMoney" clearable></el-input>
						<span class="notes">用户除积分外，还需要支付的金额，最低为0.01</span>
					</el-form-item>
					<el-form-item label="兑换状态">
						<el-switch v-model="params.status[index]" active-text="可兑换" inactive-text="不可兑换"></el-switch>
					</el-form-item>
				</div>
				<el-form-item>
					<el-button type="success" @click="submit">确认提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import selectOneGoods from '../../../../common/selectOneGoods.vue';
export default {
	name: 'addservicemanage',
	data() {
		return {
			dialogTableVisible: false,
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			params: {
				goods_id: 0,
				integral: [], //0
				delayed: [], //0
				money: [], //0.01
				status: []
			},
			girdData: [],
			hasCityData: [], //已经存在于服务器的地区数据
			multipleSelection: [],
			hasCityId: null, //已存在/选中的数据，只有ID
			status: 0, //0代表是新增，1代表是修改
			id: 0,
			updateGoods: [],
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
			tempData: null,
			addIntegral: 'addIntegral',
			loopArr: null,
			updateLoop: [],
			oriId: null
		}
	},
	components: {
		UE,
		selectOneGoods
	},
	created() { },
	mounted() {
		
		this.status = this.$route.params.status;
		if (this.status) {
			/*修改*/
			this.id = this.$route.params.id;
			this.queryData();
		}
	},
	methods: {
		getGoodsData(data1, data2, data3) {
			// alert(JSON.stringify(data1)) // ["21","22"]
			// alert(JSON.stringify(data2)) //All list
			// alert(JSON.stringify(data3))
			if(this.status) {
				if(this.updateLoop.length == data1.length) {
				} else if(this.updateLoop.length > data1.length) { 
					if(data1.length == 0) {
						this.updateLoop = []
					} else {
						let s1 = data1
						let s2 = this.updateLoop
						for(let i = 0; i < s2.length; i++) {
							let c = 0
							for(let j = 0; j < s1.length; j++) {
								if(s2[i] == s1[j].goods_id) {
								} else {
									c++
								}
							}
							if(c == s1.length) {
								this.updateLoop.splice(i, 1)
							}
						}	
					}
				} else {
					if(data2[0].id != this.oriId) {
						if(this.updateLoop.length == 0) {
							this.updateLoop.push(data2[0].GoodsSpec[0])
						} else {
							let ss = this.updateLoop
							for(let i = 0; i < data2[0].GoodsSpec.length; i++) {
								let c = 0
								for(let j = 0; j < ss.length; j++) {
									if(data2[0].GoodsSpec[i].id == ss[j].id) {
									} else {
										c++
									}
								}
								if(c == ss.length) {
									this.updateLoop.push(data2[0].GoodsSpec[i])
								}
							}
						}
					} else {
						let s1 = data1
						let s2 = this.updateLoop
						for(let i = 0; i < s1.length; i++) {
							let c = 0
							for(let j = 0; j < s2.length; j++) {
								if(s1[i] == s2[j].goods_id) {
								} else {
									c++
								}
							}
							if(c == s2.length) {
								this.updateLoop.push({id: s2[0].id, goods_id: s1[i], integral: null, delayed: null, money: null, is_show: false, create_time: null, p_id: s2[0].p_id, status: false})
							}
						}
					}
				}
			} 
			//////////////

			// ori-code
			this.hasCityId = data1;
			this.loopArr = data3
			this.tempData = data2[0].id
			this.params.status = []
			if(data3) {
				for(let i = 0; i < data3.length; i++) {
					this.params.status.push(false)
				}
			}
		},
		to() {
			this.$router.back();
		},
		checkMoney() {
			if (this.params.money <= 0) {
				this.$message.warning('不能小于0.01');
				this.params.money = 0.01;
				return false;
			}
		},
		queryData() {
			this.$HTTP(this.$httpConfig.getIntegralDetail, { id: this.id }, 'post').then((res) => {
				// this.params.status = this.params.is_show == "1" ? true : false;
				this.hasCityId = Number(this.params.goods_id);
				this.updateGoods.push(res.data.data.goods);
				this.oriId = res.data.data.goods.id
				for(let i = 0; i < res.data.data.info.length; i++) {
					this.updateLoop.push(res.data.data.info[i])
				}
				for(let i = 0; i < this.updateLoop.length; i++) {
					if(this.updateLoop[i].status == '1') {
						this.updateLoop[i].status = true
					} else {
						this.updateLoop[i].status = false
					}
				}
				this.params = res.data.data;
				this.$refs.ue.editor.setContent(this.params.description);
				this.$message.success(res.data.message);
			})
				.catch((err) => {
					this.$message.error(err);
				});
		},
		submit() {
			var that = this;
			if (this.hasCityId == null) {
				this.$message.error('请选择一个商品！！');
				return false;
			} else {
				this.params.goods_id = this.hasCityId;
			}
			// console.log(JSON.stringify(this.updateLoop))
			if (this.status) {
				this.params.id = this.id;
				// this.params.p_id = this.tempData
				// this.params.goods.id = this.tempData
				this.params = {
					id: [],
					p_id: [],
					goods_id: 0,
					integral: [],
					delayed: [],
					money: [],
					status: []
				},
				this.params.goods_id = this.hasCityId
				for(let i = 0; i < this.updateLoop.length; i++) {
					this.params.id.push(this.updateLoop[i].id)
					this.params.p_id.push(this.updateLoop[i].p_id)
					this.params.integral.push(this.updateLoop[i].integral)
					this.params.delayed.push(this.updateLoop[i].delayed)
					this.params.money.push(this.updateLoop[i].money)
					if(this.updateLoop[i].status) {
						this.params.status.push(this.updateLoop[i].status)
					} else {
						this.params.status.push(false)
					}
				}
				for(let i = 0; i < this.params.status.length; i++) {
					this.params.status[i] = Number(this.params.status[i]);
				}
				// console.log(JSON.stringify(this.updateLoop))
				// console.log(JSON.stringify(this.params))
				this.$HTTP(this.$httpConfig.saveIntegral, this.params, 'post').then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function () {
						that.to();
					}, 1000);
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			} else {
				delete this.params.isUse;
				for(let i = 0; i < this.params.status.length; i++) {
					this.params.status[i] = Number(this.params.status[i]);
				}
				this.$HTTP(this.$httpConfig.addIntegral, this.params, 'post').then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function () {
						that.to();
					}, 1000);
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			}
		},
	}
}
</script>
<style type="text/css">
.el-table__empty-block {
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

.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
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
  }
}

.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label {
    color: #a4a5a7;
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
  width: 1000px;
  .t_m {
    background: url(../../../../assets/return.jpg) no-repeat 6px #ff9f24;
    width: 135px;
    height: 32px;
    border: 1px solid #ff920b;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
    color: #fff;
    line-height: 32px;
    text-indent: 26px;
  }
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
    margin-left: 30px;
    tr {
      td {
        padding: 10px 0;
        .ss {
          margin: 0;
        }
        b {
          color: #ff0000;
        }
        .notes {
          padding-left: 15px;
          i {
            cursor: pointer;
            color: #87e1ff;
          }
        }
        input,
        select {
          text-indent: 5px;
          width: 288px;
          height: 32px;
          border: 1px solid #cccccc;
        }
        textarea {
          padding-left: 5px;
          padding-top: 5px;
          min-height: 50px;
          border: 1px solid #cccccc;
        }
        .abstract {
          min-height: 70px;
        }
        .Settled {
          height: 32px;
          line-height: 32px;
          color: #fff;
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