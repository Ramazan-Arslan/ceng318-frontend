const helpers = {
    getId: function (name) {
        var returnedId = -1;

        switch (name) {
            case "Root Canal Treatment":
                returnedId = 1;
                break;

            case "Teeth whitening":
                returnedId = 2;
                break;
            case "Dental Care":
                returnedId = 3;
                break;

            case "Tooth extraction":
                returnedId = 5;
                break;
            case "Routine Control":
                returnedId = 6;
                break;
            default:
                returnedId = -1;
                break;
        }

        return returnedId;
    }
};

export default helpers;