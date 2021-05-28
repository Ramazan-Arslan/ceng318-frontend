const helpers = {
    getName: function (id) {
        var returnedName = "";

        switch (id) {
            case 1:
                returnedName ="John Doe";
                break;

            case 2:
                returnedName = "Angela Merkel";
                break;
            case 3:
                returnedName = "Sergen Yalçın";
                break;
            default:
                returnedName = "";
                break;
        }

        return returnedName;
    }
};

export default helpers;