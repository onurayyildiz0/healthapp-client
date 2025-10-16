import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appointmentReducer from './slices/appointmentSlice';

/**
 * REDUX STORE NEDİR?
 * 
 * Store, uygulamanızın tüm state'lerinin (verilerin) tutulduğu merkezi bir yerdir.
 * Düşünün ki bir veritabanı gibi, ama tarayıcıda çalışıyor.
 * 
 * Örnek:
 * - Kullanıcı giriş yaptı mı? → authSlice'ta tutuluyor
 * - Kullanıcı bilgileri neler? → authSlice'ta tutuluyor
 * - Randevular neler? → appointmentSlice'ta tutuluyor
 */

/**
 * configureStore:
 * Redux Toolkit'in store oluşturma fonksiyonu.
 * 
 * reducer: {} → Buraya farklı "slice"ları ekliyoruz
 * Slice = State'in bir parçası (örn: auth, user, appointments)
 */
const store = configureStore({
    reducer: {
        // auth: authReducer → state.auth olarak erişilebilir
        auth: authReducer,

        // appointments: appointmentReducer → state.appointments olarak erişilebilir
        appointments: appointmentReducer,

        // İleride eklenecek diğer slice'lar:
        // doctors: doctorsReducer,
        // reviews: reviewsReducer,
    },
});

/**
 * NASIL ÇALIŞIR?
 * 
 * 1. Component'te bir action dispatch ediyorsunuz (örn: "kullanıcı giriş yaptı")
 * 2. Store bu action'ı ilgili reducer'a gönderiyor
 * 3. Reducer state'i güncelliyor
 * 4. Component'ler yeni state'i alıyor ve re-render oluyor
 * 
 * Örnek akış:
 * LoginPage → dispatch(login()) → authSlice → store → tüm componentler
 */

export default store;
