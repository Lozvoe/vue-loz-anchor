<template>
  <div id="app">
    <div class="asid" >
      <lov-anchor targetid="containerBox" button horizontal @click="mckick" :key="1">
        <lov-anchor-link title="box1" href="#box1"></lov-anchor-link>
        <lov-anchor-link title="box2" href="#box2">
          <template slot="slot">
            <i>
              <h3>slot-box2</h3>
            </i>
          </template>
          <lov-anchor-link title="children-box2" href="#box7"></lov-anchor-link>
        </lov-anchor-link>
        <lov-anchor-link title="box3" href="#box3"></lov-anchor-link>
        <lov-anchor-link title="box4" href="#box4"></lov-anchor-link>
        <lov-anchor-link title="box5" href="#box5"></lov-anchor-link>
        <lov-anchor-link title="box6" href="#box6"></lov-anchor-link>
      </lov-anchor>
    </div>
    <div class="asid3">
      <lov-anchor targetid="containerBox"  @click="mckick"  :key="2">
        <lov-anchor-link title="box1" href="#box1"></lov-anchor-link>
        <lov-anchor-link title="box2" href="#box2">
          <template slot="slot">
            <i>
              <b>slot-box2</b>
            </i>
          </template>
          <lov-anchor-link title="children-box" href="#box7"></lov-anchor-link>
        </lov-anchor-link>
        <lov-anchor-link title="box3" href="#box3"></lov-anchor-link>
        <lov-anchor-link title="box4" href="#box4"></lov-anchor-link>
        <lov-anchor-link title="box5" href="#box5"></lov-anchor-link>
        <lov-anchor-link title="box6" href="#box6"></lov-anchor-link>
      </lov-anchor>
    </div>
    <div class="content" id="containerBox">
      <div id="other" class="son">
        <h1>Box-NoLink</h1>
      </div>
      <div id="box1" class="son">
        <h1>BOX1</h1>
      </div>
      <div id="box2" class="son">
        <h1>BOX2</h1>
        <div id="box7" class="son">
          <h1>child-BOX</h1>
        </div>
      </div>
      <div id="box3" class="son">
        <h1>BOX3</h1>
      </div>
      <div id="box4" class="son">
        <h1>BOX4</h1>
      </div>
      <div id="box5" class="son">
        <h1>BOX5</h1>
      </div>
      <div id="box6" class="son">
        <h1>BOX6</h1>
      </div>
      <div id="box8-NoLink" class="son">
        <h1>BOX8-NoLink</h1>
      </div>
      <div id="box9-NoLink" class="son">
        <h1>BOX9-NoLink</h1>
      </div>
      <div id="box10-NoLink" class="son">
        <h1>BOX10-NoLink</h1>
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
* {
}

html,
body {
  border: 0;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
}

.asid {
  padding: 1rem;
  position: fixed;
  left: 0;
  background-color: #fff;
  box-shadow: 5px 5px 5px 5px gray;
}
.asid1 {
  padding: 1rem;
  position: fixed;
  right: 0;
  background-color: #fff;
  box-shadow: 5px 5px 5px 5px gray;
}
.asid2 {
  padding: 1rem;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  box-shadow: 5px 5px 5px 5px gray;
}
.asid3 {
  padding: 1rem;
  position: fixed;
  top: 100px;
  background-color: #fff;
  box-shadow: 5px 5px 5px 5px gray;
}
.content {
  margin: 2rem;
  flex-grow: 1;
  overflow: auto;
}

#box2 {
  height: auto;
}

#box7 {
  width: 50%;
  margin: auto;
  border: 1px solid gray;
}

.son {
  height: 300px;
  background-color: #eee;
  text-align: center;
}

.son:nth-child(odd) {
  background-color: #ccc;
}

.son h1 {
  display: block;
  padding: 1rem;
  margin: 0;
  height: 100%;
  line-height: 100%;
}

.etable-content {
  height: 100%;
  padding: 1rem;
}
</style>
