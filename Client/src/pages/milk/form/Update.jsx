import React, { useState, useContext } from 'react';
import axios from 'axios'
import { MenuItem, useToast } from '@chakra-ui/react'

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { datacontext } from '../../../contextapi/Mycontext';
import { EditIcon } from '@chakra-ui/icons';

const Update = ({ milkid, milkdate, milkquantity }) => {
    const toast = useToast()

    const contextdata = useContext(datacontext);
    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;
    const [quantity, setquantity] = useState(milkquantity);
    const [date, setdate] = useState(milkdate);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitupdate = (e) => {
        e.preventDefault();
        const formData = {
            date: date,
            quantity: quantity
        };
        updatecowsdata(formData);
    }

    const updatecowsdata = async (formData) => {
        await axios.put(`http://localhost:8001/milk/${milkid}`, formData)
            .then(result => {
                console.log(result);
                closeModal();
                getcowsbirthdata();
                getmedicalexamdata();
                getMilkdata();
                getcowsdata();
                getallcowsdata(); toast({
                    description: 'Milk successfully updated ',
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
        <>
        <MenuItem icon={<EditIcon />} onClick={openModal} >
        Update
    </MenuItem>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmitupdate}>
                    <ModalOverlay />
                    <ModalContent fontFamily={'poppins'}>
                        <ModalHeader>Update</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>QUANTITY</FormLabel>
                                <Input
                                    required
                                    cursor={'pointer'}
                                    type="number"
                                    name="quantity"
                                    onChange={(e) => setquantity(e.target.value)}
                                    value={quantity}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>ENTRY DATE</FormLabel>
                                <Input
                                    required
                                    cursor={'pointer'}
                                    type="date"
                                    onChange={(e) => setdate(e.target.value)}
                                    value={date}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button fontWeight={'500'} type="submit" colorScheme="yellow" mr={3} color={'blackAlpha.800'} >
                                Update
                            </Button>
                            <Button fontWeight={'500'} variant="ghost" onClick={closeModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>

        </>
    )
}

export default Update
