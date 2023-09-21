import {
  Flex,
  Box,
  Stack,
  Heading,
} from '@chakra-ui/react'
import brand from './../../assets/brand.svg'
import LoginForm from './form/Form'
import { useEffect, useContext } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { useNavigate } from 'react-router-dom';
import login from './../../assets/login.jpg'

const Login = () => {

  const contextdatapage = useContext(datacontext);
  const error = contextdatapage.Error;
  const navigate = useNavigate();
  useEffect(() => {
    if (error === 'null') {
      navigate('/');
    }
  }, [error]);

  return (

    <Flex
      fontFamily={'inter'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgImage={`url(${login})`}
      bgSize={'cover'}
      width={'100%'}
    >
      <Stack
        boxShadow=" rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
        bg={'rgba(255, 255, 255, 0.68)'}
        spacing={1}
        mx={'auto'}
        maxW={'lg'}
        py={10}
        px={4}>
        <Stack align={'center'} mb={2}>
          <img src={brand} alt="Brand" width={50} height={50} />
        </Stack>
        <Stack align={'center'} >
          <Heading fontFamily={'poppins'} fontSize={25} >Sign in to your account</Heading>
        </Stack>
        <Box
          p={5}>
          <Stack spacing={4}>
            <LoginForm />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default Login
