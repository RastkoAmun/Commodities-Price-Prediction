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

def get_overall_yearly_average(data):
  year_df = get_yearly_average(data)
  overall_average = year_df['value'].mean()
  return overall_average

def get_average_over_last_ten_years(data):
  year_df = get_yearly_average(data)
  year_df = year_df.tail(10)
  ten_year_avg = year_df['value'].mean()
  return ten_year_avg

def get_last_N_years_all_resources(n):
  resources = ['coffee', 'corn', 'sugar', 'wheat', 'copper', 'aluminium', 'gas', 'cotton']
  final = {}
  for resource in resources:
    data = pd.read_csv(f"data/{resource}.csv")
    year_df = get_yearly_average(data)
    year_df = year_df.tail(n)
    print(year_df['value'].values)
    final[resource] = year_df['value'].values.tolist()
  return final
