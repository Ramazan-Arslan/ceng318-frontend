import postRequest from '../../server-connections/postRequest'

const helpers = {
    //DENEME AMAÇLIYDI DÜZENLENECEK
    createAppointment: async function (json) {
        var path = "/api/v1/add/doctor";

        var jsonx = {
            full_name:"Furkan Sahin2",
            gain: 200,
            phone: "1231231"
        }
        const obj = await postRequest(path, jsonx);
        if (Boolean(obj.accessToken)) {
            localStorage.setItem('token', obj.accessToken);
            return obj
        } else {
            return null
        }
    }
};

export default helpers;