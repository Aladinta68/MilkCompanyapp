import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { datacontext } from '../../contextapi/Mycontext';
import { Box, useMediaQuery } from '@chakra-ui/react';
import Cowbirthtable from '../../components/table/Cowbirthtable';
import Pagination from '../../components/pagination/Pagination';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import cows from './../../assets/cows.jpg'

const Birth = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const navigate = useNavigate();
  const contextdatapage = useContext(datacontext);
  const pageCount = contextdatapage.totalPageCowsBirth;
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
        <Header image={cows} title="Cow Birth" description="Manage your cow birth" />
        <Box py={5} minH={'66vh'} px={isLargerThan768 ? 20 : 0} width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'column'}>
          <Cowbirthtable />
          <Pagination pageCount={pageCount} />
        </Box>
        <Footer />
      </Box>
  );
};

export default Birth;
