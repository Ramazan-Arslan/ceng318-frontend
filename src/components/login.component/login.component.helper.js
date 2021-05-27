const helpers = {
    authentication: async function (json) {
        var path = "login";
        const obj = await postRequest(path, json);
        if (Boolean(obj.token)) {
            localStorage.setItem('token', obj.token);
            return obj
        } else {
            return null
        }
    }
};

export default helpers;