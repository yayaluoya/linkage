<script lang="ts">
import { ref, reactive, customRef } from 'vue';
export default {
    components: {},
    props: {
        color: {
            type: String,
            default: '',
        },
    },
    emits: ['update:color'],
    setup(props, ctx) {
        const color = customRef((g, s) => {
            return {
                get() {
                    g();
                    return props.color;
                },
                set(value: string) {
                    s();
                    ctx.emit('update:color', value);
                },
            };
        });
        const predefineColors = ref([
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
            'rgba(255, 69, 0, 0.68)',
            'rgb(255, 120, 0)',
            'hsv(51, 100, 98)',
            'hsva(120, 40, 94, 0.5)',
            'hsl(181, 100%, 37%)',
            'hsla(209, 100%, 56%, 0.73)',
            '#c7158577',
        ]);
        return {
            predefineColors,
            color,
        };
    },
};
</script>

<template>
    <el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
</template>

<style scoped lang="scss"></style>
