const helpers = {
    getName: function (id) {
        var returnedName = "";

        switch (id) {
            case 1:
                returnedName ="Doktor1";
                break;

            case 2:
                returnedName = "Doktor2";
                break;
            case 3:
                returnedName = "Doktor3";
                break;
            default:
                returnedName = "";
                break;
        }

        return returnedName;
    }
};

export default helpers;