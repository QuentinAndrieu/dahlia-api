//@Flow
import { IAppointment } from "./appointment.interface";

export interface IPatient {
    _id: string;
    id_user: string;
    lastname: string;
    firstname: string;
    birthday: Date;
    description: string;
    appointments: IAppointment,
    createdAt: Date;
    trash: Boolean;
}