document.addEventListener('DOMContentLoaded', function() {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        document.getElementById('profile-pic').src = savedPic;
    }


document.getElementById('change-pic').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            document.getElementById('profile-pic').src = imageData;

            localStorage.setItem('profilePic', imageData);
        };
        reader.readAsDataURL(file);
    }
});
});