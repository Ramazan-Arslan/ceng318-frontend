import getDentists from './getDentists';
import getTreatments from './getTreatments';

const getJsons = {
    getGains: function () {
        var dentists = getDentists.get();
        var json ={}

        for(var i=0;i<dentists.length;i++)
        {
            var name = dentists[i].name;
            json[name]=0;
            
        }

        return json;


    },

    getTreatments: function () {
        var dentists = getDentists.get();
        var treatments = getTreatments.get();
        var json ={}

        for(var i=0;i<dentists.length;i++)
        {
            var dentistName = dentists[i].name;
            var treatmentJson={}
            for(var j=0;j<treatments.length;j++)
            {
                var treatmentName = treatments[j].name; 
                treatmentJson[treatmentName]=0;                    
            }
            json[dentistName]=treatmentJson;
        }
        return json;

    },

    getWorkloads: function ()
    {
        var dentists = getDentists.get();
        var json ={}

        for(var i=0;i<dentists.length;i++)
        {
            var name = dentists[i].name;
            json[name]=0;
            
        }
        return json;
    }

};

export default getJsons;