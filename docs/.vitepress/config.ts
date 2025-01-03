import { defineConfig } from 'vitepress'
import PostcssEach from 'postcss-each'
import PostcssEachVariables from 'postcss-each-variables'
import PostcssFor from 'postcss-for'
import PostcssColorMix from 'postcss-color-mix'
import PostcssNested from 'postcss-nested'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/dk-ui-docs/',
    title: 'Dk-UI',
    description: '一个仿照 Element Plus 实现的 Vue3 + TypeScript 的组件库项目',
    vite: {
        plugins: [vueJsx()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('../../src', import.meta.url))
            }
        },
        css: {
            postcss: {
                plugins: [
                    PostcssNested(),
                    //@ts-ignore
                    PostcssEachVariables(),
                    PostcssEach({
                        plugins: {
                            beforeEach: [PostcssFor(), PostcssColorMix()]
                        }
                    })
                ]
            }
        }
    },
    vue: {},
    markdown: {
        config(md) {
            md.use(containerPreview).use(componentPreview)
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide' },
            { text: '组件', link: '/components' }
        ],

        sidebar: {
            '/guide': [
                {
                    text: '基础',
                    items: [{ text: '快速开始', link: '/guide/start' }]
                }
            ],
            '/components': [
                {
                    text: 'Basic 基础组件',
                    items: [
                        { text: 'Button', link: '/components/button' },
                        { text: 'Icon', link: '/components/icon' }
                    ]
                },
                {
                    text: 'Form 表单组件',
                    items: [
                        { text: 'Input', link: '/components/input' },
                        { text: 'Radio', link: '/components/radio' },
                        { text: 'Switch', link: '/components/switch' },
                        { text: 'Select', link: '/components/select' },
                        { text: 'Form', link: '/components/form' }
                    ]
                },
                {
                    text: 'Data 数据展示',
                    items: [{ text: 'Collapse', link: '/components/collapse' }]
                },
                {
                    text: 'Navigation 导航',
                    items: [{ text: 'Dropdown', link: '/components/dropdown' }]
                },
                {
                    text: 'Feedback 反馈组件',
                    items: [
                        { text: 'Alert', link: '/components/alert' },
                        { text: 'Message', link: '/components/message' },
                        { text: 'Tooltip', link: '/components/tooltip' }
                    ]
                }
            ]
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
    }
})
