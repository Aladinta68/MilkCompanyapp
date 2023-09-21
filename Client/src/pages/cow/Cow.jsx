import React, { useEffect, useContext } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { Box, useMediaQuery } from '@chakra-ui/react';
import Pagination from '../../components/pagination/Pagination';
import Cowtable from '../../components/table/Cowtable';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import cows from './../../assets/cows.jpg'

const Cow = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');


  const navigate = useNavigate();
  const contextdatapage = useContext(datacontext);
  const pageCount = contextdatapage.totalPageCows;
  const error = contextdatapage.Error;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (error && error.response && error.response.status === 401) {
      removeCookie('token');
      navigate('/login');
    }
  }, [error, navigate]);
  return (

      <Box flex="1" display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Header image={cows} title="Cows" description="Manage your cows" />
        <Box py={5} minH={'66vh'} px={isLargerThan768 ? 20 : 0} width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'column'}>
          <Cowtable />
          <Pagination pageCount={pageCount} />
        </Box>
        <Footer />
      </Box>
  );
};

export default Cow;
