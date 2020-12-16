<template>
  <div id="add"></div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created(){
    this.axios.post(this.$httpConfig.login,{
      seller_name:12323132,
      password:0
    }).then(res => {
        alert(res.data.message);
    }).catch(err =>{
        console.log(err);
    })
  },
}
</script>
