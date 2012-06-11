import urllib
import os

f = urllib.urlopen("http://www.courts.state.va.us/scndex.htm")
site = f.read()
siteRead = ""
f.close()
counter = 0
lastStart = 0
lastEnd = 0
pdfs = []
while (len(siteRead) < len(site)):
#while(len(pdfs) < 10):
	siteRead += site[len(siteRead)]
	if ("a href" == siteRead[len(siteRead)-6:len(siteRead)]):
		lastStart = len(siteRead)
	if (".pdf" == siteRead[len(siteRead)-4:len(siteRead)]):
		lastEnd = len(siteRead)
		pdfs.append("http://www.courts.state.va.us/" + site[lastStart+2:lastEnd])

#while (counter < len(pdfs)):
#	print pdfs[counter]
#	counter += 1

counter=0
for url in pdfs:
	base="curl \"http://localhost:8983/solr/update/extract?literal.key=Pdf"
	base += str(counter)
	base += "&literal.doc_type=Pdf&fmap.content=text&commit=true\" -F \"stream.url="
	base += url
	base += "\""
	print base
	os.system(base)
	counter += 1


