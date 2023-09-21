import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Form = () => {
    const toast = useToast()
    axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            email: email,
            password: password,
        };
        await login(formData);
        setLoading(false);
    };

    const login = async (formData) => {
        try {
            const result = await axios.post('http://localhost:8001/login', formData);
            console.log(result);
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            toast({
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl width={'400px'} mb={5} id="email" >
                <FormLabel>Email address</FormLabel>
                <Input bg={'whiteAlpha.800'}  type="email" required onChange={(e) => setemail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                    bg={'whiteAlpha.800'}
                        required
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <InputRightElement h={'full'}>
                        <Button
                            colorScheme='black'
                            variant={'ghost'}
                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Stack mt={10} spacing={10}>
                <Button
                    fontFamily={'poppins'}
                    type='submit'
                    bg={'#4F46E5'}
                    color={'white'}
                    _hover={{
                        bg: '#4F66E5',
                    }}
                    isLoading={loading}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>
            </Stack>
        </form>
    );
};

export default Form;
