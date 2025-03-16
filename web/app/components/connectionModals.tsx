import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'next-client-cookies';
import API, { RegisterPayload, ValidationError } from '@shared/Api';
import { CustomButton } from '@/app/components/buttons/classicButtons';

const Input = ({
    name,
    placeholder,
    value,
    onChange,
    error,
}: {
    name: string;
    placeholder: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    error: string | null;
}) => (
    <div className={'w-[350px] h-[70px]'}>
        {<p className="w-full text-center h-[20px] text-red-500">{error}</p>}
        <input
            type={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full z-999 text-center text-xl h-[50px] p-4 rounded-full bg-transparent border-2 border-[rgba(78,78,97,0.4)] text-white"
            data-testid={`${name}-input`}
        />
    </div>
);

const LoginModal = ({ shown }: { shown: boolean }): JSX.Element => {
    const display = shown ? 'flex' : 'hidden';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = useCookies();
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [errors, setErrors] = useState<{ email: string | null; password: string | null }>({
        email: null,
        password: null,
    });

    const handleInputChange = (emailValue: string, passwordValue: string) => {
        setFormData({
            email: emailValue,
            username: emailValue,
            password: passwordValue,
        });
    };

    const handleSignIn = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const response = await api.auth.login(formData.email, formData.password);
        const { status, body, error } = response;
        if (status === 200) {
            cookies.set('accessToken', body.token);
            window.location.href = '/dashboard';
        } else {
            const validationErrors = error as ValidationError[];
            setErrors({
                email: validationErrors.find((err) => err.path[0] === 'email')?.message || null,
                password: validationErrors.find((err) => err.path[0] === 'password')?.message || null,
            });
        }
    };

    return (
        <div className={`w-full h-full top-0 left-0 ${display} items-end justify-center absolute`}>
            <div className={`w-1/4 h-1/3 flex flex-row items-center justify-center mb-40`}>
                <div
                    className={`w-full z-50 h-full flex flex-col items-center justify-center`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleInputChange(email, password);
                            handleSignIn(e);
                        }
                    }}
                >
                    <Input name="text" placeholder="Email" value={email} onChange={setEmail} error={errors.email} />
                    <Input name={'password'} placeholder={'Password'} value={password} onChange={setPassword} error={errors.password} />
                    <CustomButton
                        title="Sign In"
                        onPress={() => {
                            handleInputChange(email, password);
                            handleSignIn();
                        }}
                        color="bg-black"
                        data-testid="sign-in-button"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} style={{ color: '#ffffff' }} />
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

const RegisterModal = ({ shown }: { shown: boolean }): JSX.Element => {
    const api = new API(process.env.NEXT_PUBLIC_API_URL!);

    const display = shown ? 'flex' : 'hidden';
    const [formData, setFormData] = useState<RegisterPayload>({ username: '', password: '', email: '' });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{
        email: string | null;
        username: string | null;
        password: string | null;
    }>({ email: null, username: null, password: null });
    const cookies = useCookies();

    const handleInputChange = (payload: RegisterPayload) => {
        setFormData(payload);
    };

    const handleSignUp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const { body, error, status } = await api.auth.register(formData);
        if (status === 200) {
            cookies.set('accessToken', body.token);
            window.location.href = '/dashboard';
        }
        if (status === 400) {
            const validationErrors = error as ValidationError[];
            setErrors({
                email: validationErrors.find((err) => err.path[0] === 'email')?.message || null,
                username: validationErrors.find((err) => err.path[0] === 'username')?.message || null,
                password: validationErrors.find((err) => err.path[0] === 'password')?.message || null,
            });
        }
    };

    return (
        <div className={`w-full h-full top-0 left-0 ${display} items-end justify-center absolute`}>
            <div className={`w-1/4 h-1/3 flex flex-row items-center justify-center mb-40`}>
                <form
                    className={`w-full z-50 h-full flex flex-col items-center justify-center`}
                    onSubmit={handleSignUp}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleInputChange({ username, password, email });
                            handleSignUp(e);
                        }
                    }}
                >
                    <Input name="email" placeholder="Email" value={email} onChange={setEmail} error={errors.email} />
                    <Input name="username" placeholder="Username" value={username} onChange={setUsername} error={errors.username} />
                    <Input name="password" placeholder="Password" value={password} onChange={setPassword} error={errors.password} />
                    <CustomButton
                        title="Sign Up"
                        onPress={() => {
                            handleInputChange({ username, password, email });
                            handleSignUp();
                        }}
                        color="bg-black"
                        data-testid="sign-up-button"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} style={{ color: '#ffffff' }} />
                    </CustomButton>
                </form>
            </div>
        </div>
    );
};

export { LoginModal, RegisterModal };
