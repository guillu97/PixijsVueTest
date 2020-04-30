<template>
  <div class="UseVuex">
    <h1>{{ component_id }}</h1>
    <div v-bind:id="component_id"></div>
  </div>
</template>

<script>
export default {
  name: "UseVuex",
  props: {
    component_id: String,
    image_path: String,
    resourceName: String
  },
  methods: {
    display: function() {
      const PIXI = this.$store.state.pixi;
      const app = new PIXI.Application();

      document.getElementById(this.component_id).appendChild(app.view);
      const resourceName = this.resourceName;

      var loader = new PIXI.Loader();

      if (!PIXI.utils.TextureCache[resourceName]) {
        console.log("texture is not in cache");
        loader.add(resourceName, this.image_path);
      } else {
        // texture is in cache
        console.log("texture is in cache");
      }

      loader.load((loader, resources) => {
        let texture;
        if (!PIXI.utils.TextureCache[resourceName]) {
          texture = resources[resourceName].texture;
        } else {
          texture = PIXI.utils.TextureCache[resourceName];
        }

        // This creates a texture from a 'logo.png' image.
        const sprite = new this.$store.state.pixi.Sprite(texture);

        // add tint if defined
        if (this.tint) {
          sprite.tint = this.tint;
        }

        // Setup the position of the sprite
        sprite.x = app.renderer.width / 2;
        sprite.y = app.renderer.height / 2;

        // Rotate around the center
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        // Add the sprite to the scene we are building.
        app.stage.addChild(sprite);

        // Listen for frame updates
        app.ticker.add(() => {
          // each frame we spin the sprite around a bit
          sprite.rotation += 0.01;
        });
      });
    }
  },
  mounted: function() {
    return this.display();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
