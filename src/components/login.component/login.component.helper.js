import postRequest from '../../server-connections/postRequest'

const helpers = {
    authentication: async function (json) {
        var path = "/api/v1/login";

        const obj = await postRequest(path, json);
        if (Boolean(obj.accessToken)) {
            localStorage.setItem('token', obj.accessToken);
            return obj
        } else {
            return null
        }
    }
};

export default helpers;