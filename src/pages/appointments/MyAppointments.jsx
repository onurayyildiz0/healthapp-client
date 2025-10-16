import { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Space, message, Modal, Empty } from 'antd';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    EyeOutlined,
    CloseCircleOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as appointmentService from '../../api/appointmentService';
import axiosInstance from '../../api/axios';
import {
    fetchAppointmentsStart,
    fetchAppointmentsSuccess,
    fetchAppointmentsFailure,
    selectAllAppointments,
    selectAppointmentLoading
} from '../../store/slices/appointmentSlice';

const MyAppointments = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appointments = useSelector(selectAllAppointments);
    const loading = useSelector(selectAppointmentLoading);

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    // Randevuları çek
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            dispatch(fetchAppointmentsStart());

            // Patient için kendi randevularını çek
            const response = await axiosInstance.get('/appointments/patient');

            dispatch(fetchAppointmentsSuccess(response.data.data || response.data));
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Randevular yüklenirken hata oluştu';
            dispatch(fetchAppointmentsFailure(errorMessage));
            message.error(errorMessage);
        }
    };

    // Randevu iptal et
    const handleCancelAppointment = async (appointmentId) => {
        Modal.confirm({
            title: 'Randevuyu İptal Et',
            content: 'Bu randevuyu iptal etmek istediğinizden emin misiniz?',
            okText: 'Evet, İptal Et',
            okType: 'danger',
            cancelText: 'Vazgeç',
            onOk: async () => {
                try {
                    setCancelling(true);
                    await appointmentService.cancelAppointment(appointmentId);
                    message.success('Randevu başarıyla iptal edildi');
                    fetchAppointments(); // Listeyi yenile
                } catch (err) {
                    message.error(err.response?.data?.message || 'Randevu iptal edilemedi');
                } finally {
                    setCancelling(false);
                }
            }
        });
    };

    // Randevu detayını göster
    const showAppointmentDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalVisible(true);
    };

    // Durum renkleri
    const getStatusColor = (status) => {
        const statusColors = {
            pending: 'orange',
            confirmed: 'green',
            cancelled: 'red',
            completed: 'blue'
        };
        return statusColors[status] || 'default';
    };

    // Durum metinleri
    const getStatusText = (status) => {
        const statusTexts = {
            pending: 'Beklemede',
            confirmed: 'Onaylandı',
            cancelled: 'İptal Edildi',
            completed: 'Tamamlandı'
        };
        return statusTexts[status] || status;
    };

    // Tablo kolonları
    const columns = [
        {
            title: 'Doktor',
            dataIndex: 'doctor',
            key: 'doctor',
            render: (doctor) => (
                <div>
                    <div className="font-medium">{doctor?.name || 'Bilinmiyor'}</div>
                    <div className="text-sm text-gray-500">{doctor?.specialty || '-'}</div>
                </div>
            )
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date',
            render: (date) => (
                <div className="flex items-center gap-2">
                    <CalendarOutlined className="text-blue-500" />
                    {dayjs(date).format('DD/MM/YYYY')}
                </div>
            ),
            sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
        },
        {
            title: 'Saat',
            key: 'time',
            render: (record) => (
                <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-green-500" />
                    {record.start} - {record.end}
                </div>
            )
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {getStatusText(status)}
                </Tag>
            ),
            filters: [
                { text: 'Beklemede', value: 'pending' },
                { text: 'Onaylandı', value: 'confirmed' },
                { text: 'İptal Edildi', value: 'cancelled' },
                { text: 'Tamamlandı', value: 'completed' }
            ],
            onFilter: (value, record) => record.status === value
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: (record) => (
                <Space>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => showAppointmentDetails(record)}
                    >
                        Detay
                    </Button>
                    {(record.status === 'pending' || record.status === 'confirmed') && (
                        <Button
                            size="small"
                            danger
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleCancelAppointment(record._id)}
                            loading={cancelling}
                        >
                            İptal
                        </Button>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div>
            <Card
                title={
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CalendarOutlined className="text-blue-500" />
                            <span>Randevularım</span>
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/dashboard/patient/create-appointment')}
                        >
                            Yeni Randevu
                        </Button>
                    </div>
                }
                className="shadow-lg"
            >
                <Table
                    columns={columns}
                    dataSource={appointments}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Toplam ${total} randevu`,
                        showSizeChanger: true
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                description="Henüz randevunuz yok"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => navigate('/dashboard/patient/create-appointment')}
                                >
                                    İlk Randevunuzu Oluşturun
                                </Button>
                            </Empty>
                        )
                    }}
                />
            </Card>

            {/* Detay Modal */}
            <Modal
                title="Randevu Detayları"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Kapat
                    </Button>
                ]}
            >
                {selectedAppointment && (
                    <div className="space-y-4">
                        <div>
                            <span className="font-medium">Doktor:</span> {selectedAppointment.doctor?.name}
                        </div>
                        <div>
                            <span className="font-medium">Branş:</span> {selectedAppointment.doctor?.specialty}
                        </div>
                        <div>
                            <span className="font-medium">Tarih:</span> {dayjs(selectedAppointment.date).format('DD/MM/YYYY')}
                        </div>
                        <div>
                            <span className="font-medium">Saat:</span> {selectedAppointment.start} - {selectedAppointment.end}
                        </div>
                        <div>
                            <span className="font-medium">Durum:</span>{' '}
                            <Tag color={getStatusColor(selectedAppointment.status)}>
                                {getStatusText(selectedAppointment.status)}
                            </Tag>
                        </div>
                        {selectedAppointment.notes && (
                            <div>
                                <span className="font-medium">Notlar:</span>
                                <p className="mt-1 text-gray-600">{selectedAppointment.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyAppointments;
