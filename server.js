console.log(`node:12:${process.env.NODE_ENV}`)
const strapi = require('strapi')()
strapi.start();