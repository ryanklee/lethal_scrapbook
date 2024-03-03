## Mod API Communication Plan

This document outlines the technical considerations and requirements for the LethalScrapbook mod to interface with the game's API hosted on Heroku.

### Technical Considerations:

1. **HTTP Client Library:**
   - Which HTTP client library will be used to make API requests from the mod?

2. **API Endpoint Access:**
   - How will the mod construct and send requests to the API endpoints?
   - What are the base URLs for development and production environments?

3. **Data Serialization:**
   - How will the mod serialize data to JSON format for API requests?
   - How will the mod deserialize JSON responses from the API?

4. **Asynchronous Communication:**
   - How will the mod handle asynchronous API calls to avoid blocking the game's main thread?

5. **Error Handling:**
   - How will the mod handle and report errors that occur during API communication?

6. **User Feedback:**
   - How will the mod inform the player of successful or failed API interactions?

7. **Security:**
   - How will the mod secure API requests to protect sensitive data?

8. **Testing:**
   - How will the mod's API communication be tested during development?

9. **Dependency Management:**
   - How will the mod manage dependencies required for API communication?

10. **Version Compatibility:**
    - How will the mod ensure compatibility with different versions of the API?

### Requirements:

1. **HTTP Client Library:**
   - UnityWebRequest (recommended for Unity projects)

2. **API Endpoint Access:**
   - Base URL: `https://lethal-scrapbook-827d3e0322fb.herokuapp.com/`
   - Endpoints: `/games`, `/moons`, `/facilities`, `/entrances`, `/strategies`, `/runs`

3. **Data Serialization:**
   - Use Unity's built-in JSON utility or a third-party library like Newtonsoft.Json for Unity.

4. **Asynchronous Communication:**
   - Use coroutines or the async/await pattern available in newer versions of Unity.

5. **Error Handling:**
   - Implement try-catch blocks and check for UnityWebRequest error statuses.

6. **User Feedback:**
   - Display messages in the game's UI to indicate the status of API requests.

7. **Security:**
   - If needed, implement API key-based authentication and secure storage of keys.

8. **Testing:**
   - Develop unit tests and use a mock server or Postman for testing API endpoints.

9. **Dependency Management:**
   - Manage dependencies via Unity Package Manager or NuGet for Unity.

10. **Version Compatibility:**
    - Follow semantic versioning and update the mod to handle API changes.

This plan will be refined as development progresses and more information becomes available.
