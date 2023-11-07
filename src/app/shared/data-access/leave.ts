import { Employee } from "./employee";

export interface Leave {
    leaveRequestID: number,
    employee_id: Employee,
    leave_type: string,
    start_date: Date,
    end_date: Date,
    reason: string,
    status: string,
    created_at:Date,
}


