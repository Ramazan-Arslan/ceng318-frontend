import postRequest from '../../server-connections/postRequest'
import getDentistName from '../../helperFunctions/getDentistName'
import getTreatmentName from '../../helperFunctions/getTreatmentName'

const helpers = {
    //DENEME AMAÇLIYDI DÜZENLENECEK
    getAppointments: async function () {
        var path = "/api/v1/get/appointments";

        var json = {
            dentist1: "1",
            dentist2: "2",
            dentist3: "3"
        }

        const obj = await postRequest(path, json);
    },

    loadItems: async function (patient_name, selectedDentists, selectedTreatments, startLong, endLong) {
        var jsonArray = [

            {
                selectedDate: 1622204091000,
                patient_name: "Furkan Şahin",
                patient_gender: "male",
                hour: "12:00-13:00",
                doctor: 1,
                patient_phone: "05001112233",
                patient_age: 18,
                type: 1,
                description: "Kanal dsasdsdadsa"
            },

            {
                selectedDate: 1622204091000,
                patient_name: "Furkanasd",
                patient_gender: "male",
                hour: "14:00-15:00",
                doctor: 2,
                patient_phone: "05001112233",
                patient_age: 18,
                type: 2,
                description: "Kanal dsasdsdadsa"
            },

            {
                selectedDate: 1622204091000,
                patient_name: "Furkanasd",
                patient_gender: "male",
                hour: "16:00-17:00",
                doctor: 3,
                patient_phone: "05001112233",
                patient_age: 18,
                type: 2,
                description: "Kanal dsasdsdadsa"
            },
        ];

        var count = 0;
        var newItems = [];

        jsonArray.map(e => {
            var start = this.getStartDate(e.selectedDate, e.hour);
            var end = this.getEndDate(e.selectedDate, e.hour);
            var doctorName = getDentistName.getName(e.doctor);
            var treatmentType = getTreatmentName.getName(e.type);

            if ((Boolean(patient_name) && e.patient_name == patient_name) || !Boolean(patient_name)) {
                if ((Boolean(selectedDentists) && selectedDentists.includes(doctorName)) || !Boolean(selectedDentists)) {
                    if ((Boolean(selectedTreatments) && selectedTreatments.includes(treatmentType)) || !Boolean(selectedTreatments)) {
                        if (((startLong != 0 && endLong != 0) && startLong <= e.selectedDate && e.selectedDate <= endLong) || (startLong == 0 && endLong == 0)) {
                            console.log(startLong,endLong,e.selectedDate)
                            newItems.push(
                                {
                                    id: count,
                                    title: e.hour,
                                    start: start,
                                    end: end,
                                    patient_name: e.patient_name,
                                    patient_gender: e.gender,
                                    hour: e.hour,
                                    doctor: doctorName,
                                    patient_phone: e.patient_phone,
                                    patient_age: e.patient_age,
                                    type: treatmentType,
                                    description: e.description

                                });
                            count++;
                        }
                    }
                }
            }

        })

        return newItems;


    },

    getStartDate: function (long, hour) {
        var startArray = hour.split("-")[0];
        var startHour = startArray.split(":")[0];
        var startMinute = startArray.split(":")[1];

        var startingDate = new Date(long);
        startingDate.setHours(startHour, startMinute, 0, 0);

        return startingDate;
    },

    getEndDate: function (long, hour) {
        var endArray = hour.split("-")[1];
        var endHour = endArray.split(":")[0];
        var endMinute = endArray.split(":")[1];

        var endingDate = new Date(long);
        endingDate.setHours(endHour, endMinute, 0, 0);

        return endingDate;
    }

};

export default helpers;