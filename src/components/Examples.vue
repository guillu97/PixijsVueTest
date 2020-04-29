<template>
    <div id="Examples">
        <img alt="Vue logo" src="../assets/logo1.png" />

        <h1>Example 1</h1>
        <LogoRender
            v-bind:component_id="get_component_index()"
            logo="logo1"
            tint="0xffffff"
        />
        <LogoRender v-bind:component_id="get_component_index()" logo="logo2" />

        <h1>Example 2</h1>
        <div v-for="item in items" :key="item.message">
            <LogoRender
                v-bind:component_id="get_component_index()"
                logo="logo1"
                v-bind:tint="`${item.tint}`"
            />
        </div>

        <h1>Example 3</h1>
        <div v-for="index in 9" :key="index">
            <LogoRender
                v-bind:component_id="get_component_index()"
                logo="logo1"
                v-bind:tint="`${index * 20000}`"
            />
        </div>
        <h1>Example 4</h1>
        <UseVuex
            v-bind:component_id="get_component_index()"
            v-bind:image_path="require('@/assets/sunset.jpg')"
        />
        <UseVuex
            v-bind:component_id="get_component_index()"
            v-bind:image_path="require('@/assets/moon.jpg')"
        />
    </div>
</template>

<script>
import LogoRender from "./LogoRender";
import UseVuex from "./UseVuex";

export default {
    data: function() {
        return {
            component_index: 0,
            items: [{ tint: "0xfff000" }, { tint: "0x000fff" }],
        };
    },
    name: "Examples",
    components: {
        LogoRender,
        UseVuex,
    },
    methods: {
        get_component_index() {
            const tmp = this.component_index;
            this.component_index += 1;
            return `${tmp}`;
        },
    },
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
