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
    scoresList.innerHTML = ''; // Clear current scores

    // Check if there are any scores to display
    if (scores.length === 0) {
        scoresList.innerHTML = '<li>No high scores yet!</li>';
    } else {
        // Iterate through the scores and append them to the list
        scores.forEach((score) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${score.name}: ${score.score}`;
            
            // Optionally, add a class based on the team for styling
            listItem.className = `high-score-${score.team}`;
            
            scoresList.appendChild(listItem);
        });
    }
}
