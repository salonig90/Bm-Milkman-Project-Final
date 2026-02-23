import requests
import string
import random

BASE_URL = "http://127.0.0.1:8000/api/"

def test_products_names():
    print("\n--- Testing Products Names ---")
    url = BASE_URL + "products/"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            products = response.json()
            if not products:
                print("No products found.")
            for product in products:
                print(f"Product: {product['name']} ({product['quantity_type']}) - Category: {product.get('category_name', 'N/A')} (ID: {product['category']})")
        else:
            print(f"Failed to list products: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Error connecting to API: {e}")

def test_subscriptions_names():
    print("\n--- Testing Subscriptions Names ---")
    url = BASE_URL + "subscriptions/"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            subs = response.json()
            if not subs:
                print("No subscriptions found.")
            for sub in subs:
                print(f"Subscription: User: {sub.get('user_name', 'N/A')} - Category: {sub.get('category_name', 'N/A')}")
        else:
            print(f"Failed to list subscriptions: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Error connecting to API: {e}")

if __name__ == "__main__":
    test_products_names()
    test_subscriptions_names()
