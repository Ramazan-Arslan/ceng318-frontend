const helpers = {
    getId: function (dentist) {
        var returnedId = -1;

        switch (dentist) {
            case "Halil Biricik":
                returnedId = 1;
                break;

            case "Nazli Cosar":
                returnedId = 2;
                break;
            case "Sena Güzel":
                returnedId = 3;
                break;
            default:
                returnedId = -1;
                break;
        }

        return returnedId;
    }
};

export default helpers;