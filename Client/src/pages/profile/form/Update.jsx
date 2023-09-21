import { Avatar, Button, Flex, FormControl, FormLabel, Heading, Input, Text, Wrap, WrapItem, useMediaQuery } from '@chakra-ui/react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import React, { useState, useContext } from 'react';
import { datacontext } from '../../../contextapi/Mycontext';

const Update = () => {
    axios.defaults.withCredentials = true;

    const toast = useToast();

    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    const contextdatapage = useContext(datacontext);
    const UserID = contextdatapage.UserID;
    const Profiledata = contextdatapage.Profiledata;
    const {
        getprofile
    } = contextdatapage;

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');


    const handleupdate = (e) => {
        e.preventDefault();
        const formData = {
            first_name: firstname,
            last_name: lastname,
            email: email
        };
        updateuser(formData);
    }

    const updateuser = async (formdata) => {
        await axios.put(`http://localhost:8001/profile/${UserID}`, formdata)
            .then(result => {
                console.log(result);
                getprofile();
                toast({
                    description: 'Profile successfully updated ',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
            )
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <Flex direction={isLargerThan768 ? 'row' : 'column'} width={'100%'} h={'100%'} justifyContent={'flex-start'} alignItems={'center'} borderBottom={'1px solid rgb(255 255 255 / 0.05) '} >
            <Flex height={'100%'} width={isLargerThan768 ? '35%' : '100%'} p={10} direction={'column'} >
                <Heading color={'white'} fontFamily={'poppins'} fontSize={'17px'} fontWeight={'500'}>Personal Information
                </Heading>
                <Text fontSize={'14px'} m={0} color={'#9CA3AF'} >Use a permanent address where you can receive mail.</Text>
            </Flex>
            <Flex height={'100%'} width={isLargerThan768 ? '65%' : '100%'} direction={'column'} p={10} >
                <Flex width={'100%'} justifyContent={'flex-start'} height={'100%'} direction={'row'} >
                    <Flex height={'100%'}>
                        <Wrap h={'100%'} width={'100%'}>
                            <WrapItem h={'100%'} width={'100%'}>
                                <Avatar
                                    height={20}
                                    width={20}
                                    src=''
                                    borderRadius='5'
                                />
                            </WrapItem>
                        </Wrap>
                    </Flex>
                    <Flex px={5} py={2} direction={'column'} width={'60%'} height={'100%'}>
                        <Button mb={1} fontWeight={'400'} _hover={{ bg: '#FFFFFF2A' }} bg={'#FFFFFF1A'} fontSize={'14px'} color={'white'} width={'120px'} >Change avatar
                        </Button>
                        <Text m={0} fontSize={'12px'} color={'#9CA3AF'}>JPG, GIF or PNG</Text>
                    </Flex>
                </Flex>
                <Flex width={'100%'}>
                    <form style={{ width: '90%' }} onSubmit={handleupdate}>
                        <FormControl mt={5} >
                            <FormLabel color={'white'} fontSize={'14px'} fontWeight={'400'}>First Name</FormLabel>
                            <Input bg={'#FFFFFF1A'} color={'white'} fontSize={'14px'} border={'1px solid rgb(255 255 255 / 0.2) '} width={'100%'} defaultValue={Profiledata && Profiledata.first_name} required type='text' onChange={(e) => setfirstname(e.target.value)} />
                        </FormControl>
                        <FormControl mt={5} >
                            <FormLabel color={'white'} fontSize={'14px'} fontWeight={'400'}>Last Name</FormLabel>
                            <Input bg={'#FFFFFF1A'} color={'white'} fontSize={'14px'} border={'1px solid rgb(255 255 255 / 0.2) '} defaultValue={Profiledata && Profiledata.last_name} required type='text' onChange={(e) => setlastname(e.target.value)} />
                        </FormControl>
                        <FormControl mt={5} >
                            <FormLabel color={'white'} fontSize={'14px'} fontWeight={'400'}>Email</FormLabel>
                            <Input bg={'#FFFFFF1A'} color={'white'} fontSize={'14px'} border={'1px solid rgb(255 255 255 / 0.2) '} defaultValue={Profiledata && Profiledata.email}
                                required type='email' onChange={(e) => setemail(e.target.value)} />
                        </FormControl>
                        <Button mt={5} bg={"#6366F1"} _hover={{ bg: '#6366A1' }} color={'white'} fontSize={'15px'} fontWeight={'400'} type="submit">
                            Save
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Update