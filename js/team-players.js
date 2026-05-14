function filterTeam(role) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter table rows
    const rows = document.querySelectorAll('table tr');
    for (let i = 1; i < rows.length; i++) {
        const roleCell = rows[i].querySelector('td:nth-child(3)');
        if (roleCell) {
            const cellText = roleCell.textContent.toLowerCase();
            if (role === 'all' || cellText.includes(role)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}
