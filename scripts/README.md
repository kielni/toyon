# scripts

[Toyon database](https://toyon.firebaseio.com)

I scraped two sites to get details on plants in the WUCOLS list:

- [San Marcos Growers](http://www.smgrowers.com/), a wholesale nursery near Santa Barbara
- [Missouri Botantical Garden](http://www.missouribotanicalgarden.org/), which strangely seems to be one of the best data sources for Mediterran-adapted plants

## search name cleanup

add `name.search`; name minus [spp., -, ,x, cvs., and ]


## steps

- download WUCOLS to wucols.csv 
- WUCOLS -> reformatted, tab-delimited: `python3 format_wucols.py > wucols_remix.tsv`
- manual cleanup: save as toyon_all.tsv
- no or low water for zones 14-17: `awk -F '\t' '{ if ($7 == "N" || $7 == "L") print }' toyon_all.tsv > toyon.tsv`
- to json: `python3 tsv_to_json.py toyon.tsv > toyon1.json`
- clean up names add: `python3 add_search_names.py toyon1.json names.txt > toyon2.json`
- add data from San Marcos Growers: `node scrape_san_marcos.js toyon2.json > toyon3.json`
- add data from Missouri Botanical Gardens: `node scrape_missouri_botanical.js toyon3.json > toyon4.json`
- get photos from Flickr: `node scrape_flickr.js toyon4.json | tee toyon5.json`
- get Flickr usernames from ids: `node flickr_usernames.js | tee flickr_usernames.json`
- merge usernames with photo db: `node flickr_cleanup.js toyon5.json flickr_usernames.json | tee toyon6.json`
- get unique labels for height, spread, and sun: `node get_labels.js toyon6.json | tee labels.json`
- update missing labels
- promote standardized height, spread, and sun values: `node standardize_req.js toyon6.json labels.json | tee toyon7.json`
- add San Marcos search results left out: `node get_san_marcos.js toyon3.json toyon7.json | tee toyon8.json`
- keep only plants with full info; remove metadata not needed for screening: `node prune.js toyon8.json | tee pruned.json`
- get biggest Flickr photo <= 1600px: `node flickr_photo_size.js pruned.json | tee flickr.json`
