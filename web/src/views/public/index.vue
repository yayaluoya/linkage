<script lang="ts">
import { ref, reactive } from 'vue';
export default {
    components: {},
    props: {},
    setup(props, ctx) {
        return {};
    },
};
</script>

<template>
    <div class="public">
        public页面
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<style scoped lang="scss">
.public {
    width: 100%;
}
</style>
