import React from 'react'
import {
    Flex,
    Stack,
    Heading,
    Text,
} from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import notfound2 from './../../assets/notfound.jpg'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
const Notfound = () => {
    return (
        <Flex
            width={'100%'}
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bgImage={`url(${notfound2})`}
            bgSize={'cover'}
        >
            <Stack textShadow="2px 2px 4px rgba(0, 0, 0, 1)" fontFamily={'poppins'} spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontFamily={'poppins'} fontSize={'20'} color={'white'}  >404</Heading>
                </Stack>
                <Stack align={'center'}>
                    <Heading fontFamily={'poppins'} fontSize={'50'} color={'white'}>Page Not Found</Heading>
                </Stack>
                <Stack>
                    <Text fontFamily={'poppins'} fontSize={'16'} color={'gray.300'}>
                        Sorry, we couldn’t find the page you’re looking for.
                    </Text>
                </Stack>
                <Stack align={'center'}>
                    <ChakraLink display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} as={Link} fontFamily={'poppins'} _hover={{ color: 'blue.300' }} fontSize={'18'} color={'white'} to='/' ><FiArrowLeft /> Back to home</ChakraLink>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default Notfound
