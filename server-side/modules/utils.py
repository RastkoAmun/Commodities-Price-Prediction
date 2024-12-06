import pandas as pd
import calendar

# Function that is grouping by year and calculating the avarage
def get_yearly_average(data):
  df = pd.DataFrame(data)
  df['year'] = df['date'].str.slice(0, 4)
  return df.groupby(['year'])['value'].mean().reset_index()

# Function that is calculating overall average for each type of month
# (e.g. average among all February months)
def group_by_months(data):
  df = pd.DataFrame(data)
  df['month'] = df['date'].str.extract(r'\d{4}-(\d{2})-\d{2}')
  df['month'] = df['month'].astype(int).apply(lambda month: calendar.month_name[month])
  return df.groupby(by='month')['value'].mean().reset_index()

# Function that returns the data for the recent n years, specifiad by
# parameter number_of_years
def get_number_of_years(number_of_years):
  data = pd.read_csv("data/coffee.csv")
  year_df = get_yearly_average(data)
  year_df = year_df.tail(number_of_years)
  return year_df['year'].values.tolist()