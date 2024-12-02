import pandas as pd

# Function that is grouping by year and calculating the avarage
def get_yearly_average(data):
  df = pd.DataFrame(data)
  df['year'] = df['date'].str.slice(0, 4)
  return df.groupby(['year'])['value'].mean().reset_index()