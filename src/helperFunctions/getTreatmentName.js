const helpers = {
    getName: function (id) {
        var returnedName = "";

        switch (id) {
            case 1:
                returnedName = "Root Canal Treatment";
                break;

            case 2:
                returnedName = "Teeth whitening";
                break;
            case 3:
                returnedName = "Dental Care";
                break;

            case 5:
                returnedName = "Tooth extraction";
                break;
            case 6:
                returnedName = "Routine Control";
                break;
            default:
                returnedName = "";
                break;
        }

        return returnedName;
    }
};

export default helpers;