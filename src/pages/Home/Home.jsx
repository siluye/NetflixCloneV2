import React from 'react';
import Banner from '../../component/Banner/Banner';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';
import RowList from '../../component/Row/RowList/RowList';

const Home = () => {
  return (
    <>
     <Header />
     <Banner />
     <RowList />
     <Footer /> 
    </>
  );
}

export default Home;
