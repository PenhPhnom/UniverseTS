//Main.cs
using UnityEngine;
using Puerts;                                       // 引用 Puerts
using System.IO;
class Main : MonoBehaviour
{
  public bool isDebug = false;                    // 是否开启调试
    public int debugPort = 43990;                   // 调试端口号
    public JsEnv jsEnv;                             // 定义 jsEnv
    private Loader loader;
    private string scriptsDir = Path.Combine(Application.streamingAssetsPath, "Scripts");
    async void Start()
    {
      loader = new Loader(scriptsDir);
        jsEnv = new JsEnv(loader, debugPort);        // 实例化 js 虚拟机
        if (isDebug)
        {                                // 启用调试
          await jsEnv.WaitDebuggerAsync();
        }
        jsEnv.Eval("require('Main')");
    }
    void Update()
    {
      jsEnv.Tick();
    }
}