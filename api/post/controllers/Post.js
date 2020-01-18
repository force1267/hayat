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
                let result = await strapi.services.post.update({ id }, { like: post.like + 1})
                setTimeout(e => likeBlocked[id] = false, 3000)
                return result
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
            return post
        }
    }
};
