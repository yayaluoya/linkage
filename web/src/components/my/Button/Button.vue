<script lang="ts">
import { ref, reactive, computed } from 'vue';
import { Loading } from '@element-plus/icons-vue';
export default {
    components: { Loading },
    props: {
        type: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        return {};
    },
};
</script>

<template>
    <button type="button" class="button_" :class="type">
        <div class="mask"></div>
        <div class="content">
            <el-icon style="margin-right: 10px" v-if="loading"><Loading /></el-icon>
            <slot />
        </div>
    </button>
</template>

<style scoped lang="scss">
.button_ {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color-dark);
    padding: 8px 13px;
    border-radius: var(--border-radius);
    outline: none;
    position: relative;
    overflow: hidden;
    &[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
    > .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        background-color: white;
        transition: all 0.2s;
        border-radius: var(--border-radius);
    }
    > .content {
        color: var(--color);
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 1px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: all 0.2s;
    }
    &:hover {
        > .mask {
            opacity: 0.85;
        }
        > .content {
            opacity: 0.85;
        }
    }
    &:active {
        > .mask {
            opacity: 1;
        }
        > .content {
            opacity: 1;
        }
    }

    &.e {
        > .mask {
            background-color: var(--theme-color);
        }
        > .content {
            color: white;
        }
    }
}
</style>
