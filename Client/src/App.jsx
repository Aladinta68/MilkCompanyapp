import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Cow from './pages/cow/Cow';
import Milk from './pages/milk/Milk';
import Birth from './pages/birth/Birth';
import Medicalexam from './pages/medicalexam/Medicalexam';
import Login from './pages/login/Login';
import Notfound from './pages/404/Notfound';
import Profile from './pages/profile/Profile';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  const navigate = useNavigate();
  const renderSidebar = () => {
    const allowedPaths = ['/', '/milk', '/birth', '/examination', '/profile'];
    const { pathname } = window.location;

    if (!allowedPaths.includes(pathname)) {
      return null;
    } else {
      return (
        <Box position="relative">
          <Sidebar />
        </Box>
      );
    }
  };


  return (
    <Flex width={'100%'} direction={'row'}>
      {renderSidebar()}
      <Routes>
        <Route path='/' element={<Cow />} />
        <Route path='/milk' element={<Milk />} />
        <Route path='/birth' element={<Birth />} />
        <Route path='/examination' element={<Medicalexam />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Flex>
  );
}

export default App;
