import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Sistem Informasi Geografis
                    </h1>
                   
                    
                    {status && (
                        <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
                            {status}
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full sm:text-sm bg-[#ecf9ff]"
                            autoComplete="username"
                            isFocused={true}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            className="mt-1 block w-full sm:text-sm bg-[#ecf9ff]"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Remember & Forgot Password */}
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                        </label>
                        
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-primary hover:text-primary-dark"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button */}
                    <PrimaryButton 
                        className="w-full justify-center py-2.5 text-sm font-medium hover:bg-blue-700"
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>

                    {/* Register Link */}
                    <div className="text-center text-sm text-gray-600">
                        Belum punya akun? {' '}
                        <Link 
                            href={route('register')} 
                            className="font-medium text-primary hover:text-primary-dark"
                        >
                            Daftar disini
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
