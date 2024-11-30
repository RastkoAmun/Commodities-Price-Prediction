import requests
import pandas as pd

# Loading data from the AlphaVintage API
url = 'https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json().get('data')

# Data cleanup
df = pd.DataFrame(data)
df = df[df['value'] != '.']
df['value'] = pd.to_numeric(df['value'], errors='coerce')
df['value'] = df['value'].round(2)

# Storing data into CSV file (for now)
df.to_csv('data/coffee.csv', index=False)