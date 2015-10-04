#!/bin/python3

import csv
import re

categories = {
    # group; these are never used alone
    'Ba':  'bamboo',
    'Pm':  'palm and cycad',
    'Su':  'succulent',
    # type
    'Bu':  'bulb',
    'G':   'grass',
    'Gc':  'groundcover',
    'P':   'perennial',
    'S':   'shrub',
    'T':   'tree',
    'V':   'vine',
    # native
    'N': 'native'
}

water = {
    'H': 'high',
    'M': 'moderate',
    'L': 'low',
    'VL': 'none',
    '?': 'unknown',
    '/': 'not recommended'
}
ordered_water = ['N', 'L', 'M', 'H']

zones = [
    '14,15,16,17',
    '8,9,14',
    '22,23,24',
    '18,19,20,21'
]

print('type\tgroup\tnative\tbotanical name\tcommon name\t14-17\t8,9,14\t22-24\t18-21\trange\t\tother\taka')
idx = 0
plants = []
see = {}
with open('wucols.csv', newline='') as f:
    reader = csv.reader(f)
    for row in reader:
        fields = []
        idx += 1
        if idx < 3:
            continue
        #print(row)
        # cols 0-9: plant code
        # 2 G (grass) -> Gr so it's not a substring of Gc (groundcover)
        if row[2].strip() == 'G':
            row[2] = 'Gr'
        # 0 bamboo, 5 palm and cycad, 7 succulent are never used alone
        fields.append(' '.join([row[x] for x in [1, 2, 3, 4, 6, 8, 9]]).strip())
        # put them in separate column since they're a different type of descriptor
        fields.append(' '.join([row[x] for x in [0, 5, 7]]).strip())
        # col 10: native
        fields.append('T' if row[10].strip() == 'N' else '')
        # col 11-12: botanical name, common name
        name = row[11]
        # sometimes has extra info that's not part of the name
        m = re.search('(.*?) \((.*?)\)', name)
        if m:
            name = m.group(1)
            other = m.group(2)
        else:
            other = ''
        fields.append(name)
        fields.append(row[12])
        # col 13-16: non desert water req
        codes = []
        has_info = False
        for i in range(13, 17):
            row[i] = row[i].strip()
            if not(row[i] == '?' or row[i] == '/'):
                has_info = True
            # VL -> N so L is not a substring of VL
            if row[i] == 'VL':
                row[i] = 'N'
            if row[i] == '?':
                row[i] = ''
            fields.append(row[i])
            if row[i] in codes or row[i] in ['', '/']:
                continue
            codes.append(row[i])
        # see something else?
        m = re.search('(.*?) \(See (.*?)\)', row[11])
        if m:
            alt = m.group(1)
            name = m.group(2)
            if name not in see:
                see[name] = []
            see[name].append(alt)
            continue
        else:
            name = row[11]
        # if all water fields are unknown or not suitable, skip it
        if not has_info:
            continue
        water_range = ['', '']
        for w in ordered_water:
            if w in codes:
                if not water_range[0]:
                    water_range[0] = w
                water_range[1] = w
        fields.append(water_range[0])
        fields.append(water_range[1])
        fields.append(other)
        plants.append(fields)

for plant in plants:
    print('%s\t' % '\t'.join(plant), end='')
    # field 3 = botanical name
    name = re.sub(' \(.*?\)', '', plant[3])
    #print('\trow %s\t%s' % (name, (name in see)), end='')
    if name in see:
        print(' '.join(see[name]), end='')
    print()
