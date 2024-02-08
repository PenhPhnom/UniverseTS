import { GameObjectPool } from "../framework/common/GameObjectPool";
import { ResManager } from "../framework/common/ResManager";
import { StoryManager } from "../framework/ink/StoryManager";
import { StoryMessageManager } from "../framework/ink/StoryMessageManager";
import { GameSession } from "../framework/net/GameSession";
import { HttpManager } from "../framework/net/HttpManager";
import { SessionManager } from "../framework/net/SessionManager";
import { SceneManager } from "../framework/scene/SceneManager";
import { UIManager } from "../framework/ui/UIManager";
import { UIMessageManger } from "../game/event/UIMessageManager";
export class GameConfig {
}
GameConfig.debug = true;
GameConfig.realmServerIP = "127.0.0.1";
GameConfig.realmServerPort = 9001;
export class S {
}
S.UIManager = UIManager.Instance(UIManager);
S.UIMessageManger = UIMessageManger.Instance(UIMessageManger);
S.SceneManager = SceneManager.Instance(SceneManager);
S.GameObjectPool = GameObjectPool.Instance(GameObjectPool);
S.ResManager = ResManager.Instance(ResManager);
S.StoryManager = StoryManager.Instance(StoryManager);
S.SessionManager = SessionManager.Instance(SessionManager);
S.GameSession = GameSession.Instance(GameSession);
S.StoryMessageManager = StoryMessageManager.Instance(StoryMessageManager);
S.HttpManager = HttpManager.Instance(HttpManager);
//# sourceMappingURL=GameConfig.js.map