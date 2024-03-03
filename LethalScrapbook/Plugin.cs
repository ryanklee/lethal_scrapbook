using BepInEx;
using UnityEngine.Networking;
using System.Collections;
using UnityEngine;

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
            string json = JsonUtility.ToJson(gameData);
            byte[] jsonToSend = new System.Text.UTF8Encoding().GetBytes(json);
            UnityWebRequest request = new UnityWebRequest(ApiBaseUrl + GameEndpoint, "POST");
            request.uploadHandler = (UploadHandler)new UploadHandlerRaw(jsonToSend);
            request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
            request.SetRequestHeader("Content-Type", "application/json");

            yield return request.SendWebRequest();

            if (request.isNetworkError || request.isHttpError)
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
