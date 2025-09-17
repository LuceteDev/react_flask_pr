import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import FindIdForm from '../components/FindIdForm.jsx';
import FindPwForm from '../components/FindPwForm.jsx';
import '../css/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  // 하나의 상태로 어떤 폼이 열려 있는지 관리합니다.
  const [modalForm, setModalForm] = useState(null); // 'login', 'signup', 'findId', 'findPw'
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFormOpen = (formType) => {
    setModalForm(formType);
  };

  const handleFormClose = () => {
    setModalForm(null);
  };
  // const toggleLogin = () => {
  //   setIsLoginOpen(!isLoginOpen);
  // };

  return (
    <header className="main-header">
      <div className="background-container">
        <img
          src="/imges/wine_images/wine.jpg"
          alt="Wine img"
          className="header-image"
        />
        {/* 로그인 아이콘과 햄버거를 묶는 컨테이너 추가 */}
        <div className="icon-container">
          {/* 로그인 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            className="login-icon"
            viewBox="0 0 16 16"
            // onClick={toggleLogin}
            onClick={() => handleFormOpen('login')}
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="cart-icon"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
        </div>
        {/* isLoginOpen 상태가 true일 때만 LoginForm 렌더링 */}
        {/* {isLoginOpen && <LoginForm onClose={toggleLogin} />} */}
        {/* 조건부 렌더링을 확장하여 모든 폼을 관리 */}
        {modalForm === 'login' && (
          <LoginForm onClose={handleFormClose} onFormOpen={handleFormOpen} />
        )}
        {modalForm === 'signup' && (
          <SignUpForm onClose={handleFormClose} onFormOpen={handleFormOpen} />
        )}
        {modalForm === 'findId' && (
          <FindIdForm onClose={handleFormClose} onFormOpen={handleFormOpen} />
        )}
        {modalForm === 'findPw' && (
          <FindPwForm onClose={handleFormClose} onFormOpen={handleFormOpen} />
        )}
        <div className={`menu_area ${isOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/story">Story</Link>
            </li>
            <li>
              <Link to="/wines">Wines</Link>
            </li>
            <li>
              <Link to="/board">Board</Link>
            </li>
          </ul>
        </div>
        <div className="main-text">
          <h1>WINE</h1>
          <h2>신이 인간에게 준 최고의 선물 "와인"</h2>
          <p>God's best gift "wine"</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
