import os
import openai
from utils import search_and_fetch_top_result
from dotenv import load_dotenv
load_dotenv()

def main():
    openai.api_key = os.getenv("OPENAI_API_KEY")
    meals = ['breakfast', 'lunch', 'dinner']

    search_and_fetch_top_result(openai, meals, 'morning', check_semantic_similarity=True)
    search_and_fetch_top_result(openai, meals, 'afternoon', check_semantic_similarity=True)
    search_and_fetch_top_result(openai, meals, 'evening', check_semantic_similarity=True)
    


    

if __name__ == "__main__":
    main()