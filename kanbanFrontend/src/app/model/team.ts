import { Member } from "./members";

export class Team {
    constructor(public teamId:String,
        public memberList:Member[])
    {
        
    }
}