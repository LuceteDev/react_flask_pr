# 회원가입, 로그인 등 인증 로직을 여기에

from flask import Blueprint, jsonify, request
from passlib.hash import pbkdf2_sha256
from flask_mysqldb import MySQL

# 1. 'auth'라는 이름의 블루프린트 객체를 생성합니다.
# url_prefix='/auth'는 이 블루프린트의 모든 라우트 앞에 '/auth'를 붙입니다.
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# 2. MySQL 객체를 전역 변수로 선언합니다.
# 메인 app.py에서 이 객체를 주입(inject)받을 것입니다.
mysql = None

def init_app(mysql_instance):
    """메인 앱으로부터 MySQL 인스턴스를 주입받는 함수"""
    global mysql
    mysql = mysql_instance

# 3. 회원가입 엔드포인트
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    address = data.get('address') # ⭐ 주소 추가
    phone_number = data.get('phone_number') # ⭐ 휴대폰 번호 추가

    if not all([email, password, username]):
        return jsonify({"message": "필수 필드가 누락되었습니다."}), 400

    cur = mysql.connection.cursor()
    
    cur.execute("SELECT * FROM users WHERE email = %s", [email])
    existing_user = cur.fetchone()
    if existing_user:
        cur.close()
        return jsonify({"message": "이미 존재하는 이메일입니다."}), 409

    hashed_password = pbkdf2_sha256.hash(password)

    try:
        cur.execute(
            "INSERT INTO users (email, username, password, address, phone_number) VALUES (%s, %s, %s, %s, %s)",
            (email, username, hashed_password, address, phone_number) # ⭐ 새로운 컬럼 추가
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "회원가입이 성공적으로 완료되었습니다."}), 201
    except Exception as e:
        mysql.connection.rollback()
        cur.close()
        return jsonify({"message": "회원가입에 실패했습니다.", "error": str(e)}), 500

# 4. 로그인 엔드포인트
@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"message": "이메일과 비밀번호를 입력해주세요."}), 400

    cur = mysql.connection.cursor()
    cur.execute("SELECT email, username, password FROM users WHERE email = %s", [email])
    user = cur.fetchone()
    cur.close()

    if user and pbkdf2_sha256.verify(password, user['password']):
        return jsonify({"message": "로그인 성공!", "username": user['username']}), 200
    else:
        return jsonify({"message": "잘못된 이메일 또는 비밀번호입니다."}), 401