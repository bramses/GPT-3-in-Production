def fetch_top_scoring_results(data, n=1, check_semantic_similarity=False):
    """
    Fetch the top n results from the data.
    If check_semantic_similarity is set to True, it will also return a semantic similarity boolean for each result.
    """
    if n > len(data):
        raise ValueError("The number of results requested is larger than the data size.")
    
    top_list_sorted = sorted(data, key = lambda i: i['score'], reverse=True)[:n]
    if check_semantic_similarity:
        for i in range(len(top_list_sorted)):
            if top_list_sorted[i]['score'] > 200:
                top_list_sorted[i]['semantic_similarity'] = True
            else:
                top_list_sorted[i]['semantic_similarity'] = False
    
    return top_list_sorted

def fetch_document(documents, search_result, check_semantic_similarity=False):
    """
    Return the top document from the original data set.
    """
    if check_semantic_similarity:
        return { 
            'document': documents[search_result['document']], 
            'similar': search_result['semantic_similarity'] 
        }
    return documents[search_result['document']]

def search_and_fetch_top_result(openai_client, documents, query, engine_id='ada', check_semantic_similarity=False):
    """
    Search for the query and return the top result from the documents.
    Optionally, check if the result is semantically similar.
    """
    search = openai_client.Engine(engine_id).search(
        documents=documents,
        query=query
    )
    print(search)

    docs = fetch_top_scoring_results(search['data'], 1, check_semantic_similarity=check_semantic_similarity)
    for doc in docs:
        print(fetch_document(
            documents=documents, 
            search_result=doc,
            check_semantic_similarity=check_semantic_similarity
            )
        )
    
    return docs