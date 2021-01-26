
// const request = 'http://api.shopsn.cn/agent/adminstore.php/';
const request = 'http://api.gtpacking.cn/custom-merchant/adminstore.php/';
// const request = 'http://192.168.1.146/agent/adminstore.php/';

const imgRequest = "http://center.shopsn.cn/";
const uploadImage = 'upload.php/';
const config = {

  // 0、登录
  login: request + 'Public/login', //登录
  getApproval: request + 'Approval/getApproval', //获取权限
  checUser: request + 'ForgetThePassword/checIsExistBySellerName', //验证账号是否存在
  SendMsg: request + 'SendVerificationCode/registerSendMsg',//发送验证码
  parseReqByPassword: request + 'ForgetThePassword/parseReqByPassword',//提交（忘记密码）
  exitLogon: request + 'Public/exitLogon',//退出登录

  /**
   * 这是网络请求，postman调试接口
   * http://api.shopsn.cn/agent/adminstore.php/
   * * 这是请求地址，接口文档上的是接口和方法名称
   * 拼起来才是一个完整请求路径
   * 参数：是在请求后台接口的时候要返回给后台的参数，有就发送，没有就不发。参数类型：必选（是，否）是：这个参数必须要传     否：这个参数可以不用传
   * 返回参数说明：这是在你请求成功的时候后台给你的返回值
    */


  /*
  *  1、首页
  */
  getHome: request + 'Index/index', //获取首页信息

  /*
   * 2、 商品
   */
  // 商品管理
  getGoodsList: request + 'Goods/topGoodsList', //父商品列表
  getChildGoodsList: request + 'Goods/childGoodsList', //子商品列表
  delGoods: request + 'Goods/delTopGoods', //删除父商品
  delChildGoods: request + 'Goods/deleteOneGood', //删除子商品
  setShelve: request + 'Goods/isShelve', //商品上、下架切换
  getConsultQuestion: request + 'goods/getConsultQuestion', //商品咨询
  consultReply: request + 'goods/consultReply', //商品咨询回复
  checkReply: request + 'goods/checkReply', //商品咨询查看
  reportList: request + 'GoodsReport/reportList', //举报商品查询
  reportDetail: request + 'GoodsReport/reportDetail', //举报商品查询详情
  commitReport: request + 'GoodsReport/commitReport', //确认举报
  

  //店内分类
  addStoreClass: request + 'StoreInsideClass/addStoreClass', //添加店内分类
  storeClassList: request + 'StoreInsideClass/storeClassList', //添加店内所有一级分类
  nextClass: request + 'StoreInsideClass/nextClass', //通过一级分类id获取其下所以二级分类
  delClass: request + 'StoreInsideClass/delClass', //删除分类
  updateClass: request + 'StoreInsideClass/updateClass', //编辑分类

  // 发布商品
  getBrandList: request + 'Brand/getBrandList', //获取品牌列表
  getGoodsFreightList: request + 'Freights/getFreightList', //获取运费模块列表
  getClassById: request + 'GoodsClass/getClassById', //获取分类
  addGoods: request + 'Goods/addGoodsInfo', //添加商品
  //商品、店铺图片操作
  addGoodsPic: request + 'GoodsImages/pictureAlbum', //添加商品图片
  upLoadImage: request + 'UploadImage/uploadImage', // 上传图片
  delPic: request + 'UploadImage/delPic', // 删除图片

  VideoUpload: imgRequest + uploadImage + 'FileUpload/VideoUpload',

  getGoodsImgCofig: imgRequest + uploadImage + 'FileUpload/getGoodsImageConfig', //获取商品图片配置
  delGoodsImgCofig: imgRequest + uploadImage + 'DeleteImage/deleteFile', //删除商品图片

  getVideoList: request + 'GoodsImages/getVideoList', //商品图片列表

  getGoodsImgList: request + 'GoodsImages/getImageList', //商品图片列表
  delGoodsImgByDb: request + 'GoodsImages/deleteImageByDb', //删除线上商品图片
  saveGoodsImg: request + 'GoodsImages/savePicture', //保存图片

  addGoodsAttr: request + 'GoodsAttr/addGoodsAttribute', //添加商品属性
  getGoodsSpec: request + 'GoodsSpec/getAddContentByGoodsAttribute', //获取商品规格
  addGoodsSpec: request + 'Goods/addSpecGoods', //添加商品规格

  // 修改商品
  getGoodsDetail: request + 'Goods/modifyGoods', //获取商品详情
  saveGoods: request + 'Goods/saveGoods', //修改商品
  getGoodsAttrDetail: request + 'AjaxGetAttribute/ajaxGetAttributeInput', //获取商品规格详情
  editGoodsAttr: request + 'GoodsAttr/editGoodsAttribute', //修改商品规格
  getGoodsSpecDetail: request + 'GoodsSpec/ajaxGetSpecSelect',//获取商品属性
  editGoodsSpec: request + 'Goods/editSpecGoods', //修改商品属性
  getGoodsSpecInfo: request + 'GoodsSpec/specInfo',//获取规格

  // 商品规格列表
  getGoodsSpecList: request + 'GoodsSpecItem/getSpecItemList', //列表
  getGoodsSpecGroup: request + 'GoodsSpec/getSpecGroup',//第3级ID对应的规格
  addGoodsSpecItem: request + 'GoodsSpecItem/addSpecialItem', //添加
  saveGoodsSpecItem: request + 'GoodsSpecItem/saveSpecItem', //保存
  copyGoodsSpecItem: request + 'GoodsSpecItem/copySpecialItem',//复制
  getGoodsSpecItemDetail: request + 'GoodsSpecItem/editSpecItem',//详情
  confirmGoodsItem: request + 'GoodsSpecItem/addItem',//添加商品
  setGoodsImages: request + "GoodsImages/setGoodsImages", //设置商品主图

  /*
   * 3、 物流模块
   */
  // 仓库
  getAddressListSearch: request + 'Logistics/shippingAddressSearch', //搜索
  getAddressList: request + 'Logistics/shippingAddressList', //列表
  setAddressDel: request + 'Logistics/shippingAddressDel', //删除
  getAddressDetail: request + 'Logistics/shippingAddressDetail', //详情
  saveAddress: request + 'Logistics/shippingAddressSave', //保存
  addAddress: request + 'Logistics/shippingAddressAdd', //添加

  // 运费设置
  getFreightModelList: request + 'FreightMode/getFreightModelList', //列表
  getFreightModelSearch: request + 'FreightMode/getFreightModelSearch', //列表搜索
  delFreightModel: request + 'FreightMode/getFreightModelDel', //删除
  getFreightModelDetail: request + 'FreightMode/getFreightModelOne', //详情
  addFreightModel: request + 'FreightMode/getFreightModelAdd', //添加
  saveFreightModel: request + 'FreightMode/getFreightModelSave', //修改
  getDeliveryList: request + 'Delivery/getDeliveryConfig',//获取配送设置
  addDeliveryList: request + 'Delivery/editDeliveryConfig',//配送设置
  getdeliveryListList: request + 'Delivery/getDeliveryList',//获取配送员列表---------\
  adddeliveryListList: request + 'Delivery/getAddDelivery',//添加配送员
  deleteDeliveryList: request + 'Delivery/getDelDelivery',//删除配送员
  getFreightModelDel: request + 'FreightMode/getFreightModelDel',//删除配送地址数据

  // 快递公司
  getExpressList: request + 'Express/freightList', //列表
  getExpressListSearch: request + 'Express/frightSearch', //列表搜索
  setExpressStatus: request + 'Express/statusSave', //是否启用
  setExpressOrder: request + 'Express/orderSave', //是否常用
  setExpressZtState: request + 'Express/ztStateSave', //是否支持服务站配送
  addExpress: request + 'Express/frightAdd', //添加

  // 运费模板
  getFreightList: request + 'Freights/freightList', //列表
  getFreightSearch: request + 'Freights/freightSearch', //搜索
  delFreight: request + 'Freights/freightDel', //删除
  saveFreights: request + 'Freights/freightSave', //修改
  addFreights: request + 'Freights/freightAdd', //添加
  getFreightsDetail: request + 'Freights/freightDetail', //获取详情
  getArea: request + 'FreightCondition/getArea', //地址
  getFreightModelOne: request + 'FreightMode/getFreightModelOne', //获取自定义运费
  setFreightCondition: request + 'FreightCondition/setFreightCondition', //设置自定义运费
  getFreightModelSave: request + 'FreightMode/getFreightModelSave', //设置自定义运费

  /*
   * 4、 交易
   */
  // 订单
  getOrderList: request + 'Order/orderList',//列表
  getOrderDetail: request + 'Order/orderDetail',//详情
  setOrderSendGoods: request + 'Order/orderSendGoods', //普通发货
  getExpressOpened: request + 'Express/alreadyOpened', //发货时获取快递列表
  getOrderAllStatus: request + 'OrderStatus/getOrderAllStatus',
  // 积分订单
  getOrderIntegralList: request + 'OrderIntegral/orderList', //列表
  getOrderIntegralDetail: request + 'OrderIntegral/orderDetail', //详情
  sendIntegralOrderGoods: request + 'OrderIntegral/orderSendGoods',//发货

  // 套餐订单
  getPackageOrderList: request + 'OrderPackage/orderList',//列表
  getOrderPackageDetail: request + 'OrderPackage/orderDetail', //详情
  setTheOrder: request + 'OrderPackage/orderSendGoods',//套餐订单发货
  //发货单
  getOrderInvoiceList: request + 'OrderInvoice/orderList',//列表
  getOrderStoreInfo: request + 'Store/getRoughInformation',//打印单店铺信息

  // 退款、退货
  getRefundList: request + 'RefundApplication/returnList',//列表
  setRefundStatus: request + 'RefundApplication/changeStatus',//同意、拒绝
  setRefundMoney: request + 'RefundApplication/cancelReturnOrder',//退款
  getRefundDetail: request + 'RefundApplication/getRefundDetail',//详情
  setRefundGoods: request + 'RefundApplication/parseRefundGoods',//确认收货

  // 套餐订单、退货
  packageOrderReturnList: request + 'RefundApplicationPackage/returnList',// 套餐订单列表
  packageReturnDetails: request + 'RefundApplicationPackage/getRefundDetail',// 套餐退货详情
  packageReturn: request + 'RefundApplicationPackage/parseRefundGoods',// 套餐退货编辑保存
  PackageReturnJudgment: request + 'RefundApplicationPackage/changeStatus',// 同意、拒绝退款退货
  refundOfPackagegGoods: request + 'RefundApplicationPackage/cancelReturnOrder',//套餐商品退款

  //评论
  getTransactionList: request + 'Transaction/commentManage',//列表

  /*
   * 5、 促销
   */
  // 满赠
  getFullGiftList: request + 'Promotion/FullGift',//列表
  delFullGift: request + 'Promotion/deleteFullGift',//删除
  getFullGiftDetail: request + 'Promotion/getInfoById', //详情
  saveFullGift: request + 'Promotion/updFullGift', //修改
  addFullGift: request + 'Promotion/addFullGift', //添加

  // 满减
  getfullCutList: request + 'Promotion/fullCut', //列表
  delFullCut: request + 'Promotion/deleteFullCut', //删除
  saveFullCut: request + 'Promotion/updFullCut', //修改
  addFullCut: request + 'Promotion/addFullCut', //添加

  groupBuyList: request + 'Promotion/groupBuyList', 
  groupBuyAdd: request + 'Promotion/groupBuyAdd',
  deleteGroupBuy: request + 'Promotion/deleteGroupBuy',
  groupBuySave: request + 'Promotion/groupBuySave',

  // 优惠券
  getCouponsList: request + 'Coupons/couponsList', //列表
  delCoupons: request + 'Coupons/deleteCoupon', //删除
  getCouponsDetail: request + 'Coupons/getCouponsById', //详情
  saveCoupon: request + 'Coupons/updCoupon', //修改
  addCoupons: request + 'Coupons/addCouponData', //添加
  getCouponsMemberList: request + 'Coupons/memberList',//优惠券发放列表
  getCouponsMemberListSearch: request + 'Coupons/memberListSearch',//优惠券发放列表搜索
  sendCoupons: request + 'Coupons/sendCoupon',//发放优惠券给用户

  // 抢购
  getPanicList: request + 'Panic/panicList', //列表
  delPanic: request + 'Panic/delPanic', //删除
  getPanicDetail: request + 'Panic/getFiled', //详情
  savePanic: request + 'Panic/updatePanic', //修改
  addPanic: request + 'Panic/addPanic', //添加

  // 积分商品
  getIntegralList: request + 'IntegralGoods/integralList', //列表
  delIntegral: request + 'IntegralGoods/delete', //删除
  setIntegralShow: request + 'IntegralGoods/is_show',//是否显示
  getIntegralDetail: request + 'IntegralGoods/getInfoById', //详情
  saveIntegral: request + 'IntegralGoods/updIntegral', //修改
  addIntegral: request + 'IntegralGoods/addIntegral', //添加

  // 优惠套餐
  getPackageList: request + 'Promotion/package', //列表
  delPackage: request + 'Promotion/deletePackage', //删除
  getPackageDetail: request + 'Promotion/getPackageById', //详情
  savePackage: request + 'Promotion/updPackage', //修改
  addPackage: request + 'Promotion/addPackage', //添加

  // 最佳组合
  getComboList: request + 'Promotion/combo', //列表
  delCombo: request + 'Promotion/deleteCombo', //删除
  getComboDetail: request + 'Promotion/getComboById', //详情
  saveCombo: request + 'Promotion/updCombo', //修改
  addCombo: request + 'Promotion/addCombo', //添加

  // 推荐配件
  getPartsList: request + 'Promotion/parts', //列表
  delParts: request + 'Promotion/deleteParts', //删除
  getPartsDetail: request + 'Promotion/getpartsById', //详情
  saveParts: request + 'Promotion/updParts', //修改
  addParts: request + 'Promotion/addParts', //添加
  setPartsUse: request + 'Promotion/isUse',//设置是否可用

  /*
  * 6、 会员
  */
  // 会员等级
  getMemberLevelList: request + 'StoreMemberLevel/levelList',//列表
  getMemberLevelDetail: request + 'StoreMemberLevel/edit',//详情
  getStoreLevelNameList: request + 'StoreLevelByPlatform/levealList',//等级名称列表
  addStoreMemberLevel: request + 'StoreMemberLevel/add',//添加
  saveStoreMemberLevel: request + 'StoreMemberLevel/save',//修改

  // 会员列表
  getStoreMemberList: request + 'StoreMember/memberList',//列表


  /*
   * 7、 店铺
   */
  // 店铺设置
  getStoreInfo: request + 'Store/StoreInfo',//获取店铺信息
  saveStoreInfo: request + 'Store/SetUpInfo',//修改店铺信息

  // 店铺信息
  getStoreMoreInfor: request + 'Store/lookStoreInfor',//店铺更多信息
  getStoreOperationInfo: request + 'StoreInformation/storeOperationInformation',//店铺经营信息
  getStoreBankInfo: request + 'AjaxGetShopPersonByBank/bankDetailByShopPersion',//卡号信息

  //店铺文章列表
  getStoreArticle: request + 'StoreArticle/storeArticleCategory',//选文章分类
  addStoreArticle: request +  'StoreArticle/add',//添加文章
  saveArticle: request +  'StoreArticle/save',//修改
  selectArticle: request +  'StoreArticle/select',//列表
  delArticle: request +  'StoreArticle/del',//删除
  getArticleDetail: request +  'StoreArticle/editInfo',//性情
  showArticle: request +  'StoreArticle/toggleArticleShow',//是否显示
  recommendArticle: request +  'StoreArticle/toggleArticleRecommend',//是否推荐
  articleSearch: request +  'StoreArticle/articleSearch',

  // 店铺导航
  getStoreNavList: request + 'StoreNav/select',//列表
  delStoreNav: request + 'StoreNav/del',//删除
  getStoreNavDetail: request + 'StoreNav/editInfo',//详情
  saveStoreNav: request + 'StoreNav/save', //修改
  addStoreNav: request + 'StoreNav/add', //添加

  // 店铺导航装修
  getStoreNavColorList: request + 'StoreNavColor/select',//列表
  addStoreNavColor: request + 'StoreNavColor/add',//添加
  saveStoreNavColor: request + 'StoreNavColor/save',//修改

  // 经营类目
  getStoreBindClassList: request + 'StoreBindClass/index',//列表
  delOperateClass: request + 'StoreBindClass/delete', //删除
  getGoodsClassSelect: request + 'GoodsClassSelect/index',//所有经营类目列表
  addStoreBindClass: request + 'StoreBindClass/add',//添加


  /*
   * 8、 客服
   */
  // 客服类型
  // getServiceTypeList: request +'Service/typeList',//列表
  setServiceTypeUse: request + 'Service/typeIsUse',//是否可用
  delServiceType: request + 'Service/deletetype',//删除
  getServiceTypeDetail: request + 'Service/getTypeDetailById',//详情
  addServiceType: request + 'Service/addtype',//添加和修改
  serviceListInfo: request + 'SystemMsg/storeMsg', // 客服信息列表
  serviceMsgCount: request + 'SystemMsg/msgCount', // 客服列表
  serviceSingalData: request + 'SystemMsg/msgDetail', // 客服列表单条数据
  serviceDeleteData: request + 'SystemMsg/msgDelete', // 客服列表删除数据

  

  // 客服
  getServiceManageList: request + 'Service/manageList',//列表
  setServiceShow: request + 'Service/isShow',//是否显示
  setServiceMain: request + 'Service/isMainServer',//设置主客服
  delService: request + 'Service/delService',//删除
  getServiceDetail: request + 'Service/getDetailById', //详情
  addService: request + 'Service/addService', //添加和修改
  addServiceConver: request + 'Service/admin_list', //管理员列表

  // 系统消息
  getSystemMsg: request + 'SystemMsg/index',//列表
  delSystemMsg: request + 'SystemMsg/deleteMsg',//删除

  /*
   * 9、 帐号
   */
  // 管理员列表
  getAccountList: request + 'Account/accountList',//列表
  delAccount: request + 'Account/delAccount',//删除
  delAllAccount: request + 'Account/delAllAccount',//批量删除
  getAccountDetail: request + 'Account/getAccountInfo',//详情
  addAccount: request + 'Account/addAccount',//添加
  saveAccount: request + 'Account/saveAccount',//编辑

  // 用户组管理(角色列表)
  getRoleList: request + 'Account/roleList',//列表
  delRole: request + 'Account/delRole',//删除
  getRoleDetail: request + 'Account/getRoleById', //详情
  saveRole: request + 'Account/updRole', //编辑
  addRole: request + 'Account/addRole', //添加
  getPowerList: request + 'Account/getPowerList',//获取菜单列表（即权限列表）


  /*
   * 10、 财务
   */
  getMemberConfig: request + 'Distribution/getMemberConfig',//设置分销人员设置
  setMemberConfig: request + 'Distribution/setMemberConfig',//设置分销
  getSettlementList: request + 'Settlement/listBySettlement',//列表
  setSettlement: request + 'Settlement/shopConfirm', //确认
  getSettlementOrderList: request + 'Settlement/orderList',//查看
  getDistributeInfo:request + 'Distribution/memberDistribution',//生成分销
  getDistributePicture:request + 'Distribution/getSelectTime',//获取生成的时间段
  getDataList: request + 'Distribution/getDistributionList',//分销列表
  getDataListDetails: request + 'Distribution/getMemberDetail',//分销列表详情
  getDataListInner: request + 'Distribution/memberDetail',//分销列表详情内部
  makeMoney:request +'Distribution/makeMoneyByMember',//打款


  /*
   * 11、 广告
   */
  // 广告列表
  getAdvList: request + 'StoreAdv/adSearch',//列表
  setAdvReveal: request + 'StoreAdv/adReveal',//是否显示
  getAdvPostion: request + 'StoreAdvPostion/adPostion',//位置
  delAdv: request + 'StoreAdv/adDel',//删除
  addAdv: request + 'StoreAdv/adAdd',//添加
  delAdvPic: request + 'StoreAdvPicture/delPic',//删除图片回调
  getAdvDetail: request + 'StoreAdv/adInfo',//详情
  saveStoreAdv: request + 'StoreAdv/adSave',//保存
  getAdvPictureURL: request + 'StoreAdvPicture/uploadPicture',//广告图片

  // 广告位置
  getAdvPostionList: request + 'StoreAdvPostion/adPostionList',//列表


  // 公用
  getPromotionGoods: request + 'Promotion/ChoiceGoods', //选择子商品
  getProv: request + 'PersonalAdmission/getProv', //获取省
  getRegionArea: request + 'Region/lowerlevelArea', //获取市和区


  // 统计
  getWeeklyStatistics: request + 'Analysis/Order',// 订单相关图表 【一个星期的】
  getMonthlyStatistics: request + 'Analysis/getOrderMonth', // 订单相关图表 【一个月的】
  getScopeStatistics: request + 'Analysis/orderNumberByBetween', // 订单相关图表 【范围查询】
  getcurretMonthNumber: request + 'Analysis/curretMonthNumber', // 【当月订单数】
  getcurretDayNumber: request + 'Analysis/curretDayNumber', // 【当天订单数】
  getpayMemtMonery: request + 'Analysis/payMemtMonery', // 支付方式统计
  getdistributionMode: request + 'Analysis/distributionMode', // 配送方式统计
  getAreaOrderNumber: request + 'Analysis/getAreaOrderNumber', // 地区统计
  getajaxGetDataList: request + 'SalesDetailsOfBusinessmen/ajaxGetDataList', // 商家销售明细
  getajaxGetIndustryStatistics: request + 'IndustryStatistics/ajaxGetIndustryStatistics', // 行业分析-折线图数据
  getajaxGetIndustryStatisticsDetailList: request + 'IndustryStatistics/ajaxGetIndustryStatisticsDetailList', // 行业分析-列表
}
export default config
