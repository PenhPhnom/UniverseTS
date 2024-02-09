using NiceTS;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;


public class LaunchPage : MonoBehaviour
{

    void Start()
    {

    }


    public async Task CheckUpdate()
    {
        var start = DateTime.Now;
        Debug.Log("正在检查资源更新...");
        //gTextField.text = "正在检查资源更新...";

        await Addressables.InitializeAsync().Task;

        var a = Addressables.RuntimePath;
        var catalogs = await Addressables.CheckForCatalogUpdates(false).Task;
        Log.Debug(LogGroups.UI, string.Format("CheckIfNeededUpdate use {0}ms", (DateTime.Now - start).Milliseconds));
        Log.Debug(LogGroups.UI, $"catalog count: {catalogs.Count} === check status: {catalogs}");

        if (catalogs != null && catalogs.Count > 0)
        {
            //    gTextField.text = "正在更新资源...";
            Debug.Log("正在更新资源...");
            //    gProgress.visible = true;
            //    gProgress.value = 0;

            //    start = DateTime.Now;
            var locators = await Addressables.UpdateCatalogs(catalogs, false).Task;
            Log.Debug(LogGroups.UI, $"locator count: {locators.Count}");

            foreach (var v in locators)
            {
                var size = await Addressables.GetDownloadSizeAsync(v.Keys).Task;
                Log.Debug(LogGroups.UI, $"download size:{size}");

                if (size > 0)
                {
                    UINoticeWin notice = UINoticeWin.Inst;
                    notice.ShowOneButton($"本次更新大小：{size}", () =>
                    {
                        notice.Hide();
                    });

                    //等待确定
                    await notice.WaitForResponse();

                    var downloadHandle = Addressables.DownloadDependenciesAsync(v.Keys, Addressables.MergeMode.Union);
                    while (!downloadHandle.IsDone)
                    {
                        float percentage = downloadHandle.PercentComplete;
                        Log.Debug(LogGroups.UI, $"download pregress: {percentage}");
                        //gProgress.value = percentage * 100;
                    }
                    Addressables.Release(downloadHandle);
                }
            }

            Log.Debug(LogGroups.UI, string.Format("UpdateFinish use {0}ms", (DateTime.Now - start).Milliseconds));
            UpdateFinish();

            Addressables.Release(locators);

            Addressables.Release(catalogs);
        }
        StartGame();
    }

    void StartGame()
    {
        //gTextField.text = "正在进入游戏...";
        Debug.Log("正在进入游戏...");
        JsManager.Instance.StartGame();

    }

    void UpdateFinish()
    {
        //gProgress.value = 100;
        //gTextField.text = "正在准备资源...";
        Debug.Log("正在准备资源...");
        JsManager.Instance.Restart();

    }


}