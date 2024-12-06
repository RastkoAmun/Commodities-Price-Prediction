from modules.utils import group_by_months

def best_and_worst_pergorming_month_on_average(data):
  average_by_month = group_by_months(data)
  max_row = average_by_month.loc[average_by_month['value'].idxmax()]
  min_row = average_by_month.loc[average_by_month['value'].idxmin()]
  max_row.to_dict(orient='recoreds')
  min_row.to_dict(orient='recoreds')
  return min_row + max_row