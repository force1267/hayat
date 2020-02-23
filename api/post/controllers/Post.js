'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
let likeBlocked = [] // todo array

module.exports = {
    async like(ctx) { // GET /posts/like/:id
        let id = ctx.params.id
        if(!likeBlocked[id]) {
            likeBlocked[id] = true
            try {
                let post = await strapi.services.post.findOne({ id })
                await strapi.services.post.update({ id }, { like: post.like + 1})
                setTimeout(e => likeBlocked[id] = false, 3000)
                return { code: 200, message: "ok" }
            } catch (err) {
                likeBlocked[id] = false
                return {}
            }
        }
        return {}
    },
    async view(ctx) { // GET /posts/view/:id
        let id = ctx.params.id
        let post
        try {
            post = await strapi.services.post.findOne({ id })
            await strapi.services.post.update({ id }, { view: post.view + 1 })
        } catch (err) {
            return {}
        } finally {
            return { code: 200, message: "ok" }
        }
    },
    async thumbnailById(ctx) { // GET /posts/thumbnailById/:id
        console.log("dbg!!!")
        let id = ctx.params.id
        try {
            let post = await strapi.services.post.findOne({ id })
            delete post.content
            return post
        } catch (err) {
            return {}
        }
    },
    async thumbnail(ctx) { // GET /posts/thumbnail/
        try {
            let posts;
            if (ctx.query._q) {
                posts = await strapi.services.post.search(ctx.query);
            } else {
                posts = await strapi.services.post.find(ctx.query);
            }
            for(let post of posts) {
                delete post.content
            }
            return posts
        } catch (err) {
            console.error(err)
            return {}
        }
    },
};
