{
    const strapi = {
        jwt: null,

        async register(email, username, password) {
            strapi.logout()
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
            setCookie("jwt", strapi.jwt, 7)
            return strapi.jwt
        },
        async login(identifier, password) {
            strapi.logout()
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
            setCookie("jwt", strapi.jwt, 7)
            return strapi.jwt
        },
        logout() {
            setCookie("jwt", "", -1)
            strapi.user.now = strapi.jwt = null
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

        post: {
            async find(query) {
                // find some adds
                return await fetch(`/posts${parseQuery(query)}`).then(r=>r.json())
            },
            async findOne(postId) {
                // get an ad by id
                return await fetch(`/posts/${postId}`).then(r=>r.json())
            },
            async like(postId) {
                // get an ad by id
                return await fetch(`/posts/like/${postId}`).then(r=>r.json())
            },
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
                // if(data.images instanceof Array) {
                //     data.hasImage = data.images.length > 0
                // }
                ///////
                delete data.images
                data.hasImage = false
                ///////
                
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
                    // delete an adImage by id
                    return await fetch(`/advertises/${adId}/image/${imgId}`, strapi.auth({
                        method: "DELETE"
                    })).then(r=>r.json())
                },

                async upload(photos, adId) {
                    // get photos like this:
                    // const photos = document.getElementById('image_file_input')
                    // const photos = document.querySelector('input[type="file"][multiple]');
                    if(photos.files.length < 1) return;
                    // upload images
                    const formData = new FormData()
                    formData.append('ref', 'advertise')
                    formData.append('refId', adId)
                    formData.append('field', 'images')

                    var options = {
                        maxSizeMB: 0.99,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    }

                    let files
                    if(photos.files.length > 10) {
                        files = 10
                    } else {
                        files = photos.files.length
                    }
                    for (let i = 0; i < files; ++ i) {
                        // using /script/image-compress.js
                        let compressed = await imageCompression(photos.files[i], options)

                        // using /script/conversion.js
                        // let compressed = await imageConversion.compressAccurately(photos.files[i], 1019)

                        let file = new File([compressed], `ad.${adId}.${i}.jpg`, {
                            type: "image/jpeg",
                        })
                        console.log("file", file)
                        formData.append('files', file)
                        console.log("after append")
                    }

                    try {
                        return await fetch('/upload', strapi.auth({
                                method: 'POST',
                            body: formData
                        })).then(r=>r.json()).then(async r => {
                            if(photos.files.length > 0) {
                                // await strapi.advertise.update({ hasImage: true }, adId)
                                await fetch(`/advertises/verifyImage/${adId}`, strapi.auth())
                            }
                        })
                    } catch (e) {
                        console.error("eee", e)
                    }
                },
            },
            async mark(adId) {
                let me = await strapi.user.me();
                let marks = me.marks.map(ad => ad.id)
                marks.push(adId)
                return await strapi.user.update({marks})
            },
            async unmark(adId) {
                let me = await strapi.user.me();
                let marks = me.marks.map(ad => ad.id).filter(id => adId != id)
                return await strapi.user.update({marks})
            }
        },
        user: {
            now: null,
            
            // who am i
            async me() {
                if(strapi.user.now) {
                    return strapi.user.now;
                } else {
                    return strapi.user.now = await fetch("/users/me", strapi.auth()).then(r=>r.json())
                }
            },

            // request confirmation code to be sent
            async requestEmailConfirmation(email) {
                return await fetch('auth/send-email-confirmation', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        url: `https://${window.location.hostname}/confirm-email.html`
                    }),
                }).then(r=>r.json())
            },
            // confirm email using the code
            async confirmEmail() {
                let confirmation = getParameterByName("confirmation")
                return await fetch(`/auth/email-confirmation?confirmation=${confirmation}`).then(r=>r.json())
            },

            // request a code to be sent
            async forgotPassword(email) {
                return await fetch('/auth/forgot-password', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        url: `https://${window.location.hostname}/reset-password.html`
                    }),
                }).then(r=>r.json())
            },
            // use the code from `forgetPassword` to reset the password
            async resetPassword(password) {
                let code = getParameterByName("code")
                return await fetch('/auth/reset-password', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        code,
                        password,
                        passwordConfirmation: password
                    }),
                }).then(r=>r.json())
            },

            async findOne(userId) {
                // get a user by id
                return await fetch(`/users/${userId}`).then(r=>r.json())
            },
            async update(data) {

                let userId = (await strapi.user.me()).id

                return await fetch(`/users/${userId}`, strapi.auth({
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                })).then(r=>r.json())
            },
            avatar: {

                async delete() {
                    let me = await strapi.user.me()
                    me.avatar = null
                    let userId = me.id
    
                    return await fetch(`/users/${userId}`, strapi.auth({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(me),
                    })).then(r=>r.json())
                },

                async upload(photos) {
                    // get photos like this:
                    // const photos = document.getElementById('image_file_input')
                    // const photos = document.querySelector('input[type="file"][multiple]');
                    let me = await strapi.user.me();
                    // upload avatar
                    const formData = new FormData()
                    formData.append('ref', 'user') // TODO test this line
                    formData.append("source", "users-permissions")
                    formData.append('refId', me.id)
                    formData.append('field', 'avatar')

                    var options = {
                        maxSizeMB: 0.3,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    }
                    let compressed = await imageCompression(photos.files[0], options)

                    let file = new File([compressed], `avatar.${me.id}.jpg`, {
                        type: "image/jpeg",
                    })

                    formData.append('files', file)
                    return await fetch('/upload', strapi.auth({
                        method: 'POST',
                        body: formData
                    })).then(r=>r.json())
                },
            },
        },
    }

    function getParameterByName(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/en";
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/tr";
    }

    if(getCookie("jwt") != "") {
        strapi.jwt = getCookie("jwt")
    }
    window.strapi = strapi
}