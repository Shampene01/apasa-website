// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('applicationForm');
    const submitButton = document.getElementById('submitApplication');
    const formStatus = document.createElement('div');
    formStatus.className = 'form-status';
    
    if (applicationForm) {
        applicationForm.appendChild(formStatus);
        
        applicationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            formStatus.innerHTML = '<div class="loading">Processing your application...</div>';
            
            // Collect form data
            const formData = {
                businessName: document.getElementById('businessName').value,
                contactName: document.getElementById('contactName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                propertyAddress: document.getElementById('propertyAddress').value,
                propertyType: document.getElementById('propertyType').value,
                roomCount: document.getElementById('roomCount').value,
                website: document.getElementById('website').value,
                hearAboutUs: document.getElementById('hearAboutUs').value,
                termsAccepted: document.getElementById('termsAccepted').checked
            };

            try {
                // Replace this URL with your Google Apps Script Web App URL
                const response = await fetch('https://script.google.com/macros/s/AKfycbwamdbyTJj4cwCAyysnPnf6823VFUF4J2tvz2za337FBNzxKUx_I9oirfsx_ManWP-DXw/exec', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (result.status === 'success') {
                    // Show success message
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <h3>Application Submitted Successfully!</h3>
                            <p>Thank you for applying to join APASA. We will review your application and contact you soon.</p>
                        </div>
                    `;
                    applicationForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Show error message
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
        });
    }
});
