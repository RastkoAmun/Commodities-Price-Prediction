from flask import Flask, request, jsonify
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)

# Root route for testing
@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Natural Resources Forecasting API!"

@app.route("/coffee/year", methods=["GET"])
def get_average_by_year():
    resource = request.args.get('resource')  # Get query parameter
    if not resource:
        return jsonify({"error": "Missing resource parameter"}), 400

    data = pd.read_csv(f"data/{resource}.csv")
    df = pd.DataFrame(data)
    df['year'] = df['date'].str.slice(0, 4)
    year_df = df.groupby(['year'])['value'].mean().reset_index()
    result = year_df.to_dict(orient='records')
    return jsonify({"forecast": result})

if __name__ == "__main__":
    app.run(debug=True)