<template>
  <div id="app">
     <div class="title"><h1>Vue-Lov-Anchor</h1></div>
     <div class="anchor-horizontal">
        <div class="anchor">
          <lov-anchor targetid="anchorid" horizontal>
             <lov-anchor-link v-for="id in 5" :key="id" :href="'#box'+id" :title="'anchorlink'+id"></lov-anchor-link>
             <lov-anchor-link  href="#box6">
               <template slot="slot">
                <span style="color:red"> slot-link6</span>
               </template>
             </lov-anchor-link>
        </lov-anchor>
        </div>
        <div class="anchor">
          <lov-anchor targetid="anchorid" horizontal button>
             <lov-anchor-link v-for="id in 5" :key="id" :href="'#box'+id" :title="'anchorlink'+id"></lov-anchor-link>
             <lov-anchor-link  href="#box6">
               <template slot="slot">
                <span style="color:red"> slot-link6</span>
               </template>
             </lov-anchor-link>
        </lov-anchor>
        </div>
     </div>
     <div class="anchor-main">
       <div class="vue-lov-anchor">
         <div class="anchor">
           <lov-anchor targetid="anchorid">
             <lov-anchor-link v-for="id in 5" :key="id" :href="'#box'+id" :title="'anchorlink'+id"></lov-anchor-link>
             <lov-anchor-link  href="#box6">
               <template slot="slot">
                <span style="color:red"> slot-link6</span>
               </template>
             </lov-anchor-link>
           </lov-anchor>
         </div>
         <div class="anchor">
          
         </div>
         <div class="anchor">
           <lov-anchor targetid="anchorid" button>
             <lov-anchor-link v-for="id in 5" :key="id" :href="'#box'+id" :title="'anchorlink'+id"></lov-anchor-link>
             <lov-anchor-link  href="#box6">
               <template slot="slot">
                <span style="color:red"> slot-link6</span>
               </template>
             </lov-anchor-link>
           </lov-anchor>
         </div>
         <div class="anchor"></div>
         <div class="anchor"></div>
       </div>
       <div class="anchor-content" id="anchorid">
          <div v-for="box in 10" :key="box" class="box" :id="'box'+box">
            <h2>{{ `box${box}` }}</h2>
          </div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    mckick(i, t, e) {
    }
  }
};
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.title{
  margin-bottom: 20px;
  text-align: center;
}
.anchor-horizontal{
  margin-bottom: 20px;
  .anchor:last-child{
    margin-top: 20px;
    padding-left: 20px;
  }
}
.anchor-main{
  flex-grow: 1;
  display: flex;
  .vue-lov-anchor{
    padding: 10px;
    .anchor{
      margin-bottom: 20px;
    }
  }
  .anchor-content{
   height: 100%;
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   overflow: auto;
   .box{
     height: 300px;
     background-color: #eee;
     text-align: center;
     line-height: 300px;
     &:nth-child(odd){
       background-color: #ccc;
     }
   }
  }
}
</style>
