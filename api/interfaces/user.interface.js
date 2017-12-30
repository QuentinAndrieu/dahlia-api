//@Flow
import { ISetting } from "./setting.interface";
import { IPatient } from "./patient.interface";
import { IAppointment } from "./appointment.interface";

export interface IUser {
    _id: string;
    username: string;
    lastname: string;
    firstname: string;
    mail: string;
    password: string;
    setting:ISetting;
    role: string;
    patients: IPatient[];
    appointments: IAppointment[];
    createdAt: Date;
    trash: Boolean;
}