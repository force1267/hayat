'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
let likeAvailable = true // todo array

module.exports = {
    async like(ctx) { // GET /posts/like/:id
        if(likeAvailable) {
            likeAvailable = false
            let id = ctx.params.id
            try {
                let post = await strapi.services.post.findOne({ id })
                let result = await strapi.services.post.update({ id }, { like: post.like + 1})
                setTimeout(e => likeAvailable = true ,3000)
                return result
            } catch (err) {
                likeAvailable = true
            }
        }
    }
};
