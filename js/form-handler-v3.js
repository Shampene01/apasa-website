// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('membershipForm');
    const submitButton = document.querySelector('button[type="submit"]');
    const formStatus = document.createElement('div');
    formStatus.className = 'form-status';
    
    if (applicationForm) {
        applicationForm.appendChild(formStatus);
        
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            formStatus.innerHTML = '<div class="loading">Processing your application...</div>';
            
            // Collect form data
            const formData = new FormData();
            formData.append('businessName', document.getElementById('businessName').value);
            formData.append('registrationNumber', document.getElementById('registrationNumber').value);
            formData.append('vatNumber', document.getElementById('vatNumber').value || 'N/A');
            formData.append('businessType', document.getElementById('businessType').value);
            formData.append('contactName', document.getElementById('contactName').value);
            formData.append('position', document.getElementById('position').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('propertyAddress', document.getElementById('propertyAddress').value);
            formData.append('province', document.getElementById('province').value);
            formData.append('numberOfUnits', document.getElementById('numberOfUnits').value);
            formData.append('membershipType', document.getElementById('membershipType').value);
            formData.append('yearsInBusiness', document.getElementById('yearsInBusiness').value);
            formData.append('referralSource', document.getElementById('referralSource').value || 'Not specified');
            formData.append('comments', document.getElementById('comments').value || 'No comments');
            formData.append('termsAccepted', document.getElementById('termsAccepted').checked);

            // Create URL with query parameters
            const url = new URL('https://script.google.com/macros/s/AKfycbxL-ENwHjoGtPzwyqH1j5w1ZzgJyjjXY6NZ-mgVRe_CTebfJl4xh_TVi3dT65I74bPCxQ/exec');
            
            // Convert FormData to URL parameters
            const params = new URLSearchParams();
            for (const pair of formData) {
                params.append(pair[0], pair[1]);
            }
            url.search = params.toString();

            // Submit using JSONP approach
            const scriptElement = document.createElement('script');
            scriptElement.src = url.toString();

            // Define callback function
            window.formSubmitCallback = function(response) {
                if (response.status === 'success') {
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <h3>Application Submitted Successfully!</h3>
                            <p>Thank you for applying to join APASA. We will review your application and contact you soon.</p>
                        </div>
                    `;
                    applicationForm.reset();
                } else {
                    formStatus.innerHTML = `
                        <div class="error-message">
                            <h3>Submission Error</h3>
                            <p>There was a problem submitting your application. Please try again or contact us directly.</p>
                        </div>
                    `;
                }
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
                
                // Clean up
                document.body.removeChild(scriptElement);
                delete window.formSubmitCallback;
            };

            // Add script to page to trigger request
            document.body.appendChild(scriptElement);
        });
    }
});
