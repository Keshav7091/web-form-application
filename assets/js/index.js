const passwordField = document.getElementById('password');
const repasswordField = document.getElementById('repassword');
const togglePasswordIcon = document.getElementById('togglePassword');
const toggleRepasswordIcon = document.getElementById('toggleRepassword');

togglePasswordIcon.addEventListener('click', function () {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    togglePasswordIcon.textContent = type === 'password' ? '👁️' : '🙈';
});

toggleRepasswordIcon.addEventListener('click', function () {
    const type = repasswordField.type === 'password' ? 'text' : 'password';
    repasswordField.type = type;
    toggleRepasswordIcon.textContent = type === 'password' ? '👁️' : '🙈';
});


