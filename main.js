// Initialize Supabase client
const supabaseUrl = 'https://zcgcledsadhiiormgiyx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZ2NsZWRzYWRoaWlvcm1naXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4ODkyMjIsImV4cCI6MjAyNzQ2NTIyMn0.8tFxVubXloJTnOT95tPqV3-kOa00l-XsF_aqgDe_Ak8';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayHighScores();
});

async function loadAndDisplayHighScores() {
    try {
        const { data, error } = await supabase
            .from('high_scores') // Ensure this matches your Supabase table name
            .select('*')
            .order('score', { ascending: false }); // Adjust if you want to change the sort order

        if (error) throw error;

        // Call the function to update the UI with fetched scores
        updateHighScoresUI(data);
    } catch (error) {
        console.error('Error loading high scores:', error);
    }
}

function updateHighScoresUI(scores) {
    const scoresList = document.getElementById('high-scores');
    if (!scoresList) {
        console.error('High scores list element not found.');
        return;
    }
    scoresList.innerHTML = ''; // Clear current scores

    // Create a map to track the highest score for each player
    const highestScoresMap = scores.reduce((acc, score) => {
        if (!acc[score.name] || acc[score.name].score < score.score) {
            acc[score.name] = score;
        }
        return acc;
    }, {});

    // Convert the map to an array of scores
    const highestScores = Object.values(highestScoresMap);

    // Sort the scores in descending order
    highestScores.sort((a, b) => b.score - a.score);

    // Display the sorted, highest scores
    highestScores.forEach((score, index) => {
        const rank = index + 1; // Calculate rank based on array position
        const listItem = document.createElement('li');
        listItem.textContent = `${rank}. ${score.name}: ${score.score}`;
        listItem.className = `high-score-${score.team}`; // Apply color based on team
        scoresList.appendChild(listItem);
    });

    if (highestScores.length === 0) {
        scoresList.innerHTML = '<li>No high scores yet!</li>';
    }
}

