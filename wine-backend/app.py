# from flask import Flask

# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, Flask!'

# if __name__ == '__main__':
#     app.run(debug=True)

# python app.py 로 실행!! 


# CREATE USER 'LuceteDev'@'localhost' IDENTIFIED BY 'admin';

# GRANT ALL PRIVILEGES ON *.* TO 'LuceteDev'@'localhost';

# FLUSH PRIVILEGES;

# CREATE DATABASE wine_db;

# 메인 Flask 애플리케이션 파일
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS # CORS를 위해 추가

# 1. 블루프린트와 초기화 함수를 임포트합니다.
from api.auth import auth_bp, init_app as init_auth_bp

app = Flask(__name__)

# CORS 설정: 리액트 앱과 통신 허용
CORS(app)

# MySQL 데이터베이스 설정
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'LuceteDev'  # MySQL 워크벤치에서 만든 사용자
app.config['MYSQL_PASSWORD'] = 'admin'   # MySQL 워크벤치에서 설정한 비밀번호
app.config['MYSQL_DB'] = 'wine_db'       # MySQL에서 만든 데이터베이스
app.config['MYSQL_CURSORCLASS'] = 'DictCursor' # 데이터를 딕셔너리 형태로 반환하도록 설정

mysql = MySQL(app)

# ✅ React 개발 서버(5173)에서 오는 요청 허용
CORS(app, resources={r"/auth/*": {"origins": "http://localhost:5173"}})

# 2. MySQL 객체를 블루프린트에 주입합니다.
init_auth_bp(mysql)

# 3. 블루프린트를 메인 앱에 등록합니다.
# url_prefix='/api'를 사용하여 모든 API 엔드포인트가 이 접두사를 갖게 됩니다.
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# 테스트용 기본 라우트
@app.route('/')
def hello_world():
    return 'Hello, Flask!'

if __name__ == '__main__':
    app.run(debug=True, port=5000)