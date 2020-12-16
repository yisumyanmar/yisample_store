<template>
  <div>
      <router-view></router-view>
      <!-- <FileReader @load="text = $event"></FileReader> -->
  </div>
</template>

<script>
// import FileReader from "./fileReader";
// import logs from 'D:/TDA Project/data.js'
export default {
  name: 'app'
  // components: {
  //   FileReader
  // },
  // data () {
  //     return {
  //       logitems: logs
  //     }
  // },
  // created() {
  //   alert(this.logitems)
  //   this.loadTextFromFile()
  // }
  // methods: {
    // loadTextFromFile() {
    //   const reader = new FileReader();

    //   reader.onload = e => this.$emit("load", this.data[0].APIName);
    //   reader.readAsText(this.data[0].APIName);
    //   console.log(e.target.result)
    //   console.log(this.data[0].APIName)
    // }
  // }
}
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>


