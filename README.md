# California garden plants screener

Browse and search low water plants the way you want.

It doesn't rain in the Bay Area from May through September.  There are lots 
of plants that are adapted for the Mediterranean climate, but it's harder 
than it should be to browse and find them.  

I only want to browse plants that are adapted to my climate.  Many garden 
books attempt to cover the entire US, but most of the plants they cover 
aren't adapted for dry summers. 

Big beautiful garden books like 
*[Plants and Landscapes for Summer-Dry Climates]*(http://www.amazon.com/Plants-Landscapes-Summer-Dry-Climates-Francisco/dp/0975323113) 
are great for browsing, but bad for filtering (find low water use, partial 
shade, 2-4 foot tall plants).  They're also too big and bulky (3.8 pounds)
to carry around in the nursery.

I want to search, filter, and browse garden plants from my phone or tablet.

## output

[WUCOLS plant database reformatted for ease of use](https://docs.google.com/spreadsheets/d/1AYyaBizzfew_oH6Ky1dGkvvfOpmgcb2jLkotVvGOTLI/edit?usp=sharing)

## details

### WUCOLS

[Water Use Classfication of Landscape Species](http://ucanr.edu/sites/WUCOLS/) (WUCOLS) is an amazing resource.

    > provides evaluations of the irrigation water needs for over 3,500 taxa ... used in California landscapes. It is based on the observations and extensive field experience of thirty-six landscape horticulturists

    > the intent of the WUCOLS  project was to  provide guidance    to  landscape   professionals   regarding   the water   needs   of  landscape   species


While a ton of work went into collecting this data, the csv and pdf 
versions are really hard to use. I reformatted and reorganized the 
data to make it easy to use, especially on a small screen.

#### sparse matrix

one column for each plant type, with the column header value in a 
cell to indicate presence

lots of wasted space; _combined into one column_

#### plant types

3 different types of info mixed together:

    - category (bulb, grass, groundcover, perennial, shrub, tree, vine)
    - group (bambroo, palm and cycad, succulent); these are never used alone
    - California native

_separated into three columns_

#### abbreviations

some abbreviations are substrings of others:

    - VL (very low) and L (low) water requirements
    - G (gross) and Gc (groundcover)
    - P (perennial) and Pm (palm and cycad)
    - S (shrub) and Su (succulent)

_changed to be non-overlapping_

#### 6 regions

new set of codes (1-6)

_put Sunset zones in header; added range of water needs_

#### plants with no data

_removed plants that don't have data_

#### see also

some entries reference a different name; requires another lookup

_moved to same row as preferred name so you're in the right spot after searching_

#### misc cleanup

_removed a few with no categories_

sometimes botantical name field contained extra notes not part of name (eg. 
partial shade in South Inland); _moved to extra info column_

#### just water info

The WUCOLS data includes names and water requirements for several thousand
plants, but no other plant requirements (sun or shade? 1 or 20 feet tall)?
[scripts](scripts/README.md) scrape data on plants and write it to one 
database.
