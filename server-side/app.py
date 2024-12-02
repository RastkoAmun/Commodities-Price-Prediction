from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

from modules.get_yearly_data import get_yearly
from modules.get_yearly_data import get_best_and_worst_performing_year

app = Flask(__name__)
CORS(app)

# Root route for testing
@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Natural Resources Forecasting API!"

@app.route("/yearly", methods=["GET"])
def get_average_by_year():
    resource = request.args.get('resource')  # Get query parameter
    if not resource:
        return jsonify({"error": "Missing resource parameter"}), 400

    data = pd.read_csv(f"data/{resource}.csv")

    yearlyData = get_yearly(data)
    bestAndWorst = get_best_and_worst_performing_year(data)

    return jsonify({
        "by_year": yearlyData, 
        "best_year": bestAndWorst[0], 
        "worst_year": bestAndWorst[1]
    })



if __name__ == "__main__":
    app.run(debug=True)