const axios = require('axios');
const fs = require('fs');

// Your Mixpanel API URL and Secret Key
const MIXPANEL_API_URL = 'https://mixpanel.com/api/2.0/jql/';
const MIXPANEL_SECRET_KEY = '1820291e5f9ea8ce4bcf229c9deb6876'; // Replace with your actual key

// Authorization Header
const authHeader = `Basic ${Buffer.from(MIXPANEL_SECRET_KEY + ':').toString('base64')}`;


// Your JQL query
const query = 
function main() {
    return Events({
        from_date: '2024-12-01',
        to_date: '2024-12-14'
    })
    .filter(function(event) {
        return event.name === 'Purchase';
    })
    .groupBy(['properties.product_id'], mixpanel.reducer.count());
}
;
// Function to run JQL query
async function runJQL() {
    try {
        console.log('Running JQL Query:');
        console.log(query); // Print the JQL query before sending

        const response = await axios.post(MIXPANEL_API_URL, {
            script: query
        }, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });

        console.log('JQL Query Results:', response.data); // Print query results to the console
        fs.writeFileSync('query_results.json', JSON.stringify(response.data, null, 2)); // Save results to a file
        console.log('Results saved to query_results.json');
    } catch (error) {
        console.error('Error running JQL query:', error.response?.data || error.message);
    }
}

// Call the function to run the JQL query
runJQL();