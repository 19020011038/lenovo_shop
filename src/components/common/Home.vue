<template>
    <div class="wrapper">
        <v-head></v-head>
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="40"
        shapeType="star"
        :particleSize="4"
        linesColor="#FFFFFF"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="cash"
      >
      </vue-particles>
            <div class="content">
                <router-view></router-view>
              <v-footer></v-footer>

            </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vFooter from './Footer.vue';

export default {
    components: {
        vHead,
        vFooter
    }
};
</script>

<style>


.cash {
  position:fixed;
  top:180px;
  width:100%;
}



</style>
