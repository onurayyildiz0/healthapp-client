import axiosInstance from './axios';

/**
 * APPOINTMENT SERVICE
 * 
 * Randevu işlemleri için API fonksiyonları
 * Backend'deki endpoint'lere uygun yazılmıştır
 */

/**
 * YENİ RANDEVU OLUŞTUR (Patient)
 * 
 * Backend Endpoint: POST /api/appointments
 * 
 * Gönderilmesi gereken data:
 * {
 *   doctor: "mongoID",     // Doktor ID (MongoDB ObjectId)
 *   date: "2025-10-20",    // Randevu tarihi (ISO 8601)
 *   start: "10:00",        // Başlangıç saati (HH:mm)
 *   end: "11:00",          // Bitiş saati (HH:mm)
 *   notes: "..."           // Not (opsiyonel)
 * }
 */
export const createAppointment = async (appointmentData) => {
    try {
        const response = await axiosInstance.post('/appointments', appointmentData);
        console.log('Create Appointment Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Create Appointment Error:', error.response?.data || error);
        throw error;
    }
};

/**
 * RANDEVU DETAYINI GETİR
 * 
 * Backend Endpoint: GET /api/appointments/:id
 */
export const getAppointmentById = async (appointmentId) => {
    const response = await axiosInstance.get(`/appointments/${appointmentId}`);
    return response.data;
};

/**
 * RANDEVU İPTAL ET
 * 
 * Backend Endpoint: PATCH /api/appointments/:id/cancel
 */
export const cancelAppointment = async (appointmentId) => {
    const response = await axiosInstance.patch(`/appointments/${appointmentId}/cancel`);
    return response.data;
};

/**
 * DOKTOR RANDEVULARI (Doctor Dashboard için)
 * 
 * Backend Endpoint: GET /api/appointments/doctor
 */
export const getDoctorAppointments = async () => {
    const response = await axiosInstance.get('/appointments/doctor');
    return response.data;
};

/**
 * HASTA RANDEVULARI (Patient Dashboard için)
 * 
 * Backend Endpoint: GET /api/appointments/patient
 */
export const getPatientAppointments = async () => {
    const response = await axiosInstance.get('/appointments/patient');
    return response.data;
};

export default {
    createAppointment,
    getAppointmentById,
    cancelAppointment,
    getDoctorAppointments,
    getPatientAppointments
};
