document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('levels-container');
    const searchBar = document.getElementById('search-bar');
    const sortField = document.getElementById('sort-field');
    const sortDirectionButtons = Array.from(document.querySelectorAll('.sort-direction-button'));
    const themeToggleButton = document.getElementById('theme-toggle-button');
    let allLevels = [];
    let sortDirection = 'desc';
    const themeStorageKey = 'gunsaw-level-editor-theme';

    const lengthRank = {
        short: 0,
        medium: 1,
        long: 2
    };

    const difficultyRank = {
        easy: 0,
        normal: 1,
        difficult: 2
    };

    function getSizeValue(level) {
        return typeof level.code === 'string' ? level.code.length : 0;
    }

    function getSortValue(level, field) {
        switch (field) {
            case 'author':
                return level.author?.toLowerCase() || '';
            case 'size':
                return getSizeValue(level);
            case 'difficulty':
                return difficultyRank[level.difficulty?.toLowerCase()] ?? -1;
            case 'length':
                return lengthRank[level.length?.toLowerCase()] ?? -1;
            case 'date':
            default:
                return level.date || '';
        }
    }

    function compareLevels(a, b, field, direction) {
        const aValue = getSortValue(a, field);
        const bValue = getSortValue(b, field);

        if (aValue < bValue) {
            return direction === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
            return direction === 'asc' ? 1 : -1;
        }

        return a.name.localeCompare(b.name);
    }

    function applyFiltersAndSort() {
        const searchTerm = searchBar.value.toLowerCase();
        const activeSortField = sortField.value;

        const filteredLevels = allLevels.filter(level => {
            return (
                level.name.toLowerCase().includes(searchTerm) ||
                level.author.toLowerCase().includes(searchTerm) ||
                level.difficulty.toLowerCase().includes(searchTerm) ||
                level.type.toLowerCase().includes(searchTerm) ||
                level.length.toLowerCase().includes(searchTerm)
            );
        });

        filteredLevels.sort((a, b) => compareLevels(a, b, activeSortField, sortDirection));
        renderLevels(filteredLevels);
    }

    function setTheme(theme) {
        const isNightMode = theme === 'night';
        document.documentElement.setAttribute('data-theme', isNightMode ? 'night' : 'day');
        document.body.classList.toggle('night-mode', isNightMode);
        themeToggleButton.setAttribute('aria-pressed', String(isNightMode));
        localStorage.setItem(themeStorageKey, theme);
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem(themeStorageKey);
        setTheme(savedTheme === 'night' ? 'night' : 'day');
    }

    function updateThemeToggle() {
        const dark = themeToggleButton.matches("[aria-pressed='true']");
        setTheme(dark ? 'day' : 'night');
    }

    function toggleTheme() {
        if (!document.startViewTransition) {
            updateThemeToggle();
            return;
        }

        document.startViewTransition(() => updateThemeToggle());
    }

    fetch('Levels.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Err: ' + response.statusText);
                // phew, not my issue :>
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data.levels)) {
                allLevels = data.levels;
            } else if (Array.isArray(data)) {
                allLevels = data;
            } else {
                throw new Error('You messed up the JSON structure');
            }

            applyFiltersAndSort();
        })
        .catch(error => {
            console.error('You misplaced the files: ', error);
        });

    function renderLevels(levelsToDisplay) {
        container.innerHTML = '';

        if (levelsToDisplay.length === 0) {
            container.innerHTML = '<p class="no-results">No levels found. Time to create it yourself!</p>';
            return;
        }

        levelsToDisplay.forEach(level => {
            const card = document.createElement('div');
            card.className = 'level-card';

            const baseName = level.name.split(/\||\(|:/)[0].trim().replace(/'/g, '') + '.png';
            const imageUrl = 'Images/' + baseName;
            const defaultOverlay = "linear-gradient(rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34))";
            const hoverOverlay = "linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))";

            card.style.backgroundImage = `${defaultOverlay}, url('${imageUrl}')`;

            card.innerHTML = `
                <h2>${level.name}</h2>
                <p><strong>Author:</strong> ${level.author}</p>
                <p><strong>Length:</strong> ${level.length}</p>
                <p><strong>Difficulty:</strong> ${level.difficulty}</p>
                <p><strong>Type:</strong> ${level.type}</p>
                <button class="copy-button">Copy Code</button>
            `;
            // Potentially add date..?
            
            container.appendChild(card);

            card.addEventListener('mouseenter', () => {
                card.style.backgroundImage = `${hoverOverlay}, url('${imageUrl}')`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.backgroundImage = `${defaultOverlay}, url('${imageUrl}')`;
            });

            const copyButton = card.querySelector('.copy-button');
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(level.code).then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy Code';
                    }, 2000);
                });
            });
        });
    }

    searchBar.addEventListener('input', applyFiltersAndSort);
    sortField.addEventListener('change', applyFiltersAndSort);

    sortDirectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            sortDirection = button.dataset.direction;

            sortDirectionButtons.forEach(directionButton => {
                directionButton.classList.toggle('active', directionButton === button);
            });

            applyFiltersAndSort();
        });
    });

    themeToggleButton.addEventListener('click', toggleTheme);

    initializeTheme();
});
