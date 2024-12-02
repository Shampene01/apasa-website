// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const submitBtn = document.querySelector('button[type="submit"]');
    const formStatus = document.createElement('div');
    formStatus.className = 'form-status';
    
    console.log('Form handler initialized');
    console.log('Form found:', !!form);
    console.log('Submit button found:', !!submitBtn);
    
    if (form) {
        form.appendChild(formStatus);
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submission started');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            formStatus.innerHTML = '<div class="loading">Processing your application...</div>';
            
            try {
                const formData = {
                    // Organization Details
                    businessName: document.getElementById('businessName').value,
                    registrationNumber: document.getElementById('registrationNumber').value,
                    vatNumber: document.getElementById('vatNumber').value || 'N/A',
                    businessType: document.getElementById('businessType').value,
                    
                    // Contact Details
                    contactName: document.getElementById('contactName').value,
                    position: document.getElementById('position').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    
                    // Property Details
                    propertyAddress: document.getElementById('propertyAddress').value,
                    province: document.getElementById('province').value,
                    numberOfUnits: document.getElementById('numberOfUnits').value,
                    
                    // Additional Information
                    membershipType: document.getElementById('membershipType').value,
                    yearsInBusiness: document.getElementById('yearsInBusiness').value,
                    referralSource: document.getElementById('referralSource').value || 'Not specified',
                    termsAccepted: document.getElementById('termsAccepted').checked,
                    submissionDate: new Date().toISOString()
                };

                console.log('Form data collected:', formData);

                const response = await fetch('https://hook.eu2.make.com/5k7qq7djy2smrtklvy57sdlqio9w1r9k', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Webhook response status:', response.status);
                
                if (response.ok) {
                    console.log('Submission successful');
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <h3>Application Submitted Successfully!</h3>
                            <p>Thank you for applying to join APASA. We will review your application and contact you soon.</p>
                        </div>
                    `;
                    form.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                formStatus.innerHTML = `
                    <div class="error-message">
                        <h3>Submission Error</h3>
                        <p>There was a problem submitting your application. Please try again or contact us directly.</p>
                    </div>
                `;
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
            }
        });
    }
});
