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

        auth(options = {}) {
            if(!strapi.jwt) {
                throw "Not logged in"
            }
            if(!options.headers) {
                options.headers = {}
            }
            options.headers.Authorization = `Bearer ${strapi.jwt}`
            return options
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