import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';

const FindPwForm = ({ onClose, onFormOpen }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // 비밀번호 재설정 로직 (API 호출 등)
    alert('비밀번호가 성공적으로 재설정되었습니다.');
    onClose();
  };
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section className="login-section" onClick={onClose}>
      <div className="section_center" onClick={handleModalContentClick}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>비밀번호 재설정</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              required
              placeholder="가입 시 등록한 이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              required
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="new-password">새 비밀번호</label>
            <input
              type="password"
              id="new-password"
              required
              placeholder="새 비밀번호를 입력하세요"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">새 비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              required
              placeholder="새 비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">비밀번호 재설정</button>
        </form>
        <div className="additional-links">
          {/* 로그인 폼으로 돌아가기 */}

          <a onClick={() => onFormOpen('login')}>로그인으로 돌아가기</a>
        </div>
      </div>
    </section>
  );
};

export default FindPwForm;
