/// <reference path="../node_modules/vitest/index.d.cts" />

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

//@ts-ignore
import PostcssEach from 'postcss-each'
//@ts-ignore
import PostcssEachVariables from 'postcss-each-variables'
//@ts-ignore
import PostcssFor from 'postcss-for'
//@ts-ignore
import PostcssColorMix from 'postcss-color-mix'
import PostcssNested from 'postcss-nested'

import pkg from '../package.json'

const external = new Array<string>()
Object.keys(pkg.dependencies).forEach((name) => {
    external.push(name)
})
Object.keys(pkg.peerDependencies).forEach((name) => {
    external.push(name)
})

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        dts({
            insertTypesEntry: true,
            tsconfigPath: path.resolve(__dirname, '../tsconfig.app.build.json'),
            outDir: 'dist',
            // rollupTypes: true,
            pathsToAliases: true
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('../src', import.meta.url))
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
    },
    build: {
        outDir: 'dist/es',
        lib: {
            entry: path.resolve(__dirname, '../src/index.ts'),
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external,
            output: {
                assetFileNames: (chunk) => {
                    if (chunk.name === 'style.css') {
                        return 'index.css'
                    }
                    return '[name].[ext]'
                }
            }
        },
        sourcemap: true
    }
})
