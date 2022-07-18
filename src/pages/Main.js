import React, { useEffect } from 'react'
import SideMenu from '../Layout/SideMenu.js'
import { Link } from 'react-router-dom'
import Profile from '../components/Profile.js'

const Main = ({  isLoggedIn, setIsLoggedIn,userObj }) => {

  return (
    <>
     
      <div className="content">
        <div className="MainPage">
          <div>
            {!isLoggedIn ? (<><h1>
              Welcome to{' '}
              <a style={{ color: '#ffc83d', fontSize: 'min(6vw, 40px)' }}>
                DCOM STUDY!
              </a>
            </h1>
            <p className="line"></p>
            <h1>로그인하고 친구들과 스터디 집중도를 측정해보세요!</h1>
            <Link to="login">
              <button>로그인하고 시작하기</button>
            </Link> </>):  <Profile userObj={userObj}/> }

          </div>
        </div>
      </div>
    </>
  )
}

export default Main
