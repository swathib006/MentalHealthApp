import pandas as pd  # Import pandas library
from sklearn.model_selection import train_test_split  # Import the train_test_split function
from sklearn.ensemble import RandomForestClassifier  # Import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report  # Import evaluation metrics

# Step 1: Load the Data
df = pd.read_csv('synthetic_retention_data.csv')  # Load your dataset (adjust the path if necessary)

# Step 2: Prepare Features
X = df[["retention_days", "retention_rate"]]  # Features: retention metrics
y = df["is_active"]  # Target: Active status (1 = Active, 0 = Inactive)

print("Data loaded and features prepared.")

# Step 3: Split the Data into Training and Testing Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)  # 80% training, 20% testing
print("Training and testing data prepared.")

# Step 4: Train the Model
model = RandomForestClassifier(n_estimators=100, random_state=42)  # Initialize the RandomForest model
model.fit(X_train, y_train)  # Train the model on the training data

# Step 5: Make Predictions
y_pred = model.predict(X_test)  # Predict on the test data

# Step 6: Evaluate the Model
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Example: Predicting new data
new_data = pd.DataFrame({
    "retention_days": [30, 45],  # Example data
    "retention_rate": [0.75, 0.80]
})
new_predictions = model.predict(new_data)  # Predicting new data points

print("\nPredictions on new data:")
print(new_predictions)  # Output: [1 1] (Active users, as an example)
