# toxic-comment-classifier

Шаг 1. Что установить
Python, желательно версии 3.10 или новее (у меня 3.13). Скачать: python.org. При установке на Windows поставьте галочку Add Python to PATH.
Библиотеки. Версия scikit-learn должна быть такой же, как у меня, иначе модель может не открыться:
bash
pip install scikit-learn==1.91 joblib flask flask-cors

На Mac вместо pip пишите python3 -m pip:

bash
python3 -m pip install scikit-learn==1.91 joblib flask flask-cors
Шаг 2. Скачать файлы
Откройте ссылку на репозиторий.
Нажмите зелёную кнопку Code → Download ZIP.
Распакуйте архив в отдельную папку, например toxic-site.
Шаг 3. Как устроена связь сайта и модели

Сайт (HTML и JavaScript) не умеет запускать Python-модель сам. Поэтому нужен маленький Python-сервер:

Пользователь вводит комментарий на сайте
        ↓
Сайт отправляет текст на Python-сервер
        ↓
Сервер вызывает predict_toxic(текст)
        ↓
Сервер возвращает ответ (Toxic / Non-toxic)
        ↓
Сайт показывает результат
Шаг 4. Создайте файл app.py

В той же папке, где лежат .joblib файлы и predict.py, создайте файл app.py и вставьте:

python
from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_toxic

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("text", "")
    label, prob = predict_toxic(text)
    return jsonify({"label": label, "probability": round(prob, 3)})

if __name__ == "__main__":
    app.run(port=5000)

Запустите сервер (команда в терминале, в этой же папке):

bash
python3 app.py

(на Windows: python app.py). Если всё хорошо, появится надпись Running on http://127.0.0.1:5000. Терминал не закрывайте, пока сайт работает.

Шаг 5. Создайте страницу сайта

В той же папке создайте index.html. Это простой пример, вы можете сделать красивее:

Откройте index.html двойным щелчком (откроется в браузере). Введите комментарий и нажмите Check.
