'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findOne(ctx) {
        const entity = await strapi.services.advertise.findOne(ctx.params);
        if(entity && entity.submitted && entity.active) {
            return sanitizeEntity(entity, { model: strapi.models.advertise });
        } else {
            ctx.notFound("Not Found")
        }
    },
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.advertise.search(ctx.query);
        } else {
          entities = await strapi.services.advertise.find(ctx.query);
        }
    
        let ge = entities
        .filter(entity => entity.user && entity.submitted && entity.active)
        .map(entity => sanitizeEntity(entity, { model: strapi.models.advertise }))
        ge.forEach(e => {
            let uid = e.user.id
            e.user = { uid }
        });
        return ge
    },
    async findMine(ctx) {
        if(ctx.state.user) {
            let entities;
            if (ctx.query._q) {
              entities = await strapi.services.advertise.search(ctx.query);
            } else {
              entities = await strapi.services.advertise.find(ctx.query);
            }
        
            let ge = entities
            .filter(entity => entity.user && entity.user.id === ctx.state.user.id)
            .map(entity => sanitizeEntity(entity, { model: strapi.models.advertise }))
            ge.forEach(e => {
                let uid = e.user.id
                e.user = { uid }
            });
            return ge
        } else {
            ctx.unauthorized(`You're not logged in!`);
        }
    },
    async findByUser(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.advertise.search(ctx.query);
        } else {
            entities = await strapi.services.advertise.find(ctx.query);
        }

        let ge = entities
        .filter(entity => entity.user && entity.user.id.toString() === ctx.params.id)
        .map(entity => sanitizeEntity(entity, { model: strapi.models.advertise }))
        ge.forEach(e => {
            let uid = e.user.id
            e.user = { uid }
        });
        return ge
    },
    async create(ctx) {
        let entity;
        if(ctx.state.user) {
            if (ctx.is('multipart')) {
                const { data, files } = parseMultipartData(ctx);
                data.active = true // should be false
                data.user = ctx.state.user.id
                delete data.images
                entity = await strapi.services.advertise.create(data, { files });
            } else {
                ctx.request.body.active = true // should be false
                ctx.request.body.user = ctx.state.user.id
                delete ctx.request.body.images
                entity = await strapi.services.advertise.create(ctx.request.body);
            }
            return sanitizeEntity(entity, { model: strapi.models.advertise });
        } else {
            ctx.unauthorized(`You're not logged in!`);
        }
    },
    async update(ctx) {
        let entity;
        if(ctx.state.user) {
            ctx.params.user = ctx.state.user.id
            if (ctx.is('multipart')) {
                const { data, files } = parseMultipartData(ctx);
                delete data.images
                entity = await strapi.services.advertise.update(ctx.params, data, {
                    files,
                });
            } else {
                delete ctx.request.body.images
                entity = await strapi.services.advertise.update(
                    ctx.params,
                    ctx.request.body
                );
            }
        
            return sanitizeEntity(entity, { model: strapi.models.advertise });
        } else {
            ctx.unauthorized(`You're not logged in!`);
        }
    },
    async delete(ctx) {
        if(ctx.state.user) {
            ctx.params.user = ctx.state.user.id
            const entity = await strapi.services.advertise.delete(ctx.params);
            await Promise.all(entity.images.map(image => strapi.query('file', 'upload').delete({ id: image.id })))
            return sanitizeEntity(entity, { model: strapi.models.advertise });
        } else {
            ctx.unauthorized(`You're not logged in!`);
        }
    },

    async deleteImage(ctx) { // DELETE advertise/:ad/image/:image
        if(ctx.state.user) {
            ctx.params.user = ctx.state.user.id
            const entity = await strapi.services.advertise.findOne({id: ctx.params.ad});
            const images = entity.images.map(img => img.id)
            if(images.includes(ctx.params.image)) {
                await strapi.services.advertise.update({ id: ctx.params.ad }, { images: images.filter(id => id != ctx.params.image) })
                let image = await strapi.query('file', 'upload').delete({ id: ctx.params.image })
                return await strapi.services.advertise.findOne({ id: ctx.params.ad });
            } else {
                return ctx.forbidden(`Image does not belong to your ad!`)
            }
        } else {
            return ctx.unauthorized(`You're not logged in!`);
        }
    },

    async verifyImage(ctx) { // GET advertises/verifyImage/:id
        const entity = await strapi.services.advertise.findOne({id: ctx.params.id})
        return await strapi.services.advertise.update({ id: ctx.params.id }, { hasImage: entity && entity.images && entity.images.length > 0 })
    }
};
