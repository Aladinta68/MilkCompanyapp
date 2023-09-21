import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Add = () => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const toast = useToast();

    axios.defaults.withCredentials = true;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password
        };
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8001/register', formData);
            console.log(response);
            setIsModalOpen(false);
            toast({
                description: 'User successfully added',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        } catch (err) {
            console.error(err);
            toast({
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex direction={isLargerThan768 ? 'row' : 'column'} width={'100%'} h={'100%'} justifyContent={'flex-start'} alignItems={'center'} borderBottom={'1px solid rgb(255 255 255 / 0.05) '} >
            <Flex height={'100%'} width={isLargerThan768 ? '35%' : '100%'} p={10} direction={'column'} >
                <Heading color={'white'} fontFamily={'poppins'} fontSize={'17px'} fontWeight={'500'}>
                    Add  users
                </Heading>
                <Text fontSize={'14px'} m={0} color={'#9CA3AF'} >
                    To expand your app access, you can add a new user by clicking the following button. This feature allows you to create additional profiles.                    </Text>
            </Flex>
            <Flex height={'100%'} width={isLargerThan768 ? '65%' : '100%'} direction={'column'} p={10} >
                <Flex width={'100%'}>
                    <Button fontWeight={'400'} onClick={openModal} colorScheme='green'>
                        <AiOutlineUserAdd /><span style={{ marginRight: '8px' }} />Add
                    </Button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <form onSubmit={handleAdd}>
                            <ModalOverlay />
                            <ModalContent fontFamily={'poppins'}>
                                <ModalHeader>Add new user</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>First name</FormLabel>
                                        <Input type='text' required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={5}>
                                        <FormLabel>Last name</FormLabel>
                                        <Input type='text' required value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={5}>
                                        <FormLabel>Email </FormLabel>
                                        <Input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormControl >
                                    <FormControl mt={5} id="password">
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input
                                                pattern=".{8,}"
                                                title="Must contain at least 8 or more characters"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormHelperText>Password must be at least 8 characters long.</FormHelperText>
                                    </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type='submit'
                                        colorScheme="green" mr={3} isLoading={isLoading}
                                    >
                                        {isLoading ? 'Adding...' : 'Add'}
                                    </Button>
                                    <Button variant="ghost" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </form>
                    </Modal>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Add;
