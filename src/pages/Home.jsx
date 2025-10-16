import { Card, Button, Row, Col, Typography, Avatar, Badge, Statistic } from 'antd';
import {
    HeartOutlined,
    CalendarOutlined,
    UserOutlined,
    MedicineBoxOutlined,
    ClockCircleOutlined,
    StarFilled,
    SafetyCertificateOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import Navbar from '../components/Navbar';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
    // Örnek doktor verileri
    const topDoctors = [
        {
            id: 1,
            name: 'Dr. Ayşe Yılmaz',
            specialty: 'Kardiyoloji',
            rating: 4.9,
            patients: 1200,
            image: '👨‍⚕️'
        },
        {
            id: 2,
            name: 'Dr. Mehmet Kaya',
            specialty: 'Nöroloji',
            rating: 4.8,
            patients: 980,
            image: '👩‍⚕️'
        },
        {
            id: 3,
            name: 'Dr. Zeynep Demir',
            specialty: 'Göz Hastalıkları',
            rating: 4.9,
            patients: 1500,
            image: '👨‍⚕️'
        },
    ];

    // Özellikler
    const features = [
        {
            icon: <CalendarOutlined className='text-4xl text-blue-500' />,
            title: 'Kolay Randevu',
            description: 'Online randevu sistemi ile hızlı ve kolay randevu alın'
        },
        {
            icon: <TeamOutlined className='text-4xl text-green-500' />,
            title: 'Uzman Doktorlar',
            description: 'Alanında uzman doktorlarımızla sağlığınız güvende'
        },
        {
            icon: <SafetyCertificateOutlined className='text-4xl text-purple-500' />,
            title: 'Güvenilir Hizmet',
            description: '7/24 güvenilir sağlık hizmeti sunuyoruz'
        },
        {
            icon: <ClockCircleOutlined className='text-4xl text-orange-500' />,
            title: '24/7 Destek',
            description: 'Her zaman yanınızdayız, kesintisiz destek'
        },
    ];

    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50'>
                {/* Hero Section */}
                <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-500 text-white'>
                    <div className='absolute inset-0 opacity-20'>
                        <div style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            height: '100%',
                            width: '100%'
                        }} />
                    </div>

                    <div className='container mx-auto px-4 py-20 relative z-10'>
                        <Row align='middle' gutter={[48, 48]}>
                            <Col xs={24} md={12}>
                                <div className='space-y-6'>
                                    <Badge.Ribbon text="Yeni" color="green">
                                        <div className='inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
                                            <Text className='text-white font-semibold'>
                                                🎉 Online Randevu Sistemi Açıldı
                                            </Text>
                                        </div>
                                    </Badge.Ribbon>

                                    <Title level={1} className='!text-white !mb-4 !text-5xl'>
                                        Sağlığınız Bizim <br />
                                        <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300'>
                                            Önceliğimiz
                                        </span>
                                    </Title>

                                    <Paragraph className='!text-white/90 text-lg'>
                                        Modern sağlık hizmetleri ile hayatınızı kolaylaştırıyoruz.
                                        Uzman doktorlarımızla online randevu alın, sağlık geçmişinizi takip edin.
                                    </Paragraph>

                                    <div className='flex gap-4 flex-wrap'>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className='bg-white text-blue-600 border-0 hover:bg-gray-100 font-semibold px-8 h-12'
                                            icon={<CalendarOutlined />}
                                        >
                                            Randevu Al
                                        </Button>
                                        <Button
                                            size="large"
                                            className='bg-transparent text-white border-2 border-white hover:bg-white/10 font-semibold px-8 h-12'
                                            icon={<TeamOutlined />}
                                        >
                                            Doktorlarımız
                                        </Button>
                                    </div>
                                </div>
                            </Col>

                            <Col xs={24} md={12}>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Card className='text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm'>
                                        <Statistic
                                            title="Mutlu Hasta"
                                            value={15000}
                                            suffix="+"
                                            valueStyle={{ color: '#10B981' }}
                                        />
                                    </Card>
                                    <Card className='text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm'>
                                        <Statistic
                                            title="Uzman Doktor"
                                            value={250}
                                            suffix="+"
                                            valueStyle={{ color: '#3B82F6' }}
                                        />
                                    </Card>
                                    <Card className='text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm'>
                                        <Statistic
                                            title="Branş"
                                            value={45}
                                            suffix="+"
                                            valueStyle={{ color: '#F59E0B' }}
                                        />
                                    </Card>
                                    <Card className='text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm'>
                                        <Statistic
                                            title="Memnuniyet"
                                            value={98}
                                            suffix="%"
                                            valueStyle={{ color: '#8B5CF6' }}
                                        />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* Features Section */}
                <div className='container mx-auto px-4 py-20'>
                    <div className='text-center mb-16'>
                        <Title level={2} className='!mb-4'>
                            Neden <span className='text-blue-600'>HealthApp</span>?
                        </Title>
                        <Paragraph className='text-gray-600 text-lg max-w-2xl mx-auto'>
                            Modern teknoloji ile sağlık hizmetlerini bir araya getirerek size en iyi deneyimi sunuyoruz
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card
                                    className='text-center h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer'
                                    styles={{ body: { padding: '2rem' } }}
                                >
                                    <div className='mb-4'>
                                        {feature.icon}
                                    </div>
                                    <Title level={4} className='!mb-2'>
                                        {feature.title}
                                    </Title>
                                    <Paragraph className='text-gray-600'>
                                        {feature.description}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Top Doctors Section */}
                <div className='bg-gradient-to-br from-gray-50 to-blue-50 py-20'>
                    <div className='container mx-auto px-4'>
                        <div className='text-center mb-16'>
                            <Title level={2} className='!mb-4'>
                                En İyi <span className='text-blue-600'>Doktorlarımız</span>
                            </Title>
                            <Paragraph className='text-gray-600 text-lg'>
                                Alanında uzman, deneyimli doktorlarımızla tanışın
                            </Paragraph>
                        </div>

                        <Row gutter={[32, 32]}>
                            {topDoctors.map((doctor) => (
                                <Col xs={24} sm={12} lg={8} key={doctor.id}>
                                    <Card
                                        className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
                                        styles={{ body: { padding: '2rem' } }}
                                    >
                                        <div className='text-center'>
                                            <div className='mb-4'>
                                                <Avatar
                                                    size={100}
                                                    className='bg-gradient-to-r from-blue-500 to-green-500'
                                                    style={{ fontSize: '48px' }}
                                                >
                                                    {doctor.image}
                                                </Avatar>
                                            </div>
                                            <Title level={4} className='!mb-1'>
                                                {doctor.name}
                                            </Title>
                                            <Text className='text-gray-600 block mb-3'>
                                                {doctor.specialty}
                                            </Text>
                                            <div className='flex justify-center items-center gap-4 mb-4'>
                                                <div className='flex items-center gap-1'>
                                                    <StarFilled className='text-yellow-500' />
                                                    <Text strong>{doctor.rating}</Text>
                                                </div>
                                                <div className='flex items-center gap-1'>
                                                    <UserOutlined className='text-blue-500' />
                                                    <Text>{doctor.patients}+ hasta</Text>
                                                </div>
                                            </div>
                                            <Button
                                                type="primary"
                                                block
                                                size='large'
                                                className='bg-gradient-to-r from-blue-500 to-green-500 border-0 font-semibold'
                                                icon={<CalendarOutlined />}
                                            >
                                                Randevu Al
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <div className='text-center mt-12'>
                            <Button
                                size="large"
                                className='font-semibold'
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                            >
                                Tüm Doktorları Görüntüle
                            </Button>
                        </div>
                    </div>
                </div>



                {/* Footer */}
                <div className='bg-gray-800 text-white py-12'>
                    <div className='container mx-auto px-4'>
                        <Row gutter={[32, 32]}>
                            <Col xs={24} md={8}>
                                <div className='flex items-center gap-2 mb-4'>
                                    <HeartOutlined className='text-2xl text-green-400' />
                                    <Title level={3} className='!text-white !mb-0'>HealthApp</Title>
                                </div>
                                <Paragraph className='!text-gray-400'>
                                    Sağlığınız bizim önceliğimiz. Modern teknoloji ile
                                    sağlık hizmetlerini bir araya getiriyoruz.
                                </Paragraph>
                            </Col>
                            <Col xs={24} md={8}>
                                <Title level={4} className='!text-white !mb-4'>Hızlı Linkler</Title>
                                <div className='space-y-2'>
                                    <div><a href="#" className='text-gray-400 hover:text-white transition-colors'>Doktorlarımız</a></div>
                                    <div><a href="#" className='text-gray-400 hover:text-white transition-colors'>Branşlar</a></div>
                                    <div><a href="#" className='text-gray-400 hover:text-white transition-colors'>Hakkımızda</a></div>
                                    <div><a href="#" className='text-gray-400 hover:text-white transition-colors'>İletişim</a></div>
                                </div>
                            </Col>
                            <Col xs={24} md={8}>
                                <Title level={4} className='!text-white !mb-4'>İletişim</Title>
                                <div className='space-y-2 text-gray-400'>
                                    <div>📧 info@healthapp.com</div>
                                    <div>📞 +90 (212) 123 45 67</div>
                                    <div>📍 İstanbul, Türkiye</div>
                                </div>
                            </Col>
                        </Row>
                        <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
                            <Paragraph className='!text-gray-400 !mb-0'>
                                &copy; 2025 HealthApp. Tüm hakları saklıdır.
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home