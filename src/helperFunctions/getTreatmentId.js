const helpers = {
    getId: function (type) {
        var returnedId = -1;

        switch (type) {
            case "Kanal tedavisi":
                returnedId = 1;
                break;

            case "Diş beyazlatma":
                returnedId = 2;
                break;
            case "Diş bakımı":
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