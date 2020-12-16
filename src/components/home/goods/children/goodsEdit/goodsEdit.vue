<template>
	<!-- 商品编辑 -->
	<div class="goodsrelease fl">
		<div class=" issue_content clearfix">
			<div class="goods_title">
				<!-- <span class="title fl size16">商品详情</span> -->
				<!-- <ul id="myTab" class="nav nav-tabs">
					<li v-for="(item,index) in tab" :key="item.id" @click="parse(item.method, index)">
						<a :href="'#tab'+$store.state.tab_Index[index]" data-toggle="tab" :class="{active:status[index]}">{{item.name}}</a>
					</li>
				</ul> -->
				<div class="tabrow">
					<div v-for="(item, ind) in tab" :key="ind" class="tabcol"
						@click="tabClick(item, ind)">
						<div>
							<img v-if="selectedTab == ind" :src="item.activeImg" alt="" class="shop_img" />
							<img v-else :src="item.image" alt="" class="shop_img" />
						</div>
						<div :class="selectedTab == ind ? 'tabtext' : 'tabtextNoActive'">
							<p class="text1">{{item.step}}</p>
							<p class="text2">{{item.name}}</p>
						</div>
					</div>
				</div>
			</div>
			<div v-show="selectedTab == 0">
				<!-- v-on:data4="fourthData"  -->
				<!-- v-on:data5="getGoodsAttrDetail1"  -->
				<firstTab @selectTab="selectTab(1)" @imageList="imageList" v-on:data1="firstData" v-on:data2="secondData" v-on:data3="thirdData" v-on:currentTab="currentTab" @firstData="firstData1"></firstTab>
			</div> 
			<div v-if="selectedTab == 1">
				<secondTab @imageList="imageList" @getSpec="getInformation" 
					:data1="selectItem1" 
					:data2="selectItem2"
					:data3="selectItem3"
					:data4="specData"
					:data5="getGoodsAttrDetail"
					:data6="classData"
					v-on:currentTab="currentTab"
				></secondTab>
			</div>
			<div v-else-if="selectedTab == 2">
				<thirdTab ref="album" :s="s" @selectTab="selectTab(3)" v-on:thirdToFour="currentTab"></thirdTab>
			</div>
			<div v-else-if="selectedTab == 3">
				<fourthTab :redit="routeId" @currentTab="currentTab"></fourthTab>
			</div>
			<!-- <div class="tab-content fl">
				<div class="tab-pane fade in clearfix fl" :class="{active:$store.state.tab_state === 0,in:$store.state.tab_state === 0}" id="tab0">
					<information @selectTab="selectTab(1)" @imageList="imageList" @getSpec="getInformation"></information>
				</div>
				<div class="tab-pane fade clearfix" :class="{active:$store.state.tab_state === 1,in:$store.state.tab_state === 1}" id="tab2">
					<standard :specData="specData" @goodsParameter="goodsParameter" :s="s" @selectTab="selectTab(2)"></standard>
				</div>
				<div class="tab-pane fade clearfix" :class="{active:$store.state.tab_state === 2,in:$store.state.tab_state === 2}" id="tab1">
					<Album ref="album" :s="s" @selectTab="selectTab(3)"></Album>
				</div>
				<div class="tab-pane fade clearfix" :class="{active:$store.state.tab_state === 3,in:$store.state.tab_state === 3}" id="tab3">
					<parameter :relInfo="relInfo" :data="param_data" :spec="param_select"></parameter>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script>
import firstTab from "./children/firstTab";
import secondTab from "./children/secondTab";
import thirdTab from "./children/thirdTab";
import fourthTab from "./children/fourthTab"
import information from "./children/information"; //通用信息
import Album from "./children/Album"; //商品相册
import standard from "./children/standard"; //商品规格
import parameter from "./children/parameter"; //商品参数
export default {
	name: "goodsrelease",
	data() {
		return {
			tab: [
				{ step: "STEP.1", name: "通用信息", method: "getInformation", image: require("../../../../../assets/images/tabImg/1.png"), activeImg: require("../../../../../assets/images/activeTabImg/1.png") },
				{ step: "STEP.2", name: "商品规格", method: "getSpecData", image: require("../../../../../assets/images/tabImg/2.png"), activeImg: require("../../../../../assets/images/activeTabImg/2.png") },
				{ step: "STEP.3", name: "商品相册", method: "getAlbum", image: require("../../../../../assets/images/tabImg/3.png"), activeImg: require("../../../../../assets/images/activeTabImg/3.png") },
				{ step: "STEP.4", name: "商品参数", method: 'goodsParameter', image: require("../../../../../assets/images/tabImg/4.png"), activeImg: require("../../../../../assets/images/activeTabImg/4.png") }
			],
			state: 0,
			status: [true, false],
			index: 0,
			data: "",
			class_id: 0,
			spec: {},
			three_class_id: 0,
			spec_data: '',
			spec_select: {},
			param_data: '',
			param_select: [],
			relInfo: '',
			specData: null,
			firstRequest: true,//是否第一次请求
			s:'',

			selectedTab: 1, //2
			selectItem1: null,
			selectItem2: null,
			selectItem3: null,
			getGoodsAttrDetail: null,
			classData: null,
			routeId: null
		};
	},
	methods: {
		firstData(value) {
			if(value) {
				this.selectItem1 = value
			}
		},
		secondData(value) {
			if(value) {
				this.selectItem2 = value
			}
		},
		thirdData(value) {
			if(value) {
				this.selectItem3 = value
			}
		},
		// fourthData(value) {
		// 	if(value) {
		// 		this.specData = value
		// 	}
		// },
		currentTab(value) {
			this.selectedTab = value
		},
		// getGoodsAttrDetail1(value) {
		// 	this.getGoodsAttrDetail = value
		// },
		imageList(){
			this.s = 1;
			this.$refs.album.imageConfigure();
			this.$refs.album.imageList();
		},
		//处理方法
		tabClick(data, index) {
			// just testing condition, the true is else
			// if(index == 2) {
			// 	this.selectedTab = 2
			// } else {
				this.s = 2;
				this.$store.state.tab_state = index;
				var index=Number(index);
				if (index == 1 && this.firstRequest) {
					this.firstRequest = false;
					this.$refs.album.imageConfigure();
					this.$refs.album.imageList();
				}
				this.index = Number(index);
				this.data = data.method;
				this.selectTab(this.index);
				return eval("this." + data + "()");
			// }
			
		},
		//切换选项卡
		selectTab(index) {
			for (var i = 0; i < this.status.length; i++) {
				this.$set(this.status, i, false);
			}
			this.$set(this.status, index, true);
		},
		firstData1(val) {
			this.classData = val
		},
		//获取规格
		getInformation() {
			this.$HTTP(this.$httpConfig.getGoodsSpecDetail, {
				class_three: this.$store.state.three_class_id_tow,
				goods_id: this.$route.params.id
			}, 'post').then(res => {
				this.specData = res.data.data;
			}).catch((err) => {
				console.log(err);
			})
		},
		
		
		
	},
	created() {
		this.routeId = this.$route.params.id
		// this.getData();
	},
	components: {
		information,
		Album,
		standard,
		parameter,
		firstTab,
		secondTab,
		thirdTab,
		fourthTab
	}
};
</script>
<style lang="less" scoped>

.goodsrelease {
  width: 1000px;
  padding-bottom: 80px;
  .issue_content {
    width: 100%;
    margin: 0 auto;
    .goods_title {
		height: 31px;
		border-right: 0;
		position: relative;
		margin-bottom: 22px;
		.tabrow {
			display: flex;
			margin-bottom: 22px;
			.tabcol {
				display: flex;
				align-items: center;
				width: 20%;
				cursor: pointer;
			}
			.tabtext {
				color: #F7BC0A;
				padding-left: 10px;
				.text1 {
				font-size: 12px;
				}
				.text2 {
				font-size: 16px;
				}
			}
			.tabtextNoActive {
				color: #999999;
				padding-left: 10px;
				.text1 {
				font-size: 12px;
				}
				.text2 {
				font-size: 16px;
				}
			}
		}
		
      .title {
        color: #333;
      }
      .nav {
        padding-left: 180px;
        border: none;
        height: 31px;
        border-bottom: 1px solid #dddddd;
        border-right: 0;
        bottom: -1px;
        li {
          color: #666666;
          float: left;
          font-size: 14px;
          height: 30px;
          width: 96px;
          margin-left: 8px;
          a {
            transition: color 0s ease;
            border: none;
            padding: 0;
            margin: 0;
            text-align: center;
            text-decoration: none;
            line-height: 30px;
            border-left: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            border-top: 1px solid #dddddd;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: #ededed;
          }
          a.active {
            background-color: #ffffff;
            border-top: 1px solid #ddd;
            border-bottom: none;
            position: relative;
            top: 1px;
            height: 30px;
            line-height: 30px;
            border-left: 1px solid #ddd;
            color: #f7bc0a;
          }
        }
        li:hover a {
          border-color: none;
          transition: color 0s ease;
        }
      }
	}
	
	
    .tab-content {
      width: 100%;
      .tab-pane {
        width: 100%;
      }
    }
  }
}
</style>
