const helpers = {
    getId: function (dentist) {
        var returnedId = -1;

        switch (dentist) {
            case "John Doe":
                returnedId = 1;
                break;

            case "Angela Merkel":
                returnedId = 2;
                break;
            case "Sergen Yalçın":
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