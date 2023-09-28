<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit Page</title>
    <style>
        /* Add your CSS styles here */
        /* Example style for form container */
        .form-container {
            width: 80%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Submit Information</h1>
        <form id="submissionForm" enctype="multipart/form-data">
            <label for="perpetrator">Perpetrator:</label>
            <input type="text" id="perpetrator" name="perpetrator" required><br>

            <label for="location">Location:</label>
            <input type="text" id="location" name="location" required><br>

            <label for="summary">Summary:</label>
            <textarea id="summary" name="summary" rows="4" required></textarea><br>

            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required><br>

            <label for="motive">Motive:</label>
            <input type="text" id="motive" name="motive" required><br>

            <label for="image">Upload Image:</label>
            <input type="file" id="image" name="image"><br>

            <label for="url">Related URLs (comma-separated):</label>
            <input type="text" id="url" name="url"><br>

            <input type="submit" value="Submit">
        </form>
    </div>

    <script>
        // JavaScript logic (e.g., form validation) can be added here
        const submissionForm = document.getElementById('submissionForm');

        submissionForm.addEventListener('submit', function(event) {
            // Add your form submission logic here
            // You can use JavaScript to validate inputs and handle the submission
            // Prevent the default form submission to customize it with AJAX or other methods
            event.preventDefault();
        });
    </script>
</body>
</html>
);
