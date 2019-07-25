export enum category {
    Plumber = "Plumber",
    Electrician = "Electrician",
    Carpenter = "Carpenter"
}

export enum status {
    True = "true",
    False = "false"
}

export interface job {
    id : number;
    category : category;
    description : string;
    date : string;
}

export interface address {
    house : string;
    area : string;
    pincode : string;
    city : string;
}

export interface user {
    name : string;
    email : string;
    password : string;
    mobile : number;
    age : number;
    gender : string;
    address : address[];
    job : job[];
}

export interface field {
    category : category;
    worktime : string;
}

export interface labour {
    id : string;
    name : string;
    password : string;
    mobile : number;
    age : number,
    gender : string;
    address : address;
    work : field[];
}


export interface notification {
    job : job['id'],
    labour : labour,
    status : status
}

export class Data {
    category = [category.Carpenter,category.Electrician,category.Plumber];
    users : user[] = [
        {
            name : "Shubham",
            email : "shubham@gmail.com",
            password : "shubham",
            mobile : 9017628088,
            age : 24,
            gender : "Male",
            address : [{
                house : "194/B1",
                area : "CV Raman Nagar",
                pincode : "560032",
                city : "Banagalore"
            }],
            job : [
                {
                    id : 1,
                    category : category.Carpenter,
                    description : "Some Wood Work",
                    date : "2019-07-23"
                }
            ]
        }
    ];

    labours : labour[] = [ 
        {
            id : "L001",
            name : "Rajni",
            password : "rajjo",
            mobile : 9876543210,
            age : 26,
            gender : "Male",
            address : {
                house : "194/B1",
                area : "CV Raman Nagar",
                pincode : "560032",
                city : "Banagalore"
            },
            work : [
                {
                    category : category.Carpenter,
                    worktime : "Full Time"
                }
            ]
        }   
        ];
    
    // confirm : confirmation[] = [
    //     {
    //         job : {
    //                 id : 1,
    //                 category : category.Carpenter,
    //                 description : "Some Wood Work",
    //                 date : "2019-07-23"
    //             },
    //         status : status.True
    //     },
    //     {
    //         job : {
    //                 id : 2,
    //                 category : category.Plumber,
    //                 description : "Some Wood Work",
    //                 date : "2019-07-23"
    //             },
    //         status : status.False
    //     },
    // ];

    notify : notification[] = [
        {
            job : 1,
            status : status.True,
            labour : this.labours[0]
        }
    ];
    
}
