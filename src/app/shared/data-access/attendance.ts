import { Time } from "@angular/common"
import { Employee } from "./employee"
import { Department } from "./department"
import { Project } from "./project"

export interface Attendance {
    attendanceID: number,
    employeeName: Employee,
    employeeDept: Department,
    currentTime: Time,
    currentDate: Date,
    currentLocation: string,
    projectList: Project,
    checkInTime: Time,
    checkOutTime: Time,
    totalHrsTime: Time,
}


