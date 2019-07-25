import { Data} from './data';

export class Pojo {
    Data : Data;

    
    constructor() {
        this.Data = new Data();
    }

    getLogin(data : Object) : Object {
        var val = "";
        this.Data.users.forEach(element => {    
            if(element.email == data['user'].email && element.password == data['user'].password) {
                val = element.name;
            }                      
       });
       return val;
    }

    getUserDetails(data:Object) : Object {
        var val = null;
        this.Data.users.forEach(element => {
            if(element.email == data) {
                val = element;
            }
        });
        return val;
    }

    postUpdateDetails(data:Object) : Object {
        return true;
    }

    postUpdatePassword(email:Object , data:Object) : Object {
        console.log(data['old'])
        var val = false;
        this.Data.users.forEach(element => {
            if(element.email == email) {
                if(element.password == data['old'])
                {
                    val = true;
                }
            }
        })
        return val;
    }

    postAddNewAddress(email:Object, data:Object) : Object {
        return true;
    }

    removeAddress(email:Object, data:Object) : Object {
        return true;
    }

    postAddNewJob(email:Object, data:Object) : Object {
        return true;
    }

    getCategory() : Object {
        return this.Data.category;
    }
}
