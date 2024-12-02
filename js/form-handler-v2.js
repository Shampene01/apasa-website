// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('applicationForm');
    const submitButton = document.getElementById('submitApplication');
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
            formData.append('contactName', document.getElementById('contactName').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('propertyAddress', document.getElementById('propertyAddress').value);
            formData.append('propertyType', document.getElementById('propertyType').value);
            formData.append('roomCount', document.getElementById('roomCount').value);
            formData.append('website', document.getElementById('website').value);
            formData.append('hearAboutUs', document.getElementById('hearAboutUs').value);
            formData.append('termsAccepted', document.getElementById('termsAccepted').checked);

            // Create URL with query parameters
            const url = new URL('https://script.google.com/macros/s/AKfycbwamdbyTJj4cwCAyysnPnf6823VFUF4J2tvz2za337FBNzxKUx_I9oirfsx_ManWP-DXw/exec');
            
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
