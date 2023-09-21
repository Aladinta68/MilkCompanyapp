import { useState, useContext } from 'react';
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

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


const Add = () => {
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

    const [motherid, setmotherid] = useState([]);
    const [breed, setbreed] = useState([]);
    const [date, setdate] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitadd = (e) => {
        e.preventDefault();
        const formData = {
            motherid: motherid,
            dateofbirth: date,
            breed: breed
        };
        addcowsbirthdata(formData);
    }

    const addcowsbirthdata = async (formData) => {
        await axios.post('http://localhost:8001/cow/cowbirth', formData)
            .then(result => {
                console.log(result);
                closeModal();
                getcowsbirthdata();
                getcowsbirthdata();
                getmedicalexamdata();
                getMilkdata();
                getcowsdata();
                getallcowsdata();                toast({
                    description: 'Birth successfully added ',
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
            <Button boxShadow=" rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset" display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} borderRadius={'3px'} fontSize={'14px'} fontWeight={'400'} bg={'	#03039e'} _hover={{ bg: '#000080' }} color={'white'} onClick={openModal}>
                Add Birth
            </Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmitadd}>
                    <ModalOverlay />
                    <ModalContent  fontFamily={'poppins'}>
                        <ModalHeader>Add Birth</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>MOTHER ID</FormLabel>
                                <Select required cursor={'pointer'} name="mother id" onChange={(e) => setmotherid(e.target.value)} >
                                    <option selected disabled>Select Mother ID</option>
                                    {allcowsdata.map((cow, index) => (
                                        <option key={index} value={cow.id}>{cow.id}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>BREED</FormLabel>
                                <Select required cursor={'pointer'} name="breed" onChange={(e) => setbreed(e.target.value)} >
                                    <option selected disabled>Select Breed</option>
                                    <option value={'Montbéliarde'}>Montbéliarde</option>
                                    <option value={'Holstein'}>Holstein</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>BIRTH DATE</FormLabel>
                                <Input
                                    required
                                    cursor={'pointer'}
                                    type="date"
                                    name="entryDate"
                                    onChange={(e) => setdate(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                        <Button type="submit" colorScheme='facebook' fontFamily={'poppins'} fontWeight={'400'} mr={3} >
                            Add
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

export default Add
