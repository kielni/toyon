#!/bin/python3

import csv
import json
import sys

# usage: tsv_to_json.py tsv_file

#             0          1        2         3         4           5           
fields = ['available', 'type', 'group', 'native', 'botanical', 'common',
#             6                7            8             9
          'zones14_17', 'zones8_9_14', 'zones22_24', 'zones18_21',
#             10          11        12      13
          'waterFrom', 'waterTo', 'other', 'aka']
plants = []
row_idx = 0
with open(sys.argv[1], newline='') as f:
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        row_idx += 1
        plant = {'id': row_idx}
        # flat to structured
        plant = {
            'name': {
                'botanical': row[4].strip(),
                'common': row[5].strip()
            },
            'type': row[1],
            'water': {
                'from': row[6],
                'to': row[6],
                'source': 'wucols',
                'wucols': {
                    'zones14_17': row[6],
                    'zones8_9_14': row[7],
                    'zones22_24': row[8],
                    'zones18_21': row[9]
                }
            }
        }
        if row[2]:
            plant['group'] = row[2]
        if row[3]:
            plant['native'] = True
        if row[12]:
            plant['other'] = {'wucols': row[12]}
        if row[13]:
            plant['aka'] = {'wucols': row[13]}
        #plants[str(row_idx)] = plant
        plants.append(plant)

#print('%s plants' % len(plants))
print(json.dumps({'plants': plants}, indent=4))
