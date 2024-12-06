import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

from modules.utils import get_number_of_years

def get_prediciton(resource):
  data = pd.read_csv(f'data/{resource}.csv')
  df = pd.DataFrame(data)

  df['year'] = df['date'].str.slice(0, 4)
  year_df = df.groupby(['year'])['value'].mean().reset_index()
  model = ARIMA(year_df['value'], order=(5,1, 0))
  model_fit = model.fit()

  forecast = model_fit.forecast(steps=5)
  
  forecast_list = forecast.values.round(2).tolist()
  years = [int(get_number_of_years(1)[0]) + i for i in range(1, 6)]

  return {
    "values": forecast_list,
    "years": years
  }