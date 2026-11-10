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