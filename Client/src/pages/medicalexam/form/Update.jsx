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
    Select,
} from '@chakra-ui/react';
import { datacontext } from '../../../contextapi/Mycontext';
import { EditIcon } from '@chakra-ui/icons';

const Update = ({ examid, examdate, examdisease, cowid }) => {
    const toast = useToast()


    const contextdata = useContext(datacontext);
    const allcowsdata = contextdata.allcowsdata;
    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;

    const [disease, setdisease] = useState(examdisease);
    const [Cowid, setCowid] = useState(cowid);
    const [date, setdate] = useState(examdate);
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
            cowid: Cowid,
            dateofexamination: date,
            disease: disease
        };
        updatecowsdata(formData);
    }

    const updatecowsdata = async (formData) => {
        await axios.put(`http://localhost:8001/medicalexamination/${examid}`, formData)
            .then(result => {
                console.log(result);
                closeModal();
                getcowsbirthdata();
                getmedicalexamdata();
                getMilkdata();
                getcowsdata();
                getallcowsdata();                toast({
                    description: 'Exam successfully updated ',
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
                                <FormLabel>COW ID</FormLabel>
                                <Select value={Cowid} required cursor={'pointer'} name="COW id" onChange={(e) => setCowid(e.target.value)} >
                                    <option selected disabled>COW ID</option>
                                    {allcowsdata.map((cow, index) => (
                                        <option key={index} value={cow.id}>{cow.id}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>DISEASE</FormLabel>
                                <Select
                                    required
                                    cursor={'pointer'}
                                    name="DISEASE"
                                    onChange={(e) => setdisease(e.target.value)}
                                    value={disease}
                                >
                                    <option selected disabled>DISEASE</option>
                                    <option value={'Bluetongue'}>Bluetongue</option>
                                    <option value={'Botulism'}>Botulism</option>
                                    <option value={'Bovine-Tuberculosis'}>Bovine-Tuberculosis</option>
                                    <option value={'Brucellosis'}>Brucellosis</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>ENTRY DATE</FormLabel>
                                <Input
                                    required
                                    cursor={'pointer'}
                                    type="date"
                                    name="entryDate"
                                    onChange={(e) => setdate(e.target.value)}
                                    value={date}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                        <Button fontWeight={'500'}  type="submit" colorScheme="yellow" mr={3} color={'blackAlpha.800'} >
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
