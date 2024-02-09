const { getJson } = require("serpapi");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file

// Set your SerpApi API key (replace with your actual API key)
const API_KEY = process.env.SERPAPI_API_KEY;
async function getOrganicResultsForTask(task) {
    try {
        const response = await axios.get("https://serpapi.com/search", {
            params: {
                api_key: API_KEY,
                engine: "google",
                q: task,
                gl: "us", // Country to search from (you can adjust this)
                hl: "en", // Language
            },
        });

        const organicResults = response.data.organic_results;
        return organicResults;
    } catch (error) {
        console.error("Error fetching organic results:", error.message);
        return [];
    }
}

// Example usage
//const taskToSearch = "best pizza in New York"; // Replace with your task
const taskToSearch = "Read another book";
getOrganicResultsForTask(taskToSearch)
    .then((results) => {
        // Analyze keywords and categorize
        let keywords = taskToSearch.toLowerCase().split(" ");

        results.forEach((result, index) => {
            keywords += result.title + result.snippet;
        });
        keywords = keywords.toLowerCase().split(" ");
        const category = categorizeKeywords(keywords);
        console.log(`Category for "${taskToSearch}": ${category}`);
    })
    .catch((err) => {
        console.error("Error:", err);
    });

// Function to categorize keywords
function categorizeKeywords(keywords) {
    // Implement your logic here to map keywords to categories
    // Example: Check if keywords contain food-related terms, book-related terms, etc.
    // Return one of the four categories: "to eat", "to read", "to buy", "to watch"
    // For now, let's assume it's "to eat" if any food-related keyword is present
    if (keywords.includes("pizza") || keywords.includes("restaurant") || keywords.includes("cafe") || keywords.includes("eat")
    || keywords.includes("food")) {
        return 2;
    }
    if (keywords.includes("cinema") || keywords.includes("movie") || keywords.includes("film")) {
        return 1;
    }
    if (keywords.includes("book") || keywords.includes("article") || keywords.includes("read")) {
        return 3;
    }
    if (keywords.includes("product") || keywords.includes("buy") || keywords.includes("shop") || keywords.includes("pay")) {
        return 4;
    }
    // Add more rules as needed

    return 1; // Default category
}

module.exports = { getOrganicResultsForTask, categorizeKeywords };
