var shell = WScript.CreateObject("WScript.Shell");
shell.Run("json-server db.json -p 3001 -d 2000");
shell.Run("ng serve");