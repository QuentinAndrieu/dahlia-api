//@Flow
export interface IAppointment {
    _id: string;
    id_patient: string;
    id_user: string;
    date: Date;
    title: string;
    description: string;
    rate: number;
    duration: number;
    createdAt: Date;
    trash: Boolean;
}