export interface StaffMember {
    staffId: number;
    nameRu: string;
    nameEn: string;
    description: string | null;
    posterUrl: string;
    professionText: string;
    professionKey: 'DIRECTOR' | 'ACTOR' | 'WRITER' | string;
}
export type StaffMembers = StaffMember[];