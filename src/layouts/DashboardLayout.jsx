import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Drawer } from 'antd';
import {
    DashboardOutlined,
    CalendarOutlined,
    UserOutlined,
    TeamOutlined,
    SettingOutlined,
    LogoutOutlined,
    HeartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    MedicineBoxOutlined,
    ClockCircleOutlined,
    StarOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import authService from '../api/authService';


const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children, userRole = 'patient' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const dispatch = useDispatch();

    // Simülasyon - Gerçekte AuthContext'ten gelecek
    const user = {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        role: userRole,
        avatar: null
    };

    // Rol bazlı menü items
    const getMenuItems = () => {
        const basePath = `/dashboard/${userRole}`;

        const commonItems = [
            {
                key: basePath,
                icon: <DashboardOutlined />,
                label: 'Dashboard',
                onClick: () => navigate(basePath)
            }
        ];

        if (userRole === 'patient') {
            return [
                ...commonItems,
                {
                    key: `${basePath}/appointments`,
                    icon: <CalendarOutlined />,
                    label: 'Randevularım',
                    onClick: () => navigate(`${basePath}/appointments`)
                },
                {
                    key: `${basePath}/create-appointment`,
                    icon: <ClockCircleOutlined />,
                    label: 'Yeni Randevu',
                    onClick: () => navigate(`${basePath}/create-appointment`)
                },
                {
                    key: '/doctors',
                    icon: <TeamOutlined />,
                    label: 'Doktorlar',
                    onClick: () => navigate('/doctors')
                },
                {
                    key: '/favorites',
                    icon: <StarOutlined />,
                    label: 'Favorilerim',
                    onClick: () => navigate('/favorites')
                },
                {
                    key: '/health-history',
                    icon: <FileTextOutlined />,
                    label: 'Sağlık Geçmişi',
                    onClick: () => navigate('/health-history')
                }
            ];
        }

        if (userRole === 'doctor') {
            return [
                ...commonItems,
                {
                    key: '/my-appointments',
                    icon: <CalendarOutlined />,
                    label: 'Randevularım',
                    onClick: () => navigate('/my-appointments')
                },
                {
                    key: '/schedule',
                    icon: <ClockCircleOutlined />,
                    label: 'Çalışma Saatleri',
                    onClick: () => navigate('/schedule')
                },
                {
                    key: '/patients',
                    icon: <TeamOutlined />,
                    label: 'Hastalarım',
                    onClick: () => navigate('/patients')
                },
                {
                    key: '/profile',
                    icon: <MedicineBoxOutlined />,
                    label: 'Doktor Profilim',
                    onClick: () => navigate('/profile')
                }
            ];
        }

        if (userRole === 'admin') {
            return [
                ...commonItems,
                {
                    key: '/users',
                    icon: <TeamOutlined />,
                    label: 'Kullanıcılar',
                    onClick: () => navigate('/users')
                },
                {
                    key: '/pending-doctors',
                    icon: <MedicineBoxOutlined />,
                    label: 'Doktor Onayları',
                    onClick: () => navigate('/pending-doctors')
                },
                {
                    key: '/all-appointments',
                    icon: <CalendarOutlined />,
                    label: 'Tüm Randevular',
                    onClick: () => navigate('/all-appointments')
                },
                {
                    key: '/system-settings',
                    icon: <SettingOutlined />,
                    label: 'Sistem Ayarları',
                    onClick: () => navigate('/system-settings')
                }
            ];
        }

        return commonItems;
    };

    // User dropdown menu
    const userMenuItems = [
        {
            key: 'profile',
            label: 'Profilim',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile')
        },
        {
            key: 'settings',
            label: 'Ayarlar',
            icon: <SettingOutlined />,
            onClick: () => navigate('/settings')
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: 'Çıkış Yap',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: async () => {
                try {
                    // 1. Backend'e logout isteği at (token'ı blacklist'e ekle)
                    await authService.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                    // Hata olsa bile devam et
                } finally {
                    // 2. Redux'tan user ve token'ı temizle
                    dispatch(logout());

                    // 3. Login sayfasına yönlendir
                    navigate('/login');
                }
            }
        }
    ];

    const getRoleLabel = () => {
        switch (userRole) {
            case 'patient': return 'Hasta';
            case 'doctor': return 'Doktor';
            case 'admin': return 'Yönetici';
            default: return 'Kullanıcı';
        }
    };

    const getRoleColor = () => {
        switch (userRole) {
            case 'patient': return 'from-blue-500 to-cyan-500';
            case 'doctor': return 'from-green-500 to-teal-500';
            case 'admin': return 'from-purple-500 to-pink-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <Layout className='min-h-screen'>
            {/* Mobile Drawer */}
            <Drawer
                placement="left"
                onClose={() => setMobileDrawerOpen(false)}
                open={mobileDrawerOpen}
                className='lg:hidden'
                width={250}
                styles={{ body: { padding: 0 } }}
            >
                {/* Logo */}
                <div className='h-16 flex items-center justify-center border-b border-gray-200'>
                    <div className='flex items-center gap-2'>
                        <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center shadow-lg`}>
                            <HeartOutlined className='text-white text-xl' />
                        </div>
                        <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600'>
                            HealthApp
                        </span>
                    </div>
                </div>

                {/* Menu */}
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={getMenuItems()}
                    className='border-0 mt-4'
                />
            </Drawer>

            {/* Desktop Sidebar */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className='!bg-white shadow-lg hidden lg:block'
                width={250}
                breakpoint="lg"
                collapsedWidth={80}
            >
                {/* Logo */}
                <div className='h-16 flex items-center justify-center border-b border-gray-200'>
                    {!collapsed ? (
                        <div className='flex items-center gap-2'>
                            <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center shadow-lg`}>
                                <HeartOutlined className='text-white text-xl' />
                            </div>
                            <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600'>
                                HealthApp
                            </span>
                        </div>
                    ) : (
                        <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center shadow-lg`}>
                            <HeartOutlined className='text-white text-xl' />
                        </div>
                    )}
                </div>

                {/* Menu */}
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={getMenuItems()}
                    className='border-0 mt-4'
                />
            </Sider>

            {/* Main Layout */}
            <Layout>
                {/* Header */}
                <Header className='!bg-white shadow-sm !px-4 lg:!px-6 flex items-center justify-between'>
                    {/* Left Side - Toggle and Mobile Menu Button */}
                    <div className='flex items-center gap-2'>
                        {/* Mobile Menu Button */}
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setMobileDrawerOpen(true)}
                            className='text-lg lg:hidden'
                        />

                        {/* Desktop Toggle Button */}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className='text-lg hidden lg:block'
                        />
                    </div>

                    {/* Right Side */}
                    <div className='flex items-center gap-4'>
                        {/* Notifications */}
                        <Badge count={5} size="small">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<BellOutlined className='text-xl' />}
                                className='hover:bg-gray-100'
                            />
                        </Badge>

                        {/* User Dropdown */}
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                            arrow
                        >
                            <div className='flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200'>
                                <Avatar
                                    size="default"
                                    icon={<UserOutlined />}
                                    className={`bg-gradient-to-r ${getRoleColor()}`}
                                />
                                <div className='hidden md:block text-left'>
                                    <div className='text-sm font-semibold text-gray-800'>
                                        {user.name}
                                    </div>
                                    <div className='text-xs text-gray-500'>
                                        {getRoleLabel()}
                                    </div>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </Header>

                {/* Content */}
                <Content className='m-4 lg:m-6 p-4 lg:p-6 bg-gray-50 rounded-lg min-h-[calc(100vh-88px)]'>
                    {children || <Outlet />}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
