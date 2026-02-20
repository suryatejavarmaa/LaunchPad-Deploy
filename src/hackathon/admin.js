// =========================================
// ADMIN DASHBOARD - JavaScript
// =========================================
import { db, auth } from './firebaseConfig.js';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    getDoc,
    deleteDoc
} from 'firebase/firestore';

// State
let registrations = [];
let filteredRegistrations = [];
let currentUser = null;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const adminUserEmail = document.getElementById('adminUserEmail');
const searchInput = document.getElementById('searchInput');
// Custom Dropdown Elements
const filterDropdown = document.getElementById('filterDropdown');
const dropdownSelected = filterDropdown.querySelector('.dropdown-selected');
const dropdownOptions = filterDropdown.querySelector('.dropdown-options');
const dropdownOptionItems = filterDropdown.querySelectorAll('.dropdown-option');
const selectedFilterText = document.getElementById('selectedFilterText');
let currentFilterValue = 'all';
const exportCSV = document.getElementById('exportCSV');
const exportJSON = document.getElementById('exportJSON');
const tableBody = document.getElementById('tableBody');

// Stats elements
const totalRegistrations = document.getElementById('totalRegistrations');
const individualCount = document.getElementById('individualCount');
const teamCount = document.getElementById('teamCount');
const totalParticipants = document.getElementById('totalParticipants');

// Password Toggle Logic
const togglePassword = document.getElementById('togglePassword');
const adminPassword = document.getElementById('adminPassword');

if (togglePassword && adminPassword) {
    togglePassword.addEventListener('click', () => {
        const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        adminPassword.setAttribute('type', type);

        // Toggle Icon
        if (type === 'text') {
            togglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        } else {
            togglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        }
    });
}

// ===== AUTHENTICATION =====

// Check auth state on load
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Check if user is admin
        const isAdmin = await checkAdminRole(user);
        if (isAdmin) {
            currentUser = user;
            showDashboard();
            loadRegistrations();
        } else {
            await signOut(auth);
            showError('Access denied. Admin privileges required.');
            showLogin();
        }
    } else {
        showLogin();
    }
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
        loginError.textContent = '';

        // Show loading state
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Check admin role
        const isAdmin = await checkAdminRole(userCredential.user);
        if (!isAdmin) {
            await signOut(auth);
            showError('Access denied. Admin privileges required.');
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            submitBtn.style.cursor = '';
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(getErrorMessage(error.code));
        // Reset button state on error
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.style.cursor = '';
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        showLogin();
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// Check if user has admin role
async function checkAdminRole(user) {
    try {
        console.log('Checking admin role for:', user.email);

        // Check if user document has admin role in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log('User document exists:', userDoc.exists());

        if (userDoc.exists() && userDoc.data().role === 'admin') {
            console.log('User has admin role in Firestore');
            return true;
        }

        // Fallback: check if email is in admin list
        // You can configure this in Firebase Console or use custom claims
        const adminEmails = ['admin@hackathon.com', 'admin@example.com', 'hackathon2026@gmail.com'];
        const isAdminEmail = adminEmails.includes(user.email);
        console.log('Checking email list. Is admin:', isAdminEmail);
        return isAdminEmail;
    } catch (error) {
        console.error('Error checking admin role:', error);
        return false;
    }
}

function showLogin() {
    loginScreen.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
    loginForm.reset();
    loginError.textContent = '';
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
    if (currentUser) {
        adminUserEmail.textContent = currentUser.email;
    }
}

function showError(message) {
    loginError.textContent = message;
}

function getErrorMessage(code) {
    switch (code) {
        case 'auth/invalid-email':
            return 'Invalid email address';
        case 'auth/user-disabled':
            return 'This account has been disabled';
        case 'auth/user-not-found':
            return 'No account found with this email';
        case 'auth/wrong-password':
            return 'Incorrect password';
        case 'auth/invalid-credential':
            return 'Invalid email or password';
        default:
            return 'Login failed. Please try again.';
    }
}

// ===== DATA LOADING =====

function loadRegistrations() {
    // Real-time listener for registrations collection
    const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));

    onSnapshot(q, (snapshot) => {
        registrations = [];
        snapshot.forEach((doc) => {
            registrations.push({
                id: doc.id,
                ...doc.data()
            });
        });

        filteredRegistrations = [...registrations];
        updateStats();
        renderTable();
    }, (error) => {
        console.error('Error loading registrations:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--error);">
                    Error loading data. Please refresh the page.
                </td>
            </tr>
        `;
    });
}

// ===== STATISTICS =====

function updateStats() {
    const total = registrations.length;
    const individual = registrations.filter(r => r.participationType === 'individual').length;
    const teams = registrations.filter(r => r.participationType === 'team').length;

    // Calculate total participants (individuals + team members)
    let participants = individual;
    registrations.forEach(r => {
        if (r.participationType === 'team' && r.teamSize) {
            participants += parseInt(r.teamSize) || 0;
        }
    });

    totalRegistrations.textContent = total;
    individualCount.textContent = individual;
    teamCount.textContent = teams;
    totalParticipants.textContent = participants;
}

// ===== TABLE RENDERING =====

function renderTable() {
    if (filteredRegistrations.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No registrations found
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filteredRegistrations.map(reg => `
        <tr>
            <td style="font-weight: 600; color: var(--electric-blue);">${escapeHtml(reg.registrationId || 'N/A')}</td>
            <td>${formatDate(reg.timestamp)}</td>
            <td>${escapeHtml(reg.fullName || 'N/A')}</td>
            <td>${escapeHtml(reg.email || 'N/A')}</td>
            <td>${escapeHtml(reg.mobile || 'N/A')}</td>
            <td>${escapeHtml(reg.collegeName || 'N/A')}</td>
            <td>
                <span class="type-badge type-${reg.participationType}">
                    ${reg.participationType === 'individual' ? '👤 Individual' : '👥 Team'}
                </span>
            </td>
            <td>${escapeHtml(reg.teamName || '-')}</td>
            <td>
                <button class="view-btn" onclick="viewDetails('${reg.id}')">View</button>
                <button class="delete-btn" onclick="deleteRegistration('${reg.id}', '${reg.registrationId || 'N/A'}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// ===== SEARCH & FILTER =====

searchInput.addEventListener('input', applyFilters);

// Custom Dropdown Logic
dropdownSelected.addEventListener('click', (e) => {
    e.stopPropagation();
    filterDropdown.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!filterDropdown.contains(e.target)) {
        filterDropdown.classList.remove('open');
    }
});

// Handle Option Click
dropdownOptionItems.forEach(option => {
    option.addEventListener('click', () => {
        // Update selected state
        dropdownOptionItems.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        // Update text and value
        selectedFilterText.textContent = option.textContent;
        currentFilterValue = option.getAttribute('data-value');

        // Close dropdown
        filterDropdown.classList.remove('open');

        // Apply filters
        applyFilters();
    });
});

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeFilter = currentFilterValue;

    filteredRegistrations = registrations.filter(reg => {
        // Type filter
        if (typeFilter !== 'all' && reg.participationType !== typeFilter) {
            return false;
        }

        // Search filter
        if (searchTerm) {
            const searchableFields = [
                reg.fullName,
                reg.email,
                reg.mobile,
                reg.collegeName,
                reg.teamName,
                reg.department,
                reg.university
            ].map(field => (field || '').toLowerCase());

            return searchableFields.some(field => field.includes(searchTerm));
        }

        return true;
    });

    renderTable();
}

// ===== EXPORT FUNCTIONALITY =====

exportCSV.addEventListener('click', () => {
    const csv = convertToCSV(filteredRegistrations);
    downloadFile(csv, 'registrations.csv', 'text/csv');
});

exportJSON.addEventListener('click', () => {
    const json = JSON.stringify(filteredRegistrations, null, 2);
    downloadFile(json, 'registrations.json', 'application/json');
});

function convertToCSV(data) {
    if (data.length === 0) return '';

    const headers = [
        'Reg ID', 'Timestamp', 'Name', 'Email', 'Mobile', 'Alt Mobile',
        'Parent Name', 'Parent Mobile',
        'College', 'Location', 'University', 'Department', 'Year',
        'Type', 'Team Name', 'Team Size', 'Leader Name', 'Leader Email',
        'Team Member Details',
        'LinkedIn', 'Portfolio', 'GitHub', 'Hear About', 'Special Requirements'
    ];

    const rows = data.map(reg => [
        reg.registrationId || 'N/A',
        formatDate(reg.timestamp),
        reg.fullName || '',
        reg.email || '',
        reg.mobile || '',
        reg.altMobile || '',
        reg.parentName || '',
        reg.parentMobile || '',
        reg.collegeName || '',
        reg.collegeLocation || '',
        reg.university || '',
        reg.department || '',
        reg.yearOfStudy || '',
        reg.participationType || '',
        reg.teamName || '',
        reg.teamSize || '',
        reg.leaderName || '',
        reg.leaderEmail || '',
        reg.teamMembers ? reg.teamMembers.map(m => `${m.name} (${m.email || 'No Email'}, ${m.mobile || 'No Mobile'}, ${m.linkedin || 'No LinkedIn'})`).join(' | ') : '',
        reg.linkedin || '',
        reg.portfolio || '',
        reg.github || '',
        reg.hearAbout || '',
        reg.specialRequirements || ''
    ].map(field => `"${String(field).replace(/"/g, '""')}"`));

    return [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== 3D PROFILE CARD MODAL =====

// Tilt Engine State
let tiltActive = false;
let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
let tiltRafId = null;

// Helper functions for tilt
const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

function setCardVars(x, y) {
    const modal = document.getElementById('detailsModal');
    const card = document.getElementById('pcCard');
    if (!modal || !card) return;

    const width = card.clientWidth || 1;
    const height = card.clientHeight || 1;

    const percentX = clamp((100 / width) * x);
    const percentY = clamp((100 / height) * y);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 6))}deg`,
        '--rotate-y': `${round(centerY / 5)}deg`
    };

    for (const [k, v] of Object.entries(properties)) {
        modal.style.setProperty(k, v);
    }
}

function tiltStep(ts) {
    if (!tiltActive) return;

    const k = 0.12;
    currentX += (targetX - currentX) * k;
    currentY += (targetY - currentY) * k;

    setCardVars(currentX, currentY);

    const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
    if (stillFar) {
        tiltRafId = requestAnimationFrame(tiltStep);
    }
}

function startTiltLoop() {
    if (tiltActive) return;
    tiltActive = true;
    tiltRafId = requestAnimationFrame(tiltStep);
}

function stopTiltLoop() {
    tiltActive = false;
    if (tiltRafId) {
        cancelAnimationFrame(tiltRafId);
        tiltRafId = null;
    }
}

window.viewDetails = function (id) {
    const reg = registrations.find(r => r.id === id);
    if (!reg) return;

    const modal = document.getElementById('detailsModal');
    const card = document.getElementById('pcCard');
    const wrapper = document.getElementById('pcCardWrapper');

    // Populate card data
    document.getElementById('pcRegId').textContent = reg.registrationId || 'N/A';
    document.getElementById('pcUserName').textContent = reg.fullName || 'Unknown';
    document.getElementById('pcUserTitle').textContent = `${reg.collegeName || ''} • ${reg.department || ''}`;

    // Avatar - use first letter or emoji
    const avatarEl = document.getElementById('pcAvatar');
    const firstLetter = (reg.fullName || 'U').charAt(0).toUpperCase();
    avatarEl.innerHTML = `<span style="font-size: 3rem; background: linear-gradient(135deg, var(--bright-red), var(--electric-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${firstLetter}</span>`;

    // Type badge
    const typeBadge = document.getElementById('pcTypeBadge');
    typeBadge.innerHTML = `
        <span class="type-badge type-${reg.participationType}">
            ${reg.participationType === 'individual' ? '👤 Individual' : '👥 Team'}
        </span>
    `;

    // Details grid
    const detailsGrid = document.getElementById('pcDetailsGrid');
    let detailsHTML = '';

    const details = [
        { label: '📅 Registered', value: formatDate(reg.timestamp) },
        { label: '📧 Email', value: reg.email },
        { label: '📱 Mobile', value: reg.mobile },
        { label: '👨‍👩‍👦 Parent Name', value: reg.parentName },
        { label: '📞 Parent WhatsApp', value: reg.parentMobile },
        { label: '🎓 Institution', value: reg.collegeName },
        { label: '🏛️ Inst. Type', value: reg.institutionType ? (reg.institutionType === 'university' ? 'University' : 'Autonomous College') : null },
        { label: '🎯 Department', value: reg.department },
        { label: '📚 Year', value: reg.yearOfStudy ? `Year ${reg.yearOfStudy}` : null }
    ];

    if (reg.participationType === 'team') {
        details.push(
            { label: '👥 Team Name', value: reg.teamName },
            { label: '📊 Team Size', value: reg.teamSize },
            { label: '👑 Leader', value: reg.leaderName },
            { label: '✉️ Leader Email', value: reg.leaderEmail }
        );
    }

    // Social Links
    if (reg.linkedin) {
        details.push({ label: '💼 LinkedIn', value: `<a href="${escapeHtml(reg.linkedin)}" target="_blank">View Profile →</a>` });
    }
    if (reg.portfolio) {
        details.push({ label: '🌐 Portfolio', value: `<a href="${escapeHtml(reg.portfolio)}" target="_blank">Visit Site →</a>` });
    }
    if (reg.github) {
        details.push({ label: '🐙 GitHub', value: `<a href="${escapeHtml(reg.github)}" target="_blank">View Repos →</a>` });
    }

    details.forEach(d => {
        if (d.value) {
            detailsHTML += `
                <div class="pc-detail-item">
                    <span class="pc-detail-label">${d.label}</span>
                    <span class="pc-detail-value">${d.value.includes('<a') ? d.value : escapeHtml(d.value)}</span>
                </div>
            `;
        }
    });

    detailsGrid.innerHTML = detailsHTML;

    // Team members section
    const teamSection = document.getElementById('pcTeamSection');
    const teamMembersEl = document.getElementById('pcTeamMembers');

    if (reg.participationType === 'team' && reg.teamMembers && reg.teamMembers.length > 0) {
        teamSection.classList.remove('hidden');
        let membersHTML = '';
        reg.teamMembers.forEach((member, i) => {
            membersHTML += `
                <div class="pc-team-member">
                    <div class="pc-team-member-name">${i + 1}. ${escapeHtml(member.name || 'Member')}</div>
                    <div class="pc-team-member-details">
                        ${member.email ? `📧 ${escapeHtml(member.email)}` : ''}
                        ${member.mobile ? ` • 📱 ${escapeHtml(member.mobile)}` : ''}
                        ${member.linkedin ? ` • 💼 <a href="${escapeHtml(member.linkedin)}" target="_blank" style="color: var(--electric-blue); text-decoration: none; border-bottom: 1px solid rgba(0, 169, 255, 0.3);">LinkedIn →</a>` : ''}
                    </div>
                </div>
            `;
        });
        teamMembersEl.innerHTML = membersHTML;
    } else {
        teamSection.classList.add('hidden');
    }

    // College ID Card section
    const collegeIdSection = document.getElementById('pcCollegeIdSection');
    const collegeIdContent = document.getElementById('pcCollegeIdContent');

    if (reg.collegeIdUrl) {
        collegeIdSection.classList.remove('hidden');
        const fileName = reg.collegeIdFileName || 'College ID';
        const isImage = fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        const isPdf = fileName.match(/\.pdf$/i);

        if (isImage) {
            collegeIdContent.innerHTML = `
                <div class="pc-college-id-image-wrapper">
                    <img src="${escapeHtml(reg.collegeIdUrl)}" alt="College ID Card" class="pc-college-id-image" onclick="window.open('${escapeHtml(reg.collegeIdUrl)}', '_blank')">
                    <p class="pc-college-id-filename">${escapeHtml(fileName)}</p>
                    <a href="${escapeHtml(reg.collegeIdUrl)}" target="_blank" class="pc-college-id-link">🔍 View Full Size</a>
                </div>
            `;
        } else if (isPdf) {
            collegeIdContent.innerHTML = `
                <div class="pc-college-id-pdf-wrapper">
                    <span class="pc-college-id-pdf-icon">📄</span>
                    <p class="pc-college-id-filename">${escapeHtml(fileName)}</p>
                    <a href="${escapeHtml(reg.collegeIdUrl)}" target="_blank" class="pc-college-id-link">📥 Download PDF</a>
                </div>
            `;
        } else {
            collegeIdContent.innerHTML = `
                <div class="pc-college-id-file-wrapper">
                    <span class="pc-college-id-file-icon">📎</span>
                    <p class="pc-college-id-filename">${escapeHtml(fileName)}</p>
                    <a href="${escapeHtml(reg.collegeIdUrl)}" target="_blank" class="pc-college-id-link">📥 Download File</a>
                </div>
            `;
        }
    } else {
        collegeIdSection.classList.add('hidden');
    }

    // Show modal
    modal.classList.remove('hidden');
    wrapper.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize tilt at center
    const cardRect = card.getBoundingClientRect();
    currentX = cardRect.width / 2;
    currentY = cardRect.height / 2;
    targetX = currentX;
    targetY = currentY;
    setCardVars(currentX, currentY);

    // Add tilt event listeners
    card.addEventListener('pointermove', handleCardPointerMove);
    card.addEventListener('pointerenter', handleCardPointerEnter);
    card.addEventListener('pointerleave', handleCardPointerLeave);
};

function handleCardPointerMove(e) {
    const card = document.getElementById('pcCard');
    const rect = card.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    startTiltLoop();
}

function handleCardPointerEnter() {
    const wrapper = document.getElementById('pcCardWrapper');
    wrapper.classList.add('active');
}

function handleCardPointerLeave() {
    const card = document.getElementById('pcCard');
    // Animate back to center
    targetX = card.clientWidth / 2;
    targetY = card.clientHeight / 2;
    startTiltLoop();
}

window.closeDetailsModal = function () {
    const modal = document.getElementById('detailsModal');
    const card = document.getElementById('pcCard');
    const wrapper = document.getElementById('pcCardWrapper');

    // Remove event listeners
    card.removeEventListener('pointermove', handleCardPointerMove);
    card.removeEventListener('pointerenter', handleCardPointerEnter);
    card.removeEventListener('pointerleave', handleCardPointerLeave);

    stopTiltLoop();
    wrapper.classList.remove('active');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};

// Close details modal when clicking outside the card
const detailsModal = document.getElementById('detailsModal');
if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
        // Close if clicking the background or the wrapper (not the card itself)
        if (e.target === detailsModal || e.target.id === 'pcCardWrapper') {
            closeDetailsModal();
        }
    });
}

// ===== DELETE FUNCTIONALITY =====

let deleteTargetId = null;
let deleteTargetRegId = null;

window.deleteRegistration = function (id, regId) {
    deleteTargetId = id;
    deleteTargetRegId = regId;

    // Update modal content
    document.getElementById('deleteRegId').textContent = regId || 'this user';

    // Show modal
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeDeleteModal = function () {
    const modal = document.getElementById('deleteModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    deleteTargetId = null;
    deleteTargetRegId = null;
};

window.confirmDelete = async function () {
    if (!deleteTargetId) return;

    try {
        const btn = document.querySelector('.delete-confirm-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Deleting...';
        btn.disabled = true;

        await deleteDoc(doc(db, 'registrations', deleteTargetId));

        // Success feedback
        closeDeleteModal();

        // Optional: Show a toast notification here instead of alert? 
        // For now, let's keep it clean or use a temporary non-blocking element.
        // Or if user wanted "website popup", maybe he meant the confirmation itself.
        // Assuming the confirmation WAS the popup he hated.

    } catch (error) {
        console.error('Error deleting document: ', error);
        alert('Error deleting registration: ' + error.message);
    } finally {
        const btn = document.querySelector('.delete-confirm-btn');
        if (btn) {
            btn.textContent = 'Delete Permanently';
            btn.disabled = false;
        }
    }
};

// ===== UTILITY FUNCTIONS =====

function formatDate(timestamp) {
    if (!timestamp) return 'N/A';

    // Handle Firestore Timestamp
    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        date = new Date(timestamp);
    }

    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
