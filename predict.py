import joblib

model = joblib.load("toxic_model.joblib")
vectorizer = joblib.load("tfidf_vectorizer.joblib")

def predict_toxic(text):
    if not text or not text.strip():
        return "Empty input", 0.0
    vec = vectorizer.transform([text[:5000]])
    prob = model.predict_proba(vec)[0][1]
    return ("Toxic" if prob >= 0.5 else "Non-toxic"), float(prob)