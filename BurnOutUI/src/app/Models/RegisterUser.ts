export interface RegisterUser{
    username:string;
    password :string;
    phoneNumber:string;
    email :string;
    gender :string;
    age :number;
    userID :number
    carType? :string; //for racer
    userRole:string; 
    license?:string; //for racer
}