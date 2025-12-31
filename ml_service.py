import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model and scaler
with open('Nivra ml/nivra_brain.pkl', 'rb') as f:
    model = pickle.load(f)

with open('Nivra ml/nivra_scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    hr = data.get('heart_rate')
    temp = data.get('temperature')
    spo2 = data.get('spo2')

    if hr is None or temp is None or spo2 is None:
        return jsonify({'error': 'Missing sensor data'}), 400

    # Create input data
    input_data = pd.DataFrame([[hr, temp, spo2]],
                              columns=['heart_rate', 'temperature', 'spo2'])

    # Scale and predict
    scaled = scaler.transform(input_data)
    pred = model.predict(scaled)[0]

    # Medical veto logic
    if spo2 >= 95 and pred == 1:
        result = "NORMAL"
        alarm = False
    else:
        result = "ALARM" if pred == 1 else "NORMAL"
        alarm = pred == 1

    return jsonify({
        'prediction': result,
        'alarm': bool(alarm),
        'confidence': float(model.predict_proba(scaled)[0][int(pred)])
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)