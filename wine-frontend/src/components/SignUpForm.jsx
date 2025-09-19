// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/login.css';
// import { useAuth } from '../services/AuthContext';

// const SignUpForm = ({ onClose, onFormOpen }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [address, setAddress] = useState(''); // ⭐ 주소 추가
//   const [phoneNumber, setPhoneNumber] = useState(''); // ⭐ 휴대폰 번호 추가

//   const { signUp } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('비밀번호가 일치하지 않습니다.');
//       return;
//     }
//     // ⭐ 주소와 휴대폰 번호를 포함하여 데이터 객체 생성
//     const userData = {
//       email,
//       password,
//       username,
//       address,
//       phone_number: phoneNumber, // 백엔드의 필드명과 일치시켜야 합니다.
//     };

//     const success = await signUp(userData);
//     if (success) {
//       // 회원가입 성공 시 폼 초기화
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//       setUsername('');
//       setAddress('');
//       setPhoneNumber('');
//     }
//   };

//   const handleModalContentClick = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <section className="login-section" onClick={onClose}>
//       <div className="section_center" onClick={handleModalContentClick}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <h2>회원가입</h2>
//         <hr />
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="email">이메일</label>
//             <input
//               type="email"
//               id="email"
//               required
//               placeholder="이메일을 입력하세요"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="username">사용자 이름</label>
//             <input
//               type="text"
//               id="username"
//               required
//               placeholder="사용자 이름을 입력하세요"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">비밀번호</label>
//             <input
//               type="password"
//               id="password"
//               required
//               placeholder="비밀번호를 입력하세요"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="confirmPassword">비밀번호 확인</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               required
//               placeholder="비밀번호를 다시 입력하세요"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="address">주소</label>
//             <input
//               type="text"
//               id="address"
//               required
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="phoneNumber">휴대폰 번호</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               required
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
//           <button type="submit">회원가입</button>
//         </form>
//         <div className="additional-links">
//           <a onClick={() => onFormOpen('login')}>로그인으로 돌아가기</a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignUpForm;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';
import { useAuth } from '../services/AuthContext';

const SignUpForm = ({ onClose, onFormOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const userData = {
      email,
      password,
      username,
      address,
      phone_number: phoneNumber,
    };

    const success = await signUp(userData);
    if (success) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      setAddress('');
      setPhoneNumber('');
    }
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
        <h2>회원가입</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              required
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">사용자 이름</label>
            <input
              type="text"
              id="username"
              required
              placeholder="사용자 이름을 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              required
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              required
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              placeholder="주소를 입력하세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">휴대폰 번호</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="휴대폰 번호를 입력하세요"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button type="submit">회원가입</button>
        </form>
        <div className="additional-links">
          <a onClick={() => onFormOpen('login')}>로그인으로 돌아가기</a>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
