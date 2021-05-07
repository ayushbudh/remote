from textblob import TextBlob
import sys

msg = str(sys.argv[1])
blob = TextBlob(str(sys.argv[1]))
print(blob.sentiment.polarity)
