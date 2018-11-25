#!/usr/bin/env node

const cjk_regex = require("cjk-regex")().toRegExp();
const fs = require('fs')
const cheerio = require('cheerio')

function isCJK(c) {
    return cjk_regex.test(c)
}

function transform(string_in) {
    // load
    const $ = cheerio.load(string_in, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: true
    })

    // get every <g> that has 2 or more <text> children
    const groups = $('g').filter((_, el) => el.children.length > 1 && el.children.every(e => e.tagName === 'text'))

    // add space where necessary
    groups.each((_, g) => {
        const texts = g.children
        for (let i = 0; i < texts.length - 1; i++) {
            const formerLine = $(texts[i]).text()
            const latterLine = $(texts[i + 1]).text()

            // if either characters before and after linebreak are CJK
            if (isCJK(formerLine.indexOf(formerLine.length - 1)) ||
                isCJK(latterLine.indexOf(0))) {
                // do nothing
            } else {
                // add a space
                $(texts[i]).text(formerLine + ' ')
            }
        }
    })

    // render
    return $.xml()
}

if (module === require.main) {
    switch (process.argv.length) {
        // stdin -> stdout
        case 2:
            fs.writeFileSync(1, transform(fs.readFileSync(0)))
            break
        // file -> stdout
        case 3:
            fs.writeFileSync(1, transform(fs.readFileSync(process.argv[2])))
            break
        // file -> file
        case 4:
            fs.writeFileSync(process.argv[3], transform(fs.readFileSync(process.argv[2])))
            break
        default:
            console.error(`Usage:`)
            console.error(`       cat in.svg | node ${process.argv[1]} > out.svg`)
            console.error(`       node ${process.argv[1]} in.svg > out.svg`)
            console.error(`       node ${process.argv[1]} in.svg out.svg`)
            process.exit(1)
    }
}

module.exports = {
    transform
}