// =========================================
// Launchpad hackathon - Registration Form Script
// =========================================
import { app, analytics, db, auth, storage, signInAnonymously } from './firebaseConfig.js';
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';

// ===== EMAILJS INITIALIZATION =====
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
} else {
    console.warn('⚠️ EmailJS public key not configured. Confirmation emails will not be sent.');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
});

// ===== EMAIL CONFIRMATION =====
async function sendConfirmationEmail(userData) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.warn('⚠️ EmailJS not configured. Skipping confirmation email.');
        return { success: false, reason: 'not_configured' };
    }

    const templateParams = {
        to_email: userData.email,
        user_name: userData.fullName || 'Participant',
        launchpad_id: userData.registrationId,
        participation_type: userData.participationType === 'team' ? 'Team' : 'Individual',
        college_name: userData.collegeName || '',
        team_name: userData.teamName || 'N/A',
    };

    try {
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('✅ Confirmation email sent successfully:', response.status, response.text);
        return { success: true };
    } catch (error) {
        console.error('❌ Failed to send confirmation email:', error);
        return { success: false, reason: 'send_failed', error };
    }
}

// ===== SPLASH SCREEN INITIALIZATION =====
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContainer = document.getElementById('mainContainer');

    if (!splashScreen) {
        // If no splash screen, initialize form directly
        initializeForm();
        return;
    }

    // Timeline for splash screen:
    // 0s - Page fade in (handled by CSS)
    // 0.5s - Logo animation starts
    // 1.2s - Tagline fade in
    // 1.8s - Progress bar fade in
    // 2.0s - Progress bar fill animation
    // 4.5s - Progress completes
    // 5.0s - Transition to form (500ms fade out)

    // Hide splash screen and show form after 5.5s
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        // add highlight state to corner logo once splash completes
        const corner = document.querySelector('.corner-logo');
        if (corner) {
            corner.classList.add('highlight');
        }
        if (mainContainer) {
            mainContainer.style.display = 'block';
            // Trigger form initialization
            initializeForm();
        }
    }, 5500); // 5.5 seconds
}

function initializeForm() {
    // Initialize all form functionality
    setupParticipationToggle();
    setupTeamMembers();
    setupFileUpload();
    setupFormValidation();
    setupAnimations();
    setupCamera();
}

// ===== PARTICIPATION TYPE TOGGLE =====
function setupParticipationToggle() {
    const individualRadio = document.getElementById('individual');
    const teamRadio = document.getElementById('team');
    const teamDetails = document.getElementById('teamDetails');

    if (!individualRadio || !teamRadio || !teamDetails) return;

    const updateTeamVisibility = () => {
        if (teamRadio.checked) {
            teamDetails.classList.remove('hidden');
            // Make team fields required
            setTeamFieldsRequired(true);
        } else {
            teamDetails.classList.add('hidden');
            // Remove required from team fields
            setTeamFieldsRequired(false);
            // Clear team fields
            clearTeamFields();
        }
    };

    individualRadio.addEventListener('change', updateTeamVisibility);
    teamRadio.addEventListener('change', updateTeamVisibility);
}

function setTeamFieldsRequired(required) {
    const teamFields = ['teamName', 'teamSize', 'leaderName', 'leaderEmail'];
    teamFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.required = required;
        }
    });
}

function clearTeamFields() {
    const teamFields = ['teamName', 'teamSize', 'leaderName', 'leaderEmail'];
    teamFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) field.value = '';
    });

    // Clear team members
    const membersList = document.getElementById('teamMembersList');
    if (membersList) membersList.innerHTML = '';
}

// ===== TEAM MEMBERS MANAGEMENT =====
let memberCount = 0;

function setupTeamMembers() {
    const addMemberBtn = document.getElementById('addMemberBtn');
    const teamSizeSelect = document.getElementById('teamSize');

    if (!addMemberBtn) return;

    // Initialize phone input restrictions for existing fields
    setupPhoneInputRestrictions();

    addMemberBtn.addEventListener('click', () => {
        const maxMembers = parseInt(teamSizeSelect?.value) || 5;
        // Account for team leader (registrant is leader, so add members = maxMembers - 1)
        if (memberCount < maxMembers - 1) {
            addTeamMember();
        } else {
            showToast('Maximum team members reached based on selected team size.', 'warning');
        }
    });

    // Update max members when team size changes
    if (teamSizeSelect) {
        teamSizeSelect.addEventListener('change', () => {
            const maxMembers = parseInt(teamSizeSelect.value) || 5;
            // Remove excess members if team size decreased
            while (memberCount > maxMembers - 1) {
                removeLastTeamMember();
            }
        });
    }
}

function setupPhoneInputRestrictions() {
    document.body.addEventListener('input', (e) => {
        if (e.target.type === 'tel') {
            const input = e.target;
            // Remove any non-numeric characters
            const originalValue = input.value;
            const numericValue = originalValue.replace(/[^0-9]/g, '');

            // Limit to 10 digits
            const truncatedValue = numericValue.slice(0, 10);

            if (originalValue !== truncatedValue) {
                input.value = truncatedValue;
            }
        }
    });
}

function addTeamMember() {
    memberCount++;
    const membersList = document.getElementById('teamMembersList');

    const memberCard = document.createElement('div');
    memberCard.className = 'team-member-card';
    memberCard.id = `member-${memberCount}`;
    memberCard.innerHTML = `
        <div class="member-header">
            <span class="member-number">Team Member ${memberCount}</span>
            <button type="button" class="remove-member" onclick="removeMember(${memberCount})">✕</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Name <span class="required">*</span></label>
                <input type="text" name="member${memberCount}_name" class="form-input" placeholder="Member's full name" required>
            </div>
            <div class="form-group">
                <label class="form-label">Mobile Number <span class="required">*</span></label>
                <input type="tel" name="member${memberCount}_mobile" class="form-input" placeholder="+91 XXXXX XXXXX" required maxlength="10" inputmode="numeric">
            </div>
            <div class="form-group">
                <label class="form-label">Email ID <span class="required">*</span></label>
                <input type="email" name="member${memberCount}_email" class="form-input" placeholder="member@example.com" required>
            </div>
            <div class="form-group">
                <label class="form-label">LinkedIn <span class="required">*</span></label>
                <input type="url" name="member${memberCount}_linkedin" class="form-input" placeholder="https://linkedin.com/in/..." required>
            </div>
        </div>
    `;

    membersList.appendChild(memberCard);
}

function removeMember(id) {
    const memberCard = document.getElementById(`member-${id}`);
    if (memberCard) {
        memberCard.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            memberCard.remove();
            memberCount--;
            updateMemberNumbers();
        }, 300);
    }
}

function removeLastTeamMember() {
    const membersList = document.getElementById('teamMembersList');
    if (membersList && membersList.lastChild) {
        membersList.lastChild.remove();
        memberCount--;
    }
}

function updateMemberNumbers() {
    const memberCards = document.querySelectorAll('.team-member-card');
    memberCards.forEach((card, index) => {
        const numberSpan = card.querySelector('.member-number');
        if (numberSpan) {
            numberSpan.textContent = `Team Member ${index + 1}`;
        }
    });
}

// Make removeMember globally accessible
window.removeMember = removeMember;

// ===== FILE UPLOAD =====
function setupFileUpload() {
    const fileInput = document.getElementById('collegeId');
    const filePreview = document.getElementById('filePreview');
    const uploadBox = document.querySelector('.file-upload-box');

    if (!fileInput || !filePreview) return;

    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    if (uploadBox) {
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'var(--electric-blue)';
            uploadBox.style.background = 'rgba(0, 169, 255, 0.1)';
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            uploadBox.style.background = 'rgba(255, 255, 255, 0.03)';
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            uploadBox.style.background = 'rgba(255, 255, 255, 0.03)';

            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileSelect({ target: fileInput });
            }
        });
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const filePreview = document.getElementById('filePreview');
    const uploadBox = document.querySelector('.file-upload-box');

    if (!file) {
        filePreview.classList.remove('active');
        filePreview.innerHTML = '';
        if (uploadBox) uploadBox.style.display = 'block';
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be less than 5MB', 'error');
        event.target.value = '';
        return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        showToast('Please upload a valid image (JPG, PNG) or PDF file', 'error');
        event.target.value = '';
        return;
    }

    // Show preview
    const fileSize = formatFileSize(file.size);

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            filePreview.innerHTML = `
                <img src="${e.target.result}" alt="ID Preview">
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${fileSize}</span>
                </div>
                <span class="remove-file" onclick="clearFileInput()">✕</span>
            `;
            filePreview.classList.add('active');
            if (uploadBox) uploadBox.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        filePreview.innerHTML = `
            <span style="font-size: 2rem;">📄</span>
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${fileSize}</span>
            </div>
            <span class="remove-file" onclick="clearFileInput()">✕</span>
        `;
        filePreview.classList.add('active');
        if (uploadBox) uploadBox.style.display = 'none';
    }
}

function clearFileInput() {
    const fileInput = document.getElementById('collegeId');
    const filePreview = document.getElementById('filePreview');
    const uploadBox = document.querySelector('.file-upload-box');

    if (fileInput) fileInput.value = '';
    if (filePreview) {
        filePreview.classList.remove('active');
        filePreview.innerHTML = '';
    }
    if (uploadBox) uploadBox.style.display = 'block';
}

window.clearFileInput = clearFileInput;

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', handleSubmit);
}

function validateField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Check if field is visible and required
    if (field.closest('.hidden')) {
        return true; // Skip validation for hidden fields
    }

    const value = field.value.trim();

    if (field.required && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && value) {
        // Basic email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    } else if (field.type === 'tel' && value) {
        // Strict 10-digit phone number validation
        const phoneRegex = /^\d{10}$/;
        // Remove spaces and dashes before checking
        const cleanNumber = value.replace(/[-\s]/g, '');
        if (!phoneRegex.test(cleanNumber)) {
            isValid = false;
            message = 'Please enter a valid 10-digit mobile number';
        } else if (field.value !== cleanNumber) {
            // Optional: Auto-format or just accept clean number?
            // For now, let's just accept if it cleans to 10 digits, or enforce user types only digits.
            // But the prompt said "all numbers should 10 numbers only".
            // Let's enforce strict input to avoid ambiguity if possible, or just validate the clean version.
            // If the user meant "input should only accept 10 numbers", that's an input mask.
            // The validation check here ensures the final value is 10 digits.
        }
    } else if (field.type === 'url' && value) {
        try {
            const url = new URL(value);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                isValid = false;
                message = 'URL must start with http:// or https://';
            }

            // LinkedIn-specific validation
            if (field.id === 'linkedin' || field.name?.includes('linkedin')) {
                const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i;
                if (!linkedInPattern.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)';
                }
            }
        } catch {
            isValid = false;
            message = 'Please enter a valid URL (include http:// or https://)';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.add('visible');
        }
    } else {
        field.classList.remove('error');
        if (errorMessage) {
            errorMessage.textContent = '';
            errorMessage.classList.remove('visible');
        }
    }

    return isValid;
}

async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    let isValid = true;

    // Validate all visible required fields
    const visibleInputs = form.querySelectorAll('.form-input:not(:disabled), .form-select:not(:disabled), .form-textarea:not(:disabled)');
    visibleInputs.forEach(input => {
        if (!input.closest('.hidden')) {
            if (!validateField(input)) {
                isValid = false;
            }
        }
    });

    // Validate checkboxes
    const requiredCheckboxes = form.querySelectorAll('.consent-checkbox[required]');
    requiredCheckboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            isValid = false;
            showToast('Please agree to all required terms and conditions', 'error');
        }
    });

    // Validate radio buttons
    const participationType = form.querySelector('input[name="participationType"]:checked');
    if (!participationType) {
        isValid = false;
        showToast('Please select a participation type', 'error');
    }

    const photoConsent = form.querySelector('input[name="photoConsent"]:checked');
    if (!photoConsent) {
        isValid = false;
        showToast('Please select your photo/video consent preference', 'error');
    }


    // Validate College ID Card upload (mandatory)
    const collegeIdInput = document.getElementById('collegeId');
    if (!collegeIdInput || !collegeIdInput.files || collegeIdInput.files.length === 0) {
        isValid = false;
        showToast('Please upload your College ID Card', 'error');
        // Show error on the field
        const collegeIdError = collegeIdInput?.parentElement?.parentElement?.querySelector('.error-message');
        if (collegeIdError) {
            collegeIdError.textContent = 'College ID Card is required';
            collegeIdError.classList.add('visible');
        }
    }

    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Checking...</span>';

        try {
            // Check for duplicate email and mobile
            const emailInput = form.querySelector('#email').value;
            const mobileInput = form.querySelector('#mobile').value;

            // Query for existing email
            const emailQuery = query(collection(db, 'registrations'), where('email', '==', emailInput));
            const emailSnapshot = await getDocs(emailQuery);

            if (!emailSnapshot.empty) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showDuplicateModal('email', emailInput);
                return;
            }

            // Query for existing mobile
            const mobileQuery = query(collection(db, 'registrations'), where('mobile', '==', mobileInput));
            const mobileSnapshot = await getDocs(mobileQuery);

            if (!mobileSnapshot.empty) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showDuplicateModal('mobile', mobileInput);
                return;
            }

            // Update loading text
            submitBtn.innerHTML = '<span class="btn-text">Uploading ID...</span>';

            // Get collegeId element for file info
            const collegeId = document.getElementById('collegeId');
            const file = collegeId?.files[0];

            let collegeIdUrl = '';
            let collegeIdFileName = '';

            // Upload file to Firebase Storage if present
            if (file) {
                try {
                    // Sign in anonymously to satisfy storage rules
                    await signInAnonymously(auth);

                    // Create unique filename with timestamp
                    const timestamp = Date.now();
                    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                    const storagePath = `college-ids/${timestamp}_${sanitizedFileName}`;

                    // Upload file
                    const storageRef = ref(storage, storagePath);
                    const uploadResult = await uploadBytes(storageRef, file);

                    // Get download URL
                    collegeIdUrl = await getDownloadURL(uploadResult.ref);
                    collegeIdFileName = file.name;

                    console.log('File uploaded successfully:', collegeIdUrl);
                } catch (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    showToast('Failed to upload ID card. Please try again.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    return;
                }
            }

            // Update loading text
            submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';

            // Collect form data properly
            const data = {
                // Personal Information
                fullName: form.querySelector('#fullName')?.value || '',
                email: form.querySelector('#email')?.value || '',
                mobile: form.querySelector('#mobile')?.value || '',
                altMobile: form.querySelector('#altMobile')?.value || '',
                parentName: form.querySelector('#parentName')?.value || '',
                parentMobile: form.querySelector('#parentMobile')?.value || '',

                // College Information
                collegeName: form.querySelector('#collegeName')?.value || '',
                collegeLocation: form.querySelector('#collegeLocation')?.value || '',
                institutionType: form.querySelector('input[name="institutionType"]:checked')?.value || '',
                department: form.querySelector('#department')?.value || '',
                yearOfStudy: form.querySelector('#yearOfStudy')?.value || '',

                // Participation Type
                participationType: participationType?.value || '',

                // Social Links
                linkedin: form.querySelector('#linkedin')?.value || '',
                portfolio: form.querySelector('#portfolio')?.value || '',
                github: form.querySelector('#github')?.value || '',

                // Additional Information
                hearAbout: form.querySelector('#hearAbout')?.value || '',
                specialRequirements: form.querySelector('#specialRequirements')?.value || '',

                // Consent
                photoConsent: photoConsent?.value || '',
                termsAccepted: form.querySelector('#termsCheckbox')?.checked || false,
                codeOfConductAccepted: form.querySelector('#codeOfConductCheckbox')?.checked || false,

                // Timestamp
                timestamp: serverTimestamp(),

                // College ID file info - now with download URL
                collegeIdFileName: collegeIdFileName,
                collegeIdUrl: collegeIdUrl
            };

            // Add team-specific data if team participation
            if (participationType?.value === 'team') {
                data.teamName = form.querySelector('#teamName')?.value || '';
                data.teamSize = form.querySelector('#teamSize')?.value || '';
                data.leaderName = form.querySelector('#leaderName')?.value || '';
                data.leaderEmail = form.querySelector('#leaderEmail')?.value || '';

                // Collect team members
                const teamMembers = [];
                const memberCards = document.querySelectorAll('.team-member-card');
                memberCards.forEach((card, index) => {
                    const memberNum = index + 1;
                    const member = {
                        name: form.querySelector(`[name="member${memberNum}_name"]`)?.value || '',
                        mobile: form.querySelector(`[name="member${memberNum}_mobile"]`)?.value || '',
                        email: form.querySelector(`[name="member${memberNum}_email"]`)?.value || '',
                        linkedin: form.querySelector(`[name="member${memberNum}_linkedin"]`)?.value || ''
                    };
                    if (member.name) { // Only add if member has a name
                        teamMembers.push(member);
                    }
                });
                data.teamMembers = teamMembers;
            }

            // Generate Unique Registration ID (this IS the Launchpad ID)
            const querySnapshot = await getDocs(collection(db, 'registrations'));
            const currentCount = querySnapshot.size;
            const nextCount = currentCount + 1;
            const registrationId = `Launch-${String(nextCount).padStart(3, '0')}`;

            // Add ID to data object
            data.registrationId = registrationId;
            data.emailSent = false; // Track email delivery

            // Save to Firestore
            const docRef = await addDoc(collection(db, 'registrations'), data);

            console.log('Registration saved successfully with ID:', docRef.id, 'RegID:', registrationId);

            // Show success modal with Launchpad ID
            showSuccessModal(registrationId, data.email);

            // Update button to final state
            submitBtn.innerHTML = '<span class="btn-text">Submitted</span>';

            // Send confirmation email asynchronously (non-blocking)
            sendConfirmationEmail({
                email: data.email,
                fullName: data.fullName,
                registrationId: registrationId,
                participationType: data.participationType,
                collegeName: data.collegeName,
                teamName: data.teamName || '',
            }).catch(err => {
                console.error('📧 Email sending error (non-blocking):', err);
            });

        } catch (error) {
            console.error('Error saving registration:', error);
            showToast('Failed to submit registration. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
}

// ===== SUCCESS MODAL =====
function showSuccessModal(regId) {
    const modal = document.getElementById('successModal');
    const regIdDisplay = document.getElementById('successRegId');

    if (regId && regIdDisplay) {
        regIdDisplay.textContent = regId;
        regIdDisplay.style.color = 'var(--electric-blue)';
    }

    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Trigger confetti explosion
        createConfettiExplosion();
    }
}

// ===== CONFETTI ANIMATION =====
function createConfettiExplosion() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;

    // Clear any existing confetti
    confettiContainer.innerHTML = '';

    const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6', '#f97316', '#ec4899', '#06b6d4'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[i % colors.length];
        confetti.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Vary confetti shapes
        if (Math.random() > 0.5) {
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.borderRadius = '50%';
        }

        confettiContainer.appendChild(confetti);
    }

    // Clean up confetti after animation completes
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 6000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';

        // Reset form
        const form = document.getElementById('registrationForm');
        if (form) {
            form.reset();

            // Reset submit button
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span class="btn-text">Register Now</span>
                    <span class="btn-icon-right">🚀</span>
                    <div class="btn-glow"></div>
                `;
            }
        }

        // Clear team members
        const membersList = document.getElementById('teamMembersList');
        if (membersList) membersList.innerHTML = '';
        memberCount = 0;

        // Hide team details
        const teamDetails = document.getElementById('teamDetails');
        if (teamDetails) teamDetails.classList.add('hidden');

        // Clear file preview
        clearFileInput();
    }
}

window.closeModal = closeModal;

// ===== DUPLICATE DETECTION MODAL =====
function showDuplicateModal(type, value) {
    // Create modal container
    const modalHTML = `
        <div id="duplicateModal" class="modal" style="z-index: 2000;">
            <div class="modal-content" style="
                max-width: 500px;
                background: linear-gradient(145deg, rgba(30, 20, 40, 0.98), rgba(20, 15, 30, 0.98));
                border: 2px solid;
                border-image: linear-gradient(135deg, var(--bright-red), var(--electric-blue)) 1;
                border-radius: 20px;
                padding: 2.5rem;
                text-align: center;
                box-shadow: 0 0 60px rgba(255, 8, 68, 0.4), 0 0 40px rgba(0, 169, 255, 0.3);
                animation: shakeModal 0.5s ease-in-out;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
                <h2 style="
                    font-size: 1.8rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, var(--bright-red), var(--electric-blue));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                ">Registration Already Exists!</h2>
                <p style="
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 0.5rem;
                ">This ${type === 'email' ? 'email address' : 'phone number'} is already registered:</p>
                <p style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--electric-blue);
                    margin-bottom: 1.5rem;
                ">${value}</p>
                <p style="
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 2rem;
                ">Please use a different ${type === 'email' ? 'email address' : 'phone number'} or contact support if you believe this is an error.</p>
                <button onclick="closeDuplicateModal()" style="
                    background: linear-gradient(135deg, var(--bright-red), var(--electric-blue));
                    border: none;
                    border-radius: 12px;
                    padding: 0.875rem 2rem;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0, 169, 255, 0.5)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                    Got it
                </button>
            </div>
        </div>
    `;

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shakeModal {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
            20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
    `;
    document.head.appendChild(style);

    // Insert modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

window.closeDuplicateModal = function () {
    const modal = document.getElementById('duplicateModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};


// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        background: ${type === 'error' ? 'var(--error)' : type === 'warning' ? 'var(--warning)' : 'var(--success)'};
        color: white;
        border-radius: 50px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideUp 0.3s ease-out;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.form-section').forEach(section => {
        observer.observe(section);
    });
}

// ===== THEME SWITCHING (Optional Enhancement) =====
// This can be used to switch themes based on user selection
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);

    // Update orb colors based on theme
    const orbRed = document.querySelector('.orb-red');
    const orbBlue = document.querySelector('.orb-blue');

    if (theme === 'fire') {
        orbBlue.style.background = 'radial-gradient(circle, var(--bright-red) 0%, transparent 70%)';
    } else if (theme === 'ice') {
        orbRed.style.background = 'radial-gradient(circle, var(--electric-blue) 0%, transparent 70%)';
    } else {
        // Reset to dual theme
        if (orbRed) orbRed.style.background = '';
        if (orbBlue) orbBlue.style.background = '';
    }
}

window.setTheme = setTheme;

/* ===== CAMERA FUNCTIONALITY ===== */
let stream = null;

function setupCamera() {
    const startCameraBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('captureBtn');

    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', openCameraModal);
    }

    if (captureBtn) {
        captureBtn.addEventListener('click', takePhoto);
    }
}

function openCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
        modal.classList.remove('hidden');
        startCamera();
        document.body.style.overflow = 'hidden';
    }
}

function closeCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
        modal.classList.add('hidden');
        stopCamera();
        document.body.style.overflow = '';
    }
}

// Make globally available
window.closeCameraModal = closeCameraModal;

async function startCamera() {
    const video = document.getElementById('cameraStream');
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" }
            },
            audio: false
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing camera:", err);
        showToast("Could not access camera. Please check permissions.", "error");
        closeCameraModal();
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

function takePhoto() {
    const video = document.getElementById('cameraStream');
    const canvas = document.getElementById('cameraCanvas');
    const fileInput = document.getElementById('collegeId');

    if (!video || !canvas) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw frame
    const context = canvas.getContext('2d');

    // Draw what the camera sees
    // Note: The preview uses transform: scaleX(-1) in CSS for mirroring effect often desired on front cams
    // But for ID cards (text), mirroring is bad. We removed the mirror CSS for 'environment' mode usually.
    // But in my CSS I added `transform: scaleX(-1)`. 
    // If the user uses the rear camera, mirroring makes text unreadable.
    // I should probably remove the CSS mirroring if I want to support ID cards text readability.
    // Or I should toggle it based on camera type.
    // For now, since I hardcoded scaleX(-1), I really should revert that if I want text to be readable!
    // ID cards have text. Mirroring them is bad. 
    // I will remove the scaleX(-1) from the logic or context.
    // Actually, I should probably remove it from the CSS or just flip the canvas context if needed.
    // Let's fix the CSS in a separate step or just handle it here. 
    // I will remove the CSS styling for scaleX(-1) in the next step to be safe, 
    // OR I can just flip the canvas drawing if I wanted to keep the preview mirrored (which is weird for rear camera).
    // The previous CSS step added: #cameraStream { transform: scaleX(-1); }
    // This is bad for ID cards. I should correct this.

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to file
    canvas.toBlob((blob) => {
        const file = new File([blob], "id-card-capture.jpg", { type: "image/jpeg" });

        // Use DataTransfer to set the file input files
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // Trigger handleFileSelect
        handleFileSelect({ target: fileInput });

        // Close modal
        closeCameraModal();
        showToast("Photo captured successfully!", "success");
    }, 'image/jpeg', 0.95);
}

// ===== PDF VIEWER MODAL =====
function openPDFViewer(event) {
    event.preventDefault();
    event.stopPropagation();

    const card = event.target.closest('.resource-card');
    const pdfPath = card?.dataset.file;

    if (!pdfPath) {
        console.error('PDF path not found');
        return;
    }

    const modal = document.getElementById('pdfViewerModal');
    const pdfObject = document.getElementById('pdfViewerObject');
    const downloadBtn = document.getElementById('pdfDownloadBtn');
    const fallbackLink = document.getElementById('pdfFallbackLink');

    if (modal && pdfObject) {
        // Set object data
        pdfObject.data = pdfPath;

        // Update fallback link just in case
        if (fallbackLink) {
            fallbackLink.href = pdfPath;
            fallbackLink.download = 'BRISTLETECH-LAUNCHPAD-HACKATHON.pdf';
        }

        // Set download button
        if (downloadBtn) {
            downloadBtn.href = pdfPath;
            downloadBtn.download = 'BRISTLETECH-LAUNCHPAD-HACKATHON.pdf';
        }

        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closePDFViewer() {
    const modal = document.getElementById('pdfViewerModal');
    const pdfObject = document.getElementById('pdfViewerObject');

    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';

        // Clear object data to stop loading
        if (pdfObject) {
            pdfObject.data = '';
        }
    }
}

// Make functions globally accessible
window.openPDFViewer = openPDFViewer;
window.closePDFViewer = closePDFViewer;
