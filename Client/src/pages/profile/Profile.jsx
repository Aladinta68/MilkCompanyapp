import React, { useEffect, useContext } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import axios from 'axios';
import { Text } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Box, Flex } from '@chakra-ui/react';
import Delete from './form/Delete';
import Update from './form/Update';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Changepassword from './form/Changepassword';
import Add from './form/Add';

const Profile = () => {

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const contextdatapage = useContext(datacontext);
  const error = contextdatapage.Error;

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (error && error.response && error.response.status === 401) {
      removeCookie('token');
      navigate('/login');
    }
  }, [error, navigate]);

  return (

    <Box fontFamily={'poppins'} flex="1" display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <Flex bg={'#111827'} borderLeft={'1px solid rgb(255 255 255 / 0.05) '} width={'100%'} minH={'90vh'} justifyContent={'flex-start'} alignItems={'center'} flexDirection={'column'}>
        <Flex justifyContent={'flex-start'} alignItems={'center'} width={'100%'} height={'60px'} borderBottom={'1px solid rgb(255 255 255 / 0.05) '}>
          <Text
            px={10}
            h={'100%'}
            m={0}
            fontSize={'16px'}
            height={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            color='#818CF8'
          >
            Account
          </Text>
        </Flex>
        <Flex direction={'column'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Update />
          <Changepassword />
          <Add />
          <Delete />
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}

export default Profile;
