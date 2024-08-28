document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        responseMessage.textContent = `User created with ID: ${result.id}`;
        form.reset();

        // Show confirmation box
        const submitAnother = confirm('User submitted successfully. Do you want to submit another?');
        if (submitAnother) {
          form.reset(); // Clear form for another submission
        }
      } else {
        const error = await response.json();
        responseMessage.textContent = `Error: ${error.error}`;
      }
    } catch (error) {
      responseMessage.textContent = `Error: ${error.message}`;
    }
  });
});
