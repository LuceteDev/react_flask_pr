import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';

const FindIdForm = ({ onClose, onFormOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직
    alert('아이디를 찾고 있습니다.');
  };

  return (
    <section className="login-section">
      <div className="section_center">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>아이디 찾기</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              required
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              required
              placeholder="가입시 등록한 이메일"
            />
          </div>
          <button type="submit">아이디 찾기</button>
        </form>
        <div className="additional-links">
          <a onClick={() => onFormOpen('login')}>로그인으로 돌아가기</a>
        </div>
      </div>
    </section>
  );
};

export default FindIdForm;
