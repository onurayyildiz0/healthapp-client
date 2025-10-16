import { Card, Row, Col, Typography, Button, Table, Tag, Statistic, Input, Space, Avatar } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    MedicineBoxOutlined,
    SearchOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

const AdminDashboard = () => {
    const [searchText, setSearchText] = useState('');

    // Bugünün tarihi
    const today = new Date().toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Tüm kullanıcılar (API'den gelecek)
    const allUsers = [
        {
            id: 1,
            name: 'Ahmet Yılmaz',
            email: 'ahmet@example.com',
            role: 'patient',
            status: 'active',
            createdAt: '2025-01-15',
            appointmentCount: 12
        },
        {
            id: 2,
            name: 'Dr. Ayşe Demir',
            email: 'ayse@example.com',
            role: 'doctor',
            status: 'active',
            createdAt: '2024-11-20',
            specialty: 'Kardiyoloji'
        },
        {
            id: 3,
            name: 'Mehmet Kaya',
            email: 'mehmet@example.com',
            role: 'patient',
            status: 'active',
            createdAt: '2025-02-10',
            appointmentCount: 5
        },
        {
            id: 4,
            name: 'Dr. Zeynep Öz',
            email: 'zeynep@example.com',
            role: 'doctor',
            status: 'pending',
            createdAt: '2025-10-15',
            specialty: 'Nöroloji'
        },
        {
            id: 5,
            name: 'Ali Veli',
            email: 'ali@example.com',
            role: 'patient',
            status: 'inactive',
            createdAt: '2024-12-01',
            appointmentCount: 0
        }
    ];

    // Doktor onay bekleyenler
    const pendingDoctors = allUsers.filter(user => user.role === 'doctor' && user.status === 'pending');

    // Filtrelenmiş kullanıcılar
    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(searchText.toLowerCase())
    );

    // Kullanıcı tablosu kolonları
    const userColumns = [
        {
            title: 'Kullanıcı',
            key: 'user',
            render: (record) => (
                <div className='flex items-center gap-3'>
                    <Avatar
                        size="default"
                        icon={<UserOutlined />}
                        className={`${record.role === 'doctor' ? 'bg-green-500' :
                            record.role === 'admin' ? 'bg-purple-500' :
                                'bg-blue-500'
                            }`}
                    />
                    <div>
                        <Text strong>{record.name}</Text>
                        <br />
                        <Text type="secondary" className='text-xs'>{record.email}</Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={
                    role === 'patient' ? 'blue' :
                        role === 'doctor' ? 'green' :
                            'purple'
                }>
                    {role === 'patient' ? 'Hasta' :
                        role === 'doctor' ? 'Doktor' :
                            'Admin'}
                </Tag>
            )
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'active' ? 'green' :
                        status === 'pending' ? 'orange' :
                            'red'
                }>
                    {status === 'active' ? 'Aktif' :
                        status === 'pending' ? 'Bekliyor' :
                            'Pasif'}
                </Tag>
            )
        },
        {
            title: 'Branş / Randevu',
            key: 'info',
            render: (record) => (
                <Text type="secondary">
                    {record.role === 'doctor' ? record.specialty : `${record.appointmentCount} Randevu`}
                </Text>
            )
        },
        {
            title: 'Kayıt Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString('tr-TR')
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: () => (
                <Space>
                    <Button size="small" icon={<EyeOutlined />} type="link">
                        Görüntüle
                    </Button>
                    <Button size="small" icon={<EditOutlined />} type="link">
                        Düzenle
                    </Button>
                    <Button size="small" icon={<DeleteOutlined />} type="link" danger>
                        Sil
                    </Button>
                </Space>
            )
        }
    ];

    // Bekleyen doktorlar tablosu
    const pendingDoctorColumns = [
        {
            title: 'Doktor',
            key: 'doctor',
            render: (record) => (
                <div className='flex items-center gap-3'>
                    <Avatar
                        size="large"
                        icon={<MedicineBoxOutlined />}
                        className='bg-green-500'
                    />
                    <div>
                        <Text strong>{record.name}</Text>
                        <br />
                        <Text type="secondary" className='text-xs'>{record.email}</Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Branş',
            dataIndex: 'specialty',
            key: 'specialty'
        },
        {
            title: 'Başvuru Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString('tr-TR')
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: () => (
                <Space>
                    <Button size="small" type="primary" icon={<CheckCircleOutlined />}>
                        Onayla
                    </Button>
                    <Button size="small" danger icon={<DeleteOutlined />}>
                        Reddet
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <>
            {/* Hoş Geldin Bölümü */}
            <div className='mb-6'>
                <Title level={2} className='!mb-2'>
                    Admin Paneli 🎯
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
                            title="Toplam Kullanıcı"
                            value={allUsers.length}
                            prefix={<UserOutlined className='text-blue-500' />}
                            valueStyle={{ color: '#3b82f6' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Doktorlar"
                            value={allUsers.filter(u => u.role === 'doctor').length}
                            prefix={<MedicineBoxOutlined className='text-green-500' />}
                            valueStyle={{ color: '#10b981' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Hastalar"
                            value={allUsers.filter(u => u.role === 'patient').length}
                            prefix={<TeamOutlined className='text-purple-500' />}
                            valueStyle={{ color: '#a855f7' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className='shadow-sm hover:shadow-md transition-all duration-200'>
                        <Statistic
                            title="Onay Bekleyen"
                            value={pendingDoctors.length}
                            prefix={<ClockCircleOutlined className='text-orange-500' />}
                            valueStyle={{ color: '#f97316' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Doktor Onayları */}
            {pendingDoctors.length > 0 && (
                <Card
                    title={
                        <div className='flex items-center gap-2'>
                            <ClockCircleOutlined className='text-orange-500' />
                            <span>Onay Bekleyen Doktorlar</span>
                            <Tag color="orange">{pendingDoctors.length}</Tag>
                        </div>
                    }
                    className='shadow-md mb-12'
                >
                    <Table
                        columns={pendingDoctorColumns}
                        dataSource={pendingDoctors}
                        rowKey="id"
                        pagination={false}
                        scroll={{ x: 800 }}
                    />
                </Card>
            )}

            <br />
            {/* Tüm Kullanıcılar */}
            <Card
                title={
                    <div className='flex items-center gap-2'>
                        <TeamOutlined className='text-blue-500' />
                        <span>Tüm Kullanıcılar</span>
                    </div>
                }
                extra={
                    <div className='w-full sm:w-auto mt-2 sm:mt-0'>
                        <Input
                            placeholder="Kullanıcı ara..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className='w-full sm:w-64'
                            allowClear
                        />
                    </div>
                }
                className='shadow-md mt-10'
            >
                <Table
                    columns={userColumns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Toplam ${total} kullanıcı`,
                        responsive: true
                    }}
                />
            </Card>
        </>
    );
};

export default AdminDashboard;
