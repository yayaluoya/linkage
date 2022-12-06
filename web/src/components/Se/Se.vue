<script lang="ts">
export default {
  components: {},
  props: {
    se: String,
  },
  setup(props, ctx) {
    return {};
  },
};
</script>

<template>
  <div class="se" :class="se"></div>
</template>

<style scoped lang="scss">
.se {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  @mixin rotate45 {
    width: 300vh;
    height: 300vh;
    top: -100vh;
    left: -100vh;
    transform: rotate(45deg);
  }
  &.stripes {
    background-image: url("/se/grid.png");
  }
  &.dot {
    background-image: url("/se/dot.png");
  }
  &.cross {
    background-image: url("/se/cross.png");
  }
  &.fence {
    @include rotate45;
    background-image: url("/se/fence.png");
  }
  &.fence_bold {
    @include rotate45;
    background-image: url("/se/fence_bold.png");
  }
}
</style>