using BepInEx;
using UnityEngine.Networking;
using System.Collections;
using UnityEngine;
using System; // Add this to use DateTime

namespace LethalScrapbook
{
    [BepInPlugin(PluginInfo.PLUGIN_GUID, PluginInfo.PLUGIN_NAME, PluginInfo.PLUGIN_VERSION)]
    public class Plugin : BaseUnityPlugin
    {
        private const string ApiBaseUrl = "https://lethal-scrapbook-827d3e0322fb.herokuapp.com/";
        private const string GameEndpoint = "games";

        private void Awake()
        {
            // Plugin startup logic
            Logger.LogInfo($"Plugin {PluginInfo.PLUGIN_GUID} is loaded!");

            // Example call to send game data upon game creation
            StartCoroutine(SendGameData(new { gameId = "12345" }));
        }

        private IEnumerator SendGameData(object gameData)
        {
            // Assuming gameData is a class or struct that includes startDate and finalQuota
            // You will need to define this class or struct and populate it with actual game data
            GameData data = new GameData
            {
                startDate = DateTime.UtcNow.ToString("o"), // ISO 8601 format
                finalQuota = 100 // Example value, replace with actual game data
            };
            string json = JsonUtility.ToJson(data);
            byte[] jsonToSend = new System.Text.UTF8Encoding().GetBytes(json);
            UnityWebRequest request = new UnityWebRequest(ApiBaseUrl + GameEndpoint, "POST");
            request.uploadHandler = (UploadHandler)new UploadHandlerRaw(jsonToSend);
            request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            request.SetRequestHeader("Content-Type", "application/json");

            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
            {
                Logger.LogError($"Error sending game data: {request.error}");
            }
            else
            {
                Logger.LogInfo("Game data sent successfully.");
            }
        }
    }
}
// Define a class or struct to match the expected API payload
public class GameData
{
    public string startDate;
    public int finalQuota;
}
