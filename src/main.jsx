import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App.jsx';
import 'antd/dist/reset.css';
import './index.css';

/**
 * PROVIDER NEDİR?
 * 
 * Redux store'u tüm uygulama ile paylaşmak için kullanılır
 * 
 * <Provider store={store}>
 *   <App />
 * </Provider>
 * 
 * Bu sayede App ve tüm alt component'ler
 * useSelector ve useDispatch kullanarak
 * store'a erişebilir
 * 
 * Nasıl çalışır?
 * 1. Provider, store'u React Context API ile paylaşır
 * 2. Herhangi bir component useSelector kullandığında
 * 3. Provider o component'e store'dan veri verir
 * 4. State değiştiğinde Provider otomatik re-render tetikler
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider ile App'i sarıyoruz */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);