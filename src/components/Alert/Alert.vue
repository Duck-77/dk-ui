<template>
    <Transition name="fade">
        <div
            v-if="alertShow"
            class="dk-alert"
            :class="{
                [`dk-alert--${type}`]: type,
                [`dk-alert--${effect}`]: effect,
            }"
            :style="alertTextColor">
            <!-- Alert-Light-->
            <div
                class="dk-alert__left-icon"
                v-if="title && showIcon">
                <TypeIcon
                    :type="type"
                    size="2x"></TypeIcon>
            </div>
            <!-- Alert-Right -->
            <div class="dk-alert__info">
                <!-- Title -->
                <span
                    v-if="title"
                    class="dk-alert__title"
                    :class="{
                        'is-center': titleCenter,
                    }">
                    <slot name="title">{{ title }}</slot>
                    <Icon
                        class="dk-alert__close-btn"
                        :style="alertTextColor"
                        :icon="closeIcon || 'xmark'"
                        @click="handleCloseClick"
                        v-if="closeable" />
                </span>
                <!-- Content -->
                <div
                    class="dk-alert__content"
                    :class="{
                        'is-center': contentCenter,
                    }">
                    <div class="dk-alert__content-row">
                        <TypeIcon
                            :type="type"
                            class="dk-alert-icon"
                            :class="{
                                [`alert-${type}-icon`]: type,
                            }"
                            :style="alertTextColor"
                            v-if="showIcon && !title">
                        </TypeIcon>
                        <slot>{{ content }}</slot>
                    </div>
                    <Icon
                        class="dk-alert__close-btn"
                        :style="alertTextColor"
                        :icon="closeIcon || 'xmark'"
                        @click="handleCloseClick"
                        v-if="closeable && !title" />
                </div>
            </div>
        </div>
    </Transition>
</template>
<script setup lang="ts">
defineOptions({
    name: 'DkAlert',
})
import { computed, ref } from 'vue'
import type { AlertEmits, AlertProps } from './types.ts'
import Icon from '../Icon/Icon.vue'
import TypeIcon from '../Common/TypeIcon.tsx'

const props = withDefaults(defineProps<AlertProps>(), {
    closeable: true,
    showIcon: false,
})
const emits = defineEmits<AlertEmits>()

const alertShow = ref(true)

const alertTextColor = computed(() => {
    return props.effect === 'dark' ? { color: '#fff' } : {}
})

const alertIcon = computed(() => {
    const map = new Map()
    map.set('success', 'circle-check')
    map.set('info', 'circle-info')
    map.set('warning', 'circle-exclamation')
    map.set('error', 'circle-xmark')
    return map.get(props.type)
})

const handleCloseClick = () => {
    alertShow.value = false
    emits('close')
}
</script>
<style scoped></style>
