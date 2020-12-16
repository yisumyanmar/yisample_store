<template>
	<div class="currency">
		<div class="z_info">
			<div class="goods_name goods_name1">
				<span><b class="red">*</b>商品分类：   家用电器 > 厨卫大电 > 电热水器 
					<!-- <span style="color: #0573C8; cursor: pointer; " @click="backtoStep1">编辑 </span>  -->
					<span style="color: #0573C8; cursor: pointer; " v-on:click="$emit('backtoStep1')">编辑 </span> 
					<span style="color: #0573C8; cursor: pointer; " v-on:click="backtoStep2">编辑 </span>
				</span>
			</div>
			<div class="goods_name">
				<span><b class="red">*</b> 商品名称： </span>
				<el-input v-model="title" :maxlength="60" size="medium" style="width: 250px;" clearable>
				</el-input>
				<p class="cue cue1">商品标题名称长度至少3个字，最长60个字</p>
			</div>
			
			<div class="goods_brief">
				<span class="fl">商品卖点：</span>
				<el-input style="width: 288px;" type="textarea" :maxlength="60" :autosize="{ minRows: 2, maxRows: 4}" v-model="description">
				</el-input>
				<p class="cue cue1">商品卖点最长不能超过140个字，设置后有利于搜索引擎优化</p>
			</div>
			<div class="goods_brand public">
				<span>商品品牌： </span>
				<el-select v-model="brand_id" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in brandData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
			</div>
			<!--	No.1 End	-->

			<div class="goods_brand public">
				<span>商品规格：</span>
			</div>
			<br>

			<div class="goods_brand public">
				<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;颜色：</span>
				<el-button style="background: #F7BC0A; color: #ffffff;">图片色</el-button>
				<el-button style="background: #f1f1f1; color: #a4a5a7;">+ 腹痛添加规格值</el-button>
			</div>
			<br>

			<div class="goods_brand public">
				<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规格：</span>
				<el-button style="background: #F7BC0A; color: #ffffff;">AirPodsPro</el-button>
				<el-button style="background: #cccccc; color: #222222;">AirPods1/2</el-button>
				<el-button style="background: #cccccc; color: #222222;">华为freebuds3</el-button>
				<el-button style="background: #f1f1f1; color: #a4a5a7;">+ 腹痛添加规格值</el-button>
			</div>
			<br>

			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
				prop="id"
				label="颜色"
				width="70">
				</el-table-column>
				<el-table-column
				prop="name"
				label="规格"
				width="120">
				</el-table-column>
				<el-table-column
				prop="amount1"
				label="普通价格"
				width="150">
				</el-table-column>
				<el-table-column
				prop="amount2"
				label="会员价格"
				width="150">
				</el-table-column>
				<el-table-column
				prop="amount3"
				label="库存"
				width="150">
				</el-table-column>
				<el-table-column
				prop="amount4"
				label="商品重量"
				width="150">
				</el-table-column>
				<el-table-column
				prop="amount5"
				label="商品编码"
				width="150">
				</el-table-column>
			</el-table>
			<br>

			
			<div class="market_price z_price">
				<span><b class="red">*</b> 店铺价： </span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
				<p class="cue cue1" style="padding-left: 63px;"> 价格必须是0.01~9999999之间的数字，且不能高于市场价</p>
			</div>

			<div class="market_price z_price">
				<span><b class="red"></b> 市场价：  </span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 10px;" clearable>
				</el-input> 元
				<p class="cue cue1" style="padding-left: 63px;">为0则商品详情页不显示，价格必须是0.00~9999999之间的数字，此价格仅为市场参考售价，请根据该实际情况认真填写</p>
			</div>

			<div class="Member_price z_price" style="padding-left: 3px;">
				<span><b class="red">*</b> 商品库存： </span>
				<el-input v-model="price_member" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input>
				<p class="cue cue1" style="padding-left: 72px;">店铺库存数量必须为0~999999999之间的整数，若启用了库存配置，则系统自动计算商品的总数，此处无需卖家填写</p>
			</div>

			<div class="market_price z_price">
				<span><b class="red">*</b> 市场价：</span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
			</div>
			<div class="market_price z_price">
				<span><b class="red">*</b> 会员价：</span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
			</div>
			<div class="market_price z_price" style="padding-left: 25px;">
				<span><b class="red">*</b> 库存: </span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 8px;" clearable>
				</el-input> 个
			</div>

			<!-- no.8 -->
			<div class="market_price z_price">
				<span><b class="red"></b> 库存警告：  </span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
				<p class="cue cue1" style="padding-left: 63px;">设置最低库存预警值。当库存低于预警值时商家中心商品列表页库存列红字提醒请填写0~255的数字，0为不预警</p>
			</div>
			<div class="market_price z_price">
				<span><b class="red"></b> 商品货号：  </span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
				<p class="cue cue1" style="padding-left: 63px;">
					 商品货号是指商家管理商品的编号，买家不可见最多可输入20个字，支持输入中文、字母、数字、_、/、-和小数点
				</p>
			</div>
			
			<!-- no.8 -->
			<div class="market_price z_price">
				<span><b class="red"></b>  商品图片： </span>
				<!-- <img class="" src="../../../../../../assets/images/secondTab/3.png"> -->
				<el-upload
                        :action="action"
                        list-type="picture-card"
                        accept=".jpg,.png,.jpeg"
                        multiple
                        :limit=8
                        name="adv_content"
                        :data="uploadData"
                        :before-upload="beforeUploade"
                        :file-list="fileList"
                        :on-success="success"
                        :on-exceed="exceeding"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
				<p class="cue cue1" style="padding-left: 63px;">
					上传商品默认主图，无规格主图时展示该图,支持jpg、gif、png格式上传或从图片空间中选择，建议使用尺寸800*800像素以上上传后的图片将会自动保存在图片空间  间的默认分类中
				</p>
				<div style="padding-left: 63px;">
					<el-button @click.native="tolink" type="success">
						<img class="" src="../../../../../../assets/images/secondTab/1.png">
						上传本地图片
					</el-button>
					<el-button @click.native="getFreight" type="success">
						<img class="" src="../../../../../../assets/images/secondTab/1.png">
						从图片空间中选择
					</el-button>
				</div>
			</div>
		</div>
		
		<div class="editor">
			<span class="fl">商品描述： </span>
			<div class="ue fl" style="padding-left: 10px;">
				<UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>

				<!-- no.7 -->
				<div class="goods_classify" style="margin: 10px 0;">
					<span>顶部模板</span>
					<el-select v-model="freight" placeholder="不使用" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					<span>底部模板</span>
					<el-select v-model="freight" placeholder="模板1" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
				</div>
				<div class="goods_classify" style="margin: 10px 0;">
					<span>包装清单版式</span>
					<el-select v-model="freight" placeholder="不使用" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					<span>售后保证版式</span>
					<el-select v-model="freight" placeholder=" 不使用" style="margin: 10px 0;">
						<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
					<span>您可以到 <span style="color: red;">详情版式</span> 进行设置“包装清单模板”和“售后保障模板”</span>
				</div>
				<div>
					<el-button @click.native="tolink" type="success">新建运费模板</el-button>
				</div>
				<!-- no.7 -->

			</div>
		</div>
		
		<!-- no.9 -->
		<div style="display: flex; width: 100%; margin: 25px 0px; 20px 0px;">
			<div style="width: 100%; background: #F6F6F6; padding: 10px 15px;">
				<span class="fl">商品物流信息 </span>
			</div>
		</div>
		<div class="z_info" style="padding-left: 43px;">
			<div class="depot_num z_num">
				<span style="padding-left: 10px;"> 物流重量(Kg)： </span>
				<el-input v-model="stock" size="medium" style="width: 250px;margin: 10px 0;" clearable>
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
				<span style="padding-left: 23px;"><b class="red">*</b> 运费模板：</span>
				<el-select v-model="freight" placeholder=" 市内模板10元" style="margin: 10px 0;">
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
		<!-- no.9 -->

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
					<el-radio-group v-model="radio" style="margin: 10px 0;">
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
		<!-- 店铺内商品分类： -->
		<!-- <div class="z_info" style="padding-left: 43px;">
			<div class="goods_classify" style="margin: 10px 0; display:flex; ">
				<span>店铺内商品分类：</span>
				<perfect-scrollbar>
					<el-menu class="elmenucss" default-active="2">
						<el-submenu index="1" class="submenucss">
							<template slot="title">
								<span slot="title">Navigator One</span>
							</template>
						</el-submenu>
						<el-menu-item index="1-1">item one</el-menu-item>
						<el-menu-item index="1-2">item two</el-menu-item>
						<el-menu-item-group>
							<span slot="title">Group One</span>
							<el-menu-item index="1-1">item one</el-menu-item>
							<el-menu-item index="1-2">item two</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">item four</template>
							<el-menu-item index="1-4-1">item one</el-menu-item>
						</el-submenu>
					</el-menu>
				</perfect-scrollbar>
			</div>
		</div> -->
		<div class="checkgood-container">
			<div class="checkgood-title">店铺内商品分类：</div>
				
					<div class="check-container">
						<perfect-scrollbar>	
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="check-title">Navigator One</el-checkbox>
						<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="check-subgroup">
							<el-checkbox v-for="city in cities" :label="city" :key="city" class="check-subtitle">{{city}}</el-checkbox>
						</el-checkbox-group>

						<el-checkbox :indeterminate1="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1" class="check-title">Navigator two</el-checkbox>
						<el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1" class="check-subgroup">
							<el-checkbox v-for="city1 in cities1" :label="city1" :key="city1" class="check-subtitle">{{city1}}</el-checkbox>
						</el-checkbox-group>
						</perfect-scrollbar>
					</div>
						
		</div>
		<div class="z_info" style="">
			<div class="goods_classify" style="margin: 10px 0;">
				<span style="padding-left: 15px; ">库存计数： </span>
				<el-radio-group v-model="radio" style="margin: 10px 0;">
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
		<div class="z_info" style="">
			<div class="goods_classify" style="margin: 10px 0;">
				<span style="padding-left: 15px; ">商品状态： </span>
				<el-radio-group v-model="radio" style="margin: 10px 0;">
					<el-radio :label="3">立刻发布</el-radio>
					<el-radio :label="6">  放入仓库</el-radio>
				</el-radio-group>
				<p class="cue cue1" style="padding-left: 80px;">
					<el-button @click.native="tolink" type="success">下一步，上传商品图片</el-button>
				</p>
			</div>
		</div>
		<!-- ///////////////////////////////////////////////////////////////////////////	 -->
		<div style="padding-top: 150px; "></div>
		<!-- <div class="set">
			<span>设置： </span>
			<input type="checkbox" v-model="shelves">
			上架
			<input type="checkbox" v-model="recommend">
			推荐
		</div>
		<div class="goods_name">
			<span><b class="red">*</b> 商品货号: &nbsp;&nbsp;</span>
			<el-input v-model="code" size="medium" style="width: 250px;" clearable>
			</el-input>
			<p class="cue"></p>
		</div>
		<div class="goods_classify" style="margin: 10px 0;">
			<span><b class="red">*</b> 商品分类： </span>
			<el-select v-model="class_id" @change="selectChild()" filterable placeholder="请选择">
				<el-option v-for="item in classData" :key="item.id" :label="item.class_name" :value="item.id">
				</el-option>
			</el-select>
			<el-select @change="selectChildByTwo()" v-if="classByTwo.length !== 0" v-model="class_two" filterable placeholder="请选择">
				<el-option v-for="(items,indexs) in classByTwo" :key="indexs" :label="items.class_name" :value="indexs">
				</el-option>
			</el-select>
			<el-select v-if="classByThree.length !== 0" @change="va" v-model="class_three" filterable placeholder="请选择">
				<el-option v-for="(items,indexs) in classByThree" :key="indexs" :label="items.class_name" :value="indexs">
				</el-option>
			</el-select>
		</div>
		<div class="goods_brief">
			<span class="fl">关键词： </span>
			<el-input v-model="title" :maxlength="60" size="medium" style="width: 250px; padding-left: 12px;" clearable>
			</el-input>
			<p class="cue cue1">Hideeeeeeeeee关键词之间用空格分割，设置后有利于搜索引擎优化</p>
		</div>
		<div class="goods_brief">
			<span class="fl">商品属性：</span>
			<el-input style="width: 288px;" type="textarea" :maxlength="60" :autosize="{ minRows: 2, maxRows: 4}" v-model="description">
			</el-input>
			<p class="cue cue1">商品卖点最长不能超过140个字，设置后有利于搜索引擎优化</p>
		</div>
		<div class="presell_days">
			<span><b class="red">*</b> 预售天数(库存为0)：</span>
			<el-input v-model="advance_date" size="medium" style="width: 250px;margin: 10px 0;" clearable>
			</el-input> 天
		</div>
		<div class="goods_classify" style="margin: 10px 0;">
			<span><b class="red">*</b> 店内分类： </span>
			<el-select v-model="store_class_id" @change="selectClsssChild()" filterable placeholder="请选择">
				<el-option v-for="item in storeClassData" :key="item.id" :label="item.class_name" :value="item.id">
				</el-option>
			</el-select>
			<el-select @change="selectClassChildByTwo()" v-if="storeclassByTwo.length !== 0" v-model="store_class_two" filterable placeholder="请选择">
				<el-option v-for="(items,indexs) in storeclassByTwo" :key="items.id" :label="items.class_name" :value="items.id">
				</el-option>
			</el-select>
			<el-select v-if="storeclassByThree.length !== 0" @change="va" v-model="store_class_three" filterable placeholder="请选择">
				<el-option v-for="(items,indexs) in storeclassByThree" :key="items.id" :label="items.class_name" :value="items.id">
				</el-option>
			</el-select>
		</div>
		<div class="button">
			<span @click="addGoods">确认提交</span>
		</div> -->
	</div>
</template>
<script>
import UE from '../children/UE';
const cityOptions = ['one', 'two', 'three'];
const cityOptions1 = ['one', 'two', 'three','four','five','six','seven'];
export default {
	name: 'currency',
	data() {
		return {
		action:this.$httpConfig.getAdvPictureURL,
		dialogImageUrl: "",
		dialogVisible: false,
		uploadData: {
			id: "",
			token:sessionStorage.getItem("data_token")
		}, 
		uploadFile:[],
		fileList:[],
	      tableData: [{
          id: '图片色',
          name: 'AirPodsPro',
          amount1: '2.00',
          amount2: '1.00',
		  amount3: '200',
		  amount4: '0.009',
		  amount5: '1',
        }],
			defaultMsg: '',
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			title: '',   // 商品名称
			code:'',
			description: '',  // 商品简介
			class_id: 0,    // 第一级分类
			class_two: 0,    // 第二级分类
			class_three: 0,    // 第三级分类编号
			store_class_id: 0, //店内第一级分类
			store_class_two: 0, //店内第二级分类
			store_class_three: 0, //店内第三级分类
			brand_id: 0,    // 品牌编号
			classData: {},   // 一级分类
			storeClassData:[], // 店内一级分类
			price_market: 0.00, // 市场价
			price_member: 0.00,// 会员价
			advance_date: 0,  // 预售期
			shelves: 0,  // 是否上架
			recommend: 0,  // 是否推荐
			stock: 0,  // 库存
			detail: '', //商品详情
			brandData: {}, // 品牌数据
			classByTwo: [], // 二级分类数据
			storeclassByTwo: [], // 店内二级分类数据
			classByThree: [],  // 三级分类数据
			storeclassByThree: [],  // 店内三级分类数据
			weight: 0.0, // 重量 以克为计量单位
			freight: '',		//运费模板
			freightData: [],
			radio: 3,
			selectedTab: 0,

			checkAll: false,
			checkedCities: [''],
			cities: cityOptions,
			isIndeterminate: true,
			checkAll1: false,
			checkedCities1: [''],
			cities1: cityOptions1,
			isIndeterminate1: true,
			tempArray: []
		};
	},
	props: {
		seconddata1: {},
        seconddata2: {},
        seconddata3: {}
	},
		
	created() {
		//是否登录
		console.log(this)
		this.getClass();
		this.getBrand();
		this.getFreight();
		this.getOneStoreClass(); //获取一级店内分类
	},

	methods: {
		    //显示
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
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
            }else{
                this.uploadFile.push(response.data);
                
            }
        },
        //超出文件个数
        exceeding(files, fileList){
            if(fileList.length >= 6){
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '超出最大文件个数!'
                });
            }
            
        },
        // 上传之前
        beforeUploade(file) {
            if (this.position_id == '') {
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '请选择广告位置'
                });
                return false;
            }
            const isLt1M = file.size / 1024 / 1024 < 2;
            if(!isLt1M){
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '上传图片不能大于1M!'
                });
                return isLt1M;
            }
        this.uploadData.id = this.position_id;
        },
        // 删除回调
        handleRemove(file, fileList,index) {
             if (this.position_id == '') {
                return false;
            }
            let newUrl = file.url.substring(23);
            this.$HTTP(this.$httpConfig.delAdvPic,{fileName: file.response.data}).then(res =>{
                //找到删除的图片并在数据里删除
                let index = this.uploadFile.indexOf(newUrl);
                this.uploadFile.splice(index,1);
                this.$message.success(res.data.message);
            }).catch(function(error){
                console.log(error);
            });
        },
		handleCheckAllChange(val) {
			this.checkedCities = val ? cityOptions : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.cities.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		},
			handleCheckAllChange1(val) {
			this.checkedCities1 = val ? cityOptions1 : [];
			this.isIndeterminate1 = false;
		},
		handleCheckedCitiesChange1(value) {
			let checkedCount1 = value.length;
			this.checkAll1 = checkedCount === this.cities1.length;
			this.isIndeterminate1 = checkedCount1 > 0 && checkedCount1 < this.cities1.length;
		},

		backtoStep2(event) {
			this.tempArray = [...this.tempArray, this.seconddata1, this.seconddata2, this.seconddata3 ]
			// , this.seconddata2, this.seconddata3, {'currentTab': this.selectedTab}
			console.log("Temp Array " + this.tempArray)
			this.$emit('childToParent', this.tempArray)
		},
		backtoStep1() {
			this.selectedTab = 0;
		},

		tolink() {
			const { href } = this.$router.resolve({
				name: 'logistics'
			})
			window.open(href, '_blank')
		},
		getOneStoreClass(){
			this.$HTTP(this.$httpConfig.storeClassList,{},'post').then(res=>{
				console.log(res);
				this.storeClassData = res.data.data;
			}).catch(err=>{
				console.log(err);
			})
		},
		getUEContent() {
			let content = this.$refs.ue.getUEContent();
		//	console.log(content);
			return content;
		},
		//给全局变量赋值
		va() {
			this.$store.state.three_class_id = this.class_three;
		},
		// 获取 品牌
		getBrand() {
			this.$HTTP(this.$httpConfig.getBrandList, {}, 'post').then((res) => {
				this.brandData = res.data.data;
			})
		},
		//获取运费
		getFreight() {
			this.$HTTP(this.$httpConfig.getGoodsFreightList, {}, 'post').then((res) => {
				this.freightData = res.data.data;
			}).catch((err) => {
				this.$message.error(err.data.message);
			});
		},
		//商品分类搜索
		getClass() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: parseInt(this.class_id)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
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
		selectChild() {
			this.class_two = null
			this.classByTwo = [];
			this.classByThree = [];
			this.class_three = null;
			console.log(this.class_id);
			//获取分类
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: parseInt(this.class_id)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
					return;
				}
				this.classByTwo = res.data.data;
			//	console.log(this.classByThree)
			}).catch((err) => {
				console.log(err)
			});
		},

		selectClsssChild(){
			this.store_class_two = null
			this.storeclassByTwo = [];
			this.storeclassByThree = [];
			this.store_class_three = null;
			this.$HTTP(this.$httpConfig.nextClass, {
				id: parseInt(this.store_class_id)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
					return;
				}
				this.storeclassByTwo = res.data.data;
				//	console.log(this.classByThree)
			}).catch((err) => {
				console.log(err)
			});
		},
		/**
		 * 第三级分类
		 */
		selectChildByTwo() {
			this.classByThree = [];
			this.class_three = null;
			console.log(this.class_two,'class_two');
			//获取分类
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: parseInt(this.class_two)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.classByThree = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		selectClassChildByTwo(){
			this.storeclassByThree = [];
			this.store_class_three = null;
			this.$HTTP(this.$httpConfig.nextClass, {
				id: parseInt(this.store_class_two)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.storeclassByThree = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},

		/**
		 * 添加商品
		 */
		addGoods() {
			let dataJson = {
				'id': 0,
				'class_id': this.class_id,
				'class_two': this.class_two,
				'class_three': this.class_three,
				'brand_id': this.brand_id,
				'recommend': Number(this.recommend),
				'shelves': Number(this.shelves),
				'advance_date': this.advance_date,
				'stock': this.stock,
				'price_market': this.price_market,
				'price_member': this.price_member,
				'weight': this.weight,
				'express_id': this.freight,
				'store_class_one': this.store_class_id,
				'store_class_two': this.store_class_two,
				'store_class_three' : this.store_class_three
			};
			for (let i in dataJson) {
			//	console.log(dataJson[i]);
				if (isNaN(dataJson[i])) {
					this.$layer.msg('数据不合法');
					return;
				}
			}
			if (!/^[\u4e00-\u9fa5\s_a-zA-Z0-9/_、，；！：,. 。“”【】（）*+-]+$/.test(this.title)) {
				this.$layer.msg('商品名称异常，请尽量输入中文符号');
				return false;
			}
			// if (!/^[\^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.title)) {
			// 	this.$layer.msg('商品名称异常，请尽量输入中文符号');
			// 	return false;
			// }
			dataJson['title'] = this.title;
			dataJson['code'] = this.code;
			dataJson['detail'] = this.getUEContent();
			dataJson['description'] = this.description;
			console.log(dataJson);
			// 提交商品基本信息
			this.$HTTP(this.$httpConfig.addGoods, dataJson, 'post').then((res) => {
				this.$message.success(res.data.message);
				if (!this.$store.state.tab_Index[1]) {
					this.$store.state.tab_Index.push(1);
				}
				this.$emit('selectTab');
				this.$store.state.tab_state = 1;
			}).catch((err) => {
				console.log(err)
			});
		}
	},
	components: {
		UE
	},
}
</script>
<style>
.el-upload__input {
  display: none !important;
}
.el-upload--picture-card i {
  line-height: inherit;
}
body {
  overflow: inherit;
}
.ps__thumb-x {
    background-color: #ffffff !important;
    border-radius: 6px;
    transition: background-color .2s linear, height .2s ease-in-out;
    -webkit-transition: background-color .2s linear, height .2s ease-in-out;
    height: 0 !important;
    bottom: 2px;
    position: absolute;
}

</style>
<style lang="less" scoped>
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
.elmenucss {
	margin-left: 5px; 
	border: 1px solid #EEEEEE; 
	max-height: 200px; 
	overflow-y: auto; 
	.submenucss {
		display: block;
	}
}
.currency {
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 20px;
//   padding: 10px;
  border-top: 0;
  color: #333;
  .d_title {
    padding: 10px 0;
  }
  .ss {
    padding-left: 5px;
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
	  .cue1 {
		  color: #999999;
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
	  .cue1 {
		  color: #999999;
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
    padding: 10px 0 0 73px;
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
</style>
