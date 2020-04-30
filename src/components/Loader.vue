<template>
  <div id="Loader"></div>
</template>

<script>
import * as PIXI from "pixi.js";
export default {
  data: function() {
    return {};
  },
  name: "Loader",
  components: {},
  methods: {},
  created() {
    console.log("loader created");
    // load resources
    const logo1 = PIXI.Texture.from(require("@/assets/logo1.png"));
    const logo2 = PIXI.Texture.from(require("@/assets/logo2.png"));
    const moon = PIXI.Texture.from(require("@/assets/moon.jpg"));
    const sunset = PIXI.Texture.from(require("@/assets/sunset.jpg"));

    PIXI.Texture.addToCache(logo1, "logo1");
    PIXI.Texture.addToCache(logo2, "logo2");
    PIXI.Texture.addToCache(moon, "moon");
    PIXI.Texture.addToCache(sunset, "sunset");

    console.log("resources added to the cache");
    this.$emit("resources-added");
  },
  mounted() {
    console.log("loader mounted");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
