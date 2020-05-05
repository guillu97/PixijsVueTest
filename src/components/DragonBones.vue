<template>
    <div class="DragonBones">
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
    name: "DragonBones",
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
            app.renderer.backgroundColor = 0x061639;
            // if you import only Application
            // const app = new Application();

            document.getElementById(this.component_id).appendChild(app.view);

            window.PIXI = PIXI; //Solution to use dragonbones with PIXI v5
            const dragonBones = require("pixi5-dragonbones");
            app.stop();

            var skeleton = "/testAnim/Character_ske.json";
            var texture = "/testAnim/Character_tex.json";
            var text_png = "/testAnim/Character_tex.png";
            console.log("skeleton", skeleton);
            console.log("texture", skeleton);
            console.log("text_png", text_png);
            // load spine data
            PIXI.Loader.shared
                .add("skeleton", skeleton)
                .add("texture_json", texture)
                .add("texture_png", text_png)
                .load(onAssetsLoaded);

            function onAssetsLoaded(loader, res) {
                const factory = dragonBones.PixiFactory.factory;

                factory.parseDragonBonesData(res.skeleton.data);
                factory.parseTextureAtlasData(
                    res.texture_json.data,
                    res.texture_png.texture
                );

                const armatureDisplay = factory.buildArmatureDisplay(
                    "Armature",
                    "Character"
                );
                console.log(armatureDisplay);

                //armatureDisplay.animation.play('throw');
                armatureDisplay.animation.play("throw");
                //armatureDisplay.animation.play('hurray');

                armatureDisplay.scale.set(0.4, 0.4);
                armatureDisplay.x = 400.0;
                armatureDisplay.y = 400.0;

                app.stage.addChild(armatureDisplay);

                app.start();
            }
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
