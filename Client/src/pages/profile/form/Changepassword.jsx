import React, { useState, useContext } from 'react';
import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, useMediaQuery } from '@chakra-ui/react';
import { datacontext } from '../../../contextapi/Mycontext';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Changepassword = () => {
    axios.defaults.withCredentials = true;
    const toast = useToast();
    const contextdatapage = useContext(datacontext);
    const UserID = contextdatapage.UserID;
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    const [showoldPassword, setShowoldPassword] = useState(false);
    const [shownewPassword, setShownewPassword] = useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = useState(false);

    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [showErrorMessage, setShowErrorMessage] = useState(false); 

    const handleupdate = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordsMatch(false);
            setShowErrorMessage(true); 
            setTimeout(() => {
                setShowErrorMessage(false); 
            }, 2000); 
            return;
        }

        const formData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        updatepassword(formData);
    };

    const updatepassword = async (formdata) => {
        await axios
            .put(`http://localhost:8001/profile/${UserID}`, formdata)
            .then((result) => {
                console.log(result);
                toast({
                    description: 'Password successfully updated ',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                });
            })
            .catch((err) => {
                console.log(err);
                toast({
                    description: err.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            });
    };

    return (
        <Flex
            direction={isLargerThan768 ? 'row' : 'column'}
            width={'100%'}
            h={'100%'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            borderBottom={'1px solid rgb(255 255 255 / 0.05) '}
        >
            <Flex height={'100%'} width={isLargerThan768 ? '35%' : '100%'} p={10} direction={'column'}>
                <Heading color={'white'} fontFamily={'poppins'} fontSize={'17px'} fontWeight={'500'}>
                    Change password
                </Heading>
                <Text fontSize={'14px'} m={0} color={'#9CA3AF'}>
                    Update your password associated with your account.
                </Text>
            </Flex>
            <Flex height={'100%'} width={isLargerThan768 ? '65%' : '100%'} direction={'column'} p={10}>
                <Flex width={'100%'}>
                    <form style={{ width: '90%' }} onSubmit={handleupdate}>
                        <FormControl mt={5} id="oldpassword">
                            <FormLabel color={'white'} fontSize={'14px'} fontWeight={'400'}>
                                Old password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    bg={'#FFFFFF1A'}
                                    color={'white'}
                                    fontSize={'14px'}
                                    border={'1px solid rgb(255 255 255 / 0.2)'}
                                    type={showoldPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setoldPassword(e.target.value)}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        colorScheme="black"
                                        color={'white'}
                                        variant={'ghost'}
                                        onClick={() => setShowoldPassword((showoldPassword) => !showoldPassword)}
                                    >
                                        {showoldPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl mt={5} id="newpassword">
                            <FormLabel color={'white'} fontSize={'14px'} fontWeight={'400'}>
                                New password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    bg={'#FFFFFF1A'}
                                    color={'white'}
                                    fontSize={'14px'}
                                    border={'1px solid rgb(255 255 255 / 0.2)'}
                                    type={shownewPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setnewPassword(e.target.value)}
                                    pattern=".{8,}"
                                    title="Must contain at least 8 or more characters"
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        colorScheme="black"
                                        color={'white'}
                                        variant={'ghost'}
                                        onClick={() => setShownewPassword((shownewPassword) => !shownewPassword)}
                                    >
                                        {shownewPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl mt={5} id="confirmpassword">
                            <FormLabel color={'white'} fontSize={'14px'} fontWeight={'400'}>
                                Confirm new password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    bg={'#FFFFFF1A'}
                                    color={'white'}
                                    fontSize={'14px'}
                                    border={'1px solid rgb(255 255 255 / 0.2)'}
                                    type={showconfirmPassword ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        colorScheme="black"
                                        color={'white'}
                                        variant={'ghost'}
                                        onClick={() => setShowconfirmPassword((showconfirmPassword) => !showconfirmPassword)}
                                    >
                                        {showconfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        {!passwordsMatch && showErrorMessage && (
                            <Text color="red.500" fontSize="12px" mt="2">
                                Passwords do not match.
                            </Text>
                        )}
                        <Button mt={5} bg="#6366F1" _hover={{ bg: '#6366A1' }} color={'white'} fontSize={'15px'} fontWeight={'400'} type="submit">
                            Save
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Changepassword;
