<template>
	<div class="currency">
        <div class="relativetab">
            <div class="relativetab1">
                <input type="text" id="myInput2" v-on:keyup="myFunction2" placeholder="输入名称/拼音首字母" title="Type in a name">
                <!-- {{goods.class_id}} -->
				<perfect-scrollbar>
                    <ul id="myUL2">
                        <li v-for="(list, index) in classData" :key="index"
                            :class="firCol == index ? 'liActive' : ''"
                        >
                            <a href="#" v-if="list.storeBind == 1" @click="list1Click(list, index)">{{ list.class_name }}</a>
                            <el-popover
                                v-else
                                placement="bottom"
                                width="200"
                                trigger="hover"
                            >
                                <span>您无当前类目发布产品权限, 跨类目经验请提交申请, </span>
                                <p @click="toShop" style="cursor: pointer; color: lightblue; ">立即申请</p>
                                <a href="#" slot="reference" class="disablecss">{{ list.class_name }}</a>
                            </el-popover>
                            <a href="" v-show="firCol == index">></a>
                        </li>
                    </ul>
                </perfect-scrollbar>
            </div>
             
            <div class="relativetab1"><!-- :class="secondtab != 0 ? 'relativetab1' : 'tabhidden'" -->
                <input type="text" id="myInput" v-on:keyup="myFunction" placeholder="输入名称/拼音首字母" title="Type in a name">
                <perfect-scrollbar>
                    <ul id="myUL">
                        <li v-for="(list, index) in classByTwo" :key="index+'i'" 
                            :class="secCol == index ? 'liActive' : ''"
                            @click="list2Click(list, index)">
                            <a href="#">{{ list.class_name }}</a>
                            <a href="" v-show="secCol == index">></a>
                        </li>
                    </ul>
                </perfect-scrollbar>
            </div>
            <div class="relativetab1"><!-- :class="thirdtab != 0 ? 'relativetab1' : 'tabhidden'" -->
                <input type="text" id="myInput3" v-on:keyup="myFunction3" placeholder="输入名称/拼音首字母" title="Type in a name">
                <ul id="myUL3" class="scrollcss">
                    <li v-for="(list, index) in classByThree" :key="index" 
                        :class="thirdCol == index ? 'liActive' : ''"
                        @click="list3Click(list, index)">
                        <a href="#">{{ list.class_name }}</a>
                        <a href="" v-show="thirdCol == index">></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="divbtncss">
            <div v-if="btnActive != 0" class="btncss" @click="nextPage(1)">
                下一步，填写商品信息
            </div>
            <div v-else class="btncssdisable">
                下一步，填写商品信息
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'editFirst',
	data() {
		return {
			list: [],
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			status: false, //首次获取分类状态
			goods_detail: '',
			goods: {
				advance_date: '',    // 预售期
				// approval_status :'',
				brand_id: 0,         // 品牌编号
				class_id: 0,         // 第一级分类
				class_two: 0,       // 第二级分类
				class_three: 0,     // 第三级分类编号

				store_class_one: 0, // 店内第一级分类id
				store_class_three: 0, //店内第二级分类id
				store_class_two: 0, //店内第三级分类id
				// create_time :'',
				// id :'',
				price_market: 0.00,  // 市场价
				price_member: 0.00,  //会员价
				shelves: 0,  //是否上架
				stock: 0,            //库存
				// title :'',           //商品名称
				weight: 0.0,        // 重量 以克为计量单位
				express_id: '',		//运费模板
				recommend: '0'
			},
			class_two: 0,    // 第二级分类
			class_three: 0,    // 第三级分类编号
			classData: {},   // 一级分类
			brandData: {}, // 品牌数据
			classByTwo: [], // 二级分类数据
			classByThree: [],  // 三级分类数据
			freightData: [],
			storeClassData:[],
			// storeclassByTwo:[],
			// storeclassByThree:[],
            detail: ' ',
            
            
			// selectedTab: 0,
			// firstData: null,
			firCol: null,
			secondData: null,
			secCol: null,
			thirdtab: 0,
			thirdData: null,
			thirdCol: null,
			btnActive: 0,
            secondtab: 0,
			selectItem1: null,
		};
	},
	created() {
		this.getData();
		this.getClass();
	},
	methods: {
		getData() {
			this.$HTTP(this.$httpConfig.getGoodsDetail,{id: this.$route.params.id}).then((res) => {
				this.goods = res.data.data.goods;
				
				this.firCol = this.goods.class_id
				this.secCol = this.goods.class_two
				this.thirdCol = this.goods.class_three
				
				this.btnActive = 1
				this.$store.state.three_class_id_tow = this.goods.class_three;
				this.goods.recommend = this.goods.recommend == '0' ? false : true;
				if (this.goods.class_id) {
					this.status = true;
					this.selectChild(this.status);
				}
			}).catch((err) => {
				console.log(err);
			})
		},
		getClass() {
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_id) }, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.classData = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		selectChild(status) {
			if (this.status === false) {
				this.goods.class_two = null;
				this.goods.class_three = null;
				this.classByTwo = [];
				this.classByThree = [];
			} else {
				this.class_two = null
				this.class_three = null;
			}
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_id) }, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
					return;
				}
				this.classByTwo = res.data.data;
				this.status = false;
				if (this.goods.class_two) {
					this.selectChildByTwo();
				}
			}).catch((err) => {
				console.log(err)
			});
		},
		selectChildByTwo() {
			this.classByThree = [];
			this.class_three = null;
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_two) }, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.classByThree = res.data.data;
				let name1 = null
				let name2 = null
				let name3 = null
				for(let i in this.classData) {
					if(this.classData[i].id == this.firCol) {
						name1 = this.classData[i].class_name
						break
					}
				}
				for(let i in this.classByTwo) {
					if(this.classByTwo[i].id == this.secCol) {
						name2 = this.classByTwo[i].class_name
						break
					}
				}
				for(let i in this.classByThree) {
					if(this.classByThree[i].id == this.thirdCol) {
						name3 = this.classByThree[i].class_name
						break
					}
				}
				this.$emit('firstData', {'first': name1, 'second': name2, 'third': name3})
			}).catch((err) => {
				console.log(err)
			});
		},

		list1Click(item, id) {
			this.secondtab = 1;
			if(this.secCol !== id) {
				this.btnActive = 0
			}
			this.firCol= id;
            this.selectItem1 = item // to send data to secondTab
            this.$emit('data1', this.selectItem1)
			this.getClass1()
		},
		getClass1() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: this.selectItem1.id
			}, 'post')
			.then((res) => {
				this.secondData = res.data.data;
				this.classByThree = []
				this.classByTwo = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},

		list2Click(item, id) {
			this.thirdtab = 1;
			if(this.secCol !== id) {
				this.btnActive = 0
			}
			this.secCol= id;
			this.selectItem2 = item // to send data to secondTab
			this.$emit('data2', this.selectItem2)
			this.getClass2()
		},
		getClass2() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: this.selectItem2.id
			}, 'post')
			.then((res) => {
				this.thirdData = res.data.data;
				this.classByThree = res.data.data
			}).catch((err) => {
				console.log(err)
			});
		},

		list3Click(item, id) {
			this.thirdCol= id;
			this.selectItem3 = item // to send data to secondTab
			this.$emit('data3', this.selectItem3)
			this.btnActive = 1
		},

        nextPage(item) {
			if(this.selectItem1 && this.selectItem2 && this.selectItem3 && item) {
				// this.selectedTab = item
				this.$emit('currentTab', 1)
			} else if(this.goods.class_id && this.goods.class_two && this.goods.class_three && item && this.goods) {
				this.$emit('currentTab', 1)
			}
		},
		
		toShop() {
			parent.location.href = "#/shop?type=shopData";
		},
		
		myFunction() {
			var input, filter, ul, li, a, i, txtValue;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
			ul = document.getElementById("myUL");
			li = ul.getElementsByTagName("li");
			for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("a")[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}
		},
		myFunction2() {
			var input, filter, ul, li, a, i, txtValue;
			input = document.getElementById("myInput2");
			filter = input.value.toUpperCase();
			ul = document.getElementById("myUL2");
			li = ul.getElementsByTagName("li");
			for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("a")[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}
		},
		myFunction3() {
			var input, filter, ul, li, a, i, txtValue;
			input = document.getElementById("myInput3");
			filter = input.value.toUpperCase();
			ul = document.getElementById("myUL3");
			li = ul.getElementsByTagName("li");
			for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("a")[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}
		}
		
	},
	mounted() {
		document.body.scrollTop = 0;
	}
}
</script>
<style lang="less" scoped>
	.currency {
		width: 100%;
		height: auto;
		min-height: 100px;
		line-height: 20px;
		padding: 10px;
		border-top: 0;
		color: #333;
	}

    .editPopover {
        font-size: 12px !important;
    }
    .ps {
        height: 150px;
    }
    .relativetab {
        padding: 2rem 0.5rem;
        background: #FCFCFC;
        border: 1px solid #E7E7E7;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .relativetab1 {
            background: #FFF;
            width: 30%;
            border: 1px solid #E7E7E7;
            padding-left: 10px;
            padding-right: 10px;
            .licss {
                cursor: pointer;
                margin: 15px 0;
                padding: 10px 0;
                color: #FFF;
                background: hotpink;
            }
            #myInput2, #myInput, #myInput3 {
                background-image: url('../../../../../../../static/images/search.png');
                background-repeat: no-repeat;
                background-position: 7px 10px;
                width: 100%;
                font-size: 12px;
                padding: 7px 0px 7px 0px;
                border: 1px solid #E7E7E7;
                margin-top: 10px;
                text-indent: 35px;
                border-radius: 1px;
                color: #999999;
            }

            #myUL2, #myUL, #myUL3 {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }

            #myUL2 li a, #myUL li a, #myUL3 li a {
                margin-top: -1px; /* Prevent double borders */
                color: #646464;
                padding: 8px 12px;
                text-decoration: none;
                font-size: 12px;
                display: block
            }

            #myUL2 li a:hover:not(.header), #myUL li a:hover:not(.header), #myUL3 li a:hover:not(.header) {
                background-color: #E0ECFB;
            }
            .liActive {
                background-color: #E0ECFB;
                border: 1px solid #ddd;

                display: flex;
                align-items: center;
                justify-content: space-between;
                a {
                    color: #1B9AF7 !important;
                }
            }
            .disablecss {
                color: lightgray !important;
            }
        }
        .tabhidden {
            width: 30%;
            visibility: hidden;
            .licss {
                cursor: pointer;
                margin: 15px 0;
                padding: 10px 0;
                color: #FFF;
                background: hotpink;
            }
        }
        .scrollcss {
            height: 150px;
            overflow-y: scroll;
        }
    }
    
    .divbtncss {
        display: flex;
        justify-content: center;
        padding: 2rem 0px;
        .btncss {
            background: #EEB407;
            padding: 10px 20px;
            color: #FFF;
            border-radius: 2px;
            cursor: pointer;
        }
        .btncssdisable {
            opacity: 0.4;
            background: #EEB407;
            padding: 10px 20px;
            color: #FFF;
            border-radius: 2px;
            cursor: pointer;
        }
    }
</style>
