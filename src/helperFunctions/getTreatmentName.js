const helpers = {
    getName: function (id) {
        var returnedName = "";

        switch (id) {
            case 1:
                returnedName ="Kanal tedavisi";
                break;

            case 2:
                returnedName = "Diş beyazlatma";
                break;
            case 3:
                returnedName = "Diş bakımı";
                break;
            default:
                returnedName = "";
                break;
        }

        return returnedName;
    }
};

export default helpers;