import { Formik } from 'formik';
import { Form, Input, Button, Card, message, Radio, Alert, Space } from 'antd';
import { RegisterSchema } from '../validations/AuthValidations';
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    HeartOutlined,
    MedicineBoxOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../api/authService';
import { registerStart, registerFailure, selectAuthLoading } from '../store/slices/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);

    const handleRegister = async (values, { setSubmitting }) => {
        dispatch(registerStart());

        try {
            const response = await authService.register({
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role
            });

            console.log("Register Response:", response);

            // Backend token dönmüyor, sadece user dönüyor (email doğrulaması gerekli)
            // Redux'a sadece başarılı olduğunu söyle (ama login yapma)

            // Başarı mesajı göster
            message.success({
                content: 'Kayıt başarılı! E-posta adresinize doğrulama linki gönderildi. Lütfen e-postanızı kontrol edin.',
                duration: 6
            });

            // Herkesi login sayfasına yönlendir (email doğrulaması gerekli)
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error("Register Error:", error);
            dispatch(registerFailure(error.message || 'Kayıt başarısız'));
            message.error(error.message || 'Kayıt sırasında bir hata oluştu!');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    height: '100%',
                    width: '100%'
                }} />
            </div>

            <div className='w-full max-w-xl relative z-10'>
                {/* Logo/Brand Section */}
                <div className='text-center mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 shadow-lg'>
                        <HeartOutlined className='text-white text-2xl' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>HealthApp</h1>
                    <p className='text-gray-600'>Sağlığınız bizim önceliğimiz</p>
                </div>

                {/* Register Card */}
                <Card
                    className='shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90'
                    styles={{ body: { padding: '2rem' } }}
                >
                    <div className='text-center mb-6'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Hesap Oluştur</h2>
                        <p className='text-gray-600'>Ücretsiz hesap oluşturun ve hemen başlayın</p>
                    </div>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            role: 'patient'
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleRegister}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                            <Form onFinish={handleSubmit} layout="vertical">
                                {/* Name */}
                                <Form.Item
                                    label={<span className='font-semibold text-gray-700'>Ad Soyad</span>}
                                    validateStatus={touched.name && errors.name ? 'error' : ''}
                                    help={touched.name && errors.name ? errors.name : null}
                                    className='mb-4'
                                >
                                    <Input
                                        name='name'
                                        prefix={<UserOutlined className='text-gray-400' />}
                                        placeholder='Ad ve soyadınızı girin'
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size='large'
                                        className='rounded-lg'
                                    />
                                </Form.Item>

                                {/* Email */}
                                <Form.Item
                                    label={<span className='font-semibold text-gray-700'>E-posta</span>}
                                    validateStatus={touched.email && errors.email ? 'error' : ''}
                                    help={touched.email && errors.email ? errors.email : null}
                                    className='mb-4'
                                >
                                    <Input
                                        name='email'
                                        prefix={<MailOutlined className='text-gray-400' />}
                                        placeholder='E-posta adresiniz'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size='large'
                                        className='rounded-lg'
                                    />
                                </Form.Item>

                                {/* Role Selection */}
                                <Form.Item
                                    label={<span className='font-semibold text-gray-700'>Hesap Türü</span>}
                                    validateStatus={touched.role && errors.role ? 'error' : ''}
                                    help={touched.role && errors.role ? errors.role : null}
                                    className='mb-4'
                                >
                                    <Radio.Group
                                        name='role'
                                        value={values.role}
                                        onChange={(e) => {
                                            setFieldValue('role', e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        className='w-full'
                                    >
                                        <Space direction="vertical" className='w-full' size="middle">
                                            <Card
                                                className={`cursor-pointer transition-all duration-200 ${values.role === 'patient'
                                                    ? 'border-2 border-blue-500 bg-blue-50'
                                                    : 'border border-gray-200 hover:border-blue-300'
                                                    }`}
                                                styles={{ body: { padding: '1rem' } }}
                                            >
                                                <Radio value="patient" className='w-full'>
                                                    <div className='flex items-center gap-3'>
                                                        <TeamOutlined className='text-2xl text-blue-500' />
                                                        <div>
                                                            <div className='font-semibold text-gray-800'>Hasta</div>
                                                            <div className='text-sm text-gray-600'>Randevu almak ve sağlık hizmetlerinden faydalanmak için</div>
                                                        </div>
                                                    </div>
                                                </Radio>
                                            </Card>

                                            <Card
                                                className={`cursor-pointer transition-all duration-200 ${values.role === 'doctor'
                                                    ? 'border-2 border-green-500 bg-green-50'
                                                    : 'border border-gray-200 hover:border-green-300'
                                                    }`}
                                                styles={{ body: { padding: '1rem' } }}
                                            >
                                                <Radio value="doctor" className='w-full'>
                                                    <div className='flex items-center gap-3'>
                                                        <MedicineBoxOutlined className='text-2xl text-green-500' />
                                                        <div>
                                                            <div className='font-semibold text-gray-800'>Doktor</div>
                                                            <div className='text-sm text-gray-600'>Hastaları kabul etmek ve muayene yapmak için</div>
                                                        </div>
                                                    </div>
                                                </Radio>
                                            </Card>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                {/* Doctor Alert */}
                                {values.role === 'doctor' && (
                                    <Alert
                                        message="Doktor Hesabı"
                                        description="Doktor hesabınız oluşturulduktan sonra, admin onayı beklemeniz gerekecektir. Onaylandıktan sonra giriş yapabilir ve doktor bilgilerinizi ekleyebilirsiniz."
                                        type="info"
                                        showIcon
                                        className='mb-4 rounded-lg'
                                    />
                                )}

                                {/* Password */}
                                <Form.Item
                                    label={<span className='font-semibold text-gray-700'>Şifre</span>}
                                    validateStatus={touched.password && errors.password ? 'error' : ''}
                                    help={touched.password && errors.password ? errors.password : null}
                                    className='mb-4'
                                >
                                    <Input.Password
                                        name="password"
                                        prefix={<LockOutlined className='text-gray-400' />}
                                        placeholder="Şifreniz (en az 6 karakter)"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size='large'
                                        className='rounded-lg'
                                    />
                                </Form.Item>

                                {/* Confirm Password */}
                                <Form.Item
                                    label={<span className='font-semibold text-gray-700'>Şifre Tekrarı</span>}
                                    validateStatus={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
                                    help={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
                                    className='mb-6'
                                >
                                    <Input.Password
                                        name="confirmPassword"
                                        prefix={<LockOutlined className='text-gray-400' />}
                                        placeholder="Şifrenizi tekrar girin"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size='large'
                                        className='rounded-lg'
                                    />
                                </Form.Item>

                                {/* Submit Button */}
                                <Form.Item className='mb-4'>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size='large'
                                        className={`w-full h-12 border-0 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 ${values.role === 'doctor'
                                            ? 'bg-gradient-to-r from-green-500 to-teal-500'
                                            : 'bg-gradient-to-r from-blue-500 to-green-500'
                                            }`}
                                        loading={isSubmitting || loading}
                                    >
                                        {isSubmitting ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
                                    </Button>
                                </Form.Item>

                                {/* Login Link */}
                                <div className='text-center'>
                                    <p className='text-gray-600 text-sm'>
                                        Zaten hesabınız var mı?{' '}
                                        <a
                                            href="/login"
                                            className='text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/login');
                                            }}
                                        >
                                            Giriş Yap
                                        </a>
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card>

                {/* Footer */}
                <div className='text-center mt-8 text-gray-500 text-sm'>
                    <p>&copy; 2025 HealthApp. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </div>
    )
}

export default Register