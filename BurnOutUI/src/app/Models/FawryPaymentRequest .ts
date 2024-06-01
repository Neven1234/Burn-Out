export interface FawryPaymentRequest {
    eventId: number;
    isRacer: boolean;
    currency: string;
    phoneNumber: string;
    organizerId: string;
}