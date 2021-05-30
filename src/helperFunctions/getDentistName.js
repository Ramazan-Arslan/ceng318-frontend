const helpers = {
    getName: function (id) {
        var returnedName = "";

        switch (id) {
            case 1:
                returnedName ="Halil Biricik";
                break;
            case 2:
                returnedName = "Nazli Cosar";
                break;
            case 3:
                returnedName = "Sena Güzel";
                break;
            default:
                returnedName = "";
                break;
        }

        return returnedName;
    }
};

export default helpers;