import { useState } from 'react';
import reactLogo from '/LUCETE/Lucete_Project/wine_web_project/wine-frontend/public/imges/logo_images/react.svg';
import viteLogo from '/LUCETE/Lucete_Project/wine_web_project/wine-frontend/public/imges/logo_images/vite.svg';
import djangoLogo from '/LUCETE/Lucete_Project/wine_web_project/wine-frontend/public/imges/logo_images/django.svg';
import '../css/App.css';
import {
  SocialIcon,
  instagramLogoBase64,
  notionLogoBase64,
  githubLogoBase64,
} from '../components/SocialIcon';

import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.djangoproject.com/" target="_blank">
          <img src={djangoLogo} className="logo django" alt="Django logo" />
        </a>
      </div>
      <h1>
        Welcome to Lucete's <br></br>Development Journey
      </h1>
      <h2>Vite + React + Django</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <p className="read-the-docs">
          페이지가 리다이렉트 될때마다 초기화 되지만, 이렇게 작성하는거구나..
          하고 알 수 있었다. 나중에 써먹어야지..
        </p>
        <br />
        <br />
        <div>
          <Link to="/wine">와인 웹</Link>
        </div>
        <br />
        <div>
          <Link to="/growth">지속적 성장 웹</Link>
        </div>
        <br />
        <br />
        <div>
          {/* SocialIcon 컴포넌트를 재사용하여 각 아이콘을 표시 */}
          <SocialIcon
            url="https://www.instagram.com/pomodoro._.life/"
            logo={instagramLogoBase64}
          />
          <SocialIcon
            url="https://www.notion.so/A-journey-to-find-myself-25f140ad7c83802b8ed6c129c5e16d37?source=copy_link"
            logo={notionLogoBase64}
          />
          <SocialIcon
            url="https://github.com/LuceteDev"
            logo={githubLogoBase64}
          />
        </div>
        <p>Lucete's journey - Click on the logos to connect</p>
      </div>
      <p className="read-the-docs">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </>
  );
}

export default App;
