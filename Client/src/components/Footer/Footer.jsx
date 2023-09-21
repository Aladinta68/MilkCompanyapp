import React from 'react'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import brand from './../../assets/brand.svg'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
const Footer = () => {
    return (
        <Flex   as={'footer'} fontFamily={'poppins'} bg={'gray.50'} borderTop={'1px solid #E4E4E4'} width={'100%'} height={"60px"} direction={'row'} >
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'19%'}  >
                <img src={brand} />
            </Box>
            <Box  display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'60%'} >
            <Text m={'0'} width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} >© 2023 TAHAR ABBES ALA EDDINE. All rights reserved</Text>
            </Box>
            <Box  display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'21%'} >
                <Box   display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} height={'100%'} width={'30%'}>
                    <Link  href={'https://dz.linkedin.com/in/aladinta68'}>
                        <FaLinkedin />
                    </Link>
                    <Link href={'https://github.com/Aladinta68'}>
                        <FaGithub />
                    </Link>
                </Box>
            </Box>
        </Flex>
    )
}

export default Footer
