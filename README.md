# Milkman API Project

A simple Django REST Framework (DRF) project for managing a milk delivery service. This API allows you to manage Users, Customers, Categories (Milk Types), Products, and Subscriptions.

## 🚀 Features

*   **Users**: Manage registered users.
*   **Customers**: Manage customer details.
*   **Categories**: Manage milk types (e.g., Cow Milk, Buffalo Milk).
*   **Products**: Manage specific products (e.g., 1 Litre Cow Milk).
*   **Subscriptions**: Manage user subscriptions to milk categories.
*   **Simple & Clean**: Designed for beginners with clear, readable code.
*   **REST API**: Fully functional REST API built with Django REST Framework.

## 🛠️ Tech Stack

*   **Language**: Python
*   **Framework**: Django
*   **API Toolkit**: Django REST Framework (DRF)
*   **Database**: SQLite (Default)

## 📦 Installation

1.  **Clone the repository** (or download the code):
    ```bash
    git clone <your-repo-url>
    cd django_milkman
    ```

2.  **Create a virtual environment** (Optional but recommended):
    ```bash
    python -m venv venv
    # Activate:
    # Windows: venv\Scripts\activate
    # Mac/Linux: source venv/bin/activate
    ```

3.  **Install Dependencies**:
    ```bash
    pip install django djangorestframework
    ```

4.  **Run Migrations**:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **Run the Server**:
    ```bash
    python manage.py runserver
    ```

## 🔗 API Endpoints

| Resource | Method | URL | Description |
| :--- | :--- | :--- | :--- |
| **Users** | GET, POST | `/api/users/` | List or Create Users |
| | GET, PUT, DELETE | `/api/users/<id>/` | Retrieve, Update, Delete a User |
| **Customers** | GET, POST | `/api/customers/` | List or Create Customers |
| **Categories** | GET, POST | `/api/categories/` | List or Create Categories (Cow, Buffalo, Ghee) |
| **Products** | GET, POST | `/api/products/` | List or Create Products |
| **Subscriptions** | GET, POST | `/api/subscriptions/` | List or Create Subscriptions |

## 🧪 Testing

### Option 1: Using Postman
Import the included `milkman_api_collection.json` file into Postman to get started immediately.

### Option 2: Using Python Script
Run the included test script to see the API in action:
```bash
python test_api.py
```

## 📂 Project Structure

*   `milkman_project/`: Main project configuration.
*   `users/`: App for User management.
*   `customers/`: App for Customer management.
*   `categories/`: App for Milk Categories.
*   `products/`: App for Products.
*   `subscriptions/`: App for Subscriptions.

## 📝 License

This project is open source and available for learning purposes.
