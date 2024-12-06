from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

from modules.get_yearly_data import get_yearly
from modules.get_yearly_data import get_best_and_worst_performing_year
from modules.get_yearly_data import get_overall_yearly_average
from modules.get_yearly_data import get_average_over_last_ten_years
from modules.get_yearly_data import get_last_N_years_all_resources
from modules.utils import get_number_of_years
from modules.predict_data import get_prediciton

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
    overall_average = get_overall_yearly_average(data)
    ten_year_avgerage = get_average_over_last_ten_years(data)

    return jsonify({
        "by_year": yearlyData, 
        "best_year": bestAndWorst[0], 
        "worst_year": bestAndWorst[1],
        "overall_average": round(overall_average, 2),
        "ten_year_average": round(ten_year_avgerage, 2)
    })

@app.route("/recent", methods=["GET"])
def get_recent_for_each_resource():
    number_of_years = 20;
    return jsonify({
        "resources": get_last_N_years_all_resources(number_of_years),
        "years": get_number_of_years(number_of_years)    
    })

@app.route("/prediction", methods=["GET"])
def get_predictions():
    resource = request.args.get('resource')  # Get query parameter
    if not resource:
        return jsonify({"error": "Missing resource parameter"}), 400
    
    return jsonify(get_prediciton(resource))

@app.route("/correlation-results", methods=["GET"])
def get_correlations():
    correlations = get_last_N_years_all_resources(20)
    data = pd.DataFrame(data=correlations)
    coffee_cotton = data['coffee'].corr(data['cotton'])
    aluminium_copper = data['aluminium'].corr(data['copper'])
    wheat_corn = data['wheat'].corr(data['corn'])
    sugar_coffee = data['sugar'].corr(data['coffee'])
    return jsonify({
        "coffee_cotton": coffee_cotton,
        "aluminium_copper": aluminium_copper,
        "wheat_corn": wheat_corn,
        "sugar_coffee": sugar_coffee
    })


if __name__ == "__main__":
    app.run(debug=True)