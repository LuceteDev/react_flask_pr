# 회원가입, 로그인 등 인증 로직을 여기에

from flask import Blueprint, jsonify, request
from passlib.hash import pbkdf2_sha256
from flask_mysqldb import MySQL
import MySQLdb.cursors

# 1. 'auth'라는 이름의 블루프린트 객체를 생성합니다.
# url_prefix='/auth'는 이 블루프린트의 모든 라우트 앞에 '/auth'를 붙입니다.
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# 2. MySQL 객체를 전역 변수로 선언합니다.
# 메인 app.py에서 이 객체를 주입(inject)받을 것입니다.
# mysql = None
mysql = MySQL()

def init_app(mysql_instance):
    """메인 앱으로부터 MySQL 인스턴스를 주입받는 함수"""
    global mysql
    mysql = mysql_instance

# 3. 회원가입 엔드포인트
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get('email')
    user_id = email.split('@')[0]  # 이메일 @ 앞부분 추출
    password = data.get('password')
    username = data.get('username')
    address = data.get('address') # ⭐ 주소 추가
    phone_number = data.get('phone_number') # ⭐ 휴대폰 번호 추가

    if not all([email, password, username]):
        return jsonify({"message": "필수 필드가 누락되었습니다."}), 400

    cur = mysql.connection.cursor()
    
    cur.execute("SELECT * FROM users WHERE email = %s OR user_id = %s", [email, user_id])
    existing_user = cur.fetchone()
    if existing_user:
        cur.close()
        return jsonify({"message": "이미 존재하는 이메일 또는 사용자 ID입니다."}), 409

    hashed_password = pbkdf2_sha256.hash(password)

    try:
        cur.execute(
            "INSERT INTO users (user_id, email, username, password, address, phone_number) VALUES (%s, %s, %s, %s, %s, %s)",
            (user_id, email, username, hashed_password, address, phone_number) # ⭐ 새로운 컬럼 추가
        )
        print("DB에 넣는 값:", (user_id, email, username, hashed_password, address, phone_number))
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
    login_input = data.get('text')
    password = data.get('password')

    if not all([login_input, password]):
        return jsonify({"message": "아이디/이메일/휴대폰과 비밀번호를 입력해주세요."}), 400

    # DictCursor 사용
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cur.execute("""
        SELECT user_id, email, username, phone_number, password
        FROM users
        WHERE email = %s OR user_id = %s OR phone_number = %s
    """, (login_input, login_input, login_input))
    
    user = cur.fetchone()
    print("DB 조회 결과:", user)
    cur.close()

    if user and pbkdf2_sha256.verify(password, user['password']):
        return jsonify({
            "message": "로그인 성공!",
            "username": user['username'],
            "user_id": user['user_id']
        }), 200
    else:
        return jsonify({"message": "잘못된 아이디/이메일/휴대폰 또는 비밀번호입니다."}), 401
    
# 5. 아이디 찾기 엔드포인트
@auth_bp.route('/find-id', methods=['POST'])
def find_id():
    data = request.json
    print("요청 데이터:", data)
    name = data.get('name')
    phone_number = data.get('phone_number')

    if not all([name, phone_number]):
        return jsonify({"message": "이름과 휴대폰 번호를 입력해주세요."}), 400

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute(
        "SELECT user_id, email FROM users WHERE username = %s AND phone_number = %s",
        (name, phone_number)
    )
    user = cur.fetchone()
    cur.close()

    if user:
        return jsonify({
            "message": "아이디를 찾았습니다.",
            "user_id": user["user_id"],
            "email": user["email"]
        }), 200
    else:
        return jsonify({"message": "일치하는 사용자가 없습니다."}), 404
    
# 5. 비밀번호 재설정 엔드포인트
@auth_bp.route('/reset-pw', methods=['POST'])
def reset_pw():
    data = request.json
    email = data.get('email')
    new_password = data.get('new_password')

    if not all([email, new_password]):
        return jsonify({"message": "이메일과 새 비밀번호를 모두 입력해주세요."}), 400
    
    hashed_pw = pbkdf2_sha256.hash(new_password)
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:    
        # 비밀번호 업데이트
        cur.execute(
            "UPDATE users SET password = %s WHERE email = %s",
            (hashed_pw, email)
        )
        mysql.connection.commit()
        if cur.rowcount > 0:  # 변경된 행이 있으면 성공
            cur.close()
            return jsonify({"message": "비밀번호가 성공적으로 변경되었습니다."}), 200
        else:
            cur.close()
            return jsonify({"message": "일치하는 이메일이 없습니다."}), 404
    except Exception as e:
        return jsonify({"message": f"서버 오류: {str(e)}"}), 500
