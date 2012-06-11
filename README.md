The State Decoded
=================

A free, open source PHP- and MySQL-based application to parse and display state laws. This project is currently in beta testing [as a Virginia implementation](http://vacode.org/).

#### Notes
This is the Virginia implementation, stripped down and normalized. Simply installing this would not yield useful results. That said, a few hours of work could well yield a useful, functioning website.

A Google API key must be entered in includes/page.inc.php for the Google JS API call.

#### More
News at http://twitter.com/statedecoded

Website at http://www.statedecoded.com/

Development of The State Decoded is funded by the John S. and James L. Knight Foundation’s News Challenge.

#### Search
Solr is an open source search engine based on Lucene.

In order to use Solr search in the app, you must define the GLOBAL_SOLR variable in the config file to point to your solr instance. 

Refer to apache-solr-3.6.0/Readme.txt for more license info.
Refer to  apache-solr-3.6.0/vacode-search/Readme.txt for to start solr and import data

Important Files
-------------------------
  solrconfig.xml
  This file specifies many default query setting as well as different 
  request handlers. The important ones are select and terms. 
  localhost:8983/solr/select/ is where queries are sent. /solr/terms
  is used for autocomplete.

  schema.xml
  Specifies your field types and the fields to keep the data in.
  General fields have been defined for laws, definitions, court
  cases and comments as well as others for spell checking and other
  use cases.

  *-data-config.xml
  Specifies how data gets imported into the Solr index.