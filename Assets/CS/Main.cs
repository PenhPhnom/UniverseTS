//Main.cs
using UnityEngine;
using Puerts;                                       // ���� Puerts
using System.IO;
class Main : MonoBehaviour
{
  public bool isDebug = false;                    // �Ƿ�������
    public int debugPort = 43990;                   // ���Զ˿ں�
    public JsEnv jsEnv;                             // ���� jsEnv
    private Loader loader;
    private string scriptsDir = Path.Combine(Application.streamingAssetsPath, "Scripts");
    async void Start()
    {
      loader = new Loader(scriptsDir);
        jsEnv = new JsEnv(loader, debugPort);        // ʵ���� js �����
        if (isDebug)
        {                                // ���õ���
          await jsEnv.WaitDebuggerAsync();
        }
        jsEnv.Eval("require('Main')");
    }
    void Update()
    {
      jsEnv.Tick();
    }
}