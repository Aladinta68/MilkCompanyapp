import React from 'react'
import { Box, Heading, Text, useMediaQuery } from '@chakra-ui/react'

const Header = ({ image, title, description }) => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    return (
        <Box px={'20'} bgImage={`url(${image})`} bgPosition={'center'} bgSize={'cover'} width={'100%'} alignItems={'center'} h={'150px'} justifyContent={isLargerThan768?'flex-start':'center'} display={'flex'} >
            <Box display={'flex'} flexDirection={'column'} >
                <Heading textAlign={isLargerThan768?'start':'center'} margin={0} width={'100%'} fontFamily={'poppins'} color={'white'} fontSize={30}>
                    {title}
                </Heading>
                <Text margin={0} width={'100%'} fontFamily={'poppins'} color={'white'} >
                    {description}
                </Text>
            </Box>
        </Box>
    )
}

export default Header
