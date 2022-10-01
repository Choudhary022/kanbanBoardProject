import { AbstractControl } from "@angular/forms";
export function dateValidator(control:AbstractControl){
    const currentDate=new Date();
    const startDate=new Date(control.value)
    if(startDate<currentDate)
    {
        return{invalidDate:true};
    }
    return null;
} 