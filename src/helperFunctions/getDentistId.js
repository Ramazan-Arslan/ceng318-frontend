const helpers = {
    getId: function (dentist) {
        var returnedId = -1;

        switch (dentist) {
            case "Doktor1":
                returnedId = 1;
                break;

            case "Doktor2":
                returnedId = 2;
                break;
            case "Doktor3":
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