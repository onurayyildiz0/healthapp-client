import { useState, useEffect } from 'react';
import { Card, Button, Select, DatePicker, TimePicker, Input, Alert, message } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, MedicineBoxOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import * as appointmentService from '../../api/appointmentService';
import axiosInstance from '../../api/axios';
import { createAppointmentSchema } from '../../validations/AppointmentValidations';
import {
    createAppointmentStart,
    createAppointmentSuccess,
    createAppointmentFailure,
    selectAppointmentLoading,
    selectAppointmentError
} from '../../store/slices/appointmentSlice';

const { TextArea } = Input;

const CreateAppointment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(selectAppointmentLoading);
    const error = useSelector(selectAppointmentError);

    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);

    // Doktor listesini çek
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoadingDoctors(true);
                const response = await axiosInstance.get('/doctors');
                console.log('Doctors Response:', response.data); // Debug için

                // Backend direkt array dönüyor
                const doctorsList = Array.isArray(response.data)
                    ? response.data
                    : response.data.data || [];

                setDoctors(doctorsList);
            } catch (err) {
                message.error('Doktor listesi yüklenirken hata oluştu');
                console.error('Doctors Fetch Error:', err);
            } finally {
                setLoadingDoctors(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            dispatch(createAppointmentStart());

            // Backend'e uygun formatta data hazırla
            const appointmentData = {
                doctor: values.doctor,
                date: dayjs(values.date).format('YYYY-MM-DD'),
                start: values.start,
                end: values.end,
                notes: values.notes || ''
            };

            const response = await appointmentService.createAppointment(appointmentData);

            dispatch(createAppointmentSuccess(response));
            message.success('Randevu başarıyla oluşturuldu!');
            resetForm();

            // Randevularım sayfasına yönlendir
            setTimeout(() => {
                navigate('/dashboard/patient/appointments');
            }, 1500);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Randevu oluşturulurken hata oluştu';
            dispatch(createAppointmentFailure(errorMessage));
            message.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-blue-500" />
                        <span>Yeni Randevu Oluştur</span>
                    </div>
                }
                className="shadow-lg"
            >
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        closable
                        className="mb-4"
                    />
                )}

                <Formik
                    initialValues={{
                        doctor: '',
                        date: null,
                        start: '',
                        end: '',
                        notes: ''
                    }}
                    validationSchema={createAppointmentSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                        <Form className="space-y-6">
                            {/* Doktor Seçimi */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <MedicineBoxOutlined className="mr-2" />
                                    Doktor Seçin
                                </label>
                                <Select
                                    size="large"
                                    placeholder="Doktor seçiniz..."
                                    value={values.doctor || undefined}
                                    onChange={(value) => setFieldValue('doctor', value)}
                                    loading={loadingDoctors}
                                    className="w-full"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {doctors.map((doctor) => (
                                        <Select.Option key={doctor._id} value={doctor._id}>
                                            {doctor.user?.name || 'İsimsiz'} - {doctor.speciality || doctor.specialty || 'Branş Yok'}
                                        </Select.Option>
                                    ))}
                                </Select>
                                {errors.doctor && touched.doctor && (
                                    <div className="text-red-500 text-sm mt-1">{errors.doctor}</div>
                                )}
                            </div>

                            {/* Tarih Seçimi */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <CalendarOutlined className="mr-2" />
                                    Randevu Tarihi
                                </label>
                                <DatePicker
                                    size="large"
                                    placeholder="Tarih seçiniz..."
                                    value={values.date}
                                    onChange={(date) => setFieldValue('date', date)}
                                    className="w-full"
                                    format="DD/MM/YYYY"
                                    disabledDate={(current) => {
                                        // Geçmiş tarihleri devre dışı bırak
                                        return current && current < dayjs().startOf('day');
                                    }}
                                />
                                {errors.date && touched.date && (
                                    <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                                )}
                            </div>

                            {/* Saat Seçimi */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Başlangıç Saati */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <ClockCircleOutlined className="mr-2" />
                                        Başlangıç Saati
                                    </label>
                                    <TimePicker
                                        size="large"
                                        placeholder="Başlangıç saati"
                                        value={values.start ? dayjs(values.start, 'HH:mm') : null}
                                        onChange={(time) => setFieldValue('start', time ? time.format('HH:mm') : '')}
                                        format="HH:mm"
                                        className="w-full"
                                        minuteStep={15}
                                        showNow={false}
                                        disabledHours={() => {
                                            // Mesai dışı saatleri devre dışı bırak (08:00 - 18:00 arası)
                                            return [...Array(8).keys(), ...Array(6).keys().map(i => i + 18)];
                                        }}
                                    />
                                    {errors.start && touched.start && (
                                        <div className="text-red-500 text-sm mt-1">{errors.start}</div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1">
                                        ℹ️ Lütfen doktorun çalışma saatlerine dikkat edin
                                    </div>
                                </div>

                                {/* Bitiş Saati */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        <ClockCircleOutlined className="mr-2" />
                                        Bitiş Saati
                                    </label>
                                    <TimePicker
                                        size="large"
                                        placeholder="Bitiş saati"
                                        value={values.end ? dayjs(values.end, 'HH:mm') : null}
                                        onChange={(time) => setFieldValue('end', time ? time.format('HH:mm') : '')}
                                        format="HH:mm"
                                        className="w-full"
                                        minuteStep={15}
                                        showNow={false}
                                        disabledHours={() => {
                                            // Mesai dışı saatleri devre dışı bırak (08:00 - 18:00 arası)
                                            return [...Array(8).keys(), ...Array(6).keys().map(i => i + 18)];
                                        }}
                                    />
                                    {errors.end && touched.end && (
                                        <div className="text-red-500 text-sm mt-1">{errors.end}</div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1">
                                        ℹ️ Mesai saatleri: 08:00 - 18:00
                                    </div>
                                </div>
                            </div>

                            {/* Notlar */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <FileTextOutlined className="mr-2" />
                                    Notlar (Opsiyonel)
                                </label>
                                <TextArea
                                    placeholder="Randevuyla ilgili notlarınız..."
                                    value={values.notes}
                                    onChange={(e) => setFieldValue('notes', e.target.value)}
                                    rows={4}
                                    maxLength={200}
                                    showCount
                                />
                                {errors.notes && touched.notes && (
                                    <div className="text-red-500 text-sm mt-1">{errors.notes}</div>
                                )}
                            </div>

                            {/* Butonlar */}
                            <div className="flex gap-4 justify-end">
                                <Button
                                    size="large"
                                    onClick={() => navigate('/dashboard/patient')}
                                >
                                    İptal
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    loading={loading || isSubmitting}
                                    icon={<CalendarOutlined />}
                                >
                                    Randevu Oluştur
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default CreateAppointment;
