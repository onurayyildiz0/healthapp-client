import { Card, Row, Col, Typography, Button, Table, Tag, Statistic, Calendar, Badge, Empty } from 'antd';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    UserOutlined,
    CheckCircleOutlined,
    TeamOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const DoctorDashboard = () => {
    // Bugünün tarihi
    const today = new Date().toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Simülasyon - Bugünkü randevular
    const todayAppointments = [
        {
            id: 1,
            patient: 'Ahmet Yılmaz',
            time: '09:00',
            status: 'completed',
            reason: 'Kontrol Muayenesi'
        },
        {
            id: 2,
            patient: 'Ayşe Demir',
            time: '10:00',
            status: 'upcoming',
            reason: 'İlk Muayene'
        },
        {
            id: 3,
            patient: 'Mehmet Öz',
            time: '11:30',
            status: 'upcoming',
            reason: 'Kontrol'
        },
        {
            id: 4,
            patient: 'Zeynep Kaya',
            time: '14:00',
            status: 'pending',
            reason: 'Konsültasyon'
        }
    ];

    // Yaklaşan randevular
    const upcomingAppointments = [
        {
            id: 5,
            patient: 'Ali Veli',
            date: '17 Ekim 2025',
            time: '09:30',
            status: 'confirmed',
            reason: 'Kontrol'
        },
        {
            id: 6,
            patient: 'Fatma Yıldız',
            date: '17 Ekim 2025',
            time: '11:00',
            status: 'confirmed',
            reason: 'İlk Muayene'
        }
    ];

    // Tablo kolonları
    const columns = [
        {
            title: 'Hasta',
            dataIndex: 'patient',
            key: 'patient',
            render: (text) => (
                <div className='flex items-center gap-2'>
                    <UserOutlined className='text-gray-400' />
                    <Text strong>{text}</Text>
                </div>
            )
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Saat',
            dataIndex: 'time',
            key: 'time',
            render: (text) => (
                <Tag icon={<ClockCircleOutlined />} color="blue">
                    {text}
                </Tag>
            )
        },
        {
            title: 'Sebep',
            dataIndex: 'reason',
            key: 'reason',
            render: (text) => <Text type="secondary">{text}</Text>
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors = {
                    confirmed: 'green',
                    pending: 'orange',
                    completed: 'blue'
                };
                const labels = {
                    confirmed: 'Onaylandı',
                    pending: 'Bekliyor',
                    completed: 'Tamamlandı'
                };
                return <Tag color={colors[status]}>{labels[status]}</Tag>;
            }
        },
        {
            title: 'İşlem',
            key: 'action',
            render: () => (
                <div className='flex gap-2'>
                    <Button size="small" type="link">
                        Detay
                    </Button>
                    <Button size="small" type="link">
                        Muayene
                    </Button>
                </div>
            )
        }
    ];

    const getListData = (value) => {
        // Calendar'daki badge'ler için örnek veri
        let listData = [];
        if (value.date() === 16) {
            listData = [
                { type: 'success', content: '4 Randevu' }
            ];
        } else if (value.date() === 17) {
            listData = [
                { type: 'warning', content: '2 Randevu' }
            ];
        }
        return listData || [];
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className='p-0 m-0 list-none'>
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {/* Hoş Geldin Bölümü */}
            <div className='mb-6'>
                <Title level={2} className='!mb-2'>
                    Hoş Geldiniz Dr! 👨‍⚕️
                </Title>
                <Text type="secondary" className='text-lg'>
                    {today}
                </Text>
            </div>

            {/* İstatistikler */}
            <Row gutter={[16, 16]} className='mb-6'>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Bugünkü Randevular"
                            value={todayAppointments.length}
                            prefix={<CalendarOutlined className='text-blue-500' />}
                            valueStyle={{ color: '#3b82f6' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Tamamlanan"
                            value={todayAppointments.filter(a => a.status === 'completed').length}
                            prefix={<CheckCircleOutlined className='text-green-500' />}
                            valueStyle={{ color: '#10b981' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Bekleyen"
                            value={todayAppointments.filter(a => a.status === 'pending').length}
                            prefix={<ClockCircleOutlined className='text-orange-500' />}
                            valueStyle={{ color: '#f97316' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Toplam Hasta"
                            value={156}
                            prefix={<TeamOutlined className='text-purple-500' />}
                            valueStyle={{ color: '#a855f7' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className='mt-6'>
                {/* Bugünkü Randevular */}
                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <CalendarOutlined className='text-blue-500' />
                                <span>Bugünkü Randevularım</span>
                            </div>
                        }
                        className='shadow-md mb-6'
                    >
                        {todayAppointments.length > 0 ? (
                            <div className='space-y-3'>
                                {todayAppointments.map((appointment) => (
                                    <Card
                                        key={appointment.id}
                                        className={`border-l-4 hover:shadow-md transition-all duration-200 ${appointment.status === 'completed' ? 'border-l-green-500 bg-green-50' :
                                            appointment.status === 'upcoming' ? 'border-l-blue-500' :
                                                'border-l-orange-500'
                                            }`}
                                        size="small"
                                    >
                                        <div className='flex items-center justify-between flex-wrap gap-4'>
                                            <div className='flex items-center gap-4'>
                                                <div className='flex flex-col items-center justify-center bg-white px-3 py-2 rounded-lg shadow-sm'>
                                                    <Text type="secondary" className='text-xs'>Saat</Text>
                                                    <Text strong className='text-lg'>{appointment.time}</Text>
                                                </div>
                                                <div>
                                                    <Title level={5} className='!mb-0'>
                                                        {appointment.patient}
                                                    </Title>
                                                    <Text type="secondary" className='text-sm'>
                                                        {appointment.reason}
                                                    </Text>
                                                    <div className='mt-1'>
                                                        <Tag color={
                                                            appointment.status === 'completed' ? 'green' :
                                                                appointment.status === 'upcoming' ? 'blue' : 'orange'
                                                        }>
                                                            {appointment.status === 'completed' ? 'Tamamlandı' :
                                                                appointment.status === 'upcoming' ? 'Yaklaşan' : 'Bekliyor'}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                {appointment.status !== 'completed' && (
                                                    <Button type="primary" size="small" icon={<MedicineBoxOutlined />}>
                                                        Muayene Başlat
                                                    </Button>
                                                )}
                                                <Button size="small">
                                                    Detay
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Empty
                                description="Bugün randevunuz bulunmamaktadır"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )}
                    </Card>
                    <br />
                    {/* Yaklaşan Randevular */}
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <ClockCircleOutlined className='text-orange-500' />
                                <span>Yaklaşan Randevular</span>
                            </div>
                        }
                        className='shadow-md'
                    >
                        <Table
                            columns={columns}
                            dataSource={upcomingAppointments}
                            rowKey="id"
                            scroll={{ x: 700 }}
                            pagination={{
                                pageSize: 5,
                                responsive: true
                            }}
                        />
                    </Card>
                </Col>

                {/* Takvim */}
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <CalendarOutlined className='text-blue-500' />
                                <span>Randevu Takvimi</span>
                            </div>
                        }
                        className='shadow-md'
                    >
                        <div className='overflow-auto'>
                            <Calendar
                                fullscreen={false}
                                cellRender={dateCellRender}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default DoctorDashboard;
