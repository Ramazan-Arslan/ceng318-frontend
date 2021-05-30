import getDentists from './getDentists';
import getTreatments from './getTreatments';

const getJsons = {
    getGains: function () {
        var dentists = getDentists.get();
        var json ={}

        for(var i=0;i<dentists.length;i++)
        {
            var name = dentists[i].name;
            json[name]="0";
            
        }

        return json;


    },

    getTreatments: function () {
        var dentists = getDentists.get();
        var json ={}

        for(var i=0;i<dentists.length;i++)
        {
            var name = dentists[i].name;
            json[name]="0";
            
        }

    },

    getWorkloads: function ()
    {
        var dentists = getDentists.get();
        var json ={}

        for(var i=0;i<dentists.length;i++)
        {
            var name = dentists[i].name;
            json[name]="0";
            
        }

    }

};

export default getJsons;