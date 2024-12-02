import pandas as pd

from modules.utils import get_yearly_average

# Function that is returning list of average values for each year
def get_yearly(data):
  year_df = get_yearly_average(data)
  result = year_df.to_dict(orient='records') 
  return result

# Function that is returning the best and the worst performing year
def get_best_and_worst_performing_year(data):
  year_df = get_yearly_average(data)
  best_year_df = year_df[year_df['value'] == year_df['value'].max()]
  worst_year_df = year_df[year_df['value'] == year_df['value'].min()]
  best = best_year_df.to_dict(orient='records')
  worst = worst_year_df.to_dict(orient='records')
  return best + worst
