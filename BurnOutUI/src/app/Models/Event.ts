export interface Event{
   id:number;
   eventName:string;
   photoUrl:string;
   publicId:string;
   organzerName:string;
   approved:boolean;
   description :string
   place :string
   date :Date
   audiencePrice:number;
   racerPrice:number;
   reciersCount :number
   audianceCount :number
   organizerId:string
}