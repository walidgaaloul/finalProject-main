import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Hightlight from './Featured/Hightlight'
import LiveAnyWhere from './LiveAnyWhere/LiveAnyWhere';
import Places from './Places/Places';
import Experiences from './Experiences/Experiences';
import Gift from './Gift/Gift';
import JionUs from './JionUs/JionUs';
import Footer from '../Footer/Footer';

const S = {
  DivSplashRoot: styled.div`
    position: relative;
  `,

  DivSplashContainer: styled.div`
    position: relative;
    width: 100%;
    z-index: 1;
    @media (min-width: 744px) {
      height: 100vh;
      min-height: 680px;
    }
  `,

  DivSplashGray: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #d8d8d8;
    z-index: -2;
  `,
  SplashImage: styled.div`
    z-index: -1;
    height: auto;
    width: auto;
    min-height: 100%;
    min-width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    background-position: center;
    background-repeat: unset;
    background-size: cover;
    background-image: url('https://www.themilliardaire.com/en/wp-content/uploads/2014/03/alila-villas-uluwatu.jpg');

    @media (min-width: 744px) {
      background-image: url('https://www.themilliardaire.com/en/wp-content/uploads/2014/03/alila-villas-uluwatu.jpg');
    }
  `,
};

class Home extends Component {
  render() {
    return (
      <>
        <S.DivSplashRoot>
          <S.DivSplashContainer>
            <S.DivSplashGray>
              <S.SplashImage />
            </S.DivSplashGray>
            <SearchForm />
            <Hightlight /><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            
			<Places />
			<LiveAnyWhere />
			<Experiences />
			<Gift />
			<JionUs />
      <Footer />
          </S.DivSplashContainer>
        </S.DivSplashRoot>
      </>
    );
  }
}

export default Home;
