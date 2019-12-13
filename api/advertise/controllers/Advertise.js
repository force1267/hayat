'use strict';

const { sanitizeEntity } = require('strapi-utils');

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
        .filter(entity => entity.submitted && entity.active)
        .map(entity => sanitizeEntity(entity, { model: strapi.models.advertise }))
        ge.forEach(e => {
            delete e.user
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
            .filter(entity => entity.user.id === ctx.state.user.id)
            .map(entity => sanitizeEntity(entity, { model: strapi.models.advertise }))
            ge.forEach(e => {
                delete e.user
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
            delete e.user
        });
        return ge
    },
};
