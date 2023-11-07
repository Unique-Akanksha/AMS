import { Role } from "./role";

export interface Employee {
    employee_id: number,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    hire_date: Date,
    department: string,  
    position: string,
    password: string,  
    userPhoto: string, 
    role: Role,  
}
