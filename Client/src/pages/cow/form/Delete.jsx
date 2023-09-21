import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MenuItem, useToast } from '@chakra-ui/react'

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { datacontext } from '../../../contextapi/Mycontext';
import { DeleteIcon } from '@chakra-ui/icons';


const Delete = ({ cowid }) => {
    const toast = useToast()
    const contextdata = useContext(datacontext);

    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8001/cow/${cowid}`)
            .then((result) => {
                console.log(result);
                setIsModalOpen(false);
                getcowsbirthdata();
                getmedicalexamdata();
                getMilkdata();
                getcowsdata();
                getallcowsdata();
                toast({
                    description: 'Cow successfully deleted ',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <MenuItem  icon={<DeleteIcon  />} onClick={openModal} >
                Delete
            </MenuItem>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent fontFamily={'poppins'}>
                    <ModalHeader>Delete Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure you want to delete this item?</ModalBody>
                    <ModalFooter>
                        <Button fontWeight={'400'} onClick={handleDelete} colorScheme="red" mr={3}>
                            Delete
                        </Button>
                        <Button fontWeight={'500'} variant="ghost" onClick={closeModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Delete;
