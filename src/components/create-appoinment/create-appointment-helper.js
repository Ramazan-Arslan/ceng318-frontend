import postRequest from '../../server-connections/postRequest'

const helpers = {
    createAppointment: async function (json) {
        var path = "/api/v1/add/appointment";        
        const isTrue = await postRequest(path, json);        

        if(isTrue)
        {
            alert("Added")
            window.history.pushState(null, "Dentist Appointment App", "/calendar")
            window.location.reload(true);
        }
    }
};

export default helpers;