import React, { useState, useRef, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Main from './pages/Main.js'
import Login from './pages/Login.js'
import Search from './pages/Search'
import SignUp from './pages/SignUp'
import TopMenu from './Layout/TopMenu'
import Record from './pages/Record'
import Friends from './pages/Friends'
import app from './firebase.js'
import db from './firestore.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import Groups from './pages/Groups'

function App () {
  useEffect(() => {}, [])
  const dummyInfo = [
    { studyId: [0, 2], name: '이혜미', email: 'gkj8963@khu.ac.kr' },
    { studyid: [1], name: '정혜인', email: 'hyemi@khu.ac.kr' }
  ]

  const dummyList = [
    {
      studyId: 0,
      name: '영어스터디',
      leader: 'gkj8963@khu.ac.kr',
      member: ['a8963@khu.ac.kr', 'kkk@naver.com']
    },
    {
      studyId: 1,
      name: '수학스터디',
      leader: 'nav@naver.com',
      member: ['gkj8963@khu.ac.kr']
    },
    {
      studyId: 2,
      name: '파이썬스터디',
      leader: 'sssd@khu.ac.kr',
      member: ['gkj8963@naver.com']
    },
    { studyId: 3, name: '스피킹스터디', leader: 'a', member: [''] }
  ]
  const [data, setData] = useState([])
  const [info, setInfo] = useState(dummyInfo) // 전체 개인 data
  const [studyList, setStudyList] = useState(dummyList) // 전체 스터디 리스트
  const [activeMenu, setActiveMenu] = useState('home')

  // firebase
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <TopMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Main activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            </>
          )}
        />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/register" render={() => <SignUp />} />
        <Route
          exact
          path="/search"
          render={() => (
            <>
              <TopMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Search
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                postList={data}
              />
            </>
          )}
        />
        <Route
          exact
          path="/record"
          render={() => (
            <>
              <TopMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Record />
            </>
          )}
        />
        <Route
          exact
          path="/groups"
          render={() => (
            <>
              <TopMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Groups
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                info={info}
                setInfo={setInfo}
                studyList={studyList}
                setStudyList={setStudyList}
              />
            </>
          )}
        />
        <Route
          exact
          path="/friends"
          render={() => (
            <>
              <TopMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Friends/>
            </>
          )}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
