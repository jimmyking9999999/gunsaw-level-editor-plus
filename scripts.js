document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('levels-container');
    const searchBar = document.getElementById('search-bar');
    let allLevels = []; 

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
            renderLevels(allLevels);
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

            const baseName = level.name.split(/\||\(|:/)[0].trim() + '.png';
            const imageUrl = 'Images/' + baseName;

             card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('${imageUrl}')`;

            card.innerHTML = `
                <h2>${level.name}</h2>
                <p><strong>Author:</strong> ${level.author}</p>
                <p><strong>Length:</strong> ${level.length}</p>
                <p><strong>Difficulty:</strong> ${level.difficulty}</p>
                <p><strong>Type:</strong> ${level.type}</p>
                <button class="copy-button">Copy Code</button>
            `;

            container.appendChild(card);

            const copyButton = card.querySelector('.copy-button');
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(level.code).then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => { copyButton.textContent = 'Copy Code'; }, 2000);
                })
            });
        });
    }

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredLevels = allLevels.filter(level => {
            // Iffy but works for now
            return (
                level.name.toLowerCase().includes(searchTerm) ||
                level.author.toLowerCase().includes(searchTerm) ||
                level.difficulty.toLowerCase().includes(searchTerm) ||
                level.type.toLowerCase().includes(searchTerm) ||
                level.length.toLowerCase().includes(searchTerm) 
            );
        });

        renderLevels(filteredLevels);
    });

});
