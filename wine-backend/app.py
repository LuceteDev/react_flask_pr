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


from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS # CORS를 위해 추가

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

@app.route('/api/posts', methods=['GET'])
def get_posts():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM posts ORDER BY created_at DESC")
    posts_data = cur.fetchall()
    cur.close()
    return jsonify(posts_data)

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    title = data['title']
    content = data['content']
    
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO posts(title, content) VALUES (%s, %s)", (title, content))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "게시글이 성공적으로 작성되었습니다."}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)