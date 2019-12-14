{
    const strapi = {
        jwt: null,

        async register(email, username, password) {
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
            strapi.jwt = auth.jwt
            document.cookie = `jwt=${strapi.jwt}`
            return strapi.jwt
        },
        async login(identifier, password) {
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
            strapi.jwt = auth.jwt
            document.cookie = `jwt=${strapi.jwt}`
            return strapi.jwt
        },
        // who am i
        async me() {
            return await fetch("/users/me", strapi.auth()).then(r=>r.json())        
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

            async upload(photos, adId) {
                // get photos like this:
                // const photos = document.getElementById('image_file_input')
                // const photos = document.querySelector('input[type="file"][multiple]');
        
                // upload images
                const formData = new FormData();
                formData.append('ref', 'advertise');
                formData.append('refId', adId); // <-- put id of post here
                formData.append('field', 'images');
                for (let i = 0; i < photos.files.length; i++) {
                    formData.append('files', photos.files[i]);
                }
                return await fetch('/upload', strapi.auth({
                    method: 'POST',
                    body: formData
                }));
            },
        }
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