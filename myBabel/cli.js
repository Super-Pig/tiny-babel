#!/usr/bin/env node

/**
 * 一个简单的 babel-cli
 * 未做参数校验
 * 
 * ./myBabel/cli.js src --out-dir dist
 */
const fs = require('fs')
const path = require('path')
const { transformSync } = require('./core')
const config = require('../babel.config')
const shell = require('shelljs')

const args = process.argv
const sourceDir = path.resolve(args[2])
const distDir = path.resolve(args[4])

// 读取 src 目录下的文件列表
const files = fs.readdirSync(sourceDir)

shell.exec(`rm -rf ${distDir} && mkdir ${distDir}`)

/**
 * 遍历文件列表，逐个转换
 */
files.forEach(file => {
    const sourceCode = fs.readFileSync(path.resolve(sourceDir, file)).toString()

    const transformedCode = transformSync(sourceCode, config)

    fs.writeFileSync(path.resolve(distDir, file), transformedCode)
})

console.log('done.')


