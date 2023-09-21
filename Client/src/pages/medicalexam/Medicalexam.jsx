import { useEffect, useContext } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import Medicalexamtable from '../../components/table/Medicalexamtable';
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import medical from './../../assets/medical.jpg'


const Medicalexam = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const navigate = useNavigate();

  const contextdatapage = useContext(datacontext);
  const pageCount = contextdatapage.totalPageMedicalExam
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
        <Header image={medical} title="Medical Examination" description="Manage your medical examination" />
        <Box py={5} minH={'66vh'} px={isLargerThan768 ? 20 : 0} width={'100%'} display={'flex'}  justifyContent={'space-between'}  alignItems={'center'} flexDirection={'column'}>
          <Medicalexamtable />
          <Pagination pageCount={pageCount} />
        </Box>
        <Footer />
      </Box>
  );
};

export default Medicalexam;
