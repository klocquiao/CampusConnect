import React from 'react';
import Head from 'next/head';

import { ChakraProvider, useDisclosure } from '@chakra-ui/react';

import MainNavbar from '../components/MainNavbar';
import Footer from '../components/Footer';

// Import CSS
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  //Flags
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <div id="container">
      <Head>
        <title>CampusConnect</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <ChakraProvider>
        <>
            <MainNavbar/>
            <div id="main-content"><Component {...pageProps}/></div>
            <Footer/>
        </>
      </ChakraProvider>
    </div>
  )
}

export default MyApp;
