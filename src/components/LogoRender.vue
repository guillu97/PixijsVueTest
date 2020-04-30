<template>
    <div class="LogoRender">
        <h1>{{ component_id }}</h1>
        <div v-bind:id="component_id"></div>
    </div>
</template>

<script>
import * as PIXI from "pixi.js";
// here you can also import only a part of PIXI
// import { Application } from "pixi.js";
// import { utils } from "pixi.js";
export default {
    name: "LogoRender",
    props: {
        component_id: String,
        logo: String,
        tint: String,
    },
    methods: {
        display: function() {
            // if import only utils
            // let type = "WebGL";
            // if (!utils.isWebGLSupported()) {
            //     type = "canvas";
            // }
            // utils.sayHello(type);

            // if import all
            let type = "WebGL";
            if (!PIXI.utils.isWebGLSupported()) {
                type = "canvas";
            }
            PIXI.utils.sayHello(type);

            console.log(this.component_id);
            const app = new PIXI.Application();
            // if you import only Application
            // const app = new Application();

            document.getElementById(this.component_id).appendChild(app.view);

            console.log("./assets/" + this.logo + ".png");
            const path = require("./assets/" + this.logo + ".png");
            console.log(path);

            const resourceName = this.logo;

            var loader = new PIXI.Loader();
            if (!PIXI.utils.TextureCache[resourceName]) {
                // texture is not in cache
                console.log("texture is not in cache");
                loader.add(resourceName, this.image_path);
            } else {
                // texture is in cache
                console.log("texture is in cache");
            }
            loader.load((loader, resources) => {
                let texture;
                if (!PIXI.utils.TextureCache[resourceName]) {
                    // get the texture from the resources
                    texture = resources[resourceName].texture;
                } else {
                    // get the texture from the cache
                    texture = PIXI.utils.TextureCache[resourceName];
                }

                // This creates a texture from a 'logo.png' image.
                const sprite = new PIXI.Sprite(texture);

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
        },
    },
    mounted() {
        this.display();
    },
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
