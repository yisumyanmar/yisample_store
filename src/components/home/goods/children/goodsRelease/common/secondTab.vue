<template>
    <div>
        <div class="goods_title">
            <span class="title fl size14">商品基本信息</span>
        </div>
        
        <div class="tab-content fl">
            <!-- 通用信息 -->
            <!-- <information :seconddata1="data1" 
                         :seconddata2="data2"
                         :seconddata3="data3"
                         v-on:childToParent="onChildClick"
                         ></information> -->
            <div class="currency">
              <div class="z_info">
                <div class="goods_name goods_name1">
                  
                  <span v-if="data1 && data2 && data3"><b class="red">*</b>
                    <!-- 商品分类：   家用电器 > 厨卫大电 > 电热水器  -->
                    商品分类：   {{data1.class_name}} > {{data2.class_name}} > {{data3.class_name}}
                    <span style="color: #0573C8; cursor: pointer; " @click="backtoStep2">编辑 </span>
                  </span>
                </div>
                <div class="goods_name">
                  <span><b class="red">*</b> 商品名称： </span>
                  <el-input v-model="title" :maxlength="60" size="medium" style="width: 250px;" clearable>
                  </el-input>
                  <p class="cue cue1">商品标题名称长度至少3个字，最长60个字</p>
                </div>

                <div class="goods_name" style="padding-left: 23px;">
                  <span><b class="red">*</b> 标题： </span>
                  <el-input v-model="siteTitle" :maxlength="60" size="medium" style="width: 250px;" clearable>
                  </el-input>
                  <p class="cue cue1" style="padding-left: 50px;"></p>
                </div>

                <div class="goods_brief">
                  <span class="fl">关键词： </span>
                  <el-input v-model="keyword" :maxlength="60" size="medium" style="width: 250px; padding-left: 12px;" clearable>
                  </el-input>
                  <p class="cue cue1">关键词之间用空格分割，设置后有利于搜索引擎优化</p>
                </div>

                <div class="goods_brief">
                  <span class="fl">商品卖点：</span>
                  <el-input v-model="description" style="width: 288px;" type="textarea" :maxlength="60" :autosize="{ minRows: 4, maxRows: 4}">
                  </el-input>
                  <p class="cue cue1">商品卖点最长不能超过140个字，设置后有利于搜索引擎优化</p>
                </div>

                <div class="goods_brand public">
                  <span>商品品牌：</span>
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
                
                <div class="goods_brand public" v-if="data4 && data4.group">
                  <div v-for="(item, index) in data4.group" :key="index" >
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!-- 颜色： -->{{item.name}}:</span>
                      <div class="showChild">
                          <div v-for="(spec, indexByItem) in data4.children" :key="spec.id">
                              <div v-if="index == spec.spec_id" style="margin: 5px;">
                                  <el-button @click="tab1(indexByItem, spec, index)" :class="[status[indexByItem] == true ? 'activeColor' : '']">
                                      <!-- 图片色 -->
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
                                >+ 添加规格值</el-button>
                              </div>
                              <div v-if="item.btn">
                                <input placeholder="规格值名称" class="edit_input" v-model="item.spec_name" />
                                <el-button size="mini" type="primary" @click="confirm(item,index)">确认</el-button>
                                <el-button size="mini" type="danger" @click="cancel(item,index)">取消</el-button>
                              </div>
                          </div>
                          <!-- <el-button @click="addItem(item, index)" style="background: #f1f1f1; color: #a4a5a7;">+ 腹痛添加规格值</el-button> -->
                      </div>
                  </div>
                </div>
                <br>

                <div class="demo-input-size" v-show="datahide == true">
                  <input type="number" v-model="input1" id="num1" name="num1" style="border: 1px solid #C0C4CC;">
                  <button class="button1" @click="btnClick1(input1)">更新所有</button>
                  <input type="number" v-model="input2" id="num2" name="num2" style="border: 1px solid #C0C4CC;">
                  <button class="button1" @click="btnClick2(input2)">更新所有</button>
                  <input type="number" v-model="input3" id="num3" name="num3" style="border: 1px solid #C0C4CC;">
                  <button class="button1" @click="btnClick3(input3)">更新所有</button>
                  <input type="number" v-model="input4" id="num4" name="num4" style="border: 1px solid #C0C4CC;">
                  <button class="button1" @click="btnClick4(input4)">更新所有</button>
                </div>
                <div class="g_editss" v-show="datahide == true"></div>



                <!-- <div class="goods_brand public">
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
                <br> -->
                

                <div class="market_price z_price" v-if="datahide == false">
                  <span><b class="red">*</b> 店铺价： </span>
                  <el-input v-model="price_market" 
                    min="0.01"
                    max="9999999"
                    size="medium" style="width: 250px;margin: 10px 0;" clearable>
                  </el-input> 元
                  <p class="cue cue1" style="padding-left: 63px;"> 价格必须是0.01~9999999之间的数字，且不能高于市场价</p>
                </div>
                
                <div class="market_price z_price" v-if="datahide == false">
                  <span><b class="red"></b> 市场价：  </span>
                  <el-input v-model="price_member" size="medium" style="width: 250px;margin: 10px 10px;" clearable>
                  </el-input> 元
                  <p class="cue cue1" style="padding-left: 63px;">为0则商品详情页不显示，价格必须是0.00~9999999之间的数字，此价格仅为市场参考售价，请根据该实际情况认真填写</p>
                </div>

                <div class="Member_price z_price" style="padding-left: 3px;" v-if="datahide == false">
                  <span><b class="red">*</b> 商品库存： </span>
                  <el-input v-model="stock" size="medium" style="width: 250px;margin: 10px 0;" clearable>
                  </el-input>
                  <p class="cue cue1" style="padding-left: 72px;">店铺库存数量必须为0~999999999之间的整数，若启用了库存配置，则系统自动计算商品的总数，此处无需卖家填写</p>
                </div>

                <!-- <div class="market_price z_price">
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
                </div> -->

                <!-- no.8 -->
                <div class="market_price z_price">
                  <span><b class="red"></b>库存警告：  </span>
                  <el-input v-model="price_market1" size="medium" style="width: 250px;margin: 10px 0;" clearable>
                  </el-input>
                  <p class="cue cue1" style="padding-left: 63px;">设置最低库存预警值。当库存低于预警值时商家中心商品列表页库存列红字提醒请填写0~255的数字，0为不预警</p>
                </div>
                 <!-- v-if="datahide == false" -->
                <div class="market_price z_price" style="padding-left: 0px;">
                  <span><b class="red">*</b> 商品货号：  </span>
                  <el-input v-model="code" size="medium" style="width: 250px;margin: 10px 0;" clearable>
                  </el-input>
                  <p class="cue cue1" style="padding-left: 63px;">
                    商品货号是指商家管理商品的编号，买家不可见最多可输入20个字，支持输入中文、字母、数字、_、/、-和小数点
                  </p>
                </div>

                <!-- my add -->
                <div class="depot_num z_num" v-if="datahide == false">
                  <span><b class="red">*</b> 商品重量：</span>
                  <el-input v-model="weight" size="medium" style="width: 250px;margin: 10px 0;" clearable>
                  </el-input> kg
                </div>
                
                <!-- no.8 -->
                <!-- <div class="market_price z_price">
                  <span><b class="red"></b>  商品图片： </span>
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
                </div> -->

              </div>
              
              <div class="editor">
                <span class="fl">商品描述： </span>
                <div class="ue fl" style="padding-left: 10px;">
                  <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>

                  <!-- no.7 -->
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
                  <!-- no.7 -->

                </div>
              </div>
              
              <!-- no.12 -->
              <div class="parameter">
                <div v-if="data5 != null">
                  <div style="display: flex; width: 100%; margin: 25px 0px; 20px 0px;">
                    <div style="width: 100%; background: #F6F6F6; padding: 10px 15px;">
                      <span class="fl">商品属性 </span>
                    </div>
                  </div>
                  <div class="g_edit">
                    <form>
                      <table id="p_data" class="table" v-html="data5">
                      </table>
                      <!-- <el-button type="success" @click="propertySubmit">提交</el-button> -->
                    </form>
                  </div>
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
                  <span><b class="red">*</b> 运费模板：</span>
                  <el-select v-model="freight" placeholder="市内模板10元" style="margin: 10px 0;">
                    <el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                  <el-button @click.native="tolink" type="success">新建运费模板</el-button>
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
              
            
              <div class="checkgood-container">
                <div class="checkgood-title">店铺内商品分类：</div>
                  
                    <div class="check-container">
                      <perfect-scrollbar>	
<!-- <input type="checkbox" value="10" v-model="additional_grouped" @change="uniqueCheck">
<input type="checkbox" value="20" v-model="additional_grouped" @change="uniqueCheck"> -->

<!-- <div class="checkbox">
    <input type="checkbox" id="checkbox" name="" value="">
    <label for="checkbox"><span>Checkbox</span></label>
</div>
<div class="checkbox">
    <input type="checkbox" id="checkbox2" name="" value="">
    <label for="checkbox2"><span>Checkbox</span></label>
</div> -->

                            <ul>
                              <li v-for="(item, i) in storeClassData" :key="i">
                                <!-- <el-checkbox
                                    :v-model="checkboxes" 
                                    @change="selectClsssChild(item, index)">
                                    Parent{{item.class_name}}
                                </el-checkbox>  -->
                                <!-- @click="selectClsssChild(item, i)" -->

                                <input type="checkbox" 
                                    :value="item.class_name"
                                    v-model="additional_grouped" 
                                    @change="uniqueCheck(item, i, $event)"
                                >
                                <label for="fname">{{item.class_name}}</label>  
                                

                                <ul v-if="storeclassByTwo.length>0" style="margin-left: 15px;">
                                  <li v-for="(secondItem, ii) in storeclassByTwo" :key="ii">
                                      <!-- <el-checkbox
                                          v-if="item.id == secondIndex"
                                          :v-model="secondItem.class_name" 
                                          @change="selectClassChildByTwo(secondItem, ii)">
                                          {{secondItem.class_name}}
                                      </el-checkbox>  -->
                                      <input type="checkbox" 
                                          v-if="item.id == secondIndex"
                                          :value="secondItem.id"
                                          v-model="additional_grouped2" 
                                          @change="uniqueCheck2(secondItem, ii, $event)"
                                      >
                                      <label v-if="item.id == secondIndex" for="fname">{{secondItem.class_name}}</label> 
                                      
                                      <div v-for="(parentA, jj) in parentArr" :key="jj">
                                          <ul v-if="parentA && parentA.length>0" style="margin-left: 15px;">
                                            <li v-for="(thirdItem, iii) in parentA" :key="iii">
                                                <!-- <el-checkbox
                                                    v-if="item.id == secondIndex && secondItem.id == thirdIndex"
                                                    :v-model="thirdItem" 
                                                    @change="selectClassChildByThree(thirdItem, iii)">
                                                    {{thirdItem.class_name}}
                                                </el-checkbox> -->
                                                <input type="checkbox" 
                                                    v-if="item.id == secondIndex && secondItem.id == thirdItem.f_id"
                                                    :value="thirdItem.id"
                                                    :v-model="thirdItem" 
                                                    @change="selectClassChildByThree(thirdItem, iii, $event)"
                                                    >
                                                <label v-if="item.id == secondIndex && secondItem.id == thirdItem.f_id" for="fname">{{thirdItem.class_name}}</label> 
                                            </li>
                                          </ul>
                                      </div>     
                                  </li>
                                </ul>  
                              </li>
                          </ul>

                      </perfect-scrollbar>
                    </div>
                      
              </div>
              <div class="z_info" style="">
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
              <div class="z_info" style="">
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
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import qs from "qs";
import UE from '../children/UE';
import '../../../../../../../js/jquery.form.min';
import { Toast } from 'mint-ui';
// import information from "./informationSecondTab"; //通用信息
const cityOptions = ['one', 'two', 'three'];
export default {
    name: "goodsrelease",
    data() {
        return {
          model1: "",
          stock1: "",
          nofreight1: "",
          nofreight2: "",
          nofreight3: "",
          nofreight4: "",
          price_market1: "",
          additional: [],
          additional_grouped: [],
          additional_grouped2: [],
          checkboxes: null,
          fruits: ['apple', 'banana', 'orange'],
          checkedCities: null,
          cities: cityOptions,
          inputList: {},
          btn: false,
          action:this.$httpConfig.getAdvPictureURL,
          dialogImageUrl: "",
          dialogVisible: false,
          uploadData: {
            id: "",
            token:sessionStorage.getItem("data_token")
          }, 
          uploadFile:[],
          fileList:[],
          status: [false],
          index1: "",
          data: "",
          fromChild: null,

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
          siteTitle: '',
          keyword: '',
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
          radio1: 3,
          radio2: 3,
          radio3: 3,
          selectedTab: 0,

          checkAll: false,
          
          isIndeterminate: true,
          checkAll1: false,
          isIndeterminate1: true,
          tempArray: [],
          specResult: [],
          datahide: false,
          checkparent: [],
          checkparent1: [],
          thirdSelect: null,
          secondIndex: null,
          thirdIndex: null,
          thirdIndex1: null,
          activeIndex: '1',
          activeIndex2: '1',
          // tempAll: [],
          // parentBoolean: false,
          // childBoolean: false,
          grandChildBoolean: false,
          tempCheck: '',
          tempCheck2: '',
          tempIndex: null,
          tempIndex1: null,
          count: 0,
          apiData: [],
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          parentArr: []
        };
    },
    props: {
        data1: {},
        data2: {},
        data3: {},
        data4: null,
        data5: null
    },
    // props: {
    //     seconddata1: {},
    //     seconddata2: {},
    //     seconddata3: {}
    // },
    mounted() {
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
      uniqueCheck(val, index, e){
        this.additional_grouped = [];
        if (e.target.checked) {
            this.additional_grouped.push(e.target.value);
            if(this.additional_grouped) {
              this.tempCheck = this.additional_grouped
            }
            // console.log(this.tempCheck)
        }
        this.selectClsssChild(val, index)
      },
      uniqueCheck2(val, index, e){
        this.additional_grouped2 = [];
        if (e.target.checked) {
            this.additional_grouped2.push(e.target.value);
            // console.log("samep " + JSON.stringify(this.additional_grouped2))
            if(this.additional_grouped2) {
              this.store_class_two = parseInt(val.id)
              this.tempCheck2 = this.additional_grouped2
            }
            // console.log(this.tempCheck2)
        }
        this.selectClassChildByTwo(val, index)
      },
      getOneStoreClass(){
          this.$HTTP(this.$httpConfig.storeClassList,{},'post').then(res=>{
            this.storeClassData = res.data.data;
              // let count=0
              // this.storeClassData.map( i => {
              //     this.$HTTP(this.$httpConfig.nextClass, {
              //       id: parseInt(i.id)
              //     }, 'post').then((res1) => {
              //       count++;
              //       if (!res1.data.data) {
              //         this.$layer.msg('暂无数据:(');
              //         return;
              //       }
              //       this.tempAll.push(res1.data.data)
              //     }).catch((err) => {
              //       this.tempAll.push([])
              //       console.log(err)
              //     });
              // })
            
            this.checkparent.push = this.storeClassData[0].class_name
          }).catch(err=>{
            console.log(err);
          })
      },
      selectClassChildByThree(val, ind, e) {
        if(this.grandChildBoolean == false) {

            this.grandChildBoolean = true
            this.store_class_three = parseInt(val.id)

            this.additional_grouped2 = [];
            for(let i = 0; i < this.storeclassByTwo.length; i++) {
                if(this.storeclassByTwo[i].id == val.f_id) {
                    this.additional_grouped2.push(this.storeclassByTwo[i].id);
                    this.store_class_two = parseInt(this.storeclassByTwo[i].id)
                    break;
                }
            }

        } else {
            this.grandChildBoolean = false
            this.store_class_three = null

            this.additional_grouped2 = [];
        } 
      },
      selectClassChildByTwo(val, ind) {
        this.grandChildBoolean = false
        // this.childBoolean == false
          if(this.additional_grouped2 == this.tempCheck2) {
                // this.childBoolean = true

                this.thirdIndex1 = val.id
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
                  this.thirdIndex = this.storeclassByThree[0].f_id
                }).catch((err) => {
                  console.log(err)
                });

          } else {
                // this.childBoolean = false

                this.thirdIndex1 = null
                this.store_class_two = null
                this.storeclassByThree = [];
                this.store_class_three = null;
                // this.thirdIndex = null
          }
          
      },
      selectClsssChild(val, index){
          
          this.childBoolean = false
          this.grandChildBoolean = false
          //  && (this.parentBoolean == false)
          if((this.additional_grouped == this.tempCheck)) {
                // this.parentBoolean = true

                this.checkboxes = null
                if(val) {
                  this.checkboxes = val.class_name
                }
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
                  // console.log("hello " + JSON.stringify(this.storeclassByTwo))

                  this.parentArr = []
                  for(let i = 0; i < this.storeclassByTwo.length; i++) {
                      this.$HTTP(this.$httpConfig.nextClass, {
                          id: parseInt(this.storeclassByTwo[i].id)
                      }, 'post').then((res) => {
                          if (!res.data.data) {
                              this.$layer.msg('暂无数据:(');
                              return;
                          }
                          this.storeclassByThree = []
                          this.storeclassByThree = res.data.data;
                          
                          this.parentArr.push(res.data.data)
                          
                          this.thirdIndex = this.storeclassByThree[0].f_id
                      }).catch((err) => {
                          console.log(err)
                      });
                  }


                  
                  this.secondIndex = this.storeclassByTwo[0].f_id
                }).catch((err) => {
                  console.log(err)
                });

          } else if(val.class_name != this.additional_grouped) { // && this.parentBoolean == true
                // this.parentBoolean = false

                this.checkboxes = null
                this.store_class_id = null
                this.store_class_two = null
                this.storeclassByTwo = [];
                this.storeclassByThree = [];
                this.store_class_three = null;
                this.secondIndex = null
          }
      },
      
      propertySubmit() {
        let data = $("form").formSerialize();
        data += '&token='+ sessionStorage.getItem('data_token');	
			  //	console.log(data) 
				let newData = {};
				// this.$HTTP(this.$httpConfig.addGoodsAttr,data).then((res) => {
				this.axios.post(this.$httpConfig.addGoodsAttr, data).then((res) => {
					this.$message.info(res.data.message);
					setTimeout(() => {
						this.$router.push('/goodsManage')
			    },1000)
				}).catch((err) => {
					  this.$message.error(err.data.message);
				});
      },
      tab1(childId, childData, parentId) {
          this.specResult[parentId] = [];
          if (this.status[childId] === true) {
            this.$set(this.status, childId, false);
          } else {
            this.$set(this.status, childId, true);
          }
          for (let i = 0; i < this.status.length; i++) {
            if (this.status[i] === true) {
              if (this.data4.children[i].spec_id == parentId) {
                this.specResult[parentId].push(
                  this.data4.children[i].id
                );
              }
            }
          }
          this.getSpecItem();


        if(this.count == 0) {
            this.count++;
            this.apiData = [...this.apiData, {'pId': parentId, 'cId': childId, 'childData': childData}]
           
            this.datahide = true
        } else {
            let totalcount = 0
            for(var i = 0; i < this.apiData.length; i++) {
                if(childData == this.apiData[i].childData && parentId == this.apiData[i].pId && childId == this.apiData[i].cId) {
                    if(this.apiData.length == 1) {
                        this.apiData.splice(i, 1)
                        totalcount--

                        this.count = 0
                        this.datahide = false
                    } else {
                        this.apiData.splice(i, 1)
                        totalcount--
                    }
                } else {
                    totalcount++
                }
            }
            if(totalcount == this.apiData.length) {
                this.apiData = [...this.apiData, {'pId': parentId, 'cId': childId, 'childData': childData}]
                // console.log(JSON.stringify(this.apiData))
            }
            
        }
      },

      //获取规格项
      getSpecItem() {
        this.$HTTP(
          this.$httpConfig.getGoodsSpec,
          { spec: this.specResult },
          "post"
        )
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
      addUploadImg() {
        let _this = this;
        $(".uploadBtn").on("change", function(e) {
          _this.uploadImg(e.target.files[0], e.target);
        });
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
      submit() {
        // let item = {};
        // $("#myForm input").each(function(index, item){
        //     eval($(item).attr('name')+ ' = '+ $(item).val())
        // })
        // let data = $("#myForm").formToArray();
        // console.log(data)
        let that = this;
        let inputList = {};
        let flag = false;
        let tmp = {};
        let key;
        //	console.log($('#spec_input_tab tr'))
        $("#spec_input_tab tr").each(function(index, ele) {
          //  console.log(ele);
          $(ele)
            .find("input")
            .each(function(index, ele) {
              // console.log(ele)
              key = $(ele).attr("data-key");
              let name = $(ele).attr("name");
              let val = $(ele).val();
              tmp[name] = val;
              inputList[key] = {};
              if (val === "" && name !== 'pic_url' && typeof name !== "undefined") {
                // flag = true;
              }
            });
          if (typeof key !== "undefined") {
            inputList[key] = tmp;
          }
          tmp = {};
        });
        //	console.log(inputList)
        // if (flag !== true) {
        //   this.$message({
        //     duration: 1000,
        //     type: "error",
        //     message: "规格信息错误"
        //   });
        // } else {
          this.$HTTP(this.$httpConfig.addGoodsSpec, { item: inputList }, "post")
            .then(res => {
              this.$message({
                duration: 1000,
                message: res.data.message
              });
              this.$emit("selectTab");
              this.$store.state.tab_state = 2;
              this.$emit("getParameter");
              if (!this.$store.state.tab_Index[2]) {
                this.$store.state.tab_Index.push(2);
              }
              this.$emit('childToParent', {tab: 2})
            })
            .catch(err => {
                this.$message({
                    duration: 1000,
                    message: err.data.message
                });
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
                  this.data4 = res.data.data;
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
        //切换选项卡
        // onChildClick(value) {
        //   this.fromChild = value
        // },
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
          // this.checkedCities = val ? cityOptions : [];
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
          this.tempArray = [...this.tempArray, this.data1, this.data2, this.data3, {'currentTab': this.selectedTab} ]
          this.$emit('childToParent', this.tempArray)
          this.title = ''
          this.siteTitle = ''
          this.description = ''
          this.keyword = ''
          this.brand_id = 0
          this.price_market1 = 0
          this.code = ''
          this.freight = ''
          this.additional_grouped = []
          this.additional_grouped2 = []
          this.thirdItem = ''
          this.storeclassByTwo = [];

          // this.clearIndex = childId
         
          // if (this.status[this.clearIndex]) {
          //   this.$set(this.status, this.clearIndex, false);
          // }
          // this.$set(this.status, childId, false);
          
          for(let i = 0; i < this.status.length; i++) {
            this.status[i] = null
          }
          this.datahide = false
        },

        tolink() {
          const { href } = this.$router.resolve({
            name: 'logistics'
          })
          window.open(href, '_blank')
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
          //获取分类
          this.$HTTP(this.$httpConfig.getClassById, {
            goods_class_id: parseInt(this.class_id)
          }, 'post').then((res) => {
            if (!res.data.data) {
              this.$layer.msg(res.data.message);
              return;
            }
            this.classByTwo = res.data.data;
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
          // console.log(this.class_two,'class_two');
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
        

        /**
         * 添加商品
         */

        // recommend, shelves, advance_date, //weight
        // store_class_id, store_class_two, store_class_three
        addGoods() {
            let data = $("form").formSerialize();
            

            let str1 = data
            let str2 = '%5B'
            let str3 = '%5D'
            
            let res1 = str1.match(/%5B/g);
            for(let i in res1) {
                str1 = str1.replace(str2, '[')
            }

            let res2 = str1.match(/%5D/g);
            for(let i in res2) {
                str1 = str1.replace(str3, ']')
            }
            console.log("1 " + str1)

            let res3 = str1.match(/attr_goods_value]=/g)
            console.log("2 " + str3)
            for(let i in res3) {
                if(str1.includes("[attr_goods_value]=")) {
                  let f = str1.indexOf('[attr_goods_value]=')
                  f = f + 19
                  f = str1.charAt(f)
                  if(f == '&' || f == '') {
                      this.$layer.msg('请添加商品属性');
                      Toast('请添加商品属性');
                      return;
                  }
                  str1 = str1.replace('[attr_goods_value]', 'temp')
                } 
            }
            

            data += '&token='+ sessionStorage.getItem('data_token');		
            data += "&id="+ 0 +'&class_id='+ this.data1.id + "&class_two="+ this.data2.id + "&class_three="+ this.data3.id + "&brand_id=" + this.brand_id + "&recommend=" + Number(this.recommend) + "&shelves=" + Number(this.shelves) + "&advance_date=" + this.advance_date + "&stock=" +  this.stock + "&price_market=" + this.price_market + "&price_member=" +  this.price_member + "&weight=" + this.weight + "&express_id=" + this.freight + "&store_class_one=" + this.store_class_id + "&store_class_two=" + this.store_class_two + "&store_class_three=" +  this.store_class_three    
            data += "&title=" + this.title + "&code=" + this.code + "&detail=" + this.getUEContent() + "&description=" + this.description + "&keyword=" + this.keyword + "&siteTitle=" + this.siteTitle
                  
           
            let dataJson = {
                'id': 0,
                'class_id': this.data1.id,
                'class_two': this.data2.id,
                'class_three': this.data3.id,
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
                'store_class_three' : this.store_class_three,
            };
            for (let i in dataJson) {
              if (isNaN(dataJson[i])) {
                this.$layer.msg('数据不合法');
                return;
              }
            }
            if (!/^[\u4e00-\u9fa5\s_a-zA-Z0-9/_、，；！：,. 。“”【】（）*+-]+$/.test(this.title)) {
              // this.$layer.msg('商品名称异常，请尽量输入中文符号');
              Toast('商品名称异常，请尽量输入中文符号');
              return false;
            }

            if(!this.code.match(/^[0-9]+$/)){
                Toast('请填写 商品货号');
                return false;
            }
            
            if(!this.freight) {
                Toast('请选择运费模板');
                return false;
            }

            // if(this.brand_id == 0) {
            //     Toast('请选择 商品品牌');
            //     return false;
            // }
    
            // if (!/^[\^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.title)) {
            // 	this.$layer.msg('商品名称异常，请尽量输入中文符号');
            // 	return false;
            // }
            dataJson['title'] = this.title;
            dataJson['code'] = this.code;
            dataJson['detail'] = this.getUEContent();
            dataJson['description'] = this.description;

            this.axios.post(this.$httpConfig.addGoods, data).then((res) => {
                this.$message.success(res.data.message);
                if(this.datahide == true) {
                    this.submit();
                } else {
                    this.$emit('childToParent', {tab: 2})
                }
                
            }).catch((err) => {
                this.$message.error(err.data.message);
            });

          // this.axios.post(this.$httpConfig.addGoodsAttr, data).then((res) => {


          // 提交商品基本信息
          // this.$HTTP(this.$httpConfig.addGoods, dataJson, 'post').then((res) => {                    sss
          //   this.$message.success(res.data.message);   sss
            // if (!this.$store.state.tab_Index[1]) {
            //   this.$store.state.tab_Index.push(1);
            // }
            // this.$emit('selectTab');
            // this.$emit('childToParent', {tab: 2})   sss
            // this.$store.state.tab_state = 1;

            // if(this.datahide == true) {
                // this.submit();    sss
            // }
            
          // }).catch((err) => {    sss
          //   console.log(err)   sss
          // });      sss
          
          
        }
    },
    created() {
        //是否登录
        console.log(this)
        // this.getClass();
        this.getBrand();
        this.getFreight();
        this.getOneStoreClass(); //获取一级店内分类
        
    },
    components: {
      // information,
      UE
    },
};
</script>
<style>

.demo-input-size {
    display: flex;
    width: 100%;
}
.nav-menu {
        height: 435px;
        overflow-y: auto;
}
.nav-menu-child {
    display: block;
}
.title-font {
    font-size: 1.2em;
    color: #838383;
}
.right{
    float: right;
    top: 40%;
}
.el-menu-item {
    padding-left: .6rem !important;
    padding-right: .4rem !important;
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
  position: relative;
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

.g_editss .table tr td b {
  font-weight: bold;
  color: #333;
}
.g_editss .table tr td input {
  padding-left: 5px;
  height: 32px;
  border: 1px solid #cccccc;
}

.uploadBtn {
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
.uploadImg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  opacity: 0;
}

.showChild{
  display: flex;
  flex-wrap: wrap;
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
.activeColor {
  background-color: #f7bc0a !important;
  color: #fff !important;
}
.el-button:hover {
    background-color: #f7bc0a !important;
    color: #fff !important;
}
.el-upload__input {
  display: none !important;
}
.el-upload--picture-card i {
  line-height: inherit;
}
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    margin-left: 63px !important;
    margin-top: -10px;
    margin-bottom: 10px;
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
    .goods_title {
        border-right: 0;
        position: relative;
        background: #F6F6F6;
        padding: 15px;
        display: flex;
      .title {
        color: #333333;
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
}


.uploadBtn {
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
.uploadImg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  opacity: 0;
}
</style>

<style lang="less" scoped>
.standard {
  height: auto;
  min-height: 100px;
  line-height: 20px;
  padding: 10px;
  border-top: 0;
  color: #333;
  .specification {
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    margin-bottom: 25px;
    .g_type {
      padding-left: 80px;
      border-bottom: 1px solid #ddd;
      span {
        margin: 10px 0;
        display: inline-block;
      }
      select {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
      }
    }
    .goods_spec {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      padding-left: 80px;
      font-weight: bold;
    }
    .g_size {
      padding-left: 100px;
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
  }
  .g_editss {
    margin-bottom: 25px;
    span {
      background: red;
    }
  }

  .tijiao {
    height: 32px;
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

  .parameter {
		height: auto;
		min-height: 100px;
		line-height: 20px;
		padding: 10px 0px;
		border-top: 0;
		color: #333;
  }
  


  
//  v-model="title" 
//  v-model="brand_id"
//  v-model="price_market"
//  v-model="price_member"
//  v-model="stock"
//  v-model="code"
</style>


<style>
	.center_else {
		text-align: center;
		font-size: 17px;
		font-weight: 700;
		line-height: 70px;
		color: red;
	}
	
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
 

input[type=checkbox]:checked:before {
      background-color: #f7bc0a !important;
}

input[type='checkbox']:checked:after {
      background-color: #f7bc0a !important;
}




.checkbox {
    width: 100%;
    margin: 15px auto;
    position: relative;
    display: block;
}

.checkbox input[type="checkbox"] {
    width: auto;
    opacity: 0.00000001;
    position: absolute;
    left: 0;
    margin-left: -20px;
}
.checkbox label {
    position: relative;
}
.checkbox label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    margin: 4px;
    width: 22px;
    height: 22px;
    transition: transform 0.28s ease;
    border-radius: 3px;
    border: 2px solid #7bbe72;
}
.checkbox label:after {
  content: '';
    display: block;
    width: 10px;
    height: 5px;
    border-bottom: 2px solid #7bbe72;
    border-left: 2px solid #7bbe72;
    -webkit-transform: rotate(-45deg) scale(0);
    transform: rotate(-45deg) scale(0);
    transition: transform ease 0.25s;
    will-change: transform;
    position: absolute;
    top: 12px;
    left: 10px;
}
.checkbox input[type="checkbox"]:checked ~ label::before {
    color: #7bbe72;
}

.checkbox input[type="checkbox"]:checked ~ label::after {
    -webkit-transform: rotate(-45deg) scale(1);
    transform: rotate(-45deg) scale(1);
}

.checkbox label {
    min-height: 34px;
    display: block;
    padding-left: 40px;
    margin-bottom: 0;
    font-weight: normal;
    cursor: pointer;
    vertical-align: sub;
}
.checkbox label span {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.checkbox input[type="checkbox"]:focus + label::before {
    outline: 0;
}


</style>


<!-- 
https://stackoverflow.com/questions/53390091/vuejs-allow-only-1-checkbox-select-based-on-class-name
-->



