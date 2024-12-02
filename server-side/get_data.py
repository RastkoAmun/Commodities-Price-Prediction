import requests
import pandas as pd
import sys

resource = sys.argv[1]

# Loading data from the AlphaVintage API
url = f'https://www.alphavantage.co/query?function={resource.upper()}&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json().get('data')

# Data cleanup
df = pd.DataFrame(data)
df = df[df['value'] != '.']
df['value'] = pd.to_numeric(df['value'], errors='coerce')
df['value'] = df['value'].round(2)

# Storing data into CSV file (for now)
df.to_csv(f'data/{resource.lower()}.csv', index=False)