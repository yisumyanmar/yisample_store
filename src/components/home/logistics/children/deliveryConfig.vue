<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span >配送设置</span>

     <!-- <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit">操作按钮</el-button>-->
    </div>
    <!-- -->
    <div  class="list-item">

      <el-form ref="form" :model="form" label-width="80px" class="from">

        <el-form-item   >
          <span class="left-text" slot="label"><span class="redtext">*</span>是否开启配送:</span>
          <el-radio-group v-model="form.is_open"  class="text"  prop="is_open" >

            <el-radio label="1"  >开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      <!---->
       <!-- <el-form-item  v-if="form.is_open != '关闭'">
          <span  class="left-text" slot="label"><span class="redtext">*</span>设置方式:</span>
          <el-radio-group v-model="form.freight_mode">
            <el-radio label="平台设置"></el-radio>
            <el-radio label="商铺设置"></el-radio>
          </el-radio-group>
        </el-form-item>-->
        <!---->
        <!--<el-form-item v-if="form.is_open != '关闭'">
          <span  slot="label" class="centext"><span class="centext">运送方式:</span></span>
          <el-radio-group v-model="form.distance">
            <el-radio label="平台派单"></el-radio>
            <el-radio label="商家配送"></el-radio>
          </el-radio-group>
        </el-form-item>-->

        <el-form-item  v-if="form.is_open != 0 " >
          <span  slot="label" class="centext">运费计算方式:</span>
          <el-radio-group v-model="form.freight_mode"  prop="freight_mode">
            <el-radio label="0">按距离</el-radio>
            <el-radio label="1">固定值</el-radio>
            <el-radio label="2">免费</el-radio>
          </el-radio-group>
        </el-form-item>
       <div v-if="form.is_open !=0" >
        <el-form-item  v-if="form.freight_mode != 1"  v-show="form.freight_mode != 2"  prop="distance">

          <span  slot="label"><span class="righttext">运费:</span></span>

          <el-radio-group v-model="form.distance">
           <el-input v-model="form.distance"  prop="distance"></el-input>
            <span class="gl">元(每公里)</span>

          </el-radio-group>
        </el-form-item>
        <el-form-item v-else="form.freight_mode == 1" v-show="form.freight_mode != 2" prop="freight_money">
          <span  slot="label"><span class="righttext">运费:</span></span>
          <el-radio-group v-model="form.freight_money">
            <el-input v-model="form.freight_money"  prop="freight_money"></el-input>
            <span class="gl">元</span>
          </el-radio-group>
        </el-form-item>
       </div>
        <el-form-item >
          <span  slot="label" class="centext"></span>
           <el-radio-group v-model="form.resource">
             <el-button type="primary" @click="onSubmit">保存</el-button>
           </el-radio-group>
        </el-form-item>
      </el-form>


    </div>
  </el-card>
</template>
<script>
export default {
  name: "deliveryConfig",
  data() {
    return {
      params: {
        is_Delivery: "0",
        platform: "0",
        platform_parts: "0",
        computing_method: "0"
      },
      form: {
        is_open: '',
        distance:'',
        freight_mode:'',
        freight_money:''
      },
    }
  },
  created() {

  },
    mounted() {

        this.getdeliveryConfig();
    },
  methods: {
    submit() {
        console.log(1111+"id"+this.from.is_open)
        console.log(1111+"id"+this.from.distance)
        console.log(1111+"id"+this.from.freight_mode)

    },
      //获取配送设置
      getdeliveryConfig(){
        this.$HTTP( this.$httpConfig.getDeliveryList ,this.form,
        'post').then((res)=> {
            this.form=res.data.data;

         console.log(res.data.data)

    }).catch((e) =>  {
        console.log(e);
    })
  },
    onSubmit() {

        if(this.form.is_open =="开启"){
        this.form.is_open=0;
        switch (this.form.freight_mode) {
            case "按距离":
                this.form.freight_mode=0;
                   this.form.distance
                break;
            case "固定值":
                this.form.freight_mode=1;
                  this.form.freight_money;
                break;
            case "免费":
                this.form.freight_mode=2;
                break;
            default:;
        }

      }else{
            this.form.is_open =1;
        }

     /* if(this.form.freight_mode =="关闭"){
        this.form.freight_mode=1;
      }
      if(this.form.freight_mode =="按距离"){

      }
      if(this.form.freight_mode =="固定值"){
        this.form.freight_mode=1;
      }
      if(this.form.freight_mode =="免费"){
        this.form.freight_mode=2;
      }*/



      this.$HTTP( this.$httpConfig.addDeliveryList ,this.form,
             'post').then((res)=> {
               /*console.log(res.from.is_open ,+"---"+res.from.freight_mode+"--"+res.from.distance+"--"+res.from.freight_money);*/

      }).catch((e) =>  {
                console.log(e);
      })
      console.log('submit!');
        this.$refs.form.resetFields();
        this.$message.success('保存成功');
    }
  }
};
</script>
<style>
  .form.left-text{

    font-size: 14px;
    font-weight: 400;
    display: inline-block;
  }
  .form .el-form-item{
    display: flex;
  }
  .form .redtext{
    margin-left: 2px;
    color: indianred;
  }
  .from .el-input{
    width: 10em;
    float: left;
  }
  .form .gl{
  float: left;
  display: inline-block;
  height: 98%;
  padding-top: 5px;

}
  .from.el-button {
    padding: 0px 0px;
    width: 50px;
    height: 30px;
    margin-left: 20px;
    margin-bottom: 10px;
    background: #5bba5e;
  }
  .from .box-card .list-item form span{
    text-align: center;
    line-height: 30px;
  }
  .from el-radio-group{
    width: 100%
  }
  .from .el-input__inner{
    height: 28px;
    margin-bottom: 10px;
  }
  .from .el-form-item .el-form-item__label .centext,.righttext{
    display: inline-block;
    width: 100%;
    font-weight: 500;
    text-align: center;
  }
  .from .el-form-item .el-form-item__label  .righttext{
    text-align: right;
    margin-right: 2px;
  }
  .from .el-form-item .el-form-item__label{
    width: 20rem !important;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    text-align: left;
    padding-left: .2rem;
    height: 40px;
    margin-bottom: 0;
  }
  .from .el-form-item__content{
    flex: 1;
    margin: 0 !important;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .from .el-radio-group{
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    text-align: left;
    height: 100%;
    margin-bottom: 0;
    box-sizing: border-box;
    width: 100%;
    line-height: 51px;
    padding-left: .3rem;
  }

  .from .el-form-item{
    margin-bottom: 0;
  }
  .from .list-item{
    border: 1px solid #e3e3e3;
    margin-bottom: 20px;
  }
  .from .el-button{
    width:5em;
    height: 0em;
    line-height: 0.5px;
    margin-left: 0px;
    text-align: center;


  }
  .from .el-button span{

    margin:0px;
    padding: 0px;

    width: 100%;
    text-align:center;

  }
</style>
<style lang="less">
  .box-card{
    .clearfix{
      span{
        font-size: 16px;
      }
    }
    .list-item{
      form{
        el-form-item{
          float: left;
          width: 100%;
          border:1px solid red;
        }
        span{
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
</style>
