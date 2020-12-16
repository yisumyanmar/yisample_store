<template>
	<div class="currency">
		<div class="goods_title">
            <span class="title fl size14">商品基本信息</span>
        </div>
		<div class="z_info">
			<div class="goods_name goods_name1">
				<span v-if="data6">
					<b class="red">*</b>
					商品分类： {{data6.first}} > {{data6.second}} > {{data6.third}}
					<span style="color: #0573C8; cursor: pointer; " @click="backtoStep2">编辑 </span>
				</span>
			</div>
			<div class="goods_name">
				<span><b class="red">*</b> 商品名称： </span>
				<el-input v-model="goods.title" :maxlength="60" size="medium" style="width: 250px;" clearable>
				</el-input>
				<p class="cue">商品标题名称长度至少3个字，最长60个字</p>
			</div>

			<div class="goods_name" style="padding-left: 23px;">
				<span><b class="red">*</b> 标题： </span>
				<el-input v-model="goods.siteTitle" :maxlength="60" size="medium" style="width: 250px;" clearable>
				</el-input>
				<p class="cue" style="padding-left: 50px;"></p>
			</div>
			<div class="goods_brief" style="padding-left: 23px;">
				<span class="fl">关键词： </span>
				<el-input v-model="goods.keyword" :maxlength="60" size="medium" style="width: 250px;" clearable>
				</el-input>
				<p class="cue" style="padding-left: 50px;">关键词之间用空格分割，设置后有利于搜索引擎优化</p>
			</div>

			<div class="goods_brief">
				<span class="fl">商品卖点：</span>
				<el-input style="width: 288px;" type="textarea" :maxlength="60" :autosize="{ minRows: 2, maxRows: 4}" v-model="goods.description">
				</el-input>
				<p class="cue">商品卖点最长不能超过140个字，设置后有利于搜索引擎优化</p>
			</div>


			<div class="goods_brand public">
				<span>商品品牌： </span>
				<el-select v-model="goods.brand_id" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in brandData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
			</div>


			<div class="goods_brand public">
				<span>商品规格：</span>
			</div>
			<br>
			<!-- {{group}}<br><br>

			ss{{select_list}}<br><br>

			{{item_id}} -->
			<div class="g_size" v-for="(item, index) in group" :key="index">
				<p class="fl">{{item.name}}：</p>
				<ul class="fl spec_list" style="width: 100%; display: flex; flex-wrap: wrap; align-items: center;">
					<li
						v-for="(spec,indexByItem) in select_list"
						v-if="index == spec.spec_id"
						:key="spec.id"
						:class="{color:item_id[indexByItem] == spec.id }"
						@click="tab1(indexByItem, spec, index,$event)"
						:data-spec-id="spec.spec_id"
						:data-item-id="spec.id"
					>{{spec.item}}</li>

					<div class="edit_btn">
						<div v-if="!item.btn">
						<el-button
							style="margin-left:20px"
							type="info"
							plain
							@click="addStyle(item,index)"
						>＋添加规格值</el-button>
						</div>
						<div v-if="item.btn">
						<input placeholder="规格值名称" class="edit_input" v-model="item.spec_name" />
						<el-button size="mini" type="primary" @click="confirm(item,index)">确认</el-button>
						<el-button size="mini" type="danger" @click="cancel(item,index)">取消</el-button>
						</div>
					</div>
				</ul>
			</div>
			
			<!-- <div class="goods_brand public" v-if="data4 && data4.specList.group">
				<div v-for="(item, index) in data4.specList.group" :key="index" >
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}:</span>
					<div class="showChild">
						<div v-for="(spec, indexByItem) in data4.children" :key="spec.id">
							<div v-if="index == spec.spec_id" style="margin: 5px;">
								<el-button @click="tab2(indexByItem, spec, index)" :class="[status[indexByItem] == true ? 'activeColor' : '']">
									{{spec.item}}
								</el-button>
							</div>
						</div>
						<div class="edit_btn">
							<div v-if="!item.btn">
							<el-button
								style="margin-left:20px"
								type="info"
								plain
								@click="addItem(item, index)"
							>+ 腹痛添加规格值</el-button>
							</div>
							<div v-if="item.btn">
							<input placeholder="规格值名称" class="edit_input" v-model="item.spec_name" />
							<el-button size="mini" type="primary" @click="confirm(item,index)">确认</el-button>
							<el-button size="mini" type="danger" @click="cancel(item,index)">取消</el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br> -->
			<div class="demo-input-size" v-show="dataShow == false">
				<input type="number" v-model="input1" id="num1" name="num1" style="border: 1px solid #C0C4CC;">
				<button class="button1" @click="btnClick1(input1)">更新所有</button>
				<input type="number" v-model="input2" id="num2" name="num2" style="border: 1px solid #C0C4CC;">
				<button class="button1" @click="btnClick2(input2)">更新所有</button>
				<input type="number" v-model="input3" id="num3" name="num3" style="border: 1px solid #C0C4CC;">
				<button class="button1" @click="btnClick3(input3)">更新所有</button>
				<input type="number" v-model="input4" id="num4" name="num4" style="border: 1px solid #C0C4CC;">
				<button class="button1" @click="btnClick4(input4)">更新所有</button>
			</div>
			<div class="g_editss" v-show="dataShow == false"></div>
			
			<div class="market_price z_price" v-if="dataShow == true">
				<span><b class="red">*</b> 店铺价： </span>
				<el-input v-model="goods.price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
				<p class="cue cue1" style="padding-left: 63px;"> 价格必须是0.01~9999999之间的数字，且不能高于市场价</p>
			</div>



			<div class="Member_price z_price" v-if="dataShow == true">
				<span><b class="red">*</b>  市场价： </span>
				<el-input v-model="goods.price_member" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
				<p class="cue cue1" style="padding-left: 63px;">为0则商品详情页不显示，价格必须是0.00~9999999之间的数字，此价格仅为市场参考售价，请根据该实际情况认真填写</p>
			</div>

 
			<div class="Member_price z_price" style="padding-left: 3px;" v-if="dataShow == true"><!-- v-if="datahide == false" -->
				<span><b class="red">*</b> 商品库存：</span>
				<el-input v-model="goods.stock" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input>
				<p class="cue cue1" style="padding-left: 72px;">店铺库存数量必须为0~999999999之间的整数，若启用了库存配置，则系统自动计算商品的总数，此处无需卖家填写</p>
			</div>
			<div class="market_price z_price">
				<span><b class="red"></b>库存警告：  </span>
				<el-input v-model="price_market1" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input>
				<p class="cue cue1" style="padding-left: 63px;">设置最低库存预警值。当库存低于预警值时商家中心商品列表页库存列红字提醒请填写0~255的数字，0为不预警</p>
			</div>
				<!-- v-if="datahide == false" -->
			<div class="market_price z_price" style="padding-left: 3px; ">
				<span><b class="red">*</b> 商品货号：</span>
				<el-input v-model="goods.code" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input>
				<p class="cue cue1" style="padding-left: 72px;">
					商品货号是指商家管理商品的编号，买家不可见最多可输入20个字，支持输入中文、字母、数字、_、/、-和小数点
				</p>
			</div>

			<div class="depot_num z_num" v-if="dataShow == true">
				<span><b class="red">*</b> 商品重量：</span>
				<el-input v-model="goods.weight" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> kg
			</div>
			
			<!-- <div class="set">
				<span>设置： </span>
				<input type="checkbox" v-model="goods.shelves">
				上架
				<input type="checkbox" v-model="goods.recommend">
				推荐
			</div> -->
		</div>
		<div class="editor">
			<span class="fl">商品详情描述： </span>
			<div class="ue fl">
				<UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
				<div class="goods_classify" style="margin: 10px 0;">
					<span>顶部模板</span>
					<el-select v-model="nofreight1" placeholder="不使用" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					<span>底部模板</span>
					<el-select v-model="nofreight2" placeholder="模板1" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					</div>
					<div class="goods_classify" style="margin: 10px 0;">
					<span>包装清单版式</span>
					<el-select v-model="nofreight3" placeholder="不使用" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					<span>售后保证版式</span>
					<el-select v-model="nofreight4" placeholder=" 不使用" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					<span>您可以到 <span style="color: red;">详情版式</span> 进行设置“包装清单模板”和“售后保障模板”</span>
					</div>
					<div>
					<el-button @click.native="something" type="success">新建运费模板</el-button>
				</div>
			</div>
		</div>
		<!-- <div class="button">
			<span @click="addGoods">确认提交</span>
		</div> -->
		<div class="parameter">
			<div v-if="getGoodsAttrDetail != null">
				<div style="display: flex; width: 100%; margin: 25px 0px; 20px 0px;">
					<div style="width: 100%; background: #F6F6F6; padding: 10px 15px;">
						<span class="fl">商品属性 </span>
					</div>
				</div>
				<div class="g_edit">
					<form>
						<table id="p_data" class="table" v-html="getGoodsAttrDetail">
						</table>
						<!-- <el-button type="success" @click="propertySubmit">提交</el-button> -->
					</form>
				</div>
			</div>
		</div>
		<div style="display: flex; width: 100%; margin: 25px 0px; 20px 0px;">
			<div style="width: 100%; background: #F6F6F6; padding: 10px 15px;">
				<span class="fl">商品物流信息 </span>
			</div>
		</div>
		<div class="z_info" style="padding-left: 43px;">
			<div class="depot_num z_num">
				<span style="padding-left: 10px;"> 物流重量(Kg)： </span>
				<el-input v-model="stock1" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input>  Kg
			</div>
			<div class="depot_num z_num">
				<span>物流体积(m 3 )：</span>
				<el-input v-model="weight" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input>   m 3
				<p class="cue cue1" style="padding-left: 97px;">
				商品的体积单位为立方米，如果商品的运费模板按照体积计算请填写此项，为空则默认商品重量为0立方米
				</p>
			</div>
			<div class="goods_classify" style="margin: 10px 0;">
				<span><b class="red">*</b> 运费设置：</span>
				<el-select v-model="goods.express_id" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
				<el-button @click.native="tolink" type="success">新建运费模板</el-button>
				<!-- <el-button @click.native="getFreight" type="success">重新加载</el-button> -->
			</div>
			<div class="goods_classify" style="margin: 10px 0;">
				<div style="margin-left: 95px; padding: 20px; border: 1px solid #D5EFF8; background: #EFF8FF;">
				<div style="display: flex; justify-content: space-between; ">
					<span>默认运费：1.0件内0.00元，每增加1.0件，加0.00元  </span>
					<span style="font-size: 12px; color: #1B9AF7; ">查看详情</span>
				</div>
				<div style="display: flex; ">
					<span>发货地： 河北省 秦皇岛市 海港区</span>
				</div>
				</div>
			</div>
		</div>
		<div style="display: flex; width: 100%; margin: 25px 0px; 20px 0px;">
			<div style="width: 100%; background: #F6F6F6; padding: 10px 15px;">
				<span class="fl">售后服务保障 </span>
			</div>
		</div>
		<div class="z_info" style="padding-left: 43px;">
			<div class="goods_classify" style="margin: 10px 0;">
				<!-- <div class="depot_num z_num" style="display: flex;">
				<div>
					<span style="padding-left: 56px;">发票：   </span>
				</div>
				<div style="padding-left: 5px;">
					<el-radio-group v-model="radio">
					<el-radio :label="3">无</el-radio>
					<el-radio :label="6">普通发票</el-radio>
					<el-radio :label="9">增值税发票</el-radio>
					<el-radio :label="12">普通发票 和 增值税发票</el-radio>
					</el-radio-group>
					<p>选择“无”则将不提供发票</p>
				</div>
				</div> -->
				<div class="depot_num z_num">
				<span style="padding-left: 56px;">发票：</span>
				<el-radio-group v-model="radio1" style="margin: 10px 0;">
					<el-radio :label="3">无</el-radio>
					<el-radio :label="6">普通发票</el-radio>
					<el-radio :label="9">增值税发票</el-radio>
					<el-radio :label="12">普通发票 和 增值税发票</el-radio>
				</el-radio-group>
				<p class="cue cue1" style="padding-left: 97px;">
					选择“无”则将不提供发票
				</p>
				</div>
			</div>
		</div>

		<div style="display: flex; width: 100%; margin: 25px 0px; 20px 0px;">
			<div style="width: 100%; background: #F6F6F6; padding: 10px 15px;">
				<span class="fl">其他信息</span>
			</div>
		</div>
		<!-- {{goods.store_class_one}}<br>{{storeClassData}}<br>{{additional_grouped}}
		{{goods.store_class_two}}<br>{{storeclassByTwo}}<br>{{additional_grouped2}}
		{{goods.store_class_three}}<br>{{storeclassByThree}}<br>{{thirdItem}} -->
		<div class="checkgood-container">
			<div class="checkgood-title">店铺内商品分类：</div>
			<div class="check-container">
				<perfect-scrollbar>	
					<ul>
						<li v-for="(item, i) in storeClassData" :key="i">
							<input type="checkbox" 
								:value="item.class_name"
								v-model="additional_grouped" 
								@change="uniqueCheck(item, i, $event)"
							>
							<label for="fname">{{item.class_name}}</label>  
						

							<ul v-if="storeclassByTwo.length>0" style="margin-left: 15px;">
								<li v-for="(secondItem, ii) in storeclassByTwo" :key="ii">
									<input type="checkbox" 
										v-if="item.id == secondIndex"
										:value="secondItem.id"
										v-model="additional_grouped2" 
										@change="uniqueCheck2(secondItem, ii, $event)"
										>
									<label v-if="item.id == secondIndex" for="fname">{{secondItem.class_name}}</label> 
									<ul v-if="storeclassByThree.length>0" style="margin-left: 15px;">
									<li v-for="(thirdItems, iii) in storeclassByThree" :key="iii">
										<input type="checkbox" 
											v-if="item.id == secondIndex && secondItem.id == thirdIndex"
											:value="thirdItems.id"
											v-model="thirdItem" 
											@change="selectClassChildByThree(thirdItems, iii)"
											>
										<label v-if="item.id == secondIndex && secondItem.id == thirdIndex" for="fname">{{thirdItems.class_name}}</label> 
									</li>
									</ul> 
								</li>
							</ul>  
						</li>
					</ul>
				</perfect-scrollbar>
			</div>
		</div> 
		<div class="z_info">
			<div class="goods_classify" style="margin: 10px 0;">
				<span style="padding-left: 15px; ">库存计数： </span>
				<el-radio-group v-model="radio2" style="margin: 10px 0;">
				<el-radio :label="3">拍下减库存</el-radio>
				<el-radio :label="6">付款减库存</el-radio>
				<el-radio :label="9">出库减库存</el-radio>
				</el-radio-group>
				<p class="cue cue1" style="padding-left: 80px;">
				拍下减库存：买家拍下商品即减少库存，存在恶拍风险。热销商品如需避免超卖可选此方式 <br>
				付款减库存：买家拍下并完成付款方可减少库存，存在超卖风险。如需减少恶拍、提高回款效率，可选此方式；货到付款时将在卖家确认订单时减库存 <br>
				发货减库存：卖家发货时减库存，如果库存充实，需要确保线上库存与线下库存保持一致，可选此方式
				</p>
			</div>
		</div>
		<div class="z_info">
			<div class="goods_classify" style="margin: 10px 0;">
				<span style="padding-left: 15px; ">商品状态： </span>
				<el-radio-group v-model="radio3" style="margin: 10px 0;">
				<el-radio :label="3">立刻发布</el-radio>
				<el-radio :label="6">  放入仓库</el-radio>
				</el-radio-group>
				<p class="cue cue1" style="padding-left: 80px;">
				<el-button @click="addGoods" type="success">下一步，上传商品图片</el-button>
				</p>
			</div>
		</div>
		<div style="padding-top: 150px; "></div>
	</div>
</template>
<script>
import UE from '../../goodsRelease/children/UE';
import qs from 'qs';
export default {
	name: 'editSecond',
	data() {
		return {
			specResult: {},
			select_list: {},
			dataBySpec: "",
			spec_select: [],
			item_id: [],
			spec_select_tow: [],
			spec_data: "",
			group: "",
			inputList: {},
			btn: false,
			spec_name: "",
	  
			defaultMsg: '',
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
				recommend: '0',
				code: ''
			},
			class_two: 0,    // 第二级分类
			class_three: 0,    // 第三级分类编号
			classData: {},   // 一级分类
			brandData: {}, // 品牌数据
			classByTwo: [], // 二级分类数据
			classByThree: [],  // 三级分类数据
			freightData: [],
			storeClassData:[],
			storeclassByTwo:[],
			storeclassByThree:[],
            detail: ' ',
            
            
			selectedTab: 0,
			secondData: null,
			thirdtab: 0,
			thirdData: null,
			btnActive: 0,
            secondtab: 0,
			selectItem1: null,
			specData: null,
			datahide: false,
			price_market1: "",
			code:'',
			radio1: 3,
			radio2: 3,
			radio3: 3,
			nofreight1: "",
			nofreight2: "",
			nofreight3: "",
			nofreight4: "",
			weight: 0.0, 
			model1: "",
			stock1: "",
			additional_grouped: [],
			additional_grouped2: [],
			secondIndex: null,
			thirdIndex: null,
			thirdIndex1: null,
			tempCheck: '',
			tempCheck2: '',
			grandChildBoolean: false,
			thirdItem: null,
			dataShow: null,
			getGoodsAttrDetail: null,
			input1: '',
			input2: '',
			input3: '',
			input4: '',
		};
	},
	props: {
		data1: null,
		data2: null,
		data3: null,
		data4: null,
		data5: null,
		data6: null
	},
	watch: {
		data4(value) {
			if(this.data4) {
				this.getData1(this.data4)
			}
		}
	},
	created() {
		//是否登录
		
		this.getData();
		this.getClass();
		this.getBrand();
		this.getFreight();

		this.getOneStoreClass(); //获取一级店内分类
		// this.goodsParameter();

	},
	methods: {
		btnClick1(val) {
			if(val) {
				// $(".formData").val(val)
				$("input[name='price_market']").val(val)
			}
		},
		btnClick2(val) {
			if(val) {
				$("input[name='price_member']").val(val)
			}
		},
		btnClick3(val) {
			if(val) {
				$("input[name='stock']").val(val)
			}
		},
		btnClick4(val) {
			if(val) {
				$("input[name='weight']").val(val)
			}
		},
		styleTab(ele) {
			if ($(ele).hasClass("color")) {
				$(ele).removeClass("color");
			} else {
				$(ele).addClass("color");
			}
		},
		tab1(index, spec, specGroupId, event) {
			this.specResult = {};
			let ele = event.currentTarget;
			let _this = this;
			this.styleTab(ele);
			$(".spec_list li").each(function() {
				if ($(this).hasClass("color")) {
					let spec_id = $(this).data("spec-id");
					let item_id = $(this).data("item-id");
					if (!_this.specResult.hasOwnProperty(spec_id))
						_this.specResult[spec_id] = [];
					_this.specResult[spec_id].push(item_id);
				}
			});
			let status = false;
			this.getSpecItem(status, _this.specResult);
		},
		selectClassChildByThree(val, ind) {
			if(this.grandChildBoolean == false) {
				this.grandChildBoolean = true

				this.store_class_three = parseInt(val.id)
				this.goods['store_class_three'] = parseInt(val.id)
			} else {
				this.grandChildBoolean = false

				this.store_class_three = null
				this.goods['store_class_three'] = 0
			}

			// this.additional_grouped3 = [];
			// for(let i = 0; i < this.storeclassByThree.length; i++) {
			// 	if(this.storeclassByThree[i].id == this.goods.store_class_three) {
			// 		this.additional_grouped3.push(this.storeclassByThree[i].class_name)
			// 		if(this.additional_grouped3) {
			// 			this.tempCheck2 = this.additional_grouped3
			// 		}
			// 	}
			// }
			
		},
		uniqueCheck(val, index, e){
			this.additional_grouped = [];
			if (e.target.checked) {
				this.additional_grouped.push(e.target.value);
				if(this.additional_grouped) {
					this.tempCheck = this.additional_grouped
				}
				// console.log(this.tempCheck)

				this.selectClsssChild2(val, index)
			} else {
				this.additional_grouped = []
				this.additional_grouped2 = []
				this.thirdItem = null

				this.goods.store_class_one = 0
				this.goods.store_class_two = 0
				this.goods.store_class_three = 0
			}
			// this.selectClsssChild2(val, index)
		},
		uniqueCheck2(val, index, e){
			this.additional_grouped2 = [];
			if (e.target.checked) {
				this.additional_grouped2.push(e.target.value);
				if(this.additional_grouped2) {
					this.tempCheck2 = this.additional_grouped2
				}
				// console.log(this.tempCheck2)
				this.selectClassChildByTwo2(val, index)
			} else {
				this.additional_grouped2 = []
				this.thirdItem = null

				this.goods.store_class_two = 0
				this.goods.store_class_three = 0
			}
			// this.selectClassChildByTwo2(val, index)
		},
		//获取规格项
		getSpecItem(status, specres) {
			// this.dataShow = false
			let spec = null;
			// specres = this.specResult
			if (Object.keys(specres).length !== 0) {
				spec = specres;
			} else {
				if (Object.keys(specres).length === 0 && status === false) {
					spec = spec;
				} else {
					spec = this.spec_select;
				}
			}
			
			if(spec == null) {
				this.dataShow = true
			} else {
				this.dataShow = false
			}
			
			this.$HTTP(this.$httpConfig.getGoodsSpec, { spec: spec }, "post")
			.then(res => {
				$(".g_editss").html("");
				$(".g_editss").append(res.data.data);
				let id = "spec_input_tab";
				this.mergeCell(id);
				this.$nextTick(() => {
					this.addUploadImg();
				});
			})
			.catch(err => {
				console.log(err);
			});
		},
		// <table class='table table-bordered' id='spec_input_tab'>
		// 	<tr> 
		// 		<td><b>颜色</b></td>
		// 		<td><b>普通价格</b></td>
		// 		<td><b>会员价格</b></td>
		// 		<td><b>库存</b></td>               
		// 		<td><b>商品重量</b></td>
		// 		<td><b>商品编码</b></td>
		// 		<td><b>操作</b></td>
		// 		<td><b>预览</b></td>
		// 	</tr>
		// 	<tr>
		// 		<td>tt</td>
		// 		<td><input type='text' data-key='160'  name='price_market'   value=''/></td>
		// 		<td><input type='text' data-key='160'  name='price_member'   value=''/></td>
		// 		<td><input type='text' data-key='160'  name='stock'   value=''/></td>
		// 		<td><input type='text' data-key='160' name='weight'   value=''/></td>
		// 		<td><input type='text' data-key='160' name='sku' value=''/></td>
		// 		<td>
		// 			<input type='file' accept='image/png, image/jpeg' class='uploadBtn' data-key='160' value='上传图片' />
		// 			<span>上传图片</span>
		// 			<input type='hidden' data-key='160' name='pic_url' />
		// 		</td>
		// 		<td class='showImg'><img src='' width='50' height='50'/></td>
		// 	</tr>
		// </table>
		getSpecItem1() {
			this.$HTTP(
			this.$httpConfig.getGoodsSpec,
				{ spec: this.spec_select },
				"post"
			)
			.then(res => {
				if(res.data.data && res.data.data !== null) {
					this.dataShow = false
				}
				
				$(".g_editss").html("");
				$(".g_editss").append(res.data.data);
				let id = "spec_input_tab";
				this.mergeCell(id);
				this.$nextTick(() => {
					this.addUploadImg();
				});
			})
			.catch(err => {
				console.log(err);
			});
		},
		addUploadImg() {
			let _this = this;
			$(".uploadBtn").on("change", function(e) {
				_this.uploadImg(e.target.files[0], e.target);
			});
			// $(".del").on("click", function(e) {
			// 	_this.delGuige(e);
			// });
		},
		uploadImg(file, _dom) {
			const loading = this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)"
			});
			this.axios
			.post(
				this.$store.state.image_api_url + "FileUpload/getGoodsImageConfig",
				qs.stringify({})
			)
			.then(res => {
				if (res.data.status == 0) {
				this.$layer.msg(data.message);
				loading.close();
				return;
				}
				let data = res.data.data;
				this.imageConf = data.config;
				this.imageToken = data.token;
				this.sToken = data.s_token;

				var formData = new FormData();
				formData.append("fileData", file);
				formData.append("imageToken", this.imageToken);
				formData.append("sessionToken", this.sToken);
				this.axios
				.post(
					this.$store.state.image_api_url +
					"FileUpload/uploadImageToLocal/",
					formData
				)
				.then(res => {
					let _data = res.data;
					if (_data.status == 1) {
					this.$message.success(_data.message);
					$(_dom)
						.siblings("input[type='hidden']")
						.val(_data.data);
					$(_dom)
						.parent()
						.siblings(".showImg")
						.find("img")
						.attr("src", this.URL + _data.data);
					loading.close();
					} else {
					this.$message.warning(_data.message);
					loading.close();
					}
				});
			});
		},
		delGuige(e) {
			//delChildGoods
			this.$HTTP(
				this.$httpConfig.delChildGoods,
				{ id: e.target.dataset.value },
				"post"
			).then(res => {
				console.log(res);
				if (res.data.status == 1) {
				this.$message.success(res.data.message);
				$(e.target)
					.parent()
					.parent()
					.remove();
				}
			});
		},
		mergeCell(id) {
			var tab = document.getElementById(id); //要合并的tableID
			var maxCol = 2,
			val,
			count,
			start; //maxCol：合并单元格作用到多少列
			if (tab != null) {
			for (var col = maxCol - 1; col >= 0; col--) {
				count = 1;
				val = "";
				for (var i = 0; i < tab.rows.length; i++) {
				if (val == tab.rows[i].cells[col].innerHTML) {
					count++;
				} else {
					if (count > 1) {
					//合并
					start = i - count;
					tab.rows[start].cells[col].rowSpan = count;
					for (var j = start + 1; j < i; j++) {
						tab.rows[j].cells[col].style.display = "none";
					}
					count = 1;
					}
					val = tab.rows[i].cells[col].innerHTML;
				}
				}
				if (count > 1) {
				//合并，最后几行相同的情况下
				start = i - count;
				tab.rows[start].cells[col].rowSpan = count;
				for (var j = start + 1; j < i; j++) {
					tab.rows[j].cells[col].style.display = "none";
				}
				}
			}
			}
		},
		submit1() {
			let data = $("form").formSerialize();
			data += '&token='+ sessionStorage.getItem('data_token');
			let newData = {};
			this.axios.post(this.$httpConfig.editGoodsAttr, data).then((res) => {
				if(res.data.status){
					this.$message.success(res.data.message);
					if(this.dataShow == false) {
						this.submit()
					} else {
						this.$emit('currentTab', 2)
					}
					// setTimeout(() => {
					// 		this.$router.push('/goodsManage')
					// },1000)
				}else{
					this.$message.error(res.data.message);
				}
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		submit() {
			let that = this;
			let inputList = {};
			let flag = false;
			let tmp = {};
			let key;
			$("#spec_input_tab tr").each(function(index, ele) {
				$(ele)
					.find("input")
					.each(function(index, ele) {
						key = $(ele).attr("data-key");
						let name = $(ele).attr("name");
						let val = $(ele).val();
						tmp[name] = val;
						inputList[key] = {};
						// if (val === "" && name !== 'pic_url' && typeof name !== "undefined") {
						// 	flag = true;
						// }
						if ((val === "" && name == 'price_market') ||
							(val === "" && name == 'price_member') ||
							(val === "" && name == 'stock') ||
							(val === "" && name == 'weight') ||
							(val === "" && name == 'sku')
						) {
							flag = true;
						}
					});
				if (typeof key !== "undefined") {
					inputList[key] = tmp;
				}
				tmp = {};
			});
			// if (flag !== true) {
			// 	this.$message({
			// 		duration: 1000,
			// 		type: "error",
			// 		message: "规格信息错误"
			// 	});
			// } else {
				this.$HTTP(this.$httpConfig.editGoodsSpec, { item: inputList }, "post")
					.then(res => {
						this.$message({
							duration: 1000,
							message: res.data.message
						});
						this.$emit('currentTab', 2)
						this.$emit("selectTab");
						this.$store.state.tab_state = 2;
						this.$emit("getParameter");
						if (!this.$store.state.tab_Index[2]) {
							this.$store.state.tab_Index.push(2);
						}
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			// }
		},
		
		
		//获取编辑调用的接口
		confirm(item) {
			if (item.spec_name) {
			var str = item.spec_name.replace(/\s+/g, "");
			if (str == "") {
				this.$message("输入信息不能为空");
				return "";
			} else {
				this.$HTTP(this.$httpConfig.confirmGoodsItem, {
				spec_id: Number(item.id),
				item: str
				}).then(res => {
				if (res.data.status === 1) {
					this.$HTTP(
					this.$httpConfig.getGoodsSpecInfo,
					{ id: this.data3.id },
					"post"
					).then(res => {
					// this.data4 = res.data.data;
					});
				}
				});
			}
			} else {
			this.$message("输入信息不能为空");
			return "";
			}
		},
		//取消
		cancel(item, index) {
			item.btn = false;
			Vue.set(this.data4.group[index], "btn", false);
		},
		addItem(parentData, index) {
			Vue.set(this.data4.group[index], "btn", true);
		},
		backtoStep2(event) {
			this.$emit('currentTab', 0)
        },
        nextPage(item) {
			if(this.selectItem1 && this.selectItem2 && this.selectItem3 && item) {
				this.selectedTab = item
			}
		},
		getClass2() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: this.selectItem2.id
			}, 'post')
			.then((res) => {
				this.thirdData = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		
		
		
		getClass1() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: this.selectItem1.id
			}, 'post')
			.then((res) => {
			this.secondData = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		getData1(data) {
			console.log(data);
			if (this.spec_data && this.s == 2) return;
			console.log(12323)
			this.spec_data = data;
			let item_id = data.item_id;
			this.group = data.specList.group;
			let item = data.item_id;
			let children = data.specList.children;
			//处理
			for (let key in children) {
				this.select_list[children[key].id] = children[key];
			}
			
			for (let key in item_id) {
				this.item_id[item_id[key]] = item_id[key];
			}
			
			for (let i in item) {
				for (let index in children) {
					if (item[i] == children[index].id) {
						let spec_list = children[index].spec_id;
						if (typeof this.spec_select[spec_list] === "undefined") {
						this.spec_select[spec_list] = [];
						}
						this.spec_select[spec_list].push(item[i]);
					}
				}
			}
			console.log(this.select_list);

			
			var keys = Object.keys(data.item_id);
			var len = keys.length
			// data.item_id.length
			if(len > 0) {
				this.getSpecItem1();
			} else {
				this.dataShow = true
			}
			
		},
        getData() {
			this.$HTTP(this.$httpConfig.getGoodsDetail,{id: this.$route.params.id}).then((res) => {
				this.goods = res.data.data.goods;
				this.$store.state.three_class_id_tow = this.goods.class_three;
				this.goodsParameter();
				this.$emit('getSpec');
				this.goods.recommend = this.goods.recommend == '0' ? false : true;
				if (this.goods.class_id) {
					this.status = true;
					this.selectChild(this.status);
				}
				if(this.goods.store_class_one){
					this.selectClsssChild(this.status);
				}
				// this.va();
				let obj = this.$refs.ue.editor;
				this.defaultMsg = res.data.data.goods_detail.detail;
				obj.setContent(this.defaultMsg);
			}).catch((err) => {
				console.log(err);
			})
		},
		
		
		goodsParameter() {
			// if(this.$store.state.relInfo_tow) return;
			this.$HTTP(this.$httpConfig.getGoodsAttrDetail, { class_three: this.$store.state.three_class_id_tow }, "post").then((res) => {
				if (res.data.data != null) {
					this.getGoodsAttrDetail = res.data.data
					this.$store.state.relInfo_tow = res.data.data;
				} else {
					this.$store.state.relInfo_tow = '暂无数据';
				}
				// this.$message.success(res.data.message);
			}).catch((err) => {
				//this.$message.error(err);
			});
		},
		getOneStoreClass(){
			this.$HTTP(this.$httpConfig.storeClassList,{},'post').then(res=>{
				console.log(res);
				this.storeClassData = res.data.data;

				this.additional_grouped = [];
				for(let i = 0; i < res.data.data.length; i++) {
					if(res.data.data[i].id == this.goods.store_class_one) {
						this.additional_grouped.push(res.data.data[i].class_name)
						if(this.additional_grouped) {
							this.tempCheck = this.additional_grouped
						}
						this.selectClsssChild2(res.data.data[i], i)
						break
					}
				}
				
				
				
			}).catch(err=>{
				console.log(err);
			})
		},
		tolink() {
			const { href } = this.$router.resolve({
				name: 'logistics'
			})
			window.open(href, '_blank')
		},
		//获取编辑数据
		
		getUEContent() {
			let content = this.$refs.ue.getUEContent();
			// console.log(content);
			return content;
		},
		//给全局变量赋值
		va() {
			this.$store.state.three_class_id_tow = this.goods.class_three;
			console.log(this.$store.state.three_class_id_tow)
		},
		// 获取 品牌
		getBrand() {
			this.$HTTP(this.$httpConfig.getBrandList,{}).then((res) => {
				this.brandData = res.data.data;
			})
		},
		//获取运费
		getFreight() {
			this.$HTTP(this.$httpConfig.getGoodsFreightList, {}, 'post').then((res) => {
				this.freightData = res.data.data;
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		//商品分类搜索
		getClass() {
			//获取分类
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
		/**
		 * 二级分类（change);
		 */
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
			// console.log(this.class_id);
			//获取分类
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
				// console.log(this.classByThree)
			}).catch((err) => {
				console.log(err)
			});
		},
		selectClsssChild2(val, index){
			console.log("Additional ", JSON.stringify(this.additional_grouped))
			console.log("Check ", JSON.stringify(this.tempCheck))
			console.log(val.class_name)
			this.childBoolean = false
			this.grandChildBoolean = false
			//  && (this.parentBoolean == false)
			if((this.additional_grouped == this.tempCheck)) {
					// this.parentBoolean = true

					this.checkboxes = null
					if(val) {
						this.checkboxes = val.class_name
					}
					this.goods['store_class_one'] = parseInt(val.id)
					this.store_class_id = parseInt(val.id)
					this.store_class_two = null
					this.storeclassByTwo = [];
					this.storeclassByThree = [];
					this.store_class_three = null;
					this.$HTTP(this.$httpConfig.nextClass, {
						id: parseInt(val.id)
					}, 'post').then((res) => {
					if (!res.data.data) {
						this.$layer.msg(res.data.message);
						return;
					}
					this.storeclassByTwo = res.data.data;

					// this.additional_grouped2 = [];
					// for(let i = 0; i < this.storeclassByTwo.length; i++) {
					// 	if(this.storeclassByTwo[i].id == this.goods.store_class_two) {
					// 		this.additional_grouped2.push(this.storeclassByTwo[i].class_name)
					// 		if(this.additional_grouped2) {
					// 			this.tempCheck2 = this.additional_grouped2
					// 		}
					// 	}
					// }
					
					// console.log(JSON.stringify(this.storeclassByTwo))
					this.secondIndex = this.storeclassByTwo[0].f_id
					}).catch((err) => {
					console.log(err)
					});

			} else if(val.class_name != this.additional_grouped) { // && this.parentBoolean == true
					// this.parentBoolean = false

					this.checkboxes = null
					this.store_class_id = null
					this.goods['store_class_one'] = 0
					this.store_class_two = null
					this.storeclassByTwo = [];
					this.storeclassByThree = [];
					this.store_class_three = null;
					this.secondIndex = null
			}
		},
		selectClsssChild(){
			this.store_class_two = null
			this.storeclassByTwo = [];
			this.storeclassByThree = [];
			this.store_class_three = null;
			this.$HTTP(this.$httpConfig.nextClass, {
				id: parseInt(this.goods.store_class_one)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
					return;
				}
				this.storeclassByTwo = res.data.data;

				this.additional_grouped2 = [];
				for(let i = 0; i < this.storeclassByTwo.length; i++) {
					if(this.storeclassByTwo[i].id == this.goods.store_class_two) {
						this.additional_grouped2.push(this.storeclassByTwo[i].id)
						if(this.additional_grouped2) {
							this.tempCheck2 = this.additional_grouped2
						}
						this.selectClassChildByTwo2(this.storeclassByTwo[i], i)
					}
				}
				

				if(this.goods.store_class_two){
					this.selectClassChildByTwo();
				}
				//	console.log(this.classByThree)
			}).catch((err) => {
				console.log(err)
			});
		},

		selectClassChildByTwo(){
			this.storeclassByThree = [];
			this.store_class_three = null;
			this.$HTTP(this.$httpConfig.nextClass, {
				id: parseInt(this.goods.store_class_two)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.storeclassByThree = res.data.data;

				// this.additional_grouped3 = [];
				// for(let i = 0; i < this.storeclassByThree.length; i++) {
				// 	if(this.storeclassByThree[i].id == this.goods.store_class_three) {
				// 		this.additional_grouped3.push(this.storeclassByThree[i].class_name)
				// 		if(this.additional_grouped3) {
				// 			this.tempCheck2 = this.additional_grouped3
				// 		}
				// 	}
				// }

			}).catch((err) => {
				console.log(err)
			});
		},
		selectClassChildByTwo2(val, ind) {
			this.grandChildBoolean = false
			// this.childBoolean == false
			if(this.additional_grouped2 == this.tempCheck2) {
					// this.childBoolean = true

					this.thirdIndex1 = val.id
					this.goods['store_class_two'] = parseInt(val.id)
					this.store_class_two = parseInt(val.id)
					this.storeclassByThree = [];
					this.store_class_three = null;
					this.$HTTP(this.$httpConfig.nextClass, {
					id: parseInt(val.id)
					}, 'post').then((res) => {
					if (!res.data.data) {
						this.$layer.msg('暂无数据:(');
						return;
					}
					this.storeclassByThree = res.data.data;
					this.thirdItem = true
					if(this.storeclassByThree.length) {
						this.goods['store_class_three'] = parseInt(this.storeclassByThree[0].id)
					}
					this.thirdIndex = this.storeclassByThree[0].f_id
					}).catch((err) => {
					console.log(err)
					});

			} else {
					// this.childBoolean = false

					this.thirdIndex1 = null
					this.store_class_two = null
					this.goods['store_class_two'] = 0
					this.goods['store_class_three'] = 0
					this.storeclassByThree = [];
					this.store_class_three = null;
					// this.thirdIndex = null
			}
			
		},

		/**
		 * 第三级分类
		 */
		selectChildByTwo() {
			this.classByThree = [];
			this.class_three = null;
			//获取分类
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_two) }, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.classByThree = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		/**
		 * 添加商品
		 * /^[\u4e00-\u9fa5\s_a-zA-Z0-9]+$/
		 * /^[\x{4e00}-\x{9fa5}0-9a-zA-Z-_、，；！：,. 。“”【】（）]+$/u
		 */
		addGoods() {
			let reg=/^[\u4e00-\u9fa5\s_a-zA-Z0-9/_、，；！：,. 。“”【】（）]+$/g;
			if (!reg.test(this.goods.title)) {
				this.$layer.msg('商品名称异常，请尽量输入中文符号');
				return false;
			}

			// if(this.dataShow == false) {
			// 	this.goods.price_market=0
			// 	this.goods.price_member=0
			// 	this.goods.stock=0
			// 	this.goods.code=0
			// 	this.goods.weight=0
			// }
			this.goods['recommend'] = Number(this.goods.recommend); //是否推荐
			this.goods['title'] = this.goods.title; //商品名称
			this.goods['detail'] = this.getUEContent(); //商品详情
			this.goods['description'] = this.goods.description; //商品简介
			this.goods['keyword'] = this.goods.keyword; 
			this.goods['siteTitle'] = this.goods.siteTitle; 
			// 提交商品基本信息
			this.$HTTP(this.$httpConfig.saveGoods, this.goods, 'post').then((res) => {
				this.submit1()
				
				this.$message.success(res.data.message);
				if (!this.$store.state.tab_Index[1]) {
					this.$store.state.tab_Index.push(1);
				}
				// this.$emit('selectTab');
				this.$emit('imageList');
				this.$store.state.tab_state = 1;
				// this.$emit('currentTab', 2)
			}).catch((err) => {
				console.log(err)
			});
		}
	},
	mounted() {
		document.body.scrollTop = 0;
	},
	components: {
		UE
	},
}
</script>
<style>
	.demo-input-size {
		display: flex;
		width: 100%;
	}
	.button1 {
		font-size: 14px;
		margin: 0px 5px;
		cursor: pointer;
		padding: 5px 5px;
		border-radius: 3px;
		background: #f7bc0a;
		color: #909399;
		background: #f4f4f5;
		border: 1px solid #d3d4d6;
	}
	.g_editss .table {
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		border-top: 1px solid #ddd;
		margin-top: 15px;
	}
	.g_editss .table tr td {
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
		text-align: center;
		vertical-align: inherit;
	}
	.g_editss .table tr td b {
		font-weight: bold;
		color: #333;
	}
	.g_editss .table tr td input {
		padding-left: 5px;
		height: 32px;
		border: 1px solid #cccccc;
	}
	.g_editss .table tr td span {
		background: #088be6;
		display: inline-block;
		color: #ffffff;
		font-size: 12px;
		border-radius: 4px;
		line-height: 24px;
		width: 58px;
		height: 24px;
		position: relative;
		bottom: -1px;
		z-index: -1;
	}
	.uploadImg {
		width: 58px;
		height: 24px;
		border: none;
		background: #088be6;
		color: #ffffff;
		font-size: 12px;
		border-radius: 4px;
		opacity: 0;
		position: absolute;
	}
	.uploadBtn {
		/* width: 100%;
		height: 100%; */
		overflow: hidden;
		position: absolute;
		/* top: 50%; */
		transform: translateY(-50%);
		margin-top: 15px;
		/* left: 0; */
		opacity: 0;
	}
</style>
<style lang="less" scoped>
.currency {
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 20px;
  padding: 10px;
  border-top: 0;
  color: #333;
  .d_title {
    padding: 10px 0;
  }
  .ss {
    padding-left: 5px;
  }
  	.checkgood-container{
        display: flex;
        .checkgood-title{
          margin-left: 45px;
          font-size: 12px;
        }
        .check-container{
          border: 1.5px solid #f1f1f1;
          padding: 10px;
          width:15%;
          overflow-x: hidden !important;
          // overflow: hidden;
        }
        .ps {
            height: 200px;
        }
        .check-title{
          font-size: 12px;
        }
        .check-subgroup{
          padding-left: 20px;
          font-size: 12px;
        }
        .check-subtitle{
          font-size: 12px;
          // width: 100%;
        }
    }
  .z_info {
    padding-left: 65px;
	border-radius: 4px;
	.goods_name1 {
		padding-top: 15px;
    	padding-bottom: 25px;
	}
    .goods_name {
      span {
        padding: 10px 0;
        b {
          color: #ff0000;
        }
      }
      .text_name {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
      .cue {
        padding: 10px 0 10px 75px;
      }
    }
    .goods_brief {
      padding-left: 12px;
      span {
        padding: 10px 0;
      }
      textarea {
        border: 1px solid #cccccc;
        margin: 10px 0;
      }
      .cue {
        padding: 10px 0 10px 63px;
      }
	}
	.public {
		padding-left: 12px;
		span {
			padding: 10px 0;
		}
		select {
			margin: 10px 0;
			width: 288px;
			height: 32px;
			border: 1px solid #cccccc;
			border-radius: 4px;
		}
		.showChild{
			display: flex;
			flex-wrap: wrap;
		}
		.activeColor {
			background-color: #f7bc0a !important;
			color: #fff !important;
		}
		.edit_btn {
			display: inline-block;
			margin: 1px;
			line-height: 50px;
			padding: 1px;
		}
		.edit_input {
			vertical-align: middle;
			margin: 10px;
			line-height: 10px;
			border-radius: 5px;
			border: 1px solid #dbdbdb;
			height: 26px;
		}
    }
    .goods_classify {
      span {
        padding: 10px 0;
        b {
          color: #ff0000;
        }
      }
      select {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
    }
    .public {
      padding-left: 12px;
      span {
        padding: 10px 0;
      }
      select {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
    }
    .z_price {
      padding-left: 12px;
      border-radius: 4px;
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
        border-radius: 4px;
      }
    }
    .z_num {
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
        border-radius: 4px;
      }
    }
    .set {
      padding-left: 33px;
      span {
        padding: 10px 0;
      }
      input {
        margin: 10px 0;
        border: 0;
        width: 15px;
        height: 15px;
        border-radius: 4px;
      }
    }
  }
  .presell_days {
    padding-left: 12px;
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
      border-radius: 4px;
    }
  }
  .editor {
    padding: 10px 0 0 50px;
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
}

    .editPopover {
        font-size: 12px !important;
    }
    .ps {
        height: 150px;
    }
	

	.goods_title {
        border-right: 0;
        position: relative;
        background: #F6F6F6;
        padding: 15px;
		display: flex;
		.title {
			color: #333333;
		}
	}


	.parameter {
		height: auto;
		min-height: 100px;
		line-height: 20px;
		padding: 10px 0px;
		border-top: 0;
		color: #333;
  	}

	input[type=checkbox]:checked:before {
		background-color: #f7bc0a !important;
	}

	input[type='checkbox']:checked:after {
		background-color: #f7bc0a !important;
	}
	.g_size {
      padding-left: 77px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      span {
        margin: 18px 0;
      }
      ul {
        margin: 12px 0;
        li {
          padding: 0 5px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background-color: #ddd;
          color: #333;
          display: block;
          margin-right: 25px;
          margin-top: 10px;
          float: left;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
        li.color {
          background-color: #f7bc0a;
          color: #fff;
        }
      }
    }
</style>
<style>
	.g_edit .table {
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		border-top: 1px solid #ddd;
		margin-top: 15px;
	}
	
	.g_edit .table tr td {
		padding: 10px 0px;
    	padding: 10px 10px;
		border-bottom: 1px solid #ddd;
		text-align: center;
    	text-align: left;
		vertical-align: inherit;
	}
	
	.g_edit .table tr td b {
		font-weight: bold;
		color: #333;
	}
	
	.g_edit .table tr td select {
		width: 200px;
		height: 40px;
		border: 1px solid;
		border-color: #ff920b;
		cursor: pointer;
		border-radius: 4px;
		box-sizing: border-box;
		padding: 0 15px;
	}
	
	.g_edit .table tr td select option {
		color: #ff920b;
		border: 1px solid #eee;
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		font-size: 14px;
		padding: 10px 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 34px;
		line-height: 34px;
		cursor: pointer;
	}
	
	.g_edit .table tr td input {
		padding-left: 5px;
		height: 32px;
		border: 1px solid #cccccc;
  	}
	  
</style>

	


<!--
 getGoodsDetail = modifyGood
 getGoodsAttrDetail = ajaxGetAttributeInput
 getGoodsSpec = getAddContentByGoodsAttribute
-->
