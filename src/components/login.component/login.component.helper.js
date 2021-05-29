import postRequest from '../../server-connections/postRequest'

const helpers = {
    authentication: async function (json) {
        var path = "/api/v1/login";
        const obj = await postRequest(path, json);
        return obj;
    }
};

export default helpers;