import { Card, Row, Col, Typography, Button, Table, Tag, Avatar, Statistic, Progress, Empty } from 'antd';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    UserOutlined,
    PlusOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    StarFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const PatientDashboard = () => {
    const navigate = useNavigate();

    // Bugünün tarihi
    const today = new Date().toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Simülasyon - Bugünkü randevular (API'den gelecek)
    const todayAppointments = [
        {
            id: 1,
            doctor: 'Dr. Ayşe Yılmaz',
            specialty: 'Kardiyoloji',
            time: '10:00',
            status: 'upcoming',
            avatar: '👩‍⚕️'
        },
        {
            id: 2,
            doctor: 'Dr. Mehmet Kaya',
            specialty: 'Nöroloji',
            time: '14:30',
            status: 'upcoming',
            avatar: '👨‍⚕️'
        }
    ];

    // Yaklaşan randevular
    const upcomingAppointments = [
        {
            id: 3,
            doctor: 'Dr. Zeynep Demir',
            specialty: 'Göz Hastalıkları',
            date: '18 Ekim 2025',
            time: '11:00',
            status: 'confirmed'
        },
        {
            id: 4,
            doctor: 'Dr. Ali Öz',
            specialty: 'Dermatoloji',
            date: '20 Ekim 2025',
            time: '15:00',
            status: 'confirmed'
        }
    ];

    // Favori doktorlar
    const favoriteDoctors = [
        { name: 'Dr. Ayşe Yılmaz', specialty: 'Kardiyoloji', rating: 4.9, avatar: '👩‍⚕️' },
        { name: 'Dr. Mehmet Kaya', specialty: 'Nöroloji', rating: 4.8, avatar: '👨‍⚕️' },
        { name: 'Dr. Zeynep Demir', specialty: 'Göz Hastalıkları', rating: 4.9, avatar: '👨‍⚕️' }
    ];

    // Tablo kolonları
    const columns = [
        {
            title: 'Doktor',
            dataIndex: 'doctor',
            key: 'doctor',
            render: (text) => <Text strong>{text}</Text>
        },
        {
            title: 'Branş',
            dataIndex: 'specialty',
            key: 'specialty',
            render: (text) => <Text type="secondary">{text}</Text>
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
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'confirmed' ? 'green' : 'orange'}>
                    {status === 'confirmed' ? 'Onaylandı' : 'Bekliyor'}
                </Tag>
            )
        },
        {
            title: 'İşlem',
            key: 'action',
            render: () => (
                <Button size="small" type="link">
                    Detay
                </Button>
            )
        }
    ];

    return (
        <>
            {/* Hoş Geldin Bölümü */}
            <div className='mb-6'>
                <Title level={2} className='!mb-2'>
                    Hoş Geldiniz! 👋
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
                            title="Yaklaşan Randevular"
                            value={upcomingAppointments.length}
                            prefix={<ClockCircleOutlined className='text-orange-500' />}
                            valueStyle={{ color: '#f97316' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Tamamlanan"
                            value={12}
                            prefix={<CheckCircleOutlined className='text-green-500' />}
                            valueStyle={{ color: '#10b981' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Favori Doktorlar"
                            value={favoriteDoctors.length}
                            prefix={<HeartOutlined className='text-red-500' />}
                            valueStyle={{ color: '#ef4444' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                {/* Bugünkü Randevular */}
                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <CalendarOutlined className='text-blue-500' />
                                <span>Bugünkü Randevularım</span>
                            </div>
                        }
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className='bg-gradient-to-r from-blue-500 to-green-500 border-0'
                                onClick={() => navigate('/appointments/create')}
                            >
                                Yeni Randevu
                            </Button>
                        }
                        className='shadow-md'
                    >
                        {todayAppointments.length > 0 ? (
                            <div className='space-y-4'>
                                {todayAppointments.map((appointment) => (
                                    <Card
                                        key={appointment.id}
                                        className='border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200'
                                    >
                                        <div className='flex items-center justify-between flex-wrap gap-4'>
                                            <div className='flex items-center gap-4'>
                                                <div className='text-5xl'>
                                                    {appointment.avatar}
                                                </div>
                                                <div>
                                                    <Title level={5} className='!mb-1'>
                                                        {appointment.doctor}
                                                    </Title>
                                                    <Text type="secondary">{appointment.specialty}</Text>
                                                    <div className='mt-2'>
                                                        <Tag icon={<ClockCircleOutlined />} color="blue">
                                                            {appointment.time}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                <Button type="primary" ghost>
                                                    Detay
                                                </Button>
                                                <Button danger ghost>
                                                    İptal
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
                            >
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => navigate('/appointments/create')}
                                >
                                    Randevu Oluştur
                                </Button>
                            </Empty>
                        )}
                    </Card>
                    <br />
                    {/* Yaklaşan Randevular Tablosu */}
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <ClockCircleOutlined className='text-orange-500' />
                                <span>Yaklaşan Randevular</span>
                            </div>
                        }
                        className='shadow-md mt-8'
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

                {/* Sağ Sidebar */}
                <Col xs={24} lg={8}>
                    {/* Sağlık Durumu */}
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <HeartOutlined className='text-red-500' />
                                <span>Sağlık Durumu</span>
                            </div>
                        }
                        className='shadow-md mb-6'
                    >
                        <div className='space-y-4'>
                            <div>
                                <div className='flex justify-between mb-2'>
                                    <Text>Genel Sağlık</Text>
                                    <Text strong>85%</Text>
                                </div>
                                <Progress percent={85} strokeColor="#10b981" />
                            </div>
                            <div>
                                <div className='flex justify-between mb-2'>
                                    <Text>Randevu Takibi</Text>
                                    <Text strong>92%</Text>
                                </div>
                                <Progress percent={92} strokeColor="#3b82f6" />
                            </div>
                        </div>
                    </Card>
                    <br />
                    {/* Favori Doktorlar */}
                    <Card
                        title={
                            <div className='flex items-center gap-2'>
                                <StarFilled className='text-yellow-500' />
                                <span>Favori Doktorlarım</span>
                            </div>
                        }
                        className='shadow-md'
                    >
                        <div className='space-y-3'>
                            {favoriteDoctors.map((doctor, index) => (
                                <div
                                    key={index}
                                    className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200'
                                >
                                    <div className='text-3xl'>
                                        {doctor.avatar}
                                    </div>
                                    <div className='flex-1'>
                                        <Text strong className='block'>
                                            {doctor.name}
                                        </Text>
                                        <Text type="secondary" className='text-xs'>
                                            {doctor.specialty}
                                        </Text>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <StarFilled className='text-yellow-500 text-xs' />
                                        <Text strong className='text-xs'>
                                            {doctor.rating}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PatientDashboard;
