var shell = WScript.CreateObject("WScript.Shell");
shell.Run("npm i json-server");
shell.Run("json-server db.json");
shell.Run("ng serve");