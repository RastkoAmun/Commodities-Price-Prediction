import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

data = pd.read_csv('data/coffee.csv')
df = pd.DataFrame(data)

df['year'] = df['date'].str.slice(0, 4)
year_df = df.groupby(['year'])['value'].mean().reset_index()
model = ARIMA(year_df['value'], order=(5,1, 0))
model_fit = model.fit()

forecast = model_fit.forecast(steps=5)
# print(f"Predicted value for 2025: {forecast[0]}")
forecast