{
    const strapi = {
        jwt: null,

        async register(email, username, password) {
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            strapi.jwt = null
            let auth
            try {
                auth = await fetch('/auth/local/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/JSON"
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password
                    })
                }).then(r => r.json())
            } catch (err) {
                throw err
            }
            if(!auth.jwt) {
                throw auth;
            }
            strapi.jwt = auth.jwt
            document.cookie = `jwt=${strapi.jwt}`
            return strapi.jwt
        },
        async login(identifier, password) {
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            strapi.jwt = null
            let auth
            try {
                auth = await fetch('/auth/local', {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/JSON"
                    },
                    body: JSON.stringify({
                        identifier,
                        password
                    })
                }).then(r => r.json())
            } catch (err) {
                throw err
            }
            if(!auth.jwt) {
                throw auth;
            }
            strapi.jwt = auth.jwt
            document.cookie = `jwt=${strapi.jwt}`
            return strapi.jwt
        },
        // who am i
        async me() {
            return await strapi.user.me()        
        },

        auth(options = {}) {
            if(!strapi.jwt) {
                throw "Not logged in"
            }
            if(!options.headers) {
                options.headers = {}
            }
            options.headers.Authorization = `Bearer ${strapi.jwt}`
            return options
        },

        advertise: {
            async find(query) {
                // find some adds
                return await fetch(`/advertises${parseQuery(query)}`).then(r=>r.json())
            },
            async findMine() {
                // find ads of logged-in user
                return await fetch("/advertises/mine", strapi.auth()).then(r=>r.json())
            },
            async findOne(adId) {
                // get an ad by id
                return await fetch(`/advertises/${adId}`).then(r=>r.json())
            },
            async create(data) {
                // data :
                // {
                //     title: "example title",
                //     description: "some description",
                //     class: "car",
                //     submitted: true, // to submit
                // }

                // create an ad
                if(data.images instanceof Array && data.images.length > 0) {
                    data.hasImage = true
                }
                return await fetch("/advertises", strapi.auth({
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })).then(r=>r.json())
            },
            async update(data, adId) {
                // data :
                // {
                //     title: "example title",
                //     description: "some description",
                //     class: "car",
                //     submitted: true, // to submit
                // }

                // update an ad by id
                if(data.images instanceof Array) {
                    data.hasImage = data.images.length > 0
                }
                return await fetch(`/advertises/${adId}`, strapi.auth({
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                })).then(r=>r.json())
            },
            async delete(adId) {
                // delete an ad by id
                fetch(`/advertises/${adId}`, strapi.auth({
                    method: "DELETE"
                })).then(r=>r.json())
            },
            image: {

                async delete(adId, imgId) {
                    // delete an ad by id
                    fetch(`/advertises/${adId}/image/${imgId}`, strapi.auth({
                        method: "DELETE"
                    })).then(r=>r.json())
                },

                async upload(photos, adId) {
                    // get photos like this:
                    // const photos = document.getElementById('image_file_input')
                    // const photos = document.querySelector('input[type="file"][multiple]');
                    
                    // upload images
                    const formData = new FormData()
                    formData.append('ref', 'advertise')
                    formData.append('refId', adId)
                    formData.append('field', 'images')
                    for (let i = 0; i < photos.files.length; i++) {
                        formData.append('files', photos.files[i])
                    }
                    if(photos.files.length > 0) {
                        try {
                            await strapi.advertise.update({ hasImage }, adId)
                        } catch(err) {
                            throw err
                            return err
                        }
                    }
                    return await fetch('/upload', strapi.auth({
                        method: 'POST',
                        body: formData
                    })).then(r=>r.json())
                },
            },
            async mark(adId) {
                let me = await strapi.user.me();
                me.marks = me.marks.map(ad => ad.id).push(adId)
                return await strapi.user.update(me)
            },
            async unmark(adId) {
                let me = await strapi.user.me();
                me.marks = me.marks.map(ad => ad.id).filter(id => adId != id)
                return await strapi.user.update(me)
            }
        },
        user: {
            // who am i
            async me() {
                return await fetch("/users/me", strapi.auth()).then(r=>r.json())        
            },

            async findOne(userId) {
                // get an ad by id
                return await fetch(`/users/${userId}`).then(r=>r.json())
            },
            async update(data) {
                // data :
                // {
                //     title: "example title",
                //     description: "some description",
                //     class: "car",
                //     submitted: true, // to submit
                // }

                // update an ad by id
                let userId = await strapi.user.me().id

                return await fetch(`/users/${userId}`, strapi.auth({
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                })).then(r=>r.json())
            },
            avatar: {
                // TODO not tested api
                async upload(photos) {
                    // get photos like this:
                    // const photos = document.getElementById('image_file_input')
                    // const photos = document.querySelector('input[type="file"][multiple]');

                    let me = await strapi.user.me();
                    // upload avatar
                    const formData = new FormData()
                    formData.append('ref', 'user') // TODO test this line
                    formData.append('refId', me.id)
                    formData.append('field', 'avatar')
                    formData.append('files', photos.files[0])
                    return await fetch('/upload', strapi.auth({
                        method: 'POST',
                        body: formData
                    })).then(r=>r.json())
                },
            },
        },
    }

    function parseQuery(query = {}) {
        let q = '?'
        for(let key in query) {
            q += `${key}=${query[key]}&`
        }
        if(q.length > 1) {
            return q.slice(0, q.length - 1)
        } else {
            return ''
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    if(getCookie("jwt") != "") {
        strapi.jwt = getCookie("jwt")
    }
    window.strapi = strapi
}