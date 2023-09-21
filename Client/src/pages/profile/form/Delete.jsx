import React, { useState, useContext } from 'react';
import { datacontext } from '../../../contextapi/Mycontext'; import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
    Button,
    Flex,
    Heading,
    Input,
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

const Delete = () => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    axios.defaults.withCredentials = true;

    const contextdatapage = useContext(datacontext);
    const UserID = contextdatapage.UserID;


    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmationInput, setConfirmationInput] = useState('');
    const [isConfirmationCorrect, setIsConfirmationCorrect] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setConfirmationInput('');
        setIsConfirmationCorrect(false);
    };
    const handleInputChange = (event) => {
        const input = event.target.value;
        setConfirmationInput(input);
        setIsConfirmationCorrect(input === 'DELETE');
    };

    const handleDelete = () => {
        if (isConfirmationCorrect) {
            axios
                .delete(`http://localhost:8001/profile/${UserID}`)
                .then((result) => {
                    console.log(result);
                    setIsModalOpen(false);
                    removeCookie('token');
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('Confirmation phrase is incorrect');
        }
    };

    return (
        <Flex  direction={isLargerThan768?'row':'column'} width={'100%'} h={'100%'} justifyContent={'flex-start'} alignItems={'center'} borderBottom={'1px solid rgb(255 255 255 / 0.05) '} >
            <Flex height={'100%'} width={isLargerThan768?'35%':'100%'} p={10} direction={'column'} >
                <Heading  color={'white'} fontFamily={'poppins'} fontSize={'17px'} fontWeight={'500'}>
                    Delete account
                </Heading>
                <Text  fontSize={'14px'} m={0} color={'#9CA3AF'} >
                    No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.                </Text>
            </Flex>
            <Flex height={'100%'} width={isLargerThan768?'65%':'100%'} direction={'column'} p={10} >
                <Flex width={'100%'}>
                    <Button fontWeight={'400'} onClick={openModal} colorScheme='red'>
                        Yes, delete my account
                    </Button>

                    <Modal  isOpen={isModalOpen} onClose={closeModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontFamily={'poppins'} color={'red'}>Delete Account</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody fontFamily={'poppins'}>
                                Are you sure you want to delete your account?
                                <Text  color={'black'} mb={0} mt={5} display={'flex'} flexDirection={'row'}>
                                    Type
                                    <Text mx={2} fontWeight={600}>DELETE</Text>
                                    to confirm
                                </Text>
                                <Input
                                    mt={1}
                                    placeholder=""
                                    value={confirmationInput}
                                    onChange={handleInputChange}
                                />
                            </ModalBody>
                            <ModalFooter fontFamily={'poppins'}>
                                <Button onClick={handleDelete} colorScheme="red" mr={3} isDisabled={!isConfirmationCorrect}>
                                    Delete
                                </Button>
                                <Button variant="ghost" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Delete;
