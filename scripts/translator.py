	
# from nltk import load_parser
# cp = load_parser('grammars/book_grammars/sql0.fcfg')
# query = 'in China what cities are located in'
# trees = list(cp.parse(query.split()))
# answer = trees[0].label()['SEM']
# answer = [s for s in answer if s]
# q = ' '.join(answer)
# print(q)

import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple is looking at buying U.K. startup for $1 billion")

for token in doc:
    print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
            token.shape_, token.is_alpha, token.is_stop)

