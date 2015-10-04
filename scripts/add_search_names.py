#!/bin/python3

import json
import sys

# usage: add_search_names.py json_file names_file
with open(sys.argv[1]) as f:
    plants = json.load(f)


with open(sys.argv[2]) as f:
    idx = 0
    for name in f.readlines():
        plants['plants'][idx]['name']['search'] = name.strip()
        idx += 1

print(json.dumps(plants, indent=4))
